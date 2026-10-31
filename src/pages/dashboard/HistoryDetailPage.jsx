import { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, AlertTriangle, XCircle, 
  Trash2, ArrowRight, Check, Sparkles, RefreshCw
} from 'lucide-react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { ROUTES } from '../../routes';

export function HistoryDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: rawId } = useParams();

  // Normalize ID (handle URL encoding like %23HC-...)
  const currentId = rawId ? decodeURIComponent(rawId) : '#HC-78654';

  // Detail dictionary for all history IDs
  const historyDatabase = {
    '#HC-78654': {
      id: '#HC-78654',
      date: '20 Sep 2026, 10:00 WIB',
      status: 'Diterima Penuh',
      statusType: 'success',
      officer: 'Budi Santoso',
      address: 'Jl. Medokan Asri Timur no. 14, Gunung Anyar',
      weight: '4.5 kg',
      points: '+240 pts',
      items: [
        { name: 'Kaleng & Logam Aluminium', detail: '30 Kaleng minuman kemasan bersih', weight: '2.5kg' },
        { name: 'Plastik PET (Bening)', detail: '15 Botol kemasan - Tutup terpisah', weight: '2.0kg' }
      ],
      totalWeight: '4.5 kg',
      summaryMessage: 'Seluruh material sampah memenuhi standar daur ulang dengan baik. Poin reward penuh telah berhasil dikreditkan ke akun Anda.',
      findingsCount: 0,
      inspectionNotes: [
        {
          title: 'Kondisi material bersih & kering',
          desc: 'Semua botol dan kaleng telah dibilas bebas dari residu cairan dan dipipihkan dengan rapi.',
          type: 'success'
        },
        {
          title: 'Pemilahan mandiri sesuai standar mutu',
          desc: 'Tutup botol dipisahkan dan material terpilah sempurna memudahkan proses daur ulang pabrik.',
          type: 'success'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
      ]
    },
    '#HC-78664': {
      id: '#HC-78664',
      date: '20 Sep 2026, 10:00 WIB',
      status: 'Diterima Penuh',
      statusType: 'success',
      officer: 'Budi Santoso',
      address: 'Jl. Medokan Asri Timur no. 14, Gunung Anyar',
      weight: '6.0 kg',
      points: '+250 pts',
      items: [
        { name: 'Kardus Box Bersih', detail: '3 Bundel pipih - Kering & Rapi', weight: '3.5kg' },
        { name: 'Plastik PET (Bening)', detail: '20 Botol kemasan - Bersih', weight: '2.5kg' }
      ],
      totalWeight: '6.0 kg',
      summaryMessage: 'Seluruh material sampah memenuhi kriteria daur ulang dengan baik. Poin reward penuh telah berhasil dikreditkan ke akun Anda.',
      findingsCount: 0,
      inspectionNotes: [
        {
          title: 'Kardus terikat rapi & kering',
          desc: 'Kardus telah dipipihkan dan bebas dari lakban atau selotip perekat tebal.',
          type: 'success'
        },
        {
          title: 'Botol plastik terpilah sempurna',
          desc: 'Lolos uji verifikasi visual dan sensor timbangan OIML Class II.',
          type: 'success'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80'
      ]
    },
    '#HC-78647': {
      id: '#HC-78647',
      date: '15 Sep 2026, 14:00 WIB',
      status: 'Diterima Sebagian',
      statusType: 'warning',
      officer: 'Budi Santoso',
      address: 'Jl. Medokan Asri Timur no. 14, Gunung Anyar',
      weight: '4.5 kg',
      points: '+100 pts',
      items: [
        { name: 'Plastik PET (Bening)', detail: '15 Botol kemasan - Tutup terpisah', weight: '4.5kg' },
        { name: 'Kardus Box (Terkontaminasi)', detail: 'Tercampur minyak makanan basah', weight: '2.0kg' }
      ],
      totalWeight: '6.5 kg',
      summaryMessage: '4.5 kg berhasil lolos inspeksi, sedangkan sisa 2.0 kg terpotong karena kontaminasi minyak makanan.',
      findingsCount: 1,
      inspectionNotes: [
        {
          title: 'Kardus & kertas terkontaminasi minyak',
          desc: '2.0 kg material tercampur basah dan minyak makanan, sehingga tidak dapat diproses oleh pihak mitra daur ulang.',
          type: 'warning'
        },
        {
          title: 'Botol plastik PET lolos sortir',
          desc: '4.5 kg botol plastik dalam kondisi baik dan berhasil diverifikasi masuk ke kuota reward.',
          type: 'success'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1532996122724-e3c3fa9a0d35?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1611288557565-d227b92f7204?w=300&auto=format&fit=crop&q=80'
      ]
    },
    '#HC-787413': {
      id: '#HC-787413',
      date: '5 Sep 2026, 17:00 WIB',
      status: 'Ditolak',
      statusType: 'danger',
      officer: 'Budi Santoso',
      address: 'Jl. Medokan Asri Timur no. 14, Gunung Anyar',
      weight: '4.5 kg',
      points: '0 pts',
      items: [
        { name: 'Plastik Botol', detail: 'Terkontaminasi minyak berat', weight: '3.0kg' },
        { name: 'Kaleng Minuman', detail: 'Sisa cairan basi & belum dibilas', weight: '1.5kg' }
      ],
      totalWeight: '4.5 kg',
      summaryMessage: 'Kontaminasi minyak berat pada seluruh botol dan kaleng. Tidak memenuhi standar kebersihan daur ulang.',
      findingsCount: 2,
      inspectionNotes: [
        {
          title: 'Kontaminasi minyak berat pada seluruh botol & kaleng',
          desc: 'Kontaminasi minyak pada botol dan kaleng sangat banyak dan tidak bisa ditoleransi. Semuanya masih belum dibilas dengan benar.',
          type: 'danger'
        },
        {
          title: 'Tidak memenuhi kriteria mutu penerimaan pabrik',
          desc: 'Material berpotensi merusak mesin pencacah dan mencemari tumpukan material lain di pabrik daur ulang.',
          type: 'danger'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1532996122724-e3c3fa9a0d35?w=300&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1611288557565-d227b92f7204?w=300&auto=format&fit=crop&q=80'
      ]
    }
  };

  // Find detail data: prioritizing location state if passed, then database lookup
  const matchedDetail = historyDatabase[currentId] || 
    (location.state?.item ? {
      ...historyDatabase['#HC-78654'],
      id: location.state.item.id,
      date: location.state.item.date,
      status: location.state.item.status,
      statusType: location.state.item.statusType || (
        location.state.item.status === 'Diterima Penuh' ? 'success' :
        location.state.item.status === 'Diterima Sebagian' ? 'warning' : 'danger'
      ),
      weight: location.state.item.weight
    } : historyDatabase['#HC-78654']);

  const isSuccess = matchedDetail.statusType === 'success' || matchedDetail.status === 'Diterima Penuh';
  const isWarning = matchedDetail.statusType === 'warning' || matchedDetail.status === 'Diterima Sebagian';
  const isDanger = matchedDetail.statusType === 'danger' || matchedDetail.status === 'Ditolak';

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(ROUTES.history || '/dashboard/riwayat')}
            className="size-10 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center transition-colors text-neutral-900 shadow-2xs font-bold cursor-pointer"
            aria-label="Kembali ke Riwayat"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <Link to={ROUTES.dashboard} className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-10 sm:h-11 w-auto object-contain" />
          </Link>

          <Link to={ROUTES.dashboard} className="text-xs font-extrabold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full border border-neutral-300 transition-colors">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-xl px-4 py-6 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Detail Setoran</h1>
          <span className="text-xs font-mono font-bold text-neutral-700 bg-neutral-200 px-3 py-1 rounded-full">
            {matchedDetail.id}
          </span>
        </div>

        {/* Status Banner Card */}
        <div className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
          isSuccess 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
            : isWarning 
            ? 'bg-amber-50 border-amber-200 text-amber-950' 
            : 'bg-red-50 border-red-200 text-red-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isSuccess 
                ? 'bg-brand-green text-ink' 
                : isWarning 
                ? 'bg-amber-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              <span className={`size-2 rounded-full ${isSuccess ? 'bg-ink' : 'bg-white'} animate-pulse`} />
              {matchedDetail.status}
            </span>
            <span className="text-xs font-mono opacity-80">ID : {matchedDetail.id}</span>
          </div>

          <h2 className="text-lg font-bold mt-2">
            {isSuccess 
              ? 'Setoran Lolos Verifikasi Penuh' 
              : isWarning 
              ? 'Penyesuaian Kualitas Setoran' 
              : 'Setoran Ditolak Petugas'}
          </h2>
          <p className="text-xs leading-relaxed opacity-90">
            Diperiksa oleh Petugas Armada <strong className="font-semibold">{matchedDetail.officer}</strong> di {matchedDetail.address} pada <strong className="font-semibold">{matchedDetail.date}</strong>
          </p>
          <p className="text-xs font-semibold pt-1">
            {matchedDetail.summaryMessage}
          </p>
        </div>

        {/* Bobot & Poin Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <p className="text-xs text-neutral-500 font-medium flex items-center justify-between">
              Bobot Diterima <Trash2 className="size-4 text-brand-green" />
            </p>
            <p className="text-3xl font-extrabold text-neutral-900 mt-2">
              {matchedDetail.weight.split(' ')[0]} <span className="text-sm font-normal text-neutral-500">kg</span>
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <p className="text-xs text-neutral-500 font-medium flex items-center justify-between">
              Poin Diterima {isSuccess ? <Sparkles className="size-4 text-brand-green" /> : isWarning ? <CheckCircle2 className="size-4 text-brand-green" /> : <XCircle className="size-4 text-red-500" />}
            </p>
            <p className={`text-3xl font-extrabold mt-2 ${isDanger ? 'text-neutral-400' : 'text-brand-green'}`}>
              {matchedDetail.points}
            </p>
          </div>
        </div>

        {/* Rincian Sampah */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 className="text-sm font-bold text-neutral-900">Rincian Sampah</h2>
          <div className="space-y-3 divide-y divide-neutral-100">
            {matchedDetail.items.map((item, index) => (
              <div key={index} className={`flex items-center justify-between ${index > 0 ? 'pt-3' : ''}`}>
                <div>
                  <p className="text-xs font-bold text-neutral-900">{item.name}</p>
                  <p className="text-[11px] text-neutral-500">{item.detail}</p>
                </div>
                <p className="text-xs font-bold text-neutral-900 font-mono">{item.weight}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-medium">
            <span className="text-neutral-500">Total berat</span>
            <span className="font-bold text-neutral-900 font-mono">{matchedDetail.totalWeight}</span>
          </div>
        </div>

        {/* Catatan Pemeriksaan Sampah */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              {isSuccess ? (
                <CheckCircle2 className="size-4 text-brand-green" />
              ) : isWarning ? (
                <AlertTriangle className="size-4 text-amber-500" />
              ) : (
                <XCircle className="size-4 text-red-500" />
              )}
              Catatan Pemeriksaan Sampah
            </h2>
            <span className="text-xs text-neutral-400">
              {isSuccess ? 'Lolos verifikasi' : `${matchedDetail.findingsCount} temuan`}
            </span>
          </div>

          <div className="space-y-3">
            {matchedDetail.inspectionNotes.map((note, index) => {
              const isNoteSuccess = note.type === 'success';
              const isNoteWarning = note.type === 'warning';

              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-2xl border text-xs space-y-1 ${
                    isNoteSuccess 
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                      : isNoteWarning 
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950' 
                      : 'bg-red-50/70 border-red-200 text-red-950'
                  }`}
                >
                  <p className="font-bold">{note.title}</p>
                  <p className="text-[11px] opacity-90 leading-relaxed">{note.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bukti Foto Petugas */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">Bukti Foto Petugas</h2>
            <span className="text-xs text-neutral-400">{matchedDetail.photos.length} foto terlampir</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {matchedDetail.photos.map((photoUrl, index) => (
              <div key={index} className="h-32 rounded-2xl bg-neutral-200 overflow-hidden border border-neutral-100">
                <img 
                  src={photoUrl} 
                  alt={`Bukti ${index + 1}`} 
                  className="h-full w-full object-cover" 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Button Section based on status */}
        <div className="pt-2">
          {isSuccess ? (
            <div className="space-y-3">
              <Link
                to={ROUTES.setoranMain || '/dashboard/setoran'}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-green text-ink py-4 px-6 text-xs sm:text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99]"
              >
                Setor Sampah Lagi <ArrowRight className="size-4" />
              </Link>
              <Link
                to={ROUTES.history || '/dashboard/riwayat'}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white text-neutral-800 border border-neutral-300 py-3.5 px-6 text-xs font-bold hover:bg-neutral-50 transition-colors"
              >
                Kembali ke Riwayat
              </Link>
            </div>
          ) : isWarning ? (
            <div className="space-y-3">
              <Link
                to="/dashboard/riwayat/ambil-ulang"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors shadow-lg active:scale-[0.99]"
              >
                Ambil & Perbaiki Pilihan <ArrowRight className="size-4 text-brand-green" />
              </Link>
              <Link
                to={ROUTES.history || '/dashboard/riwayat'}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white text-neutral-800 border border-neutral-300 py-3.5 px-6 text-xs font-bold hover:bg-neutral-50 transition-colors"
              >
                Kembali ke Riwayat
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/dashboard/riwayat/ambil-ulang"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors shadow-lg active:scale-[0.99]"
              >
                Setor Ulang <ArrowRight className="size-4 text-brand-green" />
              </Link>
              <Link
                to={ROUTES.history || '/dashboard/riwayat'}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white text-neutral-800 border border-neutral-300 py-3.5 px-6 text-xs font-bold hover:bg-neutral-50 transition-colors"
              >
                Kembali ke Riwayat
              </Link>
            </div>
          )}
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
