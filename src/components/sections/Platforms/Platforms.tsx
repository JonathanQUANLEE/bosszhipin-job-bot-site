'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface PlatformItem {
  id: string;
  name: string;
  enName: string;
  badge: string;
  colorName: string;
  borderClass: string;
  gradientClass: string;
  badgeClass: string;
  accentText: string;
  limit: string;
  desc: string;
  features: string[];
}

const PLATFORMS: PlatformItem[] = [
  {
    id: 'boss',
    name: 'BOSS直聘',
    enName: 'BOSS ZHIPIN',
    badge: '互联网 / 科技核心阵地',
    colorName: 'teal',
    borderClass: 'border-teal-500/30 hover:border-teal-400/60',
    gradientClass: 'bg-gradient-to-br from-teal-500/15 via-[#131a22] to-[#0d1017]',
    badgeClass: 'border-teal-500/40 bg-teal-500/15 text-teal-300',
    accentText: 'text-teal-400',
    limit: '每日上限 100 沟通',
    desc: '国内头部求职平台。针对最新在线活跃 HR 进行秒级意图匹配，支持打招呼前言定制与双向 JD 严筛。',
    features: ['优先匹配 2 小时内活跃招聘者', '支持意向薪资与通勤距离智能过滤', '拟人化随机延时 6s~14s 防封'],
  },
  {
    id: 'zhilian',
    name: '智联招聘',
    enName: 'ZHILIAN ZHAOPIN',
    badge: '国企 / 央企 / 综合大厂',
    colorName: 'blue',
    borderClass: 'border-blue-500/30 hover:border-blue-400/60',
    gradientClass: 'bg-gradient-to-br from-blue-500/15 via-[#111728] to-[#0c0f1c]',
    badgeClass: 'border-blue-500/40 bg-blue-500/15 text-blue-300',
    accentText: 'text-blue-400',
    limit: '每日上限 100 投递',
    desc: '全行业覆盖，国企、央企与头部名企汇聚。自动穿透复杂的招聘筛选层级，一键投递匹配度最高的目标职位。',
    features: ['全行业名企智能筛选', '自动识别黑名单公司与培训派遣', '多模态简历格式极速无损解析'],
  },
  {
    id: 'liepin',
    name: '猎聘网',
    enName: 'LIEPIN PRO',
    badge: '优质直推 / 猎头直连',
    colorName: 'amber',
    borderClass: 'border-amber-500/30 hover:border-amber-400/60',
    gradientClass: 'bg-gradient-to-br from-amber-500/15 via-[#221a14] to-[#14100c]',
    badgeClass: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
    accentText: 'text-amber-400',
    limit: '每日上限 60 直推',
    desc: '面向高薪研发与专家方向岗位，支持猎头沟通专用语境，自动过滤薪资不对口或招聘要求不符的企业。',
    features: ['高薪研发岗位专属过滤', '支持期望薪资硬性底线拦截', '保护个人隐私与现任企业屏蔽'],
  },
  {
    id: '51job',
    name: '前程无忧',
    enName: '51JOB SYSTEM',
    badge: '老牌实业 / 外资办事处',
    colorName: 'rose',
    borderClass: 'border-rose-500/30 hover:border-rose-400/60',
    gradientClass: 'bg-gradient-to-br from-rose-500/15 via-[#221319] to-[#150a0f]',
    badgeClass: 'border-rose-500/40 bg-rose-500/15 text-rose-300',
    accentText: 'text-rose-400',
    limit: '每日上限 80 申请',
    desc: '老牌成熟招聘平台，汇聚大量优质实体企业与外资办事处，提供高并发自动化批量巡航分发。',
    features: ['老牌外企岗位专属渠道', '自动填写结构化简历信息', '批量巡航状态毫秒级实时监控'],
  },
];

/**
 * Platforms —— 多平台支持矩阵
 *
 * 借鉴 grail-app.com 与 berd.xyz 丰富高对比度色彩：
 * 为四大平台赋予专属宝石级色彩（天青、宝蓝、琥珀金、玫瑰晶），彻底告别单调灰暗。
 */
export function Platforms() {
  const [activePlatform, setActivePlatform] = useState<string>(PLATFORMS[0]!.id);

  return (
    <section id="platforms" className="border-t border-line/60 py-20 sm:py-28 relative overflow-hidden bg-[#0d0a17]">
      {/* 渐变氛围晕光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[min(1000px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 blur-[130px]"
      />

      <div className="container-content relative">
        <InView>
          <SectionHeading
            eyebrow="多平台全网接管 · MULTI-PLATFORM ECOSYSTEM"
            title="一次意图配置，各大招聘平台同时开跑"
            description="每个平台的风控规则与操作动作完全不同 —— 软件已在底层彻底抹平所有复杂差异。你不用再每天在各个网站和手机 App 之间疲惫切换。"
            align="center"
          />
        </InView>

        {/* 四大平台独立专属色彩卡片网格 */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform) => {
            const isHovered = activePlatform === platform.id;

            return (
              <div
                key={platform.id}
                onMouseEnter={() => setActivePlatform(platform.id)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 shadow-xl backdrop-blur-xl ${
                  platform.gradientClass
                } ${platform.borderClass} ${
                  isHovered ? 'scale-[1.02] shadow-[0_12px_40px_rgba(0,0,0,0.5)]' : 'scale-100'
                }`}
              >
                <div>
                  {/* 顶栏 */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-[10px] text-white/50 tracking-wider">
                        {platform.enName}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-white tracking-wide">
                        {platform.name}
                      </h3>
                    </div>

                    <span className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold ${platform.badgeClass}`}>
                      {platform.limit}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {platform.desc}
                  </p>

                  {/* 特性清单 */}
                  <div className="mt-5 space-y-2.5">
                    {platform.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-white/90">
                        <CheckCircle2 size={14} className={`${platform.accentText} shrink-0 mt-0.5`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 底部保护状态 */}
                <div className="mt-6 border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[11px]">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck size={13} />
                    <span>0 驱动拟人反爬</span>
                  </span>
                  <span className={`${platform.accentText} flex items-center gap-1`}>
                    <Zap size={12} />
                    <span>就绪</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
