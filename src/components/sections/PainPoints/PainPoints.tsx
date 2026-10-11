import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { X, Check } from 'lucide-react';

const COMPARISONS = [
  {
    other: 'AI 自动生成招呼语',
    ours: '你自己写的话，一字不改',
    note: '不生成、不猜测、不替你说话',
  },
  {
    other: '黑箱推荐算法',
    ours: '本地关键词规则，白纸黑字',
    note: 'exclude → required → any，顺序固定、结果可预期',
  },
  {
    other: '批量轰炸、无上限',
    ours: '小批量 + 随机等待 + 每日上限',
    note: '默认每日 80 条，每次发送后随机等 10–60 秒',
  },
  {
    other: '需要 AI API Key',
    ours: '0 个 Key，装好就能跑',
    note: '0.2 已移除 LLM、RAG、向量库',
  },
];

/**
 * 痛点对比 —— 为什么「故意做慢」。
 *
 * 表现层：无 heavy 特效，纯 InView 滚动进场。
 * 内容层：四组对比，把「克制」翻译成用户语言。
 */
export function PainPoints() {
  return (
    <section id="why" className="border-t border-line py-24 sm:py-32">
      <div className="container-content">
        <InView>
          <SectionHeading
            eyebrow="为什么做它"
            title="不是 AI，不猜你想要什么"
            description="市面上大多数求职工具越做越「智能」，但也越做越黑箱。我们把方向反过来：规则透明、节奏克制、话由你写。"
          />
        </InView>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {COMPARISONS.map((item, i) => (
            <InView key={item.other} transition={{ delay: i * 0.08 }}>
              <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-6">
                <div className="flex items-start gap-3">
                  <X size={18} className="mt-0.5 shrink-0 text-paper-muted" aria-hidden />
                  <p className="text-sm text-paper-muted line-through">{item.other}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <p className="text-sm font-medium text-paper">{item.ours}</p>
                </div>
                <p className="label-mono text-[11px] text-accent/70">{item.note}</p>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
