'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { calculateCountdown, CountdownResult } from '@/lib/utils'

interface CountdownTimerProps {
  targetDate: Date
  /**
   * 'glass'  → translucent white-on-dark cards (used on dark sections)
   * 'cream'  → cream cards with dark serif numbers (matches the hero verse card style)
   */
  variant?: 'glass' | 'cream'
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const cards = [
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
] as const

export default function CountdownTimer({ targetDate, variant = 'glass' }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<CountdownResult | null>(null)

  useEffect(() => {
    setCountdown(calculateCountdown(targetDate, new Date()))
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate, new Date()))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (countdown === null || 'expired' in countdown) {
    return (
      <div className="flex items-center justify-center">
        <p className="font-playfair text-gold text-2xl text-center">
          Hari Bahagia Telah Tiba 🎉
        </p>
      </div>
    )
  }

  const cardClass =
    variant === 'cream'
      ? 'rounded-xl sm:rounded-2xl px-1 py-3 sm:px-3 sm:py-5 text-center shadow-xl flex-1 min-w-0'
      : 'bg-white/20 backdrop-blur-md rounded-xl border border-white/30 p-6 text-center min-w-[80px]'

  const cardStyle =
    variant === 'cream'
      ? {
          backgroundColor: '#d9c08f',
          border: '1px solid #b9965a',
        }
      : undefined

  const numberClass =
    variant === 'cream'
      ? 'font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold leading-none'
      : 'font-playfair text-5xl font-semibold text-white'

  const numberStyle = variant === 'cream' ? { color: '#4b3a1f' } : undefined

  const labelClass =
    variant === 'cream'
      ? 'font-cormorant text-xs sm:text-sm tracking-widest mt-1'
      : 'font-cormorant text-cream/80 text-sm uppercase tracking-widest mt-1'

  const labelStyle = variant === 'cream' ? { color: '#6a5733' } : undefined

  return (
    <motion.div
      className={
        variant === 'cream'
          ? 'flex justify-center gap-1.5 sm:gap-2 w-full px-2'
          : 'flex flex-wrap justify-center gap-4'
      }
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {cards.map(({ key, label }) => (
        <motion.div
          key={key}
          variants={cardVariants}
          className={cardClass}
          style={cardStyle}
        >
          <p className={numberClass} style={numberStyle}>
            {String(countdown[key]).padStart(2, '0')}
          </p>
          <p className={labelClass} style={labelStyle}>
            {label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
