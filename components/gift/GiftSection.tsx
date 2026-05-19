import Image from 'next/image'
import { BANK_ACCOUNTS, QRIS_IMAGE } from '@/lib/wedding-data'
import GiftCard from './GiftCard'

export default function GiftSection() {
  return (
    <section
      id="gift"
      className="relative py-24 px-6 bg-gradient-to-b from-stone-900 to-stone-800"
    >
      {/* Section heading */}
      <div className="text-center mb-16">
        <p className="font-cormorant text-gold text-base uppercase tracking-[0.3em] mb-3">
          Hadiah Pernikahan
        </p>
        <h2 className="font-playfair text-white text-3xl md:text-4xl font-semibold">
          Kiriman Kasih
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-4" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Gratitude message */}
        <p className="font-cormorant text-cream/80 text-lg text-center italic mb-12 leading-relaxed">
          Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika Anda ingin memberikan hadiah, berikut informasi untuk pengiriman.
        </p>

        {/* Bank account cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {BANK_ACCOUNTS.map((account) => (
            <GiftCard
              key={account.id}
              id={account.id}
              bankName={account.bankName}
              accountHolder={account.accountHolder}
              accountNumber={account.accountNumber}
            />
          ))}
        </div>

        {/* QRIS section */}
        <div className="text-center">
          <p className="font-playfair text-gold text-xl mb-6">Transfer via QRIS</p>
          <div className="inline-block bg-white p-4 rounded-xl shadow-lg">
            <Image
              src={QRIS_IMAGE}
              alt="QRIS code untuk transfer melalui GoPay, OVO, atau dompet digital lainnya"
              width={220}
              height={220}
              className="rounded-lg"
            />
          </div>
          <p className="font-cormorant text-cream/60 text-sm mt-3">
            Screenshot dan scan untuk transfer via GoPay, OVO, atau dompet digital
          </p>
        </div>
      </div>
    </section>
  )
}
