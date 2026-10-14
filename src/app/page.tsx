import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollBeam } from '@/components/effects/ScrollBeam';
import { Hero } from '@/components/sections/Hero';
import { Analytics } from '@/components/sections/Analytics';
import { PainPoints } from '@/components/sections/PainPoints/PainPoints';
import { Platforms } from '@/components/sections/Platforms';
import { Features } from '@/components/sections/Features';
import { SafetyGates } from '@/components/sections/SafetyGates';
import { Creator } from '@/components/sections/Creator';
import { Start } from '@/components/sections/Start';

/**
 * 首页 —— 严谨编排，去芜存菁。
 *
 * 彻底拔除导致遮挡、折叠与干扰视线的冗余浮层，
 * 每一个区块拥有独立呼吸感与高对比度色彩节奏。
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <ScrollBeam />
      <main className="relative flex flex-col gap-0 overflow-hidden">
        <Hero />
        <Analytics />
        <PainPoints />
        <Platforms />
        <Features />
        <SafetyGates />
        <Creator />
        <Start />
      </main>
      <Footer />
    </>
  );
}
