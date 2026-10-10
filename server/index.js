require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());          // allow the React dev server to call this API
app.use(express.json());  // parse JSON request bodies

app.get('/api/health', (req, res) => res.json({ ok: true }));

// GET /api/menu -> [{ slug, name, name_zh, items: [...] }, ...]
app.get('/api/menu', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories ORDER BY position').all();
  const items = db
    .prepare('SELECT * FROM menu_items WHERE available = 1 ORDER BY id')
    .all()
    .map((i) => ({ ...i, tags: i.tags ? i.tags.split(',') : [] }));

  const menu = categories.map((c) => ({
    ...c,
    items: items.filter((i) => i.category === c.slug),
  }));
  res.json(menu);
});

app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/admin', require('./routes/admin'));

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
