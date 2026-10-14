'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { FlipCard } from '@/components/effects/FlipCard';
import { SpotlightCard } from '@/components/effects/SpotlightCard/SpotlightCard';
import { Lanyard } from '@/components/effects/Lanyard';
import { GitBranch, Terminal, Code, Cpu, Award, Globe } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * Creator —— 极客背书、底层解密与开发者名片
 *
 * 采用 3 列均衡架构：
 * 1. 3D FlipCard：系统架构与反爬穿透双面翻转解密；
 * 2. SpotlightCard：作者极客名片与开源精神宣言；
 * 3. Lanyard：3D 物理可拽工牌体验区。
 *
 * 彻底消除元素挤压坍缩，保持充裕的视觉呼吸感与响应式平衡。
 */
export function Creator() {
  return (
    <section id="author" className="border-t border-line py-16 sm:py-28 relative overflow-hidden bg-[#0a0912]">
      {/* 渐变暗紫光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[min(1000px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-accent/[0.06] blur-[140px]"
      />

      <div className="container-content relative z-10">
        <InView>
          <SectionHeading
            eyebrow="极客背书 · CREATOR & COMMUNITY"
            title="纯粹、开源、为求职者尊严而战"
            description="这是一个由独立开发者发起并持续维护的开源项目。没有流氓广告，没有隐私上传，每一行代码都经得起公开审计。"
            align="center"
          />
        </InView>

        {/* 3 列均衡布局 */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {/* 第 1 列：3D FlipCard 架构解密卡片 */}
          <div className="flex flex-col items-center w-full">
            <InView transition={{ delay: 0.1 }}>
              <div className="w-full flex flex-col items-center">
                <div className="mb-2 w-full flex items-center justify-between text-xs font-mono text-paper-muted">
                  <span className="flex items-center gap-1.5 text-accent font-semibold">
                    <Cpu size={14} />
                    <span>01 / 架构双面解密</span>
                  </span>
                  <span>点击卡片 3D 翻转</span>
                </div>
                <FlipCard />
              </div>
            </InView>
          </div>

          {/* 第 2 列：SpotlightCard 聚光灯名片 */}
          <div className="flex flex-col items-center w-full">
            <InView transition={{ delay: 0.2 }}>
              <div className="w-full h-full flex flex-col justify-between">
                <div className="mb-2 flex items-center justify-between text-xs font-mono text-paper-muted">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Code size={14} />
                    <span>02 / 创作者名片</span>
                  </span>
                  <span>开源独立开发者</span>
                </div>

                <SpotlightCard className="w-full h-[450px] rounded-3xl border border-white/10 bg-[#12111d] p-6 shadow-2xl backdrop-blur-xl text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 border border-accent/40 font-mono text-lg font-bold text-white shadow-inner">
                          QL
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">
                            JonathanQUANLEE
                          </h3>
                          <p className="font-mono text-xs text-paper-muted">
                            Quentinlee · 项目作者
                          </p>
                        </div>
                      </div>

                      <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] text-emerald-400 font-semibold border border-emerald-500/30">
                        开源维护者
                      </span>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-paper-dim">
                      “我们也是从海投和已读不回的泥潭里走过来的。与其把时间浪费在机械点击上，不如让技术武装求职者，专注打磨作品与面试。”
                    </p>

                    <div className="mt-4 space-y-2 text-xs font-mono text-paper-muted">
                      <div className="flex items-center gap-2">
                        <Terminal size={13} className="text-accent" />
                        <span className="text-white">核心技术栈：</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-paper">Tauri 2 (Rust)</span>
                        <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-paper">Python 3.12</span>
                        <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-paper">Nodriver CDP</span>
                        <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-paper">React 19</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-2">
                    <a
                      href="https://jonathanquanlee.github.io/bosszhipin-job-bot-site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-3 py-1.5 font-mono text-xs text-emerald-300 hover:bg-emerald-500/30 transition-colors border border-emerald-500/40"
                    >
                      <Globe size={13} className="text-emerald-400" />
                      <span>线上直接体验</span>
                    </a>

                    <a
                      href={siteConfig.github.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 font-mono text-xs text-white hover:bg-white/20 transition-colors border border-white/15"
                    >
                      <GitBranch size={13} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </SpotlightCard>
              </div>
            </InView>
          </div>

          {/* 第 3 列：3D 物理可拽工牌舞台 */}
          <div className="flex flex-col items-center w-full">
            <InView transition={{ delay: 0.3 }}>
              <div className="w-full h-full flex flex-col justify-between">
                <div className="mb-2 flex items-center justify-between text-xs font-mono text-paper-muted">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Award size={14} />
                    <span>03 / 物理互动工牌</span>
                  </span>
                  <span>可鼠标拖拽甩动</span>
                </div>

                <div className="w-full h-[450px] rounded-3xl border border-white/10 bg-gradient-to-b from-[#141222] to-[#0c0a15] p-4 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
                  {/* 工牌背景微光 */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-radial from-accent/10 to-transparent"
                  />
                  <Lanyard />
                </div>
              </div>
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
}
