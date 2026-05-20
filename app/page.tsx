import OpeningScreen from '@/components/opening/OpeningScreen'
import HeroSection from '@/components/hero/HeroSection'
import CoupleSection from '@/components/couple/CoupleSection'
import LdrSection from '@/components/ldr/LdrSection'
import AcaraSection from '@/components/events/AcaraSection'
import TimelineSection from '@/components/timeline/TimelineSection'
import GallerySection from '@/components/gallery/GallerySection'
import RSVPAndWishesSection from '@/components/rsvp/RSVPAndWishesSection'
import GiftSection from '@/components/gift/GiftSection'
import FooterSection from '@/components/footer/FooterSection'

export default function Home() {
  return (
    <OpeningScreen>
      <main>
        <HeroSection />
        <CoupleSection />
        <LdrSection />
        <AcaraSection />
       
        <GallerySection />
        <RSVPAndWishesSection />
        <GiftSection />
        <FooterSection />
      </main>
    </OpeningScreen>
  )
}
