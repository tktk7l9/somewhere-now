// Cron の実行まわりの取り決め。
//
//   - どの Cron 式がどちらの役割か
//   - その役割のクォータ台帳を正本のどこに置くか
//
// KV に atomic な更新は無いので、**同じキーの書き手を 1 つに保つ**ことだけが
// 競合を避ける手段になる。ここはその前提を型と関数に落とした置き場所。

import { ledgerForDay, type QuotaLedger } from "./refresh";
import type { CamState } from "../src/domain/cams";

export type Role = "sweep" | "rediscover";

/**
 * wrangler.jsonc の `triggers.crons` と対で持つ。**両者は必ず一致させること**
 * (`worker/schedule.test.ts` が wrangler.jsonc を読んで突き合わせる)。
 *
 * 再探索を毎正時ちょうどに置かないのは、10 分ごとの生存確認と同じ分に起きると
 * 両者が同じ正本を読んで別々に書き戻し、**後勝ちで一方の消費と状態が丸ごと
 * 消える**ため。台帳を正本に同居させた分、取りこぼしの被害が上限ガードにも
 * 及ぶので、そもそも重ならない分にずらしてある。
 */
export const CRON: Record<Role, string> = {
  sweep: "*/10 * * * *",
  rediscover: "5 * * * *",
};

const ROLES = Object.keys(CRON) as Role[];

/**
 * その Cron 式が何分に起きるかを並べる。
 * 扱うのはこのリポジトリが使う 2 つの形だけで、それ以外は解釈しない
 * (黙って既定に倒すと、重なりの検査をすり抜けてしまう)。
 */
export function firingMinutes(cron: string): number[] {
  const every = /^\*\/(\d+) \* \* \* \*$/.exec(cron);
  if (every !== null) {
    const step = Number(every[1]);
    return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  }
  const fixed = /^(\d+) \* \* \* \*$/.exec(cron);
  if (fixed !== null) return [Number(fixed[1])];
  throw new Error(`分を解釈できない Cron 式: ${cron}`);
}

/**
 * 発火した Cron 式から役割を引く。
 * 知らない式に既定の役割を与えないのは、wrangler.jsonc だけを書き換えたときに
 * **全実行が片方の役割になって**枠も台帳も入れ替わるのを避けるため。
 */
export function roleForCron(cron: string): Role | null {
  return ROLES.find((role) => CRON[role] === cron) ?? null;
}

/**
 * 正本。title と checkedAt を含む、更新アルゴリズムが読む側。
 *
 * クォータ台帳を**同居させている**。別キーに分けると 1 実行あたりの KV 書き込みが
 * 1 本増え、Cron 7 回/時 × 24 時間で無料枠(1,000 write/日)の半分を焼く。
 * 正本はどのみち毎回書くので、台帳を相乗りさせても書き込みは増えない。
 */
export interface StatePayload {
  updatedAt: string;
  cams: Record<string, CamState>;
  /** 役割ごとの台帳。旧い正本には無いので省略可。 */
  ledgers?: Partial<Record<Role, QuotaLedger>>;
}

/**
 * 正本が持っている台帳を、その日のぶんとして読む。
 * まだ持っていなければ `null`(呼び出し側が旧キーから引き継ぐ)。
 */
export function ledgerIn(payload: StatePayload, role: Role, now: Date): QuotaLedger | null {
  const stored = payload.ledgers?.[role];
  return stored === undefined ? null : ledgerForDay(stored, now);
}

/** 台帳を差し替えた正本を返す。他方の役割のぶんはそのまま持ち越す。 */
export function withLedger(
  payload: StatePayload,
  role: Role,
  ledger: QuotaLedger,
): StatePayload {
  return { ...payload, ledgers: { ...payload.ledgers, [role]: ledger } };
}
