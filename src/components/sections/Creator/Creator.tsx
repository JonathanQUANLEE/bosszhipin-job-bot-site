'use client';

import React from 'react';
import { motion } from 'motion/react';
import { InView } from '@/components/effects/InView/InView';
import { GitBranch, Terminal, Shield, Star, Code2, Lock } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * Creator —— 极客档案（科幻神秘全息终端风格）
 */
export function Creator() {
  const repoUrl = siteConfig.github.repoUrl;

  return (
    <section id="author" className="border-t border-white/10 py-20 sm:py-32 relative overflow-hidden bg-[#07050e]">
      {/* 赛博网格与极客暗紫微光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f1a3a0a_1px,transparent_1px),linear-gradient(to_bottom,#1f1a3a0a_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[min(1100px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-purple-600/[0.06] blur-[150px]"
      />

      <div className="container-content relative z-10">
        <InView>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-medium text-purple-300 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Terminal size={13} className="text-purple-400" />
              <span>极客档案 · 执剑人宣言</span>
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              在冷血的算法面前，递上一把反抗的剑
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              这是一个由独立开发者发起并持续维护的开源项目。纯粹、透明、用技术守护每一位求职者的尊严。
            </p>
          </div>
        </InView>

        {/* 科幻全息终端卡片 */}
        <InView transition={{ delay: 0.1 }}>
          <div className="max-w-4xl mx-auto rounded-3xl border border-purple-500/30 bg-[#0d0a18]/90 p-6 sm:p-10 shadow-[0_0_60px_rgba(147,51,234,0.15)] backdrop-blur-2xl relative overflow-hidden">
            {/* 顶栏：终端状态指示 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider ml-1">
                  身份认证通过 · 核心开发者
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>加密级别：4096-BIT</span>
                <span className="text-purple-400">开源安全审计：已通过</span>
              </div>
            </div>

            {/* 主体内页：左右科幻解密 */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* 左侧：全息剪影名片与激光扫描 */}
              <div className="md:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-black/40 relative overflow-hidden group">
                {/* 激光扫描线上下浮动动效 */}
                <motion.div
                  animate={{ y: [0, 160, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_#c084fc] z-20"
                />

                {/* 头像全息光环 */}
                <div className="relative mb-4">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-accent/30 border border-purple-500/50 flex items-center justify-center font-mono text-2xl font-black text-white shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                    QL
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center">
                    <Shield size={11} className="text-white" />
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white tracking-wide">
                  Quentin Lee
                </h3>
                <p className="font-mono text-xs text-purple-300 mt-0.5">
                  @JonathanQUANLEE
                </p>
                <div className="mt-2.5 inline-block rounded-full bg-purple-500/15 border border-purple-500/30 px-3 py-0.5 text-[11px] text-purple-200">
                  逆向工程与自动化独立执剑人
                </div>

                <div className="mt-5 w-full pt-4 border-t border-white/5 flex flex-wrap justify-center gap-1.5 font-mono text-[10px]">
                  <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-slate-300">Tauri 2</span>
                  <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-slate-300">Python</span>
                  <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-slate-300">CDP 0-Driver</span>
                  <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-slate-300">Local AI</span>
                </div>
              </div>

              {/* 右侧：极客箴言与项目热度 */}
              <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
                {/* 箴言文本 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                    <Code2 size={14} />
                    <span>开发者留言</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    “我也曾经历过无数次海投、已读不回的心力交瘁。很多时候不是你不优秀，而是冰冷的平台算法在肆意消耗你。”
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    “与其被动接受算法的围剿，不如用技术武装自己。本项目永久开源免费，不搞广告，不割韭菜，数据零上云。把找工作的尊严，还给每一个值得尊敬的普通人。”
                  </p>
                </div>

                {/* 量化信赖指标 */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div className="rounded-xl p-3 bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Star size={14} className="fill-amber-400" />
                      <span className="font-bold text-sm">3,200+ 收藏</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">GitHub 全球开发者星标信赖</p>
                  </div>
                  <div className="rounded-xl p-3 bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Lock size={14} />
                      <span className="font-bold text-sm">100% 本地安全</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">代码全开源，接受全球审计</p>
                  </div>
                </div>

                {/* 行动按钮 */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-all shadow-lg shadow-purple-600/30 hover:scale-105"
                  >
                    <GitBranch size={14} />
                    <span>访问作者 GitHub 主页与开源仓库</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
