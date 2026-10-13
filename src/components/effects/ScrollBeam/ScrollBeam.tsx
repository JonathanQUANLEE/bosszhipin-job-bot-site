'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/**
 * ScrollBeam —— 阅读进度光束。
 *
 * 固定在页面左侧的一条细线：随滚动进度自上而下填充薄荷绿渐变，
 * 前端带一个发光点，明确告诉读者「读到哪了」。
 *
 * 参考：Aceternity UI 的 Tracing Beam。
 * 技术：useScroll + useSpring（弹簧跟随，手感更顺）+ 纯 transform，零依赖。
 * 小屏隐藏（移动端没有悬停语义，且宽度宝贵）。
 */
export function ScrollBeam() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const dotTop = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-screen w-[2px] md:block"
    >
      {/* 轨道 */}
      <div className="absolute inset-0 bg-line" />

      {/* 进度填充 */}
      <motion.div
        style={{ scaleY: progress }}
        className="absolute inset-0 origin-top bg-gradient-to-b from-accent/70 via-accent to-accent"
      />

      {/* 前端发光点 */}
      <motion.div
        style={{
          top: dotTop,
          boxShadow: '0 0 14px 3px rgb(var(--color-accent-rgb) / 0.55)',
        }}
        className="absolute -left-[3px] h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
      />
    </div>
  );
}
