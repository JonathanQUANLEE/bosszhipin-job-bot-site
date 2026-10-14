'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface CardSwapItem {
  id: string;
  name: string;
  badge: string;
  desc: string;
  limit: string;
  features: string[];
  gradient: string;
}

interface CardSwapProps {
  cards: CardSwapItem[];
}

/**
 * CardSwap —— 扑克牌式层叠切牌卡组（React Bits 核心组件）
 *
 * 1. 层叠堆叠展示多招聘平台；
 * 2. 点击卡片或切牌按钮，顶层卡片伴随弹簧物理向侧翼飞出并滑入牌堆底部；
 * 3. 展现全平台生态一键接管能力。
 */
export function CardSwap({ cards }: CardSwapProps) {
  const [deck, setDeck] = useState(cards);

  const swapNext = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      if (!first) return prev;
      return [...rest, first];
    });
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* 顶部交互引导 */}
      <div className="mb-6 flex items-center justify-between w-full max-w-md text-xs font-mono text-paper-muted">
        <span className="flex items-center gap-1.5 text-accent">
          <Layers size={14} />
          <span>点击卡片或右侧按钮切牌</span>
        </span>
        <button
          onClick={swapNext}
          className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-paper hover:border-accent hover:text-accent transition-colors"
        >
          <span>切下一平台</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* 堆叠扑克牌视口 */}
      <div className="relative h-[340px] w-full max-w-md [perspective:1200px]">
        <AnimatePresence mode="popLayout">
          {deck.slice(0, 3).map((card, index) => {
            const isTop = index === 0;

            return (
              <motion.div
                key={card.id}
                layout
                onClick={isTop ? swapNext : undefined}
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{
                  scale: 1 - index * 0.05,
                  y: index * 16,
                  z: -index * 40,
                  rotateZ: index === 0 ? 0 : index === 1 ? -3 : 3,
                  opacity: 1 - index * 0.15,
                }}
                exit={{
                  x: 340,
                  rotateZ: 25,
                  opacity: 0,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                style={{ zIndex: 10 - index }}
                className={`absolute inset-0 cursor-pointer rounded-2xl border border-white/15 p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between ${card.gradient}`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-accent font-semibold uppercase">
                        {card.badge}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-white tracking-wide">
                        {card.name}
                      </h3>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-400">
                      {card.limit}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-paper-dim">
                    {card.desc}
                  </p>

                  <div className="mt-4 space-y-2">
                    {card.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-paper">
                        <CheckCircle2 size={13} className="text-accent shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-paper-muted">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck size={12} />
                    <span>0 驱动拟人反爬穿透</span>
                  </div>
                  {isTop && (
                    <span className="text-accent animate-pulse">
                      点击滑至底牌 ↻
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
