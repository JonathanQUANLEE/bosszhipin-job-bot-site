'use client';

import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  Terminal,
  Radar,
  Sliders,
  Layers,
  GitBranch,
  FileText,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

interface DockItemProps {
  mouseX: MotionValue<number>;
  icon: React.ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
}

const DockItem = ({ mouseX, icon, title, href, onClick }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // macOS 磁吸高斯放大曲线：距离中心越近，尺寸从 44px 放大至 70px
  const widthTransform = useTransform(distance, [-120, 0, 120], [42, 68, 42]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [42, 68, 42]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = React.useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    if (href?.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 悬停气泡提示 */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -8 }}
          exit={{ opacity: 0, y: 10 }}
          className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-white/10 bg-[#16151f] px-2 py-0.5 font-mono text-[10px] text-paper shadow-lg backdrop-blur-md"
        >
          {title}
        </motion.div>
      )}

      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        whileTap={{ scale: 0.88 }}
        className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-paper shadow-md backdrop-blur-lg transition-colors hover:border-accent/40 hover:bg-white/10 hover:text-accent"
      >
        {icon}
      </motion.div>

      {/* 底部微小活动指示点 */}
      <span className="mt-1 h-1 w-1 rounded-full bg-white/40" />
    </div>
  );
};

/**
 * Dock —— macOS 拟真磁吸放大程序坞（React Bits 核心组件）
 *
 * 1. 鼠标滑过时平滑产生正弦波放大与弹性回弹；
 * 2. 气泡悬浮提示对应模块与功能；
 * 3. 一键平滑滚动到页面对应的章节或直通 GitHub。
 */
export function Dock() {
  const mouseX = useMotionValue(Infinity);

  const DOCK_APPS = [
    {
      title: '走势晨报',
      icon: <Terminal size={20} />,
      href: '#analytics',
    },
    {
      title: '痛点对比',
      icon: <Layers size={20} />,
      href: '#pain-points',
    },
    {
      title: '多平台矩阵',
      icon: <Radar size={20} />,
      href: '#platforms',
    },
    {
      title: '核心功能',
      icon: <FileText size={20} />,
      href: '#features',
    },
    {
      title: '安全设置',
      icon: <Sliders size={20} />,
      href: '#safety',
    },
    {
      title: 'GitHub 仓库',
      icon: <GitBranch size={20} />,
      href: siteConfig.github.repoUrl,
    },
  ];

  return (
    <div className="flex justify-center select-none py-6">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-3 rounded-3xl border border-white/10 bg-[#0c0a14]/70 px-4 pb-2.5 shadow-2xl backdrop-blur-2xl"
      >
        {DOCK_APPS.map((app) => (
          <DockItem
            key={app.title}
            mouseX={mouseX}
            icon={app.icon}
            title={app.title}
            href={app.href}
          />
        ))}
      </motion.div>
    </div>
  );
}
