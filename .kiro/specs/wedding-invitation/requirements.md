# Requirements Document

## Introduction

A premium, mobile-first wedding invitation website built with Next.js App Router and Tailwind CSS v4. The site presents a complete digital wedding invitation experience for a couple — covering an animated opening screen, couple details, a live countdown timer, a love story timeline, a photo gallery with lightbox, ceremony and reception event details, an RSVP form, a guest wishes wall, a gift/bank transfer section, and a closing footer. All sections are elegantly animated using Framer Motion and styled with a luxury cream-gold-white palette using Cormorant Garamond, Playfair Display, and Great Vibes typography.

## Glossary

- **Invitation_App**: The Next.js web application serving as the digital wedding invitation.
- **Opening_Screen**: The initial fullscreen section shown before the invitation is "opened", displaying the couple's names and a call-to-action button.
- **Hero_Section**: The first visible section after opening, showing couple photo and romantic details.
- **Countdown_Timer**: A live-updating component displaying days, hours, minutes, and seconds until the wedding date.
- **Timeline**: The Love Story section displaying milestones in the couple's relationship.
- **Gallery**: The photo grid section with lightbox preview capability.
- **Event_Section**: The section detailing Akad Nikah and Reception ceremony information.
- **RSVP_Form**: The attendance confirmation form for guests.
- **Wishes_Section**: The section displaying submitted guest messages and prayers.
- **Gift_Section**: The section displaying bank account and QRIS payment information.
- **Footer**: The closing thank-you section of the invitation.
- **Music_Player**: The background audio component that plays ambient music after the invitation is opened.
- **Lightbox**: A fullscreen overlay displaying a gallery photo in enlarged view.
- **Guest**: A person who receives and views the wedding invitation.

---

## Requirements

### Requirement 1: Opening Screen

**User Story:** As a Guest, I want to see a beautiful fullscreen opening screen before the invitation loads, so that I feel the premium, romantic atmosphere before entering the invitation.

#### Acceptance Criteria

1. THE Invitation_App SHALL display the Opening_Screen as the first view occupying 100% of the viewport height and width.
2. WHEN the Opening_Screen is displayed, THE Invitation_App SHALL show a fullscreen background image with a dark overlay at 0.4–0.6 opacity for visual depth.
3. WHEN the Opening_Screen is displayed, THE Invitation_App SHALL render the couple's full names in Great Vibes script font with a gold color and a fade-in animation completing within 1200 milliseconds.
4. WHEN the Opening_Screen is displayed, THE Invitation_App SHALL render the wedding date in Cormorant Garamond font beneath the names, formatted as [Day of Week], [DD] [Month Name] [YYYY].
5. WHEN the Opening_Screen is displayed, THE Invitation_App SHALL render an "Open Invitation" button styled with a gold border and a background at 0.1–0.3 opacity.
6. WHEN the Guest clicks the "Open Invitation" button, THE Invitation_App SHALL animate the Opening_Screen out with a fade-out transition completing within 800 milliseconds and reveal the main invitation content.
7. WHEN the Guest clicks the "Open Invitation" button, THE Music_Player SHALL begin playing background ambient music.
8. IF the browser blocks autoplay, THEN THE Music_Player SHALL remain silent until the Guest interacts with the mute/unmute toggle.
9. WHEN the invitation is opened, THE Music_Player SHALL render a fixed mute/unmute toggle button visible on all sections.
10. IF the Music_Player audio file fails to load, THEN THE Invitation_App SHALL hide the mute/unmute toggle button without displaying an error to the Guest.
11. IF the Opening_Screen background image fails to load, THEN THE Invitation_App SHALL display a fallback background using the cream color (#F5F0E8) from the design palette.

---

### Requirement 2: Hero Section

**User Story:** As a Guest, I want to see a beautiful hero section with the couple's photo and names, so that I immediately understand whose wedding invitation this is.

#### Acceptance Criteria

1. WHEN the invitation is opened, THE Hero_Section SHALL be the first section visible below the Opening_Screen.
2. THE Hero_Section SHALL display a background covering 100% of the viewport width and height, featuring the couple's photo with a dark overlay at 0.4–0.6 opacity.
3. WHEN the Hero_Section enters the viewport, THE Invitation_App SHALL animate the groom's full name and bride's full name in Playfair Display font with a staggered fade-up entrance animation, each name completing within 1000 milliseconds.
4. THE Hero_Section SHALL display a romantic quote in Cormorant Garamond italic style, centered beneath the names.
5. THE Hero_Section SHALL display a decorative gold ornamental divider between the names and the quote.
6. WHILE the Guest scrolls through the Hero_Section, THE Invitation_App SHALL move the background image at a reduced rate relative to the scroll distance, keeping the image within the section's bounds.

---

### Requirement 3: Countdown Timer

**User Story:** As a Guest, I want to see a live countdown to the wedding date, so that I know exactly how much time remains before the ceremony.

#### Acceptance Criteria

1. THE Countdown_Timer SHALL display four unit cards, each showing a numeric value and its label: days, hours, minutes, and seconds remaining until the wedding date and time.
2. WHILE the current time in the wedding venue's local timezone is before the wedding datetime, THE Countdown_Timer SHALL update each displayed unit every 1000 milliseconds.
3. WHEN the current time equals or passes the wedding datetime, THE Countdown_Timer SHALL display a message indicating that the wedding day has arrived, in place of the numeric countdown.
4. THE Countdown_Timer SHALL render each unit card with a glassmorphism frosted-glass appearance consistent with the cream and white palette defined in Requirement 11.
5. WHEN the Countdown_Timer section enters the viewport, THE Invitation_App SHALL animate each card into view sequentially, with each card starting its animation after the previous card completes, rather than all cards animating simultaneously.

---

### Requirement 4: Love Story Timeline

**User Story:** As a Guest, I want to read about the couple's love journey, so that I can feel emotionally connected to their story.

#### Acceptance Criteria

1. THE Timeline SHALL display at least five milestones in the couple's relationship in chronological order.
2. EACH milestone SHALL include a year or date label, a short title of no more than 60 characters, and a descriptive sentence of no more than 200 characters.
3. WHEN a milestone enters the viewport for the first time during scrolling, THE Invitation_App SHALL animate it into view with a fade-up slide animation completing within 600 milliseconds.
4. WHILE the viewport width is 768px or greater, THE Timeline SHALL render milestones in an alternating left and right layout.
5. WHILE the viewport width is below 768px, THE Timeline SHALL render milestones in a single centered column.
6. THE Timeline SHALL display a vertical connecting line with a gold accent color linking all milestones.

---

### Requirement 5: Gallery Section

**User Story:** As a Guest, I want to browse a curated gallery of the couple's photos, so that I can enjoy their memories and feel the warmth of the occasion.

#### Acceptance Criteria

1. THE Gallery SHALL display photos in a responsive CSS grid with 1 column on viewports below 640px, 2 columns on viewports from 640px to 1023px, and 3 columns on viewports 1024px and above, with each photo maintaining a consistent aspect ratio.
2. WHEN a Guest hovers over a gallery photo on a viewport 768px or wider, THE Gallery SHALL apply a scale-up and brightness overlay animation to that photo completing within 300 milliseconds.
3. WHEN a Guest taps or clicks a gallery photo, THE Invitation_App SHALL open a Lightbox displaying the selected photo in fullscreen overlay.
4. WHILE the Lightbox is open, THE Invitation_App SHALL display navigation controls to move to the previous or next photo; the previous control SHALL be disabled on the first photo and the next control SHALL be disabled on the last photo.
5. WHILE the Lightbox is open, THE Invitation_App SHALL display a close button that dismisses the Lightbox with a fade-out animation completing within 300 milliseconds.
6. IF the Guest presses the Escape key while the Lightbox is open, THEN THE Invitation_App SHALL close the Lightbox.
7. WHEN the Gallery section enters the viewport, THE Invitation_App SHALL animate photos into view with a scale-fade animation staggered at 100ms intervals per photo, each animation completing within 400 milliseconds.

---

### Requirement 6: Wedding Event Details

**User Story:** As a Guest, I want to see the date, time, and location of both the Akad Nikah and Reception ceremonies, so that I can plan my attendance.

#### Acceptance Criteria

1. THE Event_Section SHALL display two ceremony cards: one for Akad Nikah and one for the Wedding Reception.
2. EACH ceremony card SHALL display the ceremony name, date formatted with the full written month name, time in 24-hour HH:MM format, and venue name.
3. EACH ceremony card SHALL display a full venue address including street, city, and province beneath the venue name.
4. WHEN a Guest clicks the "Open in Google Maps" button on a ceremony card, THE Invitation_App SHALL open the venue location in Google Maps in a new browser tab.
5. WHEN the Event_Section enters the viewport, THE Invitation_App SHALL animate each ceremony card into view with a staggered fade-up animation.
6. THE Event_Section SHALL display a decorative gold divider using the gold color (#C9A84C / #D4AF37) defined in Requirement 11 and ornamental elements consistent with the overall aesthetic.

---

### Requirement 7: RSVP Form

**User Story:** As a Guest, I want to submit my attendance confirmation, so that the couple knows I will be coming to celebrate with them.

#### Acceptance Criteria

1. THE RSVP_Form SHALL contain a required text input field for the Guest's full name with a visible label.
2. THE RSVP_Form SHALL contain a required selection control for attendance status with exactly two options: "Hadir" (Attending) and "Tidak Hadir" (Not Attending).
3. THE RSVP_Form SHALL contain a required numeric input for the number of accompanying guests, accepting only integer values with a minimum of 1 and a maximum of 5.
4. THE RSVP_Form SHALL contain an optional textarea field for a personal message or prayer for the couple, with a visible label.
5. WHEN the Guest submits the RSVP_Form with all required fields completed and valid, THE Invitation_App SHALL display a success confirmation message visible on screen.
6. IF the Guest submits the RSVP_Form with an empty required field, THEN THE RSVP_Form SHALL display an inline validation error message adjacent to that field without navigating away from the page.
7. THE RSVP_Form SHALL be styled using the cream (#F5F0E8) and gold (#C9A84C / #D4AF37) colors defined in Requirement 11, consistent with the overall design aesthetic.

---

### Requirement 8: Wishes Section

**User Story:** As a Guest, I want to read heartfelt messages from other guests, so that I can feel part of a warm and celebratory community.

#### Acceptance Criteria

1. THE Wishes_Section SHALL display submitted guest messages in a vertically scrollable card list constrained to a maximum visible height equivalent to four wish cards before requiring scroll.
2. EACH wish card SHALL display the guest's name, full message text rendered with word-wrap, and an attendance status label.
3. THE Wishes_Section SHALL display the most recently submitted wishes at the top of the list.
4. WHEN the Wishes_Section is initially displayed, THE Invitation_App SHALL pre-populate the list with at least five example wishes to ensure the section appears visually complete.
5. WHEN a new wish is submitted via the RSVP_Form, THE Wishes_Section SHALL display the new wish added to the top of the list without requiring a page reload.
6. EACH wish card SHALL be styled with a glassmorphism frosted-glass appearance consistent with the visual style used in the Countdown_Timer section.

---

### Requirement 9: Gift Section

**User Story:** As a Guest, I want to see the couple's bank account details and QRIS code for sending a wedding gift, so that I can easily send a monetary gift.

#### Acceptance Criteria

1. THE Gift_Section SHALL display at least two bank account entries, each showing the bank name, account holder name, and account number.
2. WHEN a Guest clicks the copy button next to an account number, THE Invitation_App SHALL copy the account number to the system clipboard.
3. WHEN the account number is successfully copied, THE Invitation_App SHALL display a "Copied!" confirmation notification that disappears after 2000 milliseconds.
4. THE Gift_Section SHALL display a QRIS payment image at a minimum rendered size of 200×200 CSS pixels that Guests can screenshot to use for GoPay or OVO transfers.
5. THE Gift_Section SHALL display a gratitude message directed at Guests thanking them for their generosity.
6. IF the clipboard copy operation fails, THEN THE Invitation_App SHALL display an error notification prompting the Guest to copy the account number manually.

---

### Requirement 10: Footer

**User Story:** As a Guest, I want to see a beautiful closing section after all the invitation content, so that the experience ends on an elegant and heartfelt note.

#### Acceptance Criteria

1. THE Footer SHALL display a thank-you message from the couple to their guests.
2. THE Footer SHALL display the couple's names in Great Vibes script font as a closing signature.
3. THE Footer SHALL display a decorative floral or ornamental element using the gold (#C9A84C / #D4AF37) and cream (#F5F0E8) colors defined in Requirement 11.
4. THE Footer SHALL display the wedding year and a closing tagline of no more than 60 characters.
5. WHEN the Footer enters the viewport, THE Invitation_App SHALL animate it into view with a fade-up animation with a duration of 600–800 milliseconds.

---

### Requirement 11: Visual Design and Aesthetic

**User Story:** As a Guest, I want the entire invitation to feel premium, cinematic, and romantic, so that it matches the elegance of the actual wedding celebration.

#### Acceptance Criteria

1. THE Invitation_App SHALL use cream (#F5F0E8), white (#FFFFFF), gold (#C9A84C / #D4AF37), and soft beige (#EDE0CC) as the defined color palette applied across all sections.
2. THE Invitation_App SHALL use Cormorant Garamond for body and caption text, Playfair Display for section headings, and Great Vibes for script accent elements such as names and romantic phrases, all loaded via next/font/google.
3. THE Invitation_App SHALL apply the CSS property `scroll-behavior: smooth` globally so in-page anchor navigation transitions smoothly.
4. WHERE a background image is used, THE Invitation_App SHALL apply a semi-transparent dark overlay at 0.4–0.6 opacity to ensure text legibility against the image.
5. THE Invitation_App SHALL use Framer Motion for all entrance animations, hover effects, and transition animations throughout the site.
6. WHILE on a viewport width below 768px, THE Invitation_App SHALL display all sections in a single-column layout with touch-friendly tap targets of at least 44×44 CSS pixels.
7. THE Invitation_App SHALL use next/image for all image rendering to enable automatic optimization and lazy loading.
8. THE Invitation_App SHALL load all page fonts using the next/font/google module to ensure self-hosted font delivery with no external font requests at runtime.

---

### Requirement 12: Performance and Accessibility

**User Story:** As a Guest on a mobile device, I want the invitation to load quickly and be easy to use, so that I can enjoy the experience regardless of my device or network speed.

#### Acceptance Criteria

1. THE Invitation_App SHALL implement code-split Client Components using the `'use client'` directive only on components that contain user input handling, browser API access, or client-side state, keeping all other sections as Server Components.
2. THE Invitation_App SHALL render all Framer Motion animated sections as Client Components.
3. THE Invitation_App SHALL include `alt` text on all images rendered via next/image that describes the subject or purpose of the image for screen reader users.
4. THE Invitation_App SHALL set `alt=""` on all purely decorative images rendered via next/image so that screen readers skip them.
5. THE Invitation_App SHALL include a `<meta name="viewport">` tag with content `width=device-width, initial-scale=1` via the Next.js metadata API.
6. THE Invitation_App SHALL be deployable to Vercel without additional server configuration by using only App Router conventions compatible with the Vercel build environment.
7. WHERE the Opening_Screen or Hero_Section use a fullscreen background image, THE Invitation_App SHALL apply the `priority` prop on the next/image component to preload those images.
