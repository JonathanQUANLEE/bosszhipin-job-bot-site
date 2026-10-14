'use client';

import dynamic from 'next/dynamic';
import { GitBranch, Sparkles, ArrowRight, Download } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HERO_BACKGROUND } from '@/config/effects';
import { Button } from '@/components/ui/Button';
import { DecryptedText } from '@/components/effects/DecryptedText';
import { HeroStatsDrawer } from './HeroStatsDrawer';

/**
 * Hero 背景特效。
 * 全站唯一 heavy 特效，已懒加载（ssr: false）；选型见 config/effects.ts 的 HERO_BACKGROUND。
 */
const BACKGROUNDS = {
  aurora: dynamic(() => import('@/components/effects/Aurora/Aurora'), {
    ssr: false,
    loading: () => null,
  }),
  beams: dynamic(() => import('@/components/effects/Beams/Beams'), {
    ssr: false,
    loading: () => null,
  }),
} as const;

const HeroBackground = BACKGROUNDS[HERO_BACKGROUND];

/**
 * Hero 区块。
 *
 * 表现层：WebGL 背景（Aurora / Beams 可切）+ DecryptedText（解密字效标题）
 * 内容层：tagline + description + CTA + HeroStatsDrawer 可折叠指标与走势抽屉
 */
export function Hero() {
  const repoUrl = siteConfig.github.repoUrl;

  return (
    <section id="top" className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-40 sm:pb-32">
      {/* 背景层 */}
      <HeroBackground />

      {/* 底部渐隐：让极光平滑过渡到下一个区块，避免硬切边 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-[#0b0914] sm:h-44"
      />

      <div className="container-content relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/15 via-[#ffcdff]/10 to-indigo-500/15 px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(192,132,252,0.15)]">
          <Sparkles size={14} className="text-[#ffcdff] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-white">开源 · 桌面原生 · 三大招聘平台全自动巡航</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <h1 className="max-w-4xl font-display text-4xl leading-[1.15] font-extrabold sm:text-6xl lg:text-7xl">
          <span className="block bg-gradient-to-r from-white via-[#f6f3ee] to-[#ffcdff] bg-clip-text text-transparent">
            <DecryptedText
              text={siteConfig.tagline}
              className="text-white"
              encryptedClassName="text-accent blur-[1px]"
            />
          </span>
          <span className="mt-2 block text-2xl font-normal text-white/80 sm:text-4xl lg:text-5xl font-sans">
            本地并发巡航，终结求职内耗
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:mt-8 sm:text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button
            href="https://jonathanquanlee.github.io/bosszhipin-job-bot-site/"
            className="w-full justify-center sm:w-auto"
          >
            <Sparkles size={18} aria-hidden />
            <span>线上免安装直接体验</span>
            <ArrowRight size={16} aria-hidden />
          </Button>

          <Button
            href={repoUrl}
            variant="secondary"
            className="w-full justify-center sm:w-auto"
          >
            <GitBranch size={18} aria-hidden />
            <span>GitHub 开源主仓</span>
          </Button>

          <Button
            href="#start"
            variant="secondary"
            className="w-full justify-center sm:w-auto text-slate-300"
          >
            <Download size={18} aria-hidden />
            <span>下载客户端 / 源码</span>
          </Button>
        </div>

        {/* 底部海投指标可折叠抽屉（支持折叠收起上屏、平滑揭晓深层战报） */}
        <HeroStatsDrawer />
      </div>
    </section>
  );
}
