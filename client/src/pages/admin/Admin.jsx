import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearToken, getToken } from '../../lib/adminApi'
import { restaurant } from '../../config/restaurant'
import Login from './Login'
import MenuTab from './MenuTab'
import ReservationsTab from './ReservationsTab'

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => !!getToken())
  const [tab, setTab] = useState('reservations')

  // adminFetch fires this when the server rejects our token (expired or invalid).
  useEffect(() => {
    const onLogout = () => setLoggedIn(false)
    window.addEventListener('admin-logout', onLogout)
    return () => window.removeEventListener('admin-logout', onLogout)
  }, [])

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  const logout = () => {
    clearToken()
    setLoggedIn(false)
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-oak/40 bg-paper-deep">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <p className="font-display text-xl font-bold">
            {restaurant.name} <span className="text-ink/50">admin</span>
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-ink/70 hover:text-ink">View site</Link>
            <button onClick={logout} className="rounded-full border border-oak/60 px-4 py-1 hover:border-oak-dark">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex gap-6 border-b border-oak/40">
          {[
            ['reservations', 'Reservations'],
            ['menu', 'Menu'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 pb-2 font-medium ${
                tab === key ? 'border-lantern text-lantern' : 'border-transparent text-ink/60 hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === 'reservations' ? <ReservationsTab /> : <MenuTab />}
      </main>
    </div>
  )
}
