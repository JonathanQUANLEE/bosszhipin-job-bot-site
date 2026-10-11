/**
 * SpotlightCard — 鼠标跟随聚光灯卡片。
 *
 * 自研简化版：mousemove 跟踪 + CSS radial-gradient 实现聚光效果。
 * 纯 DOM，零 npm 依赖，低配设备也能跑。
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(93, 202, 165, 0.06), transparent 40%)',
      }}
    >
      {children}
    </div>
  );
}
