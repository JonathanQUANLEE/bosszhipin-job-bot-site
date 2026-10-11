import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { ModeCard } from './ModeCard';

/**
 * 三道闸门 —— 滚动进场动效接入。
 */
export function SafetyGates() {
  return (
    <section id="gates" className="border-t border-line bg-surface py-24 sm:py-32">
      <div className="container-content">
        <InView>
          <SectionHeading
            eyebrow="三道闸门"
            title="从扫描到自动，每一步你说了算"
            description="建议顺序：先用 scan 调规则，再用 review 逐条审核，最后才用 auto 小批量运行。"
            align="center"
          />
        </InView>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {siteConfig.modes.map((mode, i) => (
            <InView key={mode.id} transition={{ delay: i * 0.12 }}>
              <ModeCard mode={mode} />
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
