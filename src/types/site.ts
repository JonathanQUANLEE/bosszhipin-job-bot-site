/** 运行模式（底层机制，非主推概念） */
export type RunMode = 'scan' | 'review' | 'auto';

/**
 * 允许使用的图标名（lucide-react）。
 *
 * 放在 types 层而不是 components 层：types 不应依赖 components。
 * components/ui/Icon.tsx 会 `satisfies` 这个联合类型，
 * 两边不一致时 TypeScript 会直接报错 —— 加了图标忘注册会立刻暴露。
 */
export type IconName =
  | 'AppWindow'
  | 'BarChart3'
  | 'Bot'
  | 'Briefcase'
  | 'Command'
  | 'FileText'
  | 'Filter'
  | 'GitBranch'
  | 'Globe'
  | 'KeyRound'
  | 'LayoutDashboard'
  | 'MessageSquareText'
  | 'Monitor'
  | 'Radar'
  | 'Rocket'
  | 'ScrollText'
  | 'ShieldCheck'
  | 'Sparkles'
  | 'Target'
  | 'Terminal'
  | 'UserRoundSearch'
  | 'Wand2';

/** 单个运行模式的描述 */
export interface RunModeInfo {
  /** 模式标识 */
  id: RunMode;
  /** 模式名（英文，等宽展示） */
  name: string;
  /** 中文标题 */
  title: string;
  /** 行为说明 */
  behavior: string;
  /** 适合什么场景 */
  scenario: string;
  /** 是否为推荐起点 */
  recommended?: boolean;
}

/** 功能特性 */
export interface Feature {
  /** 图标名 */
  icon: IconName;
  title: string;
  description: string;
}

/** 支持的招聘平台 */
export interface Platform {
  /** 平台标识 */
  id: string;
  /** 平台全名 */
  name: string;
  /** 平台短名（等宽展示） */
  short?: string;
  /** 投递动作描述 */
  action?: string;
  /** 补充说明 */
  note?: string;
  /** 是否仍在筹备中（尚未接入） */
  comingSoon?: boolean;
  /** 单日限额 */
  dailyLimit?: string;
  /** 巡航节奏 */
  cadence?: string;
  /** 状态 */
  status?: string;
  /** 平台特性标签 */
  features?: string[];
}

/** 投递节奏档位（安全机制） */
export interface PaceTier {
  /** 档位标识 */
  id: string;
  name: string;
  /** 延迟区间 */
  delay?: string;
  cadence?: string;
  dailyCap?: string;
  risk?: string;
  /** 适用场景 */
  scenario: string;
  /** 是否为推荐档 */
  recommended?: boolean;
}

/** 安全与克制相关的量化限制 */
export interface SafetyLimit {
  /** 配置键名（等宽展示，对应 profile YAML 字段） */
  key: string;
  label: string;
  /** 默认值或说明 */
  value: string;
  description: string;
}

/** 下载项 */
export interface Download {
  platform: string;
  icon: IconName;
  /** 下载链接（外链 GitHub Releases） */
  href: string;
  /** 备注 */
  note?: string;
}

/** 痛点对比条目（「别人家」 vs 「本工具」） */
export interface Comparison {
  /** 现状痛点 */
  other: string;
  /** 本工具的解法 */
  ours: string;
  /** 一行补充 */
  note: string;
}

/** 常见问题 */
export interface Faq {
  q: string;
  a: string;
}

/** 统计数据（用于 AnimatedNumber 展示） */
export interface Stat {
  value: number;
  /** 显示后缀，如 "+" */
  suffix?: string;
  label: string;
}

/** 发布状态（项目尚未开源/打包时使用占位） */
export interface ReleaseInfo {
  /** 是否已发布 */
  published: boolean;
  /** 占位徽章文案 */
  badge: string;
  /** 说明 */
  note: string;
}

/** 站点全局配置 */
export interface SiteConfig {
  /** 本站已部署地址（用于 canonical / OG / metadataBase） */
  url: string;
  /** 被宣发项目的 GitHub 地址（未开源时为空字符串） */
  github: {
    /** 源项目仓库（bot 本体）；未开源时为空串 */
    repoUrl: string;
    /** 本宣发页仓库 */
    siteRepoUrl: string;
    /** 原灵感来源 */
    inspirationUrl: string;
  };
  /** 发布状态 */
  release: ReleaseInfo;
  /** 项目名 */
  name: string;
  /** 一句话主张 */
  tagline: string;
  /** 完整介绍 */
  description: string;
  /** 运行模式 */
  modes: RunModeInfo[];
  /** 功能特性 */
  features: Feature[];
  /** 痛点对比 */
  comparisons: Comparison[];
  /** 常见问题 */
  faqs: Faq[];
  /** 支持的平台 */
  platforms: Platform[];
  /** 投递节奏档位 */
  paceTiers: PaceTier[];
  /** 安全限制 */
  safetyLimits: SafetyLimit[];
  /** 技术栈（跑马灯用） */
  techStack: string[];
  /** 下载 */
  downloads: Download[];
  /** 快速开始命令 */
  quickStart: string;
  /** 统计数据 */
  stats: Stat[];
  /** 许可证 */
  license: string;
  /** 免责声明 */
  disclaimer: string;
  /** 致谢 */
  credits: string;
}
