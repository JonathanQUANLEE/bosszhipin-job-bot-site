'use client';

import React from 'react';
import { InView } from '@/components/effects/InView/InView';
import { Layers, Sparkles, ShieldCheck, Lock, CheckCircle2, MessageSquare } from 'lucide-react';

/** 卡片 1：三大平台后台协同跑 */
function PlatformsBentoCard() {
  return (
    <div className="lg:col-span-7 flex flex-col">
      <InView transition={{ delay: 0.1 }}>
        <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#141022] to-[#0c0915] p-7 sm:p-9 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 mb-6">
              <Layers size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              三大主流平台，后台同时跑
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              深度聚合 BOSS 直聘、猎聘、前程无忧。一次说清你的求职期望，软件自动在三大平台后台巡航寻找合适岗位，再也不用在网页之间来回切。
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-white">BOSS 直聘</span>
              </div>
              <span className="text-xs text-slate-400">活跃巡航中 · 智能意图匹配</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-white">猎聘网</span>
              </div>
              <span className="text-xs text-slate-400">中高端岗位 · 猎头直聘严选</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-white">前程无忧 51Job</span>
              </div>
              <span className="text-xs text-slate-400">综合名企 · 全网优质机会聚合</span>
            </div>
          </div>
        </div>
      </InView>
    </div>
  );
}

/** 卡片 2：自带免费 AI，真诚打招呼 */
function AiGreetingBentoCard() {
  return (
    <div className="lg:col-span-5 flex flex-col">
      <InView transition={{ delay: 0.15 }}>
        <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#161026] to-[#0d0a18] p-7 sm:p-9 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 mb-6">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              自带免费 AI，拒绝冰冷套路
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              作者直接为大家买单提供大模型，完全不需要自己花钱买 Key。根据你的真实简历与目标岗位，生成真诚、自然的第一句问候，大幅提高回复率。
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={14} className="text-purple-300" />
                <span className="text-xs font-semibold text-purple-200">为你量身定制的招呼语</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                “您好！看到贵团队正在招聘相关岗位，我的背景与岗位职责高度契合，特别是在实际项目落地方面有深入积累。方便与您进一步沟通交流吗？”
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 size={14} />
                <span>已对齐岗位关键词 · 告别生硬群发</span>
              </div>
            </div>
          </div>
        </div>
      </InView>
    </div>
  );
}

/** 卡片 3：安全避坑与本地隐私 */
function SecurityPrivacyBentoCard() {
  return (
    <div className="lg:col-span-12">
      <InView transition={{ delay: 0.2 }}>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#131020] via-[#0f0c1a] to-[#0a0814] p-7 sm:p-9 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                智能排雷避坑，像真人一样稳妥
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                求职路上陷阱多。软件会自动识别并过滤掉培训机构、虚假招聘、外包派遣公司与用户自定义黑名单，绝不浪费你的宝贵精力。
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>自动过滤培训贷机构</span>
                </span>
                <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>屏蔽外包中介与假招聘</span>
                </span>
                <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>真人微延时浏览，防封号</span>
                </span>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                所有数据 100% 存在你的电脑
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                你的简历、登录状态与沟通记录全部只保存在你自己电脑的私有数据库中。绝不上传到任何云端服务器，没有任何泄露风险。
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-sky-400" />
                  <span>零服务器收集，保护隐私</span>
                </span>
                <span className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-sky-400" />
                  <span>纯净开源，接受公开审计</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </InView>
    </div>
  );
}

/**
 * Features —— 核心优势（极简苹果风三卡 Bento，重叙事、轻技术）
 */
export function Features() {
  return (
    <section id="features" className="border-t border-white/10 py-20 sm:py-32 relative overflow-hidden bg-[#090710]">
      {/* 柔和暗紫微光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-purple-600/[0.05] blur-[140px]"
      />

      <div className="container-content relative z-10">
        <InView>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              简单直观，把找工作变成一件轻松的事
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              无需理解复杂的计算机术语。只要打开软件，它就像一位默默无闻的助手，在后台替你完成所有枯燥琐碎的机械操作。
            </p>
          </div>
        </InView>

        {/* 苹果式三大核心卡片 Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          <PlatformsBentoCard />
          <AiGreetingBentoCard />
          <SecurityPrivacyBentoCard />
        </div>
      </div>
    </section>
  );
}
