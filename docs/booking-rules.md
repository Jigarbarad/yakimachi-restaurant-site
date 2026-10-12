# Booking rules

These are the rules the server enforces on every reservation. They live in `server/config.js`.

| Rule | Current value | Where it came from |
|---|---|---|
| Time slots | every 30 minutes | design choice |
| Tuesday – Saturday | first slot 12:00, last slot 21:30 | opening hours 12pm–10pm (from the Google listing); last slot is 30 min before closing |
| Sunday | first slot 12:00, last slot 20:30 | opening hours 12pm–9pm; last slot is 30 min before closing |
| Monday | closed | Google listing |
| Largest online party | 10 guests | **estimate** |
| Seats per time slot | 40 guests | **estimate** |
| How far ahead | 60 days | design choice |
| Timezone | Europe/London | the restaurant's location |

**Estimates must be replaced with the real numbers** before the site is used by a real restaurant: the last-seating time, the seat count, and the largest party.

## How a booking is checked

1. **Input is cleaned and validated**
   - name: 2 to 80 characters
   - phone: digits, spaces, brackets and dashes, 7 to 20 characters
   - email: optional, must look like an address
   - notes: optional, up to 300 characters
   - guests: a whole number from 1 to the maximum party size
2. **The date must be real, not in the past, within 60 days, and not a closed day.**
3. **The time must be one of that day's slots**, and for today it must not already have started.
4. **Capacity is checked and the booking saved in one database transaction.** Seats already taken in that slot are added up (cancelled bookings do not count). If the new party does not fit, the request is rejected with `409` and the website refreshes the available times.

New bookings are always saved as `pending`. The owner confirms or cancels them in the dashboard.

## Changing the rules

Edit `server/config.js` and restart the backend. Examples:

```js
maxPartySize: 8,        // allow parties up to 8
seatsPerSlot: 30,       // smaller dining room
2: { first: '17:00', last: '21:30' },   // Tuesday: evenings only
1: { first: '12:00', last: '16:00' },   // open Mondays for lunch
```
