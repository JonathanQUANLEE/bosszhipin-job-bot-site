import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints/PainPoints';
import { Features } from '@/components/sections/Features';
import { SafetyGates } from '@/components/sections/SafetyGates';
import { FAQ } from '@/components/sections/FAQ/FAQ';
import { Start } from '@/components/sections/Start';

/**
 * 首页 —— 只做区块编排，不写业务逻辑。
 *
 * 目标：始终 < 60 行（CODE_STYLE.md），每引入一个新 section 只加一行 import + 一行 JSX。
 *
 * @see docs/EFFECTS.md 按 section 的完整特效清单
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Features />
        <SafetyGates />
        <FAQ />
        <Start />
      </main>
      <Footer />
    </>
  );
}
