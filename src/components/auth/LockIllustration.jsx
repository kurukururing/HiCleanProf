/**
 * Ilustrasi awan + gembok kuning (Lupa Password). SVG inline agar tajam di semua ukuran
 * dan tidak butuh file aset tambahan. Dekoratif, jadi disembunyikan dari screen reader.
 */
export function LockIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 240 190" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="lock-cloud-clip">
          <circle cx="62" cy="100" r="40" />
          <circle cx="114" cy="70" r="46" />
          <circle cx="170" cy="94" r="40" />
          <rect x="28" y="100" width="182" height="40" rx="20" />
        </clipPath>
        <linearGradient id="lock-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd000" />
          <stop offset="0.55" stopColor="#ffc800" />
          <stop offset="1" stopColor="#ffa81f" />
        </linearGradient>
      </defs>

      {/* Awan */}
      <g fill="#a8d8ea">
        <circle cx="62" cy="100" r="40" />
        <circle cx="114" cy="70" r="46" />
        <circle cx="170" cy="94" r="40" />
        <rect x="28" y="100" width="182" height="40" rx="20" />
      </g>
      {/* Bayangan sisi kanan-bawah awan */}
      <g clipPath="url(#lock-cloud-clip)">
        <circle cx="188" cy="118" r="52" fill="#9bcce2" />
      </g>
      {/* Kilau sisi kiri-atas */}
      <path d="M30 92c2-22 18-36 36-38" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
      <path d="M84 50c8-10 20-14 30-13" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" />

      <g transform="translate(-34 0)">
      {/* Gembok: gagang */}
      <path d="M126 104V86a30 30 0 0 1 60 0v18" fill="none" stroke="#6e6e6e" strokeWidth="14" strokeLinecap="butt" />
      {/* Gembok: badan */}
      <rect x="108" y="102" width="96" height="74" rx="4" fill="url(#lock-body)" />
      <path d="M108 160c30-4 62-14 96-34v46a4 4 0 0 1-4 4H112a4 4 0 0 1-4-4z" fill="#ffae1a" opacity=".55" />
      {/* Lubang kunci */}
      <circle cx="156" cy="132" r="8.5" fill="#6e6e6e" />
      <path d="M152 136h8l3 22h-14z" fill="#6e6e6e" />
      </g>
    </svg>
  );
}
