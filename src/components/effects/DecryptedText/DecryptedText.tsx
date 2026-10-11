/**
 * DecryptedText — 黑客解密字效。
 *
 * 来源：React Bits (MIT + Commons Clause v1.0)
 * 原始路径：https://reactbits.dev/text-animations/decrypted-text
 *
 * 已精简：移除 click/toggle 模式，只保留 view 触发（滚动进入视口时自动解密）。
 * 其余行为保持原样：随机字符洗牌 → 逐字揭示，可正向/反向。
 */

'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  encryptedClassName?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

export default function DecryptedText({
  text,
  className = '',
  encryptedClassName = '',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(() => Array.from(new Set(text.split('').filter(c => c !== ' '))), [text]);

  const shuffleText = useCallback(
    (revealed: Set<number>) =>
      text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (revealed.has(i)) return text[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join(''),
    [text, availableChars],
  );

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    let currentIteration = 0;
    const maxIterations = 12;

    intervalRef.current = setInterval(() => {
      setRevealedIndices(prev => {
        setDisplayText(shuffleText(prev));
        currentIteration++;
        if (currentIteration >= maxIterations) {
          clearInterval(intervalRef.current ?? undefined);
          setIsAnimating(false);
          setDisplayText(text);
        }
        return prev;
      });
    }, 45);

    return () => clearInterval(intervalRef.current ?? undefined);
  }, [isAnimating, text, shuffleText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, triggerDecrypt]);

  return (
    <motion.span ref={containerRef} className="inline-block whitespace-pre-wrap">
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
          const revealed = revealedIndices.has(i) || !isAnimating;
          return (
            <span key={i} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
