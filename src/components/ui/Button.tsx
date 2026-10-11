import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'bg-accent text-base hover:bg-accent-dim',
  secondary: 'border border-line-strong text-paper hover:border-accent hover:text-accent',
  ghost: 'text-paper-dim hover:text-accent',
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  /** 新标签页打开（外链时默认 true） */
  external?: boolean;
  className?: string;
}

/**
 * 通用按钮 / 链接按钮。
 * 有 href 时渲染 <a>，否则渲染 <button>。
 */
export function Button({
  children,
  href,
  variant = 'primary',
  external,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200';
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
