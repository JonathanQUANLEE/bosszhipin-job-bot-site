'use client';

import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  /** 整体延迟（秒） */
  delay?: number;
  /** 每个词之间的间隔（秒） */
  step?: number;
}

/**
 * BlurText —— 文字逐词模糊浮现。
 *
 * 参考：React Bits `Blur Text`。
 * 每个词从「模糊 + 下沉 + 透明」过渡到清晰，形成「对焦」的观感。
 *
 * ⚠️ 分词规则：英文/数字整词保留，中文逐字，空白原样保留
 *    （中文没有空格，按空格 split 会整段不动）。
 *
 * ⚠️ 降级：根节点与每个词都带 `data-inview`，由 globals.css 的
 *    prefers-reduced-motion / noscript / print 规则强制显示最终态。
 */
export function BlurText({ text, className = '', delay = 0, step = 0.055 }: BlurTextProps) {
  // 英文/数字整词 → 空白 → 其余单字（含中文）
  const tokens = text.match(/[A-Za-z0-9]+|\s+|[\s\S]/g) ?? [text];

  return (
    <span className={className} data-inview="">
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          data-inview=""
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: delay + i * step,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {token}
        </motion.span>
      ))}
    </span>
  );
}
