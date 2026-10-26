// Field gambar (urutan prioritas di tampilan):
//   image : foto utama, di-crop memenuhi tile (disarankan landscape/portrait ≥ 800px)
//   logo  : logo, ditampilkan utuh di tengah tile (dipakai jika image kosong/gagal dimuat)
//   focus : (opsional) titik fokus crop, mis. 'center top' agar objek penting tidak terpotong
//   (semuanya kosong/gagal) → monogram inisial

const img = (file) => `${import.meta.env.BASE_URL}${file}`;
export const partners = [
  {
    id: 'sals',
    name: 'SALS Group',
    image: img('sals.jpg'),
    logo: img('sals-logo.png'),
  },
  {
    id: 'mekabox',
    name: 'PT Surabaya Mekabox',
    image: img('mekabox.png'),
    logo: img('mekabox-logo.png'),
  },
  {
    id: 'multimiguna',
    name: 'Multi Miguna',
    image: img('multimiguna.jpg'),
    logo: img('multimiguna-logo.png'),
  },
  {
    id: 'lohjinawi',
    name: 'Loh Jinawi',
    image: img('lohjinawi.jpg'),
    logo: img('lohjinawi-logo.png'),
  },
  {
    id: 'suparma',
    name: 'PT Suparma Tbk',
    image: img('suparma.jpg'),
    logo: img('suparma-logo.png'),
  },
  {
    id: 'pelita',
    name: 'PT Pelita Mekar Semesta',
    image: img('pelita.jpg'),
    logo: img('pelita-logo.png'),
  },
  {
    id: 'papyrus',
    name: 'PT Papyrus Sakti',
    image: img('papyrus.jpg'),
    logo: img('papyrus-logo.png'),
  },
];