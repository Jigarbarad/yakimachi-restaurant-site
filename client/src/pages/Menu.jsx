import { useEffect, useState } from 'react'
import DishArt from '../components/DishArt'

// Prices are stored in pence; null means the restaurant hasn't given us one.
const formatPrice = (pence) => (pence == null ? 'Ask staff' : `£${(pence / 100).toFixed(2)}`)

export default function Menu() {
  const [menu, setMenu] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')
  const [vegOnly, setVegOnly] = useState(false)

  // Runs once when the page opens: ask the Express API for the menu.
  useEffect(() => {
    fetch('/api/menu')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setMenu(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  // Apply the category tab, the search box and the vegetarian filter.
  const q = search.trim().toLowerCase()
  const visible = menu
    .filter((c) => active === 'all' || c.slug === active)
    .map((c) => ({
      ...c,
      items: c.items.filter(
        (i) =>
          (!vegOnly || i.tags.includes('vegetarian')) &&
          (!q ||
            i.name.toLowerCase().includes(q) ||
            (i.description || '').toLowerCase().includes(q) ||
            (i.name_zh || '').includes(q))
      ),
    }))
    .filter((c) => c.items.length > 0)

  if (status === 'loading') return <p className="p-10 text-center text-ink/70">Loading menu…</p>
  if (status === 'error')
    return (
      <p className="p-10 text-center text-lantern">
        Couldn't load the menu. Is the server running on port 5001?
      </p>
    )

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Menu</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes…"
          className="w-full rounded border border-oak/60 bg-white px-3 py-2 text-sm sm:w-64"
        />
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
          Vegetarian only
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[{ slug: 'all', name: 'All' }, ...menu].map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className={`rounded-full border px-3 py-1 text-sm ${
              active === c.slug
                ? 'border-lantern bg-lantern text-paper'
                : 'border-oak/60 text-ink/80 hover:border-oak-dark'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-ink/50">
        Dish pictures are illustrations for this concept design, not photos of the actual dishes.
      </p>

      {visible.length === 0 && <p className="mt-10 text-ink/70">No dishes match your search.</p>}

      {visible.map((c) => (
        <div key={c.slug} className="mt-10">
          <h2 className="border-b border-oak/60 pb-2 font-display text-2xl text-oak-dark">
            {c.name} <span className="text-base text-ink/50">{c.name_zh}</span>
          </h2>
          <ul className="mt-4 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {c.items.map((i) => (
              <li key={i.id} className="flex gap-4">
                <DishArt item={i} className="h-20 w-20 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium">
                    {i.name} <span className="inline-block text-sm text-ink/50">{i.name_zh}</span>
                    {i.tags.includes('vegetarian') && (
                      <span className="ml-2 rounded bg-leaf/15 px-1.5 py-0.5 text-xs text-leaf">V</span>
                    )}
                    {i.tags.includes('spicy') && (
                      <span className="ml-2 rounded bg-lantern/15 px-1.5 py-0.5 text-xs text-lantern">Spicy</span>
                    )}
                  </p>
                  <p className="whitespace-nowrap text-lantern">{formatPrice(i.price_pence)}</p>
                </div>
                {i.description && <p className="mt-1 text-sm text-ink/60">{i.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
