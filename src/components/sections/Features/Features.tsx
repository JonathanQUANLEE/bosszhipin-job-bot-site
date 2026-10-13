import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { FeatureCard } from './FeatureCard';

/**
 * 功能特性网格 —— 滚动进场动效接入。
 */
export function Features() {
  return (
    <section id="what" className="border-t border-line py-20 sm:py-32">
      <div className="container-content">
        <InView>
          <SectionHeading
            eyebrow="它能做什么"
            title="六大模块，覆盖求职全流程"
            description="从听懂你的需求、筛出合适的岗位、批量投递，到复盘效果 —— 每一步都有对应的模块，不用你自己拼一堆工具。"
          />
        </InView>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
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
