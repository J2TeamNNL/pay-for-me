import type { Bill, Debt, Rarity } from '../types'

export type GachaItem =
  | { kind: 'debt'; id: string; rarity: Rarity; debt: Debt }
  | { kind: 'bill'; id: string; rarity: Rarity; bill: Bill }

export const RARITY_WEIGHT: Record<Rarity, number> = { common: 60, rare: 25, epic: 11, legendary: 4 }
export const RARITY_COLOR: Record<Rarity, string> = { common: '#8b95a7', rare: '#3b82f6', epic: '#a855f7', legendary: '#f5b400' }

export const debtRarity = (amount: number): Rarity =>
  amount < 5_000_000 ? 'common' : amount < 20_000_000 ? 'rare' : amount < 100_000_000 ? 'epic' : 'legendary'

export function buildPool(debts: Debt[], bills: Bill[]): GachaItem[] {
  return [
    ...debts.map((debt) => ({ kind: 'debt' as const, id: debt.id, rarity: debtRarity(debt.amount), debt })),
    ...bills.map((bill) => ({ kind: 'bill' as const, id: bill.id, rarity: bill.rarity, bill })),
  ]
}

export function pickWeighted<T extends { rarity: Rarity }>(items: T[], random = Math.random): T {
  const total = items.reduce((s, it) => s + RARITY_WEIGHT[it.rarity], 0)
  let remaining = random() * total
  for (const it of items) if ((remaining -= RARITY_WEIGHT[it.rarity]) < 0) return it
  return items[items.length - 1]
}

// Winner is chosen before the animation; the reel is cosmetic and lands on it.
export function createSpin(pool: GachaItem[], random = Math.random) {
  const winner = pickWeighted(pool, random)
  const tiles = 30 + Math.floor(random() * 11)
  const reel = Array.from({ length: tiles + 5 }, (_, i) => (i === tiles ? winner : pickWeighted(pool, random)))
  return {
    winner,
    reel,
    winnerIndex: tiles,
    stopFraction: (Math.floor(random() * 81) + 10) / 100,
    durationMs: 6000 + Math.floor(random() * 2001),
    friction: 2.7 + random() * 0.6,
  }
}

export const spinProgress = (p: number, friction: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), friction)
