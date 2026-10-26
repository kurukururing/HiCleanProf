import { Fragment } from 'react';
import { useInView } from '../../hooks/useReveal';

/**
 * Judul yang muncul kata demi kata: tiap kata naik dari balik "garis potong" (mask),
 * berurutan dengan jeda singkat. Dipakai untuk h2 di setiap section.
 *
 *   <RevealText as="h2" className="text-5xl ..." text={t('section.x.title')} />
 *
 * - Teks asli tetap tersedia untuk screen reader (sr-only); kata-kata animasi disembunyikan dari AT.
 * - Gaya animasi ada di scroll-animations.css (.rv-word).
 */
export function RevealText({ as: Tag = 'h2', text, className = '', delay = 0, step = 55, ...rest }) {
  const [ref, inView] = useInView({ rootMargin: '0px 0px -10% 0px' });
  const words = String(text).split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref} className={className} data-visible={inView ? 'true' : 'false'} {...rest}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="rv-word" aria-hidden="true">
            <span style={{ transitionDelay: `${Math.min(delay + i * step, 1200)}ms` }}>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}