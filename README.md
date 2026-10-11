# Boss Job Bot — 宣发网页

为开源项目 [Bosszhipin-job-bot](https://github.com/4evour/Bosszhipin-job-bot) 制作的宣发落地页。

> ⚠️ 本仓库**只是宣发页**，不包含 bot 本身的源码。
> bot 源码位于 `B:\antigtavity projects\bosszhitou\Bosszhipin-job-bot`，
> **只读引用，**绝对不要修改那里的任何文件**。

---

## 快速开始

```bash
# 安装依赖
npm install        # 或 pnpm install

# 本地开发
npm run dev

# 构建
npm run build
```

---

## 项目约定

### 设计与内容

完整的项目背景、宣发策略、页面骨架、用户偏好，都记在：

📄 **`.workbuddy-ai/memory/MEMORY.md`** ← 新 Agent 接手请先读这个

### 技术栈

- Next.js 14+（App Router）+ TypeScript
- Tailwind CSS + CSS 变量
- 动效库：待定（等特效参考对齐后确定）

---

## 🔒 安全规范（必读）

本项目由 AI Agent 协作开发，用户会在多个 Agent 间切换。以下规范**每次都要遵守**：

### 1. 记忆文件必须更新（最高优先级）

每次对话结束前，追加写入 `.workbuddy-ai/memory/YYYY-MM-DD.md`：

- 用户说了什么（意图、决策、偏好变化）
- 我做了什么（建/改了什么文件、跑了什么命令、结果如何）
- 达成的共识、未决问题
- 下一步是什么

产生长期性结论时，同步更新 `MEMORY.md`。

**原因**：用户额度用完会切换 Agent。记忆断了 = 项目报废。

### 2. Git 提交规范

- **每完成一个可运行状态就提交**，不要攒到最后
- 提交信息用中文或英文均可，但**不要把 AI 的名字写进 commit trailer**
  （这是 bot 项目 CLAUDE.md 里的红线，本项目沿用）
- 做大的、有风险的改动**之前**先提交一次，保证有回滚点
- 重要里程碑打 tag，例如 `git tag v0.1-hero`

### 3. 绝不提交敏感内容

`.gitignore` 已排除 `.env`、密钥、证书、日志、大体积素材。
**不要手动把任何密钥或个人求职信息加进仓库。**

### 4. 不要动 bot 源码目录

`B:\antigtavity projects\bosszhitou\Bosszhipin-job-bot` 是**只读参考**，
只有截图和文案可以从那里取，**不要写入**。

---

## 目录结构（规划中）

```text
.
├── .workbuddy-ai/memory/     # 记忆文件（最重要）
│   ├── MEMORY.md             # 长期记忆 / Agent 交接必读
│   └── YYYY-MM-DD.md         # 每日工作日志（追加，不覆盖）
├── app/                      # Next.js App Router
├── components/               # 页面组件（按 section 分）
├── public/                   # 静态素材（截图、字体）
└── README.md
```
