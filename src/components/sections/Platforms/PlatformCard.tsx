import { Sparkles } from 'lucide-react';
import type { Platform } from '@/types/site';

interface PlatformCardProps {
  platform: Platform;
}

/**
 * 单个招聘平台卡片。
 * `comingSoon` 为 true 时降级为「筹备中」样式，不可点击。
 */
export function PlatformCard({ platform }: PlatformCardProps) {
  const soon = platform.comingSoon === true;

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border p-5 sm:p-6 ${
        soon ? 'border-line bg-surface/50' : 'border-line bg-surface'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`label-mono rounded-md border px-2 py-1 text-[10px] ${
            soon ? 'border-line text-paper-muted' : 'border-accent/40 text-accent'
          }`}
        >
          {platform.short}
        </span>
        {soon ? (
          <span className="flex items-center gap-1 text-[11px] text-paper-muted">
            <Sparkles size={12} aria-hidden />
            筹备中
          </span>
        ) : null}
      </div>

      <h3 className={`font-display text-lg ${soon ? 'text-paper-muted' : 'text-paper'}`}>
        {platform.name}
      </h3>

      <p className={`text-sm ${soon ? 'text-paper-muted' : 'text-paper-dim'}`}>
        {platform.action}
      </p>

      <p className="label-mono mt-auto pt-2 text-[11px] text-paper-muted">{platform.note}</p>
    </div>
  );
}
