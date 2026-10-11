import { Icon } from '@/components/ui/Icon';
import { SpotlightCard } from '@/components/effects/SpotlightCard/SpotlightCard';
import type { Feature } from '@/types/site';

interface FeatureCardProps {
  feature: Feature;
}

/**
 * 功能特性卡片 —— 叠加 SpotlightCard 聚光跟随。
 * @see EFFECT_REGISTRY.spotlightCards
 */
export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <SpotlightCard className="flex flex-col gap-4 bg-surface p-7 transition-colors hover:bg-surface-raised">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-accent">
        <Icon name={feature.icon} size={20} />
      </div>
      <h3 className="font-display text-lg text-paper">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-paper-dim">{feature.description}</p>
    </SpotlightCard>
  );
}
