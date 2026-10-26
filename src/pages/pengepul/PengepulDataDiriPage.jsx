import { useState } from 'react';
import { ArrowLeft, Edit3, Menu, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulDataDiriPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alexander Wijayanto',
    username: 'Alexander',
    phone: '0812-4445-4444',
    email: 'alex@gmail.com'
  });

  const handleAction = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
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

          <h1 className="text-base font-extrabold text-neutral-900">Data Diri</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 space-y-5">
        
        {/* Profile Avatar with Edit Badge */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative">
            <img 
              src="/profil_pengepul/data-diri.jpg" 
              alt="Avatar" 
              className="size-24 rounded-full object-cover border-4 border-emerald-200 shadow-md"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
              }} 
            />
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute bottom-0 right-0 size-8 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50"
            >
              <Edit3 className="size-4 text-neutral-800" />
            </button>
          </div>
        </div>

        {/* Input Fields (exact match with DataDiri.jpg and DataDiri-1.jpg) */}
        <div className="space-y-4 pt-1">
          {/* Nama Lengkap */}
          <div className="space-y-1.5">
            <label className="text-sm font-extrabold text-neutral-900 block">
              Nama Lengkap
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.name}
              placeholder="Contoh: Rudi Tadi"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full rounded-2xl px-4 py-3.5 text-xs text-neutral-900 font-medium transition-all ${
                isEditing
                  ? 'bg-neutral-100 border border-brand-green ring-2 ring-brand-green/20 focus:outline-none'
                  : 'bg-neutral-200/70 border border-neutral-300/80 cursor-default'
              }`}
            />
          </div>

          {/* Nama Penanggung Jawab / Nama Pengguna */}
          <div className="space-y-1.5">
            <label className="text-sm font-extrabold text-neutral-900 block">
              {isEditing ? 'Nama Pengguna' : 'Nama Penanggung Jawab'}
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.username}
              placeholder="Contoh: rudi123"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={`w-full rounded-2xl px-4 py-3.5 text-xs text-neutral-900 font-medium transition-all ${
                isEditing
                  ? 'bg-neutral-100 border border-brand-green ring-2 ring-brand-green/20 focus:outline-none'
                  : 'bg-neutral-200/70 border border-neutral-300/80 cursor-default'
              }`}
            />
          </div>

          {/* No. Handphone */}
          <div className="space-y-1.5">
            <label className="text-sm font-extrabold text-neutral-900 block">
              No. Handphone
            </label>
            <input
              type="tel"
              disabled={!isEditing}
              value={formData.phone}
              placeholder="Contoh: 0812-2222-4444"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full rounded-2xl px-4 py-3.5 text-xs text-neutral-900 font-medium transition-all ${
                isEditing
                  ? 'bg-neutral-100 border border-brand-green ring-2 ring-brand-green/20 focus:outline-none'
                  : 'bg-neutral-200/70 border border-neutral-300/80 cursor-default'
              }`}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-extrabold text-neutral-900 block">
              Email
            </label>
            <input
              type="email"
              disabled={!isEditing}
              value={formData.email}
              placeholder="example@gmail.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full rounded-2xl px-4 py-3.5 text-xs text-neutral-900 font-medium transition-all ${
                isEditing
                  ? 'bg-neutral-100 border border-brand-green ring-2 ring-brand-green/20 focus:outline-none'
                  : 'bg-neutral-200/70 border border-neutral-300/80 cursor-default'
              }`}
            />
          </div>
        </div>

      </main>

      {/* Floating Bottom Bar: Edit or Simpan */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md">
          {isEditing ? (
            <button
              type="button"
              onClick={handleAction}
              className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
            >
              Simpan
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAction}
              className="w-full flex items-center justify-center py-4 rounded-2xl bg-white border border-brand-green text-brand-green text-sm font-extrabold hover:bg-emerald-50 transition-all active:scale-[0.99]"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
