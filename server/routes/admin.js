const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const requireAdmin = require('../middleware/auth');

const router = express.Router();

// ---------- login (the only public admin route) ----------

// Very small brute-force guard: 5 wrong attempts per IP, then locked for 15 minutes.
// (In memory, so it resets when the server restarts. Fine for a demo.)
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const fails = new Map(); // ip -> { count, resetAt }

const isLocked = (ip) => {
  const f = fails.get(ip);
  return !!f && f.resetAt > Date.now() && f.count >= MAX_FAILS;
};
const recordFail = (ip) => {
  const now = Date.now();
  const f = fails.get(ip);
  if (!f || f.resetAt <= now) fails.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else f.count += 1;
};

router.post('/login', async (req, res) => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD_HASH, JWT_SECRET } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
    return res.status(503).json({ error: 'Admin login is not configured on the server.' });
  }
  if (isLocked(req.ip)) {
    return res.status(429).json({ error: 'Too many failed attempts. Try again in 15 minutes.' });
  }

  const { username, password } = req.body || {};
  // Always run the (slow) password check, so a wrong username isn't faster than a wrong password.
  const passwordOk = await bcrypt.compare(String(password ?? ''), ADMIN_PASSWORD_HASH);
  const usernameOk = String(username ?? '') === ADMIN_USERNAME;

  if (!(passwordOk && usernameOk)) {
    recordFail(req.ip);
    return res.status(401).json({ error: 'Wrong username or password.' });
  }
  fails.delete(req.ip);
  const token = jwt.sign({ sub: 'admin' }, JWT_SECRET, { expiresIn: '12h', algorithm: 'HS256' });
  res.json({ token });
});

// Everything below this line needs a valid token.
router.use(requireAdmin);

// ---------- reservations ----------

router.get('/reservations', (req, res) => {
  res.json(db.prepare('SELECT * FROM reservations ORDER BY date, time, id').all());
});

router.patch('/reservations/:id', (req, res) => {
  const status = req.body?.status;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Status must be pending, confirmed or cancelled.' });
  }
  const r = db.prepare('UPDATE reservations SET status = ? WHERE id = ?').run(status, req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Reservation not found.' });
  res.json(db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id));
});

// ---------- menu ----------

// Checks the fields present in `body` and returns { errors, values } with DB-ready values.
// Only fields that were sent are returned, so PATCH can update just some of them.
function parseMenuFields(body) {
  const errors = {};
  const values = {};

  if ('name' in body) {
    const v = String(body.name ?? '').trim();
    if (!v || v.length > 120) errors.name = 'Name is required (max 120 characters).';
    else values.name = v;
  }
  if ('name_zh' in body) {
    const v = String(body.name_zh ?? '').trim();
    if (v.length > 120) errors.name_zh = 'Too long.';
    else values.name_zh = v;
  }
  if ('description' in body) {
    const v = String(body.description ?? '').trim();
    if (v.length > 600) errors.description = 'Description must be 600 characters or fewer.';
    else values.description = v;
  }
  if ('price_pence' in body) {
    const v = body.price_pence;
    if (v === null) values.price_pence = null;
    else if (Number.isInteger(v) && v >= 0 && v <= 100000) values.price_pence = v;
    else errors.price_pence = 'Price must be between £0.00 and £1000.00.';
  }
  if ('image' in body) {
    const v = String(body.image ?? '').trim();
    // Only our own files (/dishes/x.jpg) or https links. Blocks things like javascript: URLs.
    if (v === '') values.image = null;
    // Local paths must start with a single "/" (so "//other-site.com/x.jpg" is rejected) and contain no "..".
    else if (v.length <= 300 && ((/^\/(?!\/)[\w\-./]+$/.test(v) && !v.includes('..')) || /^https:\/\/[^\s"'<>]+$/.test(v))) values.image = v;
    else errors.image = 'Photo must be a path like /dishes/omurice.jpg or an https:// link.';
  }
  if ('available' in body) {
    if (typeof body.available !== 'boolean') errors.available = 'available must be true or false.';
    else values.available = body.available ? 1 : 0;
  }
  if ('category' in body) {
    if (!db.prepare('SELECT 1 FROM categories WHERE slug = ?').get(body.category)) {
      errors.category = 'Unknown category.';
    } else values.category = body.category;
  }
  return { errors, values };
}

router.get('/menu', (req, res) => {
  res.json({
    categories: db.prepare('SELECT slug, name FROM categories ORDER BY position').all(),
    items: db.prepare('SELECT * FROM menu_items ORDER BY id').all(),
  });
});

router.patch('/menu/:id', (req, res) => {
  const { errors, values } = parseMenuFields(req.body || {});
  if (Object.keys(errors).length) return res.status(400).json({ errors });
  const keys = Object.keys(values);
  if (!keys.length) return res.status(400).json({ error: 'Nothing to update.' });

  // Column names come from our own whitelist above, never from the request, so this is safe.
  const sql = `UPDATE menu_items SET ${keys.map((k) => `${k} = @${k}`).join(', ')} WHERE id = @id`;
  const r = db.prepare(sql).run({ ...values, id: Number(req.params.id) });
  if (r.changes === 0) return res.status(404).json({ error: 'Menu item not found.' });
  res.json(db.prepare('SELECT * FROM menu_items WHERE id = ?').get(req.params.id));
});

router.post('/menu', (req, res) => {
  const body = req.body || {};
  const { errors, values } = parseMenuFields(body);
  if (!('name' in body)) errors.name = 'Name is required.';
  if (!('category' in body)) errors.category = 'Category is required.';
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const row = {
    name_zh: '', description: '', price_pence: null, available: 1, ...values, tags: '',
  };
  const r = db
    .prepare(
      `INSERT INTO menu_items (category, name, name_zh, price_pence, description, tags, available)
       VALUES (@category, @name, @name_zh, @price_pence, @description, @tags, @available)`
    )
    .run(row);
  res.status(201).json(db.prepare('SELECT * FROM menu_items WHERE id = ?').get(r.lastInsertRowid));
});

module.exports = router;
