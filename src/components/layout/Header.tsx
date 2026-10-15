'use client';

import { useState } from 'react';
import { Star, Menu, X, Download } from 'lucide-react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { siteConfig } from '@/config/site';

const NAV_ITEMS = [
  { label: '核心优势', href: '#features' },
  { label: '场景对比', href: '#pain-points' },
  { label: '每日晨报', href: '#analytics' },
  { label: '极客档案', href: '#author' },
];

/**
 * 顶部导航 —— 极简苹果质感，高对比度，清晰直观。
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 30);
  });

  const repoUrl = siteConfig.github.repoUrl;

  const handleNav = (href: string) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#090710]/85 backdrop-blur-xl shadow-lg shadow-purple-950/20'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div
        className={`container-content flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-14' : 'h-16 sm:h-20'
        }`}
      >
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-accent text-white font-mono font-bold text-sm shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
            JK
          </span>
          <span className="font-bold text-lg text-white tracking-tight group-hover:text-purple-300 transition-colors">
            JobKoi <span className="font-normal text-slate-300 text-sm ml-1">锦鲤求职</span>
          </span>
        </a>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(item.href);
              }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 右侧操作区：Star 热度量化展示 + 免费下载按钮 */}
        <div className="flex items-center gap-3">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold transition-all shadow-sm hover:scale-105 group"
          >
            <Star size={13} className="text-amber-400 fill-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Star 3.2k</span>
          </a>

          <a
            href="#start"
            onClick={(e) => {
              e.preventDefault();
              handleNav('#start');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#090710] font-semibold text-xs transition-all shadow-md hover:scale-105"
          >
            <Download size={14} />
            <span>免费下载客户端</span>
          </a>

          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:text-white md:hidden"
            aria-label={open ? '关闭菜单' : '打开菜单'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 移动端抽屉 */}
      {open && (
        <div className="border-b border-white/10 bg-[#090710]/95 backdrop-blur-2xl md:hidden">
          <nav className="container-content flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#start"
              onClick={(e) => {
                e.preventDefault();
                handleNav('#start');
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black"
            >
              <Download size={16} />
              <span>免费下载 Windows 客户端</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
