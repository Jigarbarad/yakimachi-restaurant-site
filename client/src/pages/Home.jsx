import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DishArt from '../components/DishArt'
import { restaurant } from '../config/restaurant'

const formatPrice = (pence) => (pence == null ? 'Ask staff' : `£${(pence / 100).toFixed(2)}`)
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${restaurant.name} ${restaurant.address}`
)}`

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-ink to-oak-dark text-paper">
      {/* Layer 1: the photo, stretched to cover the whole hero.
          It lives in client/public/private/, which is git-ignored (it's a real restaurant's photo).
          If the file isn't there, the image hides itself and the gradient background shows instead. */}
      <img
        src="/private/interior.jpg"
        alt="Inside Yakimachi: light oak tables and red paper lanterns"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
      />
      {/* Layer 2: dark overlay that dulls the photo so the white text is readable. */}
      <div className="absolute inset-0 bg-ink/65" />
      {/* Layer 3: the bottom edge fades into the cream page below. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />

      {/* Layer 4: the content, on top of everything. */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-24 text-center">
        <p className="font-medium text-oak">
          ★ {restaurant.rating} on Google · {restaurant.reviewCount} reviews
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold sm:text-7xl">
          {restaurant.name}{' '}
          {/* On phones the Japanese name sits on its own line instead of splitting mid-word. */}
          <span className="block text-lantern sm:inline">{restaurant.nameJa}</span>
        </h1>
        <p className="mt-6 text-xl text-paper/90">{restaurant.tagline}</p>
        <p className="mt-2 text-paper/70">{restaurant.address}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/reserve"
            className="rounded-full bg-lantern px-8 py-3 font-medium text-paper hover:bg-lantern/85"
          >
            Reserve a table
          </Link>
          <Link
            to="/menu"
            className="rounded-full border border-paper/70 px-8 py-3 font-medium text-paper hover:bg-paper/10"
          >
            View the menu
          </Link>
        </div>
      </div>
    </section>
  )
}

function SignatureDishes() {
  const [dishes, setDishes] = useState([])

  // Fetch the full menu, then keep only the dishes named in restaurant.featured (in that order).
  useEffect(() => {
    fetch('/api/menu')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((menu) => {
        const all = menu.flatMap((c) => c.items)
        setDishes(restaurant.featured.map((n) => all.find((i) => i.name === n)).filter(Boolean))
      })
      .catch(() => setDishes([])) // if the API is down, the section simply stays hidden
  }, [])

  if (dishes.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center font-display text-3xl font-bold">Customer favourites</h2>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((d) => (
          <li key={d.id} className="rounded-2xl border border-oak/50 bg-white p-5">
            <DishArt item={d} className="mx-auto mb-4 h-40 w-40 rounded-xl" />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg font-bold">{d.name}</h3>
              <span className="whitespace-nowrap font-medium text-lantern">
                {formatPrice(d.price_pence)}
              </span>
            </div>
            <p className="text-sm text-ink/50">{d.name_zh}</p>
            <p className="mt-3 text-sm text-ink/70">{d.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link to="/menu" className="font-medium text-lantern hover:underline">
          See the full menu →
        </Link>
      </p>
    </section>
  )
}

function Reviews() {
  return (
    <section className="bg-paper-deep py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-display text-3xl font-bold">What diners say</h2>
        <p className="mt-2 text-center text-ink/70">
          ★ {restaurant.rating} from {restaurant.reviewCount} Google reviews
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {restaurant.reviews.map((r, i) => (
            <li key={i} className="rounded-2xl border border-oak/50 bg-paper p-6">
              <p className="text-oak-dark">★★★★★</p>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink/80">“{r.text}”</blockquote>
              <p className="mt-4 text-xs text-ink/50">Google review</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function VisitUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h2 className="font-display text-3xl font-bold">Visit us</h2>
      <p className="mt-6 text-ink/80">{restaurant.address}</p>
      <p className="mt-1 text-ink/80">
        <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`} className="hover:text-lantern">
          {restaurant.phone}
        </a>
      </p>
      {restaurant.hours.map((h) => (
        <p key={h.days} className="mt-1 text-ink/60">
          {h.days}: {h.time}
        </p>
      ))}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-full border border-lantern px-8 py-3 font-medium text-lantern hover:bg-lantern hover:text-paper"
      >
        Get directions
      </a>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <SignatureDishes />
      <Reviews />
      <VisitUs />
    </>
  )
}
