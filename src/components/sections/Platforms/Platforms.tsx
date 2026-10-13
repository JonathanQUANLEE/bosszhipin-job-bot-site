import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { PlatformCard } from './PlatformCard';

/**
 * 支持平台 —— 把「一次配置，多平台投递」讲清楚。
 */
export function Platforms() {
  return (
    <section id="platforms" className="border-t border-line bg-surface py-20 sm:py-32">
      <div className="container-content">
        <InView>
          <SectionHeading
            eyebrow="支持平台"
            title="一次配置，三个平台一起投"
            description="每个平台的投递动作不一样，规则也不一样 —— 这些差异它已经替你处理好了。你不用在三个网站之间来回切换。"
            align="center"
          />
        </InView>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.platforms.map((platform, i) => (
            <InView key={platform.id} transition={{ delay: i * 0.08 }}>
              <PlatformCard platform={platform} />
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
