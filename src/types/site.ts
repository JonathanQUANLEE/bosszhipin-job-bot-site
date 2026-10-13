/** 运行模式 */
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
  | 'Command'
  | 'Filter'
  | 'GitBranch'
  | 'KeyRound'
  | 'MessageSquareText'
  | 'Monitor'
  | 'ScrollText'
  | 'ShieldCheck'
  | 'Terminal';

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

/** 统计数据（用于 AnimatedNumber 展示） */
export interface Stat {
  value: number;
  /** 显示后缀，如 "+" */
  suffix?: string;
  label: string;
}

/** 站点全局配置 */
export interface SiteConfig {
  /** 本站已部署地址（用于 canonical / OG / metadataBase） */
  url: string;
  /** 被宣发项目的 GitHub 地址 */
  github: {
    /** 源项目仓库（bot 本体） */
    repoUrl: string;
    /** 本宣发页仓库 */
    siteRepoUrl: string;
    /** 原灵感来源 */
    inspirationUrl: string;
  };
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
