# Security notes

An honest summary of what protects the site, and what does not yet.

## What is in place
- **Passwords are never stored.** Only a bcrypt hash (cost 12) is kept, in `server/.env`.
- **Signed login tokens.** Admin routes require a JWT (HS256, 12-hour life). Any missing or invalid token gets `401`.
- **Login lockout.** Five wrong attempts from one address block login for 15 minutes.
- **No username hints.** The slow password check runs even when the username is wrong, so response time does not reveal which part was wrong.
- **Server-side validation of everything.** Bookings and menu edits are re-checked on the server, so a hand-made request cannot bypass the website's form.
- **Safe SQL.** All queries use prepared statements. Column names in dynamic updates come from a fixed whitelist, never from the request.
- **Safe photo paths.** A dish photo must be a single-slash local path (no `..`) or an `https://` link. This blocks `javascript:` URLs and `//other-site` tricks.
- **Safe emails.** Customer-supplied text is HTML-escaped before it goes into an email.
- **Secrets stay out of git.** `.env`, the database and the private hero photo are in `.gitignore`.
- **Framed map only.** Google's map is loaded in an iframe, so its code does not run inside our page.

## Known gaps (fine for a demo, fix before real use)
- **No rate limiting on the public booking form**, so someone could flood it with fake bookings. Add something like `express-rate-limit` and/or a CAPTCHA.
- **The lockout is in memory** and resets when the server restarts. It also keys on IP address, which is imprecise behind a proxy.
- **One admin account** configured through environment variables. A real product needs users stored in the database, with password reset.
- **The login token is kept in `sessionStorage`**, which is readable by any script on the page. It is cleared when the tab closes. HTTP-only cookies would be stronger.
- **No HTTPS** in local development. In production, serve over HTTPS only and set CORS to the real website address.
- **No automated tests** yet.
- **Customer personal data** (name, phone, email) is stored in the database. A real deployment needs a privacy notice, a retention rule and a way to delete data (UK GDPR).

## Reporting a problem
Please open a GitHub issue. Do not post passwords or personal data in it.
