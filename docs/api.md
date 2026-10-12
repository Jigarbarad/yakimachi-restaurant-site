# API reference

Base URL in development: `http://localhost:5001/api` (the website reaches it through its own `/api` proxy).
All bodies are JSON. Errors look like `{ "error": "..." }` or `{ "errors": { "field": "..." } }`.

## Public endpoints

### `GET /api/health`
Quick check that the server is up.

### `GET /api/menu`
Categories, each with its **available** items. `tags` is an array (`vegetarian`, `spicy`). Items marked sold out are hidden.

### `GET /api/reservations/availability?date=YYYY-MM-DD`
Open time slots for a day.

```json
{ "date": "2026-10-24", "closed": false,
  "slots": [ { "time": "12:00", "remaining": 40 }, { "time": "12:30", "remaining": 36 } ] }
```
On a closed day (Monday) `closed` is `true` and `slots` is empty. Slots in the past have `remaining: 0`.

### `POST /api/reservations`
Request a table. It is saved as `pending`.

```json
{ "name": "Sam", "phone": "07123 456789", "email": "sam@example.com",
  "date": "2026-10-24", "time": "19:30", "guests": 4, "notes": "High chair please" }
```
| Status | Meaning |
|---|---|
| `201` | Saved. Body is the new reservation. |
| `400` | Validation failed. `errors` lists each bad field. |
| `409` | That time slot no longer has enough seats. |

`email` and `notes` are optional. Rules are in [Booking rules](booking-rules.md).

## Admin endpoints

### `POST /api/admin/login`
```json
{ "username": "admin", "password": "your-password" }
```
Returns `{ "token": "..." }`, valid for 12 hours. Wrong details give `401`; five failures lock the client for 15 minutes (`429`); missing server configuration gives `503`.

**Every endpoint below needs the header** `Authorization: Bearer <token>`, otherwise it returns `401`.

### `GET /api/admin/reservations`
All reservations, ordered by date and time.

### `PATCH /api/admin/reservations/:id`
```json
{ "status": "confirmed" }
```
Status must be `pending`, `confirmed` or `cancelled`. If the status really changed to `confirmed` or `cancelled` and the booking has an email, the customer is emailed (see [Email setup](email-setup.md)).

### `GET /api/admin/menu`
Every dish (including sold-out ones) and the list of categories.

### `PATCH /api/admin/menu/:id`
Send only the fields to change: `name`, `name_zh`, `description`, `price_pence` (integer or `null`), `image`, `available` (boolean), `category`.
`image` must be a local path like `/dishes/omurice.jpg` or an `https://` link.

### `POST /api/admin/menu`
Add a dish. `name` and `category` (a category slug) are required.

## Try it from the terminal

```bash
curl http://localhost:5001/api/menu
curl "http://localhost:5001/api/reservations/availability?date=2026-10-24"

# log in, then use the token
curl -X POST http://localhost:5001/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"YOUR-PASSWORD"}'
```
