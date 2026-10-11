import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';

const FAQS = [
  {
    q: '会被 BOSS 直聘封号吗？',
    a: '任何浏览器自动化工具都存在账号风险。我们做了四件事降低概率：独立 Chrome profile、随机等待、每日上限、验证码熔断。但风险无法归零，请合理控制使用频率。',
  },
  {
    q: '需要准备什么？',
    a: '一台装了 Chrome 的电脑，以及 uv（Python 包管理器）。首次运行需要扫码登录 BOSS 直聘，登录态会保存在本地目录，下次无需重复登录。',
  },
  {
    q: '为什么移除 AI 功能？',
    a: '0.1 版本曾实验性地接入 LLM 生成招呼语，但带来了三个问题：需要 API key、生成结果不可预期、有数据外泄顾虑。0.2 决定全部移除，回归「固定招呼语 + 本地规则」。',
  },
  {
    q: '可以和其它招聘平台一起用吗？',
    a: '目前只支持 BOSS 直聘。架构上基于 nodriver（CDP）封装，理论上可以扩展，但暂无计划。欢迎提交 PR 或 fork 后自行适配。',
  },
  {
    q: '收费吗？',
    a: '完全免费，MIT 开源。没有付费版、没有功能限制、没有数据收集。',
  },
];

/**
 * 常见问题 —— 把技术圈关心的顾虑摊开说。
 */
export function FAQ() {
  return (
    <section id="faq" className="border-t border-line bg-surface py-20 sm:py-32">
      <div className="container-content max-w-3xl">
        <InView>
          <SectionHeading
            eyebrow="常见问题"
            title="把顾虑摊开说"
            align="center"
          />
        </InView>

        <div className="mt-12 flex flex-col gap-4 sm:mt-16 sm:gap-6">
          {FAQS.map((item, i) => (
            <InView key={item.q} transition={{ delay: i * 0.06 }}>
              <details className="group rounded-xl border border-line bg-base p-5 open:border-accent/30 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base text-paper sm:text-lg">
                  {item.q}
                  <span className="ml-3 shrink-0 text-paper-muted transition-transform group-open:rotate-180 sm:ml-4">▼</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-paper-dim">{item.a}</p>
              </details>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
