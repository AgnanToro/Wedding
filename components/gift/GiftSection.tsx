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
    logoSrc: '/bni.webp',
  },
  {
    id: '2',
    bankName: 'Bank Mandiri',
    accountHolder: 'Nurfi Laeli',
    accountNumber: '1240017203869',
    logoSrc: '/mandiri.webp',
  },
]

export default function GiftSection() {
  return (
    <section
      id="gift"
      className="relative"
      style={{
        // CSS fixed background — foto tidak ikut scroll (desktop)
        backgroundImage: 'url(/halaman3-3.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Scrollable content */}
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
            <div className="flex-1 h-px min-w-[40px]" style={{ backgroundColor: ACCENT, opacity: 0.7 }} />
          </div>
          <p className="font-great-vibes text-7xl sm:text-8xl -mt-1 text-center" style={{ color: ACCENT }}>
            Gift
          </p>
          <p
            className="font-cormorant text-sm sm:text-base leading-relaxed mt-4 text-center max-w-xs mx-auto"
            style={{ color: TEXT_CREAM }}
          >
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-3 max-w-[280px] mx-auto sm:max-w-xs">
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

          {/* QRIS — compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-xl shadow-lg p-4"
            style={{
              background: 'linear-gradient(135deg, #f9f6f0 0%, #efe8d8 100%)',
              border: '1px solid rgba(185,150,90,0.25)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-playfair text-xs font-semibold" style={{ color: '#3a3330' }}>
                QRIS
              </p>
              <p className="font-cormorant text-xs" style={{ color: '#6a5733' }}>
               
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-2 rounded-lg shadow inline-block">
                <Image
                  src={QRIS_IMAGE}
                  alt="QRIS code untuk transfer melalui dompet digital"
                  width={120}
                  height={120}
                  className="rounded"
                />
              </div>
            </div>
            <p className="font-cormorant text-xs text-center mt-2" style={{ color: '#6a5733' }}>
              Screenshot atau scan QR untuk transfer
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
