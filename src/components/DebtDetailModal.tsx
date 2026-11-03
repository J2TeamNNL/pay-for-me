import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { CATEGORY_META, formatVnd, useLang } from '../i18n'
import type { Debt, Region } from '../types'
import { Avatar } from './Avatar'

const REGION_FLAG: Record<Region, string> = { vn: '🇻🇳', asia: '🌏', world: '🌍' }

interface Props {
  debt: Debt
  paidByName?: string
  onPay: () => void
  onClose: () => void
}

export function DebtDetailModal({ debt, paidByName, onPay, onClose }: Props) {
  const { lang, t } = useLang()
  const cat = CATEGORY_META[debt.category]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <motion.div
        className="modal debt-detail"
        role="dialog"
        aria-modal="true"
        aria-label={debt.debtor}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <div className="card-hero" style={debt.cover ? { backgroundImage: `url(${debt.cover})` } : undefined}>
          <Avatar image={debt.image} emoji={debt.avatar} size={140} />
        </div>
        <div className="debt-detail-body">
          <h2>
            {debt.debtor}, <span className="muted">{debt.age} {t.ageSuffix}</span>
            {debt.region && <span className="flag">{REGION_FLAG[debt.region]}</span>}
          </h2>
          <div className="chip">
            {cat.icon} {cat[lang]}
          </div>
          <div className="amount">{formatVnd(debt.amount, lang)}</div>
          <p className="story">“{debt.story}”</p>
          {debt.bio && (
            <>
              <strong className="small">{t.bio}</strong>
              <p className="bio">{debt.bio}</p>
            </>
          )}
          {paidByName ? (
            <span className="paid-badge">✅ {t.paidByLabel(paidByName)}</span>
          ) : (
            <button className="btn btn-pay" onClick={onPay}>
              {t.pay}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
