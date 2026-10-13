import { SpotlightCard } from '@/components/effects/SpotlightCard/SpotlightCard';
import { Icon } from '@/components/ui/Icon';
import type { Feature } from '@/types/site';

interface FeatureRowProps {
  feature: Feature;
  /** 序号（从 0 开始），用于展示 01 / 02 … */
  index: number;
}

/**
 * 功能模块行 —— 用于 Features 的粘性滚动叙事。
 *
 * 结构：序号 + 图标 + 标题 + 描述。叠加 SpotlightCard 聚光跟随。
 */
export function FeatureRow({ feature, index }: FeatureRowProps) {
  const order = String(index + 1).padStart(2, '0');

  return (
    <SpotlightCard className="group flex gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40 sm:gap-6 sm:p-7">
      <p className="font-mono text-xs text-accent/60 sm:text-sm">{order}</p>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-accent transition-colors group-hover:border-accent/50 sm:h-10 sm:w-10">
            <Icon name={feature.icon} size={18} />
          </div>
          <h3 className="font-display text-lg text-paper sm:text-xl">{feature.title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-paper-dim">{feature.description}</p>
      </div>
    </SpotlightCard>
  );
}
