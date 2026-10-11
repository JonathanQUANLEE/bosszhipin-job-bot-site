# GitHub 仓库配置资料

> 本文件记录仓库名称、简介、About、Topics 等元信息的**定稿内容**，
> 以及建仓与推送的确切命令。
> 用途：无论谁（哪個 Agent）来操作，照着这份填，结果一致。

---

## 一、仓库名称

```
bosszhipin-job-bot-site
```

**为什么这么起**：与源项目 `Bosszhipin-job-bot` 同名 + `-site` 后缀，
一眼就知道「这是它的官网」，不会和 bot 本体仓库混淆，也便于两个仓库在 GitHub 上并列。

---

## 二、Description / About（仓库简介）

> GitHub 简介字段，建议 ≤160 字符。直接复制下面这一行：

```
Bosszhipin-job-bot 官方宣发页 · 把「克制」做成视觉语言的开源落地页 · Next.js / React / motion / Tailwind
```

**为什么这么写**：
- 前半句说清「这是什么」（某个项目的官方宣发页）
- 中段「把克制做成视觉语言」是本项目最独特的定位，也是记忆点
- 尾句列技术栈，便于技术访客判断与搜索

---

## 三、Website（主页 / Homepage）

如果启用 GitHub Pages：

```
https://jonathanquanlee.github.io/bosszhipin-job-bot-site/
```

> 未启用 Pages 前可先留空，或填源项目地址 `https://github.com/JonathanQUANLEE/Bosszhipin-job-bot`

---

## 四、Topics（标签）

按相关性排序，直接复制：

```
nextjs, react, typescript, tailwindcss, landing-page, webgl, animation, framer-motion, job-search, job-application, automation, open-source
```

| Topic | 作用 |
|---|---|
| `nextjs` `react` `typescript` `tailwindcss` | 技术栈，便于同类项目检索 |
| `landing-page` `webgl` `animation` `framer-motion` | 页面类型与特效，吸引前端/设计受众 |
| `job-search` `job-application` `automation` | 领域标签，吸引求职者受众 |
| `open-source` | 开源属性 |

---

## 五、其他仓库设置

| 设置项 | 建议值 | 说明 |
|---|---|---|
| **可见性** | **Public** | 宣发页必须公开，否则无人能看到 |
| **License** | MIT | 已在本仓库根目录提供 `LICENSE` |
| **README** | 已写好 | 根目录 `README.md` |
| **默认分支** | `main` | 本地已是 `main` |
| **Pages** | 可选启用 | Source 选 `GitHub Actions`（Next.js 需构建，不能用 branch 直出） |
| **Issues** | 开启 | 让访客能反馈 |
| **Discussions** | 可选 | 若想收集求职者反馈可开 |

---

## 六、建仓与推送命令

### 方式 A：用 `gh` CLI（需要 token）

```bash
# 1. 先登录（会提示选 GitHub.com → HTTPS/SSH → 浏览器授权）
gh auth login

# 2. 建仓并推送（public，用上面定稿的简介）
gh repo create bosszhipin-job-bot-site \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description="Bosszhipin-job-bot 官方宣发页 · 把「克制」做成视觉语言的开源落地页 · Next.js / React / motion / Tailwind"

# 3. 填 Topics
gh repo edit JonathanQUANLEE/bosszhipin-job-bot-site \
  --add-topic nextjs --add-topic react --add-topic typescript \
  --add-topic tailwindcss --add-topic landing-page --add-topic webgl \
  --add-topic animation --add-topic framer-motion --add-topic job-search \
  --add-topic job-application --add-topic automation --add-topic open-source
```

### 方式 B：网页手动建仓 + SSH 推送（**当前环境推荐**）

本机 SSH 已认证通过（`ssh -T git@github.com` 返回 `Hi JonathanQUANLEE!`），
但 `gh` 未登录（API 建仓需要 token）。所以：

**第 1 步 —— 在网页建仓**（https://github.com/new）

| 字段 | 填什么 |
|---|---|
| Repository name | `bosszhipin-job-bot-site` |
| Description | 见第二节（复制那一行） |
| 可见性 | **Public** |
| **不要**勾选 | Add a README file / Add .gitignore / Choose a license |
| | ← 本地已有，勾了会冲突 |

**第 2 步 —— 本地推送**

```bash
cd "B:/antigtavity projects/boss web"
git remote add origin git@github.com:JonathanQUANLEE/bosszhipin-job-bot-site.git
git push -u origin main
git push origin v0.1-foundation
```

**第 3 步 —— 网页填 Topics**（Settings → About ⚙️ → Topics）
按第四节复制进去。

---

## 七、安全提醒

- ⚠️ **建仓时不要勾选自动生成 README / .gitignore / LICENSE** —— 本地已有，会冲突
- ⚠️ 仓库公开后，**确认没有 `.env`、密钥、个人求职信息被提交**（`.gitignore` 已排除，但推送前建议 `git log -p --stat | grep -i -E "token|password|secret"` 复查）
- ⚠️ bot 源码目录 `B:\antigtavity projects\bosszhitou\Bosszhipin-job-bot` 是**只读参考**，不要提交进本仓库
