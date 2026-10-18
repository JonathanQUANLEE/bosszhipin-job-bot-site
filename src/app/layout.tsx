import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

/**
 * 站点元数据。
 * 宣发页的 SEO 与分享卡片质量直接影响传播效果，这里认真配。
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    '应届生求职',
    '秋招',
    '春招',
    '简历投递',
    '自动投递',
    'BOSS直聘',
    '猎聘',
    '前程无忧',
    'AI求职助手',
    'ATS简历评分',
    '开源',
    '桌面应用',
    'job search automation',
  ],
  authors: [{ name: 'JonathanQUANLEE' }],
  creator: 'JonathanQUANLEE',
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  icons: {
    icon: '/bosszhipin-job-bot-site/logo.png',
    apple: '/bosszhipin-job-bot-site/logo.png',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-base text-paper antialiased" suppressHydrationWarning>
        {/*
          JS 不可用时的兜底：滚动进场动效依赖 IntersectionObserver，
          若脚本未执行，内容会停在 opacity:0 而整段消失。
          这里强制显示最终态，保证「特效全挂也能读」（docs/PERFORMANCE.md）。
        */}
        <noscript>
          <style>{'[data-inview]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
