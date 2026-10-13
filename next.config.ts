import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * Next.js 配置
 *
 * 性能取向：
 * - reactStrictMode 开启，提前暴露副作用未清理的问题（特效组件的 rAF / 监听器）
 * - poweredByHeader 关闭，减少无用响应头
 * - 图片默认 AVIF + WebP，截图素材体积直接影响 LCP
 *
 * @see docs/PERFORMANCE.md
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  distDir: 'dist',

  // GitHub Pages 项目页部署在 /<repo>/ 子路径下，必须设 basePath，否则资源 404。
  // 默认值 = 线上部署地址；本地要预览根路径时可临时用 BASE_PATH= 覆盖。
  basePath: process.env.BASE_PATH ?? '/bosszhipin-job-bot-site',

  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    // 让包导入更可控，避免 barrel file 拖入整个图标库
    optimizePackageImports: ['lucide-react'],
  },
};

export default withBundleAnalyzer(nextConfig);
