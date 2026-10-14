'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitBranch, ChevronUp } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * FloatingPill —— 底部常驻毛玻璃呼吸药丸（借鉴 grail-app.com）
 *
 * 1. 呼吸态微绿光与实时巡航状态指示；
 * 2. 随页面滚动自适应吸附在屏幕底部居中；
 * 3. 集成 GitHub Star 快捷跳转与一键回顶/探索按钮；
 * 4. 极致毛玻璃拟物感（backdrop-blur-xl + 纤细发光边框）。
 */
export function FloatingPill() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const repoUrl = siteConfig.github.repoUrl;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 px-3"
      >
        <div className="flex items-center gap-3 rounded-full border border-white/12 bg-[#0c0a14]/85 px-4 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all hover:border-white/20 sm:gap-4 sm:px-5">
          {/* 实时状态指示 */}
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-paper-dim text-[11px] sm:text-xs">
              <span className="hidden sm:inline">本地巡航引擎就绪 · </span>
              <span className="text-emerald-400 font-medium">0 驱动隐身</span>
            </span>
          </div>

          <div className="h-3 w-px bg-white/10" />

          {/* GitHub 快速通道 */}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-paper transition-all hover:bg-white/12 sm:text-xs"
          >
            <GitBranch size={13} className="text-accent transition-transform group-hover:rotate-12" />
            <span>GitHub</span>
          </a>

          {/* 回顶或探索 */}
          {scrolled && (
            <button
              onClick={scrollToTop}
              title="回到顶部"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-paper-muted transition-colors hover:bg-white/10 hover:text-paper"
            >
              <ChevronUp size={14} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
