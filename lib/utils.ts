// Interfaces

export interface TimelineMilestone {
  year: string
  title: string
  description: string
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
  submittedAt: number
}

export interface RSVPFormState {
  status: 'idle' | 'success' | 'error'
  errors: {
    name?: string
    attendance?: string
    guestCount?: string
  }
}

export interface BankAccount {
  id: string
  bankName: string
  accountHolder: string
  accountNumber: string
}

export type CountdownResult =
  | { days: number; hours: number; minutes: number; seconds: number }
  | { expired: true }

// Constants

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

// Pure utility functions

/**
 * Formats a Date as an Indonesian-language date string.
 * Example: new Date('2025-10-11') → "Sabtu, 11 Oktober 2025"
 */
export function formatWeddingDate(date: Date): string {
  const dayName = DAY_NAMES[date.getDay()]
  const day = String(date.getDate()).padStart(2, '0')
  const monthName = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  return `${dayName}, ${day} ${monthName} ${year}`
}

/**
 * Formats a Date as a zero-padded 24-hour time string.
 * Example: new Date('2025-10-11T09:05:00') → "09:05"
 */
export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * Calculates the countdown from now to a target date.
 * Returns { expired: true } if now >= target.
 * Otherwise returns { days, hours, minutes, seconds } all as non-negative integers.
 */
export function calculateCountdown(target: Date, now: Date): CountdownResult {
  const diffMs = target.getTime() - now.getTime()

  if (diffMs <= 0) {
    return { expired: true }
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const days = Math.floor(totalHours / 24)

  return { days, hours, minutes, seconds }
}

/**
 * Sorts an array of TimelineMilestone objects by year ascending.
 * Returns a new array (non-mutating).
 */
export function sortMilestones(milestones: TimelineMilestone[]): TimelineMilestone[] {
  return [...milestones].sort((a, b) => {
    if (a.year < b.year) return -1
    if (a.year > b.year) return 1
    return 0
  })
}

/**
 * Sorts an array of Wish objects by submittedAt descending (newest first).
 * Returns a new array (non-mutating).
 */
export function sortWishesNewestFirst(wishes: Wish[]): Wish[] {
  return [...wishes].sort((a, b) => b.submittedAt - a.submittedAt)
}

/**
 * Prepends a new wish to the front of the list.
 * Returns a new array (non-mutating).
 */
export function addWish(list: Wish[], wish: Wish): Wish[] {
  return [wish, ...list]
}

/**
 * Validates a name field: returns true iff name.trim().length > 0.
 */
export function validateName(name: string): boolean {
  return name.trim().length > 0
}

/**
 * Validates a guest count: returns true iff n is an integer in [1, 5].
 */
export function validateGuestCount(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= 5
}
