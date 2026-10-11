/**
 * 特效注册表。
 *
 * ⚠️ 硬规则（CODE_STYLE.md R3 + PERFORMANCE.md）：
 * 任何视觉特效必须登记在这里，并满足「三可」——
 * 可懒加载 / 可降级（按设备分档）/ 可关闭（尊重 prefers-reduced-motion）。
 *
 * 未登记的特效不允许上线。这样全站有哪些特效、各占多少，一眼可见，
 * 线上出问题时也能一键关掉某一个。
 *
 * 当前状态：骨架阶段，特效尚未接入。接入时逐个在此登记。
 */

/** 设备性能档位 */
export type PerformanceTier = 'high' | 'mid' | 'low' | 'off';

/** 单个特效的登记项 */
export interface EffectEntry {
  /** 是否已启用 */
  enabled: boolean;
  /** 所属页面区块 */
  section: string;
  /** 渲染技术（决定性能风险） */
  tech: 'webgl' | 'canvas' | 'dom' | 'motion';
  /** 负载等级：heavy 全站最多 1 个 */
  load: 'heavy' | 'medium' | 'light';
  /** 各档位下的启用情况 */
  tiers: Record<PerformanceTier, boolean>;
  /** 备注 */
  note?: string;
}

export const EFFECT_REGISTRY = {
  /**
   * Hero 背景：React Bits `Beams`
   * 光带流动 = 扫描 / 筛选的视觉隐喻；裸 WebGL2 shader，零 npm 依赖。
   * ⚠️ 这是全站唯一允许的 heavy 特效。
   */
  heroBeams: {
    enabled: false,
    section: 'Hero',
    tech: 'webgl',
    load: 'heavy',
    tiers: { high: true, mid: true, low: false, off: false },
    note: '全站唯一 WebGL 背景，其余区块一律 DOM / Canvas 2D / motion',
  },

  /** Hero 标题解密字效：React Bits `DecryptedText` */
  heroDecryptedText: {
    enabled: false,
    section: 'Hero',
    tech: 'motion',
    load: 'light',
    tiers: { high: true, mid: true, low: true, off: false },
  },

  /**
   * 瞄准光标：React Bits `Crosshair`
   * ⚠️ 仅在「它在想什么 / 三道闸门 / 功能网格」三个区块内启用，非全站。
   */
  crosshairCursor: {
    enabled: false,
    section: 'Pipeline / SafetyGates / Features',
    tech: 'canvas',
    load: 'medium',
    tiers: { high: true, mid: true, low: false, off: false },
    note: '限定区块 + 进视口才激活，避免全站跟随鼠标造成烦扰',
  },

  /** 统计数字滚动：Motion Primitives `AnimatedNumber` */
  animatedNumber: {
    enabled: false,
    section: 'Hero / Stats',
    tech: 'motion',
    load: 'light',
    tiers: { high: true, mid: true, low: true, off: false },
  },

  /** 卡片聚光跟随：React Bits `SpotlightCard` + `BorderGlow`（纯 DOM） */
  spotlightCards: {
    enabled: false,
    section: 'Features / SafetyGates',
    tech: 'dom',
    load: 'light',
    tiers: { high: true, mid: true, low: true, off: true },
    note: '纯 DOM，低配设备与 reduced-motion 下仍保留静态卡片',
  },

  /** 长按发送演示：React Bits `HoldButton`（把「克制」做成可交互体验） */
  holdToSend: {
    enabled: false,
    section: 'Restraint',
    tech: 'dom',
    load: 'light',
    tiers: { high: true, mid: true, low: true, off: false },
  },
} satisfies Record<string, EffectEntry>;

export type EffectId = keyof typeof EFFECT_REGISTRY;

/**
 * 性能预算（PERFORMANCE.md）
 * 每接入一个特效都要更新占用；超预算就砍特效，不砍体验。
 */
export const PERFORMANCE_BUDGET = {
  /** 首屏 JS（gzip）上限 KB */
  firstLoadJsKb: 170,
  /** 首屏 CSS（gzip）上限 KB */
  firstLoadCssKb: 30,
  /** 单个懒加载特效 chunk 上限 KB */
  perEffectChunkKb: 150,
  /** 全站允许的 heavy（WebGL/shader）特效数量 */
  maxHeavyEffects: 1,
} as const;
