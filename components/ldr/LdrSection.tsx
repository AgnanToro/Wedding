'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTION_BG = '#d9c08f'
const ACCENT = '#b9965a'
const TEXT_PRIMARY = '#4b3a1f'
const TEXT_MUTED = '#6a5733'

// SVG icon components
const IconPerson = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)
const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
  </svg>
)
const IconSpark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
)
const IconClipboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
  </svg>
)
const IconHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
)

const tips = [
  {
    title: 'Perkenalan',
    Icon: IconPerson,
    content: 'Perkenalkan kita ini pasangan LDR yang sebentar lagi akan menuju tujuan yang telah kita usahakan selama 5 tahun lamanya.',
  },
  {
    title: 'Komunikasi yang Tenang',
    Icon: IconChat,
    content: 'Komunikasi yang baik itu ngga harus ngobrol lama setiap hari, tapi yang jelas bikin tenang dan ngga bikin salah faham. Sesimpel ngabarin lagi dimana, atau hari ini capek tidak. Bukannya untuk mengontrol, tapi supaya pasangan merasa dilibatkan dan dihargai.',
  },
  {
    title: 'Obrolan Random & Jujur',
    Icon: IconSpark,
    content: 'Kita sering ngobrolin hal random, dari pertanyaan nyeleneh sampai pertanyaan krusial. Karena setiap orang punya ketakutan, kita belajar pelan-pelan berani membicarakan semuanya.',
  },
  {
    title: 'SOP Marah Versi Kita',
    Icon: IconClipboard,
    content: 'Dari awal kita bikin SOP marah versi sendiri. Kalau lagi marah harus bagaimana, kalau butuh waktu sendiri harus ngomong, kalau sudah tenang baru ngobrol lagi. Supaya masalah diselesaikan sesuai kesepakatan, bukan dengan emosi.',
  },
  {
    title: 'Teman Cerita Seumur Hidup',
    Icon: IconHeart,
    content: 'Salah satu kunci hubungan itu membuat pasangan selalu merasa punya teman cerita, dari topik ringan sampai yang paling berat. Tujuan kita bukan ngobrol untuk hari ini, tapi ngobrol seumur hidup.',
  },
]

const closingQuote = 'Komunikasi yang baik bukan tentang selalu ada bahan obrolan, tetapi selalu ada kemauan untuk tetap saling mendengarkan satu sama lain.'

export default function LdrSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="ldr" className="relative px-6 pt-12 pb-14 sm:px-10" style={{ backgroundColor: SECTION_BG }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold leading-none" style={{ color: TEXT_PRIMARY }}>
            LDR Goals
          </h2>
          <div className="flex-1 h-px min-w-[32px]" style={{ backgroundColor: TEXT_MUTED, opacity: 0.4 }} />
        </div>
        <p className="font-great-vibes text-3xl sm:text-4xl mt-1 ml-2" style={{ color: ACCENT }}>
          5.350km
        </p>
      </motion.div>

      {/* Accordion */}
      <div className="space-y-3">
        {tips.map(({ title, Icon, content }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl overflow-hidden shadow-md"
            style={{ backgroundColor: '#fff' }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              style={{ minHeight: '56px' }}
            >
              <span className="flex items-center gap-3" style={{ color: ACCENT }}>
                <Icon />
                <span className="font-playfair text-base sm:text-lg font-semibold" style={{ color: TEXT_PRIMARY }}>
                  {title}
                </span>
              </span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 ml-2"
                style={{ color: ACCENT }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="font-cormorant text-base sm:text-lg leading-relaxed px-5 pb-5" style={{ color: TEXT_MUTED }}>
                    {content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Closing quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-8 px-6 py-6 rounded-2xl text-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.35)', border: `1px solid ${ACCENT}50` }}
      >
        <p className="font-cormorant text-base sm:text-lg leading-relaxed italic" style={{ color: TEXT_PRIMARY }}>
          &ldquo;{closingQuote}&rdquo;
        </p>
      </motion.div>
    </section>
  )
}
