import { ArrowRight, GitBranch } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/**
 * 开始使用 —— 下载入口 + 快速开始命令。
 *
 * ⚠️ 项目尚未开源/打包：`downloads[].href` 为空时渲染成不可点的占位行，
 * `github.repoUrl` 为空时不渲染 GitHub 按钮，改为「即将开源」提示。
 */
export function Start() {
  const repoUrl = siteConfig.github.repoUrl;
  const published = siteConfig.release.published && Boolean(repoUrl);

  return (
    <section id="start" className="border-t border-line py-20 sm:py-32">
      <div className="container-content">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2">
          {/* 下载 */}
          <div className="min-w-0">
            <p className="label-mono mb-4 text-accent">开始使用</p>
            <h2 className="font-display text-2xl text-paper sm:text-3xl">
              {published ? '下载桌面版' : '即将发布'}
            </h2>
            <p className="mt-4 text-sm text-paper-muted sm:text-base">
              {published ? '首次运行前请确保已安装 Chrome。' : siteConfig.release.note}
            </p>

            <div className="mt-8 grid gap-4">
              {siteConfig.downloads.map((dl) => {
                const available = Boolean(dl.href);
                const inner = (
                  <>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-accent">
                      <Icon name={dl.icon} size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-paper">{dl.platform}</p>
                      <p className="text-xs text-paper-muted">{dl.note}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="ml-auto shrink-0 text-paper-muted"
                      aria-hidden
                    />
                  </>
                );

                return available ? (
                  <a
                    key={dl.platform}
                    href={dl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent sm:p-5"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={dl.platform}
                    className="flex items-center gap-4 rounded-lg border border-line bg-surface/50 p-4 sm:p-5"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 从源码运行 */}
          <div className="min-w-0">
            <p className="label-mono mb-4 text-accent">或者从源码跑</p>
            <h2 className="font-display text-2xl text-paper sm:text-3xl">
              一行命令启动桌面端
            </h2>
            <p className="mt-4 text-sm text-paper-muted sm:text-base">
              {published
                ? '如果你习惯命令行，克隆仓库后一行命令即可启动桌面界面。'
                : '开源仓库发布后，克隆下来一行命令即可启动桌面界面。'}
            </p>

            <div className="mt-8 overflow-hidden rounded-lg border border-line bg-surface">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-paper-muted">bash</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs text-paper-dim sm:p-5 sm:text-sm">
                <code>{`git clone <仓库地址>
cd Bosszhipin-job-bot
uv sync
${siteConfig.quickStart}`}</code>
              </pre>
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                href={published ? repoUrl : undefined}
                disabled={!published}
                className="w-full justify-center sm:w-auto"
              >
                <GitBranch size={16} aria-hidden />
                <span>{published ? '查看完整文档' : siteConfig.release.badge}</span>
                {published ? <ArrowRight size={16} aria-hidden /> : null}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
