# 代码规范（项目法律）

> 本文件是**强制约束**，不是建议。任何 Agent / 任何人提交代码前必须满足。
> 违反任何一条「红线」的代码，不允许合并进 `main`。

---

## 🔴 红线（违反即打回）

### R1. 文件长度（软提醒 + 真红线 + 豁免）

> ⚠️ **重要认知：行数不是目的，可维护性才是。**
> 一个 450 行但结构清晰、分区明确、职责单一的文件，
> 远好过一个为了凑行数硬拆成 5 个碎片的烂设计。
> **真正防屎山靠的是 R2（单一职责）、复杂度控制、分层，行数只是辅助信号。**

| 类型 | 提醒线（不阻断，但 review 会问） | **真红线**（必须处理） |
|---|---|---|
| 任意 `.ts` / `.tsx` 文件 | 300 行 | **600 行** |
| 单个 React 组件 | 200 行 | **400 行** |
| 单个函数 / Hook | 80 行 | **150 行** |
| CSS 文件 | 400 行 | **800 行** |

**提醒线（软）**：超过不会被 ESLint 拦，但提交时应该能说清"为什么这个文件需要这么长"。
说不清 → 才该拆。

**真红线（硬）**：超过必须处理，三选一 ——
1. **拆分**（优先）：抽子组件 / 抽 Hook / 抽纯函数到 `lib/` / 抽常量到 `config/`
2. **申请豁免**：确有必要时，登记到下方「豁免清单」，写清理由
3. **重构**：说明这个文件本身设计有问题

#### 豁免机制

确有合理理由的大文件是允许的。流程：

1. 在文件顶部写注释说明为什么它需要这么长：

   ```ts
   /**
    * 本文件超过提醒线（约 430 行），原因：
    * 管线动画的状态机、时间轴编排、降级分支高度内聚，
    * 拆开后需要在 3 个文件间来回跳，反而更难维护。
    * 已登记豁免：docs/CODE_STYLE.md #exemptions
    */
   ```

2. 在下表登记，并把路径加进 `eslint.config.mjs` 的 `LARGE_FILE_ALLOWLIST`

#### 豁免清单

| 文件路径 | 当前行数 | 豁免理由 | 登记日期 |
|---|---|---|---|
| _（暂无）_ | | | |

> ❌ 唯一绝对不允许的：**几千行的文件**。
> 那不是"有理由的长"，是设计已经失控。

### R2. 职责分离 —— ⭐ 本项目**最重要**的一条

> **用户原话精神**：「能分开写一个效果、一个功能的话，你肯定要分开写。
> 硬生生把两个、三个东西堆积在一个文件里，那确实不行。」
>
> 判断标准永远不是行数，而是：**这个文件里有没有本该各自独立的多个东西？**

#### 核心原则：一个概念 = 一个文件

| 粒度 | 规则 |
|---|---|
| 一个 React 组件 | 一个 `.tsx` 文件 |
| 一个视觉特效 | 一个目录（`组件 + 自己的 config + index`） |
| 一个自定义 Hook | 一个文件 |
| 一个领域的一组工具函数 | 一个文件（按领域，不按"工具"） |
| 一个页面 section | 一个目录 |

#### 什么时候**必须**拆（出现任一即拆）

1. **一个文件里有 ≥2 个 React 组件**（极小的私有子组件除外）
2. **一个文件里混了不同层的职责**，例如同时有：数据获取 + 渲染 + 动画逻辑
3. **一个文件里混了不同领域的逻辑**，例如既算粒子运动、又处理滚动监听
4. **文件里出现了分区注释**，如 `// ===== 下面开始是 XX 部分 =====`
   → 这是最明显的信号：**你自己都觉得该分段了，那就该分文件了**
5. **有一个可以独立命名的概念**（某个效果、某个功能点、某个算法）
   → 它能被命名，就该独立

#### 反面例子（禁止）

```tsx
// ❌ HeroSection.tsx —— 里塞了三件事
export function HeroSection() { ... }        // 组件1
export function HeroBackground() { ... }     // 组件2，本该独立
export function useHeroParallax() { ... }    // Hook，本该独立
const PARTICLE_CONFIG = { ... }              // 配置，本该进 config/
// ===== 下面开始是粒子逻辑 =====              // ← 看到这行就该拆了
function computeParticle(...) { ... }
function renderParticle(...) { ... }
```

#### 正面例子

```text
components/sections/Hero/
├── Hero.tsx              # 只做 Hero 编排
├── HeroBackground.tsx    # 背景组件，独立
├── use-hero-parallax.ts  # Hook，独立
├── hero.config.ts        # 参数，独立
└── index.ts              # 统一导出
```

#### 🌟 为什么这条最重要：Agent 友好

用户明确指出：**「让 Agent 读取的时候也会非常快」**。

| 拆得细 | 带来的实际收益 |
|---|---|
| **Agent 定位精准** | 改粒子效果时只需读 `ParticleField/`，不用吞下整个大文件 |
| **省上下文 / 省额度** | 小文件 = 少 token = 用户额度更耐用（本项目用户会在多个 Agent 间切换，这点尤其关键） |
| **改错风险低** | 改 A 文件不会误伤 B 逻辑 |
| **人一眼看懂** | 目录树就是文档，不看代码也知道项目有什么 |
| **并行开发** | 不同 Agent / 不同人可同时改不同文件，不冲突 |

> **目录即文档。** 理想状态：光看目录树，就知道这个项目有哪些功能、分别在哪个文件。

#### 命名要自解释

文件名要让人（和 Agent）**不看内容就知道它是干嘛的**：

| ❌ 不好 | ✅ 好 |
|---|---|
| `utils.ts` | `format-download-count.ts` |
| `helpers.tsx` | `ParticleField.tsx` |
| `stuff.ts` | `detect-performance-tier.ts` |
| `comp1.tsx` | `SafetyGateCard.tsx` |

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

- [ ] ⭐ **这个文件里有没有本该独立的第二个东西？**（多个组件 / 多种职责 / 多个领域逻辑 / 出现分区注释）→ 有就拆。**这条最重要**
- [ ] ⭐ **文件名自解释吗？** 光看文件名（不看内容），能知道它是干嘛的吗？
- [ ] 有没有文件超过 **600 行**（真红线）？超过 → 拆 / 登记豁免 / 重构，三选一
- [ ] 有没有文件超过 300 行（提醒线）？超过 → 我能说清为什么它该这么长吗？
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
| ESLint | 静态检查：真红线长度、**一文件多组件**、复杂度、嵌套、`no-explicit-any` | `eslint.config.mjs` |
| Prettier | 统一格式 | `.prettierrc` |
| TypeScript strict | 类型安全 | `tsconfig.json` |
| EditorConfig | 跨编辑器一致 | `.editorconfig` |
| Bundle 分析 | 监控体积膨胀 | `@next/bundle-analyzer` |

**ESLint 只卡「真红线」**（文件 600 / 函数 150 行 = `error`），
**「提醒线」不阻断开发**，靠 code review 讨论。

理由：行数只是代理指标。**复杂度、嵌套深度、单一职责才是屎山的真实信号**，
这几项 ESLint 一样在卡（`complexity` / `max-depth` / `no-explicit-any`）。
