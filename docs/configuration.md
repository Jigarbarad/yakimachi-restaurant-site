# Configuration

There are three places to configure the project.

## 1. `server/.env` (secrets and settings)

This file is **git-ignored and must never be committed**. Copy `server/.env.example` to `server/.env` and fill it in.

| Setting | Required | Meaning |
|---|---|---|
| `PORT` | no | API port. Default in the example is `5001` (not 5000, which macOS uses for AirPlay). |
| `JWT_SECRET` | yes | Random secret used to sign admin login tokens. |
| `ADMIN_USERNAME` | yes | Admin login name. |
| `ADMIN_PASSWORD_HASH` | yes | bcrypt **hash** of the admin password, in single quotes. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | no | Mail account for booking emails. See [Email setup](email-setup.md). |
| `MAIL_FROM` | no | The "From" line, e.g. `"Yakimachi" <bookings@example.com>`. Defaults to `SMTP_USER`. |

### Creating the secret and the password hash

Run these inside `server/`:

```bash
# a random signing secret
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

# the hash of the password you choose
node -e "console.log(require('bcryptjs').hashSync('CHOOSE-A-PASSWORD', 12))"
```

Paste the results into `.env`. The hash contains `$` characters, so it **must** be wrapped in single quotes:

```
JWT_SECRET=<the random secret>
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH='$2b$12$....'
```

Restart the backend after any change to `.env`.

## 2. `server/config.js` (booking rules)

Opening hours, slot length, party size, capacity and how far ahead people can book. Explained in [Booking rules](booking-rules.md).

## 3. `client/src/config/restaurant.js` (what visitors see)

Name, Japanese name, tagline, address, phone, Instagram link, opening hours text, rating, review quotes and the list of "customer favourite" dishes. Dish names in `featured` must match menu names exactly.

> The opening hours are written in two places: the text visitors read (`restaurant.js`) and the rules the booking system enforces (`config.js`). If the restaurant's hours change, update both.

## Optional hero photo

The home page shows `client/public/private/interior.jpg` if the file exists. That folder is git-ignored, so a real restaurant photo is never published by accident. Without the file, the page falls back to a plain gradient.

## Menu data

`server/data/menu.js` is the starting menu. `npm run seed` loads it into the database, and refuses to run if the menu already has items (so dashboard edits are not lost). Use `npm run seed -- --force` to reset on purpose.
