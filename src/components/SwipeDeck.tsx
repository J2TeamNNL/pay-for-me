import confetti from 'canvas-confetti'
import { AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { formatVnd, useLang } from '../i18n'
import { useActiveBillionaire, useStore } from '../store'
import type { Debt } from '../types'
import { DebtCard } from './DebtCard'
import { MatchModal } from './MatchModal'

export function SwipeDeck() {
  const { state, dispatch } = useStore()
  const { lang, t } = useLang()
  const payer = useActiveBillionaire()
  const [match, setMatch] = useState<Debt | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const queue = useMemo(
    () => state.debts.filter((d) => !d.paidBy && !state.skipped.includes(d.id)),
    [state.debts, state.skipped],
  )

  const swipe = (debt: Debt, dir: 'left' | 'right') => {
    if (dir === 'left') return dispatch({ type: 'skip', debtId: debt.id })
    if (payer.netWorth < debt.amount) {
      setToast(t.broke)
      setTimeout(() => setToast(null), 2500)
      return
    }
    dispatch({ type: 'pay', debtId: debt.id })
    setMatch(debt)
    confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } })
  }

  const top = queue[0]

  return (
    <section className="deck-wrap">
      <div className="deck">
        <AnimatePresence>
          {queue
            .slice(0, 2)
            .reverse()
            .map((d) => (
              <DebtCard key={d.id} debt={d} isTop={d.id === top?.id} onSwipe={(dir) => swipe(d, dir)} />
            ))}
        </AnimatePresence>
        {!top && (
          <div className="empty">
            <div className="empty-emoji">🏝️</div>
            <h3>{t.emptyTitle}</h3>
            <p className="muted">{t.emptyDesc}</p>
            {state.skipped.length > 0 && (
              <button className="btn" onClick={() => dispatch({ type: 'clearSkipped' })}>
                {t.resetSkipped}
              </button>
            )}
          </div>
        )}
      </div>

      {top && (
        <div className="actions">
          <button className="btn btn-nope" onClick={() => swipe(top, 'left')}>
            {t.skip}
          </button>
          <button className="btn btn-pay" onClick={() => swipe(top, 'right')}>
            {t.pay}
          </button>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}

      {match && (
        <MatchModal
          debt={match}
          payer={payer}
          text={t.matchDesc(payer.name, match.debtor, formatVnd(match.amount, lang))}
          onClose={() => setMatch(null)}
        />
      )}
    </section>
  )
}
