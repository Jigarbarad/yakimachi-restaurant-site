# Getting started

## What you need
- **Node.js 20 or newer** (built on Node 22). Check with `node -v`.
- A terminal, and two terminal windows open at once (one for the backend, one for the frontend).

## 1. Backend (the API and database)

```bash
cd server
npm install
cp .env.example .env     # then fill in the values, see Configuration
npm run seed             # loads the 95-item menu into the database
npm run dev              # API on http://localhost:5001
```

You should see `API running on http://localhost:5001`. Test it: open http://localhost:5001/api/menu and you will see the menu as JSON.

## 2. Frontend (the website)

In a second terminal:

```bash
cd client
npm install
npm run dev              # site on http://localhost:5173
```

Open http://localhost:5173. The admin dashboard is at http://localhost:5173/admin.

## 3. Set up the admin login

The backend will not let anyone log in until `server/.env` has three values: `JWT_SECRET`, `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH`. The step-by-step commands to create them are in [Configuration](configuration.md).

## Everyday commands

| Where | Command | What it does |
|---|---|---|
| `server/` | `npm run dev` | Start the API and restart it when code changes |
| `server/` | `npm start` | Start the API once (no auto-restart) |
| `server/` | `npm run seed -- --force` | Reset the menu to the original data (erases dashboard edits) |
| `client/` | `npm run dev` | Start the website with live reload |
| `client/` | `npm run build` | Make the production build in `client/dist` |
| `client/` | `npm run lint` | Check the code for common mistakes |

## Troubleshooting

| Problem | Cause and fix |
|---|---|
| `Cannot GET /` on the backend link | Normal. The backend has no home page. Use `/api/menu` or open the site on port 5173. |
| Port 5000 returns an empty 403 | macOS uses port 5000 for AirPlay. This project uses **5001** on purpose. |
| "Admin login is not configured on the server" | `server/.env` is missing a value, or the backend was not restarted after editing it. Stop it (Ctrl+C) and run `npm run dev` again. |
| Login says wrong password but it is right | `ADMIN_PASSWORD_HASH` must be a bcrypt **hash** (about 60 characters starting with `$2`), not the plain password, and wrapped in single quotes. |
| "Too many failed attempts" | Five wrong logins lock that computer for 15 minutes. Restarting the backend clears it. |
| Menu is empty | Run `npm run seed` in `server/`. |
| No confirmation emails arrive | See [Email setup](email-setup.md). Without SMTP settings the server only prints a log line. |
| Map is blank | The map needs an internet connection and loads from Google. |
