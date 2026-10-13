'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LaptopFrame } from './LaptopFrame';
import { AppScreenMock } from './AppScreenMock';

/**
 * Showcase —— 「滚动展开的电脑」。
 *
 * 交互：区块从视口下方进入时，笔记本呈倾斜（rotateX 22°）+ 略微放大，
 * 随着滚动到视口中央逐渐「立正」并归位，屏幕里的应用界面清晰呈现。
 *
 * 技术：纯 DOM 3D 变换（perspective + rotateX/scale/translateY），
 * 由 motion 的 useScroll / useTransform 驱动 —— 零 WebGL、零图片、零新依赖。
 *
 * 降级：`data-scrollfx` 属性供 globals.css 的 prefers-reduced-motion 规则覆盖。
 */
export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 1]);

  return (
    <section id="showcase" ref={ref} className="relative border-t border-line py-20 sm:py-32">
      {/* 背景光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[min(900px,92vw)] -translate-x-1/2 rounded-[50%] bg-accent/[0.07] blur-[100px]"
      />

      <div className="container-content relative">
        <SectionHeading
          eyebrow="它长什么样"
          title="说一句话，剩下的交给它"
          description="你只需要说清想要什么岗位。它在三个平台同时开跑，每条岗位为什么投、为什么跳过，实时告诉你。"
          align="center"
        />

        <div className="mt-12 [perspective:1400px] sm:mt-20">
          <motion.div
            data-scrollfx=""
            style={{ rotateX, scale, y, opacity }}
            className="origin-top"
          >
            <LaptopFrame>
              <AppScreenMock />
            </LaptopFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
