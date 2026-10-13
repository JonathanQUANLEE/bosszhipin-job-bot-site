# 架构设计

## 技术选型（原则：只用最成熟、长期有人维护的）

> ⚠️ 本表于 2026-10-13 校正。早期草案曾规划 GSAP / Three.js / R3F，
> 最终**全部放弃** —— 见 `docs/EFFECTS.md` 的决策记录。当前运行时依赖只有 5 个。

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | **Next.js 16.4（App Router）** | React 官方推荐生产框架；静态导出即可满足宣发页 |
| 语言 | **TypeScript（strict）** | 大型特效项目没有类型等于裸奔 |
| 样式 | **Tailwind CSS v3.4** + CSS 变量 | 与 bot 项目的 monochrome 设计语言对齐；v3 插件生态最全、最稳 |
| 动效 | **motion**（Framer Motion 继任者） | React 生态事实标准，声明式 |
| 3D / WebGL | **裸 WebGL2 shader**（零 npm 依赖） | 只有 Hero 的 Beams 用；不装 three / ogl，省下几百 KB |
| 图标 | **lucide-react** | 唯一图标源，显式白名单映射保证 tree-shaking |
| 字体 | **系统字体栈**（CSS 变量） | 零网络请求、零 FOUT，首屏最快 |
| 部署 | **GitHub Pages**（静态导出 `dist/`） | 见 `next.config.ts` 的 `basePath` |
| 脚本 | **Python 3.12+** | 仅做构建期工具，**不做后端** |

**运行时依赖仅 5 个**：`next` / `react` / `react-dom` / `motion` / `lucide-react`
→ **零 gsap、零 three、零 ogl、零图表库**

---

## 目录结构（以实际文件为准，2026-10-13）

```text
boss web/
├── .workbuddy-ai/memory/          # 🔒 记忆文件（Agent 交接，最重要）
│   ├── MEMORY.md                  #    长期记忆 + 交接协议
│   └── YYYY-MM-DD.md              #    每日日志（追加，不覆盖）
│
├── docs/                          # 📚 项目文档
│   ├── CODE_STYLE.md              #    代码规范（法律）+ 豁免清单
│   ├── ARCHITECTURE.md            #    本文件
│   ├── PERFORMANCE.md             #    性能预算与特效降级策略
│   ├── EFFECTS.md                 #    特效清单与选型决策
│   └── GITHUB_SETUP.md            #    仓库元信息
│
├── dist/                          # 📦 构建产物（gitignore，部署到 gh-pages）
├── public/                        #    静态资源（当前为空；favicon 走 src/app/icon.svg）
├── scripts/                       # 🐍 构建期脚本
│
└── src/
    ├── app/
    │   ├── layout.tsx             #    根布局（meta / noscript 兜底）
    │   ├── page.tsx               #    首页（只做 section 编排）
    │   ├── globals.css            #    全局样式 + 动效降级
    │   └── icon.svg               #    favicon
    │
    ├── components/
    │   ├── sections/              # 🎬 页面区块（一个 section 一个目录）
    │   │   ├── Hero/              #     首屏（Beams + 解密字效 + 数字滚动）
    │   │   ├── PainPoints/        #     痛点对比
    │   │   ├── Features/          #     功能网格（FeatureCard）
    │   │   ├── SafetyGates/       #     三道闸门（ModeCard + Crosshair）
    │   │   ├── FAQ/               #     常见问题
    │   │   └── Start/             #     下载 + 快速开始
    │   ├── effects/               # ✨ 特效组件
    │   │   ├── Beams/             #     裸 WebGL2 光带（唯一 heavy，懒加载）
    │   │   ├── DecryptedText/     #     解密字效
    │   │   ├── AnimatedNumber/    #     数字滚动
    │   │   ├── SpotlightCard/     #     聚光卡片
    │   │   ├── Crosshair/         #     限定区块瞄准光标（触摸设备自动禁用）
    │   │   └── InView/            #     滚动进场统一封装
    │   ├── ui/                    # 🧱 原子组件（Button / Icon / SectionHeading）
    │   └── layout/                #    Header（含移动端抽屉）/ Footer
    │
    ├── config/                    # ⚙️ 所有常量集中地
    │   ├── site.ts                #    全部文案 / 链接 / 数字
    │   ├── motion.ts              #    动画时长、缓动、VIEWPORT
    │   └── effects.ts             #    EFFECT_REGISTRY + 性能预算
    │
    ├── styles/tokens.css          # 🎨 设计变量
    └── types/site.ts              # 跨模块共用类型
```

> `src/lib/` 与 `src/hooks/` 尚未创建 —— 当前逻辑量还不足以需要它们。
> 需要时再建，不预先造空目录。

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
