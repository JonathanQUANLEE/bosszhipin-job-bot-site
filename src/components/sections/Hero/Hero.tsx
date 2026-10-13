'use client';

import dynamic from 'next/dynamic';
import { GitBranch, Sparkles, ArrowRight, Download } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HERO_BACKGROUND } from '@/config/effects';
import { Button } from '@/components/ui/Button';
import { DecryptedText } from '@/components/effects/DecryptedText';
import { AnimatedNumber } from '@/components/effects/AnimatedNumber/AnimatedNumber';

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
 * 内容层：tagline + description + CTA + 统计数字
 *
 * CTA 会根据 `siteConfig.release.published` 切换主次：
 * 未发布时主 CTA = 「它怎么工作」，GitHub 入口降级为不可点的「即将开源」占位。
 */
export function Hero() {
  const repoUrl = siteConfig.github.repoUrl;
  const published = siteConfig.release.published && Boolean(repoUrl);

  return (
    <section id="top" className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-40 sm:pb-32">
      {/* 背景层 */}
      <HeroBackground />

      {/* 底部渐隐：让极光平滑过渡到下一个区块，避免硬切边 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-base sm:h-44"
      />

      <div className="container-content relative z-10">
        <p className="label-mono mb-6 text-accent">
          开源 · 桌面应用 · 三大招聘平台
        </p>

        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] text-paper sm:text-5xl lg:text-6xl">
          <DecryptedText
            text={siteConfig.tagline}
            className="text-paper"
            encryptedClassName="text-accent blur-[1px]"
          />
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper-dim sm:mt-8 sm:text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {published ? (
            <Button href={repoUrl} className="w-full justify-center sm:w-auto">
              <GitBranch size={18} aria-hidden />
              <span>在 GitHub 上查看</span>
            </Button>
          ) : (
            <Button href="#what" className="w-full justify-center sm:w-auto">
              <Sparkles size={18} aria-hidden />
              <span>它怎么工作</span>
              <ArrowRight size={16} aria-hidden />
            </Button>
          )}

          <Button
            href={published ? '#start' : undefined}
            variant="secondary"
            disabled={!published}
            className="w-full justify-center sm:w-auto"
          >
            {published ? (
              <>
                <Download size={18} aria-hidden />
                <span>下载桌面版</span>
              </>
            ) : (
              <>
                <GitBranch size={18} aria-hidden />
                <span>{siteConfig.release.badge}</span>
              </>
            )}
          </Button>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:mt-20 sm:gap-x-8 sm:gap-y-10 sm:pt-10 sm:grid-cols-4">
          {siteConfig.stats.map(stat => (
            <div key={stat.label}>
              <dt className="label-mono mb-2 text-paper-muted">{stat.label}</dt>
              <dd className="font-mono text-2xl text-paper sm:text-3xl lg:text-4xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix ?? ''} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
