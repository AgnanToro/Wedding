'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { GalleryPhoto } from '@/lib/utils'

interface LightboxProps {
  photos: GalleryPhoto[]
  currentIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  // Keyboard navigation: Escape closes the lightbox
  useEffect(() => {
    if (currentIndex === null) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, onClose])

  return (
    <AnimatePresence>
      {currentIndex !== null && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Tutup lightbox"
            className="absolute top-4 right-4 text-white text-3xl w-11 h-11 flex items-center justify-center hover:text-gold transition-colors duration-200"
          >
            ×
          </button>

          {/* Image container — relative required for next/image fill */}
          <div className="relative w-full h-full max-w-4xl max-h-[85vh] mx-auto">
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Previous button */}
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            aria-label="Foto sebelumnya"
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl w-11 h-11 flex items-center justify-center transition-opacity duration-200 ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gold'
            }`}
          >
            ←
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            disabled={currentIndex === photos.length - 1}
            aria-label="Foto selanjutnya"
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl w-11 h-11 flex items-center justify-center transition-opacity duration-200 ${
              currentIndex === photos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gold'
            }`}
          >
            →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
