import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/**
 * ESLint 配置 —— Flat Config（ESLint 9）
 *
 * ⚠️ 已知兼容性问题：eslint-config-next 的 extends 在 ESLint 9 下
 * 与内部 eslint-plugin-react 产生循环引用（TypeError: circular structure）。
 * 当前回退方案：不加载 next/core-web-vitals + next/typescript，
 * 改为手写的 TypeScript 核心规则集。
 *
 * @see docs/CODE_STYLE.md
 */
export default [
  // ── 忽略路径 ─────────────────────────────────────────
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'coverage/**'],
  },

  // ── TypeScript / React 规则 ───────────────────────────
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // R1: 文件长度真红线
      'max-lines': [
        'error',
        { max: 600, skipBlankLines: true, skipComments: false },
      ],
      'max-lines-per-function': [
        'error',
        { max: 150, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],

      // R2: 可维护性 > 行数
      complexity: ['warn', { max: 15 }],
      'max-depth': ['error', { max: 4 }],
      'max-nested-callbacks': ['warn', { max: 3 }],
      'max-params': ['warn', { max: 5 }],

      // TypeScript 严格性
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

      // 代码质量
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // ── 配置文件放宽 ───────────────────────────────────────
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
