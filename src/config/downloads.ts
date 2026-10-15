/**
 * 下载直链配置（单一数据来源，对齐 CODE_STYLE.md R5）。
 *
 * 为什么不直接写死 `releases/latest/download/<文件名>`：
 * 安装包文件名带版本号（如 JobKoi-AI._0.5.0_x64-setup.exe），
 * 发新版本后文件名变化，写死的 latest 直链会 404。
 * 所以运行时通过 GitHub API 动态解析最新资产直链，失败时退回 fallback。
 *
 * 国内加速：GitHub Releases 官方 CDN 在中国大陆实测仅 ~47KB/s，
 * 通过镜像前缀代理后可达 ~280KB/s（2026-10-15 实测 ghfast.top）。
 * 加速镜像均为第三方公益服务，可能失效；失效时：
 *   1. 更换 accelerators 里的前缀（备选见注释）
 *   2. 或直接把 accelerationsEnabled 改为 false 回退官方直链
 */
export const downloadConfig = {
  /** GitHub API：最新 Release 元数据（支持浏览器跨域请求） */
  apiLatestUrl: 'https://api.github.com/repos/JonathanQUANLEE/JobKoi-AI/releases/latest',

  /** Releases 页面地址（仅作为"查看所有版本"的兜底入口，不用于下载按钮） */
  releasesPageUrl: 'https://github.com/JonathanQUANLEE/JobKoi-AI/releases/latest',

  /**
   * 国内加速镜像前缀（按优先级排序，拼接在官方直链前）。
   * 2026-10-15 实测速度：
   *   ghfast.top   ≈ 279 KB/s ✅ 最快
   *   gh-proxy.com ≈ 100 KB/s ✅ 备用
   * 已失效（当时测不通）：gh-proxy.net / github.moeyy.xyz / ghproxy.net
   */
  accelerators: ['https://ghfast.top/', 'https://gh-proxy.com/'] as const,

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

/** 官方直链 → 国内加速直链（拼接首选镜像前缀） */
export function accelerate(url: string): string {
  return `${downloadConfig.accelerators[0]}${url}`;
}
