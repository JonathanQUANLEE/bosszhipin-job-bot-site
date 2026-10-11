import { GitBranch } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

const NAV_ITEMS = [
  { label: '它做什么', href: '#what' },
  { label: '三道闸门', href: '#gates' },
  { label: '开始使用', href: '#start' },
];

/** 固定在顶部的导航。 */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-base/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg text-paper">
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-paper-dim transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button href={siteConfig.github.repoUrl} variant="secondary" className="!px-4 !py-2">
          <GitBranch size={16} aria-hidden />
          <span>Star</span>
        </Button>
      </div>
    </header>
  );
}
