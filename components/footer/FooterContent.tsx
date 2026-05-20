'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ACCENT = '#b9965a'

export default function FooterContent() {
  return (
    <>
      {/* TOP — landscape photo (4:3 ratio, wide not tall) */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <Image
          src="/UJ1_4673.webp"
          alt="Abdul Azis & Nurfi Laeli"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

        {/* Centered text overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-cormorant text-white/90 text-xs sm:text-sm tracking-[0.35em] uppercase mb-3">
            Kami Yang Berbahagia
          </p>
          <h2
            className="font-great-vibes text-white leading-tight drop-shadow-lg"
            style={{ fontSize: 'clamp(2rem, 9vw, 4.5rem)' }}
          >
            Abdul Azis
          </h2>
          <p
            className="font-great-vibes text-white leading-none drop-shadow-lg"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 3.5rem)' }}
          >
            &amp;
          </p>
          <h2
            className="font-great-vibes text-white leading-tight drop-shadow-lg"
            style={{ fontSize: 'clamp(2rem, 9vw, 4.5rem)' }}
          >
            Nurfi Laeli
          </h2>
          <p className="font-cormorant text-white/80 text-sm sm:text-base mt-3 leading-relaxed max-w-xs mx-auto">
            Atas kehadiran dan doa restunya kami ucapkan terima kasih
          </p>
        </motion.div>
      </div>

      {/* BOTTOM — compact "Made By" */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-white px-6 py-5 text-center"
      >
        <p className="font-playfair text-sm font-medium tracking-wide" style={{ color: '#3a3330' }}>
          Made By
        </p>
        <p
          className="font-great-vibes leading-tight"
          style={{ color: ACCENT, fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}
        >
          Agnan Toro
        </p>
      </motion.div>
    </>
  )
}
