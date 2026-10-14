'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Scissors, CheckCircle2, GitBranch, Globe } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * TearTicket —— 物理撕票根开启求职通行证
 *
 * 全黑曜石暗黑极客质感，霓虹齿孔与粒子光晕，
 * 亲手撕下带齿孔和断裂纤维的副券，解锁成熟线上站直接体验！
 */
export function TearTicket() {
  const [isTorn, setIsTorn] = useState(false);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-xl mx-auto">
      {/* 顶部引导提示 */}
      <div className="mb-4 flex items-center justify-between w-full text-xs font-mono text-white/80">
        <span className="flex items-center gap-1.5 text-accent font-semibold">
          <Ticket size={15} />
          <span>求职早报 · 极客专属巡航通行证</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
          <Scissors size={13} className="text-amber-300" />
          <span>{isTorn ? '已亲手撕开解锁！' : '亲手撕开右侧副券开启'}</span>
        </span>
      </div>

      {/* 票据主体：黑曜石深邃质感与渐变光晕 */}
      <div className="relative w-full rounded-2xl p-1 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(192,132,252,0.15)] bg-gradient-to-r from-purple-500/30 via-indigo-500/20 to-accent/30 border border-white/10">
        <div className="relative flex flex-col sm:flex-row items-stretch rounded-xl overflow-hidden bg-gradient-to-br from-[#161424] via-[#12101d] to-[#0c0a14] text-white">
          {/* 主券左侧信息 */}
          <div className="flex-1 p-6 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-purple-600 text-white font-bold text-xs shadow-sm">
                  JK
                </span>
                <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                  JOBKOI BOARDING PASS
                </span>
              </div>
              <span className="rounded-full bg-accent/20 border border-accent/40 px-2.5 py-0.5 font-mono text-[10px] text-accent font-bold">
                VIP #8848 · 免安装
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold text-white tracking-wide">
                全自动多平台求职特权通行证
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                凭此凭证即可解锁三大招聘平台 0 驱动并发巡航、拟人化随机延时防封算法与多模态结构化简历解析。内置免费 API Key，开箱即用。
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono font-semibold text-slate-300">
              <span className="rounded-md bg-white/5 px-2 py-0.5 border border-white/10 text-emerald-400">
                ✓ 100% 本地离线
              </span>
              <span className="rounded-md bg-white/5 px-2 py-0.5 border border-white/10 text-purple-300">
                ✓ 内置免费大模型
              </span>
              <span className="rounded-md bg-white/5 px-2 py-0.5 border border-white/10 text-amber-300">
                ✓ 自动屏蔽外包培训
              </span>
            </div>
          </div>

          {/* 拟真齿孔撕裂中缝 */}
          <div className="relative hidden sm:flex flex-col items-center justify-between w-6 py-2 overflow-hidden bg-[#12101d]">
            {/* 上半圆齿孔凹槽 */}
            <div className="h-6 w-6 -translate-y-3 rounded-full bg-[#0b0914] shadow-inner border-b border-white/10" />

            {/* 虚线打孔排 */}
            <div className="h-full w-px border-r-2 border-dashed border-white/20 my-1" />

            {/* 下半圆齿孔凹槽 */}
            <div className="h-6 w-6 translate-y-3 rounded-full bg-[#0b0914] shadow-inner border-t border-white/10" />
          </div>

          {/* 副券右侧：可撕裂区域 */}
          <div className="relative w-full sm:w-48 flex flex-col justify-center items-center p-5 border-t sm:border-t-0 sm:border-l border-white/10 bg-[#141221]">
            <AnimatePresence mode="wait">
              {!isTorn ? (
                /* 未撕开状态：点击撕开 */
                <motion.div
                  key="untorn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTorn(true)}
                  className="cursor-pointer flex flex-col items-center justify-center text-center p-4 rounded-xl border-2 border-dashed border-accent/40 bg-accent/10 hover:bg-accent/20 transition-all w-full h-full shadow-sm"
                >
                  <Scissors size={24} className="text-accent animate-bounce" />
                  <span className="mt-2 text-xs font-bold text-white tracking-wider">
                    亲手撕下此联
                  </span>
                  <span className="mt-0.5 font-mono text-[9px] font-semibold text-accent">
                    TEAR TO UNLOCK
                  </span>
                </motion.div>
              ) : (
                /* 已撕裂状态：撕裂分离动效与展示解锁状态 */
                <motion.div
                  key="torn"
                  initial={{ rotateZ: -12, scale: 0.8, opacity: 0 }}
                  animate={{ rotateZ: 0, scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center justify-center text-center w-full"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="mt-2 text-xs font-bold text-emerald-400">
                    已成功解锁！
                  </span>
                  <span className="font-mono text-[10px] text-paper-muted mt-0.5">
                    PASS_READY
                  </span>

                  <div className="mt-3 flex flex-col gap-1.5 w-full">
                    <a
                      href="https://jonathanquanlee.github.io/bosszhipin-job-bot-site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors shadow-md"
                    >
                      <Globe size={13} className="text-emerald-400" />
                      <span>线上直接体验</span>
                    </a>
                    <a
                      href={siteConfig.github.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-medium text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      <GitBranch size={12} className="text-accent" />
                      <span>GitHub 仓库</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
