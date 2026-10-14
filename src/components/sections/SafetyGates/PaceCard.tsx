import { SpotlightCard } from '@/components/effects/SpotlightCard/SpotlightCard';
import type { PaceTier } from '@/types/site';

interface PaceCardProps {
  tier: PaceTier;
}

/** 单个投递节奏档位卡片 —— 叠加 SpotlightCard 聚光跟随。 */
export function PaceCard({ tier }: PaceCardProps) {
  const isRecommended = Boolean(tier.recommended);
  const isSprint = tier.id === 'sprint';

  const cardStyle = isRecommended
    ? 'border-accent/40 bg-gradient-to-b from-purple-950/30 via-[#181329] to-[#0e0a18] shadow-[0_10px_35px_rgba(192,132,252,0.15)]'
    : isSprint
    ? 'border-cyan-500/30 bg-gradient-to-b from-cyan-950/25 via-[#101928] to-[#090f18] shadow-lg'
    : 'border-emerald-500/30 bg-gradient-to-b from-emerald-950/25 via-[#101f19] to-[#091410] shadow-lg';

  const delayColor = isRecommended
    ? 'text-accent'
    : isSprint
    ? 'text-cyan-400'
    : 'text-emerald-400';

  return (
    <SpotlightCard className={`relative flex flex-col gap-4 rounded-2xl border p-6 sm:p-7 backdrop-blur-xl transition-all hover:scale-[1.02] ${cardStyle}`}>
      {isRecommended ? (
        <span className="label-mono absolute -top-3 left-6 rounded-full bg-gradient-to-r from-accent via-[#d8b4fe] to-[#ffcdff] px-3.5 py-1 text-[11px] font-bold text-[#0b0914] shadow-md shadow-purple-500/30">
          ★ 官方强烈推荐
        </span>
      ) : null}

      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <p className="font-display text-lg font-bold text-white tracking-wide">{tier.name}</p>
        <span className="font-mono text-[10px] text-white/50 uppercase">
          {tier.id.toUpperCase()}_MODE
        </span>
      </div>

      <p className={`font-mono text-2xl font-bold sm:text-3xl tracking-tight ${delayColor}`}>
        {tier.delay}
      </p>

      <p className="text-xs leading-relaxed text-slate-300">{tier.scenario}</p>
    </SpotlightCard>
  );
}
