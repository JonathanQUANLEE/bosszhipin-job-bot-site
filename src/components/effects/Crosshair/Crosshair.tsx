/**
 * Crosshair — 瞄准光标（限定区块）。
 *
 * 自研简化版：自定义光标 + 实时坐标显示。
 * ⚠️ 仅在特定 section 内启用（非全站），进视口激活。
 */

'use client';

import { useEffect, useRef, useState } from 'react';

/** 检测是否为触摸设备（无精细鼠标指针） */
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
};

interface CrosshairProps {
  children: React.ReactNode;
}

/**
 * Crosshair — 瞄准光标（限定区块）。
 *
 * 自研简化版：自定义光标 + 实时坐标显示。
 * ⚠️ 仅在特定 section 内启用（非全站），进视口激活。
 * ⚠️ 触摸设备自动禁用（无 mousemove 事件）。
 */
export function Crosshair({ children }: CrosshairProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [touchOnly] = useState(() => isTouchDevice());

  useEffect(() => {
    if (touchOnly) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setActive(entry.isIntersecting);
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      setVisible(inside);
      if (inside) setPos({ x, y });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, [touchOnly]);

  return (
    <div ref={containerRef} className="relative">
      {children}
      {!touchOnly && active && visible && (
        <>
          {/* 十字线 */}
          <div
            className="pointer-events-none absolute z-50"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute h-5 w-px bg-accent/60" style={{ left: '50%', top: '-10px' }} />
            <div className="absolute h-5 w-px bg-accent/60" style={{ left: '50%', bottom: '-10px' }} />
            <div className="absolute h-px w-5 bg-accent/60" style={{ top: '50%', left: '-10px' }} />
            <div className="absolute h-px w-5 bg-accent/60" style={{ top: '50%', right: '-10px' }} />
          </div>
          {/* 坐标 */}
          <div className="pointer-events-none absolute bottom-4 right-4 z-50 font-mono text-xs text-accent/50">
            X: {Math.round(pos.x)} Y: {Math.round(pos.y)}
          </div>
        </>
      )}
    </div>
  );
}
