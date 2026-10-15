'use client';

import { useEffect, useState } from 'react';
import { downloadConfig } from '@/config/downloads';

/**
 * 最新版安装包直链。
 *
 * 页面加载后向 GitHub API 请求一次最新 Release，
 * 从资产列表里解析 .exe / .msi 的 browser_download_url。
 * 点击该链接时浏览器直接开始下载（GitHub 响应自带 attachment 头），不跳转页面。
 *
 * 容错策略：
 * - API 失败（限流 60 次/小时、离线、字段缺失）→ 使用 config 里的 v0.5.0 静态直链，保证按钮永远可点
 * - 全站多个组件共享同一次请求（模块级缓存），不会重复打 API
 */

export interface ReleaseLinks {
  /** Windows 安装包（.exe）直链 */
  exe: string;
  /** Windows 企业安装包（.msi）直链 */
  msi: string;
}

interface GithubAsset {
  name: string;
  browser_download_url: string;
}

interface GithubRelease {
  assets?: GithubAsset[];
}

/** 模块级缓存：所有组件共享，一次会话只请求一次 */
let cachedLinks: ReleaseLinks | null = null;
let inflight: Promise<ReleaseLinks> | null = null;

function pickAssetUrl(assets: GithubAsset[] | undefined, extension: '.exe' | '.msi'): string | undefined {
  if (!assets?.length) return undefined;
  return assets.find((asset) => asset.name.toLowerCase().endsWith(extension))?.browser_download_url;
}

async function resolveLinks(): Promise<ReleaseLinks> {
  try {
    const response = await fetch(downloadConfig.apiLatestUrl, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) throw new Error(`GitHub API ${response.status}`);

    const release = (await response.json()) as GithubRelease;
    const exe = pickAssetUrl(release.assets, '.exe');
    const msi = pickAssetUrl(release.assets, '.msi');
    if (!exe || !msi) throw new Error('Release assets missing exe/msi');

    return { exe, msi };
  } catch (error) {
    // 静默降级：任何异常都用静态兜底直链，用户无感知
    console.warn('[download] fallback to static links:', error);
    return { ...downloadConfig.fallback };
  }
}

function getLinks(): Promise<ReleaseLinks> {
  if (cachedLinks) return Promise.resolve(cachedLinks);
  if (!inflight) {
    inflight = resolveLinks().then((links) => {
      cachedLinks = links;
      return links;
    });
  }
  return inflight;
}

export function useLatestRelease(): ReleaseLinks {
  // 初始值用兜底直链（SSR 与客户端一致，避免 hydration 不匹配），
  // API 返回后无缝替换为最新版直链
  const [links, setLinks] = useState<ReleaseLinks>({ ...downloadConfig.fallback });

  useEffect(() => {
    let alive = true;
    getLinks().then((resolved) => {
      if (alive) setLinks(resolved);
    });
    return () => {
      alive = false;
    };
  }, []);

  return links;
}
