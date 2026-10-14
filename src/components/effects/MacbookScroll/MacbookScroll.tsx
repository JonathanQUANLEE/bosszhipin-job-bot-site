'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface MacbookScrollProps {
  src?: string;
  showGradient?: boolean;
  title?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Key —— MacBook 单个物理键帽
 */
const Key = ({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`rounded-[3px] bg-[#1a191f] text-[7px] text-white/70 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.6)] flex items-center justify-center font-mono select-none ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * SpeakerGrid —— MacBook 左右扬声器矩阵微孔
 */
const SpeakerGrid = () => {
  return (
    <div className="flex h-full flex-col justify-between py-1 opacity-25">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="flex gap-1">
          {Array.from({ length: 4 }).map((_, j) => (
            <div key={j} className="h-0.5 w-0.5 rounded-full bg-white" />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * Trackpad —— MacBook 触控板
 */
const Trackpad = () => {
  return (
    <div className="mx-auto my-1.5 h-16 w-32 rounded-lg border border-white/10 bg-[#16151a] shadow-inner sm:h-20 sm:w-44" />
  );
};

/**
 * Keyboard —— MacBook 拟真 C 面全键盘布局
 */
const Keyboard = ({ badge }: { badge?: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-full max-w-[820px] rounded-[10px] border border-white/10 bg-[#121116] p-2 sm:p-3 shadow-2xl">
      <div className="flex gap-3">
        {/* 左侧扬声器 */}
        <div className="hidden w-4 sm:block">
          <SpeakerGrid />
        </div>

        {/* 主键盘区 */}
        <div className="flex-1 space-y-1">
          {/* Row 1: Function Keys */}
          <div className="flex gap-1 h-3.5 sm:h-4">
            <Key className="w-6 sm:w-8">esc</Key>
            {['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((f) => (
              <Key key={f} className="flex-1">{f}</Key>
            ))}
            <Key className="w-6 sm:w-8">⌽</Key>
          </div>

          {/* Row 2: Numbers */}
          <div className="flex gap-1 h-4 sm:h-4.5">
            <Key className="w-5 sm:w-7">~</Key>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((n) => (
              <Key key={n} className="flex-1">{n}</Key>
            ))}
            <Key className="w-8 sm:w-11">delete</Key>
          </div>

          {/* Row 3: QWERTY */}
          <div className="flex gap-1 h-4 sm:h-4.5">
            <Key className="w-7 sm:w-9">tab</Key>
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'].map((k) => (
              <Key key={k} className="flex-1">{k}</Key>
            ))}
            <Key className="w-6 sm:w-8">\</Key>
          </div>

          {/* Row 4: ASDF */}
          <div className="flex gap-1 h-4 sm:h-4.5">
            <Key className="w-9 sm:w-11">caps</Key>
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"].map((k) => (
              <Key key={k} className="flex-1">{k}</Key>
            ))}
            <Key className="w-9 sm:w-11">return</Key>
          </div>

          {/* Row 5: ZXCV */}
          <div className="flex gap-1 h-4 sm:h-4.5">
            <Key className="w-11 sm:w-14">shift</Key>
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'].map((k) => (
              <Key key={k} className="flex-1">{k}</Key>
            ))}
            <Key className="w-11 sm:w-14">shift</Key>
          </div>

          {/* Row 6: Space & Modifiers */}
          <div className="flex gap-1 h-4 sm:h-4.5">
            <Key className="w-6 sm:w-8">fn</Key>
            <Key className="w-6 sm:w-8">control</Key>
            <Key className="w-6 sm:w-8">option</Key>
            <Key className="w-7 sm:w-9">command</Key>
            <Key className="flex-1" />
            <Key className="w-7 sm:w-9">command</Key>
            <Key className="w-6 sm:w-8">option</Key>
            <Key className="w-5 sm:w-7">◀</Key>
            <div className="flex flex-col gap-0.5 w-5 sm:w-7">
              <Key className="h-[7px] w-full">▲</Key>
              <Key className="h-[7px] w-full">▼</Key>
            </div>
            <Key className="w-5 sm:w-7">▶</Key>
          </div>
        </div>

        {/* 右侧扬声器 */}
        <div className="hidden w-4 sm:block">
          <SpeakerGrid />
        </div>
      </div>

      {/* 触控板与掌托 */}
      <div className="relative mt-2 flex items-center justify-between px-2">
        <div className="text-left">
          {badge ?? (
            <div className="hidden rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[8px] text-paper-dim sm:inline-block">
              <span className="text-accent">●</span> Tauri 2 • Python 3.12
            </div>
          )}
        </div>

        <Trackpad />

        <div className="hidden text-right font-mono text-[8px] text-paper-muted sm:inline-block">
          JobKoi Pro
        </div>
      </div>
    </div>
  );
};

export function MacbookScroll({
  badge,
  title,
  children,
}: MacbookScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const rotateX = useTransform(scrollYProgress, [0, 0.4], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.03, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-start overflow-hidden py-4 sm:py-8"
    >
      {/* 顶部标题区 */}
      {title && <div className="mb-6 w-full text-center z-10">{title}</div>}

      {/* 3D 透视工作台 */}
      <div className="relative w-full max-w-5xl px-2 sm:px-4 [perspective:1400px]">
        {/* 屏幕 A/B 面 */}
        <motion.div
          style={{
            rotateX: isMobile ? 0 : rotateX,
            scale: isMobile ? 1 : scale,
            y: isMobile ? 0 : y,
          }}
          className="relative mx-auto w-full max-w-[860px] origin-bottom rounded-[16px] border border-white/20 bg-[#0e0d12] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_80px_rgba(192,132,252,0.2)] sm:rounded-[22px] sm:p-3"
        >
          {/* 屏幕顶部摄像头刘海 */}
          <div className="absolute left-1/2 top-1.5 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/20 sm:block" />

          {/* 屏幕内部视口画布 */}
          <div className="relative h-[340px] sm:h-[460px] w-full overflow-hidden rounded-[10px] border border-white/10 bg-[#07060a] shadow-inner sm:rounded-[14px]">
            {children}
          </div>
        </motion.div>

        {/* 屏幕与机身之间的黑色铝合金铰链 */}
        <div className="mx-auto h-2.5 w-[38%] rounded-b-md bg-[#1d1b22] shadow-md sm:h-3.5" />

        {/* 电脑 C 面底座与键盘 */}
        <div className="relative mx-auto -mt-1 w-full max-w-[890px] rounded-b-[20px] rounded-t-[4px] border border-white/15 bg-gradient-to-b from-[#18171d] via-[#121116] to-[#0d0c10] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] sm:p-2.5">
          {/* 前置开盖凹槽 */}
          <div className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b-full bg-white/20 sm:w-20" />

          {/* 全键盘与触控板 */}
          <Keyboard badge={badge} />
        </div>

        {/* 底部柔和环境光晕阴影 */}
        <div className="mx-auto h-12 w-[88%] rounded-[50%] bg-accent/20 blur-2xl" />
      </div>
    </div>
  );
}
