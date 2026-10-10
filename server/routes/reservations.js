const express = require('express');
const db = require('../db');
const cfg = require('../config');

const router = express.Router();

// ---------- helpers ----------

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const toHHMM = (mins) =>
  `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

// Every bookable slot on a given date, e.g. ['12:00', '12:30', ... '21:30'].
// Empty array = closed that day. `date` must already be a valid YYYY-MM-DD string.
function slotsFor(date) {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  const rule = cfg.hours[weekday];
  if (!rule) return [];
  const slots = [];
  for (let m = toMinutes(rule.first); m <= toMinutes(rule.last); m += cfg.slotMinutes) {
    slots.push(toHHMM(m));
  }
  return slots;
}

// "Now" in the restaurant's timezone, not the server's.
function nowInRestaurantTz() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: cfg.timezone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  return { date: `${parts.year}-${parts.month}-${parts.day}`, minutes: toMinutes(`${parts.hour}:${parts.minute}`) };
}

const isRealDate = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s; // rejects 2026-02-31
};

const daysBetween = (a, b) => (new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`)) / 86400000;

// Seats already taken per slot on a date (cancelled bookings don't count).
const seatsTaken = db.prepare(
  `SELECT COALESCE(SUM(guests), 0) AS n FROM reservations
   WHERE date = ? AND time = ? AND status != 'cancelled'`
);

// ---------- GET /api/reservations/availability?date=YYYY-MM-DD ----------

router.get('/availability', (req, res) => {
  const { date } = req.query;
  const now = nowInRestaurantTz();
  if (!isRealDate(date)) return res.status(400).json({ error: 'Invalid date.' });
  if (date < now.date) return res.json({ date, slots: [] });

  const daySlots = slotsFor(date);
  if (daySlots.length === 0) return res.json({ date, closed: true, maxPartySize: cfg.maxPartySize, slots: [] });

  const slots = daySlots.map((time) => ({
    time,
    // For today, slots that have already started can't be booked.
    remaining:
      date === now.date && toMinutes(time) <= now.minutes
        ? 0
        : Math.max(0, cfg.seatsPerSlot - seatsTaken.get(date, time).n),
  }));
  res.json({ date, maxPartySize: cfg.maxPartySize, slots });
});

// ---------- POST /api/reservations ----------

function validate(body) {
  const errors = {};
  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim();
  const notes = String(body.notes ?? '').trim();
  const { date, time } = body;
  const guests = Number(body.guests);
  const now = nowInRestaurantTz();

  if (name.length < 2 || name.length > 80) errors.name = 'Please enter your name.';
  if (!/^[+\d][\d\s()-]{6,19}$/.test(phone)) errors.phone = 'Please enter a valid phone number.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.';
  if (notes.length > 300) errors.notes = 'Notes must be 300 characters or fewer.';

  if (!Number.isInteger(guests) || guests < 1 || guests > cfg.maxPartySize) {
    errors.guests = `Parties of 1 to ${cfg.maxPartySize} can book online. Please call us for larger groups.`;
  }

  if (!isRealDate(date)) errors.date = 'Please choose a valid date.';
  else if (date < now.date) errors.date = 'That date has already passed.';
  else if (daysBetween(now.date, date) > cfg.maxDaysAhead) {
    errors.date = `We take bookings up to ${cfg.maxDaysAhead} days ahead.`;
  }

  const daySlots = isRealDate(date) ? slotsFor(date) : [];
  if (!errors.date && daySlots.length === 0) errors.date = "Sorry, we're closed on that day.";

  if (!errors.date) {
    if (!daySlots.includes(time)) errors.time = 'Please choose one of the available times.';
    else if (date === now.date && toMinutes(time) <= now.minutes) errors.time = 'That time has already passed.';
  }

  return { errors, clean: { name, phone, email: email || null, notes: notes || null, date, time, guests } };
}

const insert = db.prepare(
  `INSERT INTO reservations (name, phone, email, date, time, guests, notes)
   VALUES (@name, @phone, @email, @date, @time, @guests, @notes)`
);

// The capacity check and the insert run in ONE transaction, so two people booking
// the last seats at the same moment can't both succeed.
const book = db.transaction((r) => {
  const left = cfg.seatsPerSlot - seatsTaken.get(r.date, r.time).n;
  if (r.guests > left) return null;
  return insert.run(r).lastInsertRowid;
});

router.post('/', (req, res) => {
  const { errors, clean } = validate(req.body || {});
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const id = book(clean);
  if (id === null) {
    return res.status(409).json({
      errors: { time: 'Sorry, that time just filled up. Please pick another.' },
    });
  }
  // 'pending' because a person at the restaurant confirms it (admin dashboard, next step).
  res.status(201).json({ id: Number(id), status: 'pending', ...clean });
});

module.exports = router;
