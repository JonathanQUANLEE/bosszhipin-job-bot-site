import { SpotlightCard } from '@/components/effects/SpotlightCard/SpotlightCard';
import type { RunModeInfo } from '@/types/site';

interface ModeCardProps {
  mode: RunModeInfo;
}

/** 单个运行模式卡片 —— 叠加 SpotlightCard 聚光跟随。 */
export function ModeCard({ mode }: ModeCardProps) {
  return (
    <SpotlightCard className="relative flex flex-col gap-4 rounded-xl border border-line bg-base p-7">
      {mode.recommended ? (
        <span className="label-mono absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] text-base">
          推荐起点
        </span>
      ) : null}

      <div className="flex items-baseline gap-3">
        <p className="font-mono text-3xl font-semibold text-accent">{mode.name}</p>
        <p className="text-base text-paper">{mode.title}</p>
      </div>

      <p className="text-sm leading-relaxed text-paper-dim">{mode.behavior}</p>

      <div className="mt-auto border-t border-line pt-4">
        <p className="label-mono mb-1 text-paper-muted">适合场景</p>
        <p className="text-sm text-paper-dim">{mode.scenario}</p>
      </div>
    </SpotlightCard>
  );
}
