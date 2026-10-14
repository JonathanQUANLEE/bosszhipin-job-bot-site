'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  ShieldBan,
  Radio,
  BadgeDollarSign,
  EyeOff,
  Share2,
} from 'lucide-react';

export interface GlassSettingItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  color: string;
  glowColor: string;
  badgeClass: string;
  description: string;
  details: string;
}

const SETTINGS_ITEMS: GlassSettingItem[] = [
  {
    id: 'delay',
    icon: <Clock size={24} className="text-white drop-shadow" />,
    title: '拟人随机延时',
    badge: '防风控核心',
    color: 'from-purple-600 via-violet-500 to-indigo-600',
    glowColor: 'shadow-[0_0_25px_rgba(168,85,247,0.4)]',
    badgeClass: 'border-purple-500/40 bg-purple-500/20 text-purple-300',
    description: '模拟人类真实点击与滑动，打招呼间隔在 6s ~ 14s 之间随机浮动。',
    details: '平台风控通过检测请求的固定毫秒周期识别脚本。动态微扰延时彻底打破规律，实现 0 验证码。',
  },
  {
    id: 'blacklist',
    icon: <ShieldBan size={24} className="text-white drop-shadow" />,
    title: '智能企业黑名单',
    badge: '精准避坑',
    color: 'from-rose-600 via-red-500 to-orange-500',
    glowColor: 'shadow-[0_0_25px_rgba(244,63,94,0.4)]',
    badgeClass: 'border-rose-500/40 bg-rose-500/20 text-rose-300',
    description: '自动扫描并屏蔽培训贷机构、人力外包派遣及用户自定义的黑名单公司。',
    details: '内置全国 3,000+ 家避雷企业数据库，支持按关键字（如“外包”、“驻场”、“实训”）模糊初筛。',
  },
  {
    id: 'active',
    icon: <Radio size={24} className="text-white drop-shadow" />,
    title: '活跃 HR 优先直达',
    badge: '回复率翻倍',
    color: 'from-emerald-600 via-teal-500 to-cyan-500',
    glowColor: 'shadow-[0_0_25px_rgba(16,185,129,0.4)]',
    badgeClass: 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300',
    description: '优先向近 2 小时内在线或当天活跃的招聘者打招呼，拒绝已沉底死职位。',
    details: '实时提取招聘者最后活跃时间戳，按活跃权重排序，确保你的招呼第一时间呈现在 HR 手机顶层。',
  },
  {
    id: 'salary',
    icon: <BadgeDollarSign size={24} className="text-white drop-shadow" />,
    title: '期望薪资硬指标',
    badge: '岗位对口',
    color: 'from-amber-600 via-yellow-500 to-orange-500',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.4)]',
    badgeClass: 'border-amber-500/40 bg-amber-500/20 text-amber-300',
    description: '严格按期望薪资下限、意向城市与地铁通勤距离自动筛选有效岗位。',
    details: '支持区间解析（如“15K-25K”），低于最低底线或包含“兼职”字样的岗位全部一键跳过。',
  },
  {
    id: 'headless',
    icon: <EyeOff size={24} className="text-white drop-shadow" />,
    title: 'Headless 隐身模式',
    badge: '静默运行',
    color: 'from-blue-600 via-cyan-500 to-sky-500',
    glowColor: 'shadow-[0_0_25px_rgba(59,130,246,0.4)]',
    badgeClass: 'border-blue-500/40 bg-blue-500/20 text-blue-300',
    description: '无需弹出浏览器窗口，在后台极致静默巡航，极低 CPU 与内存占用。',
    details: '采用底层无驱动 CDP 注入协议，没有 Chrome WebDriver 标志指纹，彻底伪装为原生操作系统进程。',
  },
  {
    id: 'sync',
    icon: <Share2 size={24} className="text-white drop-shadow" />,
    title: '多平台矩阵协同',
    badge: '生态互联',
    color: 'from-fuchsia-600 via-pink-500 to-rose-500',
    glowColor: 'shadow-[0_0_25px_rgba(236,72,153,0.4)]',
    badgeClass: 'border-pink-500/40 bg-pink-500/20 text-pink-300',
    description: '一套意图配置在 BOSS直聘、智联、猎聘多路并行，共享统一投递黑名单。',
    details: '跨平台智能去重：如果在 BOSS 已投递过该企业的某岗位，其他平台将自动标记同步，避免重复沟通。',
  },
];

/**
 * GlassIcons —— 软件参数设置百宝箱（借鉴 grail-app.com 宝石高饱和质感）
 *
 * 1. 拟真立体宝石图标底座（紫晶、红宝、绿翡、金珀、蓝宝石、粉晶）；
 * 2. 彻底告别灰暗单调，点击即刻点亮对应策略详解；
 * 3. 展现软件深厚精细的底层防风控工程。
 */
export function GlassIcons() {
  const [activeItem, setActiveItem] = useState<GlassSettingItem>(SETTINGS_ITEMS[0]!);

  return (
    <div className="w-full select-none">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        {SETTINGS_ITEMS.map((item) => {
          const isActive = activeItem.id === item.id;

          return (
            <motion.div
              key={item.id}
              onClick={() => setActiveItem(item)}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all duration-300 ${
                isActive
                  ? 'border-white/40 bg-gradient-to-b from-white/20 via-[#1e1933] to-[#141024] shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                  : 'border-white/10 bg-[#141122]/80 hover:border-white/25 hover:bg-[#1a162d]'
              } backdrop-blur-xl`}
            >
              {/* 拟真立体高光宝石底座 */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} border border-white/30 text-white ${item.glowColor} transition-transform duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              <h4 className="mt-3.5 text-xs font-bold text-white tracking-wide truncate w-full">
                {item.title}
              </h4>

              <span className={`mt-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold ${item.badgeClass}`}>
                {item.badge}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* 选中参数的深度规则解密卡片 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-2xl border border-white/15 bg-gradient-to-b from-[#1c1830] via-[#141124] to-[#0d0a17] p-6 shadow-2xl backdrop-blur-xl text-left"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${activeItem.color} text-white border border-white/30 ${activeItem.glowColor}`}
              >
                {activeItem.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-white/70">{activeItem.description}</p>
              </div>
            </div>

            <span className={`rounded-full border px-3 py-1 font-mono text-xs font-bold ${activeItem.badgeClass}`}>
              策略已激活 · 守护中
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/50 p-4">
            <h5 className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
              底层运行原理与防风控机制：
            </h5>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              {activeItem.details}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
