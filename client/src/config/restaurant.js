// Everything business-specific lives here, so the site can be reused for another restaurant.
export const restaurant = {
  name: 'Yakimachi',
  nameJa: '焼き町',
  tagline: 'Japanese kitchen in the heart of Leicester',
  address: "St Martin's Square, 10 Silver Walk, Leicester LE1 5EW",
  phone: '0116 332 9836',
  instagram: 'https://www.instagram.com/yakimachi_',
  // From the restaurant's Google listing. If you change these, also update the booking rules in server/config.js.
  hours: [
    { days: 'Tuesday – Saturday', time: '12pm – 10pm' },
    { days: 'Sunday', time: '12pm – 9pm' },
    { days: 'Monday', time: 'Closed' },
  ],
  rating: 4.9,
  reviewCount: 139,
  priceRange: '£10–20 per person',
  // Dish names must match menu item names exactly. Chosen from the dishes Google lists as popular.
  featured: [
    'Omurice With Chicken Katsu Curry',
    'Dim Sum Platter',
    'Japanese Beef Rice Bowl',
    'Salt & Pepper King Prawns',
    'Green Dragon',
    'Bibimbap (Chicken)',
  ],
  // Real Google reviews, quoted as written (the first two are shortened by Google with "…").
  reviews: [
    {
      text: '… both of the times. A really cozy environment, good price and service. The food was always amazing. Special note to the spring rolls, king prawns gyoza and the chow mein.',
    },
    {
      text: 'Had wonderful lunch at this newly opened place. Very cute and cosy. If you need war hearty meal for a cold day, this is your place. Food is absolutely delicious and …',
    },
    {
      text: 'Tasty food at a reasonable price. The portions were big and staff were friendly and attentive.',
    },
  ],
}
