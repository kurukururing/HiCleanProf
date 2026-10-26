import { ListChecks, CalendarCheck, Truck, Scale, PackageCheck, Gift } from 'lucide-react';

export const steps = [
  { id: 'sort', icon: ListChecks, titleID: 'Pilah', titleEN: 'Sort', descID: 'Baca panduan kategori dan checklist (kering, bersih).', descEN: 'Read category guide and prep checklist (dry, clean).' },
  { id: 'book', icon: CalendarCheck, titleID: 'Booking', titleEN: 'Book', descID: 'Pilih kategori, jadwal, alamat, dan estimasi.', descEN: 'Choose category, schedule, address, and amount.' },
  { id: 'pickup', icon: Truck, titleID: 'Jemput', titleEN: 'Pick up', descID: 'Pengepul menerima manifest dan mengambil setoran.', descEN: 'Collector receives manifest and collects deposit.' },
  { id: 'weigh', icon: Scale, titleID: 'Timbang & Verifikasi', titleEN: 'Weigh & Verify', descID: 'Berat dicatat; hasil diterima, sebagian, atau ditolak.', descEN: 'Weight recorded; result accepted, partial, or rejected.', noteID: 'timbang otomatis IoT: Konsep', noteEN: 'IoT auto-weigh: Concept' },
  { id: 'deliver', icon: PackageCheck, titleID: 'Salurkan', titleEN: 'Deliver', descID: 'Material disalurkan ke mitra pengolah.', descEN: 'Material goes to processing partners.' },
  { id: 'reward', icon: Gift, titleID: 'Reward', titleEN: 'Reward', descID: 'Warga melihat riwayat, berat final, dan poin.', descEN: 'Residents see history, weight, and points.', noteID: 'poin simulasi', noteEN: 'simulated points' },
];