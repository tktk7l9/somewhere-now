// Cloudflare Worker のエントリ。
//
//   fetch     … /api/cams で KV のライブ生存状態を返す。それ以外は静的アセット。
//   scheduled … Cron Trigger から YouTube Data API を叩いて KV を更新する。
//
// API キーはここ(Worker の secret)だけにあり、ブラウザには一切出ない。
// 使ったクォータは KV の台帳に日毎で積み、予算を超えたら叩くのをやめる。

import { CAMS } from "../src/data/cams";
import { publicStates } from "../src/domain/cams";
import {
  ROLE_UNIT_BUDGET,
  ledgerForDay,
  pruneOrphans,
  rediscover,
  remainingUnits,
  sweepLiveness,
  type QuotaLedger,
} from "./refresh";
import {
  ledgerIn,
  roleForCron,
  withLedger,
  type Role,
  type StatePayload,
} from "./schedule";
import { createYouTubeClient } from "./youtube";

interface Env {
  ASSETS: Fetcher;
  CAM_STATE: KVNamespace;
  YOUTUBE_API_KEY?: string;
}

/** 正本。title と checkedAt を含む、更新アルゴリズムが読む側。 */
const STATE_KEY = "cam-state:v1";
/**
 * ブラウザへ配る形に絞った写し。/api/cams はこれを**そのまま**返す。
 *
 * 正本は 1.2MB あり、毎リクエストで parse → 射影 → stringify すると
 * 応答に 100〜300ms かかる(実測)。表示に要る 3 つだけに絞った文字列を
 * 更新時に一度だけ作っておけば、読み出しは KV から取って返すだけで済む。
 */
const PUBLIC_KEY = "cam-state-public:v1";

/**
 * 2026-08-28〜08-31 に台帳を置いていたキー。**引き継ぎにしか使わない**。
 *
 * 台帳は正本(STATE_KEY)に同居させた。別キーに分けると 1 実行あたりの書き込みが
 * 1 本増え、Cron 7 回/時 × 24 時間 = 504 write/日 と無料枠(1,000/日)の半分を
 * 焼いていた(2026-08-31 に Cloudflare の 50% 警告で発覚)。
 *
 * ここを読むのは「正本がまだ台帳を持っていない」ときだけ＝役割ごとに 1 度きり。
 * 移行の途中でゼロから数え直すと、**その日ぶんの上限ガードが丸ごと外れる**
 * (2026-08-27 に生存確認が 7,300 unit を焼いた種類の事故を止められなくなる)。
 * 両方の役割が新しい正本を書き終えたら、このキーごと消してよい。
 */
const LEGACY_LEDGER_KEY: Record<Role, string> = {
  sweep: "quota-ledger:sweep:v1",
  rediscover: "quota-ledger:rediscover:v1",
};

/**
 * 1 時間あたりに探し直すチャンネル数の**上限**。
 *
 * 実際に何本回れるかを決めるのはこの数ではなく MAX_CALLS_PER_REDISCOVER の方。
 * チャンネル 1 本は uploads を最大 3 ページ辿って 6 回呼ぶので、件数だけで
 * 24 本を許すと 144 リクエストになり、サブリクエスト上限(50)で半分以上が落ちる
 * (2026-08-28 に実際に 24 本中 12 本を落とした)。
 *
 * ここは「呼び出しの枠が余っていても、これ以上は手を広げない」という天井。
 * 目当てが 1 ページ目にいれば 2 回で済むので、空いているぶんだけ本数が伸びる。
 */
const REDISCOVER_CHANNELS_PER_RUN = 24;
/** そのうち、高い検索経路(101 unit)に落としてよい回数。 */
const REDISCOVER_SEARCHES_PER_RUN = 1;
/**
 * 1 回の再探索で使ってよい上限。日次の枠(4,000)を 24 回で割った値。
 * 1 回が枠を食い尽くすと、その日の残りの再探索が全部止まる。
 */
const REDISCOVER_UNITS_PER_RUN = Math.floor(ROLE_UNIT_BUDGET.rediscover / 24);

/** PUBLIC_KEY に添える目印。本文を parse せずに ETag を作るために使う。 */
interface PublicMeta {
  updatedAt: string;
}

async function readState(env: Env): Promise<StatePayload> {
  const stored = await env.CAM_STATE.get<StatePayload>(STATE_KEY, "json");
  return stored ?? { updatedAt: new Date(0).toISOString(), cams: {} };
}

/**
 * その役割の台帳を、正本から取り出す。
 * 正本がまだ持っていなければ旧キーから引き継ぐ(役割ごとに 1 度きり)。
 */
async function ledgerFor(
  payload: StatePayload,
  role: Role,
  env: Env,
  now: Date,
): Promise<QuotaLedger> {
  const carried = ledgerIn(payload, role, now);
  if (carried !== null) return carried;
  const legacy = await env.CAM_STATE.get<QuotaLedger>(LEGACY_LEDGER_KEY[role], "json");
  return ledgerForDay(legacy, now);
}

/** ブラウザへ配る本文。表示に使う 3 つだけに絞る。 */
function publicBody(payload: StatePayload): string {
  return JSON.stringify({ updatedAt: payload.updatedAt, cams: publicStates(payload.cams) });
}

function camsHeaders(updatedAt: string): Headers {
  return new Headers({
    "content-type": "application/json; charset=utf-8",
    // 状態の更新は 10 分毎なので、1 分のキャッシュで十分に追随する。
    "cache-control": "public, max-age=60",
    // 更新時刻がそのまま版番号になる。中身が変わらない限り 304 で返せる。
    etag: `"${updatedAt}"`,
    // 静的アセットの public/_headers はここには効かないので自前で付ける。
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
  });
}

/**
 * 生存状態の本文を組み立てる。写しがまだ無ければ正本から作り、
 * 次からは写しで済むように書き戻す(デプロイ直後の 1 回だけ通る道)。
 */
async function buildCamsResponse(env: Env, ctx: ExecutionContext): Promise<Response> {
  const cached = await env.CAM_STATE.getWithMetadata<PublicMeta>(PUBLIC_KEY, "text");
  if (cached.value !== null && cached.metadata !== null) {
    return new Response(cached.value, { headers: camsHeaders(cached.metadata.updatedAt) });
  }

  const payload = await readState(env);
  const body = publicBody(payload);
  ctx.waitUntil(
    env.CAM_STATE.put(PUBLIC_KEY, body, { metadata: { updatedAt: payload.updatedAt } }),
  );
  return new Response(body, { headers: camsHeaders(payload.updatedAt) });
}

/**
 * /api/cams。
 *
 * 効くのは 3 段で、下に行くほど確実:
 *   1. エッジのキャッシュ … Worker の応答は CDN に自動では載らないので自分で置く。
 *      workers.dev でも効いている(本番で cf-cache-status: HIT を実測)。
 *      独自ドメインを当てるときは Workers Caching(wrangler の cache.enabled)に
 *      移すと、ヒット時にこの関数ごと呼ばれなくなる。
 *   2. ETag … ブラウザは 2 分毎に取りに来るが中身が変わるのは 10 分毎なので、
 *      5 回中 4 回は 304 で本文(約 144KB)が飛ばない。
 *   3. 写しを返すだけ … 正本 1.2MB の parse と射影をやめる(ここが一番効く)。
 */
async function camsResponse(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const cache = caches.default;
  // 鍵は URL だけ。条件付きリクエストのヘッダを混ぜると鍵が散る。
  const cacheKey = new Request(new URL("/api/cams", request.url).toString());

  let response = await cache.match(cacheKey);
  if (response === undefined) {
    response = await buildCamsResponse(env, ctx);
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  }

  const etag = response.headers.get("etag");
  if (etag !== null && request.headers.get("if-none-match") === etag) {
    // 304 に本文は付けない。版の判定に要るヘッダだけ返す。
    return new Response(null, {
      status: 304,
      headers: {
        etag,
        "cache-control": "public, max-age=60",
      },
    });
  }
  return response;
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/cams") {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET" } });
      }
      return camsResponse(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(refresh(controller.cron, env));
  },
} satisfies ExportedHandler<Env>;

/**
 * Cron の入口。**何があってもログを 1 行は残す**ことだけを引き受ける。
 *
 * 2026-08-28 に 3.6 時間ぶん更新が止まったとき、台帳も状態も動かず
 * ログも空で、「Cron が発火していない」のか「発火したが落ちた」のかを
 * 切り分ける手がかりが何も無かった。`scheduled` は `ctx.waitUntil` に
 * 渡しているので、ここで投げた例外は誰も受け取らないまま消える。
 */
async function refresh(cron: string, env: Env): Promise<void> {
  const role = roleForCron(cron);
  if (role === null) {
    // 既定の役割に倒すと、wrangler.jsonc だけを書き換えたときに全実行が
    // 片方の役割になり、枠も台帳も入れ替わったまま気づけない。
    console.error(`[cron] 知らない Cron 式が発火した: ${cron}`);
    return;
  }
  // 発火した事実だけは先に残す。これが無いと沈黙の理由を追えない。
  console.log(`[cron ${role}] 開始`);

  try {
    await update(role, env);
  } catch (error) {
    // ここに来るのは KV の読み込みなど、YouTube を叩く前で落ちたとき
    // (その先は update の中の try が受けて台帳まで書く)。
    console.error(`[cron ${role}] 更新を始める前に落ちた`, error);
  }
}

async function update(role: Role, env: Env): Promise<void> {
  const apiKey = env.YOUTUBE_API_KEY;
  if (apiKey === undefined || apiKey === "") {
    console.error(`[cron ${role}] YOUTUBE_API_KEY が未設定のため更新を見送った`);
    return;
  }

  const now = new Date();
  const payload = await readState(env);
  const ledger = await ledgerFor(payload, role, env, now);
  const budget = remainingUnits(ledger, ROLE_UNIT_BUDGET[role]);
  if (budget === 0) {
    console.warn(`[cron ${role}] 本日の枠(${ROLE_UNIT_BUDGET[role]})を使い切ったので何もしない`);
    return;
  }

  const states = new Map(Object.entries(payload.cams));
  const client = createYouTubeClient(apiKey, fetch);
  // 更新に失敗しても台帳だけは進めたいので、書き戻す正本を try の外に置く。
  // 差し替わったかどうか(= next !== payload)が、写しを作り直すかの判定にもなる。
  let next = payload;

  try {
    const result =
      role === "sweep"
        ? await sweepLiveness(CAMS, states, client, now, budget)
        : await rediscover(CAMS, states, client, now, {
            maxChannels: REDISCOVER_CHANNELS_PER_RUN,
            maxSearches: REDISCOVER_SEARCHES_PER_RUN,
            unitBudget: Math.min(budget, REDISCOVER_UNITS_PER_RUN),
          });

    for (const [camId, state] of result.states) states.set(camId, state);
    // マスタから消えた id の状態はどちらの経路も触らないので、ここで掃く。
    const { kept, removed } = pruneOrphans(states, CAMS);
    next = { ...payload, updatedAt: now.toISOString(), cams: Object.fromEntries(kept) };

    const live = [...kept.values()].filter((s) => s.status === "live").length;
    console.log(`[cron ${role}] 更新 ${result.states.size} 件 / ライブ ${live} 件`);
    if (removed.length > 0) {
      console.warn(`[cron ${role}] マスタに無い状態を掃除: ${removed.join(", ")}`);
    }
    for (const note of result.notes) console.warn(`[cron ${role}] ${note}`);
  } catch (error) {
    // 状態の更新は諦める。次の実行でやり直せばよい。
    console.error(`[cron ${role}] 更新に失敗`, error);
  } finally {
    // 失敗しても Google 側のクォータは減っているので、台帳は必ず書く。
    // ここを try の中に置くと、キーが不正なまま Cron が回り続けたときに
    // 上限ガードが気づかないまま 1 日ぶんの枠を焼くことになる。
    const used = ledger.used + client.unitsUsed;
    // 正本は台帳を相乗りさせて **1 度だけ** 書く。台帳を別キーに分けると
    // 実行あたりの書き込みが 3 本になり、KV の無料枠の半分を焼く。
    await env.CAM_STATE.put(
      STATE_KEY,
      JSON.stringify(withLedger(next, role, { day: ledger.day, used })),
    );
    // 写しは中身が入れ替わったときだけ。更新に失敗した回は正本と同じなので、
    // 書き直しても内容が変わらない(＝ただ枠を減らすだけ)。
    if (next !== payload) {
      await env.CAM_STATE.put(PUBLIC_KEY, publicBody(next), {
        metadata: { updatedAt: next.updatedAt },
      });
    }
    console.log(
      `[cron ${role}] 消費 ${client.unitsUsed} unit (本日計 ${used}/${ROLE_UNIT_BUDGET[role]})`,
    );
  }
}
