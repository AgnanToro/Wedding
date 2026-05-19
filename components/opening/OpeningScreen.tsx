'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { WEDDING_CONFIG } from '@/lib/wedding-data'
import { formatWeddingDate } from '@/lib/utils'
import MusicPlayer from '@/components/music/MusicPlayer'

interface OpeningScreenProps {
  children: React.ReactNode
}

/**
 * Reads the `?to=` query parameter from the current URL and returns it
 * with each word capitalised. Falls back to "Tamu Undangan" when the
 * parameter is absent or empty.
 */
function readGuestName(): string {
  if (typeof window === 'undefined') return 'Tamu Undangan'
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('to')?.trim()
  if (!raw) return 'Tamu Undangan'
  return raw
    .split(/\s+/)
    .map((word) =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word
    )
    .join(' ')
}

export default function OpeningScreen({ children }: OpeningScreenProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [autoplay, setAutoplay] = useState(false)
  const [guestName, setGuestName] = useState('Tamu Undangan')

  // Resolve the guest name on the client only, after hydration, so the SSR
  // markup matches the initial render.
  useEffect(() => {
    setGuestName(readGuestName())
  }, [])

  function handleOpen() {
    setIsOpen(true)
    setAutoplay(true)
  }

  const coupleNames = `${WEDDING_CONFIG.groomName} & ${WEDDING_CONFIG.brideName}`
  const weddingDateString = formatWeddingDate(WEDDING_CONFIG.weddingDate)
  // Duplicate the photos so the horizontal slide can loop seamlessly
  const slidePhotos = [
    ...WEDDING_CONFIG.openingPhotos,
    ...WEDDING_CONFIG.openingPhotos,
  ]

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="opening-overlay"
            className="fixed inset-0 z-50 overflow-hidden bg-stone-950"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            {/* Sliding background — two images that scroll continuously to the left */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-y-0 left-0 flex h-full"
                style={{ width: `${slidePhotos.length * 100}%` }}
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  duration: 30,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {slidePhotos.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="relative h-full"
                    style={{ width: `${100 / slidePhotos.length}%` }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      preload
                      sizes="100vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 py-14 sm:py-20 text-center">
              {/* Top group: header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <p className="font-cormorant text-cream/90 text-base sm:text-lg tracking-[0.4em] uppercase">
                  The Wedding Of
                </p>
                <h1 className="font-playfair text-cream text-5xl sm:text-6xl md:text-7xl font-medium leading-tight">
                  {coupleNames}
                </h1>
                <p className="font-cormorant text-cream/90 text-lg sm:text-xl tracking-wide">
                  {weddingDateString}
                </p>
              </motion.div>

              {/* Bottom group: guest greeting + open button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col items-center gap-3"
              >
                <p className="font-cormorant font-semibold text-cream text-base sm:text-lg tracking-wide">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <p className="font-playfair italic text-cream text-3xl sm:text-4xl">
                  {guestName}
                </p>

                <button
                  onClick={handleOpen}
                  className="mt-6 inline-flex items-center gap-2 border border-gold/70 bg-cream/10 backdrop-blur-md text-cream font-cormorant px-8 py-3 rounded-lg tracking-widest text-sm sm:text-base hover:bg-cream/20 transition-colors duration-300 shadow-lg"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5 text-gold"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  Buka Undangan
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — rendered after opening */}
      {isOpen && children}

      {/* Music player — rendered after opening */}
      {isOpen && (
        <MusicPlayer src={WEDDING_CONFIG.music} autoplay={autoplay} />
      )}
    </>
  )
}
