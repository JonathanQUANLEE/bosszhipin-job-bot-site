'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Cpu, Zap, Lock, Terminal, Radio, CheckCircle2 } from 'lucide-react';

const TECH_TAGS = [
  { text: '0 驱动底层无痕反爬', icon: Shield },
  { text: 'AI 岗位意图精准对齐', icon: Sparkles },
  { text: '6s~14s 拟人化随机延时', icon: Zap },
  { text: 'Tauri 2 + Python 3.12 原生极客架构', icon: Cpu },
  { text: '多平台多路并发巡航', icon: Radio },
  { text: '3,000+ 避雷企业黑名单过滤', icon: Lock },
  { text: '本地私有化数据安全隔离', icon: Terminal },
  { text: '0 验证码顺畅通关率', icon: CheckCircle2 },
];

/**
 * FlowingMenu —— 横向平铺流动跑马灯（React Bits 核心组件定制版）
 *
 * 1. 严格响应用户敏锐指导“不能做成竖向占用高度”，定制为横向无限流动带；
 * 2. 鼠标悬浮时平滑减速，展示硬核技术关键词；
 * 3. 科技流光质感，丰富全站科技纵深。
 */
export function FlowingMenu() {
  const duplicatedTags = [...TECH_TAGS, ...TECH_TAGS];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/40 py-3.5 backdrop-blur-md select-none">
      {/* 左右两侧平滑虚化遮罩 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent z-10" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={{ animationPlayState: 'paused' }}
        className="flex w-max items-center gap-6"
      >
        {duplicatedTags.map((tag, i) => {
          const Icon = tag.icon;
          return (
            <div
              key={`${tag.text}-${i}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-paper-dim transition-colors hover:border-accent hover:text-paper hover:bg-white/10 cursor-default"
            >
              <Icon size={13} className="text-accent shrink-0" />
              <span>{tag.text}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
