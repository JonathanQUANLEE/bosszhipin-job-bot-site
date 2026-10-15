'use client';

import { ArrowRight, GitBranch, Download, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { TearTicket } from '@/components/effects/TearTicket';
import { PulseHeart } from '@/components/effects/PulseHeart';

/**
 * Start —— 开始使用（极简清晰，单一入口，彻底去重）
 */
export function Start() {
  const repoUrl = siteConfig.github.repoUrl;

  return (
    <section id="start" className="border-t border-white/10 py-20 sm:py-32 relative overflow-hidden bg-[#07050e]">
      {/* 背景柔光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-purple-600/[0.06] blur-[140px]"
      />

      <div className="container-content relative">
        {/* 顶部：TearTicket 亲手撕票根开启体验 */}
        <div className="mb-14 sm:mb-16">
          <TearTicket />
        </div>

        {/* GitHub 点 Star 心跳支持按钮 */}
        <div className="mb-16 flex justify-center">
          <PulseHeart initialCount={3200} />
        </div>

        {/* 章节标题 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-medium text-purple-300 px-3.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/10">
            开始使用
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            把时间留给准备面试，机械琐事交给它
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            纯净绿色、开箱即用。双击极速安装，无需配置任何复杂的 Python 或开发环境。
          </p>
        </div>

        {/* 下载与源码双通道（清晰去重） */}
        <div className="grid gap-8 lg:grid-cols-2 items-stretch max-w-5xl mx-auto">
          {/* 下载客户端通道 */}
          <div className="min-w-0 rounded-3xl border border-white/10 bg-[#120e20]/80 p-7 sm:p-9 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-purple-300">官方安装通道</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  推荐普通用户
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                下载 Windows 客户端
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                支持 Windows 10 / 11 操作系统。点击下方按钮下载最新安装包，双击极速安装运行。首次运行前请确保电脑已安装 Chrome 浏览器。
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>纯净安全 · 零广告 · 绝无流氓捆绑</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>内置免费大模型 · 开箱即用无需自备 Key</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>数据 100% 存在本地私有沙盒，绝不上云</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <Button
                href="https://github.com/JonathanQUANLEE/JobKoi-AI/releases/latest"
                className="w-full justify-center !py-3.5 text-sm font-semibold shadow-xl shadow-purple-900/30"
              >
                <Download size={16} />
                <span>免费下载 Windows 客户端 (.exe)</span>
              </Button>

              <a
                href="https://github.com/JonathanQUANLEE/JobKoi-AI/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1"
              >
                <span>或者下载 MSI 企业安装包</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* 从源码运行通道 */}
          <div className="min-w-0 rounded-3xl border border-white/10 bg-[#120e20]/80 p-7 sm:p-9 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-400">开发者极客通道</span>
                <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  面向开源开发者
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                从源码本地运行
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                适合希望自行审计代码或定制专属投递规则的开发者。通过 uv 包管理器一键同步依赖并启动：
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#090710]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">终端命令</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs text-slate-300 leading-relaxed">
                  <code>{`git clone https://github.com/JonathanQUANLEE/JobKoi-AI.git
cd JobKoi-AI
uv sync
uv run python -m boss_zhipin.tauri`}</code>
                </pre>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Button
                href={repoUrl}
                variant="secondary"
                className="w-full justify-center !py-3.5 text-sm font-medium"
              >
                <GitBranch size={16} />
                <span>访问 GitHub 开源主仓</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
