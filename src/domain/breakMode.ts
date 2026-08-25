// 休憩モード。「決めること」を全部こちらで引き受けるための道具。
//
// 休憩に来た人に場所を選ばせない。行き先はアプリが決める。選定の芯は
// 「見る人の時間帯と逆の場所へ連れて行く」こと — 夜に働いているなら昼の街へ、
// 昼なら夜の街へ。このアプリが元から持っている昼夜の計算を、そのまま
// 気分転換の意味に使う。

import type { Cam, CamState } from "./cams";
import { pickRandom } from "./cams";

/** 選べる休憩の長さ(分)。 */
export const BREAK_DURATIONS_MIN = [3, 5, 10] as const;
export type BreakDuration = (typeof BREAK_DURATIONS_MIN)[number];

/** 直近に見た場所を何件覚えておくか。 */
export const RECENT_KEEP = 8;

/**
 * その時刻が夜か。位置情報は要らない — 見る人の時計の「時」だけで足りる
 * (厳密な日没時刻を知りたいわけではなく、逆側へ振りたいだけなので)。
 */
export function isNightHour(hour: number): boolean {
  return hour >= 19 || hour < 6;
}

export interface DestinationContext {
  states: ReadonlyMap<string, CamState>;
  /** その土地がいま夜であるカメラの id。 */
  nightIds: ReadonlySet<string>;
  /** 直近に連れて行った場所。続けて同じところに行かないため。 */
  recentIds: readonly string[];
  /** 見る人のいまが夜か。行き先を逆に振る。 */
  viewerIsNight: boolean;
}

/**
 * 次に連れて行く場所。条件を満たすものが無ければ、条件を 1 段ずつ緩めて
 * 「どこにも行けない」を避ける。本当に 1 つもライブが無いときだけ null。
 */
export function pickDestination(
  cams: readonly Cam[],
  { states, nightIds, recentIds, viewerIsNight }: DestinationContext,
  rng: () => number,
): Cam | null {
  const liveCams = cams.filter((cam) => states.get(cam.id)?.status === "live");
  if (liveCams.length === 0) return null;

  // 見る人が夜なら昼へ、昼なら夜へ。
  const opposite = liveCams.filter((cam) => nightIds.has(cam.id) !== viewerIsNight);
  const recent = new Set(recentIds);

  // 望ましい順に候補を並べ、空でない最初のものを使う。
  const fresh = (list: readonly Cam[]): Cam[] => list.filter((cam) => !recent.has(cam.id));
  const tiers = [fresh(opposite), fresh(liveCams), opposite, liveCams];
  const pool = tiers.find((tier) => tier.length > 0)!;

  return pickRandom(pool, rng);
}

export interface BreakProgress {
  /** 0..1。 */
  ratio: number;
  remainingSeconds: number;
  done: boolean;
}

export function breakProgress(startedAt: Date, now: Date, durationMinutes: number): BreakProgress {
  const total = durationMinutes * 60_000;
  const elapsed = Math.min(total, Math.max(0, now.getTime() - startedAt.getTime()));
  return {
    ratio: elapsed / total,
    remainingSeconds: Math.round((total - elapsed) / 1000),
    done: elapsed >= total,
  };
}

/** 残り時間を "4:12" の形に。 */
export function formatRemaining(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds - minutes * 60).padStart(2, "0")}`;
}

const SCHEMA_VERSION = 1;

export function decodeRecent(raw: string | null): string[] {
  if (raw === null) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return [];

  const { v, ids } = parsed as { v?: unknown; ids?: unknown };
  if (v !== SCHEMA_VERSION || !Array.isArray(ids)) return [];
  return ids.filter((id): id is string => typeof id === "string");
}

export function encodeRecent(ids: readonly string[]): string {
  return JSON.stringify({ v: SCHEMA_VERSION, ids });
}

/** 新しく行った場所を先頭に足す。同じ場所を続けて見ても重ならない。 */
export function rememberRecent(
  ids: readonly string[],
  id: string,
  keep = RECENT_KEEP,
): string[] {
  if (ids[0] === id) return [...ids];
  return [id, ...ids.filter((x) => x !== id)].slice(0, keep);
}
