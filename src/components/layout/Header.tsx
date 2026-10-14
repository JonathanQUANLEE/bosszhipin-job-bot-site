'use client';

import { useState } from 'react';
import { GitBranch, Menu, X, Globe } from 'lucide-react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

const NAV_ITEMS = [
  { label: '走势晨报', href: '#analytics' },
  { label: '痛点对比', href: '#pain-points' },
  { label: '支持平台', href: '#platforms' },
  { label: '核心功能', href: '#features' },
  { label: '安全风控', href: '#safety' },
  { label: '极客背书', href: '#author' },
  { label: '开启体验', href: '#start' },
];

/**
 * 固定在顶部的导航 —— 桌面端横排，移动端抽屉。
 *
 * 滚动超过 40px 后自动「收缩 + 加强毛玻璃」（参考 Aceternity 的 Resizable Navbar），
 * 让内容区获得更多可视面积。
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40);
  });

  const repoUrl = siteConfig.github.repoUrl;
  const published = siteConfig.release.published && Boolean(repoUrl);

  const handleNav = (href: string) => {
    setOpen(false);
    window.location.hash = href;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-line bg-base/95 backdrop-blur-xl shadow-lg shadow-purple-950/10'
          : 'border-transparent bg-base/50 backdrop-blur-md'
      }`}
    >
      <div
        className={`container-content flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-2 font-display text-base text-paper sm:text-lg group">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent via-purple-500 to-indigo-600 text-white font-mono font-bold text-xs shadow-md shadow-purple-500/30">
            JK
          </span>
          <span className="font-bold tracking-tight text-white group-hover:text-accent transition-colors">
            JobKoi AI
          </span>
          <span className="hidden sm:inline-block rounded border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
            Tauri 2
          </span>
        </a>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-paper-dim transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://jonathanquanlee.github.io/bosszhipin-job-bot-site/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono font-medium transition-all shadow-sm"
          >
            <Globe size={13} className="animate-spin" style={{ animationDuration: '10s' }} />
            <span>成熟线上站</span>
          </a>

          {published ? (
            <Button href={repoUrl} variant="secondary" className="hidden !px-3 !py-2 sm:flex sm:!px-4">
              <GitBranch size={16} aria-hidden />
              <span>Star</span>
            </Button>
          ) : (
            <span className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-mono text-xs text-paper-muted sm:flex">
              <GitBranch size={14} aria-hidden />
              {siteConfig.release.badge}
            </span>
          )}

          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-paper-dim transition-colors hover:text-accent md:hidden"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 移动端全屏抽屉 */}
      {open && (
        <div
          className={`absolute inset-x-0 border-b border-line bg-base/95 backdrop-blur-xl transition-[top] duration-300 md:hidden ${
            scrolled ? 'top-14' : 'top-16'
          }`}
        >
          <nav className="container-content flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className="rounded-lg px-4 py-3 text-sm text-paper-dim transition-colors hover:bg-surface hover:text-accent"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://jonathanquanlee.github.io/bosszhipin-job-bot-site/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-500/25 transition-all shadow-sm"
            >
              <Globe size={16} />
              <span>成熟线上站（免安装直接体验）</span>
            </a>

            {published ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-accent hover:bg-white/10"
              >
                <GitBranch size={16} aria-hidden />
                <span>在 GitHub 上查看</span>
              </a>
            ) : (
              <span className="mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs text-paper-muted">
                <GitBranch size={16} aria-hidden />
                {siteConfig.release.badge}
              </span>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
