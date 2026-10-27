import { Check, ArrowLeft, Menu, Navigation, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function PengepulRuteBerhasilPage() {
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Rute 1: Rumah Bu Rahayu', status: 'Dalam Proses', active: true },
    { id: 2, title: 'Rute 2: Joko Santoso', status: 'Dalam Proses', active: false },
    { id: 3, title: 'Rute 3: Ibu Siti Nurhaliza', status: 'Dalam Proses', active: false },
    { id: 4, title: 'Rute 4: Ahmad Rizky', status: 'Dalam Proses', active: false },
    { id: 5, title: 'Rute 5: Rina Rahayu', status: 'Dalam Proses', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-36">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulRouteAtur)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-6">
        
        {/* Success Icon & Title */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
          <div className="size-24 rounded-full bg-emerald-100/70 border-4 border-emerald-200/60 flex items-center justify-center shadow-inner animate-in zoom-in-75 duration-300">
            <div className="size-16 rounded-full bg-brand-green flex items-center justify-center text-white shadow-md">
              <Check className="size-9 stroke-[3]" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            Rute Berhasil Dibuat
          </h1>
        </div>

        {/* Map Preview Card */}
        <div className="rounded-3xl overflow-hidden border border-neutral-200/80 bg-white shadow-sm">
          <div className="relative h-56 sm:h-64 w-full bg-neutral-100">
            <InteractiveMap
              center={[-7.3205, 112.7845]}
              zoom={15}
              markers={[
                { id: '1', position: [-7.3190, 112.7830], type: 'stop', number: '1', active: true, title: 'Rute 1: Rumah Bu Rahayu' },
                { id: '2', position: [-7.3215, 112.7852], type: 'stop', number: '2', title: 'Rute 2: Joko Santoso' },
                { id: '3', position: [-7.3235, 112.7880], type: 'stop', number: '3', title: 'Rute 3: Ibu Siti Nurhaliza' },
                { id: '4', position: [-7.3175, 112.7865], type: 'stop', number: '4', title: 'Rute 4: Ahmad Rizky' },
                { id: '5', position: [-7.3160, 112.7838], type: 'stop', number: '5', title: 'Rute 5: Rina Rahayu' }
              ]}
              routePath={[
                [-7.3190, 112.7830],
                [-7.3215, 112.7852],
                [-7.3235, 112.7880],
                [-7.3175, 112.7865],
                [-7.3160, 112.7838]
              ]}
              height="100%"
            />
          </div>
        </div>

        {/* Urutan Pickup Timeline Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/80 space-y-4">
          <h2 className="text-base font-extrabold text-neutral-900">
            Urutan Pickup
          </h2>

          <div className="space-y-0 pl-1 pt-1">
            {steps.map((item, index) => {
              const isLast = index === steps.length - 1;

              return (
                <div key={item.id} className="relative flex items-start gap-4 pb-6 last:pb-1">
                  {/* Vertical connecting line */}
                  {!isLast && (
                    <div 
                      className={`absolute left-[13px] top-7 bottom-0 w-0.5 ${
                        item.active ? 'bg-brand-green' : 'bg-neutral-200'
                      }`} 
                    />
                  )}

                  {/* Indicator Dot / Checkmark */}
                  <div className="relative z-10 shrink-0">
                    {item.active ? (
                      <div className="size-7 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm">
                        <Check className="size-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="size-7 rounded-full bg-neutral-200 flex items-center justify-center" />
                    )}
                  </div>

                  {/* Step Title & Status */}
                  <div className="space-y-0.5 pt-0.5">
                    <p className="text-sm font-bold text-neutral-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {item.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md space-y-2.5">
          <Link
            to={ROUTES.pengepulRouteNavigasi}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Navigasi
          </Link>
          <Link
            to={ROUTES.pengepulDashboard}
            className="w-full flex items-center justify-center py-3.5 rounded-2xl bg-white border border-brand-green text-brand-green text-sm font-extrabold hover:bg-emerald-50 transition-all"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

