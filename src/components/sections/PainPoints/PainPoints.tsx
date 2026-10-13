import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { X, Check } from 'lucide-react';

/**
 * 痛点对比 —— 为什么应届生需要它。
 *
 * 表现层：无 heavy 特效，纯 InView 滚动进场。
 * 内容层：四组对比，把「省事」和「安全」翻译成应届生的语言。
 * 文案来源：siteConfig.comparisons（R5：组件内不硬编码文案）。
 */
export function PainPoints() {
  return (
    <section id="why" className="border-t border-line py-20 sm:py-32">
      <div className="container-content">
        <InView>
          <SectionHeading
            eyebrow="为什么做它"
            title="应届生求职，最耗人的不是面试"
            description="是投递。同一个岗位在三个网站各填一遍，同一句招呼语打几百次，投完还不知道有没有效果。这些机械动作，本来就不该由人来做。"
          />
        </InView>

        <div className="mt-12 grid gap-3 sm:mt-16 sm:gap-4 sm:grid-cols-2">
          {siteConfig.comparisons.map((item, i) => (
            <InView key={item.other} transition={{ delay: i * 0.08 }}>
              <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 sm:gap-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <X size={18} className="mt-0.5 shrink-0 text-paper-muted" aria-hidden />
                  <p className="text-sm text-paper-muted line-through">{item.other}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <p className="text-sm font-medium text-paper">{item.ours}</p>
                </div>
                <p className="label-mono text-[11px] text-accent/70">{item.note}</p>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
