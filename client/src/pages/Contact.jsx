import { Link } from 'react-router-dom'
import ContactDetails from '../components/ContactDetails'
import MapEmbed from '../components/MapEmbed'
import { restaurant } from '../config/restaurant'

export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Contact us</h1>
      <p className="mt-2 text-ink/70">
        The quickest way to reach us is by phone. To book a table, use{' '}
        <Link to="/reserve" className="font-medium text-lantern hover:underline">
          the reservation form
        </Link>
        .
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ContactDetails />
          <p className="mt-8 text-sm text-ink/50">
            Parties of more than 10? Please call {restaurant.phone}.
          </p>
        </div>
        <MapEmbed className="h-80 lg:col-span-3 lg:h-[28rem]" />
      </div>
    </section>
  )
}
