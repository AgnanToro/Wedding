'use client'

import { motion } from 'framer-motion'

interface TimelineItemProps {
  year: string
  title: string
  description: string
  side: 'left' | 'right'
  index: number
}

export default function TimelineItem({ year, title, description, side, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`w-full max-w-md mx-auto md:mx-0 ${
        side === 'left'
          ? 'md:col-start-1 md:text-right md:pr-12'
          : 'md:col-start-2 md:text-left md:pl-12'
      }`}
    >
      {/* Gold dot indicator — centered above card on mobile */}
      <div className="flex justify-center mb-3">
        <div className="w-3 h-3 rounded-full bg-gold" />
      </div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 shadow-lg text-center md:text-inherit">
        <span className="font-cormorant text-gold text-sm font-semibold tracking-widest uppercase">
          {year}
        </span>
        <h3 className="font-playfair text-cream text-xl font-semibold mt-1">
          {title}
        </h3>
        <p className="font-cormorant text-cream/80 text-base mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
