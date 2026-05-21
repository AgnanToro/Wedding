// TypeScript interfaces

export interface TimelineMilestone {
  year: string
  title: string       // ≤ 60 characters
  description: string // ≤ 200 characters
}

export interface GalleryPhoto {
  src: string
  alt: string
  width: number
  height: number
}

export interface Wish {
  id: string
  name: string
  message: string
  attendance: 'Hadir' | 'Tidak Hadir'
  submittedAt: number // Date.now() timestamp
}

export interface BankAccount {
  id: string
  bankName: string
  accountHolder: string
  accountNumber: string
}

// Wedding configuration

export const WEDDING_CONFIG = {
  groomName: 'Azis',
  brideName: 'Laeli',
  weddingDate: new Date('2026-05-26T00:00:00+07:00'),
  venue: {
    akad: {
      name: 'Kediaman Mempelai Wanita',
      address: 'Blok Karang Anyar Desa Sumber Lor Kec. Babakan Kab.Cirebon',
      time: '09:00',
      date: 'Selasa, 26 Mei 2026',
      mapsUrl: 'https://www.google.com/maps?q=-6.8754898,108.7331113',
    },
    reception: {
      name: 'Kediaman Mempelai Wanita',
      address: 'Blok Karang Anyar Desa Sumber Lor Kec. Babakan Kab.Cirebon',
      time: '10:00',
      date: 'Selasa, 26 Mei 2026',
      mapsUrl: 'https://www.google.com/maps?q=-6.8754898,108.7331113',
    },
  },
  heroPhoto: '/couple-header.webp',
  openingPhoto: '/couple-header.webp',
  openingPhotos: ['/couple-header.webp', '/couple-header2.webp'],
  music: '/music.mp3',
}

// Timeline milestones

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2019',
    title: 'Pertemuan Pertama',
    description:
      'Takdir mempertemukan kami di sebuah seminar di kampus, dan sejak saat itu dunia terasa berbeda.',
  },
  {
    year: '2020',
    title: 'Mulai Saling Mengenal',
    description:
      'Dari obrolan panjang di warung kopi hingga pesan singkat tengah malam, kami mulai memahami satu sama lain.',
  },
  {
    year: '2021',
    title: 'Resmi Berpacaran',
    description:
      'Di bawah langit senja Pantai Anyer, Ahmad mengungkapkan perasaannya dan Siti menjawab dengan senyuman.',
  },
  {
    year: '2023',
    title: 'Lamaran',
    description:
      'Dikelilingi oleh keluarga tercinta, Ahmad berlutut dan Siti berkata iya dengan air mata kebahagiaan.',
  },
  {
    year: '2025',
    title: 'Menuju Pernikahan',
    description:
      'Setelah perjalanan panjang yang indah, kami siap melangkah ke babak baru kehidupan bersama.',
  },
]

// Gallery photos — menggunakan foto yang tersedia di /public

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: '/h11.webp', alt: 'Foto pre-wedding pasangan di studio dengan backdrop biru', width: 800, height: 600 },
    { src: '/halaman3-4.webp', alt: 'Foto pasangan pre-wedding outdoor', width: 800, height: 1067 },
  { src: '/10R.webp', alt: 'Foto pre-wedding studio dengan gaun pengantin', width: 800, height: 600 },
  { src: '/halaman2-1.webp', alt: 'Foto mempelai pria Abdul Azis', width: 800, height: 1067 },
  { src: '/UJ1_4822.webp', alt: 'Foto mempelai wanita Nurfi Laeli', width: 800, height: 1067 },
  { src: '/4R (1).webp', alt: 'Foto pasangan bersama', width: 800, height: 600 },
  //slide kanan 

   { src: '/5R.webp', alt: 'Foto pre-wedding pasangan berpose elegan', width: 800, height: 600 },
  { src: '/UJ1_4843.webp', alt: 'Foto akad nikah pasangan', width: 800, height: 600 },
  { src: '/4R (3).webp', alt: 'Foto akad nikah bersama keluarga', width: 800, height: 600 },
  { src: '/10R (1).webp', alt: 'Foto resepsi pernikahan', width: 800, height: 600 },
  { src: '/halaman2-2.webp', alt: 'Foto resepsi pasangan bersama tamu', width: 800, height: 600 },
]

// Bank accounts for gifts

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: '1',
    bankName: 'Bank Negara Indonesia',
    accountHolder: 'Abdul Azis',
    accountNumber: '2037420394',
  },
  {
    id: '2',
    bankName: 'Bank Mandiri',
    accountHolder: 'Nurfi Laeli',
    accountNumber: '1340017203869',
  },
]

// QRIS image path
export const QRIS_IMAGE: string = '/qris.webp'

// Initial wishes — kosong, akan diisi oleh tamu yang submit form
export const INITIAL_WISHES: Wish[] = []
