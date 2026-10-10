// Run with: npm run seed
// Wipes the menu tables and reloads them from data/menu.js.
const db = require('./db');
const { categories, items } = require('./data/menu');

const insertCategory = db.prepare(
  'INSERT INTO categories (slug, name, name_zh, position) VALUES (?, ?, ?, ?)'
);
const insertItem = db.prepare(
  `INSERT INTO menu_items (category, name, name_zh, price_pence, description, tags)
   VALUES (@category, @name, @name_zh, @price_pence, @description, @tags)`
);

// The owner now edits the menu in the admin dashboard, and re-seeding would erase those edits.
// So refuse to run on a non-empty menu unless you really mean it:  npm run seed -- --force
const existing = db.prepare('SELECT COUNT(*) AS n FROM menu_items').get().n;
if (existing > 0 && !process.argv.includes('--force')) {
  console.error(`The menu already has ${existing} items. Re-seeding would overwrite any edits made in the admin dashboard.`);
  console.error('Run "npm run seed -- --force" if you really want to reset it.');
  process.exit(1);
}

// A transaction makes the reload all-or-nothing.
const reload = db.transaction(() => {
  db.exec('DELETE FROM menu_items; DELETE FROM categories;');
  categories.forEach((c, i) => insertCategory.run(c.slug, c.name, c.name_zh, i));
  items.forEach((item) => insertItem.run(item));
});

reload();
console.log(`Seeded ${categories.length} categories and ${items.length} menu items.`);
