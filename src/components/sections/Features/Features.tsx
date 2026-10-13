import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { FeatureRow } from './FeatureRow';

/**
 * 功能模块 —— 左侧粘性标题 + 右侧滚动卡片（Apple 式滚动叙事）。
 *
 * 大屏下标题钉在左侧，卡片从右侧滚过，浏览节奏更像在「翻一份产品说明」，
 * 而不是扫一张密密麻麻的表格。小屏自动退化为单列堆叠。
 */
export function Features() {
  return (
    <section id="what" className="border-t border-line py-20 sm:py-32">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* 左：粘性标题 */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <InView>
              <SectionHeading
                eyebrow="它能做什么"
                title="六大模块，覆盖求职全流程"
                description="从听懂你的需求、筛出合适的岗位、批量投递，到复盘效果 —— 每一步都有对应的模块，不用你自己拼一堆工具。"
              />
            </InView>
          </div>

          {/* 右：滚动卡片 */}
          <div className="flex flex-col gap-4">
            {siteConfig.features.map((feature, i) => (
              <InView key={feature.title} transition={{ delay: i * 0.05 }}>
                <FeatureRow feature={feature} index={i} />
              </InView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
