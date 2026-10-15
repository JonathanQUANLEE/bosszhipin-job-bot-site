'use client';

import dynamic from 'next/dynamic';
import { GitBranch, Sparkles, Download } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HERO_BACKGROUND } from '@/config/effects';
import { Button } from '@/components/ui/Button';
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
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(192,132,252,0.12)]">
          <Sparkles size={14} className="text-purple-300 animate-pulse" />
          <span className="text-xs font-medium text-purple-200">开源纯净 · 保护隐私 · 彻底终结手动海投内耗</span>
        </div>

        <h1 className="max-w-4xl font-display text-4xl leading-[1.15] font-extrabold sm:text-6xl lg:text-7xl text-white">
          <span>别再把时间</span>
          <br />
          <span className="bg-gradient-to-r from-purple-200 via-white to-indigo-200 bg-clip-text text-transparent">
            浪费在手动海投上了
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-8 sm:text-lg">
          三大招聘平台后台自动帮你盯盘、筛选优质岗位、真诚打招呼。自带免费 AI，不花一分钱，保护个人隐私，把找工作的尊严还给自己。
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <Button
            href="https://github.com/JonathanQUANLEE/JobKoi-AI/releases/latest"
            className="w-full justify-center sm:w-auto text-base !px-7 !py-3.5 shadow-xl shadow-purple-950/40 hover:scale-105 transition-all"
          >
            <Download size={18} aria-hidden />
            <span>免费下载 Windows 客户端</span>
          </Button>

          <Button
            href={repoUrl}
            variant="secondary"
            className="w-full justify-center sm:w-auto text-base !px-6 !py-3.5 hover:scale-105 transition-all"
          >
            <GitBranch size={18} aria-hidden />
            <span>在 GitHub 关注项目 · 3.2k</span>
          </Button>
        </div>

        {/* 底部海投指标可折叠抽屉（支持折叠收起上屏、平滑揭晓深层战报） */}
        <HeroStatsDrawer />
      </div>
    </section>
  );
}
