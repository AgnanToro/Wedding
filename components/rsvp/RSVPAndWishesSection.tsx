'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wish, addWish, sortWishesNewestFirst } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import RSVPForm from './RSVPForm'
import WishesList from './WishesList'

const SECTION_BG = '#d9c08f'
const TEXT_PRIMARY = '#4b3a1f'
const TEXT_MUTED = '#6a5733'
const ACCENT = '#b9965a'

export default function RSVPAndWishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)

  // Load existing wishes from Supabase on mount
  useEffect(() => {
    async function loadWishes() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('rsvp')
        .select('id, name, attendance, message, submitted_at')
        .order('submitted_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Failed to load wishes:', error.message)
      } else if (data) {
        const mapped: Wish[] = data.map((row) => ({
          id: row.id,
          name: row.name,
          attendance: row.attendance as 'Hadir' | 'Tidak Hadir',
          message: row.message ?? '',
          submittedAt: new Date(row.submitted_at).getTime(),
        }))
        setWishes(mapped)
      }
      setLoading(false)
    }
    loadWishes()
  }, [])

  function handleWishAdded(wish: Wish) {
    setWishes(prev => sortWishesNewestFirst(addWish(prev, wish)))
  }

  return (
    <section id="rsvp" className="px-6 pt-12 pb-14 sm:px-10" style={{ backgroundColor: SECTION_BG }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 h-px max-w-[60px]" style={{ backgroundColor: ACCENT, opacity: 0.5 }} />
            <h2 className="font-playfair text-4xl sm:text-5xl font-semibold leading-tight" style={{ color: TEXT_PRIMARY }}>
              Wedding
            </h2>
            <div className="flex-1 h-px max-w-[60px]" style={{ backgroundColor: ACCENT, opacity: 0.5 }} />
          </div>
          <p className="font-great-vibes text-3xl sm:text-4xl -mt-1" style={{ color: ACCENT }}>
            Wishes
          </p>
        </div>
        <p className="font-cormorant text-lg sm:text-xl mt-4 text-center" style={{ color: TEXT_MUTED }}>
          Tinggalkan kami doa terbaik anda untuk momen bahagia kami
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-2xl shadow-xl px-6 py-8 sm:px-8 sm:py-10 mb-8"
        style={{ backgroundColor: '#f0e3c2', border: `1px solid ${ACCENT}` }}
      >
        <RSVPForm onSubmit={handleWishAdded} />
      </motion.div>

      {/* Wishes list — loaded from Supabase */}
      {loading ? (
        <p className="font-cormorant text-center text-base" style={{ color: TEXT_MUTED }}>
          Memuat ucapan...
        </p>
      ) : wishes.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <WishesList wishes={wishes} />
        </motion.div>
      ) : null}
    </section>
  )
}
