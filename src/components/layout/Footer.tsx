import Image from 'next/image';
import { siteConfig } from '@/config/site';
import logoImg from '../../../public/logo.png';

/** 页脚：开源信息、致谢、免责声明。 */
export function Footer() {
  const repoUrl = siteConfig.github.repoUrl;
  const published = siteConfig.release.published && Boolean(repoUrl);

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-content py-10 sm:py-14">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={logoImg}
                alt="JobKoi 锦鲤求职"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl shadow-md object-cover"
              />
              <p className="font-display text-xl text-paper">{siteConfig.name}</p>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-muted">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 text-xs leading-relaxed text-paper-muted">{siteConfig.credits}</p>
          </div>

          <div className="text-sm">
            <p className="label-mono mb-4 text-accent">开源</p>
            <ul className="space-y-2.5">
              <li>
                {published ? (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper-dim transition-colors hover:text-accent"
                  >
                    项目仓库
                  </a>
                ) : (
                  <span className="font-mono text-xs text-paper-muted">
                    项目仓库 · {siteConfig.release.badge}
                  </span>
                )}
              </li>
              <li>
                <a
                  href={siteConfig.github.inspirationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper-dim transition-colors hover:text-accent"
                >
                  灵感来源
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.github.siteRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper-dim transition-colors hover:text-accent"
                >
                  本页源码
                </a>
              </li>
            </ul>
            <p className="mt-6 font-mono text-xs text-paper-muted">
              License · {siteConfig.license}
            </p>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-paper-muted">
          {siteConfig.disclaimer}
        </p>
      </div>
    </footer>
  );
}
