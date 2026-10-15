'use client';

import React, { useState } from 'react';
import { Sun, CheckCircle2, History, Copy, Check } from 'lucide-react';
import type { MorningBrief } from '@/lib/deliveryHistory';

interface MorningBriefCardProps {
  brief: MorningBrief;
  isParchment?: boolean;
  viewingDate?: string | null;
  onBackToYesterday?: () => void;
}

export function MorningBriefCard({
  brief,
  isParchment = false,
  viewingDate,
  onBackToYesterday,
}: MorningBriefCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const text = `【JobKoi 投递早报 · 昨日战报】\n日期: ${brief.yesterdayDate}\n昨日总投: ${brief.totalSent} 家\nHR 回复: ${brief.repliedCount} 家 (综合回复率: ${brief.replyRate}%)\n今日建议: ${brief.actionAdvice}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isParchment
          ? 'bg-[#faf7f2] border-stone-300/80 shadow-md text-stone-900'
          : 'bg-[#151224]/90 border-white/10 shadow-2xl backdrop-blur-xl text-white'
      } space-y-4 select-none relative overflow-hidden`}
    >
      {/* 头部标题与时点 */}
      <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${isParchment ? 'border-black/10' : 'border-white/10'}`}>
        <div className="flex items-center gap-2.5">
          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center border ${
              isParchment
                ? 'bg-amber-100 text-amber-700 border-amber-300'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}
          >
            <Sun className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isParchment ? 'text-stone-900' : 'text-white'}`}>
                {viewingDate ? '历史战报回看' : '投递早报 · 昨日反馈归纳复盘'}
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full border font-mono font-medium ${
                  isParchment
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                }`}
              >
                每日 09:00 定时结算
              </span>
            </div>
            <p className={`text-sm mt-0.5 ${isParchment ? 'text-stone-500' : 'text-stone-300'}`}>
              统计周期: {brief.yesterdayDate} 昨日全天多平台投递成效复盘
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {viewingDate && (
            <button
              type="button"
              onClick={onBackToYesterday}
              className="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-400 text-xs font-mono flex items-center gap-1 border border-sky-500/30"
            >
              <History className="h-3 w-3" />
              <span>返回最新</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopySummary}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
              isParchment
                ? 'bg-stone-200 hover:bg-stone-300 text-stone-800 border-stone-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? '已复制战报' : '复制晨报摘要'}</span>
          </button>
        </div>
      </div>

      {/* 核心指标四宫格 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className={`rounded-xl p-3 border ${isParchment ? 'bg-white border-stone-200' : 'bg-black/30 border-white/5'}`}>
          <span className={`text-xs font-medium ${isParchment ? 'text-stone-600' : 'text-slate-300'}`}>昨日总投递</span>
          <p className="mt-1 font-mono text-xl sm:text-2xl font-bold text-amber-500">
            {brief.totalSent} <span className="text-sm font-normal font-sans">家</span>
          </p>
        </div>

        <div className={`rounded-xl p-3 border ${isParchment ? 'bg-white border-stone-200' : 'bg-black/30 border-white/5'}`}>
          <span className={`text-xs font-medium ${isParchment ? 'text-stone-600' : 'text-slate-300'}`}>HR 回复</span>
          <p className="mt-1 font-mono text-xl sm:text-2xl font-bold text-emerald-500">
            {brief.repliedCount} <span className="text-sm font-normal font-sans">家</span>
          </p>
        </div>

        <div className={`rounded-xl p-3 border ${isParchment ? 'bg-white border-stone-200' : 'bg-black/30 border-white/5'}`}>
          <span className={`text-xs font-medium ${isParchment ? 'text-stone-600' : 'text-slate-300'}`}>综合回复率</span>
          <p className="mt-1 font-mono text-xl sm:text-2xl font-bold text-cyan-500">
            {brief.replyRate}%
          </p>
        </div>

        <div className={`rounded-xl p-3 border ${isParchment ? 'bg-white border-stone-200' : 'bg-black/30 border-white/5'}`}>
          <span className={`text-xs font-medium ${isParchment ? 'text-stone-600' : 'text-slate-300'}`}>等待回复</span>
          <p className={`mt-1 font-mono text-xl sm:text-2xl font-bold ${isParchment ? 'text-stone-600' : 'text-stone-300'}`}>
            {brief.unrepliedCount} <span className="text-sm font-normal font-sans">家</span>
          </p>
        </div>
      </div>

      {/* 各平台分流明细 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {brief.platformBreakdown.map((p) => (
          <div
            key={p.id}
            className={`rounded-xl p-2.5 border flex items-center justify-between text-xs ${
              isParchment ? 'bg-stone-50 border-stone-200' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="font-semibold">{p.name}</span>
            </div>
            <div className="font-mono text-right">
              <span>{p.sent} 投 / </span>
              <strong style={{ color: p.color }}>{p.replied} 答</strong>
              <span className="text-xs text-slate-400 ml-1">({p.rate}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI 巡航洞察与行动建议 */}
      <div className={`rounded-xl p-3.5 border ${isParchment ? 'bg-amber-50/80 border-amber-200 text-stone-800' : 'bg-purple-950/20 border-purple-500/20 text-purple-200'}`}>
        <div className="flex items-center gap-1.5 font-bold text-xs">
          <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
          <span>算法智能诊断与行动策略：</span>
        </div>
        <p className={`mt-1 text-xs leading-relaxed ${isParchment ? 'text-stone-700' : 'text-purple-300/80'}`}>
          {brief.insight} {brief.actionAdvice}
        </p>
      </div>
    </div>
  );
}
