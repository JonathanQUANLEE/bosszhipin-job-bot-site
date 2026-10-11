# 特效参考库分析 & 选型

> 用户提供的 4 个开源项目，逐个摸底后的完整分析 + 针对本项目的取舍建议。
> 分析日期：2026-10-11

---

## 一、四库速览

| 库 | 定位 | Star | 协议 | 依赖 | 体积风险 |
|---|---|---|---|---|---|
| **Lucide** | 图标库 | 24.9k | ISC | 无（纯 SVG） | 🟢 极小（tree-shakeable） |
| **ApexCharts** | 图表库 | 15.2k | MIT | 自带引擎（SVG） | 🟡 中（~150KB 量级） |
| **Motion Primitives** | 精致 UI 动效组件 | — | **MIT** | `motion` + Tailwind | 🟢 小 |
| **React Bits** | 创意特效组件库（215 个） | 48.9k | **MIT + Commons Clause** | 视组件而定 | 🔴 视选择而定 |

---

## 二、逐个分析

### 1. Lucide — 图标

- **是什么**：社区维护的图标工具包，Feather Icons 的 fork。24×24 网格，stroke-width 2，线性几何风
- **React 用法**：`lucide-react`，按需 import，**完全 tree-shakeable**
- **协议**：ISC（极宽松，商用无忧）
- **规模**：1600+ 图标

#### 对本项目价值：🟢 高

宣发页需要大量图标：功能特性列表、三模式卡片、CTA、页脚。
Lucide 是该领域**最成熟、最轻、生态最好**的选择，没有之一。

#### 取舍结论：✅ **采纳，作为唯一图标源**

- 风格匹配：线性克制，与项目本体的 monochrome 设计语言一致
- **红线：不引入第二个图标库**（React Bits 内部有 22 个组件依赖 `@hugeicons/react`，如采用需剔除或替换）

---

### 2. ApexCharts — 图表

- **是什么**：基于 SVG 的交互式图表库，React 用 `react-apexcharts`
- **协议**：MIT
- **特点**：仪表盘级能力（折线/柱状/雷达/热力…），配置项极多

#### 对本项目价值：🟡 中低

宣发页**可以**用图表可视化"克制"这个核心卖点：
- 发送延迟节奏（10-60 秒随机等待）
- 每日发送上限 vs 实际发送量
- 三模式命中/发送对比

**但问题**：ApexCharts 是**仪表盘级**库，对一个营销页来说偏重，
且它的默认观感偏"后台系统"，与我们要的"美术级宣发"气质不符。

#### 取舍结论：⚠️ **首屏不用，按需再议**

- 首屏不用图表（普通求职者也看不懂图表）
- 若后续要做"数据透明"section，**优先用自绘轻量 SVG + CSS 动画** —— 更轻、更可控、更贴气质
- 若确有真实数据要展示（如 star 增长曲线），可**懒加载**引入

---

### 3. Motion Primitives — 精致 UI 动效

- **是什么**：ibelick 做的动效组件集，基于 `motion`（Framer Motion v12）+ Tailwind
- **协议**：**MIT**（宽松）
- **状态**：beta，持续更新
- **安装**：copy-paste 源码

#### 全部 34 个组件

`accordion`、`animated-background`、`animated-group`、**`animated-number`**、`border-trail`、`carousel`、`cursor`、`dialog`、`disclosure`、`dock`、`glow-effect`、`image-comparison`、`in-view`、`infinite-slider`、`magnetic`、`morphing-dialog`、`morphing-popover`、`progressive-blur`、`scroll-progress`、`sliding-number`、`spinning-text`、`spotlight`、`text-effect`、`text-loop`、`text-morph`、`text-roll`、`text-scramble`、`text-shimmer-wave`、`text-shimmer`、`tilt`、`toolbar-dynamic`、`toolbar-expandable`、`transition-panel`

#### 对本项目价值：🟢 高 —— **它是"内核静"那一层**

气质判断：Motion Primitives 是**克制、精致、产品级**的，
正好对应我们要的「大厂宣发该有的专业感」。

#### 取舍结论：✅ **采纳，定位为「内容层」主力**

重点采纳：

| 组件 | 用在哪 |
|---|---|
| **`AnimatedNumber`**（用户点名） | 统计数字：Star 数、下载量、"已帮你投递 N 次" |
| `TextEffect` / `TextScramble` / `TextShimmer` | 标题与卖点文字动画 |
| `BorderTrail` | 卡片边框流光 |
| `Spotlight` | 功能卡片聚光灯跟随 |
| `ScrollProgress` | 顶部滚动进度条 |
| `MorphingDialog` | 点击截图放大查看 |
| `InfiniteSlider` | 技术栈 / Logo 跑马灯 |
| `Tilt` | 3D 倾斜卡片 |
| `InView` | 统一的滚动进场封装 |

---

### 4. React Bits — 创意特效（215 个）

- **协议**：**MIT + Commons Clause Condition v1.0**
  - ✅ 可用于自己的产品/网站（含商用）
  - ❌ 不可把组件本身打包转售
  - → **我们做自己的宣发页，完全 OK**，但需保留复制源码里的版权声明
- **安装**：copy-paste 源码 或 CLI（`npx shadcn@latest add @react-bits/xxx`）
- **四种变体**：JS+CSS / JS+TW / **TS+CSS / TS+TW** ← 我们取 **TS+TW**

#### 分类与规模

| 分类 | 数量 | 说明 |
|---|---|---|
| Text Animations | 33 | 标题/文字级特效 |
| Animations | 41 | 光标特效、图像转场、滚动特效 |
| Components | 48 | 导航、卡片、画廊、3D UI |
| Micro | 34 | 微交互：按钮、开关、加载、Toast |
| **Backgrounds** | **59** | 全屏动态背景（**"哇"的主要来源，也是最大性能风险**） |

#### 技术依赖分布（关键）

| 依赖 | 组件数 |
|---|---|
| 无 npm 依赖 | 82（其中 36 个是**手写 raw WebGL2 shader**，GPU 开销实打实） |
| `ogl`（轻量 WebGL，~20KB） | 36 |
| `motion` | 33 |
| `gsap` | 25 |
| `@hugeicons/react` | 22 |
| `three` | 19 |
| `@react-three/fiber` | 5 |
| 其他 | 少量 |

> ⚠️ **重要结论**：
> - `ogl` ≈ 20KB，**轻**；`three` 打包体积**大得多**
> - **建议：本项目只用 `ogl` / 裸 shader 的背景，完全不引入 `three`**
> - React Bits 有 22 个组件依赖 `@hugeicons/react`，与我们选的 Lucide 冲突 → 采用时需替换

#### 对本项目价值：🟢 极高 —— **它是"外壳炸"那一层**

---

## 三、选型方案：两层分工（对应"外壳炸 + 内核静"）

```
┌──────────────────────────────────────────────┐
│  内容层 —— Motion Primitives（克制、产品级）      │
│  卡片 / 文字 / 对话框 / 导航 / 统计数字           │
│  依赖：motion（≈ React 地道，与 Next.js 契合）    │
├──────────────────────────────────────────────┤
│  表现层 —— React Bits（炸裂、美术级）            │
│  Hero 背景 / 光标特效 / 滚动叙事 / CTA 按钮       │
│  依赖：ogl（轻 WebGL）+ 裸 shader，不碰 three     │
├──────────────────────────────────────────────┤
│  基础层 —— Lucide（图标）                        │
└──────────────────────────────────────────────┘
```

### ⚠️ 必须解决的依赖冲突

| 冲突 | 处理 |
|---|---|
| gsap vs motion 重复 | **优先 motion**。React Bits 中只有选定组件确需 gsap 时才引入，且只引这一个组件 |
| Lucide vs HugeIcons | React Bits 组件内的 HugeIcons **统一替换为 Lucide** |
| three vs ogl | **只用 ogl / 裸 shader**，全程不装 three |

---

## 四、最终选型（已拍板，按 section 编排）

> 决策依据：**凡是能呼应「岗位筛选 / bot 自动化 / 克制」这三个主题的，优先选。**
> 不是为了炫而炫，是让特效本身在讲项目故事。

### 页面结构（12 个 section，从丰富出发）

| # | Section | 组件 | 来源 | 技术 | 负载 | 选型理由 |
|---|---|---|---|---|---|---|
| 1 | **Hero 背景** | **`Beams`** | RB | 裸 shader | 🔴 重（**全站唯一**） | 暗色光带流动 = **"扫描/筛选"的视觉隐喻**，且裸 shader **零 npm 依赖** |
| 2 | **Hero 标题** | **`DecryptedText`** | RB | motion | 🟢 | 黑客解密感 → **"bot / 自动化"主题** |
| 3 | **Hero 副标题** | `TextEffect` | MP | motion | 🟢 | 逐词进场，克制收住 |
| 4 | **Hero 统计条** | **`AnimatedNumber`** | MP | motion | 🟢 | Star 数 / 下载量 / 已投递次数 |
| 5 | **痛点对比** | `GlitchText` + 自绘对比 | RB | DOM | 🟢 | 故障字效表现"手动海投的崩溃" |
| 6 | **"它在想什么"管线** | 自研管线 + `ThoughtLine` | 自研+RB | DOM/motion | 🟢 | **透明可审计**主题，自研更贴 |
| 7 | **光标（仅中段）** | **`Crosshair`** | RB | canvas | 🟡 中 | **"瞄准 / 精准筛选"隐喻**。⚠️ 仅在 section 6-8 启用，非全站 |
| 8 | **三道闸门** | `ScrollStack` + `SpotlightCard` + `BorderGlow` | RB | DOM | 🟢 | scan/review/auto 卡片堆叠进场 |
| 9 | **功能特性网格** | `SpotlightCard` + `BorderGlow` + **Lucide 图标** | RB | DOM | 🟢 | 零 gsap，纯 DOM |
| 10 | **真实截图** | `MorphingDialog` + `ChromaGrid` | MP+RB | DOM/motion | 🟢 | 点击放大看实拍截图 |
| 11 | **技术栈跑马灯** | `LogoLoop` | RB | DOM | 🟢 | nodriver / Tauri / React / Python |
| 12 | **克制数据可视化** | 自绘 SVG + `AnimatedNumber` | 自研 | SVG | 🟢 | 延迟节奏 / 每日上限，**拒绝 ApexCharts** |
| 13 | **互动演示** | **`HoldButton`** | RB micro | DOM | 🟢 | **"长按才发送"** = 把"克制"做成可交互体验 |
| 14 | **致敬与开源** | `InfiniteSlider` + 衬线排版 | MP | motion | 🟢 | 致敬原项目、MIT 协议 |
| 15 | **主 CTA** | **`StarBorder`** | RB | canvas | 🟢 | 星光描边按钮，醒目且不喧宾夺主 |
| 16 | **FAQ / 免责** | `Accordion` + `ProgressiveBlur` | MP | motion | 🟢 | 免责声明必须保留 |
| 17 | **全站图标** | **`lucide-react`** | Lucide | SVG | 🟢 极小 | 唯一图标源 |
| 18 | **滚动进场** | `InView` | MP | motion | 🟢 | 统一调度入口 |

---

## 五、性能预算占用（初估）

| 预算项 | 总额度 | 首屏占用 | 剩余 |
|---|---|---|---|
| 首屏 JS（gzip） | 170 KB | Next.js ~90 + motion ~35 + Hero shader ~15 ≈ **140 KB** | ~30 KB |
| 首屏 CSS | 30 KB | Tailwind ~10 KB | 宽裕 |
| **WebGL 背景** | **全站最多 1 个** | Hero 1 个 | **不得再加** |

> 🚨 **硬性约束**：全站**只允许一个** WebGL/shader 背景，放在 Hero。
> 其余 section 一律用 DOM / Canvas 2D / motion。

---

## 六、四个决策（已由 Agent 拍板，用户可推翻）

> 用户指示：「你有脑子的，会根据项目搭配。你先选，能丰富先丰富，有问题再改。」

| # | 决策 | 选择 | 理由 |
|---|---|---|---|
| 1 | **Hero 背景** | **`Beams`** | 光带流动 = **"扫描 / 筛选"隐喻**，直接呼应项目功能；且是**裸 WebGL2 shader，零 npm 依赖**，不引入 three/ogl |
| 2 | **ApexCharts** | ❌ **不用**，自绘 SVG | 仪表盘观感偏后台系统，与美术级宣发冲突；普通求职者也看不懂图表 |
| 3 | **光标 Crosshair** | ✅ **要，但限定范围** | 仅在「它在想什么 / 三道闸门 / 功能网格」三个 section 内启用，**非全站**；进视口才激活；低端设备与 reduced-motion 下关闭 |
| 4 | **CTA** | **`StarBorder` 主 CTA + `HoldButton` 互动演示** | 两个都要：**StarBorder** 做"Star / 下载"主按钮；**HoldButton** 做"长按模拟一次发送"的体验装置 —— 后者把"克制"哲学变成了可交互的叙事 |

### 依赖冲突的最终处理

| 冲突 | 最终决定 |
|---|---|
| gsap vs motion | ✅ **全程零 gsap**。所选组件全部走 motion，功能网格改用 `SpotlightCard` 而非 `MagicBento` |
| Lucide vs HugeIcons | ✅ 所选 React Bits 组件均不依赖 HugeIcons，天然无冲突；若后续引入需替换 |
| three vs ogl | ✅ **两者都不装**。`Beams` 是裸 shader，零 npm 依赖 |

### 最终依赖清单（极简）

```
next · react · react-dom          # 框架
motion                            # 唯一的动效运行时（无 gsap）
lucide-react                      # 唯一图标源
tailwindcss                       # 样式
```

**没有 three、没有 ogl、没有 gsap、没有图表库。** 首屏 bundle 可控。

---

## 七、参考项目分析记录（历史）

_本节保留分析模板，供后续新增参考项目使用。_

```markdown
### N. 项目名
- 链接 / 协议 / 核心技术
- 吸睛点 / 可复用 section / 难度 / 体积 / 性能风险
- 是否与「克制内核」矛盾 / 结论
```
