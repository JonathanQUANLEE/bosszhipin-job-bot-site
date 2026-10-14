'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronDown, Terminal, CheckCircle2, Lock, Cpu, EyeOff, Clock, ShieldAlert } from 'lucide-react';

export interface CodeSlotGate {
  num: string;
  title: string;
  subtitle: string;
  detail: string;
  deepDive: string;
  codeSnippet: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const GATES: CodeSlotGate[] = [
  {
    num: '01',
    title: '指纹无痕伪装',
    subtitle: 'Canvas / WebGL 微扰注入',
    detail: '底层去除 Chrome WebDriver 标志与自动化特征，完美混入真实用户浏览器池。',
    deepDive: '通过 Python nodriver 底层原生 CDP 管道通信，从内核抹除 window.navigator.webdriver 属性，动态注入真实 Canvas 2D 噪点与 AudioContext 声纹微扰，抵御高阶风控探针检测。',
    codeSnippet: `# 0-Driver 底层无痕特征抹除
async def patch_browser_fingerprint(tab):
    await tab.evaluate("""
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        window.chrome = { runtime: {} };
    """)`,
    tag: '内核穿透',
    icon: EyeOff,
  },
  {
    num: '02',
    title: '拟人化动力学',
    subtitle: '高阶贝塞尔平滑滑动与微颤',
    detail: '模拟真实人手滑动与不规则打字停顿，杜绝机械式瞬发请求被反爬算法秒抓。',
    deepDive: '所有光标移动均通过三次贝塞尔曲线 (Cubic Bézier) 模拟人类手腕生理抖动与加速减速惯性，键入招呼语时随机引入 60~240ms 字符间隔与错字撤销仿真。',
    codeSnippet: `# 拟人打字与鼠标动力学
async def human_type(element, text: str):
    for char in text:
        await element.send_keys(char)
        await asyncio.sleep(random.uniform(0.06, 0.22)) # 真实键入微颤`,
    tag: '动力学生理仿真',
    icon: Cpu,
  },
  {
    num: '03',
    title: '节律频控熔断',
    subtitle: '人类生理时钟定时作息',
    detail: '工作日 9:30~18:30 智能巡航，深夜自动休眠，单日达限额立即安全收工。',
    deepDive: '严格模拟白领求职作息。午休 12:00~13:30 降频巡检，18:30 后自动挂起待机，杜绝凌晨违背常理的高频投递行为，单日达设定阈值（默认 80 家）立即熔断保护。',
    codeSnippet: `# 节律守护时钟
if not (9 <= now.hour < 19):
    logger.info("当前处于非工作时段，巡航守护器已静默休眠")
    return CruiseStatus.SLEEPING`,
    tag: '生理时钟',
    icon: Clock,
  },
  {
    num: '04',
    title: '岗位语义严选',
    subtitle: '双向 JD 关键词与薪资门槛',
    detail: '不仅看岗位名称，更深挖技能关键词与薪资门槛，不让杂质岗位浪费宝贵沟通配额。',
    deepDive: '采用本地语义分词引擎，自动提取职位描述中的核心技能栈、工作年限、学历底线与最低薪资。凡命中黑名单公司或未达预期门槛的一律跳过，确保每日 100 次打招呼发发命中高价值岗位。',
    codeSnippet: `# 岗位语义对齐初筛
def evaluate_job(job_info, criteria) -> bool:
    if job_info.company in BLACKLIST: return False
    if job_info.min_salary < criteria.salary_bottom: return False
    return any(skill in job_info.desc for skill in criteria.skills)`,
    tag: '语义对齐',
    icon: CheckCircle2,
  },
  {
    num: '05',
    title: '本地私有沙盒',
    subtitle: 'SQLite 本地加密密钥环',
    detail: '简历与聊天日志 100% 留存在你的电脑本地，无需担心个人求职隐私泄露上云。',
    deepDive: '架构坚持 Local-First 本地优先哲学。你的个人简历、平台 Session Cookie、投递历史全部存储在客户端 `%APPDATA%/boss-bot/storage.db` 本地沙盒中，零第三方中转服务器。',
    codeSnippet: `# 本地数据隔离
conn = sqlite3.connect("local_vault.db")
conn.execute("PRAGMA foreign_keys = ON;") # 100% 本机持久化，零云端上报`,
    tag: '隐私主权',
    icon: Lock,
  },
  {
    num: '06',
    title: '风控主动熔断',
    subtitle: '异常毫秒响应主动挂起',
    detail: '一旦检测到平台提示异常或风控验证，立即主动休眠待机，守护账号绝对安全。',
    deepDive: '集成实时 DOM 状态检测。一旦捕获到平台滑块验证码、短信二次验证或“打招呼过于频繁”的弹窗，程序立即在 50ms 内终止后续请求，发送系统桌面级通知并暂停巡航。',
    codeSnippet: `# 风控秒级主动熔断
if await tab.find("div.captcha-modal", timeout=0.1):
    notify_desktop("⚠️ 检测到平台安全验证，已主动暂停并发保护账号")
    return CircuitBreaker.TRIPPED`,
    tag: '秒级熔断',
    icon: ShieldAlert,
  },
];

export function CodeSlots() {
  const [expandedId, setExpandedId] = useState<string | null>('01');

  const toggleGate = (num: string) => {
    setExpandedId((prev) => (prev === num ? null : num));
  };

  return (
    <div className="w-full select-none">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GATES.map((gate) => {
          const isExpanded = expandedId === gate.num;
          const Icon = gate.icon;

          return (
            <motion.div
              key={gate.num}
              layout
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'border-accent bg-gradient-to-b from-[#181628] to-[#100e1b] shadow-[0_10px_35px_rgb(var(--color-accent-rgb)/0.25)] ring-1 ring-accent/30'
                  : 'border-white/10 bg-[#12111c]/80 hover:border-white/20 hover:bg-[#151322]'
              } backdrop-blur-xl flex flex-col justify-between`}
            >
              <div className="p-5">
                {/* 头部：关卡编号与折叠触发器 */}
                <div
                  onClick={() => toggleGate(gate.num)}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 font-mono text-sm font-bold text-accent border border-accent/30 shadow-inner group-hover:scale-105 transition-transform">
                      {gate.num}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                        <Icon className="size-3.5 text-accent shrink-0" />
                        <span>{gate.title}</span>
                      </h4>
                      <p className="font-mono text-[11px] text-accent/80 mt-0.5">
                        {gate.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-semibold border border-emerald-500/30">
                      {gate.tag}
                    </span>
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center border border-white/10 text-paper-dim transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 bg-accent/20 text-accent' : 'rotate-0 bg-white/5'
                      }`}
                    >
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                  {gate.detail}
                </p>

                {/* 折叠深度解密面板（物理平滑展开） */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.2, delay: 0.08 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.1 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                        <div className="rounded-xl bg-black/40 p-3 border border-white/5">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                            DETAILED DEFENSE MECHANISM
                          </span>
                          <p className="text-[11px] text-paper leading-relaxed">
                            {gate.deepDive}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/70 p-3 font-mono text-[10px] text-emerald-400 overflow-x-auto">
                          <div className="flex items-center gap-1.5 mb-1.5 text-white/50 text-[9px] border-b border-white/10 pb-1">
                            <Terminal size={10} className="text-accent" />
                            <span>PYTHON ENGINE EXECUTION</span>
                          </div>
                          <pre className="leading-relaxed">
                            <code>{gate.codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 底部折叠切换条 */}
              <div
                onClick={() => toggleGate(gate.num)}
                className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-5 py-2.5 text-[10px] font-mono text-paper-muted cursor-pointer hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className={isExpanded ? 'text-emerald-400' : 'text-paper-muted'} />
                  <span>GATE_{gate.num}_ARMED · 100% 账号存活</span>
                </div>
                <span className="text-accent flex items-center gap-0.5">
                  <span>{isExpanded ? '收起解密' : '展开折叠代码'}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
