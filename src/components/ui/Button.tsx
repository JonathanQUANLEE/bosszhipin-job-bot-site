import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent via-[#d8b4fe] to-[#ffcdff] text-[#0b0914] font-bold shadow-lg shadow-purple-500/25 hover:brightness-110 hover:shadow-purple-500/40',
  secondary:
    'border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/40 shadow-sm',
  ghost: 'text-paper-dim hover:text-white hover:bg-white/5',
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  /** 新标签页打开（外链时默认 true） */
  external?: boolean;
  /** 禁用：渲染成不可点的 span（用于「即将开源」等占位） */
  disabled?: boolean;
  className?: string;
}

/**
 * 通用按钮 / 链接按钮。
 * 有 href 时渲染 <a>，否则渲染 <button>；disabled 时渲染不可交互的 <span>。
 */
export function Button({
  children,
  href,
  variant = 'primary',
  external,
  disabled = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200';

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-not-allowed border border-line bg-surface/60 text-paper-muted ${className}`}
      >
        {children}
      </span>
    );
  }

  const cls = `${base} ${VARIANT_CLASS[variant]} ${className}`;

  if (href) {
    const isExternal = external ?? href.startsWith('http');
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return <button type="button" className={cls}>{children}</button>;
}
