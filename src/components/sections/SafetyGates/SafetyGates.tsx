'use client';

import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { Crosshair } from '@/components/effects/Crosshair/Crosshair';
import { PaceCard } from './PaceCard';
import { GlassIcons } from '@/components/effects/GlassIcons';
import { CodeSlots } from '@/components/effects/CodeSlots';

/**
 * SafetyGates —— 安全屏障与参数百宝箱
 *
 * 结合两大交互武器：
 * 1. GlassIcons：毛玻璃参数百宝箱，点击深入解读各项规则机制；
 * 2. CodeSlots：01-06 安全关卡老虎机级联翻牌；
 * 3. PaceCard：三档求职巡航节奏自选。
 */
export function SafetyGates() {
  return (
    <section id="safety" className="border-t border-line py-16 sm:py-28 relative overflow-hidden">
      <Crosshair>
        <div className="container-content relative">
          <InView>
            <SectionHeading
              eyebrow="安全风控与规则百宝箱 · ZERO-RISK ARCHITECTURE"
              title="投得快，更要投得稳如磐石"
              description="三档节奏自由选。无论选哪一档，平台限额、拟人随机延时、黑名单过滤和本地沙盒日志都一直在忠实守卫 —— 这是一套将你的账号安全放在首位的专业级系统。"
              align="center"
            />
          </InView>

          {/* 三档节奏自选 */}
          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3">
            {siteConfig.paceTiers.map((tier, i) => (
              <InView key={tier.id} transition={{ delay: i * 0.1 }}>
                <PaceCard tier={tier} />
              </InView>
            ))}
          </div>

          {/* GlassIcons 参数百宝箱 */}
          <div className="mt-16">
            <InView>
              <div className="mb-6 flex items-center justify-between">
                <span className="label-mono text-accent">参数设置百宝箱（点击图标查看防风控机制）</span>
              </div>
            </InView>
            <GlassIcons />
          </div>

          {/* CodeSlots 六大安全屏障老虎机 */}
          <div className="mt-16">
            <InView>
              <div className="mb-6 flex items-center justify-between">
                <span className="label-mono text-accent">六大底层安全关卡（01 ~ 06 全面护航）</span>
              </div>
            </InView>
            <CodeSlots />
          </div>
        </div>
      </Crosshair>
    </section>
  );
}
