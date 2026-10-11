import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ModeCard } from './ModeCard';

/**
 * 三道闸门 —— 运行模式介绍。
 *
 * 这里是 scan / review / auto 三模式的视觉化展示。
 * 后续可叠加 ScrollStack（React Bits）实现滚动堆叠进场。
 */
export function SafetyGates() {
  return (
    <section id="gates" className="border-t border-line bg-surface py-24 sm:py-32">
      <div className="container-content">
        <SectionHeading
          eyebrow="三道闸门"
          title="从扫描到自动，每一步你说了算"
          description="建议顺序：先用 scan 调规则，再用 review 逐条审核，最后才用 auto 小批量运行。"
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {siteConfig.modes.map((mode) => (
            <ModeCard key={mode.id} mode={mode} />
          ))}
        </div>
      </div>
    </section>
  );
}
