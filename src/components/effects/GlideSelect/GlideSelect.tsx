'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, FileCode, Image, FileType, Check, Sparkles } from 'lucide-react';

export interface ResumeFormatOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  speed: string;
  description: string;
  sampleData: {
    skills: string[];
    role: string;
    score: string;
  };
}

const FORMAT_OPTIONS: ResumeFormatOption[] = [
  {
    id: 'pdf',
    label: 'PDF 原件',
    icon: <FileText size={15} />,
    speed: '0.12s 毫秒级提取',
    description: '深度支持复杂双栏、表格排版与矢量文字，无损还原简历排版结构。',
    sampleData: {
      skills: ['Python', 'Tauri 2.0', 'React 19', 'AI Agent', 'FastAPI'],
      role: '全栈 / 大模型应用开发工程师',
      score: '98% 岗位匹配度',
    },
  },
  {
    id: 'docx',
    label: 'Word 文档',
    icon: <FileType size={15} />,
    speed: '0.08s 秒级解析',
    description: '精准提取 DOCX 章节树、段落层级与工作年限，自动补齐缺失标签。',
    sampleData: {
      skills: ['Java', 'Spring Cloud', 'Redis', 'Kafka', 'MySQL'],
      role: '后端研发工程师 / 架构方向',
      score: '94% 岗位匹配度',
    },
  },
  {
    id: 'ocr',
    label: '图片 / 扫描件',
    icon: <Image size={15} />,
    speed: '本地 OCR 离线识别',
    description: '内置轻量离线 OCR 引擎，手机拍照或扫描图一键转为结构化意图树。',
    sampleData: {
      skills: ['产品规划', '用户增长', '数据分析', 'SQL', 'PRD编写'],
      role: '高级产品经理 / 增长黑客',
      score: '91% 岗位匹配度',
    },
  },
  {
    id: 'txt',
    label: '纯文本 / Markdown',
    icon: <FileCode size={15} />,
    speed: '0.02s 极速直读',
    description: '极客首选格式，零多余排版噪声，专为极简主义者与开发者设计。',
    sampleData: {
      skills: ['Rust', 'C++', 'Linux Kernel', 'WebAssembly', 'Nodriver'],
      role: '底层系统研发 / 高并发工程',
      score: '99% 岗位匹配度',
    },
  },
];

/**
 * GlideSelect —— 丝滑胶囊滑块选择器（React Bits 核心组件）
 *
 * 1. 丝滑 layoutId 物理流光胶囊切换；
 * 2. 实时展示对各类简历格式的多模态深度解析实力；
 * 3. 展现对不同求职者人群的友好包容度。
 */
export function GlideSelect() {
  const [selected, setSelected] = useState<ResumeFormatOption>(FORMAT_OPTIONS[0]!);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#100f16] p-5 shadow-2xl backdrop-blur-xl select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-paper">多模态简历无缝导入</h3>
        </div>
        <span className="font-mono text-xs text-emerald-400 font-medium">
          {selected.speed}
        </span>
      </div>

      {/* 丝滑滑动胶囊容器 */}
      <div className="mt-4 flex flex-wrap gap-1 rounded-xl bg-black/40 p-1.5 border border-white/5">
        {FORMAT_OPTIONS.map((item) => {
          const isActive = selected.id === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg py-2 px-3 text-xs font-medium transition-colors ${
                isActive ? 'text-white' : 'text-paper-muted hover:text-paper'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="glide-pill"
                  className="absolute inset-0 rounded-lg bg-accent/25 border border-accent/40 shadow-[0_0_12px_rgb(var(--color-accent-rgb)/0.4)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {item.icon}
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* 解析结果卡片 */}
      <motion.div
        key={selected.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4 rounded-xl border border-white/10 bg-[#16151f] p-4 text-left"
      >
        <p className="text-xs text-paper-dim leading-relaxed">
          {selected.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-paper-muted">识别意图方向：</span>
            <span className="font-mono text-xs text-accent font-semibold">
              {selected.sampleData.role}
            </span>
          </div>
          <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-medium">
            {selected.sampleData.score}
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {selected.sampleData.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-paper-dim"
            >
              <Check size={10} className="text-accent" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
