import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ValueSection from '@/components/ValueSection';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import HeroSceneLoader from '@/components/HeroSceneLoader';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSceneLoader />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ValueSection />
      <CTASection />
      <Footer />
    </main>
  );
}
