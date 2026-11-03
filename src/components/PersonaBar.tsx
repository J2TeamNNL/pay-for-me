import { useState } from 'react'
import { formatVnd, useLang } from '../i18n'
import { useActiveBillionaire, useStore } from '../store'
import { Avatar } from './Avatar'

export function PersonaBar() {
  const { state, dispatch } = useStore()
  const { lang, t } = useLang()
  const active = useActiveBillionaire()
  const [open, setOpen] = useState(false)

  return (
    <div className="persona">
      <button className="persona-current" onClick={() => setOpen((o) => !o)} title={t.switchPersona}>
        <Avatar image={active.image} emoji={active.avatar} size={44} />
        <span className="persona-text">
          <span className="muted small">{t.youAre}</span>
          <strong>{active.name}</strong>
          <span className="small">{t.balance}: {formatVnd(active.netWorth, lang)}</span>
        </span>
        <span className="caret">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="persona-list">
          {state.billionaires.map((b) => (
            <li key={b.id}>
              <button
                className={b.id === active.id ? 'active' : ''}
                onClick={() => {
                  dispatch({ type: 'selectBillionaire', id: b.id })
                  setOpen(false)
                }}
              >
                <Avatar image={b.image} emoji={b.avatar} size={36} />
                <span className="grow">
                  <strong>{b.name}</strong>
                  <span className="muted small">{b.quirk}</span>
                  {b.bio && <span className="small bio-line">{b.bio}</span>}
                </span>
                <span className="small">{formatVnd(b.netWorth, lang)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
