import CountdownTimer from './CountdownTimer'
import { WEDDING_CONFIG } from '@/lib/wedding-data'

export default function CountdownSection() {
  return (
    <section
      id="countdown"
      className="relative py-24 px-6 bg-gradient-to-b from-stone-900 to-stone-800 text-center"
    >
      {/* Section heading */}
      <div className="mb-12">
        <p className="font-cormorant text-gold text-base uppercase tracking-[0.3em] mb-3">
          Menghitung Hari
        </p>
        <h2 className="font-playfair text-white text-3xl md:text-4xl font-semibold">
          Waktu Menuju Hari Bahagia
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-4" />
      </div>

      <CountdownTimer targetDate={WEDDING_CONFIG.weddingDate} />
    </section>
  )
}
