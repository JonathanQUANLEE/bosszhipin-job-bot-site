/**
 * Aurora 参数配置。
 *
 * 配色为「紫罗兰 → 青」的极光渐变（对齐 React Bits 的视觉语言）。
 * 想换回薄荷绿：把 colorA / colorB 换成绿色系即可，无需改 shader。
 */
export const auroraConfig = {
  /** 颜色 A —— 低处（紫罗兰 #7C3AED） */
  colorA: [0.486, 0.227, 0.929],
  /** 颜色 B —— 高处（青 #22D3EE） */
  colorB: [0.133, 0.827, 0.933],
  /** 底色（#0a0a0b，与 tokens.css 的 --color-base 一致） */
  base: [0.039, 0.039, 0.043],
  /** 流动速度 */
  speed: 1,
  /**
   * 整体亮度。
   * ⚠️ 调这个值前先想清楚：shader 里已按层数归一化，但 5 层叠加后
   * 仍容易过曝成白团盖住标题。0.5 左右是"看得见但不抢戏"的甜点值。
   */
  intensity: 1.9,
  /** 胶片颗粒强度 */
  grain: 4,
  /** 设备像素比上限（性能保护） */
  maxDpr: 2,
  /** 暂停动画 */
  paused: false,
} as const;
