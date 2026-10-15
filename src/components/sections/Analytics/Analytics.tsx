'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { PlatformTrendChart } from '@/components/effects/Charts/PlatformTrendChart';
import { MorningBriefCard } from '@/components/effects/Charts/MorningBriefCard';
import { FoldingAccordion, type AccordionItem } from '@/components/effects/Accordion';
import { generateSeedRecords, buildDefaultMorningBrief } from '@/lib/deliveryHistory';
import { Activity, Sparkles, SlidersHorizontal } from 'lucide-react';

const ACCORDION_DETAILS: AccordionItem[] = [
  {
    id: 'quota',
    tag: '平台健康配额',
    title: '今日三大平台安全投递配额与并发监控',
    subtitle: '基于各平台最新风控阈值动态限制单日上限',
    badge: '实时动态调节',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl p-3 border border-emerald-500/20 bg-emerald-500/10">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span>BOSS 直聘</span>
            <span>60 / 100 额度</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-emerald-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '60%' }} />
          </div>
          <p className="mt-1.5 text-[10px] text-paper-muted">巡航状态：正常 · 间隔 25~45s</p>
        </div>

        <div className="rounded-xl p-3 border border-orange-500/20 bg-orange-500/10">
          <div className="flex items-center justify-between text-xs font-bold text-orange-400">
            <span>猎聘 Liepin</span>
            <span>40 / 80 额度</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-orange-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full" style={{ width: '50%' }} />
          </div>
          <p className="mt-1.5 text-[10px] text-paper-muted">巡航状态：正常 · 间隔 30~60s</p>
        </div>

        <div className="rounded-xl p-3 border border-rose-500/20 bg-rose-500/10">
          <div className="flex items-center justify-between text-xs font-bold text-rose-400">
            <span>前程无忧 51job</span>
            <span>20 / 50 额度</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-rose-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-rose-400 rounded-full" style={{ width: '40%' }} />
          </div>
          <p className="mt-1.5 text-[10px] text-paper-muted">巡航状态：正常 · 间隔 20~40s</p>
        </div>
      </div>
    ),
  },
  {
    id: 'heatmap',
    tag: '时段转化洞察',
    title: 'HR 消息与已读高峰热力分布（黄金打招呼窗口）',
    subtitle: '大数据统计出的 48 小时 HR 活跃峰值区间',
    badge: '回复率提升 65%',
    content: (
      <div className="space-y-2 text-xs">
        <p className="leading-relaxed text-paper-dim">
          巡航引擎会智能避开早晨 9:00 前和午休 12:00~13:30 无人回复的冷淡期，集中在 <strong>10:00~11:30</strong> 和 <strong>14:30~16:00</strong> 两个 HR 活跃度峰值阶段发起打招呼。
        </p>
        <div className="rounded-lg p-2.5 bg-black/40 border border-white/10 font-mono text-[11px] flex items-center justify-between">
          <span>上午黄金窗口：10:00 ~ 11:30（平均 18 分钟收到初次反馈）</span>
          <span className="text-emerald-400 font-bold">活跃指数 98%</span>
        </div>
      </div>
    ),
    codeSnippet: `# 节律调度器：智能跳过非工作时段
def check_human_schedule() -> bool:
    now = datetime.now()
    if now.weekday() >= 5: return False # 周末自动静默休眠
    if 10 <= now.hour <= 11 or 14 <= now.hour <= 17:
        return True # 处于 HR 高意愿沟通黄金期
    return False`,
  },
  {
    id: 'abtest',
    tag: 'A/B 测试',
    title: '招呼语语义 A/B 动态测试与转化率跟踪',
    subtitle: '多套话术根据岗位关键词自动命中，淘汰低转化开场白',
    badge: '智能迭代',
    content: '系统内置「技术干货型」、「直击痛点型」与「谦逊真诚型」多套打招呼话术，并根据目标岗位 JD 关键词（如高并发、微服务、架构重构）自动插桩。系统本地计算各模板的已读率与回复率，持续向高转化话术倾斜。',
  },
];

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
            eyebrow="每日晨报"
            title="每一次沟通，都有迹可循"
            description="每天清晨自动汇总三大平台投递战报与沟通反馈。投了多少、哪些公司回复了，一目了然。所有数据 100% 存在你自己的电脑里，保护隐私。"
            align="center"
          />
        </InView>

        {/* 核心双图表区：左侧 14 天多平台走势折线图，右侧昨日战报晨报卡片 */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左侧：多平台走势图表 */}
          <div className="lg:col-span-7">
            <InView transition={{ delay: 0.1 }}>
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-purple-400" />
                  <span className="text-xs font-medium text-slate-300">
                    多平台投递走势
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  近期投递活跃曲线（点击节点可查看单日详情）
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
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-paper-muted">
                    MORNING BRIEF SUMMARY
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
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

        {/* 交互式折叠抽屉区：点击展开配额、时段热力与话术 A/B 测试 */}
        <div className="mt-12 sm:mt-16">
          <InView transition={{ delay: 0.3 }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-accent" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                  深度折叠抽屉 · DEEP-DIVE METRICS & DISCLOSURE
                </span>
              </div>
              <span className="text-[11px] font-mono text-paper-muted">
                点击折叠条平滑展开底层参数
              </span>
            </div>

            <FoldingAccordion
              items={ACCORDION_DETAILS}
              defaultOpenId="quota"
              theme="obsidian"
            />
          </InView>
        </div>
      </div>
    </section>
  );
}
