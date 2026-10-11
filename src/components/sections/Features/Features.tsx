import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeatureCard } from './FeatureCard';

/**
 * 功能特性网格。
 *
 * 按 docs/EFFECTS.md 决策：这里用纯 DOM 卡片（SpotlightCard / BorderGlow 后续接入），
 * 不引入 gsap。低配设备与 reduced-motion 下仍保留完整静态内容。
 */
export function Features() {
  return (
    <section id="what" className="border-t border-line py-24 sm:py-32">
      <div className="container-content">
        <SectionHeading
          eyebrow="它做什么"
          title="只做三件事，剩下的交给你"
          description="它不猜你想要什么工作，也不替你写打招呼的话。规则是你定的，话是你说的，它只负责筛选、审核、节流和发送。"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
