import { useState } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { CATEGORY_META, formatVnd, useLang, useLocalize } from '../i18n'
import type { Debt } from '../types'
import { Avatar } from './Avatar'

const SWIPE_THRESHOLD = 120
const REGION_FLAG = { vn: '🇻🇳', asia: '🌏', world: '🌍' } as const

interface Props {
  debt: Debt
  isTop: boolean
  onSwipe: (dir: 'left' | 'right') => void
}

export function DebtCard({ debt: raw, isTop, onSwipe }: Props) {
  const { lang, t } = useLang()
  const debt = useLocalize().debt(raw)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-18, 18])
  const payOpacity = useTransform(x, [20, SWIPE_THRESHOLD], [0, 1])
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, -20], [1, 0])
  const cat = CATEGORY_META[debt.category]
  const [showBio, setShowBio] = useState(false)

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) onSwipe('right')
    else if (info.offset.x < -SWIPE_THRESHOLD) onSwipe('left')
  }

  return (
    <motion.div
      className="card"
      style={{ x, rotate, zIndex: isTop ? 2 : 1 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.94, y: isTop ? 0 : 14 }}
      animate={{ scale: isTop ? 1 : 0.94, y: isTop ? 0 : 14 }}
      exit={{ x: x.get() >= 0 ? 600 : -600, opacity: 0, transition: { duration: 0.3 } }}
    >
      <motion.div className="stamp stamp-pay" style={{ opacity: payOpacity }}>PAY</motion.div>
      <motion.div className="stamp stamp-nope" style={{ opacity: nopeOpacity }}>NOPE</motion.div>
      <div className="card-hero" style={debt.cover ? { backgroundImage: `url(${debt.cover})` } : undefined}>
        <Avatar image={debt.image} emoji={debt.avatar} size={180} />
      </div>
      <div className="card-body">
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
          <button className="bio-toggle" onPointerDown={(e) => e.stopPropagation()} onClick={() => setShowBio((v) => !v)}>
            {showBio ? '▲' : '▼'} {t.bio}
          </button>
        )}
        {showBio && <p className="bio">{debt.bio}</p>}
      </div>
    </motion.div>
  )
}
