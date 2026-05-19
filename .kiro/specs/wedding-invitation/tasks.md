# Implementation Plan: Wedding Invitation Website

## Overview

Build a premium, single-page digital wedding invitation using Next.js 16 App Router, React 19, Tailwind CSS v4, and Framer Motion. The site is fully static (no backend), composed of Server and Client Components, and deployable to Vercel without additional server configuration. Implementation follows a strict bottom-up dependency order: shared data and utilities first, then leaf components, then section wrappers, and finally page composition.

---

## Tasks

- [x] 1. Install dependencies and configure testing framework
  - [x] 1.1 Install Framer Motion and testing dependencies
    - Run `npm install framer-motion` to add the animation library
    - Run `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths @vitest/ui fast-check` to add the full testing stack
    - Verify `framer-motion` and all test packages appear in `package.json`
    - _Requirements: 11.5, 12.1_

  - [x] 1.2 Create `vitest.config.mts` and wire test script
    - Create `vitest.config.mts` at project root with `jsdom` environment, `react` plugin, and `tsconfigPaths` plugin as shown in `node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`
    - Add `"test": "vitest --run"` script to `package.json`
    - _Requirements: 12.1_

- [x] 2. Shared data, types, and utility functions
  - [x] 2.1 Create `lib/wedding-data.ts` with all static content
    - Export `WEDDING_CONFIG` object: groom/bride names, `weddingDate: new Date('2025-10-11T09:00:00+07:00')`, venue objects for `akad` and `reception` (name, address, time, date string, mapsUrl), `heroPhoto`, `openingPhoto`, `music` path
    - Export `TIMELINE_MILESTONES: TimelineMilestone[]` array with at least 5 milestones (year, title ≤60 chars, description ≤200 chars)
    - Export `GALLERY_PHOTOS: GalleryPhoto[]` array referencing existing `/public/*.webp` files with `src`, `alt`, `width`, `height`
    - Export `BANK_ACCOUNTS: BankAccount[]` with at least 2 entries
    - Export `QRIS_IMAGE` path constant
    - Export `INITIAL_WISHES: Wish[]` pre-populated with at least 5 sample wishes (use `crypto.randomUUID()` compatible static IDs)
    - _Requirements: 1.3–1.4, 2.3, 3.1, 4.1, 5.1, 6.1–6.3, 8.4, 9.1, 9.4_

  - [x] 2.2 Create `lib/utils.ts` with all pure utility functions
    - `formatWeddingDate(date: Date): string` — returns `"[DayName], DD [MonthName] YYYY"` using Indonesian day/month names (e.g. "Sabtu, 11 Oktober 2025")
    - `formatTime(date: Date): string` — returns `"HH:MM"` in 24-hour format
    - `calculateCountdown(target: Date, now: Date): CountdownResult` where `CountdownResult = { days: number; hours: number; minutes: number; seconds: number } | { expired: true }`
    - `sortMilestones(milestones: TimelineMilestone[]): TimelineMilestone[]` — returns array sorted by year ascending
    - `sortWishesNewestFirst(wishes: Wish[]): Wish[]` — returns array sorted by `submittedAt` descending
    - `addWish(list: Wish[], wish: Wish): Wish[]` — returns new array with `wish` prepended
    - `validateName(name: string): boolean` — returns `true` iff `name.trim().length > 0`
    - `validateGuestCount(n: number): boolean` — returns `true` iff `n >= 1 && n <= 5`
    - Export all TypeScript interfaces: `TimelineMilestone`, `GalleryPhoto`, `Wish`, `RSVPFormState`, `BankAccount`, `CountdownResult`
    - _Requirements: 1.4, 3.1–3.3, 4.1, 7.1, 7.3, 8.3, 8.5_

  - [ ]* 2.3 Write property-based tests for `lib/utils.ts`
    - **Property 1: Wedding Date Format** — `fc.date({ min, max })` → `formatWeddingDate` result matches `/^[A-Za-z]+, \d{2} [A-Za-z]+ \d{4}$/` and contains correct day/month name
    - **Property 2: Countdown Calculation Correctness** — for any future `targetDate`, `calculateCountdown` returns non-negative integers with `hours < 24`, `minutes < 60`, `seconds < 60`
    - **Property 3: Countdown Expired State** — for any `now >= targetDate`, `calculateCountdown` returns `{ expired: true }`
    - **Property 4: Timeline Chronological Order** — for any array of milestones, `sortMilestones` returns them in non-decreasing year order
    - **Property 7: RSVP Name Validation** — `validateName` accepts any string with `trim().length > 0` and rejects pure-whitespace strings
    - **Property 8: RSVP Guest Count Validation** — `validateGuestCount` accepts integers 1–5 and rejects all others
    - **Property 10: Wishes List Order** — `sortWishesNewestFirst` returns wishes in descending `submittedAt` order
    - **Property 11: New Wish Prepend** — `addWish(list, wish)` returns array where `result[0] === wish` and `result.length === list.length + 1`
    - Tag each test with `// Feature: wedding-invitation, Property N: ...` comment; use `numRuns: 100` explicitly
    - _Requirements: 1.4, 3.1–3.3, 4.1, 7.1, 7.3, 8.3, 8.5_

- [x] 3. Global styles and root layout
  - [x] 3.1 Update `app/globals.css` with Tailwind v4 `@theme` design tokens
    - Replace existing content: keep `@import "tailwindcss"`, then add `@theme` block defining `--color-cream: #F5F0E8`, `--color-beige: #EDE0CC`, `--color-gold: #C9A84C`, `--color-gold-light: #D4AF37`, `--color-dark-overlay: rgba(0,0,0,0.5)`, `--font-cormorant: var(--font-cormorant-garamond)`, `--font-playfair: var(--font-playfair-display)`, `--font-great-vibes: var(--font-great-vibes)`
    - Add `html { scroll-behavior: smooth; }` at top level
    - _Requirements: 11.1–11.3_

  - [x] 3.2 Update `app/layout.tsx` with wedding fonts and metadata
    - Replace `Geist`/`Geist_Mono` imports with `Cormorant_Garamond`, `Playfair_Display`, `Great_Vibes` from `next/font/google`
    - Configure each with `subsets: ['latin']` and a unique `variable` name matching the CSS tokens in globals.css
    - `Cormorant_Garamond`: weights `['300','400','500','600','700']`, styles `['normal','italic']`
    - `Great_Vibes`: weight `'400'`
    - Apply all three `variable` class names to `<html>` element
    - Update `metadata`: `title` and `description` for the wedding, add `viewport` metadata with `width=device-width, initial-scale=1`
    - _Requirements: 11.2, 11.8, 12.5_

- [x] 4. Music Player component
  - [x] 4.1 Implement `components/music/MusicPlayer.tsx`
    - `'use client'` — accepts `{ src: string; autoplay: boolean }` props
    - `useRef<HTMLAudioElement>` for imperative audio control
    - `useEffect` watching `autoplay`: when `true`, call `audioRef.current?.play()` and catch `NotAllowedError` silently
    - `hasError` state: set on `<audio>` `error` event; hides the toggle button when true
    - `isMuted` state: toggles `audioRef.current.muted`; renders mute/unmute icon button
    - Fixed-position button: `position: fixed; bottom: 1rem; right: 1rem; z-index: 50`; touch target ≥ 44×44px
    - Conditionally render `{!hasError && <button>...}` — no error UI shown to guest
    - _Requirements: 1.7–1.10, 11.9_

- [x] 5. Opening Screen component
  - [x] 5.1 Implement `components/opening/OpeningScreen.tsx`
    - `'use client'` — accepts `{ children: React.ReactNode }` props; internally renders `MusicPlayer`
    - `isOpen: boolean` state initialized to `false`
    - `imageError: boolean` state; set via `onError` on the background `next/image`; falls back to `backgroundColor: #F5F0E8` inline style on wrapper div
    - While `!isOpen`: render fullscreen overlay (`position: fixed; inset: 0; z-index: 50`) with `next/image fill priority` background and 50% dark overlay div
    - Render couple names in Great Vibes font with gold color using `motion.div` `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}` over 1200ms
    - Render wedding date using `formatWeddingDate` from `lib/utils.ts` in Cormorant Garamond
    - Render "Open Invitation" button with gold border and `bg-gold/20` background
    - On button click: `setIsOpen(true)`, set `autoplay` state to `true` (passed to `MusicPlayer`)
    - Use `AnimatePresence` to exit-animate the overlay: `exit={{ opacity: 0, transition: { duration: 0.8 } }}`
    - When `isOpen`: render `children` (the server-rendered invitation content)
    - _Requirements: 1.1–1.11_

- [ ] 6. Hero section components
  - [x] 6.1 Implement `components/hero/HeroContent.tsx`
    - `'use client'` — no props; data read directly from `WEDDING_CONFIG`
    - `useScroll` + `useTransform` from `framer-motion`: map `scrollY` `[0, 600]` → `y` `[0, 180]` for parallax
    - Background image wrapper: `overflow-hidden`, inner `motion.div` with `style={{ y }}`, contains `next/image fill priority` with dark overlay div at 50% opacity
    - Groom and bride names in Playfair Display: `motion.h1`/`motion.h2` with `initial={{ opacity:0, y:40 }}`, `whileInView={{ opacity:1, y:0 }}`, staggered `transition.delay` (0s and 0.3s respectively), duration 1000ms
    - Decorative gold ornamental divider `<hr>` or `<div>` between names and quote
    - Romantic quote in Cormorant Garamond italic centered beneath divider
    - _Requirements: 2.1–2.6, 11.5, 12.7_

  - [x] 6.2 Implement `components/hero/HeroSection.tsx`
    - Server Component (no directive) — renders `<section>` wrapper at 100vw/100vh with `HeroContent` inside
    - _Requirements: 2.1–2.2, 12.1_

- [x] 7. Countdown Timer components
  - [x] 7.1 Implement `components/countdown/CountdownTimer.tsx`
    - `'use client'` — accepts `{ targetDate: Date }` prop
    - `useEffect` with `setInterval(1000)`: calls `calculateCountdown(targetDate, new Date())` each tick; clears interval on cleanup
    - When `expired: true`, renders centered "wedding day has arrived" message
    - Otherwise renders 4 unit cards (Days, Hours, Minutes, Seconds) with glassmorphism styling: `backdrop-blur`, semi-transparent cream/white background, rounded, border
    - Use Framer Motion staggered container/item variants (`staggerChildren: 0.15`) with `whileInView` so cards animate in sequentially on viewport entry
    - Each card: numeric value in Playfair Display, label in Cormorant Garamond
    - _Requirements: 3.1–3.5, 11.4_

  - [x] 7.2 Implement `components/countdown/CountdownSection.tsx`
    - Server Component — renders `<section>` wrapper with section heading and `<CountdownTimer targetDate={WEDDING_CONFIG.weddingDate} />`
    - _Requirements: 3.1, 12.1_

- [x] 8. Love Story Timeline components
  - [x] 8.1 Implement `components/timeline/TimelineItem.tsx`
    - `'use client'` — accepts `{ year: string; title: string; description: string; side: 'left' | 'right'; index: number }` props
    - `whileInView={{ opacity:1, y:0 }}` with `initial={{ opacity:0, y:40 }}`, `viewport={{ once:true, margin:'-100px' }}`, `transition={{ duration:0.6 }}`
    - On `md:` breakpoint and above: render in alternating left/right layout using absolute positioning on the timeline; on mobile: single centered column
    - Year label in gold accent, title in Playfair Display, description in Cormorant Garamond
    - _Requirements: 4.2–4.5_

  - [x] 8.2 Implement `components/timeline/TimelineSection.tsx`
    - Server Component — renders `<section>` wrapper with section heading, vertical gold connecting line via absolute-positioned div, and maps `sortMilestones(TIMELINE_MILESTONES)` to `<TimelineItem>` components with alternating `side` prop
    - _Requirements: 4.1, 4.4–4.6, 12.1_

- [x] 9. Gallery section components
  - [x] 9.1 Implement `components/gallery/Lightbox.tsx`
    - `'use client'` — accepts `{ photos: GalleryPhoto[]; currentIndex: number | null; onClose: () => void; onPrev: () => void; onNext: () => void }` props
    - `useEffect`: attach `keydown` listener for `Escape` → `onClose()`; return cleanup to remove listener
    - Rendered inside `AnimatePresence`; when `currentIndex !== null`, show fullscreen overlay (`position: fixed; inset: 0; z-index: 100`)
    - `motion.div` for overlay: `initial={{ opacity:0 }}` → `animate={{ opacity:1 }}` → `exit={{ opacity:0, duration:0.3 }}`
    - Displays `photos[currentIndex]` via `next/image` centered, with previous/next arrow buttons and close `×` button
    - Previous button: `disabled={currentIndex === 0}`; next button: `disabled={currentIndex === photos.length - 1}`
    - _Requirements: 5.3–5.6_

  - [ ]* 9.2 Write property-based tests for `Lightbox` boundary conditions
    - **Property 5: Lightbox Photo Selection** — for any photo array length `n ≥ 1` and valid index `i`, rendered lightbox shows `photos[i]`
    - **Property 6: Lightbox Navigation Boundary Conditions** — for any `n` and `i`: prev disabled iff `i === 0`; next disabled iff `i === n-1`; both enabled otherwise
    - Use `@testing-library/react` + `fast-check` to generate random arrays and indices
    - _Requirements: 5.3–5.4_

  - [x] 9.3 Implement `components/gallery/GalleryGrid.tsx`
    - `'use client'` — accepts `{ photos: GalleryPhoto[] }` prop; owns `lightboxIndex: number | null` state
    - Responsive CSS grid: 1 col below `sm`, 2 cols `sm`–`lg`, 3 cols `lg`+; consistent aspect ratio via `aspect-square` or `aspect-[4/3]`
    - Each photo: `motion.div` with `whileHover={{ scale:1.05, brightness:1.2 }}` transition 300ms; click calls `setLightboxIndex(i)`
    - Staggered entrance animation: `whileInView` container with `staggerChildren: 0.1`, item `initial={{ opacity:0, scale:0.9 }}` → `show={{ opacity:1, scale:1 }}` duration 400ms
    - All images use `next/image` with `alt` text from `photo.alt`; decorative overlay uses `alt=""`
    - Renders `<Lightbox>` with current state and handlers (`onClose`, `onPrev`, `onNext`)
    - _Requirements: 5.1–5.3, 5.7, 11.5, 12.3, 12.7_

  - [x] 9.4 Implement `components/gallery/GallerySection.tsx`
    - Server Component — renders `<section>` wrapper with section heading and `<GalleryGrid photos={GALLERY_PHOTOS} />`
    - _Requirements: 5.1, 12.1_

- [x] 10. Events section components
  - [x] 10.1 Implement `components/events/EventCard.tsx`
    - `'use client'` — accepts `{ ceremonyName: string; date: string; time: string; venueName: string; address: string; mapsUrl: string }` props
    - `motion.div` with `whileInView={{ opacity:1, y:0 }}` fade-up entrance; stagger delay via `transition.delay` based on card order (pass as prop or use parent variants)
    - Displays ceremony name in Playfair Display, date and time in Cormorant Garamond, venue name and full address
    - "Open in Google Maps" button: `<a href={mapsUrl} target="_blank" rel="noopener noreferrer">`; touch target ≥ 44×44px
    - Gold decorative divider line below ceremony name
    - _Requirements: 6.1–6.6_

  - [x] 10.2 Implement `components/events/EventSection.tsx`
    - Server Component — renders `<section>` with section heading, gold ornamental divider, and two `<EventCard>` components for `akad` and `reception` from `WEDDING_CONFIG`
    - _Requirements: 6.1–6.6, 12.1_

- [x] 11. RSVP Form, Wishes List, and bridge section
  - [x] 11.1 Implement `components/rsvp/WishesList.tsx`
    - `'use client'` — accepts `{ wishes: Wish[] }` prop (parent passes newest-first sorted array)
    - Renders wish cards in a scrollable container: max-height equivalent to ~4 cards, `overflow-y: auto`
    - Each card: glassmorphism styling (matching Countdown cards), displays `wish.name` in Playfair Display, `wish.message` with word-wrap, `wish.attendance` status label in gold badge
    - _Requirements: 8.1–8.2, 8.6_

  - [x] 11.2 Implement `components/rsvp/RSVPForm.tsx`
    - `'use client'` — accepts `{ onSubmit: (wish: Wish) => void }` prop
    - Uses `useActionState` from React for form state and inline validation errors
    - Fields: required text input for full name (label visible), required select for attendance (`"Hadir"` / `"Tidak Hadir"`), required number input for guest count (min 1, max 5, integers only), optional textarea for message
    - Client-side validation using `validateName` and `validateGuestCount` from `lib/utils.ts`; inline error messages rendered adjacent to each invalid field via `aria-live` region
    - On valid submission: generate `id: crypto.randomUUID()`, `submittedAt: Date.now()`, call `onSubmit(wish)`, show success confirmation message
    - Styled with cream and gold palette per design tokens
    - _Requirements: 7.1–7.7_

  - [x] 11.3 Implement `components/rsvp/RSVPAndWishesSection.tsx`
    - `'use client'` — owns `wishes: Wish[]` state initialized from `INITIAL_WISHES`
    - `handleWishAdded(wish: Wish)`: calls `addWish` + `sortWishesNewestFirst` from utils, sets state
    - Renders `<RSVPForm onSubmit={handleWishAdded} />` and `<WishesList wishes={wishes} />` side-by-side on desktop, stacked on mobile
    - _Requirements: 8.3–8.5, 12.1_

  - [ ]* 11.4 Write property-based test for wish render completeness
    - **Property 9: Wish Render Completeness** — for any `Wish` object, the rendered `WishesList` card SHALL contain `name`, `message`, and `attendance` as visible text
    - Use `@testing-library/react` + `fast-check` arbitrary `Wish` generator
    - _Requirements: 8.2_

- [x] 12. Gift section components
  - [x] 12.1 Implement `components/gift/GiftCard.tsx`
    - `'use client'` — accepts `{ bankName: string; accountHolder: string; accountNumber: string; id: string }` props
    - `copiedId` and `errorId` state for notifications
    - Copy button: `navigator.clipboard.writeText(accountNumber)` → set `copiedId`, clear after 2000ms via `setTimeout`
    - On clipboard failure: set `errorId`, clear after 3000ms; shows manual copy prompt
    - "Copied!" success notification disappears after 2000ms
    - Renders bank name, account holder name, account number
    - _Requirements: 9.1–9.3, 9.6_

  - [x] 12.2 Implement `components/gift/GiftSection.tsx`
    - Server Component — renders `<section>` with section heading, gratitude message, maps `BANK_ACCOUNTS` to `<GiftCard>` components, renders QRIS image via `next/image` at minimum 200×200px with descriptive `alt` text
    - _Requirements: 9.1, 9.4–9.5, 12.1, 12.3_

- [x] 13. Footer section components
  - [x] 13.1 Implement `components/footer/FooterContent.tsx`
    - `'use client'` — no props; data read from `WEDDING_CONFIG`
    - `motion.div` with `whileInView={{ opacity:1, y:0 }}` `initial={{ opacity:0, y:40 }}` duration 700ms
    - Thank-you message from the couple in Cormorant Garamond
    - Couple names in Great Vibes script font as closing signature
    - Decorative floral/ornamental element in gold and cream (CSS or SVG)
    - Wedding year and closing tagline (≤60 chars) in Cormorant Garamond
    - _Requirements: 10.1–10.5_

  - [x] 13.2 Implement `components/footer/FooterSection.tsx`
    - Server Component — renders `<footer>` wrapper with cream/beige background and `<FooterContent />`
    - _Requirements: 10.1–10.5, 12.1_

- [x] 14. Page composition
  - [x] 14.1 Compose `app/page.tsx` with all sections
    - Server Component — imports `OpeningScreen` and all section SC wrappers
    - Follows the children-slot pattern: `<OpeningScreen>` receives all sections as `children`
    - Order: `HeroSection`, `CountdownSection`, `TimelineSection`, `GallerySection`, `EventSection`, `RSVPAndWishesSection`, `GiftSection`, `FooterSection`
    - `MusicPlayer` rendered inside `OpeningScreen` (handled internally by the component)
    - Remove the default Next.js placeholder content
    - _Requirements: 1.1, 2.1, 12.1_

- [x] 15. Final polish and Vercel deployment readiness
  - [x] 15.1 Accessibility and image audit
    - Audit every `next/image` usage: all content images have descriptive `alt` text; all purely decorative images have `alt=""`
    - Verify `priority` prop is set on Opening Screen and Hero Section background images
    - Check all interactive elements (buttons, links, form controls) have ≥ 44×44px touch targets on mobile
    - _Requirements: 12.3–12.4, 12.7_

  - [x] 15.2 Verify `'use client'` boundaries and Server Component correctness
    - Confirm only components with state, event handlers, browser APIs, or Framer Motion animations are marked `'use client'`
    - Confirm all SC wrappers have no directive
    - _Requirements: 12.1–12.2_

  - [x] 15.3 Production build verification
    - Run `npm run build` and confirm it exits with no errors and no TypeScript type errors
    - Fix any type errors or build warnings surfaced by the build
    - _Requirements: 12.6_

  - [x] 15.4 Add `vercel.json` and ensure static export compatibility
    - Confirm `next.config.ts` does not use features incompatible with Vercel's build environment (no custom server, no non-standard output mode)
    - Add `vercel.json` only if needed for headers/rewrites; otherwise leave absent for zero-config deploy
    - _Requirements: 12.6_

- [x] 16. Final checkpoint — Ensure all tests pass
  - Run `npm run test` and confirm all property-based and unit tests pass
  - Run `npm run build` once more to confirm clean production build
  - Ensure all tests pass; ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for an MVP build
- All Framer Motion animations must be in Client Components (`'use client'`); Server Components cannot use Framer Motion
- The design uses Tailwind CSS v4 with `@import "tailwindcss"` and `@theme {}` tokens — no `tailwind.config.js` is needed or desired
- `useActionState` is imported from `'react'` (React 19), not from `'react-dom'`
- The `RSVPForm` uses purely client-side validation with no Server Action, keeping the site fully static
- Property tests use `fast-check` with `numRuns: 100`; each tagged with `// Feature: wedding-invitation, Property N: ...`
- The `vitest --run` flag (single execution, no watch mode) is used in the test script
- Audio file `public/audio/background.mp3` must be added manually by the developer before the Music Player can function

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "2.2", "3.1", "3.2"] },
    { "id": 2, "tasks": ["2.3", "4.1"] },
    { "id": 3, "tasks": ["5.1"] },
    { "id": 4, "tasks": ["6.1", "7.1", "8.1", "9.1", "10.1", "11.1", "11.2", "12.1", "13.1"] },
    { "id": 5, "tasks": ["6.2", "7.2", "8.2", "9.2", "9.3", "10.2", "11.3", "11.4", "12.2", "13.2"] },
    { "id": 6, "tasks": ["9.4", "14.1"] },
    { "id": 7, "tasks": ["15.1", "15.2", "15.3", "15.4"] }
  ]
}
```
