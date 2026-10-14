'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { MacbookScroll, DesktopWindow } from '@/components/effects/MacbookScroll';

/**
 * Showcase —— 旗舰级桌面端产品展示台
 *
 * 借鉴 grail-app.com 荧光紫水墨光效 + berd.xyz 原生视窗，
 * 比例呼吸自然，彻底根除任何负边距重叠与穿模。
 */
export function Showcase() {
  return (
    <section id="showcase" className="relative border-t border-line/60 py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-base via-[#100d1c] to-base">
      {/* 借鉴 grail-app.com：辐射状水墨粉紫柔光云 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[550px] w-[min(1100px,96vw)] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-purple-500/15 via-[#ffcdff]/10 to-indigo-500/15 blur-[130px]"
      />

      <div className="container-content relative">
        <SectionHeading
          eyebrow="实机运行视窗 · TAURI 2 NATIVE"
          title="真正在你电脑上全速开跑的求职助手"
          description="不只是一个脚本，更是一套工业级 Tauri 2 本地桌面控制中枢。在各大招聘平台多路并行，每条投递为什么发、为什么跳过，毫秒级日志尽在眼底。"
          align="center"
        />

        {/* 拟真 3D MacBook 展台（无任何负边距冲突） */}
        <div className="mt-8 sm:mt-12 w-full">
          <MacbookScroll
            badge={
              <div className="hidden rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[9px] text-emerald-300 sm:inline-flex items-center gap-1.5 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Tauri 2 • Python 3.12 • 0-Driver 本地隐身</span>
              </div>
            }
          >
            {/* 映射在屏幕里的原生视窗（借鉴 berd.xyz 高对比度明亮视窗） */}
            <DesktopWindow />
          </MacbookScroll>
        </div>
      </div>
    </section>
  );
}
