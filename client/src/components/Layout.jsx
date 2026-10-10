import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { restaurant } from '../config/restaurant'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reserve', label: 'Reserve' },
]

export default function Layout() {
  // On the home page the navbar floats transparently over the full-screen photo.
  const isHome = useLocation().pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={
          isHome
            ? 'absolute inset-x-0 top-0 z-20 text-paper'
            : 'sticky top-0 z-10 border-b border-oak/40 bg-paper/90 backdrop-blur'
        }
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="whitespace-nowrap font-display text-2xl font-bold tracking-wide">
            {restaurant.name}
            {/* The Japanese name only fits next to the links on wider screens. */}
            <span className="ml-2 hidden text-lantern sm:inline">{restaurant.nameJa}</span>
          </NavLink>
          <ul className="flex gap-4 text-sm font-medium sm:gap-6">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    isHome
                      ? isActive ? 'text-oak' : 'text-paper/80 hover:text-paper'
                      : isActive ? 'text-lantern' : 'text-ink/70 hover:text-ink'
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Outlet is where the current page (Home, Menu, ...) is rendered. */}
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-oak/40 bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-ink/80 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-ink">{restaurant.name}</p>
            <p>{restaurant.tagline}</p>
          </div>
          <div>
            <p className="font-medium text-oak-dark">Find us</p>
            <p>{restaurant.address}</p>
            <p>{restaurant.phone}</p>
          </div>
          <div>
            <p className="font-medium text-oak-dark">Opening hours</p>
            {restaurant.hours.map((h) => (
              <p key={h.days}>
                {h.days}: {h.time}
              </p>
            ))}
          </div>
        </div>
        <p className="border-t border-oak/30 py-3 text-center text-xs text-ink/50">
          Concept website design, not the official {restaurant.name} site.
          {' · '}
          <Link to="/admin" className="hover:text-ink">Admin</Link>
        </p>
      </footer>
    </div>
  )
}
