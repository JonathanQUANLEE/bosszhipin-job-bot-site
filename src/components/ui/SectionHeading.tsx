interface SectionHeadingProps {
  /** 等宽小标签（大写） */
  eyebrow?: string;
  title: string;
  description?: string;
  /** 居中或左对齐 */
  align?: 'left' | 'center';
}

/**
 * 区块标题。
 * eyebrow 用等宽 + 大字距，沿用被宣发项目的 mono 标签语言。
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? <p className="label-mono mb-3 text-accent">{eyebrow}</p> : null}
      <h2 className="font-display text-2xl leading-tight text-paper sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-paper-muted sm:mt-4 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
