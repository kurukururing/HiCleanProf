import { useState } from 'react';
import { ArrowLeft, Menu, Package, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function PengepulAturPenerimaanPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    {
      id: 'plastik',
      name: 'Plastik',
      desc: 'Botol PTE, wadah HDPE, gelas, dan kemasan plastik',
      price: 'Rp2.800 - Rp4.200 /kg',
      enabled: false
    },
    {
      id: 'kertas',
      name: 'Kertas',
      desc: 'Kardus, kertas daur ulang, kertas surat, dan kemasan kertas',
      price: 'Rp2.800 - Rp4.200 /kg',
      enabled: false
    },
    {
      id: 'logam',
      name: 'Logam',
      desc: 'Kaleng minuman, kemasan metal, dan alat logam',
      price: 'Rp2.800 - Rp4.200 /kg',
      enabled: false
    },
    {
      id: 'kaca',
      name: 'Kaca',
      desc: 'Botol kaca, wadah kaca, dan kemasan kaca',
      price: 'Rp2.800 - Rp4.200 /kg',
      enabled: false
    }
  ]);

  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, enabled: !cat.enabled } : cat))
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulProfile)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Atur Penerimaan</h1>

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
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900">Atur Penerimaan</h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Atur kategori atau jenis sampah apa saja yang bersedia untuk diambil mitra
          </p>
        </div>

        {/* List of Category Toggle Cards */}
        <div className="space-y-3 pt-1">
          {categories.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                    <Package className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-neutral-900">{item.name}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => toggleCategory(item.id)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                    item.enabled ? 'bg-brand-green' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                      item.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
                <span className="text-neutral-500 font-medium">Kisaran Harga Lapak:</span>
                <span className="font-extrabold text-neutral-900">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-md px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900">Kebijakan Privasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

