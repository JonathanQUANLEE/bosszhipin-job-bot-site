/**
 * AnimatedNumber — 数字滚动动画。
 *
 * 自研简化版：用 requestAnimationFrame 实现数字从 0 滚动到目标值。
 * 不需要抓 React Bits / Motion Primitives 源码，避免额外依赖。
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  suffix = '',
  duration = 1200,
  className = '',
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - (1 - progress) ** 3; // ease-out cubic
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
