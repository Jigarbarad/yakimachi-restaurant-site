const Database = require('better-sqlite3');
const path = require('path');

// The whole database is a single file, created automatically on first run.
const db = new Database(path.join(__dirname, 'yakimachi.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    slug      TEXT PRIMARY KEY,
    name      TEXT NOT NULL,
    name_zh   TEXT,
    position  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    category     TEXT NOT NULL REFERENCES categories(slug),
    name         TEXT NOT NULL,
    name_zh      TEXT,
    price_pence  INTEGER,              -- NULL = price not set yet
    description  TEXT,
    tags         TEXT DEFAULT '',      -- comma separated, e.g. "vegetarian,spicy"
    available    INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    phone       TEXT NOT NULL,
    email       TEXT,
    date        TEXT NOT NULL,          -- YYYY-MM-DD
    time        TEXT NOT NULL,          -- HH:MM (24h)
    guests      INTEGER NOT NULL,
    notes       TEXT,
    status      TEXT NOT NULL DEFAULT 'pending',  -- pending | confirmed | cancelled
    created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_reservations_slot ON reservations(date, time);
`);

// Small migration: older databases don't have the `image` column yet. (Safe to run every start.)
if (!db.prepare('PRAGMA table_info(menu_items)').all().some((c) => c.name === 'image')) {
  db.exec('ALTER TABLE menu_items ADD COLUMN image TEXT');
}

module.exports = db;
