import { GALLERY_PHOTOS } from '@/lib/wedding-data'
import GalleryGrid from './GalleryGrid'

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-24 px-6 bg-gradient-to-b from-stone-900 to-stone-800"
    >
      {/* Section heading */}
      <div className="text-center mb-16">
        <p className="font-cormorant text-gold text-base uppercase tracking-[0.3em] mb-3">
          Galeri Foto
        </p>
        <h2 className="font-playfair text-white text-3xl md:text-4xl font-semibold">
          Kenangan Indah
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-4" />
      </div>

      <div className="max-w-5xl mx-auto">
        <GalleryGrid photos={GALLERY_PHOTOS} />
      </div>
    </section>
  )
}
