'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GALLERY_PHOTOS } from '@/lib/wedding-data'
import Lightbox from './Lightbox'

const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#3a3330'

function Tile({
  src,
  alt,
  idx,
  onClick,
  className = '',
}: {
  src: string
  alt: string
  idx: number
  onClick: (i: number) => void
  className?: string
}) {
  return (
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
 className={`relative mb-3 break-inside-avoid overflow-hidden rounded-md cursor-pointer shadow-md ${className}`}
  style={{ direction: 'ltr' }}
  onClick={() => onClick(idx)}
>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, 256px"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute inset-0 hover:bg-black/15 transition-colors duration-300" />
    </motion.div>
  )
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const p = GALLERY_PHOTOS.slice(0, 11)
  const open = (i: number) => setLightboxIndex(i)

  return (
    <section id="gallery" className="bg-white pt-14 pb-16 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3">
          <div
            className="flex-1 h-px max-w-[72px]"
            style={{ backgroundColor: '#d5c5a5' }}
          />

          <div>
            <h2
              className="font-playfair text-4xl sm:text-5xl font-semibold leading-tight"
              style={{ color: TEXT_PRIMARY }}
            >
              After LDR
            </h2>

            <p
              className="font-great-vibes text-3xl sm:text-4xl -mt-1"
              style={{ color: ACCENT }}
            >
              Moments
            </p>
          </div>

          <div
            className="flex-1 h-px max-w-[72px]"
            style={{ backgroundColor: '#d5c5a5' }}
          />
        </div>
      </motion.div>

      <div className="max-w-lg mx-auto">
        {/* FOTO WIDE AWAL */}
        {p[0] && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full rounded-2xl overflow-hidden cursor-pointer shadow-md mb-3"
            style={{ aspectRatio: '4/3' }}
            onClick={() => open(0)}
          >
            <Image
              src={p[0].src}
              alt={p[0].alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 hover:bg-black/15 transition-colors duration-300" />
          </motion.div>
        )}

        {/* MASONRY TANPA KOSONG */}
       <div
  className="columns-2 gap-3"
  style={{ direction: 'rtl' }}
>
          {p.slice(1).map((photo, i) => {
            const realIndex = i + 1

           const ratio =
  realIndex === 2 || realIndex === 5
    ? 'aspect-[4/3]'
    : 'aspect-[4/5]'

            return (
              <Tile
                key={`${photo.src}-${realIndex}`}
                src={photo.src}
                alt={photo.alt}
                idx={realIndex}
                onClick={open}
                
                className={ratio}
                
              />
            )
          })}
        </div>
      </div>

      <Lightbox
        photos={p}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : prev
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null && prev < p.length - 1 ? prev + 1 : prev
          )
        }
      />

      
    </section>
  )
}