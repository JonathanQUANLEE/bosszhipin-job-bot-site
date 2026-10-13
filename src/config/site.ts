import type { SiteConfig } from '@/types/site';

/**
 * 站点全部内容常量。
 *
 * ⚠️ 硬规则：组件里禁止硬编码任何文案、链接、数字。
 * 所有内容改这里，全站同步生效。
 *
 * 内容来源（2026-10-13 重新摸底）：
 *   被宣发项目的 **实际代码**，而非 README —— 仓库文档停留在 2026-07，
 *   与当前产品形态已严重脱节。平台名称 / 标语 / 日限额取自
 *   `src/boss_zhipin/platforms/*.py` 的 `PlatformInfo`，逐字对齐。
 *
 * ⚠️ 项目尚未开源、尚未打包 EXE → `github.repoUrl` 留空，由组件渲染「即将开源」占位。
 */
export const siteConfig: SiteConfig = {
  url: 'https://jonathanquanlee.github.io/bosszhipin-job-bot-site',

  github: {
    // ⚠️ 留空 = 尚未开源。组件检测到空串会渲染「即将开源」而不是死链。
    repoUrl: '',
    siteRepoUrl: 'https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site',
    inspirationUrl: 'https://github.com/longsizhuo/BossZhiPin_Job_Search',
  },

  release: {
    published: false,
    badge: '即将开源',
    note:
      '项目正在做最后的打包与文档整理。开源仓库与 Windows 安装包发布后，' +
      '这里会第一时间放上下载入口。',
  },

  name: 'Bosszhipin Job Bot',

  tagline: '别一个人海投了',

  description:
    '一个帮你把简历投遍主流招聘平台的桌面助手。' +
    '你说一句话，它自己整理出要找什么岗位；三个平台同时开投，投了哪些、结果怎样，实时告诉你；' +
    '出手之前，还会先给简历打个分、告诉你哪里可以改。' +
    '投得不快不慢，遇到平台限制会主动停下 —— 它不会为了多投几份，把你账号搞坏。',

  modes: [
    {
      id: 'scan',
      name: 'scan',
      title: '只看不发',
      behavior: '只扫描并记录命中的岗位，不发送任何消息',
      scenario: '调规则、看岗位质量',
      recommended: true,
    },
    {
      id: 'review',
      name: 'review',
      title: '逐条审核',
      behavior: '命中后展示岗位详情和招呼语，你确认后才发送',
      scenario: '边审核边发送，降低误发',
    },
    {
      id: 'auto',
      name: 'auto',
      title: '自动投递',
      behavior: '命中后按你选定的节奏档位自动投递',
      scenario: '规则稳定后的批量投递',
    },
  ],

  features: [
    {
      icon: 'LayoutDashboard',
      title: '巡航工作台',
      description:
        '一句话开跑。输入「帮我找深圳的 AI 实习」，它自己整理出筛选条件给你确认，点开始就投。',
    },
    {
      icon: 'UserRoundSearch',
      title: '求职画像',
      description:
        '想投什么、在哪个城市、什么学历、不想投什么，说清楚就行。每条岗位为什么被选中、为什么被跳过，都能看到原因。',
    },
    {
      icon: 'FileText',
      title: '简历中心',
      description:
        '简历存在你自己的电脑里，不上传云端。PDF、Word、图片都支持，随时指定用哪一份投递。',
    },
    {
      icon: 'Bot',
      title: 'AI 副驾驶',
      description:
        '像跟人说话一样指挥它：换主题、调投递速度、跳到某个页面、问它这软件怎么用，说人话就行。',
    },
    {
      icon: 'Radar',
      title: '实时巡航',
      description:
        '投递过程实时可见。每投出一份、每跳过一条，屏幕上立刻有反馈，不用干等结果。',
    },
    {
      icon: 'BarChart3',
      title: '数据统计与早报',
      description:
        '今天投了多少、哪个平台投得多、集中在哪些城市，自动整理成一份战报，进度一眼看清。',
    },
  ],

  comparisons: [
    {
      other: '在三个招聘网站之间来回切，一个个手动打招呼',
      ours: '一句话说清需求，三个平台同时开投',
      note: 'BOSS / 猎聘 / 前程无忧，一次配置',
    },
    {
      other: '简历投出去石沉大海，不知道问题出在哪',
      ours: '先给简历打个分，再告诉你哪里该改',
      note: '机器怎么读你的简历，提前知道',
    },
    {
      other: '投了多少、有没有回音，全靠自己记',
      ours: '实时巡航 + 每日战报，进度一眼看清',
      note: '按平台、按城市自动汇总',
    },
    {
      other: '听说自动投递容易被封号，不敢用',
      ours: '15–45 秒拟人化节奏 + 平台限额熔断',
      note: '命中平台提示自动停，不硬闯',
    },
  ],

  faqs: [
    {
      q: '会被招聘平台封号吗？',
      a: '任何自动化工具都有账号风险，我们不会说「绝对安全」。能做的都做了：每份简历之间随机等 15–45 秒、投递速度分三档可选、跟着平台自己的每日上限走、平台提示到量了就停、遇到验证码自动暂停。但风险没法归零，建议控制使用频率，先用「只看不发」模式确认筛选结果。',
    },
    {
      q: '需要准备什么？',
      a: '一台装有 Chrome 的电脑（目前以 Windows 为主）。首次使用需要在工具内置的独立浏览器里扫码或短信登录各平台，登录凭证会自动持久化保存，之后通常不需要重复登录。',
    },
    {
      q: '我的简历和个人信息会被上传吗？',
      a: '不会。简历存放在本地私密文件夹，PDF / Word / 图片都由你自己管理。投递记录、跳过原因、招呼语审计也全部落在本地日志文件里，可以随时查看和删除。',
    },
    {
      q: '必须自己配 AI 的 API Key 吗？',
      a: '不必须。筛选岗位、自动投递、实时巡航、数据统计这些核心功能，都不需要大模型。AI 副驾驶是额外的加分项 —— 想用可以接你喜欢的模型（也支持免费方案），不想用完全跳过，软件照样跑。',
    },
    {
      q: '现在能下载吗？',
      a: '还不能。项目正在做最后的打包与文档整理，开源仓库和 Windows 安装包发布后会第一时间在这里放上下载入口。',
    },
    {
      q: '收费吗？',
      a: '完全免费，MIT 开源。没有付费版、没有功能限制、没有数据收集。',
    },
  ],

  platforms: [
    {
      id: 'boss',
      name: 'BOSS 直聘',
      short: 'BOSS',
      action: '点「立即沟通」建立会话',
      note: '互联网与高薪岗主力 · 每日限额 150',
    },
    {
      id: 'liepin',
      name: '猎聘',
      short: '猎聘',
      action: '「聊一聊」并发送你的固定招呼语',
      note: '中高端与海归名企岗 · 每日限额 100',
    },
    {
      id: 'job51',
      name: '前程无忧',
      short: '51job',
      action: '直接投递简历',
      note: '传统名企与外企制造 · 每日限额 40',
    },
    {
      id: 'zhaopin',
      name: '智联招聘',
      short: '智联',
      action: '国企央企与校园秋招',
      note: '平台适配开发中 · 即将开放接入',
      comingSoon: true,
    },
  ],

  paceTiers: [
    {
      id: 'sprint',
      name: '效率档',
      delay: '15 – 30 秒',
      scenario: '短时冲刺，想尽快把简历铺出去',
    },
    {
      id: 'standard',
      name: '标准档',
      delay: '20 – 40 秒',
      scenario: '日常投递，速度与安全兼顾',
      recommended: true,
    },
    {
      id: 'steady',
      name: '稳健档',
      delay: '30 – 45 秒',
      scenario: '长期挂机，把防封放在第一位',
    },
  ],

  safetyLimits: [
    {
      key: 'delay_min / delay_max',
      label: '不快不慢的投递速度',
      value: '每份间隔 15–45 秒',
      description: '每次投完随机等一会儿再投下一份，不连着猛发',
    },
    {
      key: 'daily_limit',
      label: '跟着平台规则走',
      value: '上限 150 / 100 / 40',
      description: '平台说今天到量了，它就停，不硬凑数量',
    },
    {
      key: 'stop_on_captcha',
      label: '遇到验证码就停',
      value: '自动暂停',
      description: '一发现需要安全验证，立刻停下等你处理',
    },
    {
      key: 'DRY_RUN',
      label: '先试跑，不真投',
      value: '可开启',
      description: '完整走一遍流程但不真的投出去，先看看筛得对不对',
    },
    {
      key: 'logs/*.jsonl',
      label: '每一步都留痕',
      value: '本地记录',
      description: '投了谁、跳过了谁、为什么，全都存在你自己电脑里',
    },
  ],

  techStack: [
    'Tauri',
    'React',
    'TypeScript',
    'Rust',
    'Python',
    'nodriver',
    'Tailwind CSS',
    'Chrome DevTools Protocol',
  ],

  downloads: [
    {
      platform: 'Windows',
      icon: 'Monitor',
      href: '',
      note: '安装包制作中',
    },
    {
      platform: 'macOS',
      icon: 'Command',
      href: '',
      note: '规划中',
    },
    {
      platform: 'Linux',
      icon: 'Terminal',
      href: '',
      note: '规划中',
    },
  ],

  quickStart: 'uv run python -m boss_zhipin.tauri',

  stats: [
    { value: 3, suffix: ' 大', label: '主流招聘平台' },
    { value: 6, suffix: ' 大', label: '核心功能模块' },
    { value: 15, suffix: '–45 秒', label: '拟人化节奏区间' },
    { value: 0, suffix: ' 次', label: '手动打招呼' },
  ],

  license: 'MIT',

  disclaimer:
    '本项目是免费、开源的个人求职辅助工具。使用浏览器自动化访问招聘平台可能违反其服务条款，' +
    '是否使用、如何使用以及由此产生的账号风险或其他后果，均由使用者自行承担。' +
    '请仅用于个人求职，不要高频群发、骚扰招聘者，或用于任何商业化用途。',

  credits:
    '本项目最初参考 longsizhuo/BossZhiPin_Job_Search 的浏览器自动化思路，' +
    '此后已收敛为自己的多平台投递与 AI 副驾驶工作流。感谢原参考项目与所有开源贡献者。',
};
