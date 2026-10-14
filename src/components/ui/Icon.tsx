import {
  AppWindow,
  BarChart3,
  Bot,
  Briefcase,
  Command,
  FileText,
  Filter,
  GitBranch,
  Globe,
  KeyRound,
  LayoutDashboard,
  MessageSquareText,
  Monitor,
  Radar,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  UserRoundSearch,
  Wand2,
  type LucideIcon,
} from 'lucide-react';

/**
 * 图标白名单。
 *
 * 为什么用显式映射而不是 `import * as Icons`：
 * 后者会把整个 lucide 图标库打进 bundle（几千个图标）。
 * 显式映射保证 tree-shaking 生效 —— 只打包真正用到的那几个。
 *
 * 新增图标：在这里加一行，并把名字写进 src/types/site.ts。
 * ⚠️ 全站图标唯一来源，禁止引入第二个图标库。
 */
const ICON_MAP = {
  AppWindow,
  BarChart3,
  Bot,
  Briefcase,
  Command,
  FileText,
  Filter,
  GitBranch,
  Globe,
  KeyRound,
  LayoutDashboard,
  MessageSquareText,
  Monitor,
  Radar,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  UserRoundSearch,
  Wand2,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_MAP;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const LucideIconComponent = ICON_MAP[name];
  return <LucideIconComponent size={size} className={className} aria-hidden />;
}
