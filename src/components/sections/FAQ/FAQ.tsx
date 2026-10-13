import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';

/**
 * 常见问题 —— 把应届生最关心的顾虑摊开说。
 * 文案来源：siteConfig.faqs（R5：组件内不硬编码文案）。
 */
export function FAQ() {
  return (
    <section id="faq" className="border-t border-line bg-surface py-20 sm:py-32">
      <div className="container-content max-w-3xl">
        <InView>
          <SectionHeading eyebrow="常见问题" title="把顾虑摊开说" align="center" />
        </InView>

        <div className="mt-12 flex flex-col gap-4 sm:mt-16 sm:gap-6">
          {siteConfig.faqs.map((item, i) => (
            <InView key={item.q} transition={{ delay: i * 0.06 }}>
              <details className="group rounded-xl border border-line bg-base p-5 open:border-accent/30 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base text-paper sm:text-lg">
                  {item.q}
                  <span className="ml-3 shrink-0 text-paper-muted transition-transform group-open:rotate-180 sm:ml-4">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-paper-dim">{item.a}</p>
              </details>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
