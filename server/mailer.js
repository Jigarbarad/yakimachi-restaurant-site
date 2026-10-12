const nodemailer = require('nodemailer');

const RESTAURANT = {
  name: 'Yakimachi',
  address: "St Martin's Square, 10 Silver Walk, Leicester LE1 5EW",
  phone: '0116 332 9836',
};

// Booking text comes from customers, so escape it before putting it in HTML.
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const prettyDate = (d) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

// Created lazily so changes to .env are picked up on restart. Returns null if SMTP isn't configured.
let transport;
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transport) {
    const port = Number(SMTP_PORT) || 587;
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, // 465 = TLS from the start; 587 upgrades with STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transport;
}

function buildMessage(r, status) {
  const when = `${prettyDate(r.date)} at ${r.time}`;
  const party = `${r.guests} ${r.guests === 1 ? 'guest' : 'guests'}`;
  const footer = `${RESTAURANT.name}, ${RESTAURANT.address}. Phone ${RESTAURANT.phone}.`;

  if (status === 'confirmed') {
    return {
      subject: `Your table at ${RESTAURANT.name} is confirmed`,
      text: `Hi ${r.name},\n\nGood news: your booking is confirmed.\n\n${when}\n${party}\n\nIf your plans change, please call us on ${RESTAURANT.phone}.\n\n${footer}`,
      html: `<p>Hi ${esc(r.name)},</p><p><strong>Good news: your booking is confirmed.</strong></p><p>${esc(when)}<br>${esc(party)}</p><p>If your plans change, please call us on ${esc(RESTAURANT.phone)}.</p><p style="color:#777;font-size:13px">${esc(footer)}</p>`,
    };
  }
  return {
    subject: `Your booking at ${RESTAURANT.name} has been cancelled`,
    text: `Hi ${r.name},\n\nWe're sorry, but we can't offer you the table for ${when} (${party}).\n\nPlease call us on ${RESTAURANT.phone} or book another time on our website.\n\n${footer}`,
    html: `<p>Hi ${esc(r.name)},</p><p>We're sorry, but we can't offer you the table for ${esc(when)} (${esc(party)}).</p><p>Please call us on ${esc(RESTAURANT.phone)} or book another time on our website.</p><p style="color:#777;font-size:13px">${esc(footer)}</p>`,
  };
}

// Fire-and-forget: a mail problem must never make the admin's confirm/cancel click fail.
async function sendBookingEmail(reservation, status) {
  if (!reservation.email || !['confirmed', 'cancelled'].includes(status)) return;
  const t = getTransport();
  const msg = buildMessage(reservation, status);
  if (!t) {
    console.log(`[mail] SMTP not configured, would have emailed ${reservation.email}: "${msg.subject}"`);
    return;
  }
  try {
    await t.sendMail({
      from: process.env.MAIL_FROM || `"${RESTAURANT.name}" <${process.env.SMTP_USER}>`,
      to: reservation.email,
      ...msg,
    });
    console.log(`[mail] sent "${msg.subject}" to ${reservation.email}`);
  } catch (err) {
    console.error(`[mail] failed to email ${reservation.email}:`, err.message);
  }
}

module.exports = { sendBookingEmail, buildMessage };
