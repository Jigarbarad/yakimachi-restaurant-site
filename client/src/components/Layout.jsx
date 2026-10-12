import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { restaurant } from '../config/restaurant'

const links = [
  { to: '/', label: 'Home', hideOnPhone: true }, // the logo already links home
  { to: '/menu', label: 'Menu' },
  { to: '/reserve', label: 'Reserve' },
  { to: '/contact', label: 'Contact' },
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
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <NavLink to="/" className="whitespace-nowrap font-display text-xl font-bold tracking-wide sm:text-2xl">
            {restaurant.name}
            {/* The Japanese name only fits next to the links on wider screens. */}
            <span className="ml-2 hidden text-lantern sm:inline">{restaurant.nameJa}</span>
          </NavLink>
          <ul className="flex items-center gap-3 text-sm font-medium sm:gap-6">
            {links.map((l) => (
              <li key={l.to} className={l.hideOnPhone ? 'hidden sm:block' : undefined}>
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
            <li>
              {/* tel: links open the phone's dialler on mobile. On a laptop they hand off to FaceTime/Skype if set up. */}
              <a
                href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
                aria-label={`Call us on ${restaurant.phone}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-lantern px-3 py-1.5 text-paper hover:bg-lantern/85"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
                </svg>
                <span className="hidden sm:inline">Call us</span>
              </a>
            </li>
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
