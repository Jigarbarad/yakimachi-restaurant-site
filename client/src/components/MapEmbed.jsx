import { restaurant } from '../config/restaurant'

const query = encodeURIComponent(`${restaurant.name} ${restaurant.address}`)

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`

// Google's keyless embed. It loads inside an iframe, so Google's map code never runs on our page.
export default function MapEmbed({ className = '' }) {
  return (
    <iframe
      title={`Map showing ${restaurant.name}`}
      src={`https://www.google.com/maps?q=${query}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full rounded-2xl border border-oak/50 bg-paper-deep ${className}`}
    />
  )
}
