/**
 * 下载直链配置（单一数据来源，对齐 CODE_STYLE.md R5）。
 *
 * 为什么不直接写死 `releases/latest/download/<文件名>`：
 * 安装包文件名带版本号（如 JobKoi-AI._0.5.0_x64-setup.exe），
 * 发新版本后文件名变化，写死的 latest 直链会 404。
 * 所以运行时通过 GitHub API 动态解析最新资产直链，失败时退回 fallback。
 */
export const downloadConfig = {
  /** GitHub API：最新 Release 元数据（支持浏览器跨域请求） */
  apiLatestUrl: 'https://api.github.com/repos/JonathanQUANLEE/JobKoi-AI/releases/latest',

  /** Releases 页面地址（仅作为"查看所有版本"的兜底入口，不用于下载按钮） */
  releasesPageUrl: 'https://github.com/JonathanQUANLEE/JobKoi-AI/releases/latest',

  /**
   * 静态兜底直链（v0.5.0）。
   * 触发条件：GitHub API 限流 / 网络异常 / 资产字段缺失。
   * 发新版本时更新这里即可（正常情况下动态解析会自动跟上新版本）。
   */
  fallback: {
    exe: 'https://github.com/JonathanQUANLEE/JobKoi-AI/releases/download/v0.5.0/JobKoi-AI._0.5.0_x64-setup.exe',
    msi: 'https://github.com/JonathanQUANLEE/JobKoi-AI/releases/download/v0.5.0/JobKoi-AI._0.5.0_x64_zh-CN.msi',
  },
} as const;
