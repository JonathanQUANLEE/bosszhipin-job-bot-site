'use client';

import dynamic from 'next/dynamic';
import { GitBranch, Download } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HERO_BACKGROUND } from '@/config/effects';
import { Button } from '@/components/ui/Button';
import { useSmartDownload } from '@/hooks/use-smart-download';
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
 * 表现层：极简苹果叙事风格 + WebGL 柔和极光背景
 * 内容层：温情故事叙事 + 核心行动 CTA + 指标折叠抽屉
 */
export function Hero() {
  const repoUrl = siteConfig.github.repoUrl;
  const smartDownload = useSmartDownload();

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
        <h1 className="max-w-4xl font-display text-4xl leading-[1.15] font-extrabold sm:text-6xl lg:text-7xl text-white">
          不要一个人在海投了
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-8 sm:text-lg">
          无数个疲惫的深夜，面对成百上千个岗位与石沉大海的已读不回，找工作不该是一场消耗自尊的机械重复。JobKoi 替你穿过算法的喧嚣，全天候甄选真实机会、真诚沟通，把时间留给生活与真正的面试。
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <Button
            href="#start"
            onClick={(e) => {
              e.preventDefault();
              void smartDownload('exe');
            }}
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
