/**
 * SpotlightCard — 鼠标跟随聚光灯卡片 + 边框光晕。
 *
 * 来源参考：React Bits `Spotlight Card` + `Border Glow`。
 * 纯 DOM（mousemove 写 CSS 变量 + radial-gradient），零 npm 依赖，低配设备也能跑。
 *
 * 两层效果：
 *   1. 卡片内部：柔和的径向聚光
 *   2. 卡片边框：1px 边框上跟随鼠标的亮边（用 mask 把渐变裁到边框区域）
 */

'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group/spot relative overflow-hidden ${className}`}
      style={{
        background:
          'radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgb(var(--color-accent-rgb) / 0.06), transparent 40%)',
      }}
    >
      {/* 边框光晕：用 mask 把渐变裁进 1px 边框 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background:
            'radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgb(var(--color-accent-rgb) / 0.55), transparent 45%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
        }}
      />

      {children}
    </div>
  );
}
