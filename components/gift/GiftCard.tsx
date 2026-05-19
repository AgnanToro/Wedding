'use client'

import { useState } from 'react'

interface GiftCardProps {
  bankName: string
  accountHolder: string
  accountNumber: string
  id: string
}

export default function GiftCard({ bankName, accountHolder, accountNumber, id: _id }: GiftCardProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20">
      <p className="font-playfair text-gold font-semibold text-lg">{bankName}</p>
      <p className="font-cormorant text-cream text-base mt-1">{accountHolder}</p>
      <div className="flex items-center justify-between gap-4 mt-3">
        <span className="font-cormorant text-cream text-xl tracking-widest">{accountNumber}</span>
        <button
          onClick={handleCopy}
          className="border border-gold text-gold font-cormorant px-4 py-2 rounded-lg hover:bg-gold/10 transition-all duration-200 text-sm min-h-[44px] min-w-[44px]"
        >
          {copied ? '✓ Tersalin' : 'Salin'}
        </button>
      </div>
      {copied && (
        <p className="text-green-400 font-cormorant text-sm mt-2">Nomor rekening berhasil disalin!</p>
      )}
      {error && (
        <p className="text-red-400 font-cormorant text-sm mt-2">Gagal menyalin. Silakan salin manual: {accountNumber}</p>
      )}
    </div>
  )
}
