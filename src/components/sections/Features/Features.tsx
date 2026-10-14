'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InView } from '@/components/effects/InView/InView';
import { FlowingMenu } from '@/components/effects/FlowingMenu';
import { ResumeParserBento, ConcurrencyBento, VaultReportBento } from './BentoCards';

/**
 * Features —— 核心功能与多模态解析（现代均衡 Bento Grid 架构）
 *
 * 彻底废除导致大面积留白的传统非对称粘性双列，
 * 采用全宽均衡 Bento Grid：
 * - 顶部：FlowingMenu 跑马灯
 * - 首行：8:4 焦点卡片（GlideSelect 简历解析实验室 + 0-Driver 原生隐匿管道）
 * - 次行：4:4:4 三大并发、语义严选与智能招呼语
 * - 尾行：6:6 本地沙盒隐私 + 每日晨报诊断
 */
export function Features() {
  return (
    <section id="features" className="border-t border-line py-16 sm:py-28 relative overflow-hidden bg-[#0a0814]">
      {/* 顶部横向流动跑马灯 */}
      <div className="mb-14">
        <FlowingMenu />
      </div>

      <div className="container-content relative z-10">
        <InView>
          <SectionHeading
            eyebrow="核心特性矩阵 · DEEP CAPABILITIES"
            title="六大模块全链路贯通，让求职像工业流水线般高效"
            description="从多模态简历理解、三大平台并发巡航、拟人化风控防御，到每日数据晨报复盘 —— 每一环皆为工业级精工铸造，彻底终结手动机械点击。"
            align="center"
          />
        </InView>

        {/* Bento Grid 容器 */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ResumeParserBento />
          <ConcurrencyBento />
          <VaultReportBento />
        </div>
      </div>
    </section>
  );
}
