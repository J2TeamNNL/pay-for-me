import { motion } from 'framer-motion'
import { useLang } from '../i18n'
import type { Billionaire, Debt } from '../types'
import { Avatar } from './Avatar'

interface Props {
  debt: Debt
  payer: Billionaire
  text: string
  onClose: () => void
}

export function MatchModal({ debt, payer, text, onClose }: Props) {
  const { t } = useLang()
  return (
    <div className="overlay" onClick={onClose}>
      <motion.div
        className="modal"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="match-title">{t.matchTitle}</h2>
        <div className="match-pair">
          <Avatar image={payer.image} emoji={payer.avatar} size={96} />
          <span className="heart">💘</span>
          <Avatar image={debt.image} emoji={debt.avatar} size={96} />
        </div>
        <p>{text}</p>
        <button className="btn btn-pay" onClick={onClose}>
          {t.matchClose}
        </button>
      </motion.div>
    </div>
  )
}
