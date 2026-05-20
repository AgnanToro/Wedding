'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'
import { Wish, validateName, validateGuestCount } from '@/lib/utils'

const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#4b3a1f'
const TEXT_MUTED = '#6a5733'

const inputStyle = {
  backgroundColor: 'rgba(255,255,255,0.6)',
  border: `1px solid ${ACCENT}60`,
  color: TEXT_PRIMARY,
}
const inputClass =
  'w-full rounded-xl px-4 py-3 font-cormorant text-base focus:outline-none transition-all duration-200'
const labelClass = 'font-cormorant text-base font-semibold mb-1.5 block'

interface RSVPFormProps {
  onSubmit: (wish: Wish) => void
}

// Check icon
function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06l-4.5 4.5-1.94-1.94a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5Z" clipRule="evenodd" />
    </svg>
  )
}

// X icon
function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
    </svg>
  )
}

// Celebration/heart icon for success
function IconHeart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12" aria-hidden="true">
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  )
}

export default function RSVPForm({ onSubmit }: RSVPFormProps) {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir' | ''>('')
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; attendance?: string; guestCount?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newErrors: typeof errors = {}
    if (!validateName(name)) newErrors.name = 'Nama tidak boleh kosong'
    if (!attendance) newErrors.attendance = 'Pilih status kehadiran'
    if (!validateGuestCount(guestCount)) newErrors.guestCount = 'Jumlah tamu 1–5 orang'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    const wish: Wish = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message,
      attendance: attendance as 'Hadir' | 'Tidak Hadir',
      submittedAt: Date.now(),
    }

    // Save to Supabase using browser client
    const supabase = createClient()
    const { error } = await supabase.from('rsvp').insert({
      name: wish.name,
      attendance: wish.attendance,
      guest_count: guestCount,
      message: message || null,
    })
    if (error) console.error('Supabase error:', error.message)

    onSubmit(wish)
    setSubmitted(true)
  }

  function handleReset() {
    setName(''); setAttendance(''); setGuestCount(1)
    setMessage(''); setErrors({}); setSubmitted(false)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="flex justify-center mb-4" style={{ color: ACCENT }}>
          <IconHeart />
        </div>
        <p className="font-playfair text-2xl font-medium mb-2" style={{ color: TEXT_PRIMARY }}>
          Terima Kasih!
        </p>
        <p className="font-cormorant text-lg" style={{ color: TEXT_MUTED }}>
          Ucapan dan konfirmasi kehadiranmu sudah kami terima.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 font-cormorant font-semibold text-base px-8 py-3 rounded-full transition-opacity hover:opacity-80 min-h-[44px]"
          style={{ backgroundColor: ACCENT, color: '#fff' }}
        >
          Kirim Ucapan Lagi
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="rsvp-name" className={labelClass} style={{ color: TEXT_PRIMARY }}>
          Nama Lengkap <span style={{ color: ACCENT }}>*</span>
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tulis nama lengkapmu"
          className={inputClass}
          style={inputStyle}
        />
        {errors.name && <p className="font-cormorant text-red-700 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Attendance — button toggle */}
      <div>
        <p className={labelClass} style={{ color: TEXT_PRIMARY }}>
          Kehadiran <span style={{ color: ACCENT }}>*</span>
        </p>
        <div className="flex gap-3">
          {/* Hadir button */}
          <button
            type="button"
            onClick={() => setAttendance('Hadir')}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-cormorant font-semibold text-base transition-all duration-200 min-h-[44px]"
            style={{
              backgroundColor: attendance === 'Hadir' ? ACCENT : 'rgba(255,255,255,0.6)',
              color: attendance === 'Hadir' ? '#fff' : TEXT_PRIMARY,
              border: `1px solid ${attendance === 'Hadir' ? ACCENT : `${ACCENT}60`}`,
            }}
          >
            <IconCheck />
            Hadir
          </button>
          {/* Tidak Hadir button */}
          <button
            type="button"
            onClick={() => setAttendance('Tidak Hadir')}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-cormorant font-semibold text-base transition-all duration-200 min-h-[44px]"
            style={{
              backgroundColor: attendance === 'Tidak Hadir' ? '#8b5e3c' : 'rgba(255,255,255,0.6)',
              color: attendance === 'Tidak Hadir' ? '#fff' : TEXT_PRIMARY,
              border: `1px solid ${attendance === 'Tidak Hadir' ? '#8b5e3c' : `${ACCENT}60`}`,
            }}
          >
            <IconX />
            Tidak Hadir
          </button>
        </div>
        {errors.attendance && <p className="font-cormorant text-red-700 text-sm mt-1">{errors.attendance}</p>}
      </div>

      {/* Guest count */}
      <div>
        <label htmlFor="rsvp-guests" className={labelClass} style={{ color: TEXT_PRIMARY }}>
          Jumlah Tamu <span style={{ color: ACCENT }}>*</span>
        </label>
        <input
          id="rsvp-guests"
          type="number"
          min={1}
          max={5}
          value={guestCount}
          onChange={e => setGuestCount(Number(e.target.value))}
          className={inputClass}
          style={inputStyle}
        />
        {errors.guestCount && <p className="font-cormorant text-red-700 text-sm mt-1">{errors.guestCount}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="rsvp-message" className={labelClass} style={{ color: TEXT_PRIMARY }}>
          Ucapan &amp; Doa{' '}
          <span className="font-normal" style={{ color: TEXT_MUTED }}>(opsional)</span>
        </label>
        <textarea
          id="rsvp-message"
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Tuliskan ucapan dan doamu untuk Azis & Laeli..."
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        className="w-full font-cormorant font-semibold text-lg py-3 rounded-xl transition-opacity hover:opacity-85 min-h-[44px] tracking-wide"
        style={{ backgroundColor: ACCENT, color: '#fff' }}
      >
        Kirim Ucapan
      </button>
    </form>
  )
}
