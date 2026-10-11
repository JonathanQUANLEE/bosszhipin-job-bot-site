import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/**
 * 豁免清单：确有合理理由的大文件。
 * 必须与 docs/CODE_STYLE.md 的「豁免清单」表保持同步，
 * 且文件顶部必须有说明注释。
 */
const LARGE_FILE_ALLOWLIST = [
  // 'src/components/sections/Pipeline/Pipeline.tsx',
];

/**
 * ESLint 配置
 *
 * 哲学：行数只是辅助信号，不是目的。
 * 真正防屎山靠「单一职责 + 复杂度控制 + 分层」。
 * 所以长度规则只卡「真红线」（600/400/150 行），
 * 「提醒线」（300/200/80 行）交给 code review，不阻断开发。
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
      // ── R1: 文件长度「真红线」（不是提醒线）────────────────
      //    提醒线 300 行不阻断；超过 600 行才是失控，必须处理或豁免
      'max-lines': [
        'error',
        {
          max: 600, // 真红线，与 CODE_STYLE.md 一致
          skipBlankLines: true,
          skipComments: false,
        },
      ],

      // ── R1: 函数长度「真红线」────────────────────────────
      'max-lines-per-function': [
        'error',
        {
          max: 150,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],

      // ── R2 / 可维护性：这些比行数更能反映屎山 ───────────────
      complexity: ['warn', { max: 15 }],
      'max-depth': ['error', { max: 4 }],
      'max-nested-callbacks': ['warn', { max: 3 }],
      'max-params': ['warn', { max: 5 }],

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

  // ── 已登记豁免的大文件（见 docs/CODE_STYLE.md 豁免清单）────
  ...(LARGE_FILE_ALLOWLIST.length > 0
    ? [
        {
          files: LARGE_FILE_ALLOWLIST,
          rules: {
            'max-lines': 'off',
            'max-lines-per-function': 'off',
          },
        },
      ]
    : []),
];
