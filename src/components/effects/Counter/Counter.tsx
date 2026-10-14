'use client';

import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, type MotionValue } from 'motion/react';

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function DigitColumn({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y, position: 'absolute', top: 0, left: 0, right: 0 }}
      className="flex items-center justify-center font-mono font-bold"
    >
      {number}
    </motion.span>
  );
}

interface CounterDigitProps {
  place: number;
  value: number;
  height: number;
  fontSize: number;
}

function CounterDigit({ place, value, height, fontSize }: CounterDigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 80,
    damping: 18,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      style={{ height, width: fontSize * 0.65 }}
      className="relative overflow-hidden inline-block"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <DigitColumn key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export interface CounterProps {
  value: number;
  fontSize?: number;
  textColor?: string;
  suffix?: string;
  prefix?: string;
}

/**
 * Counter —— React Bits 数字滚动滚轮组件
 *
 * 1. 模拟求职时间黑洞自增过程；
 * 2. 结合 Spring 物理弹性阻尼滚动，数字飞速上升；
 * 3. 毫秒级自适应位数。
 */
export function Counter({
  value,
  fontSize = 36,
  textColor = 'text-paper',
  suffix = '',
  prefix = '',
}: CounterProps) {
  const height = fontSize * 1.25;

  // 拆分为万位、千位、百位、十位、个位等
  const places = [10000, 1000, 100, 10, 1].filter((p) => value >= p || p === 1);

  return (
    <div
      style={{ fontSize }}
      className={`inline-flex items-center font-mono ${textColor} select-none`}
    >
      {prefix && <span className="mr-0.5 opacity-80">{prefix}</span>}
      <div className="flex items-center">
        {places.map((place) => (
          <CounterDigit
            key={place}
            place={place}
            value={value}
            height={height}
            fontSize={fontSize}
          />
        ))}
      </div>
      {suffix && <span className="ml-1 opacity-80 font-sans text-xs font-semibold">{suffix}</span>}
    </div>
  );
}
