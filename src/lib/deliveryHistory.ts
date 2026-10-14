/**
 * 历史投递数据持久化与早报计算引擎 (Local-First Delivery History & Morning Brief)
 * 源自用户项目中的原生产物 (Bosszhipin-job-bot/tauri-ui/src/lib/deliveryHistory.ts)
 */

export interface DayDeliveryRecord {
  date: string; // "YYYY-MM-DD"
  label: string; // "04-12"
  weekday: string; // "周三"
  bossSent: number;
  liepinSent: number;
  job51Sent: number;
  totalSent: number;
  bossReplies: number;
  liepinReplies: number;
  job51Replies: number;
  totalReplies: number;
}

export interface MorningBrief {
  todayDate: string;
  yesterdayDate: string;
  generatedAt: string;
  totalSent: number;
  repliedCount: number;
  unrepliedCount: number;
  replyRate: number; // 百分比，如 25.8
  platformBreakdown: {
    id: 'boss' | 'liepin' | 'job51';
    name: string;
    sent: number;
    replied: number;
    rate: number;
    color: string;
  }[];
  insight: string;
  actionAdvice: string;
  hasReplyData?: boolean;
}

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export function generateSeedRecords(): DayDeliveryRecord[] {
  const list: DayDeliveryRecord[] = [];
  const now = new Date();

  // 14 天平滑真实轨迹
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;

    // 固定种子数据（避免 SSR / 客户端水合随机值不一致）
    const daySeed = (i * 17 + 7) % 31;
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const bossSent = isWeekend ? 35 + (daySeed % 20) : 85 + (daySeed % 40);
    const liepinSent = isWeekend ? 15 + (daySeed % 12) : 40 + (daySeed % 25);
    const job51Sent = isWeekend ? 8 + (daySeed % 8) : 22 + (daySeed % 15);
    const totalSent = bossSent + liepinSent + job51Sent;

    const bossReplies = Math.round(bossSent * 0.26);
    const liepinReplies = Math.round(liepinSent * 0.22);
    const job51Replies = Math.round(job51Sent * 0.18);
    const totalReplies = bossReplies + liepinReplies + job51Replies;

    list.push({
      date: dateStr,
      label: `${m}-${day}`,
      weekday: WEEKDAYS[d.getDay()] ?? '周一',
      bossSent,
      liepinSent,
      job51Sent,
      totalSent,
      bossReplies,
      liepinReplies,
      job51Replies,
      totalReplies,
    });
  }
  return list;
}

export function buildDefaultMorningBrief(): MorningBrief {
  return {
    todayDate: '今日实时',
    yesterdayDate: '昨日战报',
    generatedAt: '09:00:00',
    totalSent: 168,
    repliedCount: 42,
    unrepliedCount: 126,
    replyRate: 25.0,
    platformBreakdown: [
      { id: 'boss', name: 'BOSS直聘', sent: 105, replied: 28, rate: 26.7, color: '#00bebd' },
      { id: 'liepin', name: '猎聘网', sent: 45, replied: 10, rate: 22.2, color: '#ff7033' },
      { id: 'job51', name: '前程无忧', sent: 18, replied: 4, rate: 22.2, color: '#ff5000' },
    ],
    insight: 'BOSS直聘在 10:00-11:30 回复率达到全天峰值（34%），互联网大厂 HR 普遍在线。',
    actionAdvice: '今日建议针对 AI 全栈与 Agent 岗适度加大猎聘猎头直推比例，拓宽中高端渠道。',
    hasReplyData: true,
  };
}
