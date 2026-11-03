import { useState, type FormEvent } from 'react'
import { CATEGORY_META, useLang } from '../i18n'
import { useStore } from '../store'
import type { DebtCategory } from '../types'

const AVATARS = ['😭', '🥲', '😵‍💫', '🤡', '🫠', '💀', '🙃', '🥺']
const MAX_AMOUNT = 10_000_000_000

export function PostDebtForm({ onPosted }: { onPosted: () => void }) {
  const { dispatch } = useStore()
  const { lang, t } = useLang()
  const [form, setForm] = useState({ debtor: '', age: 25, category: 'electric' as DebtCategory, amount: 1_000_000, story: '', avatar: AVATARS[0] })
  const [done, setDone] = useState(false)

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    dispatch({
      type: 'post',
      debt: { ...form, debtor: form.debtor.trim(), story: form.story.trim(), amount: Math.min(Math.max(form.amount, 1000), MAX_AMOUNT) },
    })
    setDone(true)
    setTimeout(onPosted, 1200)
  }

  if (done) return <div className="panel center"><div className="empty-emoji">📮</div><p>{t.formDone}</p></div>

  return (
    <form className="panel form" onSubmit={submit}>
      <h2>{t.formTitle}</h2>
      <label>
        {t.formAvatar}
        <div className="emoji-row">
          {AVATARS.map((a) => (
            <button type="button" key={a} className={`emoji-btn ${form.avatar === a ? 'active' : ''}`} onClick={() => set('avatar', a)}>
              {a}
            </button>
          ))}
        </div>
      </label>
      <label>
        {t.formName}
        <input required maxLength={40} value={form.debtor} onChange={(e) => set('debtor', e.target.value)} />
      </label>
      <div className="row">
        <label>
          {t.formAge}
          <input type="number" min={18} max={120} value={form.age} onChange={(e) => set('age', Number(e.target.value))} />
        </label>
        <label>
          {t.formCategory}
          <select value={form.category} onChange={(e) => set('category', e.target.value as DebtCategory)}>
            {(Object.keys(CATEGORY_META) as DebtCategory[]).map((c) => (
              <option key={c} value={c}>
                {CATEGORY_META[c].icon} {CATEGORY_META[c][lang]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {t.formAmount}
        <input type="number" min={1000} max={MAX_AMOUNT} step={1000} value={form.amount} onChange={(e) => set('amount', Number(e.target.value))} />
      </label>
      <label>
        {t.formStory}
        <textarea required maxLength={240} rows={3} value={form.story} onChange={(e) => set('story', e.target.value)} />
      </label>
      <button className="btn btn-pay" type="submit">
        {t.formSubmit}
      </button>
    </form>
  )
}
