'use client'

import { useState } from 'react'
import { INITIAL_WISHES } from '@/lib/wedding-data'
import { Wish, addWish, sortWishesNewestFirst } from '@/lib/utils'
import RSVPForm from './RSVPForm'
import WishesList from './WishesList'

export default function RSVPAndWishesSection() {
  const [wishes, setWishes] = useState<Wish[]>(sortWishesNewestFirst(INITIAL_WISHES))

  function handleWishAdded(wish: Wish) {
    setWishes(prev => sortWishesNewestFirst(addWish(prev, wish)))
  }

  return (
    <section
      id="rsvp"
      className="relative py-24 px-6 bg-gradient-to-b from-stone-800 to-stone-900"
    >
      {/* Section heading */}
      <div className="text-center mb-16">
        <p className="font-cormorant text-gold text-base uppercase tracking-[0.3em] mb-3">
          Konfirmasi Kehadiran
        </p>
        <h2 className="font-playfair text-white text-3xl md:text-4xl font-semibold">
          RSVP & Ucapan
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-4" />
      </div>

      {/* Two-column on desktop, stacked on mobile */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* RSVP form */}
        <div>
          <h3 className="font-playfair text-gold text-xl mb-6">Kirim Ucapan</h3>
          <RSVPForm onSubmit={handleWishAdded} />
        </div>
        {/* Wishes list */}
        <div>
          <WishesList wishes={wishes} />
        </div>
      </div>
    </section>
  )
}
