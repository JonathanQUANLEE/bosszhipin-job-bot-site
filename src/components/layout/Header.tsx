'use client';

import { useState } from 'react';
import { GitBranch, Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

const NAV_ITEMS = [
  { label: '为什么', href: '#why' },
  { label: '它做什么', href: '#what' },
  { label: '三道闸门', href: '#gates' },
  { label: 'FAQ', href: '#faq' },
  { label: '开始使用', href: '#start' },
];

/** 固定在顶部的导航 —— 桌面端横排，移动端抽屉。 */
export function Header() {
  const [open, setOpen] = useState(false);

  const handleNav = (href: string) => {
    setOpen(false);
    // 让浏览器处理锚点滚动
    window.location.hash = href;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-base/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#top" className="font-display text-base text-paper sm:text-lg">
          {siteConfig.name}
        </a>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
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
        <div className="flex items-center gap-3">
          <Button
            href={siteConfig.github.repoUrl}
            variant="secondary"
            className="hidden !px-3 !py-2 sm:flex sm:!px-4"
          >
            <GitBranch size={16} aria-hidden />
            <span>Star</span>
          </Button>

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
        <div className="absolute inset-x-0 top-16 border-b border-line bg-base/95 backdrop-blur-xl md:hidden">
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
              href={siteConfig.github.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-accent hover:bg-surface"
            >
              <GitBranch size={16} aria-hidden />
              在 GitHub 上查看
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
