'use client'

import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '@/lib/wedding-data'

export default function FooterContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center text-center gap-6 py-16 px-6"
    >
      {/* Top decorative gold ornament */}
      <p className="text-gold text-2xl tracking-widest">✦ ─── ✦ ─── ✦</p>

      {/* Thank-you message */}
      <p className="font-cormorant text-cream/80 text-lg md:text-xl max-w-lg leading-relaxed italic">
        Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
      </p>

      {/* Couple names in Great Vibes */}
      <p className="font-great-vibes text-gold text-5xl md:text-6xl">
        {WEDDING_CONFIG.groomName} &amp; {WEDDING_CONFIG.brideName}
      </p>

      {/* Wedding year + tagline */}
      <p className="font-cormorant text-cream/60 text-base tracking-widest uppercase">
        2025 · Bersama Selamanya
      </p>

      {/* Bottom decorative gold ornament */}
      <p className="text-gold text-2xl tracking-widest">✦ ─── ✦ ─── ✦</p>
    </motion.div>
  )
}
