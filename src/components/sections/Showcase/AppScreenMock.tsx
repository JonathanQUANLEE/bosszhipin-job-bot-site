import {
  LayoutDashboard,
  UserRoundSearch,
  FileText,
  Bot,
  Radar,
  BarChart3,
  Sparkles,
  Check,
  Minus,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const NAV_ICONS = [
  LayoutDashboard,
  UserRoundSearch,
  FileText,
  Bot,
  Radar,
  BarChart3,
];

/** 巡航日志的示例条目（模拟真实运行时的事件流） */
const FEED = [
  { ok: true, title: '全栈开发实习生', company: '腾讯', note: '已投递' },
  { ok: true, title: 'AI Agent 开发实习', company: '字节跳动', note: '已投递' },
  { ok: true, title: '算法工程师（实习）', company: '美团', note: '已投递' },
  { ok: false, title: '销售顾问', company: '某公司', note: '已跳过 · 标题不含关键词' },
  { ok: true, title: '后端开发实习生', company: '蚂蚁集团', note: '已投递' },
  { ok: true, title: '大模型应用开发', company: '百度', note: '已投递' },
  { ok: false, title: '客服专员', company: '某公司', note: '已跳过 · 命中排除词' },
  { ok: true, title: '推荐算法实习生', company: '快手', note: '已投递' },
  { ok: true, title: 'AI 平台工程师', company: '商汤科技', note: '已投递' },
];

/**
 * 应用界面模拟图 —— 用于 Showcase 区块里「电脑屏幕」中的内容。
 *
 * 全部用 DOM + Tailwind 渲染（不是图片），因此在任何分辨率下都清晰，
 * 且体积远小于截图。模块名与配色对齐真实桌面端。
 *
 * ⚠️ 这是**风格化示意**，不是真实截图。用户提供真机截图后可替换为 <img>。
 */
export function AppScreenMock() {
  return (
    <div className="flex h-full w-full flex-col bg-base text-left">
      {/* 顶栏 */}
      <div className="flex shrink-0 items-center justify-between border-b border-line px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-accent text-[8px] font-bold text-base">
            B
          </span>
          <span className="font-display text-[11px] text-paper sm:text-xs">
            {siteConfig.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[9px] text-paper-muted sm:inline">
            中文
          </span>
          <span className="flex items-center gap-1 rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            运行中
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* 侧边栏 */}
        <div className="hidden w-28 shrink-0 flex-col gap-1 border-r border-line p-2 sm:flex sm:w-36">
          {siteConfig.features.map((f, i) => {
            const NavIcon = NAV_ICONS[i] ?? LayoutDashboard;
            const active = i === 0;
            return (
              <div
                key={f.title}
                className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[10px] ${
                  active ? 'bg-accent/12 text-accent' : 'text-paper-muted'
                }`}
              >
                <NavIcon size={11} aria-hidden />
                <span className="truncate">{f.title}</span>
              </div>
            );
          })}
        </div>

        {/* 主区 */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-2 sm:gap-3 sm:p-3">
          {/* 一句话开跑 */}
          <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-2.5 py-2">
            <Sparkles size={12} className="shrink-0 text-accent" aria-hidden />
            <span className="truncate text-[10px] text-paper-dim sm:text-[11px]">
              帮我找深圳的 AI Agent 实习，最多 30 个
            </span>
            <span className="ml-auto hidden shrink-0 rounded bg-accent px-1.5 py-0.5 font-mono text-[9px] text-base sm:inline">
              开跑
            </span>
          </div>

          {/* 平台进度 */}
          <div className="grid grid-cols-3 gap-2">
            {siteConfig.platforms.slice(0, 3).map((p, i) => {
              const done = i === 0 ? 100 : i === 1 ? 72 : 38;
              // 从平台配额或备注里取出日限额数字（如「100 次 / 天」→ 100）
              const limitMatch = (p.dailyLimit || p.note || '').match(/\d+/);
              const limit = limitMatch?.[0] ? Number(limitMatch[0]) : 100;
              const sent = Math.round(limit * (done / 100));
              return (
                <div key={p.id} className="rounded-lg border border-line bg-surface p-2">
                  <p className="truncate font-mono text-[9px] text-paper-muted">{p.short || p.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-paper sm:text-xs">
                    {sent}
                    <span className="text-paper-muted">/{limit}</span>
                  </p>
                  <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${done}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 实时巡航 */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-line bg-surface">
            <p className="label-mono shrink-0 border-b border-line px-2.5 py-1.5 text-[9px] text-paper-muted">
              实时巡航
            </p>
            <div className="flex flex-1 flex-col gap-1.5 overflow-hidden p-2 sm:gap-2">
              {FEED.map((item) => (
                <div key={item.title} className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                  <span
                    className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full ${
                      item.ok ? 'bg-accent/20 text-accent' : 'bg-line text-paper-muted'
                    }`}
                  >
                    {item.ok ? <Check size={8} /> : <Minus size={8} />}
                  </span>
                  <span className="truncate text-paper-dim">{item.title}</span>
                  <span className="hidden shrink-0 text-paper-muted sm:inline">
                    @{item.company}
                  </span>
                  <span
                    className={`ml-auto shrink-0 font-mono text-[9px] ${
                      item.ok ? 'text-accent' : 'text-paper-muted'
                    }`}
                  >
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center justify-between border-t border-line px-2.5 py-1.5 font-mono text-[9px] text-paper-muted">
              <span>今日已投 237 份</span>
              <span className="text-accent">无中断 · 无验证码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
