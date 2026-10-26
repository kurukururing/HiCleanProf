import { useState } from 'react';
import { 
  ArrowLeft, Home, Building2, Store, Check, 
  MapPin, Scale, Menu, Search, Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulPilihRutePage() {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState('jarak'); // 'jarak' | 'berat'
  const [selectedIds, setSelectedIds] = useState([1, 2, 3]);

  const rawListJarak = [
    { id: 1, name: 'Kedai Kopi ABC', address: 'Jl. Merdeka No. 10', weight: '500g', distance: '2km', weightVal: 0.5, distVal: 2 },
    { id: 2, name: 'Taman Kota', address: 'Jl. Sejahtera No. 15', weight: '8kg', distance: '1.5km', weightVal: 8, distVal: 1.5 },
    { id: 3, name: 'Restoran Makan Enak', address: 'Jl. Cinta No. 20', weight: '1kg', distance: '3km', weightVal: 1, distVal: 3 },
    { id: 4, name: 'Supermarket Sumber Berkah', address: 'Jl. Harmoni No. 5', weight: '2kg', distance: '4km', weightVal: 2, distVal: 4 },
    { id: 5, name: 'Perpustakaan Umum', address: 'Jl. Ilmu No. 25', weight: '3.5kg', distance: '2.5km', weightVal: 3.5, distVal: 2.5 },
    { id: 6, name: 'Gym Fit & Healthy', address: 'Jl. Olahraga No. 30', weight: '4kg', distance: '3.5km', weightVal: 4, distVal: 3.5 },
    { id: 7, name: 'Klinik Sehat', address: 'Jl. Kesehatan No. 12', weight: '5kg', distance: '1km', weightVal: 5, distVal: 1 },
    { id: 8, name: 'Kedai Bakso Mantap', address: 'Jl. Rasa No. 8', weight: '6.5kg', distance: '2km', weightVal: 6.5, distVal: 2 },
  ];

  const rawListBerat = [
    { id: 1, name: 'Kedai Kopi ABC', address: 'Jl. Merdeka No. 10', weight: '500g', distance: '2km', weightVal: 0.5, distVal: 2 },
    { id: 2, name: 'Taman Kota', address: 'Jl. Sejahtera No. 15', weight: '8kg', distance: '1.5km', weightVal: 8, distVal: 1.5 },
    { id: 3, name: 'Restoran Makan Enak', address: 'Jl. Cinta No. 20', weight: '1kg', distance: '3km', weightVal: 1, distVal: 3 },
    { id: 9, name: 'Kedai Roti Bakar', address: 'Jl. Pagi No. 5', weight: '500g', distance: '1.5km', weightVal: 0.5, distVal: 1.5 },
    { id: 10, name: 'Cafe Kopi Mantap', address: 'Jl. Senja No. 15', weight: '2kg', distance: '4km', weightVal: 2, distVal: 4 },
  ];

  const displayList = activeSort === 'jarak' ? rawListJarak : rawListBerat;

  const toggleSelect = (id) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    // Navigate back to Atur Rute
    navigate(ROUTES.pengepulRouteAtur);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulRouteAtur)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <h1 className="text-lg font-extrabold text-neutral-900">
            {activeSort === 'jarak' ? 'Pilih Rute' : 'Urutkan Rute'}
          </h1>

          <button
            type="button"
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-5 sm:px-6 space-y-5">
        
        {/* Section: Urutkan Berdasarkan */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Urutkan Berdasarkan
          </h2>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveSort('jarak')}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeSort === 'jarak'
                  ? 'bg-brand-green text-ink shadow-sm'
                  : 'bg-emerald-100/70 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <span>Jarak Terdekat</span>
              <span className={`size-5 rounded-full text-[11px] flex items-center justify-center ${
                activeSort === 'jarak' ? 'bg-neutral-900 text-white' : 'bg-emerald-800 text-white'
              }`}>
                8
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSort('berat')}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeSort === 'berat'
                  ? 'bg-brand-green text-ink shadow-sm'
                  : 'bg-emerald-100/70 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <span>Setoran Terberat</span>
              <span className={`size-5 rounded-full text-[11px] flex items-center justify-center ${
                activeSort === 'berat' ? 'bg-neutral-900 text-white' : 'bg-emerald-800 text-white'
              }`}>
                5
              </span>
            </button>
          </div>
        </div>

        {/* Section: Permintaan Diterima */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-neutral-900">
              Permintaan Diterima
            </h2>
            <span className="text-xs text-neutral-500 font-medium">
              {selectedIds.length} dipilih
            </span>
          </div>

          <div className="space-y-2.5">
            {displayList.map((item) => {
              const isSelected = selectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id)}
                  className={`rounded-3xl bg-white p-4 sm:p-5 shadow-sm border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected 
                      ? 'border-brand-green ring-2 ring-brand-green/20' 
                      : 'border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="size-11 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                      <Home className="size-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-500 truncate">
                        {item.address}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-semibold text-neutral-700 pt-0.5">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Scale className="size-3 text-neutral-400" /> {item.weight}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <MapPin className="size-3 text-neutral-400" /> {item.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Radio / Check Circle */}
                  <div className="shrink-0 pl-2">
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-brand-green border-brand-green text-white'
                        : 'border-neutral-300 bg-white'
                    }`}>
                      {isSelected && <Check className="size-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Bottom Bar: Selanjutnya */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={handleNext}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Selanjutnya ({selectedIds.length} Titik)
          </button>
        </div>
      </div>
    </div>
  );
}

