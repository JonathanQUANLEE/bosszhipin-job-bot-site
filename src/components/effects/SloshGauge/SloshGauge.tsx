'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';
import { Zap } from 'lucide-react';

/**
 * SloshGauge —— 科技流体阻尼能量计（React Bits 核心组件）
 *
 * 1. 随全站滚动实时填充紫光荧光能量液位；
 * 2. 结合滚动速度（Velocity）驱动波浪倾斜与阻尼回弹晃荡；
 * 3. 悬浮在屏幕右侧，提供直观的科技充能感。
 */
export function SloshGauge() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 200, damping: 30 });

  // 倾斜与晃荡角度（基于滚动速度）
  const sloshAngle = useTransform(smoothVelocity, [-1, 1], [-18, 18]);

  // 高度百分比
  const fillHeight = useTransform(smoothProgress, [0, 1], ['4%', '100%']);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [smoothProgress]);

  return (
    <div
      aria-hidden
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 select-none xl:flex"
    >
      <span className="font-mono text-[9px] font-semibold text-accent/80 tracking-widest">
        PWR
      </span>

      {/* 玻璃试管容器 */}
      <div className="relative flex h-44 w-6 flex-col justify-end overflow-hidden rounded-full border border-white/15 bg-black/40 p-0.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
        {/* 顶部高光刻度线 */}
        <div className="pointer-events-none absolute inset-x-1 top-2 h-px bg-white/20" />
        <div className="pointer-events-none absolute inset-x-2 top-8 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-1 top-14 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-2 top-20 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-1 top-26 h-px bg-white/10" />

        {/* 能量液体主体 */}
        <motion.div
          style={{ height: fillHeight }}
          className="relative w-full rounded-full bg-gradient-to-t from-purple-800 via-accent to-purple-400 shadow-[0_0_16px_rgb(var(--color-accent-rgb)/0.6)]"
        >
          {/* 液面晃荡波浪头 */}
          <motion.div
            style={{ rotate: sloshAngle }}
            className="absolute -top-1 left-[-20%] h-3 w-[140%] rounded-[50%] bg-white/40 blur-[1px]"
          />
        </motion.div>

        {/* 玻璃反光条 */}
        <div className="pointer-events-none absolute inset-y-2 left-1 w-0.5 rounded-full bg-white/20" />
      </div>

      {/* 充能百分比 */}
      <div className="flex items-center gap-0.5 font-mono text-[10px] text-paper-dim">
        <Zap size={10} className="text-accent" />
        <span>{percent}%</span>
      </div>
    </div>
  );
}
