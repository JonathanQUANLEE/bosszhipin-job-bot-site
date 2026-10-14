'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Radar,
  Sliders,
  ShieldCheck,
  Sparkles,
  LineChart,
  Sun,
  Shield,
  Clock,
} from 'lucide-react';
import { PlatformTrendChart } from '@/components/effects/Charts/PlatformTrendChart';
import { MorningBriefCard } from '@/components/effects/Charts/MorningBriefCard';
import { generateSeedRecords, buildDefaultMorningBrief } from '@/lib/deliveryHistory';

const LOG_ITEMS = [
  { ok: true, title: 'AI Agent 全栈开发', company: '腾讯科技 (深圳)', time: '12:04:18', note: '精准匹配 98% · 已打招呼并送达' },
  { ok: true, title: '大模型应用架构师', company: '字节跳动 (杭州)', time: '12:04:32', note: '精准匹配 95% · 已打招呼并送达' },
  { ok: false, title: '初级全栈工程师 (外包)', company: '某外包技术', time: '12:04:47', note: '命中黑名单规则「外包/驻场」· 自动跳过' },
  { ok: true, title: '后端研发实习生', company: '美团 (北京)', time: '12:05:01', note: '精准匹配 92% · 触发 12s 拟人延时' },
  { ok: true, title: 'Python 自动化平台', company: '快手 (深圳)', time: '12:05:15', note: '精准匹配 96% · 成功交换联系方式' },
];

const SEED_RECORDS = generateSeedRecords();
const DEFAULT_BRIEF = buildDefaultMorningBrief();

function PlatformStatBars() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-xl border border-cyan-500/25 bg-gradient-to-b from-cyan-950/20 to-[#120f20] p-2.5 text-left">
        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 font-semibold">
          <span>BOSS直聘</span>
          <span className="text-cyan-400">100%</span>
        </div>
        <div className="mt-1 font-mono text-xs text-white font-bold">
          100 <span className="text-white/50 text-[10px]">/ 100</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-full shadow-[0_0_8px_#38bdf8]" />
        </div>
      </div>

      <div className="rounded-xl border border-blue-500/25 bg-gradient-to-b from-blue-950/20 to-[#120f20] p-2.5 text-left">
        <div className="flex items-center justify-between text-[11px] font-mono text-blue-300 font-semibold">
          <span>智联招聘</span>
          <span className="text-blue-400">72%</span>
        </div>
        <div className="mt-1 font-mono text-xs text-white font-bold">
          72 <span className="text-white/50 text-[10px]">/ 100</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 w-[72%] shadow-[0_0_8px_#60a5fa]" />
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/25 bg-gradient-to-b from-amber-950/20 to-[#120f20] p-2.5 text-left">
        <div className="flex items-center justify-between text-[11px] font-mono text-amber-300 font-semibold">
          <span>猎聘网</span>
          <span className="text-amber-400">63%</span>
        </div>
        <div className="mt-1 font-mono text-xs text-white font-bold">
          38 <span className="text-white/50 text-[10px]">/ 60</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 w-[63%] shadow-[0_0_8px_#fbbf24]" />
        </div>
      </div>
    </div>
  );
}

function LiveEventLogs() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0b0914]">
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#161324] px-3 py-1.5 text-[10px] font-mono text-white/80">
        <div className="flex items-center gap-1.5">
          <Terminal size={12} className="text-accent" />
          <span className="font-semibold text-white">实时巡航事件流水线 (Live Stream)</span>
        </div>
        <span className="text-emerald-400 font-medium">● 0 验证码通关</span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden p-2.5 text-[11px] font-mono">
        {LOG_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-2 truncate">
            <span className="text-purple-300 text-[10px] font-medium">{item.time}</span>
            <span
              className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                item.ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {item.ok ? '✓' : '✕'}
            </span>
            <span className="truncate text-white font-semibold">{item.title}</span>
            <span className="hidden shrink-0 text-white/60 sm:inline">@{item.company}</span>
            <span
              className={`ml-auto shrink-0 font-medium ${
                item.ok ? 'text-accent' : 'text-rose-300/80'
              }`}
            >
              {item.note}
            </span>
          </div>
        ))}
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-[#141122] px-3 py-1.5 text-[10px] font-mono text-white/80">
        <span>今日累计安全投递 <strong className="text-emerald-400 font-bold">237 份</strong></span>
        <span className="text-accent font-semibold">随机延时 6s~14s · 无痕风控</span>
      </div>
    </div>
  );
}

function RulesView() {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-2 text-xs">
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
        <div className="flex items-center gap-2 text-emerald-300 font-bold">
          <Shield size={14} />
          <span>0-Driver 纯协议 CDP 注入已激活</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
          去除 WebDriver 自动化标志，绕过浏览器环境检测，全天候拟人化无痕巡航。
        </p>
      </div>

      <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-3">
        <div className="flex items-center gap-2 text-purple-300 font-bold">
          <Clock size={14} />
          <span>拟人随机微扰延时：6s ~ 14s</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
          绝无机械请求节律，模拟真实人类浏览行为与打招呼停顿，守护账号绝对安全。
        </p>
      </div>
    </div>
  );
}

export function DesktopWindow() {
  const [activeTab, setActiveTab] = useState<'cruise' | 'chart' | 'brief' | 'rules'>('cruise');

  return (
    <div className="flex h-full w-full flex-col bg-[#0e0c18] text-left select-none text-white font-sans">
      {/* 视窗 macOS 顶栏 */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/15 bg-[#181524] px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_6px_#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] shadow-[0_0_6px_#27c93f]" />
          </div>
          <span className="ml-2 font-mono text-[11px] font-semibold text-white/90 hidden sm:inline">
            JobKoi Agent v1.0.0 — <span className="text-accent">Tauri 2 + Python 3.12</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300 font-semibold shadow-[0_0_10px_rgba(52,211,153,0.2)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            3 平台多路巡航中
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* 左侧导航坞 */}
        <div className="w-28 shrink-0 flex flex-col gap-1 border-r border-white/10 bg-[#120f1e] p-2 sm:w-32">
          <button
            onClick={() => setActiveTab('cruise')}
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
              activeTab === 'cruise'
                ? 'bg-gradient-to-r from-accent/30 to-purple-600/20 text-white font-bold border border-accent/40 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radar size={13} className="text-accent" />
            <span>实时巡航</span>
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
              activeTab === 'chart'
                ? 'bg-gradient-to-r from-accent/30 to-purple-600/20 text-white font-bold border border-accent/40 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <LineChart size={13} className="text-amber-400" />
            <span>投递走势</span>
          </button>
          <button
            onClick={() => setActiveTab('brief')}
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
              activeTab === 'brief'
                ? 'bg-gradient-to-r from-accent/30 to-purple-600/20 text-white font-bold border border-accent/40 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sun size={13} className="text-cyan-400" />
            <span>投递早报</span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all ${
              activeTab === 'rules'
                ? 'bg-gradient-to-r from-accent/30 to-purple-600/20 text-white font-bold border border-accent/40 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders size={13} className="text-emerald-400" />
            <span>安全策略</span>
          </button>
          <div className="mt-auto border-t border-white/10 pt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-medium">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>0-Driver 隐身</span>
          </div>
        </div>

        {/* 视窗主内容区 */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-2 sm:p-3 overflow-hidden">
          {/* 意图搜索条 */}
          <div className="flex items-center gap-2 rounded-xl border border-accent/35 bg-gradient-to-r from-accent/15 to-purple-900/10 px-3 py-1.5 text-xs shrink-0">
            <Sparkles size={13} className="shrink-0 text-[#ffcdff]" />
            <span className="truncate text-white font-medium text-[11px] sm:text-xs">
              巡航意图：寻找深圳/杭州的 AI Agent 与全栈研发岗位，排除培训与驻场
            </span>
            <span className="ml-auto shrink-0 rounded-md bg-accent px-2 py-0.5 font-mono text-[9px] text-black font-bold shadow-sm">
              运行中
            </span>
          </div>

          {activeTab === 'cruise' && (
            <>
              <PlatformStatBars />
              <LiveEventLogs />
            </>
          )}

          {activeTab === 'chart' && (
            <div className="flex-1 overflow-auto">
              <PlatformTrendChart records={SEED_RECORDS} />
            </div>
          )}

          {activeTab === 'brief' && (
            <div className="flex-1 overflow-auto">
              <MorningBriefCard brief={DEFAULT_BRIEF} />
            </div>
          )}

          {activeTab === 'rules' && <RulesView />}
        </div>
      </div>
    </div>
  );
}
