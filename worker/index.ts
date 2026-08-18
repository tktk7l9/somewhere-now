// Cloudflare Worker のエントリ。
//
//   fetch     … /api/cams で KV のライブ生存状態を返す。それ以外は静的アセット。
//   scheduled … Cron Trigger から YouTube Data API を叩いて KV を更新する。
//
// API キーはここ(Worker の secret)だけにあり、ブラウザには一切出ない。
// 使ったクォータは KV の台帳に日毎で積み、予算を超えたら叩くのをやめる。

import { CAMS } from "../src/data/cams";
import type { CamState } from "../src/domain/cams";
import {
  DAILY_UNIT_BUDGET,
  ledgerForDay,
  rediscover,
  remainingUnits,
  sweepLiveness,
  type QuotaLedger,
} from "./refresh";
import { createYouTubeClient } from "./youtube";

interface Env {
  ASSETS: Fetcher;
  CAM_STATE: KVNamespace;
  YOUTUBE_API_KEY?: string;
}

const STATE_KEY = "cam-state:v1";
const LEDGER_KEY = "quota-ledger:v1";

/**
 * 1 時間あたりに探し直すチャンネル数。カメラ 57 台がぶら下がるチャンネルは
 * 8 本しかないので、毎時すべてを見直せる(安い経路なら 8 × 2 = 16 unit)。
 */
const REDISCOVER_CHANNELS_PER_RUN = 8;
/** そのうち、高い検索経路(101 unit)に落としてよい回数。 */
const REDISCOVER_SEARCHES_PER_RUN = 1;

/** wrangler.jsonc の triggers.crons と対応させること。 */
const SWEEP_CRON = "*/10 * * * *";

interface StatePayload {
  updatedAt: string;
  cams: Record<string, CamState>;
}

async function readState(env: Env): Promise<StatePayload> {
  const stored = await env.CAM_STATE.get<StatePayload>(STATE_KEY, "json");
  return stored ?? { updatedAt: new Date(0).toISOString(), cams: {} };
}

function jsonResponse(body: unknown, maxAgeSeconds: number): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      // 状態の更新は 10 分毎なので、1 分のキャッシュで十分に追随する。
      "cache-control": `public, max-age=${maxAgeSeconds}`,
      // 静的アセットの public/_headers はここには効かないので自前で付ける。
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
    },
  });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/cams") {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET" } });
      }
      return jsonResponse(await readState(env), 60);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(refresh(controller.cron, env));
  },
} satisfies ExportedHandler<Env>;

async function refresh(cron: string, env: Env): Promise<void> {
  const apiKey = env.YOUTUBE_API_KEY;
  if (apiKey === undefined || apiKey === "") {
    console.error("[cron] YOUTUBE_API_KEY が未設定のため更新を見送った");
    return;
  }

  const now = new Date();
  const ledger = ledgerForDay(await env.CAM_STATE.get<QuotaLedger>(LEDGER_KEY, "json"), now);
  const budget = remainingUnits(ledger);
  if (budget === 0) {
    console.warn(`[cron] 本日のクォータ上限(${DAILY_UNIT_BUDGET})に達したので何もしない`);
    return;
  }

  const payload = await readState(env);
  const states = new Map(Object.entries(payload.cams));
  const client = createYouTubeClient(apiKey, fetch);

  try {
    const result =
      cron === SWEEP_CRON
        ? await sweepLiveness(CAMS, states, client, now, budget)
        : await rediscover(CAMS, states, client, now, {
            maxChannels: REDISCOVER_CHANNELS_PER_RUN,
            maxSearches: REDISCOVER_SEARCHES_PER_RUN,
            unitBudget: budget,
          });

    for (const [camId, state] of result.states) states.set(camId, state);
    await env.CAM_STATE.put(
      STATE_KEY,
      JSON.stringify({ updatedAt: now.toISOString(), cams: Object.fromEntries(states) }),
    );

    const live = [...states.values()].filter((s) => s.status === "live").length;
    console.log(`[cron ${cron}] 更新 ${result.states.size} 件 / ライブ ${live} 件`);
    for (const note of result.notes) console.warn(`[cron ${cron}] ${note}`);
  } catch (error) {
    // 状態の更新は諦める。次の実行でやり直せばよい。
    console.error(`[cron ${cron}] 更新に失敗`, error);
  } finally {
    // 失敗しても Google 側のクォータは減っているので、台帳は必ず書く。
    // ここを try の中に置くと、キーが不正なまま Cron が回り続けたときに
    // 上限ガードが気づかないまま 1 日ぶんの枠を焼くことになる。
    const used = ledger.used + client.unitsUsed;
    await env.CAM_STATE.put(LEDGER_KEY, JSON.stringify({ day: ledger.day, used }));
    console.log(`[cron ${cron}] 消費 ${client.unitsUsed} unit (本日計 ${used}/${DAILY_UNIT_BUDGET})`);
  }
}
