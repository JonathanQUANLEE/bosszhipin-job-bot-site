import { SpotlightCard } from '@/components/effects/SpotlightCard/SpotlightCard';
import type { PaceTier } from '@/types/site';

interface PaceCardProps {
  tier: PaceTier;
}

/** 单个投递节奏档位卡片 —— 叠加 SpotlightCard 聚光跟随。 */
export function PaceCard({ tier }: PaceCardProps) {
  return (
    <SpotlightCard className="relative flex flex-col gap-4 rounded-xl border border-line bg-base p-5 sm:p-7">
      {tier.recommended ? (
        <span className="label-mono absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] text-base">
          推荐
        </span>
      ) : null}

      <p className="font-display text-lg text-paper">{tier.name}</p>

      <p className="font-mono text-2xl font-semibold text-accent sm:text-3xl">{tier.delay}</p>

      <p className="text-sm leading-relaxed text-paper-dim">{tier.scenario}</p>
    </SpotlightCard>
  );
}
