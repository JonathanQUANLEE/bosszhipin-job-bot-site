<div align="center">

# Bosszhipin Job Bot · 宣发页

**一个把「克制」做成视觉语言的开源项目落地页**

[在线预览](#) · [源项目](https://github.com/JonathanQUANLEE/Bosszhipin-job-bot) · [报告问题](https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site/issues)

</div>

---

## 这是什么

这是开源项目 **[Bosszhipin-job-bot](https://github.com/JonathanQUANLEE/Bosszhipin-job-bot)** 的**官方宣发落地页**。

⚠️ **本仓库只包含宣发页面本身，不包含 bot 的源码。** bot 源码在[它自己的仓库](https://github.com/JonathanQUANLEE/Bosszhipin-job-bot)，本仓库只做**只读引用**（取用它的截图、介绍文案、设计语言）。

### 被宣发的项目

[Bosszhipin-job-bot](https://github.com/JonathanQUANLEE/Bosszhipin-job-bot) 是一个面向个人求职者的 BOSS 直聘岗位筛选与沟通工具。它用浏览器自动化按本地规则筛选岗位，并发送你自己写的固定招呼语。

它最有意思的地方是**它不做的事**：

- 不提速、不并发、不绕反爬
- 有随机等待、单次上限、每日上限
- 有 Dry-run、有逐条审核、有验证码熔断
- 0.2 版本主动**移除**了 LLM 生成、RAG、向量库 —— 你不需要任何 AI API key

> 别人都在做「更猛的 bot」，它在做「更克制的 bot」。

---

## 设计策略

**外壳要炸，内核要静。**

| | 目标 | 做法 |
|---|---|---|
| **外壳** | 让不懂技术的普通求职者第一眼被震住 | WebGL 背景、解密字效、瞄准光标、滚动叙事 |
| **内核** | 让技术圈看完觉得这项目真的克制 | SSR 直出的清晰信息架构、完整的功能介绍与免责声明 |

关键在于**两层解耦**：

```
内容层（SSR 直出）→ 特效全挂也能读，是一个完整专业的产品页
表现层（懒加载）  → 锦上添花的 WebGL 与动效
```

就算访客设备很烂、特效全部加载失败，他拿到的仍然是一个**及格的产品页**；
设备好的访客拿到的则是**惊艳的作品**。**两边都不损失。**

### 特效不是装饰，是叙事

每个特效都在讲项目故事，不是为了炫而炫：

| 特效 | 它在讲什么 |
|---|---|
| 流动光带背景 | 扫描、筛选 —— 项目的核心动作 |
| 解密文字标题 | bot / 自动化 |
| 瞄准光标 | 精准命中岗位 |
| **长按才发送** 的按钮 | **把「克制」变成可交互的体验** |

---

## 技术栈

只用该领域最成熟、长期有人维护的方案：

| 层 | 选型 |
|---|---|
| 框架 | **Next.js 16**（App Router） |
| 语言 | **TypeScript**（strict） |
| 样式 | **Tailwind CSS** + CSS 变量 |
| 动效 | **motion** |
| 图标 | **lucide-react** |

**运行时依赖只有 5 个。** 没有 gsap、没有 three.js、没有 WebGL 库、没有图表库 ——
背景特效用的是裸 WebGL2 shader，零 npm 依赖。

### 特效来源

| 库 | 协议 | 用途 |
|---|---|---|
| [Motion Primitives](https://motion-primitives.com) | MIT | 内容层：精致克制的卡片、文字、弹窗 |
| [React Bits](https://reactbits.dev) | MIT + Commons Clause | 表现层：Hero 背景、解密字效、CTA |
| [Lucide](https://lucide.dev) | ISC | 全站图标（唯一图标源） |

> React Bits 采用 **MIT + Commons Clause Condition v1.0**：
> 可用于自己的产品与网站（含商用），但不可将组件本身打包转售。
> 本仓库作为自有项目的宣发页使用，符合协议要求，并保留了源码中的版权声明。

---

## 快速开始

```bash
git clone https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site.git
cd bosszhipin-job-bot-site
npm install
npm run dev
```

打开 http://localhost:3000

### 可用命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run lint` | ESLint 检查 |
| `npm run format` | Prettier 格式化 |
| `npm run check` | 类型 + 规范 + 构建，一次跑完 |
| `npm run analyze` | 打包体积分析 |

---

## 目录结构

```text
.
├── .workbuddy-ai/memory/     # 📌 项目记忆（Agent 交接必读）
│   ├── MEMORY.md             #    长期记忆
│   └── YYYY-MM-DD.md         #    每日工作日志
├── docs/                     # 📚 工程文档
│   ├── CODE_STYLE.md         #    代码规范（项目法律）
│   ├── ARCHITECTURE.md       #    架构与选型
│   ├── PERFORMANCE.md        #    性能预算与降级策略
│   └── EFFECTS.md            #    特效选型与决策记录
├── public/                   # 静态资源
├── scripts/                  # 构建期工具脚本
└── src/
    ├── app/                  # Next.js App Router
    ├── components/
    │   ├── sections/         # 页面区块（一个区块一个目录）
    │   ├── effects/          # 特效组件（全部懒加载）
    │   ├── ui/               # 通用原子组件
    │   └── layout/           # 页头、页脚
    ├── lib/                  # 纯逻辑（effects / performance / utils）
    ├── hooks/                # 自定义 Hook
    ├── config/               # 所有常量集中地
    ├── styles/               # 设计变量 tokens
    └── types/                # 跨模块类型
```

**目录即文档** —— 光看目录树就该知道这个项目有什么、各自在哪。

---

## 工程规范

本项目由 AI Agent 协作开发，且会在多个 Agent 之间切换。规范不是建议，是**硬约束**：

📄 完整规范见 **[`docs/CODE_STYLE.md`](./docs/CODE_STYLE.md)**

核心两条：

1. **职责分离**（最重要）—— 一个概念一个文件。一个文件里堆了多个本该独立的组件/功能/领域逻辑，必须拆。
   > 行数是结果，职责混杂才是原因。拆得干净，文件自然就短。

2. **特效三可** —— 每个特效必须可懒加载、可降级（按设备分 4 档）、可关闭（尊重 `prefers-reduced-motion`）。

长度规则已做成 **ESLint 硬错误**：文件 >600 行、函数 >150 行直接报错。
（提醒线 300 行不阻断，交给 code review。）

性能预算同样写死：首屏 JS ≤170KB、LCP <2.5s、**全站只允许 1 个 WebGL 背景**。

---

## 参与贡献

欢迎提 issue 和 PR。提交前请跑：

```bash
npm run check
```

> 注：commit message 中**不要添加 AI 的 `Co-Authored-By` trailer**（沿用 bot 项目的约定）。

---

## 许可证

本宣发页源码采用 **MIT** 协议，见 [LICENSE](./LICENSE)。

其中包含的第三方组件遵循各自协议：
React Bits（MIT + Commons Clause v1.0）、Motion Primitives（MIT）、Lucide（ISC）。

**被宣发的 Bosszhipin-job-bot 项目本身同样是 MIT**，且仅用于个人求职，
请勿用于高频群发、骚扰招聘者或任何商业用途。

---

## 致谢

- [Bosszhipin-job-bot](https://github.com/JonathanQUANLEE/Bosszhipin-job-bot) —— 被宣发的主角
- [longsizhuo/BossZhiPin_Job_Search](https://github.com/longsizhuo/BossZhiPin_Job_Search) —— bot 项目最初的参考来源
- [Motion Primitives](https://motion-primitives.com) —— 内容层动效
- [React Bits](https://reactbits.dev) —— 表现层特效
- [Lucide](https://lucide.dev) —— 图标
