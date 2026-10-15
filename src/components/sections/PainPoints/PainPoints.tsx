'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { Counter } from '@/components/effects/Counter';
import { SpringCheck, type SpringCheckItem } from '@/components/effects/SpringCheck';
import { PaperCrumple } from '@/components/effects/PaperCrumple';

const TRADITIONAL_FLAWS: SpringCheckItem[] = [
  {
    id: 'flaw-1',
    flaw: '同一个岗位在三个网站反复搜，每天机械刷新几十次',
    solution: '三大平台协同盯盘，新优质岗位第一时间捕捉',
    impact: '省下 90% 机械盯盘时间',
  },
  {
    id: 'flaw-2',
    flaw: '千篇一律复制粘贴招呼语，被当成垃圾广告已读不回',
    solution: '自带免费 AI，根据真实岗位智能组织真诚开场',
    impact: '回复率显著提升',
  },
  {
    id: 'flaw-3',
    flaw: '满屏培训机构、虚假外包与套路中介，防不胜防',
    solution: '智能排雷拦截，自动剔除黑名单与劣质企业',
    impact: '告别踩坑套路',
  },
  {
    id: 'flaw-4',
    flaw: '熬夜失眠焦虑盯进度，精神内耗严重',
    solution: '软件在后台安静巡航，有真正意向沟通才弹窗提醒',
    impact: '心态彻底放松',
  },
];

/**
 * PainPoints —— 痛点对比与场景叙事
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
            title="求职最耗人的不是面试，是机械重复的内耗"
            description="在各大平台之间反复横跳、千篇一律地复制粘贴、等来漫长的已读不回。与其把生命消耗在死板操作上，不如让技术替你承担枯燥，把精力留给真正重要的面试准备。"
          />
        </InView>

        {/* 时间黑洞三维数据罗盘 */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:mt-16">
          {/* 红色警示 */}
          <div className="rounded-2xl border border-rose-500/25 bg-gradient-to-b from-rose-950/20 via-[#181018] to-[#100a12] p-6 shadow-xl backdrop-blur-md">
            <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs text-rose-300 font-semibold">
              时间黑洞
            </span>
            <p className="mt-4 text-sm font-medium text-slate-200">每年机械式盯盘浪费</p>
            <div className="mt-2 flex items-baseline gap-1">
              <Counter value={365} fontSize={40} suffix="小时+" textColor="text-rose-400" />
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              相当于白白浪费半个月不吃不眠的宝贵青春。
            </p>
          </div>

          {/* 紫罗兰科技 */}
          <div className="rounded-2xl border border-purple-500/25 bg-gradient-to-b from-purple-950/20 via-[#161022] to-[#0e0916] p-6 shadow-xl backdrop-blur-md">
            <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-xs text-purple-300 font-semibold">
              机械疲劳
            </span>
            <p className="mt-4 text-sm font-medium text-slate-200">手指麻木的重复点击</p>
            <div className="mt-2 flex items-baseline gap-1">
              <Counter value={2840} fontSize={40} suffix="次" textColor="text-purple-400" />
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              每一次千篇一律的点击，都在空耗宝贵的心力。
            </p>
          </div>

          {/* 琥珀金焦虑 */}
          <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-b from-amber-950/20 via-[#1a1410] to-[#100a08] p-6 shadow-xl backdrop-blur-md">
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs text-amber-300 font-semibold">
              焦虑沉底
            </span>
            <p className="mt-4 text-sm font-medium text-slate-200">已读不回与沉底比例</p>
            <div className="mt-2 flex items-baseline gap-1">
              <Counter value={92} fontSize={40} suffix="%" textColor="text-amber-400" />
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              缺乏针对性的模板招呼，在 HR 屏幕上停留不足 3 秒。
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
