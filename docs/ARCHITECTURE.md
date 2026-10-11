# 架构设计

## 技术选型（原则：只用最成熟、长期有人维护的）

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | **Next.js 15（App Router）** | React 官方推荐生产框架；SSG/ISR/SSR 通吃；部署生态最成熟 |
| 语言 | **TypeScript（strict）** | 大型特效项目没有类型等于裸奔 |
| 样式 | **Tailwind CSS v3.4** + CSS 变量 | 与 bot 项目的 monochrome 设计语言对齐；v3 插件生态最全、最稳 |
| 动效（基础） | **Framer Motion (motion)** | React 生态事实标准，声明式，支持 layout/手势 |
| 动效（时间轴） | **GSAP** | 复杂滚动叙事、时间轴编排的最强方案，商业级成熟 |
| 3D / WebGL | **Three.js** + **React Three Fiber** | WebGL 事实标准；R3F 提供 React 声明式封装 |
| 后处理 | **@react-three/postprocessing** | Bloom / 景深等，美术级观感的关键 |
| 字体 | **next/font**（自托管） | 避免 FOUT，性能最优 |
| 部署 | **Vercel** 或静态导出 | 视是否需要后端能力而定 |
| 脚本 | **Python 3.12+** | 仅做构建期工具（素材处理、内容抽取），**不做后端** |

> 所有选型都是该领域 **GitHub star 最高 / 维护最活跃** 的一线方案。
> 不引入任何「小众但炫」的库——它们会在半年后变成维护负担。

---

## 目录结构

```text
boss web/
├── .workbuddy-ai/memory/          # 🔒 记忆文件（Agent 交接，最重要）
│   ├── MEMORY.md                  #    长期记忆 + 交接协议
│   └── YYYY-MM-DD.md              #    每日日志（追加，不覆盖）
│
├── docs/                          # 📚 项目文档
│   ├── CODE_STYLE.md              #    代码规范（法律）
│   ├── ARCHITECTURE.md            #    本文件
│   ├── PERFORMANCE.md             #    性能预算与特效降级策略
│   └── EFFECTS.md                 #    特效清单（用户提供参考后填充）
│
├── public/                        # 📦 静态资源
│   ├── fonts/                     #    自托管字体
│   ├── images/                    #    截图、OG 图、favicon
│   └── downloads/                 #    安装包（或外链 GitHub Release）
│
├── scripts/                       # 🐍 Python / Node 构建期脚本
│                                  #    素材压缩、内容抽取、批量处理
│
└── src/
    ├── app/                       # Next.js App Router
    │   ├── layout.tsx             #    根布局（字体、meta、Provider）
    │   ├── page.tsx               #    首页（只做 section 编排，不写内容）
    │   ├── globals.css            #    全局样式 + 引入 tokens
    │   ├── opengraph-image.tsx    #    动态 OG 图（可选）
    │   └── api/                   #    ⚠️ 极少量 Route Handler（见下文"要不要后端"）
    │
    ├── components/
    │   ├── sections/              # 🎬 页面区块，一个 section 一个目录
    │   │   ├── Hero/              #       Hero.tsx + config.ts + index.ts
    │   │   ├── Pipeline/          #       "它在想什么" 管线动画
    │   │   ├── SafetyGates/       #       "三道闸门"
    │   │   ├── Credits/           #       "它没说的话" 致敬
    │   │   └── CTA/               #       下载 / Star / 文档
    │   │
    │   ├── effects/               # ✨ 特效组件（全部懒加载）
    │   │   ├── ParticleField/
    │   │   ├── ScrollNarrative/
    │   │   └── ...
    │   │
    │   ├── ui/                    # 🧱 通用原子组件（Button/Card/Badge...）
    │   └── layout/                #    页头、页脚、容器
    │
    ├── lib/                       # 🔧 纯逻辑，与 React 无关
    │   ├── effects/               #    引擎适配层（three / gsap / canvas 封装）
    │   ├── performance/           #    性能检测、降级策略、rAF 调度
    │   └── utils/                 #    格式化等纯函数
    │
    ├── hooks/                     # 🪝 自定义 Hook
    │   ├── use-reduced-motion.ts
    │   ├── use-in-view.ts
    │   └── use-performance-tier.ts
    │
    ├── config/                    # ⚙️ 所有常量集中地
    │   ├── site.ts                #    GitHub 地址、下载链接、项目介绍文案
    │   ├── motion.ts              #    动画时长、缓动曲线
    │   └── effects.ts             #    特效参数（粒子数、强度...）
    │
    ├── styles/
    │   └── tokens.css             # 🎨 设计变量（颜色/字号/间距）
    │
    └── types/                     # 跨模块共用类型
```

---

## 分层原则（依赖只能单向）

```
config  ←  components/sections  ←  app/page.tsx
  ↑              ↑
styles      components/effects
                ↑
            lib/effects      ←  lib/performance
```

| 规则 | 说明 |
|---|---|
| `lib/` **不许** import `components/` | 纯逻辑层不依赖 UI |
| `components/effects/` **不许**裸写引擎 | 必须走 `lib/effects/` |
| `config/` **不许** import 任何东西 | 纯数据 |
| `app/page.tsx` **只做编排** | 不放业务逻辑，理想状态 < 60 行 |

---

## 关于「要不要写后端」

### 结论：**主体纯静态，不写传统后端。**

宣发页 95% 的需求是静态内容（介绍、截图、链接、下载），
用 **Next.js 静态导出（SSG）** 即可，无需服务器、无需数据库、无需运维。

### 但有三种能力需要「一点点服务端」

| 需求 | 方案 | 是否需要独立后端 |
|---|---|---|
| 显示 GitHub star / fork 数 | Next.js **ISR**（定时重新生成，缓存 GitHub API） | ❌ 不需要 |
| 下载安装包 | 直接外链 **GitHub Releases**，不自己托管 | ❌ 不需要 |
| 访问统计 | 第三方（Vercel Analytics / Umami） | ❌ 不需要 |
| 邮件订阅 / 反馈表单 | Next.js **Route Handler**（Serverless 函数） | ❌ 不需要独立后端 |
| 下载量统计 | 一个 Route Handler + 云数据库 | ⚠️ 可选，初期不做 |

> **所以：不写后端。** 需要服务端能力时用 Next.js 自带的
> Route Handler / ISR / Server Actions 就够了，全部跑在同一个部署里。

### Python 用在哪

**只做构建期工具脚本**，不是后端、不参与运行时：

- 批量压缩/转换素材截图
- 从 bot 项目 README 抽取文案生成 `src/config/site.ts`
- 生成 favicon / OG 图
- 批量重命名、校验资源

放在 `scripts/`，用 `uv` 跑，不进前端 bundle。

---

## 页面内容清单（宣发必须包含的）

来源：`src/config/site.ts`，组件里不硬编码

| 内容 | 配置项 | 备注 |
|---|---|---|
| GitHub 仓库地址 | `github.repoUrl` | |
| Star / Fork 数 | 动态拉取 + ISR | |
| 项目一句话介绍 | `tagline` | |
| 完整项目介绍 | `description` | |
| 核心特性列表 | `features[]` | scan/review/auto、限速、Dry-run... |
| 安装包下载 | `downloads[]` | Windows / macOS / Linux → GitHub Release |
| 快速开始命令 | `quickStart` | `uv run python -m boss_zhipin.tauri` |
| 运行截图 | `public/images/` | 从 bot 项目 `docs/images/` 复制 |
| 致敬原项目 | `credits` | `longsizhuo/BossZhiPin_Job_Search` |
| 许可证 | `license: MIT` | |
| 免责声明 | `disclaimer` | bot 项目 README 里有，宣发页必须保留 |
