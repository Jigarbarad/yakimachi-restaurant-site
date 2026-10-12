# Admin guide

For the restaurant owner or staff. There is nothing to install: it works in any web browser, including a phone.

## Logging in
Go to `/admin` on the website (for example `http://localhost:5173/admin` while testing) and enter the username and password. You stay logged in for 12 hours, or until you press **Log out**. After five wrong passwords the login is blocked for 15 minutes.

## Reservations tab
Every booking request appears here with the date, time, party size, contact details and notes.

| Status | Meaning |
|---|---|
| **Pending** | A customer asked for a table. Nothing has been promised yet. |
| **Confirmed** | You accepted it. |
| **Cancelled** | It will not happen. Cancelled bookings free up their seats. |

- Use the filter buttons to show only pending, confirmed or cancelled bookings.
- **Confirm** a booking once you have checked it. If the customer left an email address, they automatically get a confirmation email.
- **Cancel** asks you to confirm first, then emails the customer (if they gave an email) and frees the seats.
- **Restore** puts a cancelled booking back to pending.
- Emails are sent only when the status actually changes, so clicking twice will not email twice.

The website tells customers their table is **not confirmed** until you (or the restaurant) contact them, so check the pending list regularly.

## Menu tab
- Change a dish's English name, Chinese name, description and price. Prices are in pounds; leave the price empty to show "Ask staff".
- **Sold out:** untick "Available" and the dish disappears from the public menu straight away. Tick it again to bring it back.
- **Add a dish:** choose a category, enter a name, and save.
- **Photo:** enter a path such as `/dishes/omurice.jpg` (a file placed in `client/public/dishes/`) or an `https://` link. Without a photo, a drawn illustration is shown.

## Tips
- Changes show on the public site immediately, with no publishing step.
- If your login expires, you are sent back to the login screen. Just log in again.
