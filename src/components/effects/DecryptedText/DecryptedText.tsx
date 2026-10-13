/**
 * DecryptedText — 黑客解密字效。
 *
 * 来源：React Bits (MIT + Commons Clause v1.0)
 * 原始路径：https://reactbits.dev/text-animations/decrypted-text
 *
 * 已精简：移除 click/toggle 模式，只保留 view 触发（滚动进入视口时自动解密）。
 * 已修复：SSR 时直接显示原文，不做动画；客户端 hydrate 后再触发，避免重复渲染。
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  encryptedClassName?: string;
}

export default function DecryptedText({
  text,
  className = '',
  encryptedClassName = '',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const shuffleText = useCallback(
    (revealedCount: number) =>
      text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealedCount) return text[i];
          const code = 33 + Math.floor(Math.random() * 94); // printable ASCII
          return String.fromCharCode(code);
        })
        .join(''),
    [text],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setIsAnimating(true);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isAnimating) return;

    let revealed = 0;
    const total = text.length;
    const maxIterations = 30;
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      iteration++;
      // 每 2-3 次迭代揭示一个新字符
      if (iteration % 2 === 0 && revealed < total) {
        revealed++;
      }
      setDisplayText(shuffleText(revealed));

      if (revealed >= total || iteration >= maxIterations) {
        clearInterval(intervalRef.current ?? undefined);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, 40);

    return () => clearInterval(intervalRef.current ?? undefined);
  }, [isAnimating, text, shuffleText]);

  return (
    <span ref={containerRef} className="inline-block whitespace-pre-wrap">
      {/*
        无障碍层：完整原文，供读屏软件一次性朗读。
        ⚠️ 用 inline style 而不是 .sr-only 类 —— 即使样式表加载失败也不会
        退化成可见文本（历史上正是这个原因导致标题重复显示）。
      */}
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        {text}
      </span>

      {/* 视觉层：逐字解密动画，对读屏软件隐藏 */}
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
          const isRevealed =
            !isAnimating || displayText[i] === text[i] || char === ' ';
          return (
            <span key={i} className={isRevealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
