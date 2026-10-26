import { useState } from 'react';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Navigation, 
  MapPin, Check, Menu, Package, Info, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulRuteNavigasiPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showFinishedNotice, setShowFinishedNotice] = useState(false);

  const routePoints = [
    { 
      id: 1, 
      title: 'Rute 1: Rumah Bu Rahayu', 
      name: 'Ibu Rahayu',
      address: 'Jl. Medokan Asri Barat No.14, Gunung Anyar',
      timeDist: '10 min - 1.2 km', 
      mapImg: '/rute/Maps-1.jpg',
      material: 'Plastik PET & Kardus (10.5 kg)'
    },
    { 
      id: 2, 
      title: 'Rute 2: Joko Santoso', 
      name: 'Bapak Joko Santoso',
      address: 'Jl. Candi Jago No. 7, Rungkut',
      timeDist: '15 min - 1.6 km', 
      mapImg: '/rute/Maps-2.jpg',
      material: 'Karton & Bubble Wrap (5.5 kg)'
    },
    { 
      id: 3, 
      title: 'Rute 3: Ibu Siti Nurhaliza', 
      name: 'Ibu Siti Nurhaliza',
      address: 'Jl. Kebangkitan No. 5, Rungkut',
      timeDist: '25 min - 2.0 km', 
      mapImg: '/rute/Maps-3.jpg',
      material: 'Botol Kaca & Kaleng (8.0 kg)'
    },
    { 
      id: 4, 
      title: 'Rute 4: Ahmad Rizky', 
      name: 'Bapak Ahmad Rizky',
      address: 'Jl. Merdeka No. 10, Wonokromo',
      timeDist: '30 min - 2.4 km', 
      mapImg: '/rute/Maps-4.jpg',
      material: 'Kardus Bersih (12.0 kg)'
    },
    { 
      id: 5, 
      title: 'Rute 5: Rina Rahayu', 
      name: 'Ibu Rina Rahayu',
      address: 'Jl. Sejahtera No. 18, Gunung Anyar',
      timeDist: '45 min - 3.5 km', 
      mapImg: '/rute/Maps-5.jpg',
      material: 'Plastik HD & Campur (6.0 kg)'
    },
  ];

  const currentPoint = routePoints.find((p) => p.id === activeStep) || routePoints[0];

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < routePoints.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleCompleteCurrent = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }
    if (activeStep < routePoints.length) {
      setActiveStep(activeStep + 1);
    } else {
      setShowFinishedNotice(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulRoute)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <span className="text-xs font-bold font-mono px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">
            Titik {activeStep} dari {routePoints.length}
          </span>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Screen Container */}
      <main className="flex-grow flex flex-col max-w-md mx-auto w-full relative">
        
        {/* Map View Area */}
        <div className="relative w-full h-[380px] sm:h-[420px] bg-neutral-200 overflow-hidden">
          <img 
            src={currentPoint.mapImg} 
            alt={`Peta ${currentPoint.title}`} 
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={(e) => {
              e.target.src = '/rute/maps-base.jpg';
            }}
          />

          {/* Floating Top Banner: Active Route Target */}
          <div className="absolute top-4 inset-x-4 z-20 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-brand-green text-ink p-3 sm:p-3.5 rounded-2xl shadow-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Navigation className="size-5 text-ink rotate-45" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">
                    Target Aktif
                  </span>
                  <p className="text-sm font-extrabold truncate">
                    {currentPoint.title}
                  </p>
                </div>
              </div>

              <Link
                to={ROUTES.pengepulRouteDetail.replace(':id', currentPoint.id)}
                className="bg-white/90 hover:bg-white text-ink text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm shrink-0 flex items-center gap-1"
              >
                <Package className="size-3.5 text-brand-green" />
                <span>Detail</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Sheet Drawer */}
        <div className="flex-grow bg-white rounded-t-3xl -mt-6 relative z-30 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] border-t border-neutral-200/80 p-5 space-y-4">
          
          {/* Header Controls: Date & Prev/Next Arrows */}
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <span className="text-[11px] font-bold text-neutral-400 block">Jadwal Penjemputan</span>
              <p className="text-sm font-extrabold text-neutral-900">30 Sep 2026, 14:05 WIB</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeStep === 1}
                onClick={handlePrev}
                className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors"
                title="Titik sebelumnya"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                disabled={activeStep === routePoints.length}
                onClick={handleNext}
                className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors"
                title="Titik berikutnya"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Sequential Route Stop List */}
          <div className="space-y-2 pt-1">
            {routePoints.map((point) => {
              const isActive = point.id === activeStep;
              const isCompleted = completedSteps.includes(point.id);

              return (
                <div
                  key={point.id}
                  onClick={() => setActiveStep(point.id)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive 
                      ? 'bg-emerald-50/90 border border-emerald-200/90 shadow-sm' 
                      : 'hover:bg-neutral-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status circle */}
                    <div className="shrink-0">
                      {isCompleted ? (
                        <div className="size-6 rounded-full bg-brand-green text-white flex items-center justify-center">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                      ) : isActive ? (
                        <div className="size-6 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500">
                          {point.id}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className={`text-xs sm:text-sm font-extrabold truncate ${
                        isActive ? 'text-neutral-900' : 'text-neutral-700'
                      }`}>
                        {point.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {point.timeDist}
                      </p>
                    </div>
                  </div>

                  {/* Active navigation icon button */}
                  {isActive && (
                    <Link
                      to={ROUTES.pengepulRouteDetail.replace(':id', point.id)}
                      className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center shadow-md shrink-0 hover:bg-brand-green/90 transition-transform active:scale-95"
                      title="Navigasi ke lokasi"
                    >
                      <Navigation className="size-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selesaikan Titik / Verifikasi Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCompleteCurrent}
              className="w-full py-3.5 rounded-2xl bg-brand-green text-ink text-xs font-extrabold flex items-center justify-center gap-2 shadow-md hover:bg-brand-green/90 transition-all active:scale-[0.99]"
            >
              <CheckCircle2 className="size-4 text-ink" />
              <span>Selesaikan Titik {activeStep} & Lanjut</span>
            </button>
          </div>
        </div>
      </main>

      {/* Finished Modal Notice */}
      {showFinishedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 text-center space-y-4">
            <div className="size-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900">Semua Titik Selesai!</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Luar biasa! Anda telah menyelesaikan seluruh titik penjemputan rute hari ini.
              </p>
            </div>
            <Link
              to={ROUTES.pengepulDashboard}
              className="block w-full py-3.5 rounded-2xl bg-brand-green text-ink text-xs font-extrabold shadow"
            >
              Kembali ke Beranda Pengepul
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

