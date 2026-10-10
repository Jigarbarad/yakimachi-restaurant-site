// Booking rules.
module.exports = {
  timezone: 'Europe/London',
  slotMinutes: 30,

  // Opening hours by weekday (0 = Sunday ... 6 = Saturday), from the restaurant's Google listing.
  // first/last = first and last bookable time. null = closed all day.
  // PLACEHOLDER: "last" is set 30 minutes before closing; confirm the real last-seating time.
  hours: {
    0: { first: '12:00', last: '20:30' }, // Sunday, closes 9 pm
    1: null,                              // Monday, closed
    2: { first: '12:00', last: '21:30' }, // Tuesday, closes 10 pm
    3: { first: '12:00', last: '21:30' },
    4: { first: '12:00', last: '21:30' },
    5: { first: '12:00', last: '21:30' },
    6: { first: '12:00', last: '21:30' }, // Saturday
  },

  // PLACEHOLDERS: replace with the restaurant's real values.
  maxPartySize: 10,
  seatsPerSlot: 40,      // total guests the restaurant can seat per time slot
  maxDaysAhead: 60,
};
