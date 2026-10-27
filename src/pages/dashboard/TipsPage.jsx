import { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, XCircle, Sparkles, BookOpen, ShieldCheck, ArrowRight,
  Layers, Info, Check, AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function TipsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('plastik');

  const categories = [
    { id: 'plastik', label: 'Botol PET (Plastik)', icon: '🧴' },
    { id: 'kaleng', label: 'Kaleng & Logam', icon: '🥫' },
    { id: 'kardus', label: 'Kardus & Kertas', icon: '📦' },
    { id: 'kaca', label: 'Kaca & Beling', icon: '🍾' },
  ];

  const contentMap = {
    plastik: {
      categoryBadge: 'Kategori Plastik - Kode #1 PET',
      headline: 'Panduan Pilah : Botol Plastik & PET',
      subDesc: 'Daur ulang bernilai tinggi di Bank Sampah HiClean. Pastikan bersih & pipih agar diterima 100% tanpa adanya pengurangan bobot kotor.',
      anatomy: {
        title: 'Anatomi Botol Plastik',
        parts: [
          { name: 'Tutup botol', desc: 'Boleh dibiarkan atau dicopot terpisah', pos: 'top-right' },
          { name: 'Badan', desc: 'Bilas tuntas hingga bersih & remas pipih', pos: 'bottom-left' },
          { name: 'Label', desc: 'Lepaskan plastik segel untuk kemudahan daur ulang', pos: 'bottom-right' }
        ]
      },
      criteria: {
        title: 'Kriteria Pemeriksaan Pengepul',
        accepted: [
          { title: 'Botol Air Mineral Bening', desc: 'Wadah air minuman kemasan polos, bebas pasir, cairan, dan lumpur' },
          { title: 'Botol Minuman Berwarna', desc: 'Botol sirup/isotonik berwarna transparan (hijau, biru, dll.)' },
          { title: 'Gelas Plastik PP Bening', desc: 'Gelas kemasan air mineral yang telah dilepas segel foil atasnya' }
        ],
        rejected: [
          { title: 'Botol Bekas Minyak Goreng', desc: 'Minyak jelantah merusak mesin pencacah dan mencemari bak cuci daur ulang' },
          { title: 'Plastik Terbakar / Meleleh', desc: 'Plastik yang terbakar mengalami degradasi polimer dan tidak bisa diolah' },
          { title: 'Kemasan Plastik Berlapis Alumunium', desc: 'Bungkus sachet kopi / snack komposit tidak masuk kategori PET' }
        ]
      },
      steps: [
        { num: 1, title: 'Kosongkan Sisa Cairan', desc: 'Tuang tuntas tetesan air. Pengepul tidak akan menimbang volume tambahan dari cairan yang tersisa.' },
        { num: 2, title: 'Lepas Segel & Label', desc: 'Kelupas label plastik merk di sekeliling botol agar mempermudah pemilahan di pabrik pengolah.' },
        { num: 3, title: 'Bilas Singkat', desc: 'Bilas bagian dalam botol jika bekas minuman manis agar tidak mengundang semut dan lalat saat disimpan.' },
        { num: 4, title: 'Pipihkan / Remas Botol', desc: 'Injak atau remas botol hingga kempes agar hemat ruang penyimpanan dan mempermudah pengangkutan armada.' }
      ]
    },
    kaleng: {
      categoryBadge: 'Kategori Logam - Aluminium & Kaleng',
      headline: 'Panduan Pilah : Kaleng & Logam',
      subDesc: 'Material logam memiliki nilai daur ulang tertinggi dan dapat didaur ulang tanpa batas waktu. Pastikan kering dan tidak berkarat parah.',
      anatomy: {
        title: 'Anatomi Kaleng Minuman',
        parts: [
          { name: 'Tutup Tarik (Pull Tab)', desc: 'Biarkan menempel pada kaleng', pos: 'top-right' },
          { name: 'Dinding Kaleng', desc: 'Bilas sisa minuman dan pipihkan', pos: 'bottom-left' },
          { name: 'Dasar Kaleng', desc: 'Pastikan tidak ada endapan gula', pos: 'bottom-right' }
        ]
      },
      criteria: {
        title: 'Kriteria Pemeriksaan Pengepul',
        accepted: [
          { title: 'Kaleng Minuman Bersoda / Isotonik', desc: 'Bahan aluminium tipis, bersih tanpa isi' },
          { title: 'Kaleng Susu / Biskuit', desc: 'Kaleng plat timah yang bersih, kering, dan tidak ada sisa makanan' },
          { title: 'Wadah Aluminium Foil Kering', desc: 'Tray aluminium makanan yang telah dibersihkan dari minyak' }
        ],
        rejected: [
          { title: 'Kaleng Cat / Thinner / Pestisida', desc: 'Kategori B3 berbahaya tidak diterima dalam setoran reguler' },
          { title: 'Kaleng Berkarat Keropos', desc: 'Kaleng yang lapuk atau terkikis karat tidak memenuhi standar lebur pabrik' },
          { title: 'Kaleng Berisi Benda Asing', desc: 'Jangan jadikan kaleng sebagai asbak atau tempat pembuangan puntung' }
        ]
      },
      steps: [
        { num: 1, title: 'Buang Sisa Minuman / Makanan', desc: 'Pastikan kaleng benar-benar kosong dan kering sebelum disimpan.' },
        { num: 2, title: 'Bilas Bagian Dalam', desc: 'Cuci dengan air bersih untuk menghilangkan aroma dan sisa residu.' },
        { num: 3, title: 'Pipihkan Kaleng', desc: 'Injak atau tekan kaleng aluminium hingga gepeng untuk efisiensi ruang karung.' },
        { num: 4, title: 'Simpan di Tempat Kering', desc: 'Kumpulkan dalam wadah kedap air agar tidak berkarat sebelum dijemput mitra.' }
      ]
    },
    kardus: {
      categoryBadge: 'Kategori Kertas - Kardus & Karton Corrugated',
      headline: 'Panduan Pilah : Kardus & Kertas',
      subDesc: 'Kardus dan kertas dokumen sangat dibutuhkan industri daur ulang pulp. Syarat utama: WAJIB KERING dan terbebas dari minyak makanan.',
      anatomy: {
        title: 'Anatomi Kardus Box',
        parts: [
          { name: 'Lakban & Solasi', desc: 'Kupas sebanyak mungkin sebelum dilipat', pos: 'top-right' },
          { name: 'Lipatan Karton', desc: 'Buka lipatan bawah agar menjadi lembaran datar', pos: 'bottom-left' },
          { name: 'Label Kertas Resi', desc: 'Boleh dibiarkan atau dicopot jika sensitif', pos: 'bottom-right' }
        ]
      },
      criteria: {
        title: 'Kriteria Pemeriksaan Pengepul',
        accepted: [
          { title: 'Kardus Box Cokelat (Corrugated)', desc: 'Kardus packing paket kurir, kardus mie instan, kardus elektronik' },
          { title: 'Kertas Arsip & HVS Putih', desc: 'Kertas dokumen, buku tulis bekas tanpa cover plastik/kawat' },
          { title: 'Koran & Majalah Bekas', desc: 'Koran harian dalam keadaan rapi dan terikat' }
        ],
        rejected: [
          { title: 'Kardus Pizza / Bekas Minyak', desc: 'Minyak lemak mengikat serat kertas dan merusak adonan bubur daur ulang' },
          { title: 'Kertas Basah / Berjamur', desc: 'Menurunkan harga drastis dan berisiko ditolak mitra penjemput' },
          { title: 'Kertas Thermal Struk Belanja', desc: 'Mengandung lapisan BPA kimia dan tidak bisa didaur ulang konvensional' }
        ]
      },
      steps: [
        { num: 1, title: 'Bongkar & Ratakan Box', desc: 'Potong atau buka lakban sehingga kardus menjadi lembaran pipih.' },
        { num: 2, title: 'Lepaskan Busa / Styrofoam', desc: 'Pisahkan plastik bubble wrap dan styrofoam dari dalam kardus.' },
        { num: 3, title: 'Tumpuk Rapi & Ikat', desc: 'Tumpuk kardus seukuran lalu ikat dengan tali rafia agar mudah ditimbang.' },
        { num: 4, title: 'Jaga Selalu Kering', desc: 'Jangan letakkan langsung di tanah basah atau terkena tempias air hujan.' }
      ]
    },
    kaca: {
      categoryBadge: 'Kategori Kaca - Botol & Wadah Beling',
      headline: 'Panduan Pilah : Kaca & Botol Beling',
      subDesc: 'Kaca dapat dilebur berulang kali menjadi botol baru. Keamanan penanganan adalah prioritas nomor satu saat pengumpulan.',
      anatomy: {
        title: 'Anatomi Botol Kaca',
        parts: [
          { name: 'Tutup Seng / Plastik', desc: 'Lepaskan dan pilah ke kategori logam/plastik', pos: 'top-right' },
          { name: 'Badan Kaca', desc: 'Bilas bersih, pastikan tidak ada retak tajam', pos: 'bottom-left' },
          { name: 'Dasar Botol', desc: 'Tebal & kokoh, aman disusun berdiri', pos: 'bottom-right' }
        ]
      },
      criteria: {
        title: 'Kriteria Pemeriksaan Pengepul',
        accepted: [
          { title: 'Botol Sirup & Kecap Kaca', desc: 'Botol kecap, saus, dan sirup utuh yang telah dibilas' },
          { title: 'Botol Minuman Energi & Selai', desc: 'Jar selai beling dan botol suplemen kaca utuh' },
          { title: 'Botol Parfum Bening', desc: 'Wadah botol parfum yang telah habis isinya' }
        ],
        rejected: [
          { title: 'Lampu Neon / Bohlam CFL', desc: 'Mengandung merkuri dan tergolong limbah B3 khusus' },
          { title: 'Kaca Cermin / Jendela Pyrex', desc: 'Kaca borosilikat memiliki titik lebur berbeda dengan botol wadah' },
          { title: 'Pecahan Kaca Berceceran', desc: 'Berbahaya bagi kurir dan mitra penimbang armada' }
        ]
      },
      steps: [
        { num: 1, title: 'Kuras dan Bilas Residu', desc: 'Hilangkan sisa kecap, minyak, atau saus dengan bilasan air mengalir.' },
        { num: 2, title: 'Lepas Tutup Logam / Plastik', desc: 'Pisahkan tutup botol ke kantong pilahan yang sesuai.' },
        { num: 3, title: 'Susun Berdiri di Kardus', desc: 'Gunakan kardus bersekat untuk mencegah botol saling berbenturan dan pecah.' },
        { num: 4, title: 'Beri Label Hati-Hati Kaca', desc: 'Tandai wadah agar kurir penjemput dapat mengangkat dengan aman.' }
      ]
    }
  };

  const activeContent = contentMap[activeCategory] || contentMap.plastik;

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="size-10 rounded-full bg-brand-green text-white hover:bg-emerald-600 flex items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="size-5 stroke-[2.5]" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 w-auto" />
          </Link>

          <Link to="/dashboard" className="text-xs font-bold text-brand-green hover:underline">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 space-y-6">
        {/* Title Header */}
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold mb-2">
            {activeContent.categoryBadge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-heading">
            {activeContent.headline}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-body">
            {activeContent.subDesc}
          </p>
        </div>

        {/* Category Pill Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md scale-100 ring-2 ring-brand-green/30'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-brand-green/50 hover:bg-neutral-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Anatomi / Ilustrasi Pilah Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-neutral-900 font-heading">
              {activeContent.anatomy.title}
            </h2>
            <span className="text-[11px] text-brand-green font-bold bg-brand-green/10 px-2.5 py-0.5 rounded-full">
              Panduan Standar
            </span>
          </div>
          
          <div className="relative min-h-[220px] sm:min-h-[240px] w-full rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/60 border border-neutral-100 flex items-center justify-center p-4 overflow-hidden">
            {/* Visual Center Mockup */}
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
              <div className="size-20 rounded-3xl bg-white shadow-md border border-neutral-200 flex items-center justify-center text-4xl">
                {categories.find(c => c.id === activeCategory)?.icon || '♻️'}
              </div>
              <p className="text-xs font-extrabold text-neutral-800">
                Pilah Tepat, Poin Maksimal
              </p>
              <p className="text-[11px] text-neutral-500 max-w-xs">
                Perhatikan setiap bagian material agar tidak terkena potongan grade saat verifikasi timbang.
              </p>
            </div>

            {/* Floating annotations */}
            <div className="absolute top-3 right-3 bg-brand-green text-ink px-3 py-1.5 rounded-2xl shadow-sm text-xs font-bold max-w-[150px] border border-emerald-400">
              {activeContent.anatomy.parts[0]?.name}
              <span className="block text-[10px] font-medium opacity-90 leading-tight mt-0.5">
                {activeContent.anatomy.parts[0]?.desc}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 bg-brand-green text-ink px-3 py-1.5 rounded-2xl shadow-sm text-xs font-bold max-w-[150px] border border-emerald-400">
              {activeContent.anatomy.parts[1]?.name}
              <span className="block text-[10px] font-medium opacity-90 leading-tight mt-0.5">
                {activeContent.anatomy.parts[1]?.desc}
              </span>
            </div>
          </div>
        </div>

        {/* Kriteria Pemeriksaan Pengepul */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-neutral-900 font-heading">
              {activeContent.criteria.title}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Standar baku penerimaan mitra pengepul dan pabrik daur ulang
            </p>
          </div>

          <div className="space-y-3">
            {/* Accepted Section */}
            <p className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 pt-1">
              <Check className="size-4 text-brand-green" /> Diterima (Poin 100%)
            </p>
            {activeContent.criteria.accepted.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <CheckCircle2 className="size-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Rejected Section */}
            <p className="text-xs font-extrabold text-red-700 uppercase tracking-wider flex items-center gap-1.5 pt-3">
              <AlertTriangle className="size-4 text-red-500" /> Ditolak / Dikenakan Potongan
            </p>
            {activeContent.criteria.rejected.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50/70 border border-red-200/80">
                <XCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Langkah Olah di Rumah */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-neutral-900 font-heading tracking-tight">
              4 Langkah Mudah di Rumah
            </h2>
            <span className="text-xs text-neutral-500">Cepat & Higienis</span>
          </div>

          <div className="space-y-3">
            {activeContent.steps.map((st) => (
              <div key={st.num} className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/85 flex items-start gap-4">
                <div className="size-10 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs">
                  {st.num}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{st.title}</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Setor Sekarang */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-brand-green text-ink flex items-center justify-center font-bold">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Sampahmu Sudah Siap Disetor?</h3>
              <p className="text-xs text-neutral-400">Panggil armada HiClean untuk penjemputan sekarang</p>
            </div>
          </div>
          <Link
            to="/dashboard/setoran"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99]"
          >
            <span>Mulai Penjemputan Setoran</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
