import { useState } from 'react';
import { 
  ArrowLeft, Menu, CheckCircle2, Package, Star, 
  MapPin, Plus, Minus, Upload, Camera, Sun, Sunset, Sunrise, Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulPengajuanDistribusiPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [selectedFactory, setSelectedFactory] = useState(1);
  const [weight, setWeight] = useState(50);
  const [materialCondition, setMaterialCondition] = useState('bersih');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [selectedDate, setSelectedDate] = useState('19');
  const [selectedSession, setSelectedSession] = useState('siang');
  const [note, setNote] = useState('');

  // Step 1 Data
  const materials = [
    {
      id: 1,
      name: 'Botol Plastik PET',
      grade: 'Grade A - Bal kompresi',
      weight: '120kg',
      img: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Botol Kaca',
      grade: 'Grade B - Non-pecah',
      weight: '120kg',
      img: 'https://images.unsplash.com/photo-1582803824122-f25becf36ad8?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Wadah Styrofoam',
      grade: 'Grade A - Isolasi',
      weight: '120kg',
      img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Kardus Daur Ulang',
      grade: 'Grade A - Kuat',
      weight: '120kg',
      img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=150&auto=format&fit=crop&q=80'
    }
  ];

  // Step 2 Data
  const factories = [
    {
      id: 1,
      name: 'PT Maharta Daur Plastik Indo',
      loc: 'Cikarang, Jawa Barat - 20km',
      cap: '48.2 kg',
      rating: '4.9',
      logo: 'M'
    },
    {
      id: 2,
      name: 'PT Sinar Daur Ulang',
      loc: 'Bandung, Jawa Barat - 35km',
      cap: '60.5 kg',
      rating: '4.7',
      logo: 'S'
    },
    {
      id: 3,
      name: 'CV Eco Plastik',
      loc: 'Semarang, Jawa Tengah - 50km',
      cap: '30.8 kg',
      rating: '4.8',
      logo: 'E'
    },
    {
      id: 4,
      name: 'PT Ramah Lingkungan',
      loc: 'Malang, Jawa Timur - 40km',
      cap: '55.0 kg',
      rating: '4.6',
      logo: 'R'
    }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate(ROUTES.pengepulMaterialSukses);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(ROUTES.pengepulMaterial);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={handleBack}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Pengajuan Distribusi</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 space-y-4">
        
        {/* Step Progress Bar Top */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {currentStep === 1 && 'Pilih Material'}
              {currentStep === 2 && 'Pilih Mitra'}
              {currentStep === 3 && 'Detail Muatan'}
              {currentStep === 4 && 'Konfirmasi'}
            </span>
            <span className="text-xs font-bold text-neutral-700">
              Langkah {currentStep} dari 4
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div 
                key={stepNum} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  stepNum <= currentStep ? 'bg-brand-green' : 'bg-neutral-200'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Pilih Material */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-extrabold text-neutral-900">Pilih Material Distribusi</h2>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                Pilih stok material terpilah di gudang lapak yang telah memenuhi kuota minimal untuk pengiriman
              </p>
            </div>

            {/* Kapasitas status card */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-neutral-900">342.2</span>
                  <span className="text-xs font-semibold text-neutral-400">/ 500kg</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Kapasitas 50%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full rounded-full bg-brand-green" style={{ width: '68%' }} />
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
                <CheckCircle2 className="size-4 text-brand-green" />
                <span>Sisa ruang aman : 200 kg</span>
              </div>
            </div>

            {/* List Material */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-neutral-900">List Material</h3>
                <span className="text-xs text-neutral-400">{materials.length} Jenis Material</span>
              </div>

              {materials.map((item) => {
                const isSelected = selectedMaterial === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMaterial(item.id)}
                    className={`rounded-3xl bg-white p-4 shadow-sm border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected ? 'border-brand-green ring-2 ring-brand-green/20' : 'border-neutral-200/80 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="size-14 rounded-2xl object-cover shrink-0 border border-neutral-100" 
                      />
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-sm font-extrabold text-neutral-900 truncate">{item.name}</h4>
                        <p className="text-xs text-neutral-500 truncate">{item.grade}</p>
                        <p className="text-sm font-extrabold text-neutral-900 pt-0.5">{item.weight}</p>
                      </div>
                    </div>

                    <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-white'
                    }`}>
                      {isSelected && <div className="size-2 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Pilih Mitra */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-extrabold text-neutral-900">Pilih Pabrik Pengolah</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Pilih mitra daur ulang terdekat dengan rating dan kapasitas penerimaan terbaik
              </p>
            </div>

            <div className="space-y-3">
              {factories.map((fac) => {
                const isSelected = selectedFactory === fac.id;
                return (
                  <div
                    key={fac.id}
                    onClick={() => setSelectedFactory(fac.id)}
                    className={`rounded-3xl bg-white p-5 shadow-sm border transition-all cursor-pointer space-y-3 ${
                      isSelected ? 'border-brand-green ring-2 ring-brand-green/20' : 'border-neutral-200/80 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-extrabold text-base shrink-0">
                          {fac.logo}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-neutral-900">{fac.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                            <MapPin className="size-3 text-neutral-400 shrink-0" />
                            <span>{fac.loc}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-white'
                      }`}>
                        {isSelected && <div className="size-2 rounded-full bg-white" />}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-100 text-xs">
                      <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/70">
                        <span className="text-[10px] text-neutral-500 block">Kapasitas Terima</span>
                        <p className="font-extrabold text-neutral-900 text-sm mt-0.5">{fac.cap}</p>
                      </div>
                      <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/70">
                        <span className="text-[10px] text-neutral-500 block">Rating</span>
                        <p className="font-extrabold text-neutral-900 text-sm mt-0.5 flex items-center gap-1">
                          <Star className="size-3.5 text-amber-500 fill-amber-500" />
                          <span>{fac.rating}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Detail Muatan */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Berat Card */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-neutral-900">Estimasi Berat Kirim</h3>
                <span className="text-xs text-neutral-400 font-medium">Minimal 25 kg</span>
              </div>

              {/* Counter Input */}
              <div className="bg-neutral-100/80 p-3 rounded-2xl flex items-center justify-between border border-neutral-200/60">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-neutral-700">
                    <Package className="size-5" />
                  </div>
                  <span className="text-xl font-extrabold text-neutral-900">{weight} kg</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWeight(Math.max(25, weight - 5))}
                    className="size-9 rounded-full bg-white shadow-sm hover:bg-neutral-50 flex items-center justify-center text-neutral-700"
                  >
                    <Minus className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeight(weight + 5)}
                    className="size-9 rounded-full bg-brand-green text-white shadow hover:bg-brand-green/90 flex items-center justify-center"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              {/* Quick weight chips */}
              <div className="grid grid-cols-3 gap-2">
                {[25, 50, 75].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setWeight(preset)}
                    className={`py-2 rounded-2xl text-xs font-bold border transition-colors ${
                      weight === preset
                        ? 'border-brand-green bg-emerald-50 text-emerald-800'
                        : 'border-brand-green/50 text-brand-green hover:bg-emerald-50/50'
                    }`}
                  >
                    {preset} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Kondisi Material Radio */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
              <h3 className="text-sm font-extrabold text-neutral-900">Kondisi Material</h3>

              {[
                { id: 'bersih', title: 'Sudah bersih', desc: 'Material sudah terpilah dan bersih' },
                { id: 'residu', title: 'Terdapat sedikit residu', desc: 'Material sudah terpilah namun ada sedikit residu' },
                { id: 'kotor', title: 'Kotor dan belum terpilah', desc: 'Material masih kotor dan belum terpilah keseluruhan' }
              ].map((opt) => {
                const isSelected = materialCondition === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setMaterialCondition(opt.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected ? 'border-brand-green bg-emerald-50/50' : 'border-emerald-200/60 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-extrabold text-neutral-900">{opt.title}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{opt.desc}</p>
                    </div>
                    <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-white'
                    }`}>
                      {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Foto Bukti Sampah */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900">Foto Bukti Sampah</h3>
                <p className="text-[11px] text-neutral-500">Verifikasi visual untuk percepatan sortir di bank sampah</p>
              </div>

              <Link
                to={ROUTES.pengepulMaterialFoto}
                className="w-full h-32 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-brand-green bg-neutral-100/70 hover:bg-emerald-50/30 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-neutral-600">
                  <Upload className="size-5" />
                </div>
                <span className="text-xs font-bold text-neutral-600">Unggah foto atau ambil kamera</span>
              </Link>
            </div>
          </div>
        )}

        {/* STEP 4: Konfirmasi */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Lokasi Pickup with Map */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-brand-green" />
                  <h3 className="text-sm font-extrabold text-neutral-900">Lokasi Pickup</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Terverifikasi
                </span>
              </div>

              <div className="relative h-28 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
                <img 
                  src="/material/detail-distribusi.jpg" 
                  alt="Lokasi Pickup" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = '/rute/maps-base.jpg';
                  }}
                />
              </div>

              <p className="text-xs font-bold text-neutral-800">
                Jl. Medokan Asri Timur no.14, Gunung Anyar
              </p>
            </div>

            {/* Tanggal Pickup Selector */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-brand-green" />
                <h3 className="text-sm font-extrabold text-neutral-900">Tanggal Pickup</h3>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { day: 'Hari ini', date: '18', status: 'Penuh', available: false },
                  { day: 'Besok', date: '19', status: 'Tersedia', available: true },
                  { day: 'Minggu', date: '20', status: 'Penuh', available: false },
                  { day: 'Senin', date: '21', status: 'Penuh', available: false },
                ].map((d) => {
                  const isSelected = selectedDate === d.date;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      disabled={!d.available}
                      onClick={() => setSelectedDate(d.date)}
                      className={`p-3 rounded-2xl transition-all border ${
                        isSelected && d.available
                          ? 'bg-brand-green text-ink border-brand-green shadow-md'
                          : d.available
                          ? 'bg-white border-neutral-200 hover:border-brand-green'
                          : 'bg-neutral-100/60 border-neutral-200/50 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-[10px] font-medium block">{d.day}</span>
                      <p className="text-lg font-extrabold mt-0.5">{d.date}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        isSelected && d.available
                          ? 'bg-ink text-white'
                          : d.available
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        {d.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sesi Pickup */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
              <h3 className="text-sm font-extrabold text-neutral-900">Sesi Pickup</h3>

              {[
                { id: 'pagi', title: 'Sesi Pagi', time: '08:30 – 10:30 WIB', icon: Sunrise },
                { id: 'siang', title: 'Sesi Siang', time: '12:00 – 14:00 WIB', icon: Sun },
                { id: 'sore', title: 'Sesi Sore', time: '15:00 – 17:00 WIB', icon: Sunset },
              ].map((ses) => {
                const Icon = ses.icon;
                const isSelected = selectedSession === ses.id;
                return (
                  <div
                    key={ses.id}
                    onClick={() => setSelectedSession(ses.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected ? 'border-brand-green bg-emerald-50/50' : 'border-neutral-200/80 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
                        <Icon className="size-4 text-brand-green" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-neutral-900">{ses.title}</p>
                        <p className="text-[11px] text-neutral-500">{ses.time}</p>
                      </div>
                    </div>
                    <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-white'
                    }`}>
                      {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Catatan Pengirim */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-2">
              <h3 className="text-sm font-extrabold text-neutral-900">Catatan Pengirim</h3>
              <textarea
                rows={2}
                placeholder="Contoh: Jangan dibanting, simpan di gerbang samping lapak"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-2xl bg-neutral-100/80 border border-neutral-200/80 p-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              />
            </div>
          </div>
        )}

      </main>

      {/* Floating Bottom Action Buttons */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-3.5 rounded-2xl bg-white border border-neutral-300 text-neutral-700 text-xs font-extrabold hover:bg-neutral-50 transition-colors"
          >
            ← Kembali
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-grow py-3.5 rounded-2xl bg-brand-green text-ink text-xs font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99]"
          >
            {currentStep === 4 ? 'Konfirmasi Pickup' : `Lanjut (Langkah ${currentStep + 1} / 4)`}
          </button>
        </div>
      </div>
    </div>
  );
}

