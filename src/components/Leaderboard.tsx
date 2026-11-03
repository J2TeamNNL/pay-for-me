import { useMemo } from 'react'
import { formatVnd, useLang } from '../i18n'
import { useStore } from '../store'
import { Avatar } from './Avatar'

const MEDALS = ['🥇', '🥈', '🥉']

export function Leaderboard() {
  const { state } = useStore()
  const { lang, t } = useLang()

  const givers = useMemo(() => {
    const totals = new Map<string, { total: number; count: number }>()
    for (const p of state.payments) {
      const cur = totals.get(p.billionaireId) ?? { total: 0, count: 0 }
      totals.set(p.billionaireId, { total: cur.total + p.amount, count: cur.count + 1 })
    }
    return state.billionaires
      .filter((b) => totals.has(b.id))
      .map((b) => ({ ...b, ...totals.get(b.id)! }))
      .sort((a, b) => b.total - a.total)
  }, [state.payments, state.billionaires])

  const rescued = useMemo(
    () => state.debts.filter((d) => d.paidBy).sort((a, b) => b.amount - a.amount),
    [state.debts],
  )

  if (!givers.length) return <div className="panel center"><div className="empty-emoji">🦗</div><p>{t.boardEmpty}</p></div>

  const nameOf = (id?: string) => state.billionaires.find((b) => b.id === id)?.name ?? '?'

  return (
    <div className="board">
      <section className="panel">
        <h2>{t.boardGiver}</h2>
        <ol className="rank">
          {givers.map((g, i) => (
            <li key={g.id}>
              <span className="medal">{MEDALS[i] ?? `#${i + 1}`}</span>
              <Avatar image={g.image} emoji={g.avatar} size={40} />
              <span className="grow">{g.name} <span className="muted">· {t.paidCount(g.count)}</span></span>
              <strong>{formatVnd(g.total, lang)}</strong>
            </li>
          ))}
        </ol>
      </section>
      <section className="panel">
        <h2>{t.boardDebtor}</h2>
        <ol className="rank">
          {rescued.map((d) => (
            <li key={d.id}>
              <Avatar image={d.image} emoji={d.avatar} size={40} />
              <span className="grow">{d.debtor} <span className="muted">← {nameOf(d.paidBy)}</span></span>
              <strong>{formatVnd(d.amount, lang)}</strong>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
