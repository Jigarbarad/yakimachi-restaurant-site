import { restaurant } from '../config/restaurant'
import { directionsUrl } from './MapEmbed'

// Address, phone, hours and the directions button. Used on the home page and the Contact page.
export default function ContactDetails() {
  return (
    <div className="space-y-6 text-ink/80">
      <div>
        <h3 className="font-medium text-oak-dark">Address</h3>
        <p className="mt-1">{restaurant.address}</p>
      </div>
      <div>
        <h3 className="font-medium text-oak-dark">Phone</h3>
        <p className="mt-1">
          <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`} className="hover:text-lantern">
            {restaurant.phone}
          </a>
        </p>
      </div>
      <div>
        <h3 className="font-medium text-oak-dark">Opening hours</h3>
        {restaurant.hours.map((h) => (
          <p key={h.days} className="mt-1">
            {h.days}: {h.time}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-lantern px-6 py-2.5 text-sm font-medium text-paper hover:bg-lantern/85"
        >
          Get directions
        </a>
        <a
          href={restaurant.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-lantern px-6 py-2.5 text-sm font-medium text-lantern hover:bg-lantern hover:text-paper"
        >
          Instagram
        </a>
      </div>
    </div>
  )
}
