import { useInView } from '../../hooks/useReveal';

/**
 * Transisi antar section: "efek tirai".
 * - Tiap section memiliki sudut atas melengkung dan sedikit MENIMPA bagian bawah section
 *   sebelumnya, sehingga pergantian terasa seperti lembaran yang bertumpuk.
 * - Saat masuk layar, lembaran naik halus ke posisinya (sekali saja).
 * - Pakai `overflow: clip` (bukan hidden) sehingga `position: sticky` di dalam section tetap jalan.
 *
 * Pakai di App.jsx (lihat contoh di bawah). Section pertama setelah Hero boleh ikut menimpa Hero;
 * beri Hero padding bawah ≥ 3.5rem agar isinya tidak tertutup. Untuk Hero sendiri pakai curtain={false}.
 *
 *   <Hero />
 *   <SectionTransition><Problem /></SectionTransition>
 *   <SectionTransition><HowItWorks /></SectionTransition>
 *   ...
 *   <SectionTransition><Footer /></SectionTransition>
 *
 * Besar lengkungan & tumpang tindih diatur di scroll-animations.css (.st-overlap).
 */
export function SectionTransition({ children, curtain = true, className = '' }) {
  const [ref, inView] = useInView({ rootMargin: '0px 0px -4% 0px' });

  return (
    <div
      ref={ref}
      data-visible={inView ? 'true' : 'false'}
      className={`st-curtain relative overflow-clip ${curtain ? 'st-overlap' : ''} ${className}`}
    >
      {children}
    </div>
  );
}