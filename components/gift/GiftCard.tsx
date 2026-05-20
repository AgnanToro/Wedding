'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GiftCardProps {
  bankName: string
  accountHolder: string
  accountNumber: string
  id: string
  logoSrc: string
}

function IconCopy() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
      <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
    </svg>
  )
}

export default function GiftCard({
  bankName,
  accountHolder,
  accountNumber,
  logoSrc,
}: GiftCardProps) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 3000)
    }
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[360px] h-[160px] overflow-hidden rounded-[16px] shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #f9f6f0 0%, #efe8d8 100%)',
        border: '1px solid rgba(185,150,90,0.22)',
      }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #b9965a 0, #b9965a 1px, transparent 0, transparent 50%)',
          backgroundSize: '12px 12px',
        }}
      />

      <div className="relative flex h-full flex-col p-3 sm:p-3.5">
        {/* Top */}
        <div className="flex items-center justify-between">
          {/* Chip */}
          <div
            className="w-9 h-7 rounded-md"
            style={{
              background:
                'linear-gradient(135deg, #d4a853 0%, #f0c84a 50%, #d4a853 100%)',
            }}
          >
            <div className="grid w-full h-full grid-cols-2 gap-0.5 p-1 opacity-70">
              <div className="rounded-sm bg-yellow-700/40" />
              <div className="rounded-sm bg-yellow-700/40" />
              <div className="rounded-sm bg-yellow-700/40" />
              <div className="rounded-sm bg-yellow-700/40" />
            </div>
          </div>

          {/* Logo */}
          <div className="relative h-7 w-22">
            <Image
              src={logoSrc}
              alt={bankName}
              fill
              sizes="88px"
              style={{
                objectFit: 'contain',
                objectPosition: 'right center',
              }}
            />
          </div>
        </div>

        {/* Content */}
       <div className="mt-4 flex-1 flex items-end justify-between">
          <div>
            <p
              className="font-playfair text-[15px] font-semibold leading-none"
              style={{ color: '#3a3330' }}
            >
              {accountHolder}
            </p>

            <p
              className="font-cormorant text-[13px] tracking-[0.18em] mt-1 leading-none"
              style={{ color: '#6a5733' }}
            >
              {accountNumber}
            </p>
          </div>

          {/* Button */}
          <div >
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-cormorant font-semibold text-[13px] tracking-wide transition-opacity hover:opacity-80 min-h-[34px]"
              style={{
                backgroundColor: '#3a3330',
                color: '#f0e3c2',
              }}
            >
              <IconCopy />

              {copied
                ? 'Tersalin!'
                : copyError
                  ? 'Gagal'
                  : 'Salin'}
            </button>
          </div>

          {copyError && (
            <p className="font-cormorant text-red-700 text-[11px] mt-1 text-right">
              Salin manual: {accountNumber}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}