import type { ReactNode } from 'react';

interface LaptopFrameProps {
  children: ReactNode;
}

/**
 * 笔记本电脑外框 —— 纯 CSS 绘制（无图片、无 SVG 资源）。
 *
 * 结构：屏幕边框（bezel）→ 屏幕内容 → 底座（base）。
 * 用于 Showcase 区块承载应用界面。
 */
export function LaptopFrame({ children }: LaptopFrameProps) {
  return (
    <div className="relative w-full">
      {/* 屏幕 */}
      <div className="relative rounded-[14px] border border-line-strong bg-surface-raised p-1.5 shadow-[0_40px_120px_-20px_rgba(93,202,165,0.25)] sm:rounded-[20px] sm:p-2.5">
        {/* 摄像头 */}
        <div className="absolute left-1/2 top-0.5 hidden h-1 w-1 -translate-x-1/2 rounded-full bg-line-strong sm:block" />

        {/* 屏幕内容 */}
        <div className="aspect-[16/10] w-full overflow-hidden rounded-[8px] border border-line bg-base sm:rounded-[12px]">
          {children}
        </div>
      </div>

      {/* 底座 */}
      <div className="relative mx-auto h-2 w-[104%] -translate-x-[2%] rounded-b-[10px] border border-t-0 border-line-strong bg-surface sm:h-3 sm:rounded-b-[14px]">
        {/* 触摸板凹槽 */}
        <div className="absolute left-1/2 top-0 h-0.5 w-10 -translate-x-1/2 rounded-b-full bg-line-strong sm:w-16" />
      </div>

      {/* 底座投影 */}
      <div className="mx-auto h-6 w-[86%] rounded-[50%] bg-accent/10 blur-2xl" />
    </div>
  );
}
