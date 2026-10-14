'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { Counter } from '@/components/effects/Counter';
import { SpringCheck, type SpringCheckItem } from '@/components/effects/SpringCheck';
import { PaperCrumple } from '@/components/effects/PaperCrumple';

const TRADITIONAL_FLAWS: SpringCheckItem[] = [
  {
    id: 'flaw-1',
    flaw: '同一个岗位在三个网站各搜一遍，每天机械重复刷新 300 次',
    solution: '三大平台多路并发，秒级抓取最新岗位',
    impact: '释放 90% 盯盘时间',
  },
  {
    id: 'flaw-2',
    flaw: '千篇一律打招呼被系统判定为脚本刷单，甚至导致账号误封',
    solution: '0 驱动底层无痕 + 6~14 秒拟人化随机延时',
    impact: '0 验证码 · 100% 安全',
  },
  {
    id: 'flaw-3',
    flaw: '大量培训机构、外包公司、黑名单企业混杂，防不胜防',
    solution: '智能公司黑名单 + 智能 JD 语义初筛排除',
    impact: '自动过滤垃圾公司',
  },
  {
    id: 'flaw-4',
    flaw: '深夜失眠焦虑盯盘，HR 已读不回心态崩溃陷入自我怀疑',
    solution: '无人值守后台自动化巡航，有回复才精准提醒',
    impact: '彻底终结精神内耗',
  },
];

/**
 * PainPoints —— 痛点对比与心累宣泄
 *
 * 借鉴 grail-app.com 与 berd.xyz 的鲜明色彩反差：
 * 1. 醒目的时间黑洞数据罗盘（珊瑚红、梦幻紫、琥珀金）；
 * 2. 强对比度的打叉淘汰清单（❌）；
 * 3. 拟真米白纸质简历揉碎解压实验室。
 */
export function PainPoints() {
  return (
    <section id="pain-points" className="border-t border-line/60 py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-base via-[#140c1a] to-base">
      {/* 暖紫/深红环境柔光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-rose-600/[0.08] blur-[140px]"
      />

      <div className="container-content relative">
        <InView>
          <SectionHeading
            eyebrow="传统求职黑洞 · THE BURNOUT TRAP"
            title="求职最耗人的不是面试，是机械重复的内耗"
            description="同一个岗位在各大平台来回切换，同一句招呼语打上千次，投完还要面对无休止的已读不回。这些无谓消耗生命的低效动作，早就该被彻底淘汰。"
          />
        </InView>

        {/* Counter 求职时间黑洞三维数据罗盘（丰富色彩冲击） */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:mt-16">
          {/* 红色警示 */}
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/25 via-[#1a111a] to-[#120b14] p-6 shadow-xl backdrop-blur-md">
            <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[10px] text-rose-300 font-semibold">
              TIME SINK
            </span>
            <p className="mt-3 font-mono text-xs text-white/70">每年机械式盯盘浪费</p>
            <div className="mt-2 flex items-baseline gap-1">
              <Counter value={365} fontSize={40} suffix="小时+" textColor="text-rose-400" />
            </div>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              相当于白白浪费整整 15 天不吃不眠的宝贵青春。
            </p>
          </div>

          {/* 紫罗兰科技 */}
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/25 via-[#171124] to-[#0f0a18] p-6 shadow-xl backdrop-blur-md">
            <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] text-purple-300 font-semibold">
              MANUAL TAPS
            </span>
            <p className="mt-3 font-mono text-xs text-white/70">手指麻木的无效点击</p>
            <div className="mt-2 flex items-baseline gap-1">
              <Counter value={2840} fontSize={40} suffix="次" textColor="text-accent" />
            </div>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              每一次“立即沟通”都在消耗本该用于技能提升的心力。
            </p>
          </div>

          {/* 琥珀金焦虑 */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/25 via-[#1d1612] to-[#120c0a] p-6 shadow-xl backdrop-blur-md">
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300 font-semibold">
              SILENT RATIO
            </span>
            <p className="mt-3 font-mono text-xs text-white/70">已读不回与沉底焦虑率</p>
            <div className="mt-2 flex items-baseline gap-1">
              <Counter value={92} fontSize={40} suffix="%" textColor="text-amber-400" />
            </div>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              通用格式简历千篇一律，在 HR 视线中停留不足 3 秒。
            </p>
          </div>
        </div>

        {/* 核心双栏：左侧 SpringCheck 淘汰清单 + 右侧 PaperCrumple 揉纸解压 */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 sm:mt-18 items-start">
          {/* 左侧：打叉淘汰清单 */}
          <div className="lg:col-span-7">
            <SpringCheck items={TRADITIONAL_FLAWS} />
          </div>

          {/* 右侧：揉碎旧简历实验室 */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-[#181324] via-[#120e1d] to-[#0d0916] p-6 shadow-2xl backdrop-blur-xl">
            <PaperCrumple />
          </div>
        </div>
      </div>
    </section>
  );
}
