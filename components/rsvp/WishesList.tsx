'use client'

import { motion } from 'framer-motion'
import { Wish } from '@/lib/utils'

const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#4b3a1f'
const TEXT_MUTED = '#6a5733'

interface WishesListProps {
  wishes: Wish[]
}

export default function WishesList({ wishes }: WishesListProps) {
  if (wishes.length === 0) return null

  return (
    <div>
      <h3
        className="font-playfair text-xl font-medium mb-4 text-center"
        style={{ color: TEXT_PRIMARY }}
      >
        Ucapan &amp; Doa Tamu
      </h3>

      {/* Scrollable card list — max 4 cards visible */}
      <div
        className="space-y-3"
        style={{ maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}
      >
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-2xl px-5 py-4 shadow-md"
            style={{
              backgroundColor: '#f0e3c2',
              border: `1px solid ${ACCENT}50`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p
                  className="font-playfair text-base font-semibold truncate"
                  style={{ color: TEXT_PRIMARY }}
                >
                  {wish.name}
                </p>
                {wish.message && (
                  <p
                    className="font-cormorant text-base mt-1 leading-relaxed break-words"
                    style={{ color: TEXT_MUTED }}
                  >
                    {wish.message}
                  </p>
                )}
              </div>
              <span
                className="shrink-0 text-xs px-3 py-1 rounded-full font-cormorant tracking-wide"
                style={{
                  backgroundColor: wish.attendance === 'Hadir' ? `${ACCENT}25` : '#00000010',
                  color: wish.attendance === 'Hadir' ? ACCENT : '#888',
                  border: `1px solid ${wish.attendance === 'Hadir' ? ACCENT : '#ccc'}`,
                }}
              >
                {wish.attendance}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
