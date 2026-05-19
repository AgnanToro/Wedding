'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#3a3330'
const TEXT_MUTED = '#6b6360'

interface PersonCardProps {
  role: 'groom' | 'bride'
  roleLabel: string
  photo: string
  name: string
  description: string
  igHandle: string
  igUrl: string
}

function PersonCard({ role, roleLabel, photo, name, description, igHandle, igUrl }: PersonCardProps) {
  const isGroom = role === 'groom'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8 }}
      className="w-full px-6 py-10 sm:px-10"
    >
      {/* 
        Groom: photo (left) | label (right)  → flex-row, label at end
        Bride: label (left) | photo (right)  → flex-row, label at start
      */}
      <div className="flex items-stretch gap-3">
        {/* Left slot: only bride has label on left */}
        {!isGroom && (
          <div className="flex items-center justify-center w-8 shrink-0">
            <span
              aria-hidden="true"
              className="font-playfair font-bold tracking-[0.2em] text-xl sm:text-2xl select-none"
              style={{
                color: ACCENT,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'none',
                display: 'block',
              }}
            >
              {roleLabel}
            </span>
          </div>
        )}

        {/* Photo — polaroid */}
        <div
          className="relative flex-1 aspect-[3/4] rounded-sm overflow-hidden shadow-xl"
          style={{ border: '10px solid #fff' }}
        >
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 80vw, 320px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right slot: only groom has label on right */}
        {isGroom && (
          <div className="flex items-center justify-center w-8 shrink-0">
            <span
              aria-hidden="true"
              className="font-playfair font-bold tracking-[0.2em] text-xl sm:text-2xl select-none"
              style={{
                color: ACCENT,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                display: 'block',
              }}
            >
              {roleLabel}
            </span>
          </div>
        )}
      </div>

      {/* Info block below — groom aligns left, bride aligns right */}
      <div className={`mt-6 ${isGroom ? 'pr-11 sm:pr-14' : 'pl-11 sm:pl-14 text-right'}`}>
        <h2 className="font-playfair text-4xl sm:text-5xl leading-tight" style={{ color: TEXT_PRIMARY }}>
          {name}
        </h2>
        <p
          className="font-cormorant text-lg sm:text-xl mt-3 leading-snug whitespace-pre-line"
          style={{ color: TEXT_MUTED }}
        >
          {description}
        </p>

        <div className={isGroom ? '' : 'flex justify-end'}>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full font-cormorant font-semibold text-base sm:text-lg tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: ACCENT, color: '#fff', minHeight: '44px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
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
      style={{ backgroundColor: '#fff', border: '1px solid #b9965a' }}
    >
      <p className="font-cormorant text-lg sm:text-xl leading-relaxed italic" style={{ color: TEXT_MUTED }}>
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
        <p className="font-playfair text-2xl sm:text-3xl font-normal" style={{ color: TEXT_MUTED }}>
          Our Pray
        </p>
        <div className="mx-auto w-16 h-px mt-4" style={{ backgroundColor: '#d5c5a5' }} />
      </motion.div>

      <PersonCard
        role="groom"
        roleLabel="THE GROOM"
        photo="/halaman3-1.webp"
        name="Abdul Azis"
        description={`Putra ke - 3 dari\nBpk. Mustadi & Ibu Karniah`}
        igHandle="Abdul Azis"
        igUrl="https://www.instagram.com/azisabdul06/"
      />

      <PersonCard
        role="bride"
        roleLabel="THE BRIDE"
        photo="/halaman3-2.webp"
        name="Nurfi Laeli"
        description={`Putri ke - 2 dari\nBpk. Taryono & Ibu Waskinah`}
        igHandle="Nurfi Laeli"
        igUrl="https://www.instagram.com/amalia.nurfi/"
      />

      <LoveQuote />
    </section>
  )
}
