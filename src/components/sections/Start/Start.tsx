'use client';

import { ArrowRight, GitBranch } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { TearTicket } from '@/components/effects/TearTicket';
import { PulseHeart } from '@/components/effects/PulseHeart';

/**
 * Start —— 开始使用与终极仪式感转化
 *
 * 融合两大转化交互：
 * 1. TearTicket：亲手撕下带齿孔的求职通行证开启体验（用户指定必用）；
 * 2. PulseHeart：GitHub 点 Star 心跳动效与数字自增滚轮；
 * 3. 桌面端下载入口与源码一键启动命令。
 */
export function Start() {
  const repoUrl = siteConfig.github.repoUrl;
  const published = siteConfig.release.published && Boolean(repoUrl);

  return (
    <section id="start" className="border-t border-line py-16 sm:py-28 relative overflow-hidden">
      {/* 背景柔光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-purple-600/[0.06] blur-[140px]"
      />

      <div className="container-content relative">
        {/* 顶部高潮：TearTicket 亲手撕票根仪式 */}
        <div className="mb-16 sm:mb-20">
          <TearTicket />
        </div>

        {/* GitHub 点 Star 心跳支持按钮 */}
        <div className="mb-16 flex justify-center">
          <PulseHeart initialCount={1204} />
        </div>

        {/* 核心通道推荐：线上免安装直接体验 */}
        <div className="mb-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-purple-950/30 to-indigo-950/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 font-mono text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>成熟线上正式站 · 推荐免安装直接用</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              无需本地运行，浏览器点开即用
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              已全面部署至 GitHub Pages，所有功能交互、多平台巡航模拟、投递图表与晨报开箱即验，无需配置任何本地 Node / Python 环境。
            </p>
          </div>
          <a
            href="https://jonathanquanlee.github.io/bosszhipin-job-bot-site/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-sm font-bold text-black transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.02]"
          >
            <span>立即进入线上体验</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 下载与源码双通道 */}
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 items-start">
          {/* 下载通道 */}
          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#121118]/80 p-6 sm:p-8 backdrop-blur-xl">
            <p className="label-mono mb-3 text-accent">官方发布通道 · RELEASES</p>
            <h2 className="font-display text-2xl text-paper sm:text-3xl font-bold">
              {published ? '下载桌面客户端' : '软件在活跃开发中'}
            </h2>
            <p className="mt-3 text-sm text-paper-muted leading-relaxed">
              {published ? '首次运行前请确保已安装 Chrome。点击对应安装包将由浏览器直接下载至本地，双击即可极速安装运行。' : siteConfig.release.note}
            </p>

            <div className="mt-8 grid gap-3">
              {siteConfig.downloads.map((dl) => {
                const available = Boolean(dl.href);
                const inner = (
                  <>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-accent border border-white/10">
                      <Icon name={dl.icon} size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-paper">{dl.platform}</p>
                      <p className="text-xs text-paper-muted">{dl.note}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="ml-auto shrink-0 text-paper-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                      aria-hidden
                    />
                  </>
                );

                return available ? (
                  <a
                    key={dl.platform}
                    href={dl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-all hover:border-accent hover:bg-white/5"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={dl.platform}
                    className="flex items-center gap-4 rounded-xl border border-line bg-surface/50 p-4"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 从源码运行通道 */}
          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#121118]/80 p-6 sm:p-8 backdrop-blur-xl">
            <p className="label-mono mb-3 text-accent">开发者极客通道 · SOURCE</p>
            <h2 className="font-display text-2xl text-paper sm:text-3xl font-bold">
              一行命令本地启动
            </h2>
            <p className="mt-3 text-sm text-paper-muted leading-relaxed">
              支持通过 uv 极速包管理器一键同步 Python 依赖并启动 Tauri 桌面图形客户端。
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#0c0a12]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#14121d] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-paper-muted">bash — uv local startup</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs text-paper-dim sm:p-5">
                <code>{`git clone https://github.com/JonathanQUANLEE/JobKoi-AI.git
cd JobKoi-AI
uv sync
${siteConfig.quickStart}`}</code>
              </pre>
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                href={repoUrl}
                className="w-full justify-center sm:w-auto"
              >
                <GitBranch size={16} aria-hidden />
                <span>访问 GitHub 仓库</span>
                <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
