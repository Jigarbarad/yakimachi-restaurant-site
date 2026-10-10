import { useEffect, useState } from 'react'
import { adminFetch } from '../../lib/adminApi'

const input =
  'w-full rounded border border-oak/60 bg-white px-2 py-1.5 text-sm focus:border-lantern focus:outline-none'

const toPounds = (pence) => (pence == null ? '' : (pence / 100).toFixed(2))

// "8.80" -> 880, "" -> null (no price), anything else -> undefined (invalid)
const toPence = (text) => {
  const t = text.trim()
  if (t === '') return null
  if (!/^\d+(\.\d{1,2})?$/.test(t)) return undefined
  return Math.round(parseFloat(t) * 100)
}

function ItemRow({ item, onSaved }) {
  const [draft, setDraft] = useState({
    name: item.name,
    name_zh: item.name_zh || '',
    description: item.description || '',
    price: toPounds(item.price_pence),
    image: item.image || '',
    available: !!item.available,
  })
  const [msg, setMsg] = useState({ text: '', bad: false })
  const [busy, setBusy] = useState(false)

  const dirty =
    draft.name !== item.name ||
    draft.name_zh !== (item.name_zh || '') ||
    draft.description !== (item.description || '') ||
    draft.price !== toPounds(item.price_pence) ||
    draft.image !== (item.image || '') ||
    draft.available !== !!item.available

  const set = (key) => (e) => {
    setDraft((d) => ({ ...d, [key]: e.target.value }))
    setMsg({ text: '', bad: false })
  }

  const save = async () => {
    const price_pence = toPence(draft.price)
    if (price_pence === undefined) return setMsg({ text: 'Price like 8.80, or leave empty.', bad: true })
    setBusy(true)
    try {
      const saved = await adminFetch(`/menu/${item.id}`, {
        method: 'PATCH',
        body: {
          name: draft.name,
          name_zh: draft.name_zh,
          description: draft.description,
          price_pence,
          image: draft.image,
          available: draft.available,
        },
      })
      onSaved(saved)
      // Show exactly what the server stored (trimmed text, price as 8.80), so the row isn't "dirty".
      setDraft({
        name: saved.name,
        name_zh: saved.name_zh || '',
        description: saved.description || '',
        price: toPounds(saved.price_pence),
        image: saved.image || '',
        available: !!saved.available,
      })
      setMsg({ text: 'Saved ✓', bad: false })
    } catch (e) {
      setMsg({ text: e.message, bad: true })
    }
    setBusy(false)
  }

  return (
    <li className={`rounded-2xl border border-oak/50 bg-white p-4 ${draft.available ? '' : 'opacity-60'}`}>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_7rem]">
        <input value={draft.name} onChange={set('name')} className={input} aria-label="Name" />
        <input value={draft.name_zh} onChange={set('name_zh')} className={input} aria-label="Chinese name" placeholder="中文名" />
        <div className="flex items-center gap-1">
          <span className="text-sm text-ink/60">£</span>
          <input value={draft.price} onChange={set('price')} className={input} aria-label="Price" placeholder="no price" inputMode="decimal" />
        </div>
      </div>
      <textarea
        value={draft.description}
        onChange={set('description')}
        rows={2}
        className={`${input} mt-3`}
        aria-label="Description"
        placeholder="Description"
      />
      <input
        value={draft.image}
        onChange={set('image')}
        className={`${input} mt-3`}
        aria-label="Photo path"
        placeholder="Photo (optional), e.g. /dishes/omurice.jpg. Empty = illustration"
      />
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.available}
            onChange={(e) => {
              setDraft((d) => ({ ...d, available: e.target.checked }))
              setMsg({ text: '', bad: false })
            }}
          />
          Available (untick = sold out / hidden from the site)
        </label>
        <button
          onClick={save}
          disabled={!dirty || busy}
          className="ml-auto rounded-full bg-lantern px-5 py-1.5 text-sm text-paper hover:bg-lantern/85 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {busy ? 'Saving…' : 'Save'}
        </button>
        {msg.text && <span className={`text-sm ${msg.bad ? 'text-lantern' : 'text-leaf'}`}>{msg.text}</span>}
      </div>
    </li>
  )
}

function AddItem({ categories, defaultCategory, onAdded }) {
  const [open, setOpen] = useState(false)
  const [f, setF] = useState({ category: defaultCategory, name: '', price: '', description: '' })
  const [error, setError] = useState('')

  const set = (key) => (e) => setF((x) => ({ ...x, [key]: e.target.value }))

  const add = async (e) => {
    e.preventDefault()
    const price_pence = toPence(f.price)
    if (price_pence === undefined) return setError('Price like 8.80, or leave empty.')
    try {
      const created = await adminFetch('/menu', {
        method: 'POST',
        body: { category: f.category, name: f.name, price_pence, description: f.description },
      })
      onAdded(created)
      setF({ category: f.category, name: '', price: '', description: '' })
      setError('')
      setOpen(false)
    } catch (err) {
      setError(err.message)
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="rounded-full border border-lantern px-4 py-1.5 text-sm text-lantern hover:bg-lantern hover:text-paper">
        + Add a dish
      </button>
    )
  }
  return (
    <form onSubmit={add} className="space-y-3 rounded-2xl border border-oak/50 bg-paper-deep p-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_2fr_7rem]">
        <select value={f.category} onChange={set('category')} className={input} aria-label="Category">
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <input value={f.name} onChange={set('name')} className={input} placeholder="Dish name" aria-label="Name" />
        <input value={f.price} onChange={set('price')} className={input} placeholder="£ price" aria-label="Price" inputMode="decimal" />
      </div>
      <textarea value={f.description} onChange={set('description')} rows={2} className={input} placeholder="Description (optional)" />
      {error && <p className="text-sm text-lantern">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={!f.name.trim()} className="rounded-full bg-lantern px-5 py-1.5 text-sm text-paper disabled:opacity-30">
          Add dish
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-oak/60 px-5 py-1.5 text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function MenuTab() {
  const [data, setData] = useState(null) // { categories, items }
  const [error, setError] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    adminFetch('/menu')
      .then((d) => {
        setData(d)
        setCategory(d.categories[0]?.slug || '')
      })
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <p className="text-lantern">{error}</p>
  if (!data) return <p className="text-ink/70">Loading…</p>

  const replaceItem = (saved) =>
    setData((d) => ({ ...d, items: d.items.map((i) => (i.id === saved.id ? saved : i)) }))
  const addItem = (created) => {
    setData((d) => ({ ...d, items: [...d.items, created] }))
    setCategory(created.category)
  }

  const items = data.items.filter((i) => i.category === category)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {data.categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`rounded-full border px-3 py-1 text-sm ${
              category === c.slug ? 'border-lantern bg-lantern text-paper' : 'border-oak/60 hover:border-oak-dark'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <AddItem key={category} categories={data.categories} defaultCategory={category} onAdded={addItem} />
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((i) => (
          <ItemRow key={i.id} item={i} onSaved={replaceItem} />
        ))}
      </ul>
    </div>
  )
}
