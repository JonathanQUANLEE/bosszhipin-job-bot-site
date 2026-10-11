# 代码规范（项目法律）

> 本文件是**强制约束**，不是建议。任何 Agent / 任何人提交代码前必须满足。
> 违反任何一条「红线」的代码，不允许合并进 `main`。

---

## 🔴 红线（违反即打回）

### R1. 文件长度硬上限

| 类型 | 软上限（警告） | 硬上限（禁止） |
|---|---|---|
| 任意 `.ts` / `.tsx` 文件 | 200 行 | **300 行** |
| 单个 React 组件 | 120 行 | **150 行** |
| 单个函数 / Hook | 40 行 | **60 行** |
| CSS 文件 | 300 行 | **400 行** |

**超过硬上限 = 必须拆分。** 拆法优先级：
1. 抽出子组件
2. 抽出自定义 Hook
3. 抽出纯函数到 `src/lib/`
4. 抽出常量到 `src/config/`

> ❌ 绝对不允许出现「一个文件几千行」。
> 出现这种文件说明设计已经错了，不是格式问题。

### R2. 一个文件只做一件事

- 一个组件文件 = 一个组件（导出）
- 不允许「工具函数集散地」：`utils.ts` 里堆二十个不相关的函数
- 工具函数按**领域**分文件：`lib/effects/`、`lib/performance/`、`lib/format/`

### R3. 特效必须「三可」

任何视觉特效组件，必须同时满足：

| 要求 | 说明 |
|---|---|
| **可懒加载** | 必须 `dynamic(() => import(...), { ssr: false })`，不许进首屏 bundle |
| **可降级** | 必须读取性能等级，低端设备自动降配或关闭 |
| **可关闭** | 必须有全局开关，尊重 `prefers-reduced-motion` |

违反任意一条 = 打回。详见 [PERFORMANCE.md](./PERFORMANCE.md)。

### R4. 禁止裸写第三方引擎

**不允许**在 `.tsx` 组件里直接 `import * as THREE` 然后写渲染循环。

必须走封装层：

```
src/lib/effects/        ← 引擎适配层（three / gsap / 自研 canvas）
src/components/effects/ ← 只做 React 生命周期 + props，不写渲染逻辑
```

理由：引擎换掉时只改 `lib/`，组件不动。

### R5. 禁止魔法数字与硬编码文案

- 颜色 → `src/styles/tokens.css` 的 CSS 变量
- 动画时长 / 缓动 → `src/config/motion.ts`
- 站点文案 / 链接 / GitHub 地址 / 下载链接 → `src/config/site.ts`
- 粒子数量、画布尺寸等参数 → 该特效自己的 `config.ts`

**组件里出现裸数字（除 `0`、`1`、纯布局值）一律打回。**

### R6. 不提交敏感内容

`.env`、密钥、证书、token、个人求职信息 —— 已在 `.gitignore` 排除，
**不允许用任何方式绕过**（包括但不限于改 `.gitignore`、改成 `.txt` 后缀）。

### R7. 不要修改 bot 源码目录

`B:\antigtavity projects\bosszhitou\Bosszhipin-job-bot` 是**只读参考**。
只有读取素材（截图、文案）的权限，没有写入权限。

---

## 🟡 强制约定（不违反红线，但必须遵守）

### 命名

| 对象 | 规则 | 示例 |
|---|---|---|
| 组件文件 / 组件名 | `PascalCase` | `HeroSection.tsx` |
| 非组件文件 | `kebab-case` | `use-scroll-progress.ts` |
| 自定义 Hook | `use` 前缀 + camelCase | `useReducedMotion` |
| 常量 | `SCREAMING_SNAKE_CASE` | `MAX_PARTICLE_COUNT` |
| 类型 / 接口 | `PascalCase`，不加 `I` 前缀 | `type SiteConfig` |
| CSS 变量 | `--kebab-case` | `--color-accent` |

### TypeScript

- **禁止 `any`**（`unknown` 或具体类型替代）。确实无法避免时写 `// @ts-expect-error` 并注明原因
- 组件 props 必须显式定义类型，不许用内联对象类型堆一大坨
- 开启 `strict: true`
- 类型定义放 `src/types/`，跨模块共用的才放，局部类型就近定义

### 组件写法

- 优先**函数组件 + Hook**，不用 class
- 逻辑抽到 Hook，组件保持"薄"
- 一个组件超过 3 个 `useState` 时，考虑是否该拆
- 副作用必须写在 `useEffect` 且有清理函数（尤其是 rAF、事件监听、ResizeObserver）

### 注释

- **注释写「为什么」，不写「是什么」**
- 复杂算法 / 非直觉的 hack / 性能权衡，必须注释原因
- 中文注释 OK（本项目面向中文用户）

### Git 提交

- 一个 commit 只做一件事
- **不要把 AI 的名字写进 commit trailer**（沿用 bot 项目的红线）
- 提交信息格式：`类型(范围): 简述`
  - 类型：`feat` / `fix` / `refactor` / `perf` / `docs` / `chore` / `style`
  - 例：`feat(hero): add particle field with adaptive quality`

---

## ✅ 提交前自检清单

- [ ] 有没有文件超过 300 行？
- [ ] 有没有组件超过 150 行？
- [ ] 有没有新增特效？它可懒加载 / 可降级 / 可关闭吗？
- [ ] 有没有在组件里裸写 `THREE` / 裸写渲染循环？
- [ ] 有没有硬编码的颜色、时长、链接、文案？
- [ ] 有没有 `any`？
- [ ] 副作用（rAF / 监听器）有没有清理？
- [ ] `npm run lint` 和 `npm run build` 过了吗？

---

## 自动化保障

| 工具 | 作用 | 配置文件 |
|---|---|---|
| ESLint | 静态检查，含复杂度/行数规则 | `eslint.config.mjs` |
| Prettier | 统一格式 | `.prettierrc` |
| TypeScript strict | 类型安全 | `tsconfig.json` |
| EditorConfig | 跨编辑器一致 | `.editorconfig` |
| Bundle 分析 | 监控体积膨胀 | `@next/bundle-analyzer` |

**行数上限已配进 ESLint 规则**（`max-lines`），超了直接报错，不靠自觉。
