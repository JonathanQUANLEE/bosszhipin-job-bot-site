import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

/**
 * 站点元数据。
 * 宣发页的 SEO 与分享卡片质量直接影响传播效果，这里认真配。
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.github.siteRepoUrl),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'BOSS直聘',
    '求职工具',
    '岗位筛选',
    '自动打招呼',
    '开源',
    '桌面应用',
    'nodriver',
    'job search automation',
  ],
  authors: [{ name: 'JonathanQUANLEE' }],
  creator: 'JonathanQUANLEE',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.github.siteRepoUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
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
    <html lang="zh-CN">
      <body className="min-h-screen bg-base text-paper antialiased">{children}</body>
    </html>
  );
}
