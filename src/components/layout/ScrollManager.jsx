import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Mengatur posisi scroll saat pindah halaman / anchor:
 * - ada hash (#problem) dan elemennya ada → scroll ke elemen itu (smooth lewat CSS)
 * - selain itu → langsung ke paling atas halaman baru
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, key]);

  return null;
}
