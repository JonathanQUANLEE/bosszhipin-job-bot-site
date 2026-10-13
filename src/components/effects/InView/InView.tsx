/**
 * InView — 滚动进场动效封装。
 *
 * 统一所有 section 的滚动揭示行为：
 * 元素进入视口 1/4 时触发，只触发一次。
 *
 * ⚠️ 兜底：根节点带 `data-inview` 属性，供 globals.css 的
 * 「prefers-reduced-motion」与 layout 的 `<noscript>` 覆盖使用 ——
 * 保证动画不可用时内容依然可见（见 docs/PERFORMANCE.md 双层结构）。
 *
 * 依赖：motion（已安装）
 */

'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { FADE_UP, VIEWPORT } from '@/config/motion';
import type { ReactNode } from 'react';

interface InViewProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** 自定义进场动画，默认 FADE_UP */
  variants?: typeof FADE_UP;
}

export function InView({ children, variants = FADE_UP, ...props }: InViewProps) {
  return (
    <motion.div
      data-inview=""
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}
