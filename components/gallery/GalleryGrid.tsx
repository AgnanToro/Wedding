'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GalleryPhoto } from '@/lib/utils'
import Lightbox from './Lightbox'

interface GalleryGridProps {
  photos: GalleryPhoto[]
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-all duration-300"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </motion.div>

      <Lightbox
        photos={photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : prev))}
        onNext={() =>
          setLightboxIndex(prev =>
            prev !== null && prev < photos.length - 1 ? prev + 1 : prev
          )
        }
      />
    </>
  )
}
