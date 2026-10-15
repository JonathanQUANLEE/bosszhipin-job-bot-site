import { BlurText } from '@/components/effects/BlurText';

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
 * 标题走 BlurText（逐词模糊浮现），比整块淡入更有「对焦」感。
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? <p className="label-mono mb-3 text-accent">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
        <BlurText text={title} />
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
