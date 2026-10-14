'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { GitBranch, Sparkles, Award } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * Lanyard —— 开发者 3D 物理可拽工牌（React Bits 核心组件）
 *
 * 1. 拟真织带挂绳与卡扣；
 * 2. 真实弹簧物理摆动与鼠标抓取拽动；
 * 3. 展现独立开源极客身份与可信赖感。
 */
export function Lanyard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 弹簧回弹物理
  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  // 旋转与透视跟随拽动位移
  const rotateZ = useTransform(springX, [-150, 150], [-25, 25]);
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-start h-[420px] w-full max-w-xs select-none"
    >
      {/* 顶部挂绳锚点 */}
      <div className="absolute top-0 z-20 flex flex-col items-center">
        <div className="h-2 w-8 rounded-full bg-white/30" />
        {/* 黑色尼龙织带 */}
        <div className="h-16 w-3 bg-gradient-to-b from-[#222] via-[#333] to-[#111] border-x border-white/10 shadow-sm" />
        {/* 金属卡扣 */}
        <div className="h-4 w-6 rounded-sm bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 shadow-md border border-white/30" />
        {/* 金属挂钩环 */}
        <div className="h-3 w-4 rounded-b-full border-2 border-zinc-300 border-t-0" />
      </div>

      {/* 悬挂的实体工牌卡片（可鼠标拽动甩荡） */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -40, bottom: 80 }}
        dragElastic={0.6}
        style={{
          x: springX,
          y: springY,
          rotateZ,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        whileHover={{ scale: 1.02 }}
        className="relative top-20 z-10 w-64 cursor-grab rounded-2xl border border-white/20 bg-gradient-to-b from-[#1c192b] via-[#141221] to-[#0d0b17] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgb(var(--color-accent-rgb)/0.15)] backdrop-blur-2xl text-left"
      >
        {/* 工牌顶部穿绳孔 */}
        <div className="mx-auto -mt-2 mb-3 h-2 w-10 rounded-full bg-black/60 border border-white/20 shadow-inner" />

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <Award size={14} className="text-accent" />
            <span className="font-mono text-[10px] font-bold text-accent uppercase tracking-widest">
              DEVELOPER PASS
            </span>
          </div>
          <span className="font-mono text-[9px] text-paper-muted">#0001</span>
        </div>

        {/* 开发者信息 */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 border border-accent/40 font-mono text-base font-bold text-white shadow-inner">
            JQ
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate">
              JonathanQUANLEE
            </h4>
            <p className="text-[11px] font-mono text-paper-dim truncate">
              Quentinlee · 开源独立创作者
            </p>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-paper-dim">
          专注本地优先架构、0-Driver 反指纹风控机制与大模型多模态应用研发。
        </p>

        {/* 底部条形码与标签 */}
        <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5 h-4 opacity-50">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-white ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-0.5' : 'w-px'}`}
                />
              ))}
            </div>
            <span className="font-mono text-[8px] text-paper-muted">
              JOBKOI-VERIFIED-CREATOR
            </span>
          </div>

          <a
            href={siteConfig.github.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-paper hover:bg-accent/20 hover:text-accent transition-colors"
          >
            <GitBranch size={10} />
            <span>GitHub</span>
          </a>
        </div>

        {/* 底部抓拽提示 */}
        <div className="mt-2 text-center font-mono text-[9px] text-accent/70 flex items-center justify-center gap-1">
          <Sparkles size={9} />
          <span>支持鼠标拽动甩晃</span>
        </div>
      </motion.div>
    </div>
  );
}
