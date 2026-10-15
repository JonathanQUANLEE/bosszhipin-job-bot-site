import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollBeam } from '@/components/effects/ScrollBeam';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints/PainPoints';
import { Features } from '@/components/sections/Features';
import { Analytics } from '@/components/sections/Analytics';
import { Creator } from '@/components/sections/Creator';
import { Start } from '@/components/sections/Start';

/**
 * 首页 —— 苹果级极简叙事，重体验、轻技术，流畅自然。
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <ScrollBeam />
      <main className="relative flex flex-col gap-0 overflow-hidden">
        <Hero />
        <PainPoints />
        <Features />
        <Analytics />
        <Creator />
        <Start />
      </main>
      <Footer />
    </>
  );
}
