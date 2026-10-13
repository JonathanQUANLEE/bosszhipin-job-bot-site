import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { Crosshair } from '@/components/effects/Crosshair/Crosshair';
import { PaceCard } from './PaceCard';

/**
 * 安全与节奏 —— 三档节奏 + 安全机制 + 三种运行模式。
 *
 * 表现层：InView 滚动进场 + Crosshair 限定区块瞄准光标。
 * @see EFFECT_REGISTRY.crosshairCursor
 */
export function SafetyGates() {
  return (
    <section id="gates" className="border-t border-line py-20 sm:py-32">
      <Crosshair>
        <div className="container-content">
          <InView>
            <SectionHeading
              eyebrow="安全与节奏"
              title="投得快，也要投得稳"
              description="三档节奏自己选。无论选哪一档，平台限额、验证码熔断和本地日志都一直在守着 —— 这不是一个把你账号冲掉就走的工具。"
              align="center"
            />
          </InView>

          {/* 三档节奏 */}
          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3">
            {siteConfig.paceTiers.map((tier, i) => (
              <InView key={tier.id} transition={{ delay: i * 0.1 }}>
                <PaceCard tier={tier} />
              </InView>
            ))}
          </div>

          {/* 安全机制 */}
          <InView>
            <p className="label-mono mt-16 mb-6 text-accent">无论选哪一档，这些一直都在</p>
          </InView>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.safetyLimits.map((limit, i) => (
              <InView key={limit.key} transition={{ delay: i * 0.06 }}>
                <div className="flex h-full flex-col gap-2 bg-surface p-5 sm:p-6">
                  <p className="font-mono text-lg text-paper">{limit.value}</p>
                  <p className="text-sm font-medium text-paper-dim">{limit.label}</p>
                  <p className="text-xs leading-relaxed text-paper-muted">{limit.description}</p>
                  <p className="label-mono mt-auto pt-2 text-[10px] text-accent/60">{limit.key}</p>
                </div>
              </InView>
            ))}
          </div>

          {/* 运行模式 */}
          <InView>
            <p className="label-mono mt-16 mb-6 text-accent">三种运行模式</p>
          </InView>
          <div className="grid gap-4 sm:grid-cols-3">
            {siteConfig.modes.map((mode, i) => (
              <InView key={mode.id} transition={{ delay: i * 0.08 }}>
                <div className="flex h-full flex-col gap-2 rounded-xl border border-line bg-surface p-5">
                  <div className="flex items-baseline gap-2">
                    <p className="font-mono text-lg font-semibold text-accent">{mode.name}</p>
                    <p className="text-sm text-paper">{mode.title}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-paper-muted">{mode.behavior}</p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </Crosshair>
    </section>
  );
}
