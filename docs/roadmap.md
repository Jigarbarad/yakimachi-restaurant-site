# Roadmap and known limitations

## Known limitations
- Not deployed. In development the site and the API run as two servers.
- Seating limits, party size and last-seating times are estimates, not the restaurant's real policy.
- Customers are emailed only when a booking is confirmed or cancelled, not when they first submit it. There are no SMS messages, and the owner has to check the dashboard for new bookings.
- No rate limiting or CAPTCHA on the booking form.
- Single admin account from environment variables.
- Dishes cannot be deleted from the dashboard (they can be hidden by marking them sold out).
- No automated tests. The API was checked by hand, including bad input, full time slots and the login lockout.
- Dish pictures are illustrations. Real photos need the restaurant's permission.

## Ideas for next steps

**Quick wins**
- "Request received" email to the customer, and a "new booking" email to the restaurant
- Delete-dish button and drag-to-reorder in the menu editor
- Rate limiting on the booking form

**Bigger features**
- Deployment: build the React app, let Express serve it, host it with a domain and HTTPS
- Move from SQLite to PostgreSQL for hosted use
- Automated tests (API tests with a test database, plus a few browser tests)
- Multiple staff accounts with roles
- Table management and a daily "today's bookings" print view
- Online ordering or gift vouchers
- Multi-language support (English, Chinese, Japanese)

## Contributing
Issues and suggestions are welcome. For a code change, open a pull request that says what changed and how you tested it.
