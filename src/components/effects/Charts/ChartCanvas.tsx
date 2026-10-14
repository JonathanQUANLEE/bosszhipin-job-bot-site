'use client';

import React from 'react';
import type { DayDeliveryRecord } from '@/lib/deliveryHistory';

export interface SeriesItem {
  readonly key: 'bossSent' | 'liepinSent' | 'job51Sent';
  readonly color: string;
  readonly id: 'boss' | 'liepin' | 'job51';
  readonly name: string;
  readonly delay: number;
}

interface ChartCanvasProps {
  filteredData: DayDeliveryRecord[];
  filter: 'all' | 'boss' | 'liepin' | 'job51';
  range: '7d' | '14d' | 'all';
  series: readonly SeriesItem[];
  hoverIndex: number | null;
  setHoverIndex: (idx: number | null) => void;
  maxY: number;
  onDayClick?: (date: string) => void;
  isParchment?: boolean;
}

const WIDTH = 800;
const HEIGHT = 230;
const PAD_L = 40;
const PAD_R = 20;
const PAD_T = 20;
const PAD_B = 28;
const CHART_W = WIDTH - PAD_L - PAD_R;
const CHART_H = HEIGHT - PAD_T - PAD_B;

function makeSmoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0]?.x ?? 0} ${pts[0]?.y ?? 0}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const cx = (p1.x + p2.x) / 2;
    d += ` C ${cx} ${p1.y}, ${cx} ${p2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function makeAreaPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  const last = pts[pts.length - 1]!;
  const first = pts[0]!;
  return `${makeSmoothPath(pts)} L ${last.x} ${PAD_T + CHART_H} L ${first.x} ${PAD_T + CHART_H} Z`;
}

interface GridProps {
  maxY: number;
  isParchment: boolean;
}

function ChartGrid({ maxY, isParchment }: GridProps) {
  return (
    <>
      {[0, 0.33, 0.66, 1].map((r) => {
        const y = PAD_T + CHART_H * (1 - r);
        return (
          <g key={r}>
            <line
              x1={PAD_L}
              y1={y}
              x2={WIDTH - PAD_R}
              y2={y}
              stroke={isParchment ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}
              strokeDasharray="3 3"
            />
            <text
              x={PAD_L - 6}
              y={y + 3}
              textAnchor="end"
              fill={isParchment ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.35)'}
              fontSize="9"
              fontFamily="monospace"
            >
              {Math.round(maxY * r)}
            </text>
          </g>
        );
      })}
    </>
  );
}

export function ChartCanvas({
  filteredData,
  filter,
  series,
  hoverIndex,
  setHoverIndex,
  maxY,
  onDayClick,
  isParchment = false,
}: ChartCanvasProps) {
  const pointsFor = (key: 'bossSent' | 'liepinSent' | 'job51Sent' | 'totalSent') => {
    if (!filteredData.length) return [];
    const step = CHART_W / Math.max(1, filteredData.length - 1);
    return filteredData.map((d, i) => ({
      x: PAD_L + i * step,
      y: PAD_T + CHART_H - (d[key] / maxY) * CHART_H,
      val: d[key],
    }));
  };

  const totalPoints = pointsFor('totalSent');

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full" onMouseLeave={() => setHoverIndex(null)}>
      <defs>
        {series.map((s) => (
          <linearGradient key={s.id} id={`trend-grad-${s.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
          </linearGradient>
        ))}
        <linearGradient id="trend-grad-total" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
        </linearGradient>

        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ChartGrid maxY={maxY} isParchment={isParchment} />

      {/* 面积填充 */}
      {filter === 'all' ? (
        <path d={makeAreaPath(totalPoints)} fill="url(#trend-grad-total)" className="trend-area-fade" />
      ) : (
        series
          .filter((s) => s.id === filter)
          .map((s) => (
            <path key={s.id} d={makeAreaPath(pointsFor(s.key))} fill={`url(#trend-grad-${s.id})`} className="trend-area-fade" />
          ))
      )}

      {/* 折线绘制 */}
      {filter === 'all' ? (
        <>
          {series.map((s) => (
            <path
              key={s.id}
              d={makeSmoothPath(pointsFor(s.key))}
              fill="none"
              stroke={s.color}
              strokeWidth="1.75"
              className="trend-draw-line"
              filter="url(#soft-glow)"
            />
          ))}
          <path
            d={makeSmoothPath(totalPoints)}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            className="trend-flowing-dash"
          />
        </>
      ) : (
        series
          .filter((s) => s.id === filter)
          .map((s) => (
            <path
              key={s.id}
              d={makeSmoothPath(pointsFor(s.key))}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              className="trend-draw-line"
              filter="url(#soft-glow)"
            />
          ))
      )}

      {/* 底部横轴刻度与交互响应 */}
      {filteredData.map((d, i) => {
        const step = CHART_W / Math.max(1, filteredData.length - 1);
        const x = PAD_L + i * step;
        const isHovered = hoverIndex === i;

        return (
          <g
            key={d.date}
            className="cursor-pointer"
            onMouseEnter={() => setHoverIndex(i)}
            onClick={() => onDayClick?.(d.date)}
          >
            <rect
              x={x - step / 2}
              y={PAD_T}
              width={step}
              height={CHART_H + PAD_B}
              fill="transparent"
            />
            {isHovered && (
              <line
                x1={x}
                y1={PAD_T}
                x2={x}
                y2={PAD_T + CHART_H}
                stroke={isParchment ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)'}
                strokeDasharray="2 2"
              />
            )}
            <text
              x={x}
              y={HEIGHT - 8}
              textAnchor="middle"
              fill={isHovered ? (isParchment ? '#b45309' : '#00bebd') : (isParchment ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.45)')}
              fontSize="10"
              fontFamily="monospace"
              fontWeight={isHovered ? 'bold' : 'normal'}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
