'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#3a3330'
const TEXT_MUTED = '#6b6360'

function PhotoCarousel({ photos, name }: { photos: string[]; name: string }) {
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
          requestAnimationFrame(() => {
            setWithTransition(true)
          })
        })
      }, 700)

      return () => window.clearTimeout(resetTimer)
    }
  }, [current, photos.length])

  const loopPhotos = [...photos, photos[0]]
  const activeDot = current === photos.length ? 0 : current

  return (
    <div
      className="relative flex-1 aspect-[3/4] rounded-sm overflow-hidden shadow-xl"
      style={{ border: '10px solid #fff' }}
    >
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
              alt={name}
              fill
              sizes="(max-width: 640px) 80vw, 320px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
        {photos.map((_, i) => (
          <span
            key={i}
            className="block rounded-full"
            style={{
              width: i === activeDot ? '16px' : '5px',
              height: '5px',
              backgroundColor:
                i === activeDot ? '#fff' : 'rgba(255,255,255,0.55)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface PersonCardProps {
  role: 'groom' | 'bride'
  roleLabel: string
  photos: string[]
  name: string
  description: string
  igHandle: string
  igUrl: string
}

function PersonCard({
  role,
  roleLabel,
  photos,
  name,
  description,
  igHandle,
  igUrl,
}: PersonCardProps) {
  const isGroom = role === 'groom'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8 }}
      className="w-full px-6 py-10 sm:px-10"
    >
      <div
        className={`flex items-stretch gap-3 ${
          isGroom ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className="flex items-center justify-center w-8 shrink-0">
          <span
            aria-hidden="true"
            className="font-playfair font-bold tracking-[0.2em] text-xl sm:text-2xl select-none"
            style={{
              color: ACCENT,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: isGroom ? 'none' : 'rotate(180deg)',
            }}
          >
            {roleLabel}
          </span>
        </div>

        <PhotoCarousel photos={photos} name={name} />
      </div>

      <div
        className={`mt-6 ${
          isGroom ? 'text-left' : 'text-right'
        }`}
      >
        <h2
          className="font-playfair text-4xl sm:text-5xl leading-tight"
          style={{ color: TEXT_PRIMARY }}
        >
          {name}
        </h2>

        <p
          className="font-cormorant text-lg sm:text-xl mt-3 leading-snug whitespace-pre-line"
          style={{ color: TEXT_MUTED }}
        >
          {description}
        </p>

        <div className={!isGroom ? 'flex justify-end' : ''}>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full font-cormorant font-semibold text-base sm:text-lg tracking-wide transition-opacity hover:opacity-80"
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
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.241 1.31 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.241 1.247-3.608 1.31-1.265.058-1.645.069-4.849.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.241-1.31-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.241-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.741 0 8.333.013 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.013 8.333 0 8.741 0 12c0 3.259.013 3.668.072 4.948.085 1.856.6 3.697 1.942 5.038 1.341 1.341 3.182 1.857 5.038 1.942C8.333 23.987 8.741 24 12 24s3.667-.013 4.947-.072c1.856-.085 3.698-.6 5.038-1.942 1.342-1.341 1.857-3.182 1.942-5.038.06-1.28.072-1.688.072-4.948 0-3.259-.013-3.667-.072-4.947-.085-1.857-.6-3.698-1.942-5.039C20.645.673 18.803.157 16.947.072 15.668.013 15.259 0 12 0z" />
              <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>

            {igHandle}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function LoveQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8 }}
      className="mx-6 sm:mx-10 mb-14 rounded-2xl px-7 py-8 sm:px-10 sm:py-10 text-center"
      style={{ backgroundColor: '#fff', border: `1px solid ${ACCENT}` }}
    >
      <p
        className="font-cormorant text-lg sm:text-xl leading-relaxed italic"
        style={{ color: TEXT_MUTED }}
      >
        &ldquo;I love you. I am who I am because of you. You are every reason,
        every hope, and every dream I&rsquo;ve ever had, and no matter what
        happens to us in the future, everyday we are together is the greatest
        day of my life. I will always be yours.&rdquo;
      </p>
    </motion.div>
  )
}

export default function CoupleSection() {
  return (
    <section id="couple" className="bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center pt-14 pb-2"
      >
        <p
          className="font-playfair text-2xl sm:text-3xl font-normal"
          style={{ color: TEXT_MUTED }}
        >
          Our Pray
        </p>

        <div
          className="mx-auto w-16 h-px mt-4"
          style={{ backgroundColor: '#d5c5a5' }}
        />
      </motion.div>

      <PersonCard
        role="groom"
        roleLabel="THE GROOM"
        photos={['/halaman3-1.webp', '/10R (1).webp']}
        name="Abdul Azis"
        description={`Putra ke - 3 dari\nBpk. Mustadi & Ibu Karniah`}
        igHandle="Abdul Azis"
        igUrl="https://www.instagram.com/azisabdul06/"
      />

      <PersonCard
        role="bride"
        roleLabel="THE BRIDE"
        photos={['/halaman3-2.webp', '/halaman3-4.webp']}
        name="Nurfi Laeli"
        description={`Putri ke - 2 dari\nBpk. Taryono & Ibu Waskinah`}
        igHandle="Nurfi Laeli"
        igUrl="https://www.instagram.com/amalia.nurfi/"
      />

      <LoveQuote />
    </section>
  )
}