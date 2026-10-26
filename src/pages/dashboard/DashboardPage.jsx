import { useState } from 'react';
import { 
  ArrowRight, Wallet, History, Sparkles, 
  Clock, MapPin, CheckCircle2, Trash2, BookOpen, ChevronRight, 
  Award, ShieldCheck, Flame, TrendingUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaNavbar } from '../../components/layout/WargaNavbar';
import { siteConfig } from '../../config/siteConfig';

export function DashboardPage() {
  const navigate = useNavigate();

  // Mock data user login
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
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <WargaNavbar activeName="Beranda" />

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 lg:px-8 space-y-5 pb-8">
        
        {/* Top Greeting Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
                Halo, {user.name} 👋
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">{user.role}</p>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60 shadow-2xs">
            <ShieldCheck className="size-4 text-brand-green" />
            <span>Warga Terverifikasi</span>
          </div>
        </div>

        {/* Top Metrics Row: Streak & Target Minggu Ini */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Total Streak */}
          <div className="rounded-3xl bg-neutral-900 text-white p-4 sm:p-6 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400">Streak Daur Ulang</span>
              <span className="rounded-full bg-amber-500/20 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-amber-400 flex items-center gap-1">
                <Flame className="size-3 fill-amber-400" /> Aktif
              </span>
            </div>
            <div className="my-2 sm:my-3">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{user.streakDays} hari</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">Berturut-turut</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-brand-green font-medium">
              <Sparkles className="size-3" /> Hebat, lanjutkan!
            </div>
          </div>

          {/* Target Minggu Ini */}
          <div className="rounded-3xl bg-neutral-900 text-white p-4 sm:p-6 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400">Target Minggu Ini</span>
              <span className="text-xs sm:text-sm font-extrabold text-brand-green">{user.targetPercent}%</span>
            </div>
            <div className="my-2 sm:my-3 space-y-1.5">
              <div className="h-2 w-full rounded-full bg-white/15 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-brand-green transition-all duration-700" 
                  style={{ width: `${user.targetPercent}%` }} 
                />
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 truncate">Sisa {user.targetRemainingKg} kg lagi</p>
            </div>
            <div className="text-[10px] sm:text-xs text-neutral-400 flex items-center justify-between">
              <span>Target: 20 kg</span>
              <span className="text-brand-green font-semibold">Tercapai 12 kg</span>
            </div>
          </div>
        </div>

        {/* Dompet HiClean Card */}
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden border border-neutral-800">
          <div className="absolute -right-8 -bottom-8 size-48 rounded-full bg-brand-green/15 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-2xl bg-brand-green/20 text-brand-green flex items-center justify-center shadow-inner">
                <Wallet className="size-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold tracking-tight">Dompet HiClean</h2>
                <p className="text-[11px] text-neutral-400">Saldo poin reward Anda</p>
              </div>
            </div>
            <Link 
              to={ROUTES.pointsHistory} 
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
            >
              Riwayat <ChevronRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center py-3 border-y border-white/10 my-2">
            <div className="sm:col-span-2">
              <p className="text-[11px] text-neutral-400 font-medium">Poin Aktif Tersedia</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-brand-green">
                  {user.balancePoints}
                </span>
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">poin</span>
              </div>
            </div>
            <div className="flex sm:flex-col justify-between sm:justify-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
              <div>
                <p className="text-[10px] text-neutral-400">Pending</p>
                <p className="text-xs font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" /> +{user.pendingPoints} pts
                </p>
              </div>
              <div className="sm:pt-2 sm:border-t sm:border-white/10">
                <p className="text-[10px] text-neutral-400">Total Akumulasi</p>
                <p className="text-xs font-bold text-white mt-0.5">{user.totalPointsEarned} pts</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-1 flex flex-col sm:flex-row gap-2.5">
            <Link
              to={ROUTES.redemption}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-brand-green text-ink py-3 px-5 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-400 active:scale-[0.99] transition-all"
            >
              <Sparkles className="size-4" /> Tukar Poin Sekarang
            </Link>
            <Link
              to={ROUTES.setoranMain}
              className="sm:w-auto flex items-center justify-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white py-3 px-5 font-semibold text-xs transition-colors"
            >
              Setor Sampah Baru
            </Link>
          </div>
        </div>

        {/* Setoran Aktif Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Setoran Aktif</h2>
              <p className="text-[11px] sm:text-xs text-neutral-500">Pantau penjemputan armada secara realtime</p>
            </div>
            <Link to={ROUTES.setoranMain} className="text-xs font-semibold text-brand-green hover:underline">
              Semua Setoran
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-xs border border-neutral-200/80 hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200/60">
                <span className="size-2 rounded-full bg-amber-500 animate-ping" />
                <span>{user.activeShipment.status} 🚚</span>
              </div>
              <span className="text-[11px] font-mono font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
                {user.activeShipment.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-3 items-center">
              <div className="sm:col-span-7 space-y-1">
                <p className="text-[11px] text-neutral-500">Estimasi Tiba</p>
                <p className="text-base sm:text-lg font-bold text-neutral-900">{user.activeShipment.estimateTime}</p>
                <p className="text-xs text-brand-green font-semibold flex items-center gap-1 pt-0.5">
                  <Clock className="size-3.5" /> {user.activeShipment.timeLeft}
                </p>
              </div>

              <div className="sm:col-span-5">
                <div className="flex items-center gap-2.5 bg-neutral-50 p-2.5 sm:p-3 rounded-2xl border border-neutral-100">
                  <div className="size-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                    <Trash2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{user.activeShipment.materialType}</p>
                    <p className="text-[10px] text-neutral-500">{user.activeShipment.materialDesc}</p>
                    <p className="text-xs font-bold text-brand-green mt-0.5">{user.activeShipment.weightKg}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex gap-2">
              <Link
                to={ROUTES.activePickup}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white py-2.5 px-5 text-xs font-bold shadow hover:bg-neutral-800 transition-colors"
              >
                Lacak Penjemputan <ArrowRight className="size-3.5 text-brand-green" />
              </Link>
            </div>
          </div>
        </div>

        {/* Jadwal Pengambilan Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Jadwal Pengambilan Rutin</h2>
              <p className="text-[11px] sm:text-xs text-neutral-500">Armada keliling sesuai kategori limbah</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {user.pickupSchedules.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className="rounded-3xl bg-white p-3.5 sm:p-4 shadow-xs border border-neutral-200/80 hover:border-brand-green transition-all hover:shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="size-8 sm:size-9 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
                      <IconComp className="size-4 sm:size-4.5" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                      Tersedia
                    </span>
                  </div>

                  <div className="my-2 sm:my-3">
                    <p className="text-xs sm:text-sm font-bold text-neutral-900">{item.type}</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500 line-clamp-1">{item.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-[10px] text-neutral-400 block">Hari</span>
                      <span className="font-bold text-neutral-800">{item.day}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 block">Waktu</span>
                      <span className="font-semibold text-neutral-700">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips Pilah Sampah Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Tips Pilah Sampah</h2>
              <p className="text-[11px] sm:text-xs text-neutral-500">Cara mudah agar nilai poin daur ulang maksimal</p>
            </div>
            <Link to={ROUTES.tips} className="text-xs font-semibold text-brand-green hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {user.tips.map((tip, idx) => (
              <div key={idx} className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 flex flex-col justify-between hover:shadow-sm transition-all">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="inline-block p-1.5 rounded-lg bg-brand-green/10 text-brand-green">
                      <Sparkles className="size-3.5" />
                    </span>
                    <span className="text-[11px] font-bold text-brand-green tracking-wider">{tip.title}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">{tip.headline}</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{tip.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <Link 
                    to={ROUTES.tips}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline"
                  >
                    Baca Selengkapnya <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="hidden sm:block bg-white border-t border-neutral-200 py-6 text-neutral-500 text-xs mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900 transition-colors">Kebijakan Privasi</Link>
            <span>&bull;</span>
            <Link to="/syarat-ketentuan" className="hover:text-neutral-900 transition-colors">Syarat Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
