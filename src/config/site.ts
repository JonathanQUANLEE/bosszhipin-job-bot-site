import type { SiteConfig } from '@/types/site';

/**
 * 站点全部内容常量。
 *
 * ⚠️ 硬规则：组件里禁止硬编码任何文案、链接、数字。
 * 所有内容改这里，全站同步生效。
 *
 * 内容来源：Bosszhipin-job-bot 的 README.md / CLAUDE.md（只读引用，未修改源文件）
 *
 * ⚠️ 注意：bot 本体仓库地址目前是 4evour/Bosszhipin-job-bot
 * （JonathanQUANLEE 名下没有同名仓库）。若日后迁移，只改这里一处即可。
 */
export const siteConfig: SiteConfig = {
  github: {
    repoUrl: 'https://github.com/4evour/Bosszhipin-job-bot',
    siteRepoUrl: 'https://github.com/JonathanQUANLEE/bosszhipin-job-bot-site',
    inspirationUrl: 'https://github.com/longsizhuo/BossZhiPin_Job_Search',
  },

  name: 'Bosszhipin Job Bot',

  tagline: '一个「故意做慢」的求职工具',

  description:
    '面向个人求职者的 BOSS 直聘岗位筛选与沟通工具。它按你写的本地关键词规则筛选岗位，' +
    '用你自己的固定招呼语打招呼 —— 不生成、不猜测、不替你说话。' +
    '0.2 版本起以桌面应用为主入口，规则、节奏、上限全部由你掌握。',

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
      title: '小批量自动',
      behavior: '命中后按随机等待节奏发送固定招呼语',
      scenario: '规则稳定后的小批量运行',
    },
  ],

  features: [
    {
      icon: 'Filter',
      title: '本地规则筛选',
      description:
        '按你写的关键词规则过滤岗位标题与描述。匹配顺序固定为 exclude → required → any，结果可解释、可预期。',
    },
    {
      icon: 'MessageSquareText',
      title: '固定招呼语',
      description:
        '打招呼的话由你自己写。系统不生成、不改写、不"优化"——你想说什么就说什么。',
    },
    {
      icon: 'KeyRound',
      title: '不需要任何 AI Key',
      description:
        '0.2 已主动移除 LLM 生成、简历解析、RAG 与向量库。装好就能跑，不配 API key，不传数据。',
    },
    {
      icon: 'AppWindow',
      title: '桌面应用主入口',
      description:
        'Tauri 桌面端是主入口，可视化配置模式、规则、招呼语与上限。CLI 保留给技术用户与自动化测试。',
    },
    {
      icon: 'ShieldCheck',
      title: '独立浏览器登录态',
      description:
        '使用独立的 Chrome profile，不碰你日常浏览器。首次扫码登录后 cookie 留在本地目录。',
    },
    {
      icon: 'ScrollText',
      title: '全程可审计',
      description:
        '扫描命中、已看过、已发送、跳过原因、招呼语审计分别落盘为独立日志，随时可查。',
    },
  ],

  safetyLimits: [
    {
      key: 'delay_min / delay_max',
      label: '随机等待',
      value: '10 – 60 秒',
      description: '每次发送后在区间内随机等待，不固定节奏、不连续轰炸',
    },
    {
      key: 'max_sent',
      label: '单次上限',
      value: '50 条',
      description: '一次运行最多发送多少条，跑完即停',
    },
    {
      key: 'daily_sent_limit',
      label: '每日上限',
      value: '80 条',
      description: '当天累计到达上限后不再发送',
    },
    {
      key: 'stop_on_captcha',
      label: '验证码熔断',
      value: 'true',
      description: '检测到验证码或安全验证立即停止，不硬闯',
    },
    {
      key: 'DRY_RUN',
      label: '空跑模式',
      value: '1 = 开启',
      description: '完整走一遍流程但不真实发送，先验证规则再上线',
    },
  ],

  techStack: [
    'nodriver',
    'Tauri',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Python 3.11+',
    'Chrome DevTools Protocol',
    'uv',
  ],

  downloads: [
    {
      platform: 'Windows',
      icon: 'Monitor',
      href: 'https://github.com/4evour/Bosszhipin-job-bot/releases',
      note: '.exe 安装包',
    },
    {
      platform: 'macOS',
      icon: 'Command',
      href: 'https://github.com/4evour/Bosszhipin-job-bot/releases',
      note: '.dmg',
    },
    {
      platform: 'Linux',
      icon: 'Terminal',
      href: 'https://github.com/4evour/Bosszhipin-job-bot/releases',
      note: 'AppImage / deb',
    },
  ],

  quickStart: 'uv run python -m boss_zhipin.tauri',

  stats: [
    { value: 3, label: '运行模式', suffix: ' 种' },
    { value: 80, label: '每日发送上限', suffix: ' 条' },
    { value: 0, label: '需要的 AI API Key' },
    { value: 5, label: '道安全闸门' },
  ],

  license: 'MIT',

  disclaimer:
    '本项目是免费、开源的个人求职辅助工具。使用浏览器自动化访问 BOSS 直聘可能违反其服务条款，' +
    '是否使用、如何使用以及由此产生的账号风险或其他后果，均由使用者自行承担。' +
    '请仅用于个人求职，不要高频群发、骚扰招聘者，或用于任何商业化用途。',

  credits:
    '本项目最初参考 longsizhuo/BossZhiPin_Job_Search 的浏览器自动化思路，' +
    '0.2 已收敛为自己的固定招呼语与本地规则工作流。感谢原参考项目与所有开源贡献者。',
};
