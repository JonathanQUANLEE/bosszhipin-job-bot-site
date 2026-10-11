import type { Config } from 'tailwindcss';

/**
 * Tailwind 配置
 *
 * 设计语言沿用被宣发项目（Bosszhipin-job-bot）的 Minimalist Monochrome：
 * 纯黑白 + 衬线字体，唯一的彩色是薄荷绿。
 * 所有颜色走 CSS 变量（src/styles/tokens.css），便于换肤与降级。
 */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 背景层级（由深到浅）
        base: 'var(--color-base)',
        surface: 'var(--color-surface)',
        'surface-raised': 'var(--color-surface-raised)',
        // 前景层级（由亮到暗）
        paper: 'var(--color-paper)',
        'paper-dim': 'var(--color-paper-dim)',
        'paper-muted': 'var(--color-paper-muted)',
        // 唯一强调色：薄荷绿
        accent: 'var(--color-accent)',
        'accent-dim': 'var(--color-accent-dim)',
        // 边框
        line: 'var(--color-line)',
        'line-strong': 'var(--color-line-strong)',
      },
      fontFamily: {
        // 衬线：标题与 display（沿用 bot 项目的系统衬线栈）
        display: ['var(--font-display)'],
        // 无衬线：正文
        sans: ['var(--font-sans)'],
        // 等宽：标签、数据、代码（沿用 bot 项目）
        mono: ['var(--font-mono)'],
      },
      letterSpacing: {
        // 配合 uppercase 小标签
        label: '0.18em',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config;
