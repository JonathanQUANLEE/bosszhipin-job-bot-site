/**
 * 动效常量。
 *
 * ⚠️ 硬规则：组件里禁止硬编码动画时长与缓动曲线，一律走这里。
 * 统一时长语言 = 全站节奏一致，也让"整体调快/调慢"只需改一处。
 */

/** 缓动曲线：与项目"克制"的气质一致 —— 收敛、不弹跳过度 */
export const EASING = {
  /** 标准进出：绝大多数场景 */
  standard: [0.22, 1, 0.36, 1],
  /** 出场专用：起步快、收尾稳 */
  out: [0.16, 1, 0.3, 1],
  /** 轻微弹簧：只在需要"活"的交互上用（按钮、开关） */
  spring: { type: 'spring', stiffness: 380, damping: 32, mass: 0.6 },
} as const;

/** 时长（秒） */
export const DURATION = {
  /** 元素进场 */
  fast: 0.28,
  /** 标准过渡 */
  base: 0.45,
  /** 区块级揭示 */
  slow: 0.7,
  /** 长叙事（滚动驱动） */
  narrative: 1.2,
} as const;

/** 进场动画的通用变体，供 AnimatePresence / whileInView 复用 */
export const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASING.standard },
  },
} as const;

/**
 * 滚动进场的视口配置：元素露出 1/4 才触发，且只触发一次。
 *
 * ⚠️ `margin` 顶部取极大值 —— 把「视口上方」整片纳入观察区。
 * 原因：IntersectionObserver 只报告「相交状态的变化」。当用户或工具用
 * **瞬时跳转**（整页截图、print、scrollTo 到底）把某个区块一次性跳过时，
 * 该区块从未与视口相交 → 回调永不触发 → 内容永远停在 opacity:0。
 * 加上这个 margin 后，元素一旦落到视口上方就会被判定为「已进入」并立即揭示。
 * 视口下方的行为完全不变（下边距仍为 0），滚动进场的观感不受影响。
 */
export const VIEWPORT = {
  once: true,
  amount: 0.25,
  margin: '100000px 0px 0px 0px',
} as const;
