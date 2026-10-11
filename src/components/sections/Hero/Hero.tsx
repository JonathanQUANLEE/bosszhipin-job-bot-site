'use client';

import dynamic from 'next/dynamic';
import { GitBranch, Monitor, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { DecryptedText } from '@/components/effects/DecryptedText';
import { AnimatedNumber } from '@/components/effects/AnimatedNumber/AnimatedNumber';

const BeamsLazy = dynamic(() => import('@/components/effects/Beams/Beams'), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero 区块。
 *
 * 表现层：Beams（WebGL 光带背景）+ DecryptedText（解密字效标题）
 * 内容层：tagline + description + CTA + 统计数字
 *
 * ⚠️ Beams 是全站唯一 heavy WebGL 特效，已懒加载（ssr: false）。
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-40 sm:pb-32">
      {/* 背景层 */}
      <BeamsLazy />

      <div className="container-content relative z-10">
        <p className="label-mono mb-6 text-accent">开源 · MIT · 桌面应用</p>

        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] text-paper sm:text-5xl lg:text-6xl">
          <DecryptedText
            text={siteConfig.tagline}
            className="text-paper"
            encryptedClassName="text-accent blur-[1px]"
          />
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper-dim sm:mt-8 sm:text-base sm:text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button href={siteConfig.github.repoUrl} className="w-full justify-center sm:w-auto">
            <GitBranch size={18} aria-hidden />
            <span>在 GitHub 上查看</span>
          </Button>
          <Button href="#start" variant="secondary" className="w-full justify-center sm:w-auto">
            <Monitor size={18} aria-hidden />
            <span>下载桌面版</span>
            <ArrowRight size={16} aria-hidden />
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
