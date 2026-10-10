import { useEffect, useState } from 'react'
import { adminFetch, londonToday } from '../../lib/adminApi'

const STATUS_STYLE = {
  pending: 'bg-oak/30 text-oak-dark',
  confirmed: 'bg-leaf/15 text-leaf',
  cancelled: 'bg-ink/10 text-ink/50',
}

const prettyDate = (d) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  })

export default function ReservationsTab() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all | pending | confirmed | cancelled
  const [showPast, setShowPast] = useState(false)

  useEffect(() => {
    adminFetch('/reservations')
      .then(setRows)
      .catch((e) => setError(e.message))
  }, [])

  const setStatus = async (id, status) => {
    setError('')
    try {
      const updated = await adminFetch(`/reservations/${id}`, { method: 'PATCH', body: { status } })
      setRows((all) => all.map((r) => (r.id === id ? updated : r)))
    } catch (e) {
      setError(e.message)
    }
  }

  if (rows === null && !error) return <p className="text-ink/70">Loading…</p>

  const today = londonToday()
  const visible = (rows || []).filter(
    (r) => (filter === 'all' || r.status === filter) && (showPast || r.date >= today)
  )
  const pendingCount = (rows || []).filter((r) => r.status === 'pending' && r.date >= today).length

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {['all', 'pending', 'confirmed', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1 text-sm capitalize ${
              filter === s ? 'border-lantern bg-lantern text-paper' : 'border-oak/60 hover:border-oak-dark'
            }`}
          >
            {s}
            {s === 'pending' && pendingCount > 0 ? ` (${pendingCount})` : ''}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" checked={showPast} onChange={(e) => setShowPast(e.target.checked)} />
          Include past dates
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-lantern">{error}</p>}
      {rows && visible.length === 0 && <p className="mt-8 text-ink/60">No reservations to show.</p>}

      <ul className="mt-6 space-y-3">
        {visible.map((r) => (
          <li key={r.id} className="rounded-2xl border border-oak/50 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {prettyDate(r.date)} · {r.time} · {r.guests} {r.guests === 1 ? 'guest' : 'guests'}
                </p>
                <p className="mt-1 text-sm">
                  {r.name} ·{' '}
                  <a href={`tel:${r.phone.replace(/\s/g, '')}`} className="text-lantern hover:underline">
                    {r.phone}
                  </a>
                  {r.email && <span className="text-ink/60"> · {r.email}</span>}
                </p>
                {r.notes && <p className="mt-1 text-sm text-ink/70">Note: {r.notes}</p>}
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLE[r.status]}`}>
                {r.status}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              {r.status !== 'confirmed' && (
                <button
                  onClick={() => setStatus(r.id, 'confirmed')}
                  className="rounded-full bg-leaf px-4 py-1 text-sm text-paper hover:bg-leaf/85"
                >
                  Confirm
                </button>
              )}
              {r.status !== 'cancelled' && (
                <button
                  onClick={() => {
                    if (window.confirm(`Cancel the booking for ${r.name}?`)) setStatus(r.id, 'cancelled')
                  }}
                  className="rounded-full border border-lantern px-4 py-1 text-sm text-lantern hover:bg-lantern hover:text-paper"
                >
                  Cancel
                </button>
              )}
              {r.status === 'cancelled' && (
                <button
                  onClick={() => setStatus(r.id, 'pending')}
                  className="rounded-full border border-oak/60 px-4 py-1 text-sm hover:border-oak-dark"
                >
                  Restore
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
