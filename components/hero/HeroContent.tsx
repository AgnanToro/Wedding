'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '@/lib/wedding-data'
import { formatWeddingDate } from '@/lib/utils'
import CountdownTimer from '@/components/countdown/CountdownTimer'

const SLIDESHOW_PHOTOS = [
  '/halaman2-1.webp',
  '/halaman2-2.webp',
  '/halaman2-3.webp',
] as const

const SLIDE_INTERVAL_MS = 5000

// Color palette
const SECTION_BG = '#d9c08f'
const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#4b3a1f'
const TEXT_MUTED = '#6a5733'

export default function HeroContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const dateString = formatWeddingDate(WEDDING_CONFIG.weddingDate)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDESHOW_PHOTOS.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative" style={{ backgroundColor: SECTION_BG }}>
      {/* TOP — Photo slideshow with header + names overlay */}
      <div className="relative h-[70vh] sm:h-[78vh] min-h-[500px] overflow-hidden">
        {/* Stacked slideshow — all images mounted, only opacity animates.
            This avoids AnimatePresence DOM removeChild errors. */}
        {SLIDESHOW_PHOTOS.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ pointerEvents: 'none' }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          </motion.div>
        ))}

        {/* Subtle top gradient for header text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/30" />

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-10 sm:top-14 inset-x-0 text-center z-10"
        >
          <p className="font-cormorant text-cream/95 text-sm sm:text-base tracking-[0.4em] uppercase">
            The Wedding Of
          </p>
        </motion.div>

        {/* Names + date — sits over the lower part of the photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-x-0 bottom-20 sm:bottom-28 text-center z-10 px-6"
        >
          <h1 className="font-great-vibes text-cream text-6xl sm:text-7xl md:text-8xl leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            {WEDDING_CONFIG.groomName} &amp; {WEDDING_CONFIG.brideName}
          </h1>
          <p className="font-cormorant text-cream text-base sm:text-xl tracking-wide mt-3 drop-shadow-md">
            {dateString}
          </p>
        </motion.div>
      </div>

      {/* BOTTOM — Solid section with countdown + verse card */}
      <div className="relative px-4 sm:px-6 pt-6 pb-12 sm:pb-16 flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        {/* Countdown — sits ABOVE the photo bottom edge but inside the bottom section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full -mt-12 sm:-mt-14 z-10"
        >
          <CountdownTimer
            targetDate={WEDDING_CONFIG.weddingDate}
            variant="cream"
          />
        </motion.div>

        {/* Slideshow indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-6">
          {SLIDESHOW_PHOTOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Tampilkan foto ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? '24px' : '6px',
                backgroundColor: i === activeIndex ? ACCENT : `${ACCENT}55`,
              }}
            />
          ))}
        </div>

        {/* Quran verse card — compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-2xl shadow-xl px-5 py-6 sm:px-7 sm:py-7 text-center"
          style={{
            backgroundColor: '#f0e3c2',
            border: `1px solid ${ACCENT}`,
          }}
        >
          {/* Arabic verse — single line on most screens, max 2 lines */}
          <p
            dir="rtl"
            lang="ar"
            className="text-lg sm:text-xl leading-relaxed mb-4"
            style={{
              color: TEXT_PRIMARY,
              fontFamily:
                '"Amiri Quran", "Scheherazade New", "Traditional Arabic", serif',
            }}
          >
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
          </p>

          {/* Indonesian translation — concise, ~6 lines */}
          <p
            className="font-cormorant text-sm sm:text-base leading-relaxed italic"
            style={{ color: TEXT_MUTED }}
          >
            Dan di antara tanda-tanda kebesaran-Nya, Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang.
          </p>

          <p
            className="font-cormorant text-xs sm:text-sm font-semibold tracking-wide mt-3"
            style={{ color: TEXT_PRIMARY }}
          >
            (QS. Ar-Rum Ayat 21)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
