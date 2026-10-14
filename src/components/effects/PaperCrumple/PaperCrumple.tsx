'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, RotateCcw, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

/**
 * PaperCrumple —— 揉碎让人头疼的繁琐旧简历（React Bits 核心组件）
 *
 * 1. 模拟令人头秃的陈旧格式纸质简历；
 * 2. 用户长按或点击「一键揉爆它」，纸张产生 3D 折痕折叠物理收缩揉成纸团；
 * 3. 伴随解压宣泄，随后唤出 AI 多模态结构化意图名片。
 */
export function PaperCrumple() {
  const [isCrumpled, setIsCrumpled] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center p-4 select-none">
      <div className="mb-4 flex items-center justify-between w-full max-w-sm text-xs font-mono text-paper-muted">
        <span className="flex items-center gap-1.5 text-accent">
          <Sparkles size={13} />
          <span>解压交互实验室</span>
        </span>
        <button
          onClick={() => setIsCrumpled(!isCrumpled)}
          className="flex items-center gap-1 text-[11px] text-paper-dim hover:text-accent transition-colors"
        >
          {isCrumpled ? (
            <>
              <RotateCcw size={12} />
              <span>复原重新揉</span>
            </>
          ) : (
            <>
              <Trash2 size={12} />
              <span>长按或点击揉爆</span>
            </>
          )}
        </button>
      </div>

      <div className="relative h-[340px] w-full max-w-sm [perspective:1000px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isCrumpled ? (
            /* 传统令人头痛的繁琐旧简历 */
            <motion.div
              key="old-resume"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [-0.5, 0.5, -0.5] }}
              exit={{
                scale: [1, 0.7, 0.25],
                rotateZ: [0, 45, 180],
                rotateX: [0, 60, 120],
                filter: ['blur(0px)', 'blur(2px)', 'blur(6px)'],
                borderRadius: ['8px', '40px', '999px'],
                opacity: [1, 0.8, 0],
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setIsCrumpled(true)}
              className="group relative cursor-pointer w-full h-full rounded-xl border border-white/15 bg-gradient-to-b from-[#e5e5dc] via-[#dcdcd4] to-[#cfcfc7] p-5 text-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1"
            >
              {/* 红色警告戳 */}
              <div className="absolute right-4 top-4 rotate-12 rounded border border-red-600 bg-red-100/90 px-2 py-0.5 font-mono text-[10px] font-bold text-red-600 uppercase">
                初筛淘汰率 92%
              </div>

              <div className="flex items-center gap-2 border-b border-black/10 pb-3">
                <FileText size={18} className="text-[#555]" />
                <div>
                  <h4 className="text-xs font-bold text-black tracking-wide">
                    某某某_个人简历_第28版_最终修改版.pdf
                  </h4>
                  <p className="text-[10px] text-[#777]">密密麻麻 · 通篇套话 · 格式僵硬 · HR 毫无耐心</p>
                </div>
              </div>

              {/* 令人头痛的密密麻麻伪文字行 */}
              <div className="mt-4 space-y-2 opacity-70">
                <div className="h-2 w-full rounded bg-black/25" />
                <div className="h-2 w-5/6 rounded bg-black/20" />
                <div className="h-2 w-4/6 rounded bg-black/20" />
                <div className="mt-4 h-2 w-full rounded bg-black/20" />
                <div className="h-2 w-3/4 rounded bg-black/20" />
                <div className="h-2 w-5/6 rounded bg-black/20" />
                <div className="mt-4 h-2 w-full rounded bg-black/20" />
                <div className="h-2 w-2/3 rounded bg-black/20" />
              </div>

              {/* 悬浮提示揉爆 */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <span className="rounded-full bg-red-600 px-3 py-1 font-mono text-[11px] font-semibold text-white shadow-md transition-transform group-hover:scale-105">
                  🔥 受够了？点击直接揉爆它！
                </span>
              </div>
            </motion.div>
          ) : (
            /* 揉碎后破茧而出的 AI 智能卡片 */
            <motion.div
              key="ai-resume"
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative w-full h-full rounded-2xl border border-accent/40 bg-gradient-to-b from-[#181524] to-[#0d0b14] p-6 text-paper shadow-[0_20px_60px_rgba(167,139,250,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent text-xs">
                      ⚡
                    </span>
                    <span className="font-mono text-xs font-semibold text-paper">
                      JobKoi 多模态智能结构化简历
                    </span>
                  </div>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-medium">
                    命中率 96%+
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-paper-dim">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>自动提取核心技能关键词，对齐岗位 JD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>定制拟人打招呼前言，打破已读不回魔咒</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>PDF / Word / 纯文本极速无损解析</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 font-mono text-[11px] text-accent">
                <span>状态：已彻底告别手工投递时代，全自动巡航接管。</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
