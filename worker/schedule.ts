// Conventions around Cron execution.
//
//   - which Cron expression is which role
//   - where in the source of truth the quota ledger of that role is kept
//
// KV has no atomic update, so **keeping a single writer per key** is the only way to avoid
// races. This file is where that premise is put into types and functions.

import { ledgerForDay, type QuotaLedger } from "./refresh";
import type { CamState } from "../src/domain/cams";

export type Role = "sweep" | "rediscover";

/**
 * Kept as a pair with `triggers.crons` in wrangler.jsonc. **The two must always match**
 * (`worker/schedule.test.ts` reads wrangler.jsonc and cross-checks them).
 *
 * Rediscovery is not placed exactly on the hour because, if it fires in the same minute as
 * the 10-minute liveness sweep, both read the same source of truth and write it back
 * separately, and **with last write wins the consumption and state of one of them are lost
 * entirely**. Because the ledger lives inside the source of truth, the damage of a lost write
 * also reaches the cap guard, so it is shifted to a minute that never overlaps in the first
 * place.
 */
export const CRON: Record<Role, string> = {
  sweep: "*/10 * * * *",
  rediscover: "5 * * * *",
};

const ROLES = Object.keys(CRON) as Role[];

/**
 * Lists the minutes at which that Cron expression fires.
 * Only the 2 forms this repository uses are handled; anything else is not interpreted
 * (silently falling back to a default would slip past the overlap check).
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
 * Looks up the role from the Cron expression that fired.
 * An unknown expression gets no default role, to avoid **every run taking one role** and the
 * budget and the ledger being swapped when only wrangler.jsonc is edited.
 */
export function roleForCron(cron: string): Role | null {
  return ROLES.find((role) => CRON[role] === cron) ?? null;
}

/**
 * Source of truth. Includes title and checkedAt; the side the update algorithm reads.
 *
 * The quota ledger **lives inside it**. Splitting it into a separate key adds 1 KV write per
 * run, and at Cron 7 runs/hour x 24 hours burns half of the free tier (1,000 writes/day).
 * The source of truth is written every time anyway, so letting the ledger ride along does
 * not add writes.
 */
export interface StatePayload {
  updatedAt: string;
  cams: Record<string, CamState>;
  /** Ledger per role. Optional because an old source of truth does not have it. */
  ledgers?: Partial<Record<Role, QuotaLedger>>;
}

/**
 * Reads the ledger held by the source of truth as that day's ledger.
 * `null` if it does not have one yet (the caller takes it over from the legacy key).
 */
export function ledgerIn(payload: StatePayload, role: Role, now: Date): QuotaLedger | null {
  const stored = payload.ledgers?.[role];
  return stored === undefined ? null : ledgerForDay(stored, now);
}

/**
 * Returns the source of truth with the ledger replaced. The other role's ledger is carried
 * over as is.
 */
export function withLedger(
  payload: StatePayload,
  role: Role,
  ledger: QuotaLedger,
): StatePayload {
  return { ...payload, ledgers: { ...payload.ledgers, [role]: ledger } };
}
