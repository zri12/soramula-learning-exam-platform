import { useState } from 'react';
import { Search, CheckCircle, BookOpen, Play, FileText, ChevronRight, TrendingUp, Clock } from 'lucide-react';
import { useApp } from '../../contexts';

const MATERI_DATA = [
  { id: 1, title: 'Sel dan Organelnya', mapel: 'Biologi', desc: 'Mempelajari struktur sel dan fungsi organelnya.', done: true, icon: '🔬', type: 'PDF', pages: 24 },
  { id: 2, title: 'Genetika Dasar', mapel: 'Biologi', desc: 'Pewarisan sifat dan hukum Mendel.', done: false, icon: '🧬', type: 'Video', pages: 18 },
  { id: 3, title: 'Turunan Fungsi Aljabar', mapel: 'Matematika', desc: 'Konsep turunan dan penerapannya.', done: false, icon: '📐', type: 'PDF', pages: 32 },
  { id: 4, title: 'Gelombang dan Bunyi', mapel: 'Fisika', desc: 'Sifat gelombang dan perambatan bunyi.', done: false, icon: '🌊', type: 'Video', pages: 20 },
  { id: 5, title: 'Ikatan Kimia', mapel: 'Kimia', desc: 'Jenis-jenis ikatan kimia dan sifatnya.', done: true, icon: '⚗️', type: 'PDF', pages: 28 },
  { id: 6, title: 'Sistem Pencernaan', mapel: 'Biologi', desc: 'Organ dan proses pencernaan makanan.', done: false, icon: '🫀', type: 'PDF', pages: 22 },
];

const MAPEL_FILTER = ['Semua', 'Biologi', 'Matematika', 'Fisika', 'Kimia'];

export function MateriList() {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [activeMapel, setActiveMapel] = useState('Semua');

  const filtered = MATERI_DATA.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchMapel = activeMapel === 'Semua' || m.mapel === activeMapel;
    return matchSearch && matchMapel;
  });

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Materi Pembelajaran</h2>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari materi pembelajaran..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
          style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14, color: '#0F172A' }}
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {MAPEL_FILTER.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMapel(m)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all"
            style={{
              background: activeMapel === m ? '#2563EB' : '#fff',
              color: activeMapel === m ? '#fff' : '#64748B',
              border: `1.5px solid ${activeMapel === m ? '#2563EB' : '#E2E8F0'}`,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Cards: 1-col mobile → 2-col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate('student_materi_detail')}
            className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-md"
            style={{ background: '#fff', border: '1px solid #F1F5F9', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: '#F8FAFC' }}
            >
              {m.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-1.5 py-0.5 rounded text-xs font-semibold"
                  style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  {m.mapel}
                </span>
                {m.done && (
                  <span className="px-1.5 py-0.5 rounded text-xs font-semibold"
                    style={{ background: '#DCFCE7', color: '#16A34A' }}>
                    ✓ Selesai
                  </span>
                )}
              </div>
              <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 13 }} className="truncate">{m.title}</p>
              <div className="flex items-center gap-1 mt-0.5" style={{ color: '#94A3B8', fontSize: 11 }}>
                {m.type === 'PDF' ? <FileText size={11} /> : <Play size={11} />}
                <span>{m.type} · {m.pages} hal</span>
              </div>
            </div>
            <ChevronRight size={16} style={{ color: '#CBD5E1', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MateriDetail() {
  const { navigate } = useApp();
  const [marked, setMarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleMark = () => {
    setMarked(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg"
          style={{ background: '#DCFCE7', color: '#16A34A', border: '1px solid #BBF7D0', minWidth: 280 }}>
          <CheckCircle size={18} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Materi berhasil ditandai selesai!</span>
        </div>
      )}

      {/* Back */}
      <div className="flex items-center gap-2 px-4 pt-5 pb-2">
        <button
          onClick={() => navigate('student_materi')}
          style={{ color: '#2563EB', fontSize: 14, fontWeight: 600 }}
        >
          ← Kembali ke Daftar Materi
        </button>
      </div>

      {/* Thumbnail */}
      <div
        className="mx-4 h-36 md:h-52 rounded-2xl flex items-center justify-center text-5xl mb-4"
        style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' }}
      >
        🔬
      </div>

      <div className="px-4 md:px-6 space-y-4 pb-8">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: '#EFF6FF', color: '#2563EB' }}>
            Biologi
          </span>
          <h1 style={{ color: '#0F172A', fontWeight: 800, fontSize: 20, margin: '10px 0 4px' }}>
            Sel dan Organelnya
          </h1>
          <div className="flex items-center gap-3" style={{ color: '#64748B', fontSize: 12 }}>
            <span className="flex items-center gap-1"><FileText size={12} /> PDF · 24 hal</span>
            <span className="flex items-center gap-1"><Clock size={12} /> ~30 menit</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 rounded-2xl space-y-3" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
          <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 14 }}>Tentang Materi</h3>
          <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.8 }}>
            Sel adalah unit terkecil kehidupan yang memiliki kemampuan untuk hidup mandiri. Setiap sel memiliki berbagai organel yang bekerja sama untuk menjalankan fungsi kehidupan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {['1. Pengertian dan Sejarah Sel', '2. Struktur Sel Prokariotik', '3. Struktur Sel Eukariotik', '4. Organel Sel dan Fungsinya', '5. Transpor Membran'].map((sub, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: '#F8FAFC' }}>
                <BookOpen size={13} style={{ color: '#2563EB', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontSize: 13 }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PDF */}
        <div className="p-4 rounded-2xl flex items-center gap-3" style={{ background: '#EFF6FF' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#2563EB' }}>
            <FileText size={18} style={{ color: '#fff' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 13 }} className="truncate">Materi PDF - Sel dan Organelnya</p>
            <p style={{ color: '#64748B', fontSize: 11 }}>24 halaman · 2.4 MB</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0" style={{ background: '#2563EB', color: '#fff' }}>
            Buka
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleMark}
            disabled={marked}
            className="flex-1 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: marked ? '#DCFCE7' : '#22C55E', color: marked ? '#16A34A' : '#fff' }}
          >
            <CheckCircle size={15} />
            {marked ? 'Sudah Selesai' : 'Tandai Selesai'}
          </button>
          <button
            onClick={() => navigate('student_materi')}
            className="flex-1 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
            style={{ background: '#2563EB', color: '#fff' }}
          >
            Berikutnya <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

const MATERI_PROGRESS = [
  { id: 1, title: 'Sel dan Organelnya', mapel: 'Biologi', done: true },
  { id: 2, title: 'Genetika Dasar', mapel: 'Biologi', done: true },
  { id: 3, title: 'Fotosintesis', mapel: 'Biologi', done: true },
  { id: 4, title: 'Turunan Fungsi', mapel: 'Matematika', done: true },
  { id: 5, title: 'Integral', mapel: 'Matematika', done: false },
  { id: 6, title: 'Gelombang', mapel: 'Fisika', done: false },
  { id: 7, title: 'Termodinamika', mapel: 'Fisika', done: false },
];

export function ProgressBelajar() {
  const done = MATERI_PROGRESS.filter((m) => m.done).length;
  const total = MATERI_PROGRESS.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4 pb-8">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Progress Belajar</h2>

      {/* Hero */}
      <div className="p-6 rounded-3xl flex flex-col items-center text-center gap-3"
        style={{ background: 'linear-gradient(135deg, #2563EB, #3B82F6)' }}>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Total Progress Belajar</p>
        <div style={{ color: '#fff', fontSize: 60, fontWeight: 800, lineHeight: 1 }}>{pct}%</div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#fff' }} />
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          {[
            { label: 'Selesai', value: done, bg: '#DCFCE7', tc: '#0F172A' },
            { label: 'Belum', value: total - done, bg: '#FEE2E2', tc: '#0F172A' },
            { label: 'Total', value: total, bg: 'rgba(255,255,255,0.2)', tc: '#fff' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-2.5" style={{ background: s.bg }}>
              <div style={{ color: s.tc, fontSize: 18, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: '#64748B', fontSize: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-4 rounded-2xl flex items-center gap-3" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
        <TrendingUp size={18} style={{ color: '#F59E0B', flexShrink: 0 }} />
        <div>
          <p style={{ color: '#92400E', fontWeight: 600, fontSize: 13 }}>Rekomendasi</p>
          <p style={{ color: '#92400E', fontSize: 12 }}>Lanjutkan materi "Integral" di Matematika</p>
        </div>
      </div>

      {/* Materi List */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #F8FAFC' }}>
          <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 14 }}>Daftar Materi</h3>
        </div>
        {MATERI_PROGRESS.map((m, i) => (
          <div key={m.id} className="flex items-center gap-3 px-4 py-3"
            style={{ borderBottom: i < MATERI_PROGRESS.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
            {m.done ? (
              <CheckCircle size={18} style={{ color: '#22C55E', flexShrink: 0 }} />
            ) : (
              <div className="w-[18px] h-[18px] rounded-full border-2 flex-shrink-0" style={{ borderColor: '#E2E8F0' }} />
            )}
            <div className="flex-1 min-w-0">
              <p style={{ color: '#0F172A', fontWeight: m.done ? 400 : 600, fontSize: 13, textDecoration: m.done ? 'line-through' : 'none', opacity: m.done ? 0.7 : 1 }}>
                {m.title}
              </p>
              <p style={{ color: '#94A3B8', fontSize: 11 }}>{m.mapel}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: m.done ? '#DCFCE7' : '#F1F5F9', color: m.done ? '#16A34A' : '#94A3B8' }}>
              {m.done ? 'Selesai' : 'Belum'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
