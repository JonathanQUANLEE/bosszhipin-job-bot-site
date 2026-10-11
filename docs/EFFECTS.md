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

## 四、初选组件清单（按 section）

| Section | 组件 | 来源 | 技术 | 负载 | 理由 |
|---|---|---|---|---|---|
| **Hero 背景** | `Beams` 或 `Threads` 或 `Iridescence` | React Bits | 裸 shader | 🔴 重（唯一一个） | 深色高级，且有"数据流/扫描"隐喻，贴"岗位筛选"主题 |
| **Hero 标题** | `DecryptedText` | React Bits | motion | 🟢 轻 | 黑客解密感，完美贴"bot / 自动化"主题 |
| **Hero 副标题** | `TextEffect` | Motion Primitives | motion | 🟢 轻 | 逐词进场，克制 |
| **光标特效** | `Crosshair` 或 `MagnetLines` | React Bits | canvas / DOM | 🟡 中 | Crosshair 有"瞄准/精准筛选"隐喻，超贴主题 |
| **统计数字** | **`AnimatedNumber`** | Motion Primitives | motion | 🟢 轻 | 用户点名要的 |
| **功能卡片** | `SpotlightCard` + `BorderGlow` | React Bits | DOM | 🟢 轻 | 零依赖，便宜 |
| **三模式展示** | `ScrollStack` | React Bits | DOM | 🟢 轻 | scan/review/auto 卡片堆叠进场 |
| **技术栈跑马灯** | `LogoLoop` / `InfiniteSlider` | RB / MP | DOM | 🟢 轻 | 展示 nodriver / Tauri / React 等 |
| **截图展示** | `MorphingDialog` | Motion Primitives | motion | 🟢 轻 | 点击放大看截图 |
| **"它在想什么"管线** | 自研 + `LatticeLoader` / `SloshGauge` 参考 | 自研 | DOM | 🟢 轻 | 体现"透明可审计"，自研更贴主题 |
| **CTA 按钮** | `StarBorder` 或 `HoldButton` | React Bits | canvas / DOM | 🟢 轻 | HoldButton "长按开始投递"极佳 |
| **滚动进场统一封装** | `InView` / `AnimatedContent` | MP / RB | motion | 🟢 轻 | 统一调度 |
| **全站图标** | `lucide-react` | Lucide | SVG | 🟢 极小 | 唯一图标源 |

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

## 六、待用户确认

1. **Hero 背景选哪个**：`Beams` / `Threads` / `Iridescence` / `Aurora` / `DarkVeil`？
2. **是否需要图表**：ApexCharts 要不要上？还是自绘轻量 SVG？
3. **光标特效要不要**：`Crosshair`（瞄准感）还是不做（更克制）？
4. **CTA 用哪个**：`StarBorder` 还是 `HoldButton`（长按投递）？

---

## 七、参考项目分析记录（历史）

_本节保留分析模板，供后续新增参考项目使用。_

```markdown
### N. 项目名
- 链接 / 协议 / 核心技术
- 吸睛点 / 可复用 section / 难度 / 体积 / 性能风险
- 是否与「克制内核」矛盾 / 结论
```
