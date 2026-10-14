'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, FolderOpen, Send, Sparkles } from 'lucide-react';

interface FolderFloatProps {
  items?: string[];
  label?: string;
  sublabel?: string;
}

const DEFAULT_ITEMS = [
  '腾讯科技 · AI Agent 实习',
  '字节跳动 · 大模型后端',
  '阿里巴巴 · 架构平台',
  '美团 · 推荐算法工程师',
  '快手 · 全栈开发 (深圳)',
  '商汤科技 · 计算机视觉',
];

/**
 * FolderFloat —— 零重力简历漂浮云（React Bits 核心组件）
 *
 * 1. 拟真 3D 文件夹，点击掀起翻盖；
 * 2. 文件夹内向外迸发出虚拟简历胶囊云，悬浮漂移；
 * 3. 视觉象征多平台全自动并发分发。
 */
export function FolderFloat({
  items = DEFAULT_ITEMS,
  label = '全自动多路巡航简历云',
  sublabel = '点击展开查看并发分发状态',
}: FolderFloatProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 为每个胶囊分配散开的坐标与角度
  const PILL_OFFSETS = [
    { x: -160, y: -90, rotate: -6 },
    { x: 160, y: -100, rotate: 8 },
    { x: -190, y: -20, rotate: -4 },
    { x: 190, y: -30, rotate: 6 },
    { x: -130, y: 50, rotate: -2 },
    { x: 130, y: 40, rotate: 4 },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-8 select-none">
      {/* 散开的虚拟简历胶囊云 */}
      <AnimatePresence>
        {isOpen && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {items.map((item, i) => {
              const offset = PILL_OFFSETS[i % PILL_OFFSETS.length] ?? { x: 0, y: -80, rotate: 0 };

              return (
                <motion.div
                  key={item}
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
                  animate={{
                    x: offset.x,
                    y: [offset.y, offset.y - 8, offset.y],
                    rotate: offset.rotate,
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 20,
                    delay: i * 0.05,
                    y: {
                      repeat: Infinity,
                      duration: 3 + i * 0.4,
                      ease: 'easeInOut',
                    },
                  }}
                  className="pointer-events-auto absolute flex items-center gap-1.5 rounded-full border border-accent/40 bg-[#161424]/90 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(167,139,250,0.25)] backdrop-blur-md cursor-pointer hover:border-accent hover:scale-105 transition-transform"
                >
                  <Send size={11} className="text-accent" />
                  <span className="font-mono text-xs text-paper whitespace-nowrap">
                    {item}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* 核心文件夹主体 */}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative z-10 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-[#22202c] via-[#1a1824] to-[#12111c] px-8 py-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-inner transition-transform group-hover:scale-110">
          {isOpen ? <FolderOpen size={26} /> : <Folder size={26} />}
        </div>

        <h4 className="mt-3 font-display text-sm font-semibold text-paper tracking-wide">
          {label}
        </h4>

        <p className="mt-1 font-mono text-[11px] text-paper-muted flex items-center gap-1">
          <Sparkles size={11} className="text-accent" />
          <span>{isOpen ? '点击收起' : sublabel}</span>
        </p>

        {/* 文件夹翻盖指示线 */}
        <div className="mt-3 h-1 w-16 rounded-full bg-accent/30" />
      </motion.div>
    </div>
  );
}
