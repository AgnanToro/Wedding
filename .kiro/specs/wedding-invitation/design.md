# Design Document

## Feature: Wedding Invitation Website

---

## Overview

A premium, single-page digital wedding invitation built on Next.js 16 App Router with React 19 and Tailwind CSS v4. The site is a scrollable invitation that begins with a fullscreen opening screen, then reveals the main content — hero, countdown, love story, gallery, event details, RSVP, wishes, gift, and footer — all animated via Framer Motion.

The application is purely presentational with no database. State (RSVP submissions, wish entries, music playback) is managed in-memory in Client Components using React state. This avoids any backend infrastructure while satisfying all Requirement 7 and 8 acceptance criteria.

**Key design decisions:**

- **No external backend.** RSVP/wishes are stored in React state (in-memory) for this v1. This keeps the site fully static and deployable to Vercel without server configuration.
- **Framer Motion over CSS animations.** All entrance, hover, and transition animations are driven by Framer Motion to satisfy Requirement 11.5 and maintain a single animation API.
- **Tailwind CSS v4 via `@import "tailwindcss"`.** No `tailwind.config.js`. All custom design tokens (colors, fonts) are declared in `globals.css` using `@theme {}`.
- **`next/font/google` in root layout only.** Font CSS variables are declared once and consumed throughout via Tailwind CSS v4 custom properties.
- **Server Components for static sections.** Only components with state, event handlers, browser APIs, or Framer Motion animations are marked `'use client'`.

---

## Architecture

### Rendering Model

The app follows a clear split between Server Components (SC) and Client Components (CC):

```
app/
  layout.tsx         (SC) — fonts, metadata, global CSS
  page.tsx           (SC) — assembles all sections in order
  components/
    opening/
      OpeningScreen.tsx    (CC) — state, animation, audio trigger
    hero/
      HeroSection.tsx      (SC) — static wrapper
      HeroContent.tsx      (CC) — Framer Motion entrance animation
    countdown/
      CountdownSection.tsx (SC) — static wrapper
      CountdownTimer.tsx   (CC) — setInterval, live state
    timeline/
      TimelineSection.tsx  (SC) — static wrapper
      TimelineItem.tsx     (CC) — viewport-triggered animation (useInView)
    gallery/
      GallerySection.tsx   (SC) — static wrapper
      GalleryGrid.tsx      (CC) — hover state, lightbox trigger
      Lightbox.tsx         (CC) — fullscreen overlay, keyboard listener
    events/
      EventSection.tsx     (SC) — static wrapper
      EventCard.tsx        (CC) — Framer Motion entrance animation
    rsvp/
      RSVPSection.tsx      (SC) — static wrapper
      RSVPForm.tsx         (CC) — form state, useActionState, validation
    wishes/
      WishesSection.tsx    (SC) — static wrapper
      WishesList.tsx       (CC) — list state, receives new wishes
    gift/
      GiftSection.tsx      (SC) — static wrapper
      GiftCard.tsx         (CC) — clipboard API, notification state
    footer/
      FooterSection.tsx    (SC) — static wrapper
      FooterContent.tsx    (CC) — Framer Motion entrance animation
    music/
      MusicPlayer.tsx      (CC) — Audio API, mute state, fixed position
```

### Page Composition Pattern

`app/page.tsx` (Server Component) owns the top-level composition. The Opening Screen wraps the rest of the page content and uses a `children` slot pattern so the static server-rendered content is passed through as props — consistent with the interleaving pattern described in the Next.js 16 Server/Client Component docs:

```tsx
// app/page.tsx (Server Component)
export default function Home() {
  return (
    <OpeningScreen>
      <main>
        <HeroSection />
        <CountdownSection />
        <TimelineSection />
        <GallerySection />
        <EventSection />
        <RSVPAndWishesSection />
        <GiftSection />
        <FooterSection />
      </main>
      <MusicPlayer />
    </OpeningScreen>
  )
}
```

The `OpeningScreen` Client Component holds a `isOpen: boolean` state. When `isOpen` is false, it renders the fullscreen overlay. When true, it renders `children` (the server-rendered content that was passed in).

### State Flow

```
OpeningScreen (CC)
  ├── isOpen state
  ├── On "Open Invitation" click → setIsOpen(true), trigger MusicPlayer
  └── MusicPlayer ref (via callback prop or context)

RSVPForm (CC)
  ├── form validation state (useActionState)
  └── onSubmit → calls onWishAdded(wish) prop

WishesList (CC)
  └── wishes state array, receives new wishes via prop update

RSVPAndWishesSection (CC — bridge)
  ├── wishes state (owns source of truth)
  ├── renders RSVPForm with onWishAdded callback
  └── renders WishesList with current wishes
```

The `RSVPAndWishesSection` is a Client Component that bridges the form and the wishes list, owning the shared `wishes` state. Both sub-components receive data/callbacks via props.

---

## Components and Interfaces

### OpeningScreen

```tsx
// 'use client'
interface OpeningScreenProps {
  children: React.ReactNode
  onOpen?: () => void  // notifies MusicPlayer to start
}
```

- Renders fullscreen overlay (`position: fixed, inset: 0, z-index: 50`) while `isOpen` is false
- Animates out with `motion.div` exit animation (opacity: 0, duration 0.8s)
- Uses `AnimatePresence` from Framer Motion to handle the unmount animation
- Background: `next/image` with `fill`, `priority`, `objectFit="cover"`, overlay `div` at 50% opacity
- Fallback background via `onError` on Image: sets inline style `backgroundColor: #F5F0E8`
- Music trigger: MusicPlayer is rendered inside OpeningScreen and receives an `autoplay` prop that becomes `true` after the button is clicked

### HeroContent

```tsx
// 'use client'
// No props — data is co-located as constants
```

- Uses `useScroll` + `useTransform` from Framer Motion for parallax on the background image
- The background image wrapper uses `motion.div` with `y` transform tied to scroll position
- Groom and bride names: `motion.h1`/`motion.h2` with `initial={{ opacity:0, y:40 }}`, `animate={{ opacity:1, y:0 }}`, `transition={{ delay: 0/0.3 }}`
- Uses `useInView` or `whileInView` for triggering the animation on scroll entry

### CountdownTimer

```tsx
// 'use client'
interface CountdownTimerProps {
  targetDate: Date
}
```

- `useEffect` with `setInterval(1000)` to calculate remaining time
- Calculates: `{ days, hours, minutes, seconds }` from `targetDate - Date.now()`
- When `Date.now() >= targetDate`, renders the "wedding day has arrived" message
- Uses `useInView` to trigger the staggered card entrance animations via `variants` and `staggerChildren` in Framer Motion

### TimelineItem

```tsx
// 'use client'
interface TimelineItemProps {
  year: string
  title: string
  description: string
  side: 'left' | 'right'
  index: number
}
```

- Uses `whileInView` with `once: true` for the fade-up slide animation
- On mobile (`side` is ignored), both sides render in centered column via CSS

### GalleryGrid

```tsx
// 'use client'
interface GalleryGridProps {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
}
interface GalleryPhoto {
  src: string
  alt: string
  width: number
  height: number
}
```

- Uses `whileInView` + `staggerChildren` for the scroll-in animation
- Each photo: `whileHover={{ scale: 1.05 }}` + brightness overlay via CSS

### Lightbox

```tsx
// 'use client'
interface LightboxProps {
  photos: GalleryPhoto[]
  currentIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}
```

- Rendered via `AnimatePresence` so it animates in/out
- `useEffect` adds/removes `keydown` listener for Escape key
- Previous button: `disabled={currentIndex === 0}`
- Next button: `disabled={currentIndex === photos.length - 1}`

### RSVPForm

```tsx
// 'use client'
interface RSVPFormProps {
  onSubmit: (wish: Wish) => void
}
```

- Uses React 19's `useActionState` for form state and validation errors
- Client-side validation (no server action needed — purely in-memory)
- Inline error messages rendered adjacent to each invalid field
- On success: renders confirmation message and calls `onSubmit(wish)`

### WishesList

```tsx
// 'use client'
interface WishesListProps {
  wishes: Wish[]
}
```

- Renders wishes in order (parent passes newest-first sorted array)
- Constrained height with `overflow-y: auto` for the scrollable list

### GiftCard

```tsx
// 'use client'
interface GiftCardProps {
  bankName: string
  accountHolder: string
  accountNumber: string
}
```

- `navigator.clipboard.writeText(accountNumber)` on copy button click
- `copiedId` state to track which card shows "Copied!" notification
- `setTimeout(2000)` to clear the notification
- Error handling: if clipboard write fails, shows manual copy prompt

### MusicPlayer

```tsx
// 'use client'
interface MusicPlayerProps {
  src: string
  autoplay: boolean  // becomes true after OpeningScreen button click
}
```

- `useRef<HTMLAudioElement>` to control playback imperatively
- `useEffect` watches `autoplay` prop: when true, calls `audioRef.current.play()` and catches autoplay rejection silently
- Renders fixed-position button (`position: fixed, bottom: 1rem, right: 1rem, z-index: 50`)
- Toggle between muted/unmuted icons
- If audio element `error` event fires, hides the toggle via `hasError` state

---

## Data Models

### WeddingConfig (co-located in `lib/wedding-data.ts`)

```ts
export const WEDDING_CONFIG = {
  groomName: 'Ahmad Rizki',
  brideName: 'Siti Nurhaliza',
  weddingDate: new Date('2025-10-11T09:00:00+07:00'),
  venue: {
    akad: {
      name: 'Masjid Al-Ikhlas',
      address: 'Jl. Sudirman No. 45, Jakarta Selatan, DKI Jakarta',
      time: '09:00',
      date: 'Sabtu, 11 Oktober 2025',
      mapsUrl: 'https://maps.google.com/?q=...',
    },
    reception: {
      name: 'Grand Ballroom Ritz-Carlton',
      address: 'Jl. M.H. Thamrin No. 1, Jakarta Pusat, DKI Jakarta',
      time: '11:00',
      date: 'Sabtu, 11 Oktober 2025',
      mapsUrl: 'https://maps.google.com/?q=...',
    },
  },
  heroPhoto: '/UJ1_4628.webp',
  openingPhoto: '/UJ1_4660.webp',
  music: '/audio/background.mp3',
}
```

### Timeline Milestone

```ts
export interface TimelineMilestone {
  year: string       // e.g. "2019"
  title: string      // ≤ 60 characters
  description: string // ≤ 200 characters
}
```

### GalleryPhoto

```ts
export interface GalleryPhoto {
  src: string
  alt: string
  width: number
  height: number
}
```

### Wish

```ts
export interface Wish {
  id: string         // crypto.randomUUID() at submission time
  name: string
  message: string
  attendance: 'Hadir' | 'Tidak Hadir'
  submittedAt: number // Date.now() timestamp
}
```

### RSVP Form State

```ts
export interface RSVPFormState {
  status: 'idle' | 'success' | 'error'
  errors: {
    name?: string
    attendance?: string
    guestCount?: string
  }
}
```

### BankAccount

```ts
export interface BankAccount {
  bankName: string
  accountHolder: string
  accountNumber: string
}
```

---

## Animation Strategy

All animations use Framer Motion. No raw CSS `@keyframes` or `transition` properties are used for entrance/exit effects.

### Pattern 1 — Entrance on Scroll (`whileInView`)

Used by: TimelineItem, EventCard, FooterContent, HeroContent

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>
```

### Pattern 2 — Staggered Children

Used by: CountdownTimer cards, Gallery photos, Event section cards

```tsx
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

<motion.div variants={containerVariants} initial="hidden" whileInView="show">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants} />
  ))}
</motion.div>
```

### Pattern 3 — AnimatePresence (mount/unmount)

Used by: OpeningScreen exit, Lightbox open/close

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      key="opening"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    />
  )}
</AnimatePresence>
```

### Pattern 4 — Parallax Scroll

Used by: HeroSection background image

```tsx
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 600], [0, 180]) // 30% parallax rate
```

The image wrapper is positioned `overflow: hidden` and the inner `motion.div` uses `style={{ y }}`.

### Pattern 5 — Hover Effects

Used by: Gallery photos, buttons

```tsx
<motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
```

---

## File and Folder Structure

```
wedding-invitation/
├── app/
│   ├── globals.css              # Tailwind v4 @import + @theme tokens
│   ├── layout.tsx               # Root layout: fonts, metadata, body
│   ├── page.tsx                 # Page root: assembles all sections
│   └── actions/
│       └── rsvp.ts             # (placeholder — form logic stays client-side for v1)
├── components/
│   ├── opening/
│   │   └── OpeningScreen.tsx   # 'use client'
│   ├── hero/
│   │   ├── HeroSection.tsx     # SC wrapper
│   │   └── HeroContent.tsx     # 'use client' — parallax + animation
│   ├── countdown/
│   │   ├── CountdownSection.tsx # SC wrapper
│   │   └── CountdownTimer.tsx   # 'use client' — interval + state
│   ├── timeline/
│   │   ├── TimelineSection.tsx  # SC wrapper
│   │   └── TimelineItem.tsx     # 'use client' — whileInView animation
│   ├── gallery/
│   │   ├── GallerySection.tsx   # SC wrapper
│   │   ├── GalleryGrid.tsx      # 'use client' — hover + lightbox state
│   │   └── Lightbox.tsx         # 'use client' — overlay + keyboard
│   ├── events/
│   │   ├── EventSection.tsx     # SC wrapper
│   │   └── EventCard.tsx        # 'use client' — animation
│   ├── rsvp/
│   │   ├── RSVPAndWishesSection.tsx  # 'use client' — shared state bridge
│   │   ├── RSVPForm.tsx              # 'use client' — form + useActionState
│   │   └── WishesList.tsx            # 'use client' — list rendering
│   ├── gift/
│   │   ├── GiftSection.tsx      # SC wrapper
│   │   └── GiftCard.tsx         # 'use client' — clipboard + notification
│   ├── footer/
│   │   ├── FooterSection.tsx    # SC wrapper
│   │   └── FooterContent.tsx    # 'use client' — animation
│   └── music/
│       └── MusicPlayer.tsx      # 'use client' — Audio API, fixed overlay
├── lib/
│   ├── wedding-data.ts          # Static config: names, dates, timeline, gallery, gifts
│   └── utils.ts                 # formatDate, formatTime, formatCountdown
└── public/
    ├── [photos].webp            # Existing gallery images
    └── audio/
        └── background.mp3       # Ambient music file (to be added)
```

### CSS Architecture (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-cream: #F5F0E8;
  --color-beige: #EDE0CC;
  --color-gold: #C9A84C;
  --color-gold-light: #D4AF37;
  --color-dark-overlay: rgba(0, 0, 0, 0.5);

  /* Typography */
  --font-cormorant: var(--font-cormorant-garamond);
  --font-playfair: var(--font-playfair-display);
  --font-great-vibes: var(--font-great-vibes);
}

html {
  scroll-behavior: smooth;
}
```

CSS variables `--font-cormorant-garamond`, `--font-playfair-display`, and `--font-great-vibes` are injected into the DOM by `next/font/google` in `app/layout.tsx`.

### Font Setup (`app/layout.tsx`)

```tsx
import { Cormorant_Garamond, Playfair_Display, Great_Vibes } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
})
```

Each font uses the `variable` option so CSS custom properties are injected. The `className` string of all three is applied to `<html>` so the variables are available globally. Tailwind CSS v4 custom properties in `@theme` then map these to utility classes (`font-cormorant`, `font-playfair`, `font-great-vibes`).

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The following correctness properties were derived from the prework analysis. Only acceptance criteria amenable to property-based testing are included here. Properties involving pure visual/CSS rules, third-party animation APIs, or infrastructure requirements are excluded as they are not suitable for PBT (see Testing Strategy).

### Property 1: Wedding Date Format

*For any* valid JavaScript `Date` object passed to `formatWeddingDate()`, the returned string SHALL match the pattern `[Full Day Name], [DD] [Full Month Name] [YYYY]` (e.g. "Sabtu, 11 Oktober 2025") with correct day/month name and zero-padded day number.

**Validates: Requirements 1.4, 6.2**

---

### Property 2: Countdown Calculation Correctness

*For any* future datetime `targetDate` relative to a mocked `now`, the result of `calculateCountdown(targetDate, now)` SHALL return non-negative integer values for `days`, `hours`, `minutes`, and `seconds`, where `hours < 24`, `minutes < 60`, and `seconds < 60`, and the total represents the correct remaining duration.

**Validates: Requirements 3.1, 3.2**

---

### Property 3: Countdown Expired State

*For any* `targetDate` that is equal to or in the past relative to `now`, `calculateCountdown(targetDate, now)` SHALL return `{ expired: true }`, indicating the wedding day has arrived.

**Validates: Requirements 3.3**

> *Reflection: Properties 2 and 3 together cover the full domain of countdown inputs. They are not redundant — Property 2 covers future dates, Property 3 covers past/present dates. Both are needed.*

---

### Property 4: Timeline Chronological Order

*For any* array of `TimelineMilestone` objects with associated year/date values, the `sortMilestones()` utility SHALL return them in non-decreasing chronological order (earliest first).

**Validates: Requirements 4.1**

---

### Property 5: Lightbox Photo Selection

*For any* array of gallery photos of length n ≥ 1 and any valid index i where `0 ≤ i < n`, after calling `openLightbox(i)`, the lightbox state SHALL have `currentIndex === i` and the displayed photo SHALL be `photos[i]`.

**Validates: Requirements 5.3**

---

### Property 6: Lightbox Navigation Boundary Conditions

*For any* gallery array of length n and current lightbox index i:
- IF `i === 0` THEN the previous control SHALL be disabled
- IF `i === n - 1` THEN the next control SHALL be disabled
- IF `0 < i < n - 1` THEN both controls SHALL be enabled

**Validates: Requirements 5.4**

> *Reflection: Properties 5 and 6 address different aspects of the lightbox — selection identity vs. boundary control state. They are complementary, not redundant.*

---

### Property 7: RSVP Name Validation

*For any* string `name`, the RSVP form validation function SHALL accept `name` as valid if and only if `name.trim().length > 0`. Any string composed entirely of whitespace characters SHALL be rejected with an error.

**Validates: Requirements 7.1**

---

### Property 8: RSVP Guest Count Validation

*For any* integer `n`, the RSVP form guest count validation function SHALL accept `n` as valid if and only if `n >= 1 && n <= 5`. All values outside this range SHALL be rejected.

**Validates: Requirements 7.3**

> *Reflection: Properties 7 and 8 each test a different validation rule on different fields. They are independent and both necessary.*

---

### Property 9: Wish Render Completeness

*For any* `Wish` object `{ name, message, attendance }`, the rendered wish card output SHALL contain the `name`, `message`, and `attendance` value as visible text content.

**Validates: Requirements 8.2**

---

### Property 10: Wishes List Order (Newest First)

*For any* array of `Wish` objects with distinct `submittedAt` timestamps, the `sortWishesNewestFirst()` function SHALL return them in descending `submittedAt` order (most recently submitted first).

**Validates: Requirements 8.3**

---

### Property 11: New Wish Prepend

*For any* existing list of wishes and any new `Wish` object, calling `addWish(list, newWish)` SHALL return a new array where `result[0]` is `newWish` and `result.length === list.length + 1`.

**Validates: Requirements 8.5**

> *Reflection: Properties 10 and 11 together test the sorting invariant and the prepend operation. Property 11 could be considered implied by Property 10 if `addWish` always calls sort afterward — but since they are separate functions, both properties are retained for independent verification.*

---

## Error Handling

### Audio Autoplay Block (Requirements 1.8)

The `MusicPlayer` component calls `audioRef.current.play()` inside a `try/catch`. If the browser throws a `NotAllowedError` (autoplay policy), the component silently stays in paused state. The mute/unmute toggle remains visible so the user can manually start playback.

### Audio Load Failure (Requirements 1.10)

The `<audio>` element's `error` event sets `hasError = true`. The toggle button is conditionally rendered: `{!hasError && <button>...}`.

### Opening Screen Image Failure (Requirements 1.11)

`next/image` renders an `img` element with an `onError` handler. When the image fails to load, a React state flag `imageError` is set. The parent `div` has `className="bg-cream"` as fallback — since the image uses `fill`, the div background shows through when the image fails.

### Clipboard Copy Failure (Requirements 9.6)

```ts
try {
  await navigator.clipboard.writeText(accountNumber)
  setCopiedId(id)
  setTimeout(() => setCopiedId(null), 2000)
} catch {
  setErrorId(id)
  setTimeout(() => setErrorId(null), 3000)
}
```

On failure, an error message prompts the user to copy manually.

### Lightbox Keyboard Cleanup

The `useEffect` in `Lightbox.tsx` that attaches `keydown` listener must return a cleanup function to remove the listener on unmount, preventing memory leaks and duplicate handler registration.

---

## Testing Strategy

### Dual Testing Approach

This feature uses both unit/example-based tests and property-based tests.

- **Unit tests** cover specific examples, error conditions, integration points between components, and accessibility requirements.
- **Property-based tests** cover the pure utility functions (date formatting, countdown calculation, sorting, validation, list operations) that have large input spaces where 100+ randomized iterations provide meaningful coverage.

### Property-Based Testing

**Library:** [fast-check](https://github.com/dubzzz/fast-check) — a TypeScript-native PBT library compatible with Vitest and Jest.

**Target functions** (all in `lib/utils.ts`):
- `formatWeddingDate(date: Date): string`
- `calculateCountdown(target: Date, now: Date): CountdownResult`
- `sortMilestones(milestones: TimelineMilestone[]): TimelineMilestone[]`
- `sortWishesNewestFirst(wishes: Wish[]): Wish[]`
- `addWish(list: Wish[], wish: Wish): Wish[]`
- `validateName(name: string): boolean`
- `validateGuestCount(n: number): boolean`

**Configuration:** Each property test runs minimum **100 iterations** (fast-check default is 100; use `numRuns: 100` explicitly).

**Tag format:** Each property test is tagged with a comment:

```ts
// Feature: wedding-invitation, Property 1: Wedding Date Format
it.prop([fc.date({ min: new Date('2000-01-01'), max: new Date('2100-12-31') })])(
  'formatWeddingDate returns correct pattern for any valid date',
  (date) => {
    const result = formatWeddingDate(date)
    expect(result).toMatch(/^[A-Za-z]+, \d{2} [A-Za-z]+ \d{4}$/)
  }
)
```

**Test for lightbox components** (`GalleryGrid`, `Lightbox`): Use React Testing Library with fast-check to generate random photo arrays and interaction sequences.

### Unit Test Coverage

- **OpeningScreen**: Renders closed state, click opens, fade animation completes
- **CountdownTimer**: Renders four cards, shows "arrived" message when expired
- **RSVPForm**: All validation error cases, success confirmation display
- **GiftCard**: Copy button interaction, "Copied!" notification timing
- **MusicPlayer**: Audio error hides toggle, autoplay rejection is silent
- **Accessibility**: All `next/image` uses include `alt` text; decorative images use `alt=""`; `priority` prop on hero/opening images

### Framework

Vitest + React Testing Library. Run with:

```
npx vitest --run
```
