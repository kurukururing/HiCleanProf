/**
 * Screenshot aplikasi: taruh file di public/screens/.
 * Rasio disarankan 1170 × 2532 px (WebP/PNG, tanpa bingkai HP).
 *
 * Satu fitur boleh punya beberapa gambar yang berganti otomatis (lalu mengulang):
 *
 *   screens: [
 *     { src: '/screens/w1.webp',   duration: 3000 },   // tampil 3 detik
 *     { src: '/screens/w1-2.webp', duration: 5000 },   // lalu 5 detik
 *     { src: '/screens/w1-3.webp' },                   // tanpa duration → 3,5 detik (default)
 *   ]
 *
 * - duration (ms): lama gambar tampil sebelum berganti ke gambar berikutnya.
 * - srcEN (opsional): gambar versi bahasa Inggris, mis. { src: '...', srcEN: '...-en.webp' }.
 * - Satu gambar saja = tidak ada slideshow, gambar tampil terus.
 */
export const features = {
  warga: [
    {
      id: 'w1',
      titleID: 'Panduan Kategori',
      titleEN: 'Category Guide',
      descID: 'Menjelaskan material diterima dan cara menyiapkan.',
      descEN: 'Explains accepted materials and preparation.',
      screens: 
      [{ src: '/screens/Home.png', duration: 2000 },
        { src: '/screens/TipsPilahSampah.png', duration: 2000 },
      ],
    },
    {
      id: 'w2',
      titleID: 'Kalender & Booking',
      titleEN: 'Calendar & Booking',
      descID: 'Menampilkan slot aktif untuk estimasi setoran.',
      descEN: 'Shows active slots for deposit estimation.',
      screens: [{ src: '/screens/riwayat.png', duration: 2000 },
       { src: '/screens1/Setoran.png', duration: 2000 },
       { src: '/screens1/Setoran-1.png', duration: 2000 },
       { src: '/screens1/Setoran-2.png', duration: 2000 },
       { src: '/screens1/Setoran-3.png', duration: 2000 },
       { src: '/screens1/Setoran-4.png', duration: 2000 },
       { src: '/screens1/Setoran-5.png', duration: 2000 },
       { src: '/screens1/Setoran-6.png', duration: 2000 },
      { src: '/screens1/PermintaanBerhasil.png', duration: 2000 },],
    },
    {
      id: 'w3',
      titleID: 'Status Setoran',
      titleEN: 'Deposit Status',
      descID: 'Pantau status dari Dijadwalkan hingga Diterima.',
      descEN: 'Track status from Scheduled to Accepted.',
      screens: [{ src: '/screens1/RiwayatSetoran.png', duration: 2000 }],
    },
    {
      id: 'w4',
      titleID: 'Riwayat Setoran',
      titleEN: 'Deposit History',
      descID: 'Menyimpan berat, catatan, dan poin simulasi.',
      descEN: 'Stores weight, notes, and simulated points.',
      screens: [{ src: '/screens/riwayat.png', duration: 2000 },
       { src: '/screens/Riwayat-1.png', duration: 2000 },
       { src: '/screens/Riwayat-2.png', duration: 2000 },
       { src: '/screens/Riwayat-1.png', duration: 2000 },
       { src: '/screens/Detail_Riwayat_Diterima.png', duration: 2000 },
       { src: '/screens/Detail_Riwayat_Sebagian.png', duration: 2000 },
       { src: '/screens/Detail_Riwayat_Ditolak.png', duration: 2000 },
       { src: '/screens/setorUlang.png', duration: 2000 },],
    },
  ],
  pengepul: [
    {
      id: 'p1',
      titleID: 'Manifest Harian',
      titleEN: 'Daily Manifest',
      descID: 'Daftar tugas berdasarkan area dan kategori.',
      descEN: 'Task list by area and category.',
      screens: [{ src: '/screens1/beranda_tugas.png', duration: 2000 },],
    },
    {
      id: 'p2',
      titleID: 'Verifikasi Timbang',
      titleEN: 'Weigh Verification',
      descID: 'Mencatat berat, penolakan, dan alasan di lokasi.',
      descEN: 'Records weight, rejections, and reasons on-site.',
      screens: [{ src: '/screens2/Verifikasi.png', duration: 2000 },
        { src: '/screens2/Langkah1.png', duration: 2000 },
        { src: '/screens2/langkah2.png', duration: 2000 },
        { src: '/screens2/Langkah3.png', duration: 2000 },
        { src: '/screens2/Langkah4.png', duration: 2000 },
        { src: '/screens2/VerifikasiBerhasil.png', duration: 2000 },
      ],
    },
    {
      id: 'p3',
      titleID: 'Rekap Material',
      titleEN: 'Material Recap',
      descID: 'Material siap disalurkan ke mitra.',
      descEN: 'Material ready to be delivered to partners.',
      screens: [{ src: '/screens3/Material.png', duration: 2000 },
        { src: '/screens3/PermintaanMitra.png', duration: 2000 },
        { src: '/screens3/Material-1.png', duration: 2000 },
        { src: '/screens3/Detailmaterialsiapkirim.png', duration: 2000 },
        { src: '/screens3/PengajuanDistribusi-1.png', duration: 2000 },
      { src: '/screens3/PengajuanDistribusi-2.png', duration: 2000 },
    { src: '/screens3/PengajuanDistribusi-3.png', duration: 2000 },],
    },
    {
      id: 'p4',
      titleID: 'Rute',
      titleEN: 'Collection History',
      descID: 'Panduan Rute Yang Optimal',
      descEN: 'Summary of daily collection results.',
      screens: [{ src: '/screens4/Rute.png', duration: 2000 },
        { src: '/screens4/PilihRute.png', duration: 2000 },
        { src: '/screens4/PilihRute-1.png', duration: 2000 },
        { src: '/screens4/AturRute.png', duration: 2000 },
        { src: '/screens4/RuteBerhasil.png', duration: 2000 },
      ],
    },
  ],
};