'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, Code2, Cpu, Shield, Terminal } from 'lucide-react';

/**
 * FlipCard —— 3D 双面高光翻转卡片（React Bits 核心组件）
 *
 * 1. 3D 视差与真实物理翻转（transform-style: preserve-3d）；
 * 2. 正面：可视化架构与系统生态；
 * 3. 背面：硬核底层 Python/nodriver 与 Rust 进程隔离技术解密；
 * 4. 彻底杜绝绝对定位坍缩（锁死 w-full min-w-[300px] h-[450px]）。
 */
export function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full min-w-[300px] max-w-[500px] h-[450px] select-none [perspective:1400px]">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full [transform-style:preserve-3d] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* 正面：系统架构全景 */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl border border-white/15 bg-gradient-to-b from-[#181628] via-[#12111f] to-[#0c0a15] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/20 text-accent border border-accent/30">
                  <Cpu size={16} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white tracking-wide">
                    系统架构与技术选型
                  </h4>
                  <p className="font-mono text-[10px] text-accent">ARCHITECTURE OVERVIEW</p>
                </div>
              </div>
              <span className="rounded bg-accent/20 px-2 py-0.5 font-mono text-[10px] text-accent font-semibold border border-accent/30">
                正面 · 架构
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-paper font-semibold">① 前端交互展示层</span>
                  <span className="text-accent font-bold">React 19 + Tailwind</span>
                </div>
                <p className="mt-1 text-[11px] text-paper-muted leading-relaxed">
                  60fps 丝滑视差动画，暗黑极客美学，跨 macOS / Windows 原生响应。
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-paper font-semibold">② 桌面容器与权限桥</span>
                  <span className="text-emerald-400 font-bold">Tauri 2.0 (Rust)</span>
                </div>
                <p className="mt-1 text-[11px] text-paper-muted leading-relaxed">
                  比传统 Electron 节省 90% 内存开销，安装包轻至数十兆，系统级原生权限。
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-paper font-semibold">③ 巡航自动化引擎</span>
                  <span className="text-purple-400 font-bold">Python 3.12 + Nodriver</span>
                </div>
                <p className="mt-1 text-[11px] text-paper-muted leading-relaxed">
                  0-Driver 纯协议注入，无 Selenium 显性指纹，多进程异步高并发巡航。
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-paper-muted">
            <span className="text-emerald-400">100% 本机持久化</span>
            <span className="flex items-center gap-1.5 text-accent font-semibold bg-accent/10 px-2.5 py-1 rounded-lg border border-accent/20">
              <RefreshCw size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>点击翻转卡片</span>
            </span>
          </div>
        </div>

        {/* 背面：硬核底层反爬与隐私隔离 */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl border border-accent/50 bg-gradient-to-b from-[#1c1730] via-[#141122] to-[#0d0b17] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Shield size={16} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white tracking-wide">
                    反爬穿透与隐私沙盒
                  </h4>
                  <p className="font-mono text-[10px] text-emerald-400">DEEP-DIVE SECURITY</p>
                </div>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-semibold border border-emerald-500/30">
                背面 · 底层
              </span>
            </div>

            <div className="mt-4 space-y-2.5 font-mono text-[11px]">
              <div className="rounded-xl border border-white/10 bg-black/50 p-3">
                <div className="flex items-center gap-1.5 text-accent font-semibold">
                  <Terminal size={12} />
                  <span>0-Driver CDP 原生协议双工通道</span>
                </div>
                <p className="mt-1 text-[11px] text-paper-dim leading-relaxed font-sans">
                  彻底废除传统 ChromeDriver 驱动，直接通过 Chrome DevTools 协议通信，完全抹除 <code>navigator.webdriver = true</code> 自动化指纹。
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/50 p-3">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Code2 size={12} />
                  <span>SQLite 本地密钥环沙盒隔离</span>
                </div>
                <p className="mt-1 text-[11px] text-paper-dim leading-relaxed font-sans">
                  所有平台登录 Session、聊天历史与求职简历全部留存于用户本机数据目录，绝不上报远程数据库，从物理层面捍卫隐私主权。
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-paper-muted">
            <span className="text-emerald-400">开源审计 · 纯净无广告</span>
            <span className="flex items-center gap-1.5 text-accent font-semibold bg-accent/10 px-2.5 py-1 rounded-lg border border-accent/20">
              <RefreshCw size={12} />
              <span>点击翻回正面</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
