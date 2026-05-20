'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '@/lib/wedding-data'

const SECTION_BG = '#fff'
const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#4b3a1f'
const TEXT_MUTED = '#6a5733'

// PhotoCarousel — same as CoupleSection but direction prop
function PhotoCarousel({
  photos,
  alt,
  direction,
}: {
  photos: string[]
  alt: string
  direction: 'left' | 'right'
}) {
  const [current, setCurrent] = useState(0)
  const [withTransition, setWithTransition] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrent((i) => i + 1)
    }, 2500)
    return () => window.clearTimeout(timer)
  }, [current])

  useEffect(() => {
    if (current === photos.length) {
      const resetTimer = window.setTimeout(() => {
        setWithTransition(false)
        setCurrent(0)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setWithTransition(true))
        })
      }, 700)
      return () => window.clearTimeout(resetTimer)
    }
  }, [current, photos.length])

  const loopPhotos = direction === 'left'
    ? [...photos, photos[0]]
    : [...photos].reverse().concat(photos[photos.length - 1])

  const activeDot = current === photos.length ? 0 : current

  return (
   <div className="relative w-full aspect-[16/10] overflow-hidden shadow-xl">
      <div
        className="absolute inset-y-0 left-0 flex h-full"
        style={{
          width: `${loopPhotos.length * 100}%`,
          transform: `translateX(-${(current * 100) / loopPhotos.length}%)`,
          transition: withTransition
            ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none',
        }}
      >
        {loopPhotos.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full shrink-0"
            style={{ width: `${100 / loopPhotos.length}%` }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
        {photos.map((_, i) => (
          <span
            key={i}
            className="block rounded-full"
            style={{
              width: i === activeDot ? '16px' : '5px',
              height: '5px',
              backgroundColor: i === activeDot ? '#fff' : 'rgba(255,255,255,0.55)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface EventCardProps {
  title: string
  photos: string[]
  photoDirection: 'left' | 'right'
  dayName: string
  date: string
  time: string
  location: string
  address: string
  mapsUrl: string
  labelSide: 'left' | 'right'
}

function EventCard({
  title,
  photos,
  photoDirection,
  dayName,
  date,
  time,
  location,
  address,
  mapsUrl,
  labelSide,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8 }}
      className="mx-6 sm:mx-10 mb-10"
    >
      {/* Photo with rounded top */}
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* Photo strip */}
        <PhotoCarousel photos={photos} alt={title} direction={photoDirection} />

        {/* Info block */}
        <div className="relative">
          {/* Gold vertical tab — left or right */}
          <div
            className={`absolute top-0 bottom-0 w-10 flex items-center justify-center ${
              labelSide === 'left' ? 'left-0 rounded-bl-2xl' : 'right-0 rounded-br-2xl'
            }`}
            style={{ backgroundColor: ACCENT }}
          >
            <span
              className="font-cormorant font-semibold text-sm tracking-widest text-white select-none"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: labelSide === 'left' ? 'rotate(180deg)' : 'none',
              }}
            >
              {title}
            </span>
          </div>

          {/* Text content — padded away from the label */}
         <div
  className={`py-6 text-center ${
    labelSide === 'left' ? 'pl-16 pr-6' : 'pr-16 pl-6'
  }`}
>
            <h3
              className="font-playfair text-4xl sm:text-5xl font-medium"
              style={{ color: TEXT_PRIMARY }}
            >
              {dayName}
            </h3>
            <p
              className="font-cormorant text-lg sm:text-xl mt-0.5"
              style={{ color: TEXT_MUTED }}
            >
              {date}
            </p>
            <p
              className="font-cormorant text-base sm:text-lg mt-2"
              style={{ color: TEXT_MUTED }}
            >
              Pukul : {time} WIB - Selesai
            </p>
            <p
              className="font-cormorant text-base sm:text-lg mt-2 italic"
              style={{ color: TEXT_MUTED }}
            >
              Bertempat di
            </p>
            <p
              className="font-playfair text-lg sm:text-xl font-semibold mt-0.5"
              style={{ color: TEXT_PRIMARY }}
            >
              {location}
            </p>
            <p
              className="font-cormorant text-sm sm:text-base mt-2 leading-relaxed"
              style={{ color: TEXT_MUTED }}
            >
              {address}
            </p>

            {/* Maps button */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full font-cormorant font-semibold text-base tracking-wide transition-opacity hover:opacity-80"
              style={{
                backgroundColor: ACCENT,
                color: '#fff',
                minHeight: '44px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  clipRule="evenodd"
                />
              </svg>
              Maps
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AcaraSection() {
  const { akad, reception } = WEDDING_CONFIG.venue

  return (
    <section id="acara" className="pt-12 pb-6" style={{ backgroundColor: SECTION_BG }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center px-6 mb-10"
      >
        <h2
          className="font-playfair text-4xl sm:text-5xl font-medium"
          style={{ color: TEXT_PRIMARY }}
        >
          Acara Utama
        </h2>
        <p
          className="font-cormorant text-lg sm:text-xl mt-2"
          style={{ color: TEXT_MUTED }}
        >
          Akad Nikah &amp; Resepsi
        </p>
        <div className="mx-auto w-16 h-px mt-4" style={{ backgroundColor: ACCENT, opacity: 0.5 }} />
      </motion.div>

      {/* Akad — foto ke kanan (halaman4-1, halaman4-2) */}
      <EventCard
        title="Akad Nikah"
        photos={['/halaman4-1.webp', '/halaman4-2.webp']}
        photoDirection="right"
        dayName="Selasa"
        date="26 Mei 2026"
        time={akad.time}
        location={akad.name}
        address={akad.address}
        mapsUrl={akad.mapsUrl}
        labelSide="left"
      />

      {/* Resepsi — foto ke kiri (halaman4-3, Halaman4-4) */}
      <EventCard
        title="Resepsi"
        photos={['/halaman4-3.webp', '/Halaman4-4.webp']}
        photoDirection="left"
        dayName="Selasa"
        date="26 Mei 2026"
        time={reception.time}
        location={reception.name}
        address={reception.address}
        mapsUrl={reception.mapsUrl}
        labelSide="right"
      />
    </section>
  )
}
