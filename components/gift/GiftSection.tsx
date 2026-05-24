'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { QRIS_IMAGE } from '@/lib/wedding-data'
import GiftCard from './GiftCard'

const ACCENT = '#b9965a'
const TEXT_CREAM = '#f0e3c2'

const BANKS = [
  {
    id: '1',
    bankName: 'Bank Negara Indonesia',
    accountHolder: 'Abdul Azis',
    accountNumber: '2037420394',
    logoSrc: '/Bni.jpg',
  },
  {
    id: '2',
    bankName: 'Bank Mandiri',
    accountHolder: 'Nurfi Laeli',
    accountNumber: '1340017203869',
    logoSrc: '/Mandiri.webp',
  },
]

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="w-5 h-5 fill-current"
    >
      <path d="M19.11 17.21c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.33-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.61-.66 1.84-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32z" />
      <path d="M16.03 3C8.84 3 3 8.74 3 15.82c0 2.5.73 4.94 2.11 7.03L3 29l6.34-2.04a13.1 13.1 0 0 0 6.69 1.82h.01c7.19 0 13.03-5.74 13.03-12.82C29.06 8.74 23.22 3 16.03 3zm0 23.51h-.01a10.8 10.8 0 0 1-5.5-1.5l-.39-.23-3.76 1.21 1.23-3.64-.25-.37a10.48 10.48 0 0 1-1.67-5.67c0-5.83 4.8-10.57 10.7-10.57 5.9 0 10.7 4.74 10.7 10.57 0 5.83-4.8 10.57-10.69 10.57z" />
    </svg>
  )
}

export default function GiftSection() {
  return (
    <section
      id="gift"
      className="relative"
      style={{
        backgroundImage: 'url(/halaman3-3.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-5 pt-12 pb-14 sm:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <h2 className="font-playfair text-4xl sm:text-5xl font-semibold leading-tight text-white">
              Wedding
            </h2>

            <div
              className="flex-1 h-px min-w-10"
              style={{
                backgroundColor: ACCENT,
                opacity: 0.7,
              }}
            />
          </div>

          <p
            className="font-great-vibes text-7xl sm:text-8xl -mt-1 text-center"
            style={{ color: ACCENT }}
          >
            Gift
          </p>

          <p
            className="font-cormorant text-sm sm:text-base leading-relaxed mt-4 text-center max-w-xs mx-auto"
            style={{ color: TEXT_CREAM }}
          >
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami.
            Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat
            memberi kado secara cashless.
          </p>
        </motion.div>

        {/* Bank Cards */}
        <div className="space-y-3 max-w-70 mx-auto sm:max-w-xs">
          {BANKS.map((bank, i) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <GiftCard
                id={bank.id}
                bankName={bank.bankName}
                accountHolder={bank.accountHolder}
                accountNumber={bank.accountNumber}
                logoSrc={bank.logoSrc}
              />
            </motion.div>
          ))}

          {/* QRIS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-xl shadow-lg p-4"
            style={{
              background:
                'linear-gradient(135deg, #f9f6f0 0%, #efe8d8 100%)',
              border: '1px solid rgba(185,150,90,0.25)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p
                className="font-playfair text-xs font-semibold"
                style={{ color: '#3a3330' }}
              >
                QRIS
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-2 rounded-lg shadow inline-block">
                <Image
                  src={QRIS_IMAGE}
                  alt="QRIS code untuk transfer melalui dompet digital"
                  width={120}
                  height={120}
                  className="rounded h-auto w-auto"
                />
              </div>
            </div>

            <p
              className="font-cormorant text-xs text-center mt-2"
              style={{ color: '#6a5733' }}
            >
              Screenshot atau scan QR untuk transfer
            </p>
          </motion.div>
        </div>

        {/* WhatsApp Confirmation */}
        <div className="mt-6 flex flex-col gap-3 items-center">
          <p
            className="font-cormorant text-sm sm:text-base text-center max-w-xs"
            style={{ color: TEXT_CREAM }}
          >
            Mohon konfirmasi transfer melalui WhatsApp. Terima kasih atas doa
            restu dan tanda kasih yang diberikan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Azis */}
            <a
              href="https://wa.me/821068698569"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: `1px solid ${ACCENT}`,
                color: TEXT_CREAM,
                backdropFilter: 'blur(6px)',
              }}
            >
              <WhatsAppIcon />

              <span className="font-cormorant text-sm">
                Konfirmasi Azis
              </span>
            </a>

            {/* Nurfi */}
            <a
              href="https://wa.me/6285721512445"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: `1px solid ${ACCENT}`,
                color: TEXT_CREAM,
                backdropFilter: 'blur(6px)',
              }}
            >
              <WhatsAppIcon />

              <span className="font-cormorant text-sm">
                Konfirmasi Laeli
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}