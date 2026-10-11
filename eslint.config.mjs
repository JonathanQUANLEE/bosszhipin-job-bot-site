import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/**
 * ESLint 配置
 *
 * 重点：把 CODE_STYLE.md 的「红线」变成机器可执行的规则。
 * 文件行数、函数长度、圈复杂度 —— 超了直接报错，不靠自觉。
 *
 * @see docs/CODE_STYLE.md
 */
export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'coverage/**'],
  },

  {
    rules: {
      // ── R1: 文件长度硬上限（红线）──────────────────────────
      'max-lines': [
        'error',
        {
          max: 300, // 硬上限，与 CODE_STYLE.md 一致
          skipBlankLines: true,
          skipComments: false,
        },
      ],

      // ── R1: 函数长度 ────────────────────────────────────
      'max-lines-per-function': [
        'error',
        {
          max: 60,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],

      // ── R2: 防止逻辑堆砌 ────────────────────────────────
      complexity: ['warn', { max: 12 }],
      'max-depth': ['error', { max: 4 }],
      'max-nested-callbacks': ['warn', { max: 3 }],
      'max-params': ['warn', { max: 4 }],

      // ── R3/R4: 副作用必须清理 ────────────────────────────
      // （rAF / 监听器的清理靠 code review，此处无法静态检测）

      // ── TypeScript 严格性 ───────────────────────────────
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

      // ── 代码质量 ────────────────────────────────────────
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // ── 配置文件放宽（纯数据，不需要长度限制）────────────────
  {
    files: ['src/config/**/*.ts', 'src/types/**/*.ts', '*.config.*', 'scripts/**'],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'no-console': 'off',
    },
  },

  // ── 测试文件放宽 ───────────────────────────────────────
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
    },
  },
];
