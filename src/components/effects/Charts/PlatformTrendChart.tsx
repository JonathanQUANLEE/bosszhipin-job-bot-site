'use client';

import React, { useState, useMemo } from 'react';
import type { DayDeliveryRecord } from '@/lib/deliveryHistory';
import { ChartHeader } from './ChartHeader';
import { ChartCanvas, type SeriesItem } from './ChartCanvas';
import { ChartTooltip } from './ChartTooltip';
import './PlatformTrendChart.css';

interface PlatformTrendChartProps {
  records: DayDeliveryRecord[];
  onDayClick?: (date: string) => void;
  isParchment?: boolean;
}

export type PlatformFilter = 'all' | 'boss' | 'liepin' | 'job51';
export type TimeRange = '7d' | '14d' | 'all';

// 锁定各平台原生品牌色彩：BOSS 天青、猎聘 活力橙、51job 赤焰红
export const SERIES_CONFIG: readonly SeriesItem[] = [
  { key: 'bossSent', color: '#00bebd', id: 'boss', name: 'BOSS 直聘', delay: 0 },
  { key: 'liepinSent', color: '#ff7033', id: 'liepin', name: '猎聘 Liepin', delay: 0.12 },
  { key: 'job51Sent', color: '#ff5000', id: 'job51', name: '前程无忧', delay: 0.24 },
] as const;

export function PlatformTrendChart({ records, onDayClick, isParchment = false }: PlatformTrendChartProps) {
  const [filter, setFilter] = useState<PlatformFilter>('all');
  const [range, setRange] = useState<TimeRange>('14d');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    if (range === '7d') return records.slice(-7);
    if (range === '14d') return records.slice(-14);
    return records;
  }, [records, range]);

  const maxY = useMemo(() => {
    let max = 10;
    filteredData.forEach((d) => {
      if (filter === 'all') max = Math.max(max, d.totalSent);
      else if (filter === 'boss') max = Math.max(max, d.bossSent);
      else if (filter === 'liepin') max = Math.max(max, d.liepinSent);
      else if (filter === 'job51') max = Math.max(max, d.job51Sent);
    });
    return Math.ceil(max * 1.15);
  }, [filteredData, filter]);

  const activeRecord = hoverIndex !== null ? filteredData[hoverIndex] ?? null : filteredData[filteredData.length - 1] ?? null;

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isParchment
          ? 'bg-[#faf7f2] border-stone-300/80 shadow-md text-stone-900'
          : 'bg-[#12101e]/90 border-white/10 shadow-xl backdrop-blur-xl text-white'
      } space-y-4 select-none`}
    >
      <ChartHeader
        range={range}
        setRange={setRange}
        filter={filter}
        setFilter={setFilter}
        series={SERIES_CONFIG}
        isParchment={isParchment}
      />

      <div className="relative w-full aspect-[800/230] select-none">
        <ChartCanvas
          filteredData={filteredData}
          filter={filter}
          range={range}
          series={SERIES_CONFIG}
          hoverIndex={hoverIndex}
          setHoverIndex={setHoverIndex}
          maxY={maxY}
          onDayClick={onDayClick}
          isParchment={isParchment}
        />

        <ChartTooltip record={activeRecord} series={SERIES_CONFIG} />
      </div>
    </div>
  );
}
