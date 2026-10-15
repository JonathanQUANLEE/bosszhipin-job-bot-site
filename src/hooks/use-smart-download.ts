'use client';

import { useCallback } from 'react';
import { useLatestRelease } from './use-latest-release';

/**
 * 智能下载：点击时自动探测哪条下载通道可达，选第一条通的下载。
 *
 * 背景：国内加速镜像为第三方公益服务，随时可能失效（不同地区可达性也不同，
 * 我方网络测试通过 ≠ 用户网络通过）。因此不能写死任何一条通道，
 * 必须在用户点击的瞬间实时探测、动态择路。
 *
 * 探测原理：no-cors fetch 只要网络层可达即 resolve（不关心状态码/跨域），
 * reject 或超时即视为不可达。依次尝试镜像，全部失败则回退官方直链。
 *
 * 返回的 href 始终是官方直链（保证 SSR/禁 JS 时按钮依然有效），
 * 仅当 JS 可用且探测成功时才由 onClick 拦截跳转加速通道。
 */

/** 单条通道探测超时（毫秒）——超过即视为不通，避免用户干等 */
const PROBE_TIMEOUT_MS = 3500;

async function isReachable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    await fetch(url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal });
    clearTimeout(timer);
    return true;
  } catch {
    return false;
  }
}

/** 依次探测候选通道，返回第一条可达的 URL；全不可达返回 null */
async function pickReachable(candidates: string[]): Promise<string | null> {
  for (const candidate of candidates) {
    if (await isReachable(candidate)) return candidate;
  }
  return null;
}

type AssetKind = 'exe' | 'msi';

export function useSmartDownload(): (kind: AssetKind) => Promise<void> {
  const { exe, msi, exeFast, msiFast } = useLatestRelease();

  return useCallback(
    async (kind: AssetKind) => {
      // 候选顺序：官方直链放最后兜底；加速镜像在前
      const official = kind === 'exe' ? exe : msi;
      const accelerated = kind === 'exe' ? exeFast : msiFast;
      const candidates = [accelerated, official];

      const picked = await pickReachable(candidates);
      // 触发浏览器下载（响应自带 attachment 头），当前页不跳走
      window.location.href = picked ?? official;
    },
    [exe, msi, exeFast, msiFast],
  );
}
