# MEMORY.md — Boss Job Bot 宣发网页项目（长期记忆）

> **给任何接手本项目的 Agent 的必读文件。**
> 本项目由 AI Agent 与用户协作开发，用户会在多个 Agent 之间切换。
> 每次对话结束前，必须更新本文件同目录下的 `YYYY-MM-DD.md` 日志。
> 详见本文件末尾的「Agent 交接协议」。

---

## 0. GitHub 仓库（已建立，2026-10-11）

| 项 | 值 |
|---|---|
| **仓库** | `https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site` |
| 可见性 | **Public** |
| 默认分支 | `main` |
| 用户 | JonathanQUANLEE（Quentinlee） |
| Description | `Bosszhipin-job-bot 官方宣发页 · 把「克制」做成视觉语言的开源落地页 · Next.js / React / motion / Tailwind` |
| Topics | `animation, automation, framer-motion, job-application, job-search, landing-page, nextjs, open-source, react, tailwindcss, typescript, webgl` |
| 里程碑 tag | `v0.1-foundation` |

### 认证方式（已持久化，未来任何 Agent / 任何会话都无需重新登录）

- ✅ `git credential.helper = store`，凭据存于 `~/.git-credentials`（明文，权限 600）
- ✅ 因此 **`git push` / `git pull` / `git ls-remote` 全部免登录**
- ⚠️ 但 **`gh` CLI 无法持久化登录**（`gh auth login` 要求 `read:org` 权限，本令牌没有）
  → 需要 `gh` 命令时，必须临时设置环境变量 `GH_TOKEN=...` 再执行
- ⚠️ 令牌权限范围：`delete_repo, repo, workflow, write:discussion`（**不含** read:org / user / admin:org）
- 🔒 **令牌本身禁止写入任何文件**（含本记忆文件）——只通过环境变量或 stdin 使用

### 备份状态

- ✅ 代码已异地备份到 GitHub
- ⚠️ `B:\antigtavity projects\bosszhitou\Bosszhipin-job-bot`（bot 源码）**仍未备份**，风险高于本仓库

---

## 1. 项目一句话定位

为开源项目 **Bosszhipin-job-bot** 做一个**宣发落地页**（不是产品本身，是营销页）。

- **宣发对象项目路径**：`B:\antigtavity projects\bosszhitou\Bosszhipin-job-bot`
- **本宣发网页工作区**：`B:\antigtavity projects\boss web`（当前仓库）
- **关系**：本工作区是**独立的宣发页项目**，**只读引用** bot 项目的资料（README / 截图 / 设计语言），**绝对不要修改 bot 项目里的任何文件**。

---

## 2. 被宣发的项目：Bosszhipin-job-bot（事实底稿）

| 维度 | 内容 |
|---|---|
| 是什么 | 面向个人求职者的 BOSS 直聘岗位筛选 + 固定招呼语沟通工具 |
| 形态 | 0.2 起以 **Tauri 桌面 App**（PyTauri + React + Tailwind）为主入口，CLI 保留给高级用户 |
| 技术栈 | `nodriver`（CDP 直连，无 chromedriver 中间层）+ OpenAI 兼容 LLM 端点 + chroma RAG 简历召回 |
| 核心模式 | `scan`（只扫不发）/ `review`（逐条审核）/ `auto`（小批量自动） |
| 设计哲学 | 个人求职辅助工具，**不是高频爬虫，不是绕过反爬的研究项目** |
| 项目红线 | CLAUDE.md 明确禁止：提速 / 并发 / 绕反爬的改动；禁止把 AI 名字写进 commit trailer |
| 视觉语言 | **Minimalist Monochrome** — 纯黑白 + 系统衬线字体，零圆角零阴影；唯一彩色是**薄荷绿**（运行状态 / 勾选 / 徽章） |
| 许可证 | MIT |
| 致敬来源 | 参考了 `longsizhuo/BossZhiPin_Job_Search` 的浏览器自动化思路，0.2 已收敛为自己的工作流（README 里明确致谢） |
| 现有素材 | `docs/images/dashboard-runtime-overview-hires.png`、`dashboard-runtime-filters-and-logs-hires.png`（实拍截图，姓名已脱敏） |

### 值得在宣发页里讲的"反向卖点"

这个项目的卖点**不是"比别的 bot 更猛"**，而是**克制**：
- 有随机等待（delay_min / delay_max）、单次发送上限、每日上限
- 有 Dry-run 模式
- 有验证码检测停止
- 有审计日志（letters.jsonl）
- 0.2 主动**移除**了 LLM 生成招呼语、简历解析、RAG、向量库、provider 配置 → 不需要任何 AI API key

---

## 3. 用户明确确认的宣发策略

### 3.1 目标受众（有优先级）

1. **第一优先：普通求职者 / 应届生**（第一版主动宣传必须打到他们）
   - 他们不懂技术、不懂前端
   - 策略：**特效要夸张**，让他们产生"哇，做网页还能这么强吗"的反应，靠视觉冲击留下印象
2. **次要但必须兼顾**：开源社区（要 Star）/ 国内技术圈（V2EX / 掘金 / 即刻）/ AI 工具爱好者
   - 他们看技术细节和项目气质

### 3.2 核心策略（一句话）

> **外壳要炸，内核要静。**
> 进场特效夸张到能留住普通人；落地后的叙事克制到能让技术圈读完觉得"这项目真的克制"。

### 3.3 四条核心主张（用户全选，都要传达）

1. **免费开源 / 致敬原项目 / 给求职者的礼物**
2. **不要 AI，不要黑箱，本地规则为主**
3. **透明 / 可审计 / 可解释**
4. **克制 / 安全 / 不刷屏**

### 3.4 视觉气质

用户暂未锁定，**明确表示会根据后续提供的开源特效参考来决定**。四种都可能涉及：
- 冷静克制 + 终端感
- 极简大字 / Brutalism
- 故事流 / 滚动叙事
- 赛博朋克 / 霓虹粒子

---

## 4. 技术栈（已锁定，原则：只用最成熟、长期有人维护的）

| 层 | 选型 |
|---|---|
| 框架 | Next.js 16.4（App Router） |
| 语言 | TypeScript（strict） |
| 样式 | Tailwind CSS v3.4 + CSS 变量（`tokens.css`） |
| 动效 | `motion`（Framer Motion 继任者） |
| 3D/WebGL | 裸 WebGL2 shader（仅 Hero Beams，零 npm 依赖） |
| 字体 | Google Fonts（DM Serif Display + Geist） |
| 图标 | Lucide React |
| 构建期脚本 | Python 3.12+（仅 `scripts/`，不做后端） |

- **不写传统后端**：宣发页主体纯静态 SSG。需要服务端能力时用 Next.js 自带的 ISR / Route Handler，同一部署
- **部署**：使用 `cloud-service` skill 发布成在线链接

详见 `docs/ARCHITECTURE.md`。

---

## 4.5 工程规范（用户立的「法律」，必须遵守）

**用户强烈反对屎山代码**，明确要求工程化、模块化、文件夹整洁一眼看懂。

完整规范见 **`docs/CODE_STYLE.md`**，7 条红线摘要：

| # | 红线 |
|---|---|
| R1 | **软提醒 + 真红线 + 豁免**：见下方说明 |
| **R2** | ⭐ **职责分离（本项目最重要的一条）**：一个概念一个文件。一个文件里堆了多个本该独立的组件/功能/领域逻辑 = 必须拆 |
| R3 | 特效必须「三可」：可懒加载 / 可降级 / 可关闭 |
| R4 | 禁止组件里裸写 THREE，必须走 `lib/effects/` 封装层 |
| R5 | 禁止魔法数字与硬编码文案，全部集中到 `src/config/` |
| R6 | 不提交敏感内容 |
| R7 | 不修改 bot 源码目录（只读参考） |

#### R1 的准确理解（**用户明确纠正过，别再定死**）

用户反馈：「有些组件确实要 400-500 行，硬砍 300 不行，得看具体情况。」

**核心认知：行数不是目的，可维护性才是。**
一个 450 行但职责单一、分区清晰的文件，远好过硬拆成 5 个碎片。

| 类型 | 提醒线（不阻断，review 会问） | 真红线（必须处理） |
|---|---|---|
| `.ts/.tsx` 文件 | 300 行 | **600 行** |
| 单个 React 组件 | 200 行 | **400 行** |
| 单个函数 / Hook | 80 行 | **150 行** |
| CSS 文件 | 400 行 | **800 行** |

超过真红线 → 三选一：**拆分 / 登记豁免 / 重构**。
豁免流程：文件顶部写注释说明理由 + 登记进 `docs/CODE_STYLE.md` 豁免表 + 加进 `eslint.config.mjs` 的 `LARGE_FILE_ALLOWLIST`。

**唯一绝对不允许：几千行的文件**（那不是有理由的长，是设计失控）。

**ESLint 只卡真红线**（`max-lines: 600`、`max-lines-per-function: 150` = `error`），提醒线不阻断。
真正防屎山靠 `complexity ≤15` / `max-depth ≤4` / `no-explicit-any` / **R2 职责分离**。

#### ⭐ R2 职责分离 —— 用户最看重的一条（**必读**）

**用户原话精神**：「能分开写一个效果、一个功能的话，你肯定要分开写。
硬生生把两个、三个东西堆积在一个文件里，那确实不行。」

**核心判据不是行数，是：这个文件里有没有本该各自独立的多个东西？**

必须拆的信号（任一即拆）：
1. 一个文件里有 ≥2 个 React 组件
2. 混了不同层的职责（数据获取 + 渲染 + 动画逻辑挤一起）
3. 混了不同领域的逻辑（既算粒子又处理滚动）
4. **出现分区注释** `// ===== 下面是 XX 部分 =====` ← 最明显的信号，说明该分文件了
5. 有个能独立命名的概念（某个效果/功能/算法）→ 能命名就该独立

**为什么这条最重要 —— Agent 友好**（用户明确指出）：
- Agent 定位精准：改粒子只需读 `ParticleField/`，不用吞下整个大文件
- **省上下文/省额度**：小文件 = 少 token，用户会在多 Agent 间切换，这点尤其关键
- 改 A 不误伤 B
- **目录即文档**：光看目录树就知道项目有哪些功能

**命名必须自解释**（不看内容就知道干嘛）：
`utils.ts` ❌ → `format-download-count.ts` ✅

机器检测：`eslint-plugin-react` 的 `react/no-multi-comp`（warn 级）。

### 性能与特效：可以兼得（用户明确要求两者都要）

完整方案见 **`docs/PERFORMANCE.md`**：
- 三条铁律：首屏轻+重特效懒加载 / 特效强度按设备分 4 档 / 看不见就停
- 12 条技术手段（代码分割、IntersectionObserver 门控、DPR 钳制、统一 rAF、降分辨率后处理...）
- 性能预算：首屏 JS ≤170KB、LCP <2.5s、CLS <0.1、mid 档 ≥50fps
- **双层结构**：内容层 SSR 直出（大厂宣发底子，特效全挂也能读）+ 表现层特效懒加载叠加（美术级观感）

---

## 5. 页面骨架（v0.2 已上线，2026-10-12）

| 区块 | 组件路径 | 特效 | 主打主张 |
|---|---|---|---|
| **Header** | `layout/Header` | — | 固定导航，含锚点跳转 |
| **Hero** | `sections/Hero` | Beams(WebGL) + DecryptedText + AnimatedNumber | 视觉冲击 + 解密字效 |
| **PainPoints** | `sections/PainPoints` | InView stagger | 四组对比：其他工具 vs 本工具 |
| **Features** | `sections/Features` | InView + SpotlightCard | 6 张功能卡片，鼠标聚光 |
| **SafetyGates** | `sections/SafetyGates` | InView + SpotlightCard + Crosshair | 三道闸门，限定区块光标 |
| **FAQ** | `sections/FAQ` | InView + `<details>` 手风琴 | 5 个常见问题 |
| **Start** | `sections/Start` | — | 下载入口 + 终端代码块 |
| **Footer** | `layout/Footer` | — | 开源信息 + 免责声明 |

> 已部署至 GitHub Pages：`https://jonathanquanlee.github.io/bosszhipin-job-bot-site/`
> 仓库：`main` 存源码，`gh-pages` 存构建产物（Next.js static export）。

---

## 5.5 特效选型（已分析 4 个参考库，详见 `docs/EFFECTS.md`）

**两层分工**（对应"外壳炸 + 内核静"）：

| 层 | 库 | 依赖 | 气质 |
|---|---|---|---|
| 内容层 | **Motion Primitives**（34 组件，MIT，beta） | `motion` | 克制、产品级、专业感 |
| 表现层 | **React Bits**（215 组件，MIT+Commons Clause） | `ogl` / 裸 shader | 炸裂、美术级 |
| 基础层 | **Lucide**（24.9k star，ISC） | 无 | 唯一图标源 |

**ApexCharts**：⚠️ 首屏不用。仪表盘级偏重、观感偏后台系统，与美术级宣发气质不符；需要时优先自绘轻量 SVG。

### 三个必须处理的依赖冲突

1. **gsap vs motion 重复** → 优先 motion，只在必需组件时才引 gsap
2. **Lucide vs HugeIcons** → React Bits 有 22 个组件依赖 `@hugeicons/react`，采用时统一替换为 Lucide
3. **three vs ogl** → **只用 ogl / 裸 shader，全程不装 three**（ogl≈20KB，three 大得多）

### 硬性性能约束（已执行）

**全站只允许 1 个 WebGL/shader 背景（放在 Hero）**，其余 section 一律 DOM / Canvas 2D / motion。

### 最终决策与接入状态（**2026-10-12 全部完成**）

| 特效 | 来源 | 状态 | 接入位置 |
|---|---|---|---|
| **Beams** | React Bits（裸 shader） | ✅ 已上线 | Hero 背景（lazy, ssr:false） |
| **DecryptedText** | React Bits（motion） | ✅ 已上线 | Hero 标题 |
| **AnimatedNumber** | 自研（rAF + ease-out cubic） | ✅ 已上线 | Hero 统计数字 |
| **SpotlightCard** | 自研（mousemove + radial-gradient） | ✅ 已上线 | Features + SafetyGates 卡片 |
| **Crosshair** | 自研（限定区块 + IO 门控） | ✅ 已上线 | SafetyGates 区块 |
| **InView** | 自研（motion + IO 封装） | ✅ 已上线 | 全站滚动进场 |
| HoldButton | React Bits | ⏸️ 未接入 | 计划用于「克制」互动演示，待后续补充 |
| StarBorder | React Bits | ⏸️ 未接入 | 计划用于 CTA 按钮美化，待后续补充 |

**选型总原则**：凡能呼应「岗位筛选 / bot 自动化 / 克制」三主题的特效优先选 —— **特效本身要讲项目故事**。

**最终运行时依赖只有 5 个**：`next` / `react` / `react-dom` / `motion` / `lucide-react`
→ **零 gsap、零 three、零 ogl、零图表库**

### 环境状态

next 16.4.0 · react 19.3.0 · motion 14.1.0 · lucide-react 1.55.0 · tailwindcss 3.4.19 · typescript 5.9.3 · eslint 9.39.4
`package-lock.json` 已提交。Git tag：**`v0.1-foundation`** → 下一版建议打 `v0.2-deployed`。

---

## 5.6 部署流程（**照做，别踩坑**）

GitHub Pages 部署 = `main` 存源码 + `gh-pages` 存构建产物。

```bash
# 1. 构建（输出到 dist/）
node node_modules/next/dist/bin/next build

# 2. 关键：不要把 dist 当 git 仓库直接 push！
#    dist/ 会被 next build 清空重建，里面的 .git 会消失，
#    之后在 dist 里跑 git 命令会「穿透」到主仓库，把源码推到 gh-pages。
#    正确做法：复制到临时目录再 push。
cd /tmp && rm -rf deploy && mkdir deploy && cd deploy
cp -r "B:/antigtavity projects/boss web/dist/"* .
touch .nojekyll          # ⚠️ 必须！否则 GitHub Pages 会用 Jekyll 处理，
                         #    导致页面显示成 README 而不是站点
git init && git add -A && git commit -m "deploy"
git push -f https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site.git master:gh-pages
```

**踩过的坑（2026-10-13 记录）**
1. `dist/` 里建 git 仓库 → 被 build 清掉 → git 命令穿透到主仓库 → **gh-pages 上是源码和 README**
2. 忘了 `.nojekyll` → GitHub Pages 跑 Jekyll → **页面显示成 README 的 Jekyll 渲染结果**
3. `basePath` 硬编码为 `/bosszhipin-job-bot-site` → 本地直接打开 `dist/index.html` 会**完全没有样式**（CSS 404）。本地预览必须把 dist 放到同名子目录下再起服务。

## 5.7 已知未决项（2026-10-13 全面审计发现，待用户决策）

| # | 问题 | 影响 |
|---|---|---|
| A | `siteConfig.safetyLimits`（5 条安全限制）与 `techStack` **定义了但从未展示**；Hero 统计写「5 道安全闸门」，而「三道闸门」区块展示的是 3 个运行模式 → **术语撞车** | 读者困惑；「克制」这一核心主张缺一个落点 |
| B | `EFFECT_REGISTRY` / `PERFORMANCE_BUDGET` **没有任何代码消费** | 文档宣称的「一键关特效」是空头支票 |
| C | ~~`docs/ARCHITECTURE.md` 严重过期~~ | ✅ 2026-10-13 已校正 |
| D | 无 OG 分享图（`public/` 为空） | 分享到微信/Twitter 无缩略图 |
| E | `eslint-config-next` 装了但未使用（ESLint 9 循环引用问题弃用） | 冗余依赖 |
| F | **不滚动的整页截图**会显示空白区块 | 滚动进场动画的固有特性；真实滚动完全正常（已实测验证） |

## 5.8 动效降级约定（2026-10-13 建立，**改 InView 前必读**）

滚动进场（`InView`）的初始态是内联 `style="opacity:0"`，有四个会「永久白屏」的坑，已全部兜住：

| 场景 | 兜底位置 |
|---|---|
| JS 不可用 | `layout.tsx` 的 `<noscript><style>` |
| `prefers-reduced-motion` | `globals.css` 的 `@media (prefers-reduced-motion)` |
| 打印 / 导出 PDF | `globals.css` 的 `@media print` |
| **瞬时跳转**（截图工具 / `scrollTo` 到底）跳过区块 | `config/motion.ts` 的 `VIEWPORT.margin = '100000px 0px 0px 0px'` |

统一靠 `InView` 根节点上的 **`data-inview` 属性** 被 CSS 选中（用 `!important` 覆盖内联样式）。
→ **新增任何「初始隐藏」的动效，都要挂 `data-inview` 或自行提供同等兜底。**

其他已固化的约定：
- `eslint.config.mjs` 的 **`LARGE_FILE_ALLOWLIST`**：超过函数/文件真红线的文件必须三处登记（文件顶部注释 + `docs/CODE_STYLE.md` 豁免清单 + 该数组）
- Grid / Flex 子项内含长不可断内容（URL、代码块）→ 必须加 **`min-w-0`**，否则移动端水平溢出

---

## 6. 协作方式（用户指定的工作流）

1. 用户会**逐个发送开源特效项目的链接**
2. 我逐个去看，**反馈**：
   - 该项目的核心吸睛点（动效 / 排版 / 配色 / 交互）
   - 哪几个 section 能复用、哪几个不能
   - 实现难度和需要哪些库
   - 是否与"克制内核"矛盾
3. **对齐后才动手写代码**
4. 建议的发送顺序：第 1 个是最"哇"的 → 第 2-3 个是不同风格用于横向对比 → 之后的可以是局部特效（某个滚动 / 粒子 / 3D 卡片）

---

## 7. 用户偏好与硬性要求

- **语言**：中文交流
- **必须做的**：每次对话都要更新记忆 Markdown 文件（用户会切换 Agent，记忆断了项目就废了）
- **必须做的**：项目要用 Git，做到哪一版不满意可以恢复
- **不要做**：不要修改 `B:\antigtavity projects\bosszhitou\Bosszhipin-job-bot` 里的任何文件
- **不要做**：不要在项目里提交 `.env`、密钥、个人信息

---

## 8. Agent 交接协议（必读）

每次与用户对话，**在结束前必须执行**：

1. 打开或创建 `.workbuddy-ai/memory/YYYY-MM-DD.md`（按当天日期）
2. **追加**（不是覆盖）本次对话的内容：
   - 用户说了什么（意图、决策、偏好变化）
   - 我做了什么（具体动作：建了什么文件、改了什么、跑了什么命令、结果如何）
   - 达成了什么共识 / 未决的问题
   - 下一步是什么
3. 如果产生了**长期性**的结论（技术选型、用户偏好、项目约定），同步更新本文件 `MEMORY.md`
4. 代码有可运行进展时，**提交 Git**（见 `.workbuddy-ai/memory/` 同级的 Git 规范）

**接手的新 Agent 请先读**：本文件 → 最近几天的 `YYYY-MM-DD.md` → 然后 git log。
