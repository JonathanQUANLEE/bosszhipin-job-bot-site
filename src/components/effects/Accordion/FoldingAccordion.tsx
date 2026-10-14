'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Terminal } from 'lucide-react';

export interface AccordionItem {
  id: string;
  tag?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: string | React.ReactNode;
  badge?: string;
  codeSnippet?: string;
}

interface FoldingAccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  theme?: 'obsidian' | 'parchment';
  className?: string;
}

interface AccordionRowProps {
  item: AccordionItem;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
  isParchment: boolean;
}

function AccordionRow({ item, idx, isOpen, onToggle, isParchment }: AccordionRowProps) {
  const containerClasses = isParchment
    ? isOpen
      ? 'border-stone-400/80 bg-white shadow-md'
      : 'border-stone-300/60 bg-[#faf7f2]/80 hover:border-stone-400 hover:bg-white'
    : isOpen
    ? 'border-accent/60 bg-gradient-to-b from-[#181528] to-[#0f0d1a] shadow-[0_8px_30px_rgb(var(--color-accent-rgb)/0.2)]'
    : 'border-white/10 bg-[#12101e]/70 hover:border-white/20 hover:bg-[#151224]';

  const iconClasses = isParchment
    ? isOpen
      ? 'bg-amber-100 border-amber-300 text-amber-800'
      : 'bg-stone-200/70 border-stone-300 text-stone-700'
    : isOpen
    ? 'bg-accent/20 border-accent/40 text-accent'
    : 'bg-white/5 border-white/10 text-paper-dim';

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${containerClasses}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {item.icon ? (
            <div className={`h-9 w-9 shrink-0 rounded-xl flex items-center justify-center border transition-colors ${iconClasses}`}>
              {item.icon}
            </div>
          ) : (
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold border ${
                isParchment
                  ? 'bg-stone-200/80 border-stone-300 text-stone-800'
                  : 'bg-white/5 border-white/10 text-accent'
              }`}
            >
              0{idx + 1}
            </span>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm sm:text-base font-bold tracking-tight truncate ${isParchment ? 'text-stone-900' : 'text-white'}`}>
                {item.title}
              </span>

              {item.tag && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isParchment ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-accent/15 text-accent border-accent/30'}`}>
                  {item.tag}
                </span>
              )}

              {item.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isParchment ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'}`}>
                  {item.badge}
                </span>
              )}
            </div>

            {item.subtitle && (
              <p className={`text-xs mt-0.5 font-mono truncate ${isParchment ? 'text-stone-500' : 'text-paper-muted'}`}>
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        <div
          className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center border transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } ${
            isParchment ? 'border-stone-300 text-stone-600 bg-stone-100' : 'border-white/10 text-paper-dim bg-white/5'
          }`}
        >
          <ChevronDown size={14} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.32, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.25, delay: 0.08 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.24, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className={`p-4 sm:p-5 pt-0 border-t ${isParchment ? 'border-stone-200 text-stone-700' : 'border-white/10 text-paper-dim'}`}>
              <div className="pt-3 text-xs sm:text-sm leading-relaxed">
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </div>

              {item.codeSnippet && (
                <div className={`mt-3.5 rounded-xl border p-3 font-mono text-[11px] overflow-x-auto ${isParchment ? 'bg-stone-900 text-emerald-400 border-stone-800' : 'bg-black/60 text-emerald-400 border-white/10'}`}>
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/10 text-[10px] text-white/50">
                    <Terminal size={11} className="text-accent" />
                    <span>底层内核实现逻辑 · SANDBOX EXECUTION</span>
                  </div>
                  <pre className="leading-relaxed">
                    <code>{item.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FoldingAccordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  theme = 'obsidian',
  className = '',
}: FoldingAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : items.length > 0 ? [items[0]!.id] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const isParchment = theme === 'parchment';

  return (
    <div className={`w-full space-y-3 select-none ${className}`}>
      {items.map((item, idx) => (
        <AccordionRow
          key={item.id}
          item={item}
          idx={idx}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
          isParchment={isParchment}
        />
      ))}
    </div>
  );
}
