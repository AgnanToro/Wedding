'use client'

import { useState } from 'react'
import { Wish, validateName, validateGuestCount } from '@/lib/utils'

interface RSVPFormProps {
  onSubmit: (wish: Wish) => void
}

const inputClassName =
  'w-full bg-white/10 border border-gold/30 rounded-lg px-4 py-3 font-cormorant text-cream placeholder-cream/50 focus:outline-none focus:border-gold transition-colors duration-200'

const labelClassName = 'font-cormorant text-cream text-base mb-1 block'

export default function RSVPForm({ onSubmit }: RSVPFormProps) {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir' | ''>('')
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
    attendance?: string
    guestCount?: string
  }>({})
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newErrors: { name?: string; attendance?: string; guestCount?: string } = {}

    if (!validateName(name)) {
      newErrors.name = 'Nama tidak boleh kosong'
    }

    if (attendance === '') {
      newErrors.attendance = 'Pilih status kehadiran'
    }

    if (!validateGuestCount(guestCount)) {
      newErrors.guestCount = 'Jumlah tamu antara 1-5 orang'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const wish: Wish = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message,
      attendance: attendance as 'Hadir' | 'Tidak Hadir',
      submittedAt: Date.now(),
    }

    onSubmit(wish)
    setSubmitted(true)
  }

  function handleReset() {
    setName('')
    setAttendance('')
    setGuestCount(1)
    setMessage('')
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="font-cormorant text-cream text-xl mb-6">
          Terima kasih! Ucapan Anda telah kami terima. 💝
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="w-full bg-gold text-white font-cormorant font-semibold py-3 rounded-lg hover:bg-gold-light transition-colors duration-200 tracking-wide text-lg mt-4 min-h-[44px]"
        >
          Kirim Ucapan Lagi
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="rsvp-name" className={labelClassName}>
          Nama Lengkap *
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Lengkap"
          className={inputClassName}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Attendance */}
      <div className="mb-4">
        <label htmlFor="rsvp-attendance" className={labelClassName}>
          Kehadiran *
        </label>
        <select
          id="rsvp-attendance"
          value={attendance}
          onChange={(e) =>
            setAttendance(e.target.value as 'Hadir' | 'Tidak Hadir' | '')
          }
          className={inputClassName}
        >
          <option value="">-- Pilih Kehadiran --</option>
          <option value="Hadir">Hadir</option>
          <option value="Tidak Hadir">Tidak Hadir</option>
        </select>
        {errors.attendance && (
          <p className="text-red-400 text-sm mt-1">{errors.attendance}</p>
        )}
      </div>

      {/* Guest Count */}
      <div className="mb-4">
        <label htmlFor="rsvp-guest-count" className={labelClassName}>
          Jumlah Tamu *
        </label>
        <input
          id="rsvp-guest-count"
          type="number"
          min={1}
          max={5}
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className={inputClassName}
        />
        {errors.guestCount && (
          <p className="text-red-400 text-sm mt-1">{errors.guestCount}</p>
        )}
      </div>

      {/* Message */}
      <div className="mb-4">
        <label htmlFor="rsvp-message" className={labelClassName}>
          Ucapan &amp; Doa (opsional)
        </label>
        <textarea
          id="rsvp-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan ucapan dan doa Anda..."
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gold text-white font-cormorant font-semibold py-3 rounded-lg hover:bg-gold-light transition-colors duration-200 tracking-wide text-lg mt-4 min-h-[44px]"
      >
        Kirim Ucapan
      </button>
    </form>
  )
}
