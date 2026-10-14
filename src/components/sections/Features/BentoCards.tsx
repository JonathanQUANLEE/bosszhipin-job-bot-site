'use client';

import React from 'react';
import { SpotlightCard } from '@/components/effects/SpotlightCard/SpotlightCard';
import { GlideSelect } from '@/components/effects/GlideSelect';
import { InView } from '@/components/effects/InView/InView';
import {
  FileText,
  ShieldCheck,
  Layers,
  Sparkles,
  Bot,
  Lock,
  BarChart3,
} from 'lucide-react';

export function ResumeParserBento() {
  return (
    <>
      {/* Bento 1 (8 列)：GlideSelect 简历解析实验室 */}
      <div className="lg:col-span-8 flex flex-col">
        <InView transition={{ delay: 0.1 }}>
          <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#151224] to-[#0f0d1a] p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 border border-accent/40 text-accent">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>多模态简历秒级语义解析实验室</span>
                      <span className="rounded bg-accent/20 px-2 py-0.5 font-mono text-[10px] text-accent font-semibold">
                        核心引擎
                      </span>
                    </h3>
                    <p className="text-xs text-paper-dim">
                      拖入真实简历文件，实时体验多格式转换、技能标签提炼与智能岗位匹配
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  支持 PDF · DOCX · Markdown · TXT
                </span>
              </div>

              <div className="mt-6">
                <GlideSelect />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-paper-muted gap-2">
              <span>解析延迟：&lt; 120ms</span>
              <span className="text-accent">100% 运行在本地设备，文件不上传任何第三方云服务器</span>
            </div>
          </SpotlightCard>
        </InView>
      </div>

      {/* Bento 2 (4 列)：0-Driver 原生隐匿管道 */}
      <div className="lg:col-span-4 flex flex-col">
        <InView transition={{ delay: 0.15 }}>
          <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#161226] to-[#0e0c18] p-6 sm:p-7 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    <ShieldCheck size={18} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    0-Driver 原生隐匿管道
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                  无驱动指纹
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-paper-dim">
                告别易被平台风控秒封的 Selenium / ChromeDriver，基于底层 Chrome DevTools 协议双工管道直连，杜绝 <code>navigator.webdriver = true</code> 自动化指纹。
              </p>

              <div className="mt-5 space-y-2.5 font-mono text-[11px]">
                <div className="rounded-xl border border-white/10 bg-black/50 p-2.5 flex items-center justify-between">
                  <span className="text-paper-muted">Canvas / Audio 微扰:</span>
                  <span className="text-emerald-400 font-bold">已注入微噪点</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-2.5 flex items-center justify-between">
                  <span className="text-paper-muted">贝塞尔鼠标生理抖动:</span>
                  <span className="text-accent font-bold">三次拟人曲线</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-2.5 flex items-center justify-between">
                  <span className="text-paper-muted">异常主动熔断响应:</span>
                  <span className="text-cyan-400 font-bold">&lt; 50ms 挂起</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] font-mono text-paper-muted">
              <span className="text-emerald-400">零封号保障体系</span>
              <span>风控识别率 &lt; 0.01%</span>
            </div>
          </SpotlightCard>
        </InView>
      </div>
    </>
  );
}

export function ConcurrencyBento() {
  return (
    <>
      {/* Bento 3 (4 列)：三大平台并发巡航引擎 */}
      <div className="lg:col-span-4 flex flex-col">
        <InView transition={{ delay: 0.2 }}>
          <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-[#12101e] p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Layers size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">三大平台并发巡航</h4>
                  <p className="font-mono text-[10px] text-cyan-400">CONCURRENT ORCHESTRATION</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                打破平台壁垒，一次配置同时驱动三大主流渠道，独立协程调度，互不干扰。
              </p>

              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-teal-500/20 bg-teal-950/20 p-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-teal-300">BOSS 直聘</span>
                  <span className="font-mono text-teal-400 text-[11px]">巡航活跃中 · 60/100</span>
                </div>
                <div className="rounded-lg border border-orange-500/20 bg-orange-950/20 p-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-orange-300">猎聘 Liepin</span>
                  <span className="font-mono text-orange-400 text-[11px]">巡航活跃中 · 40/80</span>
                </div>
                <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-rose-300">前程无忧 51job</span>
                  <span className="font-mono text-rose-400 text-[11px]">巡航活跃中 · 20/50</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-3 text-[10px] font-mono text-paper-muted">
              并发吞吐量：提升 300% 投递效率
            </div>
          </SpotlightCard>
        </InView>
      </div>

      {/* Bento 4 (4 列)：RAG 双向检索与轻量向量库严选 */}
      <div className="lg:col-span-4 flex flex-col">
        <InView transition={{ delay: 0.25 }}>
          <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-[#12101e] p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Bot size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">RAG 语义与向量初筛</h4>
                  <p className="font-mono text-[10px] text-purple-400">RAG & VECTOR RETRIEVAL</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                结合本地简历库与职位 JD，通过 RAG 双向检索增强与轻量向量库深度对齐，告别传统死板关键词匹对。
              </p>

              <div className="mt-4 space-y-1.5 font-mono text-[11px]">
                <div className="rounded-lg bg-black/40 p-2 border border-white/5 flex items-center justify-between">
                  <span className="text-paper-muted">RAG 向量语义对齐:</span>
                  <span className="text-purple-400">双向加权语义检索</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2 border border-white/5 flex items-center justify-between">
                  <span className="text-paper-muted">薪资底线硬约束:</span>
                  <span className="text-emerald-400">严格 &ge; 期望底薪</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2 border border-white/5 flex items-center justify-between">
                  <span className="text-paper-muted">排雷黑名单:</span>
                  <span className="text-rose-400">外包/培训贷自动过滤</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-3 text-[10px] font-mono text-paper-muted">
              ATS 初筛雷达图评分 · 不浪费每日沟通配额
            </div>
          </SpotlightCard>
        </InView>
      </div>

      {/* Bento 5 (4 列)：内置免费大模型 API Key 与 AI 招呼语 */}
      <div className="lg:col-span-4 flex flex-col">
        <InView transition={{ delay: 0.3 }}>
          <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-[#12101e] p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">内置免费大模型 API Key</h4>
                  <p className="font-mono text-[10px] text-amber-400">BUILT-IN FREE LLM KEY</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                作者直接买单内置高并发 GLM-4 API Key，开箱即用完全免费！根据岗位技术痛点动态生成高情商开场白。
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-black/50 p-3 text-xs">
                <p className="text-[11px] text-white/90 italic leading-relaxed">
                  “您好！看到贵司正在寻找具备高并发与自动化经验的工程师，我曾主导过百万级巡航引擎重构，期待与您详聊…”
                </p>
                <span className="mt-2 block text-[10px] font-mono text-amber-400">
                  ★ 无需自备 Key · 也支持自定义 DeepSeek / OpenAI
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-3 text-[10px] font-mono text-paper-muted">
              AI 智能管家 7×24 小时对话调控与求职陪伴
            </div>
          </SpotlightCard>
        </InView>
      </div>
    </>
  );
}

export function VaultReportBento() {
  return (
    <>
      {/* Bento 6 (6 列)：本地 SQLite 隐私沙盒 */}
      <div className="lg:col-span-6 flex flex-col">
        <InView transition={{ delay: 0.35 }}>
          <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#131120] to-[#0d0c16] p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Lock size={16} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    本地 SQLite 密钥环沙盒隔离
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                  100% 本机储存
                </span>
              </div>

              <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                求职简历与聊天记录是个人极其敏感的数字资产。系统坚守 Local-First 理念，所有账号 Cookie、投递日志与企业沟通数据仅持久化于本机，绝不上报远程数据库。
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="rounded-lg bg-black/40 p-2.5 border border-white/5">
                  <span className="text-[10px] text-paper-muted block">云端日志上传:</span>
                  <span className="text-emerald-400 font-bold">0 次 / 绝对干净</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2.5 border border-white/5">
                  <span className="text-[10px] text-paper-muted block">敏感凭证存储:</span>
                  <span className="text-white font-bold">OS 级密钥环保护</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-3 text-[10px] font-mono text-paper-muted">
              支持随时一键导出与彻底销毁本地数据
            </div>
          </SpotlightCard>
        </InView>
      </div>

      {/* Bento 7 (6 列)：每日晨间早报与定时诊断 */}
      <div className="lg:col-span-6 flex flex-col">
        <InView transition={{ delay: 0.4 }}>
          <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#141122] to-[#0e0c18] p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <BarChart3 size={16} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    每日晨间战报与行动诊断
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                  09:00 定时结算
                </span>
              </div>

              <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                早晨 09:00 准时汇总昨日三大平台的投递成效、HR 已读率、回复峰值时段与算法优化建议，让你清晰洞察求职战役的每一点推进。
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="rounded-lg bg-black/40 p-2 border border-white/5">
                  <span className="text-[10px] text-paper-muted block">昨日投递</span>
                  <span className="text-amber-400 font-bold text-sm">23 家</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2 border border-white/5">
                  <span className="text-[10px] text-paper-muted block">HR 已读</span>
                  <span className="text-cyan-400 font-bold text-sm">17 家</span>
                </div>
                <div className="rounded-lg bg-black/40 p-2 border border-white/5">
                  <span className="text-[10px] text-paper-muted block">回复率</span>
                  <span className="text-emerald-400 font-bold text-sm">21.7%</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-3 text-[10px] font-mono text-paper-muted">
              一键复制战报摘要至剪贴板或 Notion / 飞书
            </div>
          </SpotlightCard>
        </InView>
      </div>
    </>
  );
}
