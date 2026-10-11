import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/**
 * 开始使用 —— 下载入口 + 快速开始命令。
 */
export function Start() {
  return (
    <section id="start" className="border-t border-line py-24 sm:py-32">
      <div className="container-content">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* 下载 */}
          <div>
            <p className="label-mono mb-4 text-accent">开始使用</p>
            <h2 className="font-display text-3xl text-paper">下载桌面版</h2>
            <p className="mt-4 text-base text-paper-muted">
              支持 Windows、macOS、Linux。首次运行前请确保已安装 Chrome 与 uv。
            </p>

            <div className="mt-8 grid gap-4">
              {siteConfig.downloads.map((dl) => (
                <a
                  key={dl.platform}
                  href={dl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-accent">
                    <Icon name={dl.icon} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-paper">{dl.platform}</p>
                    <p className="text-xs text-paper-muted">{dl.note}</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-paper-muted" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* 快速开始 */}
          <div>
            <p className="label-mono mb-4 text-accent">或者从源码跑</p>
            <h2 className="font-display text-3xl text-paper">一行命令启动 GUI</h2>
            <p className="mt-4 text-base text-paper-muted">
              如果你习惯命令行，克隆仓库后一行命令即可启动桌面界面。
            </p>

            <div className="mt-8 overflow-hidden rounded-lg border border-line bg-surface">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-paper-muted">bash</span>
              </div>
              <pre className="p-5 font-mono text-sm text-paper-dim">
                <code>{`git clone https://github.com/4evour/Bosszhipin-job-bot.git
cd Bosszhipin-job-bot
uv sync
${siteConfig.quickStart}`}</code>
              </pre>
            </div>

            <div className="mt-6 flex gap-4">
              <Button href={siteConfig.github.repoUrl}>
                查看完整文档
                <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
