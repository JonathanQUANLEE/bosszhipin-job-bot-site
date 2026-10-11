/**
 * Beams 参数配置。
 *
 * 所有可调控的视觉参数集中于此。
 * 与项目 monochrome + 薄荷绿设计语言对齐。
 */
export const beamsConfig = {
  /** 光带颜色（薄荷绿） */
  color: '#5DCAA5',
  beamWidth: 140,
  rotation: 30,
  speed: 1,
  waveLength: 233,
  depth: 1,
  sharpness: 0.6,
  twist: 0,
  fillLight: 0.3,
  glow: 0.6,
  brightness: 1.6,
  variation: 0,
  grain: 0.35,
  quality: 0.75,
  mouseInteraction: true,
  mouseStrength: 1,
  intro: true,
  fade: 0,
  opacity: 1,
  paused: false,
} as const;
