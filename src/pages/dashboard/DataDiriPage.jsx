import { useState } from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function DataDiriPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Budiman Sekti',
    username: 'Budiman',
    phone: '0812-2222-4444',
    email: 'budi@gmail.com'
  });

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center transition-colors text-neutral-900 shadow-2xs font-bold cursor-pointer"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-10 sm:h-11 w-auto object-contain" />
          </Link>

          <Link to="/dashboard" className="text-xs font-extrabold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full border border-neutral-300 transition-colors">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
              alt="Avatar" 
              className="size-24 rounded-full object-cover border-4 border-brand-green/40 shadow" 
            />
            <button 
              type="button"
              className="absolute bottom-0 right-0 size-8 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-50"
            >
              <Edit3 className="size-4 text-brand-green" />
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label htmlFor="name-input" className="text-xs font-bold text-neutral-700 block">Nama Lengkap</label>
            <input
              id="name-input"
              type="text"
              disabled={!isEditing}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900 disabled:opacity-90"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="username-input" className="text-xs font-bold text-neutral-700 block">Nama Pengguna</label>
            <input
              id="username-input"
              type="text"
              disabled={!isEditing}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900 disabled:opacity-90"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone-input" className="text-xs font-bold text-neutral-700 block">No. Handphone</label>
            <input
              id="phone-input"
              type="tel"
              disabled={!isEditing}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900 disabled:opacity-90"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email-input" className="text-xs font-bold text-neutral-700 block">Email</label>
            <input
              id="email-input"
              type="email"
              disabled={!isEditing}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900 disabled:opacity-90"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            {isEditing ? 'Simpan' : 'Edit'}
          </button>
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
