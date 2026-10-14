'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles } from 'lucide-react';

const BOOT_LOGS = [
  'INITIALIZING JOBKOI_AUTO_PILOT v1.0.0...',
  'CHECKING TAURI 2 NATIVE DESKTOP ENVIRONMENT... [ONLINE]',
  'VERIFYING NODRIVER 0-DRIVER STEALTH ANTI-FINGERPRINT... [SECURE]',
  'CONNECTING LOCAL EMBEDDED RESUME PARSER (PDF/DOCX)... [READY]',
  'MULTI-PLATFORM PATROL RADAR ARMED: BOSS · ZHILIAN · LIEPIN...',
  'SYSTEM READY. WELCOME TO SMARTER JOB HUNTING.',
];

/**
 * CinematicEntrance —— 电影级开场进场仪式（借鉴 grail-app.com）
 *
 * 1. 极客终端打字机初始化日志；
 * 2. 中心紫光水墨柔光扩散（Radial Glow Expansion）；
 * 3. 丝滑揭幕（Curtain Reveal）过渡至主界面；
 * 4. 支持 ESC / 点击跳过，sessionStorage 记录防频繁打扰，支持 prefers-reduced-motion。
 */
export function CinematicEntrance() {
  const [visible, setVisible] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const dismiss = useCallback(() => {
    setIsFinishing(true);
    setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('jobkoi_intro_played', '1');
      } catch {
        // 忽略私密模式读写限制
      }
    }, 600);
  }, []);

  useEffect(() => {
    // 检查减弱动效偏好
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 检查是否在当前会话已播放过
    try {
      if (sessionStorage.getItem('jobkoi_intro_played')) {
        return;
      }
    } catch {
      // 忽略
    }

    setVisible(true);

    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => {
        if (prev + 1 >= BOOT_LOGS.length) {
          clearInterval(interval);
          setTimeout(dismiss, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 280);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-entrance"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFinishing ? 0 : 1, scale: isFinishing ? 1.05 : 1, filter: isFinishing ? 'blur(16px)' : 'blur(0px)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050408] px-4 select-none"
      >
        {/* 背景径向柔光墨水扩散 */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.2, 1.6], opacity: [0.15, 0.35, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-accent/30 via-purple-600/20 to-transparent blur-[120px]"
        />

        {/* 极客终端卡片 */}
        <div className="relative z-10 w-full max-w-xl rounded-2xl border border-white/10 bg-[#0c0a14]/90 p-6 shadow-2xl backdrop-blur-2xl">
          {/* 顶栏控制灯 */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <div className="ml-3 flex items-center gap-2 text-xs font-mono text-paper-muted">
                <Terminal size={14} className="text-accent" />
                <span>jobkoi-runtime-init.sh</span>
              </div>
            </div>

            <button
              onClick={dismiss}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 text-xs font-mono text-paper-muted transition-colors hover:border-white/20 hover:bg-white/5 hover:text-paper"
            >
              <span>跳过</span>
              <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px]">ESC</kbd>
            </button>
          </div>

          {/* 终端日志流 */}
          <div className="mt-5 space-y-2.5 font-mono text-xs sm:text-sm">
            {BOOT_LOGS.slice(0, currentLineIndex + 1).map((log, idx) => {
              const isLast = idx === currentLineIndex;
              const isSuccess = log.includes('[ONLINE]') || log.includes('[SECURE]') || log.includes('[READY]');
              return (
                <div key={log} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-accent/60 select-none">&gt;</span>
                  <span className={isSuccess ? 'text-emerald-400 font-medium' : isLast ? 'text-paper' : 'text-paper-dim'}>
                    {log}
                  </span>
                  {isLast && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                      className="inline-block h-4 w-2 rounded-sm bg-accent align-middle"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* 底部微光提示 */}
          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] font-mono text-paper-muted">
            <div className="flex items-center gap-1.5 text-accent">
              <Sparkles size={12} />
              <span>Next-Gen Autonomous Agent</span>
            </div>
            <span>Press ESC or Click to enter</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
