import OpeningScreen from '@/components/opening/OpeningScreen'
import HeroSection from '@/components/hero/HeroSection'
import CoupleSection from '@/components/couple/CoupleSection'
import TimelineSection from '@/components/timeline/TimelineSection'
import GallerySection from '@/components/gallery/GallerySection'
import EventSection from '@/components/events/EventSection'
import RSVPAndWishesSection from '@/components/rsvp/RSVPAndWishesSection'
import GiftSection from '@/components/gift/GiftSection'
import FooterSection from '@/components/footer/FooterSection'

export default function Home() {
  return (
    <OpeningScreen>
      <main>
        <HeroSection />
        <CoupleSection />
        <TimelineSection />
        <GallerySection />
        <EventSection />
        <RSVPAndWishesSection />
        <GiftSection />
        <FooterSection />
      </main>
    </OpeningScreen>
  )
}
