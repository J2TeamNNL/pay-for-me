import confetti from 'canvas-confetti'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SEED_BILLS } from '../data/seed'
import { CATEGORY_META, formatVnd, useLang, useLocalize } from '../i18n'
import { buildPool, createSpin, RARITY_COLOR, spinProgress, type GachaItem } from '../lib/gacha'
import { shuffle } from '../lib/shuffle'
import { playOpen, playReveal, playTick, preloadSounds } from '../lib/sfx'
import { useActiveBillionaire, useStore } from '../store'
import { Avatar } from './Avatar'

const TILE = 132

function Tile({ item: raw }: { item: GachaItem }) {
  const item = localizeItem(raw, useLocalize())
  const style = { borderBottomColor: RARITY_COLOR[item.rarity] }
  if (item.kind === 'debt') {
    return (
      <div className="tile" style={style}>
        <Avatar image={item.debt.image} emoji={item.debt.avatar} size={72} />
        <span className="tile-name">{item.debt.debtor}</span>
      </div>
    )
  }
  return (
    <div className="tile" style={style}>
      {item.bill.image ? <img className="tile-bill" src={item.bill.image} alt="" /> : <span className="tile-emoji">🧾</span>}
      <span className="tile-name">{item.bill.title}</span>
    </div>
  )
}

const localizeItem = (item: GachaItem, L: ReturnType<typeof useLocalize>): GachaItem =>
   item.kind === 'debt' ? { ...item, debt: L.debt(item.debt) } : { ...item, bill: L.bill(item.bill) }

export function GachaSpinner() {
  const { state, dispatch } = useStore()
  const { lang, t } = useLang()
  const L = useLocalize()
  const payer = useActiveBillionaire()
  const viewportRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const [spin, setSpin] = useState<ReturnType<typeof createSpin> | null>(null)
  const [rawResult, setResult] = useState<GachaItem | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const pool = useMemo(
    () => buildPool(state.debts.filter((d) => !d.paidBy), SEED_BILLS.filter((b) => !state.paidBills.includes(b.id))),
    [state.debts, state.paidBills],
  )
  const idleReel = useMemo(() => shuffle(pool).slice(0, 8), [pool])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const start = () => {
    if (!pool.length || (spin && !result)) return
    preloadSounds()
    playOpen()
    const next = createSpin(pool)
    setSpin(next)
    setResult(null)
    requestAnimationFrame(() => animate(next))
  }

  const animate = (s: ReturnType<typeof createSpin>) => {
    const strip = stripRef.current
    const viewport = viewportRef.current
    if (!strip || !viewport) return
    const center = viewport.clientWidth / 2
    const target = s.winnerIndex * TILE + s.stopFraction * TILE - center
    const begin = performance.now()
    let lastTile = -1
    const step = (now: number) => {
      const p = (now - begin) / s.durationMs
      const offset = target * spinProgress(p, s.friction)
      strip.style.transform = `translateX(${-offset}px)`
      const tile = Math.floor((offset + center) / TILE)
      if (tile !== lastTile) {
        lastTile = tile
        playTick()
      }
      if (p < 1) frameRef.current = requestAnimationFrame(step)
      else reveal(s.winner)
    }
    frameRef.current = requestAnimationFrame(step)
  }

  const reveal = (item: GachaItem) => {
    setResult(item)
    playReveal(item.rarity)
    if (item.rarity === 'epic' || item.rarity === 'legendary') {
      confetti({ particleCount: 200, spread: 100, colors: [RARITY_COLOR[item.rarity], '#ffffff'] })
    }
  }

  const result = rawResult && localizeItem(rawResult, L)
  const amount = result ? (result.kind === 'debt' ? result.debt.amount : result.bill.amount) : 0
  const paid = result ? (result.kind === 'debt' ? !!state.debts.find((d) => d.id === result.id)?.paidBy : state.paidBills.includes(result.id)) : false

  const pay = () => {
    if (!result) return
    if (payer.netWorth < amount) {
      setToast(t.broke)
      setTimeout(() => setToast(null), 2500)
      return
    }
    dispatch(result.kind === 'debt' ? { type: 'pay', debtId: result.id } : { type: 'payBill', billId: result.id })
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } })
  }

  const spinning = !!spin && !result

  return (
    <section className="gacha">
      <div className="panel center">
        <h2>🎁 {t.gachaTitle}</h2>
        <p className="muted small">{t.gachaDesc}</p>
      </div>

      <div className="reel" ref={viewportRef}>
        <div className="reel-marker" />
        <div className="reel-strip" ref={stripRef}>
          {(spin?.reel ?? idleReel).map((item, i) => (
            <Tile key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>

      <button className="btn btn-pay" disabled={spinning || !pool.length} onClick={start}>
        {!pool.length ? t.gachaEmpty : spinning ? t.gachaSpinning : result ? t.gachaAgain : t.gachaSpin}
      </button>

      {result && (
        <div className="panel result" style={{ borderColor: RARITY_COLOR[result.rarity] }}>
          <span className="rarity-badge" style={{ background: RARITY_COLOR[result.rarity] }}>
            {t.rarity[result.rarity]}
          </span>
          {result.kind === 'debt' ? (
            <>
              <Avatar image={result.debt.image} emoji={result.debt.avatar} size={120} />
              <h3>{result.debt.debtor}</h3>
              <p className="muted">“{result.debt.story}”</p>
            </>
          ) : (
            <>
              {result.bill.image ? <img className="result-bill" src={result.bill.image} alt={result.bill.title} /> : <div className="empty-emoji">🧾</div>}
              <h3>{result.bill.title}</h3>
              <p className="muted small">
                {CATEGORY_META[result.bill.category].icon} {result.bill.issuer}
              </p>
              <p className="muted">“{result.bill.joke}”</p>
            </>
          )}
          <div className="amount">{formatVnd(amount, lang)}</div>
          <button className="btn btn-pay" disabled={paid} onClick={pay}>
            {paid ? t.gachaPaid : result.kind === 'debt' ? t.gachaPayDebt : t.gachaPayBill}
          </button>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </section>
  )
}
