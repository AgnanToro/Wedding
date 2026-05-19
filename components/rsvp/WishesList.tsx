'use client'

import { Wish } from '@/lib/utils'

interface WishesListProps {
  wishes: Wish[]
}

export default function WishesList({ wishes }: WishesListProps) {
  return (
    <div>
      <h3 className="font-playfair text-gold text-xl mb-4">Ucapan &amp; Doa</h3>
      <div
        style={{ maxHeight: '480px', overflowY: 'auto' }}
        className="scrollbar-thin"
      >
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-gold/20 mb-3 last:mb-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-playfair text-cream font-semibold text-base">{wish.name}</p>
                <p className="font-cormorant text-cream/80 text-base mt-1 leading-relaxed break-words">
                  {wish.message}
                </p>
              </div>
              <span
                className={`shrink-0 text-xs px-3 py-1 rounded-full border font-cormorant tracking-wide ${
                  wish.attendance === 'Hadir'
                    ? 'border-gold text-gold'
                    : 'border-cream/40 text-cream/60'
                }`}
              >
                {wish.attendance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
