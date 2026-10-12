# Architecture

## The big picture

```
Browser ──► Vite dev server (:5173)  ── /api requests are proxied ──►  Express API (:5001) ──► SQLite file
 React site                                                              routes + validation     yakimachi.db
```

- The **frontend** is a React single-page app. In development, Vite serves it and forwards any request starting with `/api` to the backend, so the browser only talks to one address.
- The **backend** is an Express server. It owns all the rules and is the only thing that touches the database.
- The **database** is one SQLite file (`server/yakimachi.db`), created automatically. No database server is needed. It is git-ignored.

## Folder map

```
client/
  src/
    App.jsx                routes: /, /menu, /reserve, /contact, /admin
    components/
      Layout.jsx           navbar (with Call us button) and footer
      DishArt.jsx          SVG dish illustrations, chosen by category and dish name
      MapEmbed.jsx         Google Map iframe + directions link
      ContactDetails.jsx   address, phone, hours, buttons (shared by Home and Contact)
    pages/                 Home, Menu, Reserve, Contact
    pages/admin/           Admin shell, Login, ReservationsTab, MenuTab
    config/restaurant.js   all business details (name, address, hours, reviews)
    lib/adminApi.js        login token storage and authenticated fetch helper
server/
  index.js                 app setup and route mounting
  db.js                    opens the database, creates tables, runs small migrations
  config.js                booking rules (hours, party size, capacity)
  mailer.js                confirmation/cancellation emails
  seed.js                  loads data/menu.js into the database
  data/menu.js             the menu (15 categories, 95 items)
  routes/reservations.js   public: availability and booking
  routes/admin.js          protected: login, reservations, menu
  middleware/auth.js       checks the login token on admin routes
docs/                      this documentation
```

## Database

| Table | Purpose | Key columns |
|---|---|---|
| `categories` | Menu sections | `slug`, `name`, `position` |
| `menu_items` | Dishes | `category`, `name`, `name_zh`, `price_pence`, `description`, `tags`, `available`, `image` |
| `reservations` | Booking requests | `name`, `phone`, `email`, `date`, `time`, `guests`, `notes`, `status`, `created_at` |

Reservation `status` is `pending`, `confirmed` or `cancelled`. New bookings start as `pending`.

## Design decisions

- **Prices are whole pence** (`880` means £8.80), which avoids rounding errors. `null` means "not listed" and the site shows "Ask staff".
- **The server is the authority.** The booking form checks input to be friendly, but the API re-checks everything, so a hand-made request cannot skip the rules.
- **No double-booking the last seats.** The capacity check and the insert happen inside one database transaction.
- **Dates and times use the restaurant's timezone** (Europe/London), not the visitor's or the server's.
- **Dish art is a component, not image files.** `DishArt` shows a real photo if a dish has an `image`, otherwise it draws an illustration.
- **Business details live in one place** (`client/src/config/restaurant.js` and `server/config.js`), so the site could be reused for another restaurant.
- **Emails never block the owner.** If sending fails, the confirm/cancel click still succeeds and the error is logged.
