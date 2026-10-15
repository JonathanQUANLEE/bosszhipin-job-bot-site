import type { SiteConfig } from '@/types/site';

/**
 * 站点全部内容常量。
 * 对齐最新项目形态（JobKoi-AI · 全智能求职锦鲤助手）
 *
 * 核心升级点：
 * 1. 明确标明成熟线上访问地址：https://jonathanquanlee.github.io/bosszhipin-job-bot-site/（无需本地运行）；
 * 2. 纠正 AI 说明：内置作者免费提供的高并发大模型 API Key（开箱即用），支持 RAG 岗位语义对齐与微型向量检索；
 * 3. 核心能力：三平台并发巡航（BOSS / 猎聘 / 51job）、0-Driver 原生隐匿防封、AI Copilot 智能管家、简历 STAR 深度诊断精修。
 */
export const siteConfig: SiteConfig = {
  url: 'https://jonathanquanlee.github.io/bosszhipin-job-bot-site/',

  github: {
    repoUrl: 'https://github.com/JonathanQUANLEE/JobKoi-AI',
    siteRepoUrl: 'https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site',
    inspirationUrl: 'https://github.com/longsizhuo/BossZhiPin_Job_Search',
  },

  release: {
    published: true,
    badge: '成熟线上版已上线',
    note:
      '成熟线上演示站与 Windows 桌面客户端已同步发布！' +
      '内置免费大模型 API Key，支持三大招聘平台多路并发。',
  },

  name: 'JobKoi · 锦鲤求职',

  tagline: '别再把时间浪费在手动海投上了',

  description:
    '三大求职平台后台自动盯盘，自动过滤培训中介与外包陷阱，真诚打招呼。' +
    '自带免费 AI，绝不上传个人隐私，把找工作的尊严还给自己。',

  modes: [
    {
      id: 'scan',
      name: 'scan',
      title: '只看不发',
      behavior: '只扫描并记录命中的岗位，不发送任何消息',
      scenario: '调规则、看岗位质量与 RAG 匹配度',
      recommended: true,
    },
    {
      id: 'review',
      name: 'review',
      title: '逐条审核',
      behavior: '命中后展示岗位详情与 AI 定制招呼语，确认后才发送',
      scenario: '精准投递，针对高意向大厂岗',
    },
    {
      id: 'auto',
      name: 'auto',
      title: '全自动巡航',
      behavior: '命中后按设定拟人化节奏档位多平台并发自动投递',
      scenario: '日常自动化盯盘，省时提效',
    },
  ],

  features: [
    {
      icon: 'LayoutDashboard',
      title: '并发巡航工作台',
      description:
        '一句话开跑。输入求职意图，自动整理出精准画像，三大平台协同并发开投，实时掌控进度。',
    },
    {
      icon: 'UserRoundSearch',
      title: '求职画像与 RAG 严选',
      description:
        '基于本地轻量向量库与 RAG 语义增强，双向比对 JD 关键词与薪资门槛，智能排除外包与低质岗位。',
    },
    {
      icon: 'FileText',
      title: '多版本简历中心',
      description:
        '本地资料库管理多份简历，PDF、Word、图片原生支持，数据 100% 存在本机，绝不上云。',
    },
    {
      icon: 'Bot',
      title: 'AI 求职智能管家',
      description:
        '内置免费大模型 API Key，对话式调控巡航、调整风控节奏、诊断简历痛点，7×24 小时贴心陪伴。',
    },
    {
      icon: 'Sparkles',
      title: '简历 STAR 智能精修',
      description:
        '工业级简历重构工作室：STAR 闭环改写、数据量化打磨、ATS 岗位高频关键词加权与雷达图评分。',
    },
    {
      icon: 'BarChart3',
      title: '数据统计与每日早报',
      description:
        '每日 09:00 定时结算昨日战报，多平台投递走势曲线、HR 回复率漏斗与行动策略复盘一目了然。',
    },
  ],

  comparisons: [
    {
      other: '在各大招聘网站之间来回切，手动机械打招呼上百次',
      ours: '一句话说清需求，BOSS / 猎聘 / 51Job 三大平台并发开投',
      note: '三大平台聚合调度，一次配置全网生效',
    },
    {
      other: '必须自己四处买 API Key，配置繁琐劝退小白',
      ours: '内置作者免费提供的高并发 API Key，开箱即用完全免费',
      note: '免配 Key 直接用，也支持配置自定义私有模型',
    },
    {
      other: '简历投出去石沉大海，死板关键词匹配容易误判',
      ours: 'RAG 深度语义双向对齐 + STAR 动词量化精修',
      note: '机器怎么初筛你的履历，提前演练诊断',
    },
    {
      other: '自动化脚本容易触发验证码甚至封号',
      ours: '0-Driver 原生隐匿管道 + 三次贝塞尔拟人手滑延时',
      note: '无 Selenium/WebDriver 指纹，遇异常主动毫秒级熔断',
    },
  ],

  faqs: [
    {
      q: '这个项目有线上可以直接访问体验的地址吗？',
      a: '有的！成熟线上全景演示站：https://jonathanquanlee.github.io/bosszhipin-job-bot-site/ ，无需在本地配置 Node.js、pnpm 或执行 localhost:3000，直接在浏览器点开即可完整体验所有特性、图表与交互！',
    },
    {
      q: '必须自己准备或购买 AI API Key 吗？',
      a: '完全不需要！作者已经为大家内置并免费提供智谱 GLM-4-Flash 高并发大模型 API Key，下载或打开软件就能直接使用 AI 智能管家、意图提炼和打招呼生成功能。同时系统高度开放，高阶用户也可以在配置中切换为自己的 DeepSeek、OpenAI 或其他兼容端点。',
    },
    {
      q: '软件有大模型生成、RAG 和向量库吗？',
      a: '当然有！系统搭载了完整的 AI 智能中枢：包括基于 RAG 的岗位描述与简历技能双向对齐引擎、本地微型语义向量初筛、STAR 原则简历精修以及个性化打招呼语生成器，深度赋能求职全链路。',
    },
    {
      q: '会被招聘平台封号吗？有哪些安全防护？',
      a: '任何自动化工具都有账号风险，但我们做到了工业级无痕拟人防御：基于 0-Driver 底层 Chrome DevTools Protocol 直连，彻底剔除 navigator.webdriver 标志；光标移动遵循真实人类生理的三次贝塞尔曲线；支持 15~45 秒随机拟人间隔与平台限额守卫；遇到滑块或验证提示主动毫秒级熔断挂起。',
    },
    {
      q: '我的简历和账号隐私安全吗？',
      a: '绝对安全。架构秉持 100% Local-First（本地优先）哲学：你的登录 Cookie、个人简历、投递历史全部存储在本地私有沙盒数据库中，零远程服务器上传，无云端数据泄露风险。',
    },
    {
      q: '软件收费吗？如何下载桌面客户端？',
      a: '完全免费，基于 MIT 协议纯净开源。没有流氓广告，没有隐藏付费。前往 GitHub 仓库 Releases 页面即可直接下载 Windows 客户端安装包 JobKoi-AI-setup.exe。',
    },
  ],

  platforms: [
    {
      id: 'boss',
      name: 'BOSS 直聘',
      dailyLimit: '100 次 / 天',
      cadence: '25–45 秒 / 次',
      status: 'active',
      features: ['牛人打招呼', '岗位语义对齐', '公司黑名单', '防封随机微颤'],
    },
    {
      id: 'liepin',
      name: '猎聘 Liepin',
      dailyLimit: '80 次 / 天',
      cadence: '30–60 秒 / 次',
      status: 'active',
      features: ['猎头直聊', '高薪中高端筛选', '应届生直投', '在线简历发送'],
    },
    {
      id: 'job51',
      name: '前程无忧 51Job',
      dailyLimit: '50 次 / 天',
      cadence: '20–40 秒 / 次',
      status: 'active',
      features: ['多行业并发', 'HR 即时沟通', '本地投递去重', '多城市聚合'],
    },
    {
      id: 'zhilian',
      name: '智联招聘',
      dailyLimit: '50 次 / 天',
      cadence: '30–50 秒 / 次',
      status: 'planned',
      features: ['名企网申通道', '智能初筛', '校招绿色通道'],
    },
  ],

  paceTiers: [
    {
      id: 'steady',
      name: '稳健防封档',
      cadence: '30–45 秒',
      dailyCap: '40–60 份',
      risk: '极低 · 极度拟人',
      scenario: '日常长期巡航、爱惜账号者首选',
    },
    {
      id: 'balance',
      name: '平衡推荐档',
      cadence: '20–35 秒',
      dailyCap: '60–80 份',
      risk: '低 · 智能节律',
      scenario: '兼顾速度与安全，大多数求职者默认推荐',
      recommended: true,
    },
    {
      id: 'sprint',
      name: '冲刺效率档',
      cadence: '15–25 秒',
      dailyCap: '80–100 份',
      risk: '中 · 紧贴平台上限',
      scenario: '急需快速拿到面试机会的冲刺阶段',
    },
  ],

  safetyLimits: [
    {
      key: 'daily_total_cap',
      label: '单日全平台总上限',
      value: '200 次',
      description: '三大招聘平台投递总额熔断保护，防止超出平台安全阈值',
    },
    {
      key: 'min_interval_seconds',
      label: '最小投递拟人间歇',
      value: '15 秒',
      description: '动态三次贝塞尔曲线手滑延时，彻底剔除高频机械脚本特征',
    },
    {
      key: 'captcha_auto_pause',
      label: '验证码风控熔断',
      value: '毫秒级挂起',
      description: '遭遇滑块或短信验证时主动鸣笛挂起并通知用户，绝不硬闯',
    },
    {
      key: 'local_sandbox_storage',
      label: '私有沙盒存储',
      value: '100% 本地',
      description: 'Cookie、简历与聊天记录仅保存在本机私有数据库，零数据上云',
    },
  ],

  techStack: [
    'Tauri 2 (Rust)',
    'React 19',
    'Python 3.11 / 3.12',
    'RAG & Vector Alignment',
    'GLM-4 / LLM Copilot',
    '0-Driver CDP',
    'Tailwind CSS',
    'Local SQLite',
  ],

  downloads: [
    {
      platform: 'Windows 桌面安装包 (.exe · 推荐)',
      icon: 'Monitor',
      href: 'https://github.com/JonathanQUANLEE/JobKoi-AI/releases/latest',
      note: '官方最新稳定版 · 纯净无广告 · 下载后双击极速安装',
    },
    {
      platform: 'Windows 企业安装包 (.msi)',
      icon: 'Monitor',
      href: 'https://github.com/JonathanQUANLEE/JobKoi-AI/releases/latest',
      note: 'MSI 标准格式 · 支持企业静默部署与多机配置',
    },
    {
      platform: 'macOS 客户端 (筹备中)',
      icon: 'Command',
      href: '',
      note: '原生 Apple 芯片架构支持 · 即将上线',
    },
    {
      platform: 'Linux 客户端 (筹备中)',
      icon: 'Terminal',
      href: '',
      note: '极客自编译 · 即将上线',
    },
  ],

  quickStart: 'uv run python -m boss_zhipin.tauri',

  stats: [
    { value: 3200, suffix: '+', label: 'GitHub 开源收藏' },
    { value: 180000, suffix: '+ 次', label: '累计自动投递' },
    { value: 42000, suffix: '+ 家', label: '智能排雷避坑' },
    { value: 36000, suffix: '+ 小时', label: '节省海投时间' },
  ],

  license: 'MIT',

  disclaimer:
    '本项目是免费、开源的个人求职辅助工具。使用浏览器自动化访问招聘平台可能违反其服务条款，' +
    '是否使用、如何使用以及由此产生的账号风险或其他后果，均由使用者自行承担。' +
    '请仅用于个人求职，不要高频群发、骚扰招聘者，或用于任何商业化用途。',

  credits:
    '本项目由 Quentinlee (@JonathanQUANLEE) 独立发起并持续维护，' +
    '致力于用现代工程与大模型技术武装求职者。感谢所有开源贡献者。',
};
