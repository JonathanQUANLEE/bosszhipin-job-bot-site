'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '@/config/site';
import { AnimatedNumber } from '@/components/effects/AnimatedNumber/AnimatedNumber';
import { ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';

const STAT_ACCENTS = [
  {
    color: 'text-amber-400',
    border: 'border-amber-500/25',
    bg: 'bg-amber-950/20',
    sparkline: 'M0 20 Q 25 5, 50 15 T 100 2',
    tag: '高星认证',
  },
  {
    color: 'text-purple-400',
    border: 'border-purple-500/25',
    bg: 'bg-purple-950/20',
    sparkline: 'M0 18 Q 30 18, 50 6 T 100 4',
    tag: '安全投递',
  },
  {
    color: 'text-emerald-400',
    border: 'border-emerald-500/25',
    bg: 'bg-emerald-950/20',
    sparkline: 'M0 12 Q 25 22, 60 8 T 100 14',
    tag: '排雷外包',
  },
  {
    color: 'text-sky-400',
    border: 'border-sky-500/25',
    bg: 'bg-sky-950/20',
    sparkline: 'M0 22 Q 40 18, 70 8 T 100 2',
    tag: '省时减负',
  },
];

export function HeroStatsDrawer() {
  const [isOverviewFolded, setIsOverviewFolded] = useState(false);

  const toggleFold = () => {
    setIsOverviewFolded((prev) => !prev);
    if (!isOverviewFolded) {
      // 折叠收走第一张后，平滑滚动至下方真实数据走势
      const el = document.getElementById('analytics');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 320);
      }
    }
  };

  return (
    <div className="mt-14 sm:mt-20 select-none">
      {/* 第一张：海投指标卡片组（支持平滑折叠收走） */}
      <AnimatePresence initial={false}>
        {!isOverviewFolded && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -15 }}
            animate={{
              height: 'auto',
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              y: -20,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
              {siteConfig.stats.map((stat, i) => {
                const a = STAT_ACCENTS[i % STAT_ACCENTS.length]!;

                return (
                  <div
                    key={stat.label}
                    className={`relative overflow-hidden rounded-2xl border ${a.border} ${a.bg} p-4 sm:p-5 backdrop-blur-xl transition-all hover:scale-[1.02] shadow-xl flex flex-col justify-between`}
                  >
                    <div>
                      <div className="mb-2">
                        <p className="text-sm font-medium text-slate-300 truncate">{stat.label}</p>
                      </div>

                      <div className={`font-mono text-2xl sm:text-3xl lg:text-4xl font-bold ${a.color} tracking-tight`}>
                        <AnimatedNumber value={stat.value} suffix={stat.suffix ?? ''} />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">持续守护</span>
                      <svg className="w-16 h-5 opacity-70" viewBox="0 0 100 24" fill="none">
                        <path
                          d={a.sparkline}
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className={a.color}
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 交互式折叠控制条 */}
      <div className="mt-5 flex items-center justify-center">
        <button
          type="button"
          onClick={toggleFold}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full border text-sm font-medium transition-all shadow-lg group ${
            isOverviewFolded
              ? 'border-purple-500/40 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25'
              : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <BarChart2 size={15} className={isOverviewFolded ? 'text-purple-300' : 'text-slate-400'} />
          <span>
            {isOverviewFolded
              ? '▲ 展开项目核心数据看板'
              : '▼ 查看三大平台 14 天详细走势与每日晨报'}
          </span>
          {isOverviewFolded ? (
            <ChevronUp size={15} className="group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}
