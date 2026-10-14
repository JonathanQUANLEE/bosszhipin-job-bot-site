'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface SpringCheckItem {
  id: string;
  flaw: string;
  solution: string;
  impact: string;
}

interface SpringCheckProps {
  items: SpringCheckItem[];
}

/**
 * SpringCheck —— 传统缺陷淘汰打叉清单（根据用户专属要求定制）
 *
 * 核心改造：点击方框不打对勾，而是弹出【弹性红色/紫色叉号 (❌)】并划掉文字，
 * 伴随 [已淘汰] 徽标，强烈暗示传统海投方式落后、低效、已被时代抛弃。
 */
export function SpringCheck({ items }: SpringCheckProps) {
  const [eliminatedIds, setEliminatedIds] = useState<Set<string>>(
    new Set([items[0]?.id ?? ''])
  );

  const toggle = (id: string) => {
    setEliminatedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const eliminateAll = () => {
    setEliminatedIds(new Set(items.map((it) => it.id)));
  };

  return (
    <div className="w-full space-y-3">
      {/* 顶部批量操作 */}
      <div className="flex items-center justify-between pb-2 text-xs font-mono text-paper-muted">
        <span>传统手动求职痛点（点击方框将其淘汰）：</span>
        <button
          onClick={eliminateAll}
          className="rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-red-400 transition-colors hover:bg-red-500/20"
        >
          全部打叉淘汰 ✕
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const isEliminated = eliminatedIds.has(item.id);

          return (
            <motion.div
              key={item.id}
              onClick={() => toggle(item.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`group relative flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all ${
                isEliminated
                  ? 'border-red-500/30 bg-red-950/10 shadow-[0_4px_20px_rgba(239,68,68,0.08)]'
                  : 'border-white/10 bg-[#121118] hover:border-white/20'
              }`}
            >
              {/* 弹簧打叉复选框 */}
              <div
                className={`relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  isEliminated
                    ? 'border-red-500 bg-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'border-white/25 bg-black/40 group-hover:border-white/50'
                }`}
              >
                <AnimatePresence>
                  {isEliminated && (
                    <motion.svg
                      key="cross"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-red-400"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <motion.line
                        x1="18"
                        y1="6"
                        x2="6"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>

              {/* 文本内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <p
                      className={`text-sm sm:text-base font-medium transition-colors ${
                        isEliminated ? 'text-paper-muted' : 'text-paper'
                      }`}
                    >
                      {item.flaw}
                    </p>
                    {/* 划除横线 */}
                    {isEliminated && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute inset-y-1/2 left-0 right-0 h-0.5 origin-left bg-red-500/70"
                      />
                    )}
                  </div>

                  {isEliminated && (
                    <span className="shrink-0 rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-red-400">
                      已淘汰 ✕
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="text-emerald-400 font-medium">
                    ✓ 锦鲤方案：{item.solution}
                  </span>
                  <span className="font-mono text-paper-muted text-[11px]">
                    ({item.impact})
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
