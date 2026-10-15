'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { PlatformTrendChart } from '@/components/effects/Charts/PlatformTrendChart';
import { MorningBriefCard } from '@/components/effects/Charts/MorningBriefCard';
import { generateSeedRecords, buildDefaultMorningBrief } from '@/lib/deliveryHistory';
import { Activity, Sparkles } from 'lucide-react';

export function Analytics() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 从真实数据源加载 14 天完整历史与早报
  const records = generateSeedRecords();
  const brief = buildDefaultMorningBrief();

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <section
      id="analytics"
      className="border-t border-white/10 py-16 sm:py-28 relative overflow-hidden bg-[#0b0914] text-white"
    >
      {/* 顶部柔和微纹理暗紫光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[min(1000px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-accent/[0.06] blur-[140px]"
      />

      <div className="container-content relative z-10">
        <InView>
          <SectionHeading
            title="每一次沟通，都有迹可循"
            description="每天清晨自动汇总三大平台投递战报与沟通反馈。投了多少、哪些公司回复了，一目了然。所有数据 100% 存在你自己的电脑里，保护隐私。"
            align="center"
          />
        </InView>

        {/* 核心双图表区：左侧 14 天多平台走势折线图，右侧昨日战报晨报卡片 */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左侧：多平台走势图表 */}
          <div className="lg:col-span-7">
            <InView transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-3">
                <Activity size={18} className="text-purple-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  多平台投递走势（点击节点查看单日详情）
                </h3>
              </div>

              <PlatformTrendChart
                records={records}
                onDayClick={handleDayClick}
                isParchment={false}
              />
            </InView>
          </div>

          {/* 右侧：昨日早报卡片 */}
          <div className="lg:col-span-5">
            <InView transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  09:00 定时晨报 · 战报与策略复盘
                </h3>
              </div>

              <MorningBriefCard
                brief={brief}
                isParchment={false}
                viewingDate={selectedDate}
                onBackToYesterday={() => setSelectedDate(null)}
              />
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
}
