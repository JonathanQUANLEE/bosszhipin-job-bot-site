<div align="center">

# JobKoi-AI · 官方宣发页

**多平台全并发巡航 · 内置免费 AI 智能管家 · 现代极客求职工作站**

[![成熟线上直接体验](https://img.shields.io/badge/🌐_成熟线上站-免安装点击即用-emerald?style=for-the-badge)](https://jonathanquanlee.github.io/bosszhipin-job-bot-site/)
[![GitHub Release](https://img.shields.io/github/v/release/JonathanQUANLEE/JobKoi-AI?style=for-the-badge&color=8b5cf6)](https://github.com/JonathanQUANLEE/JobKoi-AI/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](./LICENSE)

<br />

[🌐 成熟线上直接体验](https://jonathanquanlee.github.io/bosszhipin-job-bot-site/) · [📦 软件开源主仓](https://github.com/JonathanQUANLEE/JobKoi-AI) · [💻 宣发网页源码](https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site) · [🐛 报告问题](https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site/issues)

</div>

---

## 🌟 线上成熟体验地址（免本地安装 · 浏览器点开即用）

> 🚀 **成熟线上正式站网址：[https://jonathanquanlee.github.io/bosszhipin-job-bot-site/](https://jonathanquanlee.github.io/bosszhipin-job-bot-site/)**
> 
> **无需在本地安装运行 `localhost:3000`！** 
> 页面已全面完成云端静态部署，直接点击上方线上链接即可在浏览器中完整体验全景并发巡航工作台、14 天多平台走势图表、昨日早报战报诊断、RAG 向量初筛交互与所有设计动效。

---

## 这是什么

这是开源项目 **[JobKoi-AI · 全智能求职锦鲤助手](https://github.com/JonathanQUANLEE/JobKoi-AI)**（原 Bosszhipin-job-bot 现代化重构升级版）的**官方宣发落地页**。

⚠️ **本仓库只包含宣发页面本身的前端工程。** 客户端与巡航内核源码存放在 [JobKoi-AI 开源主仓](https://github.com/JonathanQUANLEE/JobKoi-AI)。

---

### 被宣发的主项目：JobKoi-AI

[JobKoi-AI](https://github.com/JonathanQUANLEE/JobKoi-AI) 是基于 **Tauri 2 + Python + 大模型** 打造的现代化多平台求职工作站。

它专为终结打工人机械海投的精力内耗而生，核心特性包括：

1. **三大主流平台并发巡航**：
   - 深度聚合 **BOSS 直聘**、**猎聘 Liepin**、**前程无忧 51Job** 三大主流求职渠道。
   - 一句话描述求职意向，系统自动提炼结构化画像并多路并发开投，无需在各平台网页来回切换。

2. **内置作者买单的免费大模型 API Key**：
   - **完全不需要用户自备或付费购买任何 AI API Key！** 
   - 作者为大家免费内置并开放智谱 GLM-4-Flash 高并发大模型端点，开箱即用；
   - 同时也保持高度自由开放，支持高阶极客一键切换为自己的 DeepSeek、OpenAI 等兼容端点。

3. **RAG 岗位语义对齐与轻量向量初筛**：
   - 绝非死板关键词匹配。搭载本地微型向量库与 RAG 检索增强引擎，双向深度对齐简历技能树与目标 JD 职责；
   - 毫秒级智能识别并自动剔除外包、转包、培训贷、空壳招聘与用户自定义黑名单。

4. **0-Driver 原生隐匿防封**：
   - 摒弃传统容易触发风控的 Selenium / WebDriver 指纹，底层采用 Chrome DevTools Protocol 原生直连，`navigator.webdriver` 彻底为 `false`；
   - 光标移动采用真人微生理的三次贝塞尔曲线（Cubic Bézier）手滑模拟；
   - 配备 15~45 秒拟人随机间隔与动态平台额度守卫，遇到滑动验证码主动毫秒级熔断挂起。

5. **AI 智能管家与简历 STAR 精修**：
   - 内置 AI Copilot 智能管家，支持自然语言对话调控巡航节奏、诊断投递漏斗；
   - 简历 STAR 原则深度重构量化打磨，ATS 岗位关键词权重诊断，并针对不同岗位自动定制高转化打招呼语。

---

## 体验与使用方式

### 途径一：成熟线上演示站（强烈推荐 · 免安装）

**[👉 点击立即进入成熟线上演示站](https://jonathanquanlee.github.io/bosszhipin-job-bot-site/)**
- 无需配置任何环境，浏览器点开即用。

### 途径二：下载 Windows 桌面客户端

1. 前往 **[JobKoi-AI Releases 官方发布页](https://github.com/JonathanQUANLEE/JobKoi-AI/releases)**；
2. 下载最新版本客户端安装包 `JobKoi-AI-setup.exe`；
3. 双击安装运行，首次启动请确保本机已安装 Google Chrome。

### 途径三：开发者本地运行宣发页源码

如果您希望为本宣发页面贡献代码或进行样式调整：

```bash
# 1. 克隆宣发页仓库
git clone https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site.git
cd bosszhipin-job-bot-site

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

本地服务启动后，可在浏览器中查看 `http://localhost:3000`。

### 途径四：从源码启动 Bot 巡航客户端

如果您是 Python / Rust 开发者，希望从源码运行客户端主程序：

```bash
git clone https://github.com/JonathanQUANLEE/JobKoi-AI.git
cd JobKoi-AI
uv sync
uv run python -m boss_zhipin.tauri
```

---

## 宣发页技术栈与设计策略

**外壳要炸，内核要静。**

| 维度 | 选型 / 策略 |
|---|---|
| **框架** | **Next.js 16**（App Router，SSR 直出保障内容层首屏） |
| **语言** | **TypeScript**（Strict 强类型） |
| **样式** | **Tailwind CSS** + CSS 设计变量 Tokens |
| **动效** | **Motion (framer-motion)** + 裸 WebGL2 Shader（Aurora / Beams） |
| **图标** | **lucide-react** |
| **图表** | 自研轻量纯 SVG 交互走势折线图与早报晨报卡片 |

### 核心设计原则

1. **两层解耦**：
   - **内容层（SSR 直出）**：即使在低端设备或禁用 JS / WebGL 场景下，也能获得排版完美、信息完整的专业产品说明与数据展示。
   - **表现层（懒加载）**：黑曜石深邃暗黑美学、拟真物理撕票根通行证、可折叠数据战报抽屉、滚动光束与解密字效。
2. **全站色系纯净统一**：
   - 全面剔除突兀的羊皮纸亮白反差块，全站统一在深邃黑曜石（`#0b0914`）与霓虹冷紫/翡翠绿微光晕中，沉浸舒适护眼。
3. **大屏自适应沉浸布局**：
   - 桌面宽屏最大内容宽度提升至 `1520px`，配合弹性网格，彻底消除大屏幕两侧空旷留白。

---

## 目录结构

```text
.
├── docs/                     # 📚 架构规范与设计决策
│   ├── ARCHITECTURE.md       #    系统架构
│   ├── CODE_STYLE.md         #    代码规范
│   ├── EFFECTS.md            #    特效决策记录
│   └── PERFORMANCE.md        #    性能预算与分级降级
├── public/                   # 静态媒体与图标资源
├── scripts/                  # 构建脚本
└── src/
    ├── app/                  # Next.js App Router 路由与页面入口
    ├── components/
    │   ├── effects/          # 特效组件（均支持懒加载与降级）
    │   ├── layout/           # 顶部 Header 导航与底部 Footer
    │   ├── sections/         # 页面功能区块（Hero / Analytics / Features / Platforms 等）
    │   └── ui/               # 通用原子 UI 组件
    ├── config/               # 站点数据与特效配置文件
    ├── hooks/                # 视图与交互自定义 Hook
    ├── lib/                  # 历史投递数据模拟与工具函数
    ├── styles/               # 设计变量 tokens 与全局样式
    └── types/                # TypeScript 跨模块类型定义
```

---

## 质量与规范命令

```bash
# 类型检查
npm run typecheck

# 规范检查
npm run lint

# 生产环境静态打包构建
npm run build
```

---

## 开源许可证

本项目宣发页源码采用 **MIT** 开源协议，详见 [LICENSE](./LICENSE)。

第三方动效与组件遵循原作者协议：
- [React Bits](https://reactbits.dev)（MIT + Commons Clause v1.0）
- [Motion Primitives](https://motion-primitives.com)（MIT）
- [Lucide Icons](https://lucide.dev)（ISC）

**声明**：本项目仅供个人求职学习与研究使用，请勿用于高频恶意群发、骚扰招聘者或任何违规商业场景。使用者需自行遵守招聘平台相关协议并承担相应风险。

---

## 致谢

- [JobKoi-AI](https://github.com/JonathanQUANLEE/JobKoi-AI) —— 自动化求职工作站主角
- [longsizhuo/BossZhiPin_Job_Search](https://github.com/longsizhuo/BossZhiPin_Job_Search) —— 早期灵感参考来源
- [Motion Primitives](https://motion-primitives.com) —— 细腻动效组件
- [Lucide](https://lucide.dev) —— 高质图标库
