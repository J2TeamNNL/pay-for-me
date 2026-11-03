import confetti from 'canvas-confetti'
import { useCallback, useMemo, useState } from 'react'
import { CATEGORY_META, formatVnd, useLang, useLocalize } from '../i18n'
import { useActiveBillionaire, useStore } from '../store'
import type { Debt, Region } from '../types'
import { Avatar } from './Avatar'
import { DebtDetailModal } from './DebtDetailModal'

type RegionFilter = 'all' | Region
type StatusFilter = 'all' | 'unpaid' | 'paid'
type Sort = 'amountDesc' | 'amountAsc' | 'newest'

const REGION_FLAG: Record<Region, string> = { vn: '🇻🇳', asia: '🌏', world: '🌍' }

const SORTERS: Record<Sort, (a: Debt, b: Debt) => number> = {
  amountDesc: (a, b) => b.amount - a.amount,
  amountAsc: (a, b) => a.amount - b.amount,
  newest: (a, b) => b.createdAt - a.createdAt,
}

export function DebtorList() {
  const { state, dispatch } = useStore()
  const { lang, t } = useLang()
  const L = useLocalize()
  const payer = useActiveBillionaire()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState<RegionFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [sort, setSort] = useState<Sort>('amountDesc')
  const [openId, setOpenId] = useState<string | null>(null)

  const debts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.debts
      .map(L.debt)
      .filter((d) => region === 'all' || d.region === region)
      .filter((d) => status === 'all' || (status === 'paid') === !!d.paidBy)
      .filter((d) => !q || d.debtor.toLowerCase().includes(q) || d.story.toLowerCase().includes(q))
      .sort(SORTERS[sort])
  }, [state.debts, L, query, region, status, sort])

  const openedRaw = openId ? state.debts.find((d) => d.id === openId) : undefined
  const opened = openedRaw && L.debt(openedRaw)
  const closeDetail = useCallback(() => setOpenId(null), [])

  const total = debts.filter((d) => !d.paidBy).reduce((s, d) => s + d.amount, 0)
  const payerName = (id: string) => L.billionaire(state.billionaires.find((b) => b.id === id) ?? payer).name

  const pay = (d: Debt) => {
    if (payer.netWorth < d.amount) return alert(t.broke)
    dispatch({ type: 'pay', debtId: d.id })
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } })
  }

  return (
    <section className="list">
      <div className="panel list-filters">
        <input type="search" placeholder={t.listSearch} value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="row3">
          <select value={region} onChange={(e) => setRegion(e.target.value as RegionFilter)}>
            <option value="all">{t.listAllRegions}</option>
            {(Object.keys(REGION_FLAG) as Region[]).map((r) => (
              <option key={r} value={r}>
                {REGION_FLAG[r]} {t.region[r]}
              </option>
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)}>
            <option value="all">{t.listAllStatus}</option>
            <option value="unpaid">{t.listUnpaid}</option>
            <option value="paid">{t.listPaid}</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="amountDesc">{t.sortAmountDesc}</option>
            <option value="amountAsc">{t.sortAmountAsc}</option>
            <option value="newest">{t.sortNewest}</option>
          </select>
        </div>
        <p className="muted small">{t.listSummary(debts.length, formatVnd(total, lang))}</p>
      </div>

      {!debts.length && <div className="panel center muted">{t.listEmpty}</div>}

      <ul className="debtor-grid">
        {debts.map((d) => {
          const cat = CATEGORY_META[d.category]
          return (
            <li
              key={d.id}
              className={`panel debtor ${d.paidBy ? 'is-paid' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setOpenId(d.id)}
              onKeyDown={(e) => e.key === 'Enter' && setOpenId(d.id)}
            >
              <div className="debtor-head">
                <Avatar image={d.image} emoji={d.avatar} size={56} />
                <div className="grow">
                  <strong>
                    {d.debtor} {d.region && REGION_FLAG[d.region]}
                  </strong>
                  <span className="muted small">
                    {d.age} {t.ageSuffix} · {cat.icon} {cat[lang]}
                  </span>
                </div>
                <span className="debtor-amount">{formatVnd(d.amount, lang)}</span>
              </div>
              <p className="story">“{d.story}”</p>
              <div className="debtor-actions">
                <span className="muted small">{t.viewDetail} →</span>
                {d.paidBy ? (
                  <span className="paid-badge">✅ {t.paidByLabel(payerName(d.paidBy))}</span>
                ) : (
                  <button
                    className="btn btn-pay btn-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      pay(d)
                    }}
                  >
                    {t.pay}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {opened && (
        <DebtDetailModal
          debt={opened}
          paidByName={opened.paidBy && payerName(opened.paidBy)}
          onPay={() => pay(opened)}
          onClose={closeDetail}
        />
      )}
    </section>
  )
}
