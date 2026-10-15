'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, GitBranch } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface PulseHeartProps {
  initialCount?: number;
}

/**
 * PulseHeart —— GitHub 点 Star 心跳/星标动效（React Bits 核心组件定制版）
 *
 * 1. 响应用户专属要求：配置为 Star 星标图标；
 * 2. 点击触发心跳弹跳缩放物理（Beat & Overshoot）与数字 +1 自增；
 * 3. 联动引导前往 GitHub 仓库点亮真实的 Star 支持作者。
 */
export function PulseHeart({ initialCount = 1204 }: PulseHeartProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleStar = () => {
    if (!liked) {
      setLiked(true);
      setCount((prev) => prev + 1);
      // 适度延时联动打开 GitHub 仓库
      setTimeout(() => {
        window.open(siteConfig.github.repoUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    } else {
      setLiked(false);
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <motion.button
        onClick={toggleStar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className={`group flex items-center gap-3 rounded-full border px-5 py-2.5 transition-all shadow-xl backdrop-blur-xl ${
          liked
            ? 'border-amber-400/50 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 shadow-[0_0_24px_rgba(251,191,36,0.35)]'
            : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10'
        }`}
      >
        {/* 跳动的星标图标 */}
        <motion.div
          animate={
            liked
              ? {
                  scale: [1, 0.4, 1.45, 1],
                  rotate: [0, -15, 15, 0],
                }
              : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            liked ? 'bg-amber-400 text-black shadow-md' : 'text-paper-muted group-hover:text-amber-400'
          }`}
        >
          <Star size={16} fill={liked ? 'currentColor' : 'none'} />
        </motion.div>

        {/* 文字与滚轮计数值 */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-white">
            {liked ? '已点亮 Star · 感谢支持！' : '在 GitHub 点赞支持'}
          </span>
          <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-xs font-bold text-amber-400 border border-white/5">
            {count}
          </span>
        </div>

        <GitBranch size={16} className="text-slate-400 group-hover:text-purple-300 transition-colors" />
      </motion.button>
    </div>
  );
}
