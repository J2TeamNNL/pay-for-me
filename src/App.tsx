import { useState } from 'react'
import { Avatar } from './components/Avatar'
import { DebtorList } from './components/DebtorList'
import { GachaSpinner } from './components/GachaSpinner'
import { Leaderboard } from './components/Leaderboard'
import { PersonaBar } from './components/PersonaBar'
import { PostDebtForm } from './components/PostDebtForm'
import { SwipeDeck } from './components/SwipeDeck'
import { useLang } from './i18n'
import { useStore } from './store'

type Tab = 'swipe' | 'gacha' | 'list' | 'post' | 'board'

export default function App() {
  const { lang, t, setLang } = useLang()
  const { dispatch } = useStore()
  const [tab, setTab] = useState<Tab>('swipe')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'swipe', label: `🔥 ${t.tabSwipe}` },
    { id: 'gacha', label: `🎰 ${t.tabGacha}` },
    { id: 'list', label: `📋 ${t.tabList}` },
    { id: 'post', label: `📝 ${t.tabPost}` },
    { id: 'board', label: `🏆 ${t.tabBoard}` },
  ]

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <Avatar image="/brand/logo.png" emoji="💸" size={44} />
          <div>
            <h1>PayForMe</h1>
            <p className="muted small">{t.tagline}</p>
          </div>
        </div>
        <button className="lang" onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}>
          {lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
        </button>
      </header>

      <PersonaBar />

      <nav className="tabs">
        {tabs.map((x) => (
          <button key={x.id} className={tab === x.id ? 'active' : ''} onClick={() => setTab(x.id)}>
            {x.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'swipe' && <SwipeDeck />}
        {tab === 'gacha' && <GachaSpinner />}
        {tab === 'list' && <DebtorList />}
        {tab === 'post' && <PostDebtForm onPosted={() => setTab('swipe')} />}
        {tab === 'board' && <Leaderboard />}
      </main>

      <footer className="footer">
        <p className="muted small">{t.disclaimer}</p>
        <p className="muted small ai-notice">{t.aiNotice}</p>
        <a className="link github" href="https://github.com/J2TeamNNL/pay-for-me" target="_blank" rel="noopener noreferrer">
          ⭐ {t.github}
        </a>
        <button className="rebirth" onClick={() => confirm(t.resetConfirm) && dispatch({ type: 'reset' })}>
          {t.resetAll}
        </button>
      </footer>
    </div>
  )
}
