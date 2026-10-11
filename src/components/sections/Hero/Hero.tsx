import { ArrowRight, GitBranch, Monitor } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

/**
 * Hero 区块。
 *
 * 这里是全站唯一允许放 WebGL 背景的地方（React Bits `Beams`，见 EFFECT_REGISTRY）。
 * 当前为骨架版：先保证内容层 SSR 直出、无特效也完整可读，
 * 特效后续按 PERFORMANCE.md 的分批策略接入。
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container-content">
        <p className="label-mono mb-6 text-accent">开源 · MIT · 桌面应用</p>

        <h1 className="max-w-3xl font-display text-4xl leading-[1.15] text-paper sm:text-6xl">
          {siteConfig.tagline}
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper-dim sm:text-lg">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={siteConfig.github.repoUrl}>
            <GitBranch size={18} aria-hidden />
            <span>在 GitHub 上查看</span>
          </Button>
          <Button href="#start" variant="secondary">
            <Monitor size={18} aria-hidden />
            <span>下载桌面版</span>
            <ArrowRight size={16} aria-hidden />
          </Button>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="label-mono mb-2 text-paper-muted">{stat.label}</dt>
              <dd className="font-mono text-3xl text-paper sm:text-4xl">
                {stat.value}
                {stat.suffix ?? ''}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
