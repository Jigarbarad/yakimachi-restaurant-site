import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurant } from '../config/restaurant'

const MAX_PARTY = 10
const MAX_DAYS_AHEAD = 60

// Dates are plain "YYYY-MM-DD" strings. The server is the real authority; this just helps the user.
const londonDate = (offsetDays = 0) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(
    new Date(Date.now() + offsetDays * 86400000)
  )

const field =
  'mt-1 w-full rounded border border-oak/60 bg-white px-3 py-2 text-sm focus:border-lantern focus:outline-none'

const prettyDate = (d) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC',
  })

export default function Reserve() {
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [time, setTime] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [slots, setSlots] = useState(null) // { date, list } for the date it was fetched for
  const [refresh, setRefresh] = useState(0) // bump to re-fetch availability
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done
  const [booking, setBooking] = useState(null)

  // Whenever the date changes (or we bump `refresh`), ask the server which slots are open.
  useEffect(() => {
    if (!date) return
    let ignore = false // if the user picks another date meanwhile, drop this stale answer
    fetch(`/api/reservations/availability?date=${date}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => !ignore && setSlots({ date, list: data.slots, closed: !!data.closed }))
      .catch(() => !ignore && setSlots({ date, list: null }))
    return () => {
      ignore = true
    }
  }, [date, refresh])

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrors({})
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, date, time, guests }),
      })
      const data = await res.json()
      if (res.ok) {
        setBooking(data)
        setStatus('done')
        return
      }
      setErrors(data.errors || { form: 'Something went wrong. Please try again.' })
      if (res.status === 409) {
        setTime('')
        setRefresh((n) => n + 1) // the slot filled up: reload the list
      }
    } catch {
      setErrors({ form: "Couldn't reach the server. Please try again, or call us." })
    }
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-display text-4xl font-bold">Request received</h1>
        <p className="mt-6 text-lg">
          {prettyDate(booking.date)} at {booking.time} for {booking.guests}{' '}
          {booking.guests === 1 ? 'guest' : 'guests'}
        </p>
        <p className="mt-1 text-ink/70">Under the name {booking.name}</p>
        <p className="mt-6 rounded-2xl border border-oak/50 bg-white p-4 text-sm text-ink/80">
          Your table is <strong>not confirmed yet</strong>. The restaurant will confirm your booking
          by phone ({booking.phone}). Questions? Call us on {restaurant.phone}.
        </p>
        <Link to="/" className="mt-8 inline-block font-medium text-lantern hover:underline">
          ← Back to home
        </Link>
      </section>
    )
  }

  const slotsReady = slots && slots.date === date
  const canSubmit = date && time && form.name && form.phone && status !== 'submitting'

  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Reserve a table</h1>
      <p className="mt-2 text-ink/70">
        Parties of up to {MAX_PARTY}. For larger groups, please call {restaurant.phone}.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-6" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Date
            <input
              type="date"
              value={date}
              min={londonDate()}
              max={londonDate(MAX_DAYS_AHEAD)}
              onChange={(e) => {
                setDate(e.target.value)
                setTime('') // a time picked for another date no longer applies
              }}
              className={field}
            />
            {errors.date && <span className="text-lantern">{errors.date}</span>}
          </label>
          <label className="text-sm font-medium">
            Guests
            <select
              value={guests}
              onChange={(e) => {
                setGuests(Number(e.target.value))
                setTime('')
              }}
              className={field}
            >
              {Array.from({ length: MAX_PARTY }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
            {errors.guests && <span className="text-lantern">{errors.guests}</span>}
          </label>
        </div>

        <div>
          <p className="text-sm font-medium">Time</p>
          {!date && <p className="mt-1 text-sm text-ink/60">Choose a date to see available times.</p>}
          {date && !slotsReady && <p className="mt-1 text-sm text-ink/60">Checking availability…</p>}
          {slotsReady && slots.list === null && (
            <p className="mt-1 text-sm text-lantern">Couldn't load times. Is the server running?</p>
          )}
          {slotsReady && slots.closed && (
            <p className="mt-1 text-sm text-lantern">We're closed on this day. Please choose another date.</p>
          )}
          {slotsReady && slots.list && !slots.closed && (
            <div className="mt-2 flex flex-wrap gap-2">
              {slots.list.map((s) => {
                const open = s.remaining >= guests
                return (
                  <button
                    key={s.time}
                    type="button"
                    disabled={!open}
                    onClick={() => setTime(s.time)}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      time === s.time
                        ? 'border-lantern bg-lantern text-paper'
                        : open
                          ? 'border-oak/60 bg-white hover:border-oak-dark'
                          : 'cursor-not-allowed border-oak/20 text-ink/30 line-through'
                    }`}
                  >
                    {s.time}
                  </button>
                )
              })}
            </div>
          )}
          {errors.time && <p className="mt-1 text-sm text-lantern">{errors.time}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Name
            <input value={form.name} onChange={setField('name')} className={field} autoComplete="name" />
            {errors.name && <span className="text-lantern">{errors.name}</span>}
          </label>
          <label className="text-sm font-medium">
            Phone
            <input
              type="tel"
              value={form.phone}
              onChange={setField('phone')}
              className={field}
              autoComplete="tel"
            />
            {errors.phone && <span className="text-lantern">{errors.phone}</span>}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Email <span className="font-normal text-ink/50">(optional)</span>
          <input
            type="email"
            value={form.email}
            onChange={setField('email')}
            className={field}
            autoComplete="email"
          />
          {errors.email && <span className="text-lantern">{errors.email}</span>}
        </label>
        <label className="block text-sm font-medium">
          Notes <span className="font-normal text-ink/50">(allergies, high chair, occasion…)</span>
          <textarea
            value={form.notes}
            onChange={setField('notes')}
            rows={3}
            maxLength={300}
            className={field}
          />
          {errors.notes && <span className="text-lantern">{errors.notes}</span>}
        </label>

        {errors.form && <p className="text-sm text-lantern">{errors.form}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-full bg-lantern px-8 py-3 font-medium text-paper hover:bg-lantern/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === 'submitting' ? 'Sending…' : 'Request booking'}
        </button>
      </form>
    </section>
  )
}
