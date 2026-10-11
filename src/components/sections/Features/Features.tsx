import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { FeatureCard } from './FeatureCard';

/**
 * 功能特性网格 —— 滚动进场动效接入。
 */
export function Features() {
  return (
    <section id="what" className="border-t border-line py-24 sm:py-32">
      <div className="container-content">
        <InView>
          <SectionHeading
            eyebrow="它做什么"
            title="只做三件事，剩下的交给你"
            description="它不猜你想要什么工作，也不替你写打招呼的话。规则是你定的，话是你说的，它只负责筛选、审核、节流和发送。"
          />
        </InView>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.features.map((feature, i) => (
            <InView key={feature.title} transition={{ delay: i * 0.08 }}>
              <FeatureCard feature={feature} />
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
