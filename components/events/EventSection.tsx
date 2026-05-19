import { WEDDING_CONFIG } from '@/lib/wedding-data'
import EventCard from './EventCard'

export default function EventSection() {
  const { akad, reception } = WEDDING_CONFIG.venue

  return (
    <section
      id="events"
      className="relative py-24 px-6 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900"
    >
      {/* Section heading */}
      <div className="text-center mb-16">
        <p className="font-cormorant text-gold text-base uppercase tracking-[0.3em] mb-3">
          Rangkaian Acara
        </p>
        <h2 className="font-playfair text-white text-3xl md:text-4xl font-semibold">
          Hari Istimewa Kami
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-4" />
      </div>

      {/* Ceremony cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <EventCard
          ceremonyName="Akad Nikah"
          date={akad.date}
          time={akad.time}
          venueName={akad.name}
          address={akad.address}
          mapsUrl={akad.mapsUrl}
          delay={0}
        />
        <EventCard
          ceremonyName="Resepsi Pernikahan"
          date={reception.date}
          time={reception.time}
          venueName={reception.name}
          address={reception.address}
          mapsUrl={reception.mapsUrl}
          delay={0.2}
        />
      </div>
    </section>
  )
}
