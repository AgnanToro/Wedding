'use client'

import { motion } from 'framer-motion'

interface EventCardProps {
  ceremonyName: string
  date: string
  time: string
  venueName: string
  address: string
  mapsUrl: string
  delay?: number
}

export default function EventCard({
  ceremonyName,
  date,
  time,
  venueName,
  address,
  mapsUrl,
  delay,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay ?? 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/30 shadow-lg text-center"
    >
      {/* Ceremony name */}
      <h3 className="font-playfair text-gold text-2xl font-semibold">
        {ceremonyName}
      </h3>

      {/* Gold divider */}
      <div className="w-16 h-px bg-gold mx-auto my-4" />

      {/* Date */}
      <p className="font-cormorant text-cream text-lg tracking-wide">{date}</p>

      {/* Time */}
      <p className="font-cormorant text-cream/80 text-base mb-4">{time}</p>

      {/* Venue name */}
      <p className="font-playfair text-white font-medium text-lg">{venueName}</p>

      {/* Address */}
      <p className="font-cormorant text-cream/70 text-sm mt-1 mb-6">{address}</p>

      {/* Google Maps button */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-gold text-gold font-cormorant px-6 py-3 rounded-lg hover:bg-gold/10 transition-colors duration-300 tracking-wide min-h-[44px] min-w-[44px]"
      >
        📍 Buka Google Maps
      </a>
    </motion.div>
  )
}
