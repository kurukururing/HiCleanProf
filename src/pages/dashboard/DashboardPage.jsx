import { useState } from 'react';
import { 
  ArrowRight, Wallet, Sparkles, 
  Clock, Trash2, BookOpen, ChevronRight, 
  ShieldCheck, Flame, TrendingUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaNavbar } from '../../components/layout/WargaNavbar';
import { siteConfig } from '../../config/siteConfig';

export function DashboardPage() {
  const navigate = useNavigate();

  const user = {
    name: 'Budiman Sekti',
    role: 'Mahasiswa UPN Veteran Jawa Timur',
    streakDays: 3,
    targetPercent: 60,
    targetRemainingKg: 8,
    balancePoints: '2.450',
    pendingPoints: '350',
    totalPointsEarned: '4.800',
    activeShipment: {
      id: '#HC-88412',
      status: 'Dalam Perjalanan',
      estimateTime: 'Hari ini, 14:15 WIB',
      timeLeft: '15 menit lagi tiba',
      materialType: 'Limbah daur ulang',
      materialDesc: 'Plastik bersih & kardus',
      weightKg: '10.5 kg',
    },
    pickupSchedules: [
      { type: 'Plastik', desc: 'Botol & kemasan', day: 'Senin', time: '08:00–10:00', icon: Trash2 },
      { type: 'Kaca', desc: 'Botol & wadah', day: 'Rabu', time: '09:00–11:00', icon: Sparkles },
      { type: 'Kertas', desc: 'Koran & karton', day: 'Jumat', time: '07:30–09:30', icon: BookOpen },
      { type: 'Lain-lain', desc: 'Baterai & elektronik', day: 'Sabtu', time: '10:00–12:00', icon: ShieldCheck },
    ],
    tips: [
      { 
        title: 'PANDUAN BOTOL PET', 
        headline: 'Bilas, Lepas, Tutup & Label', 
        desc: 'Buang sisa minuman, lepas tutup, & label plastik sebelum disetor agar nilai poin daur ulang maksimal',
      },
      { 
        title: 'PANDUAN KALENG', 
        headline: 'Kosongkan, Bilas & Pipihkan', 
        desc: 'Buang sisa isi, bilas hingga bersih, dan pipihkan kaleng sebelum disetor agar nilai poin daur ulang maksimal',
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans">
      <WargaNavbar activeName="Beranda" />

      <main className="flex-grow mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 lg:px-8 space-y-6 pb-28 sm:pb-8">
        
        {/* ── GREETING ── */}
        <div className="flex flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            {/* Initials avatar */}
            <div className="size-10 rounded-2xl bg-brand-green text-ink font-extrabold text-base flex items-center justify-center shadow-sm shrink-0">
              BS
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900 font-heading" style={{ letterSpacing: '-0.025em' }}>
                Halo, {user.name} 👋
              </h1>
              <p className="text-sm text-neutral-600 mt-0.5 font-body leading-relaxed">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 shrink-0">
            <ShieldCheck className="size-4 text-brand-green" />
            <span className="hidden sm:inline">Warga Terverifikasi</span>
          </div>
        </div>

        {/* ── STREAK & TARGET CARDS 2-col ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Streak */}
          <div className="rounded-3xl bg-neutral-900 text-white p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-neutral-800 active:scale-[0.98] transition-transform cursor-default">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Streak Aktif</span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-full">
                <Flame className="size-3 fill-amber-400" /> Aktif
              </span>
            </div>
            <div>
              <div className="relative inline-block">
                <p className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight drop-shadow-[0_0_12px_rgba(32,200,94,0.4)]" style={{ letterSpacing: '-0.03em' }}>
                  {user.streakDays}
                </p>
              </div>
              <p className="text-sm font-medium text-neutral-400 mt-0.5">hari berturut-turut</p>
            </div>
            <p className="text-[11px] text-brand-green font-medium flex items-center gap-1">
              <Sparkles className="size-3" /> Pertahankan!
            </p>
          </div>

          {/* Target Minggu */}
          <div className="rounded-3xl bg-neutral-900 text-white p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-neutral-800 active:scale-[0.98] transition-transform cursor-default">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Target Minggu</span>
              <span className="text-sm font-extrabold text-brand-green">{user.targetPercent}%</span>
            </div>
            <div>
              <div className="h-2.5 w-full rounded-full bg-white/15 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-green to-emerald-400 transition-all duration-700" style={{ width: `${user.targetPercent}%` }} />
              </div>
              <p className="text-xs text-neutral-400 mt-2">Sisa <strong className="text-white">{user.targetRemainingKg} kg</strong> lagi</p>
            </div>
            <p className="text-[11px] text-neutral-500">Target: 20 kg</p>
          </div>
        </div>

        {/* ── DOMPET HICLEAN ── */}
        <div className="rounded-3xl bg-neutral-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden border border-neutral-800">
          <div className="absolute -right-8 -bottom-8 size-48 rounded-full bg-brand-green/15 blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-2xl bg-brand-green/20 text-brand-green flex items-center justify-center">
                <Wallet className="size-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-heading">Dompet HiClean</h2>
                <p className="text-[11px] text-neutral-400">Saldo poin reward Anda</p>
              </div>
            </div>
            <Link to={ROUTES.pointsHistory}
              className="text-[11px] font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all flex items-center gap-1">
              Riwayat <ChevronRight className="size-3" />
            </Link>
          </div>

          {/* Points display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 border-y border-white/10 relative z-10">
            <div className="sm:col-span-2">
              <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Poin Aktif Tersedia</p>
              <div className="flex items-baseline gap-2 mt-1">
                <div className="relative inline-block">
                  <div className="absolute inset-0 rounded-lg bg-brand-green/20 blur-md animate-pulse" />
                  <span className="relative text-4xl sm:text-5xl font-extrabold text-brand-green font-heading tabular-nums" style={{ letterSpacing: '-0.04em' }}>
                    {user.balancePoints}
                  </span>
                </div>
                <span className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">pts</span>
              </div>
            </div>
            <div className="flex sm:flex-col justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/8">
              <div>
                <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">Pending</p>
                <p className="text-sm font-bold text-amber-400 mt-0.5">+{user.pendingPoints} pts</p>
              </div>
              <div className="sm:border-t sm:border-white/10 sm:pt-2">
                <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">Total Akumulasi</p>
                <p className="text-sm font-bold text-white mt-0.5">{user.totalPointsEarned} pts</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 mt-4 relative z-10">
            <Link to={ROUTES.redemption}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-brand-green text-[#1a1d1b] py-4 font-extrabold text-sm hover:brightness-105 active:scale-[0.99] transition-all shadow-md">
              <Sparkles className="size-4" /> Tukar Poin Sekarang
            </Link>
            <Link to={ROUTES.setoranMain}
              className="sm:w-auto flex items-center justify-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white py-4 px-5 font-semibold text-sm transition-colors active:scale-[0.99]">
              Setor Sampah Baru
            </Link>
          </div>
        </div>

        {/* ── SETORAN AKTIF ── */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 font-heading" style={{ letterSpacing: '-0.02em' }}>Setoran Aktif</h2>
              <p className="text-xs font-normal text-neutral-500 mt-0.5">Pantau penjemputan armada secara realtime</p>
            </div>
            <Link to={ROUTES.setoranMain} className="text-xs font-semibold text-brand-green hover:underline">Semua</Link>
          </div>

          <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200 hover:shadow-md transition-all border-l-4 border-l-brand-green">
            {/* Status row */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60">
                <span className="size-2.5 rounded-full bg-amber-500 animate-pulse" />
                {user.activeShipment.status} 🚚
              </div>
              <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg font-mono">
                {user.activeShipment.id}
              </span>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-3 items-center">
              <div className="sm:col-span-7">
                <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wide">Estimasi Tiba</p>
                <p className="text-base font-bold text-neutral-900 mt-0.5 font-heading">{user.activeShipment.estimateTime}</p>
                <p className="text-xs font-semibold text-brand-green flex items-center gap-1 mt-1">
                  <Clock className="size-3.5" /> {user.activeShipment.timeLeft}
                </p>
              </div>
              <div className="sm:col-span-5">
                <div className="flex items-center gap-2.5 bg-neutral-50 p-2.5 rounded-2xl border border-neutral-100">
                  <div className="size-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                    <Trash2 className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{user.activeShipment.materialType}</p>
                    <p className="text-[10px] text-neutral-500">{user.activeShipment.materialDesc}</p>
                    <p className="text-xs font-bold text-brand-green mt-0.5">{user.activeShipment.weightKg}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100">
              <Link to={ROUTES.activePickup}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-3 text-sm font-bold hover:bg-neutral-800 transition-colors active:scale-[0.99]">
                Lacak Penjemputan <ArrowRight className="size-4 text-brand-green" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── JADWAL PENGAMBILAN ── */}
        <div className="space-y-2.5">
          <div>
            <h2 className="text-base font-bold text-neutral-900 font-heading" style={{ letterSpacing: '-0.02em' }}>Jadwal Pengambilan Rutin</h2>
            <p className="text-xs font-normal text-neutral-500 mt-0.5">Armada keliling sesuai kategori limbah</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {user.pickupSchedules.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx}
                  className="rounded-3xl bg-white p-4 border border-neutral-200 hover:border-brand-green/50 hover:shadow-sm hover:-translate-y-0.5 transition-all flex flex-col gap-3 cursor-default">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <IconComp className="size-4" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                      Tersedia
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 font-heading">{item.type}</p>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">{item.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-medium">Hari</p>
                      <p className="text-xs font-bold text-neutral-800">{item.day}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-400 font-medium">Waktu</p>
                      <p className="text-xs font-semibold text-neutral-700">{item.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── TIPS PILAH SAMPAH ── */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 font-heading" style={{ letterSpacing: '-0.02em' }}>Tips Pilah Sampah</h2>
              <p className="text-xs font-normal text-neutral-500 mt-0.5">Agar nilai poin daur ulang maksimal</p>
            </div>
            <Link to={ROUTES.tips} className="text-xs font-semibold text-brand-green hover:underline">Lihat Semua</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.tips.map((tip, idx) => (
              <div key={idx} className="rounded-3xl bg-white p-4 sm:p-5 border border-neutral-200 flex flex-col gap-3 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                {/* Green top accent line */}
                <div className="h-1 w-12 rounded-full bg-brand-green" />
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-brand-green/10 text-brand-green">
                    <Sparkles className="size-3.5" />
                  </span>
                  <span className="text-[11px] font-bold text-brand-green tracking-wider">{tip.title}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 font-heading">{tip.headline}</h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{tip.desc}</p>
                </div>
                <div className="pt-2 border-t border-neutral-100">
                  <Link to={ROUTES.tips}
                    className="inline-flex items-center gap-1 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold hover:bg-brand-green/20 transition-colors">
                    Baca Selengkapnya <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="hidden sm:block bg-white border-t border-neutral-200 py-6 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-neutral-500">&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-5">
            <Link to="/kebijakan-privasi" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Kebijakan Privasi</Link>
            <span className="text-neutral-300">&bull;</span>
            <Link to="/syarat-ketentuan" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Syarat Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
