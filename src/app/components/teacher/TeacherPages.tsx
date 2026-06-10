import { useState } from 'react';
import {
  BookOpen, ClipboardList, Users, Award, Monitor, Search,
  Plus, Edit2, Trash2, Bell, LogOut,
  Settings, AlertTriangle, CheckCircle, ChevronRight
} from 'lucide-react';
import { useApp } from '../../contexts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CHART_DATA = [
  { name: 'Bio', avg: 82 }, { name: 'Mat', avg: 75 }, { name: 'Fis', avg: 79 },
  { name: 'Kim', avg: 85 }, { name: 'Ing', avg: 88 },
];

// ─── Dashboard Guru ───────────────────────────────────────────────
export function DashboardGuru() {
  const { navigate } = useApp();

  const stats = [
    { label: 'Total Materi', value: '24', color: '#EFF6FF', textColor: '#2563EB', icon: BookOpen },
    { label: 'Total Ujian', value: '12', color: '#FFF7ED', textColor: '#F59E0B', icon: ClipboardList },
    { label: 'Total Siswa', value: '156', color: '#F0FDF4', textColor: '#22C55E', icon: Users },
    { label: 'Ujian Aktif', value: '3', color: '#FDF4FF', textColor: '#A855F7', icon: Monitor },
  ];

  const shortcuts = [
    { label: 'Kelola Materi', view: 'teacher_materi', icon: BookOpen, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Kelola Ujian', view: 'teacher_ujian', icon: ClipboardList, color: '#F59E0B', bg: '#FFF7ED' },
    { label: 'Hasil Ujian', view: 'teacher_hasil', icon: Award, color: '#22C55E', bg: '#DCFCE7' },
    { label: 'Monitoring', view: 'teacher_monitoring', icon: Monitor, color: '#A855F7', bg: '#FDF4FF' },
  ] as const;

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)' }}>
        <div className="px-5 pt-8 pb-6 max-w-5xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Selamat mengajar,</p>
              <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Pak Rian Pratama 👋</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>Guru Biologi · Hari ini</p>
            </div>
            <button
              onClick={() => navigate('teacher_notifikasi')}
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Bell size={20} style={{ color: '#fff' }} />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#EF4444', fontSize: 9, color: '#fff', fontWeight: 700 }}>2</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-2 space-y-4 pb-8">
        {/* Stats: 2-col mobile → 4-col desktop */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl"
          style={{ background: '#fff', boxShadow: '0 4px 20px rgba(15,23,42,0.08)' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="p-3 rounded-xl" style={{ background: s.color }}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ color: '#64748B', fontSize: 11 }}>{s.label}</span>
                <s.icon size={14} style={{ color: s.textColor }} />
              </div>
              <div style={{ color: s.textColor, fontSize: 24, fontWeight: 800 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Shortcuts: 2-col mobile → 4-col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shortcuts.map((s) => (
            <button
              key={s.view}
              onClick={() => navigate(s.view as any)}
              className="p-4 rounded-2xl flex flex-col items-center gap-2"
              style={{ background: '#fff', border: '1px solid #F1F5F9' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <span style={{ color: '#374151', fontWeight: 600, fontSize: 13 }}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Chart + Ujian Aktif: side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
              Rata-rata Nilai per Mapel
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={CHART_DATA} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Bar dataKey="avg" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 14 }}>Ujian Aktif</h3>
              <button onClick={() => navigate('teacher_monitoring')} style={{ color: '#2563EB', fontSize: 12, fontWeight: 600 }}>
                Monitor
              </button>
            </div>
            {[
              { title: 'Ujian Biologi Bab 1', peserta: 32, selesai: 28, color: '#22C55E' },
              { title: 'Ujian Biologi Bab 2', peserta: 30, selesai: 5, color: '#F59E0B' },
            ].map((u, i) => (
              <div key={i} className="mb-3 last:mb-0 p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: '#0F172A', fontWeight: 600, fontSize: 13 }}>{u.title}</span>
                  <span style={{ color: u.color, fontWeight: 700, fontSize: 12 }}>{u.selesai}/{u.peserta}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${(u.selesai / u.peserta) * 100}%`, background: u.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Kelola Materi ────────────────────────────────────────────────
const MATERI_LIST = [
  { id: 1, title: 'Sel dan Organelnya', mapel: 'Biologi', status: 'Aktif', tgl: '5 Jun 2026' },
  { id: 2, title: 'Genetika Dasar', mapel: 'Biologi', status: 'Aktif', tgl: '3 Jun 2026' },
  { id: 3, title: 'Fotosintesis', mapel: 'Biologi', status: 'Draft', tgl: '1 Jun 2026' },
  { id: 4, title: 'Sistem Pencernaan', mapel: 'Biologi', status: 'Aktif', tgl: '28 Mei 2026' },
];

export function KelolaMateri() {
  const [search, setSearch] = useState('');
  const [showToast, setShowToast] = useState(false);
  const filtered = MATERI_LIST.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg"
          style={{ background: '#DCFCE7', color: '#16A34A', border: '1px solid #BBF7D0', minWidth: 280 }}>
          <CheckCircle size={18} /> <span style={{ fontSize: 14, fontWeight: 600 }}>Materi berhasil disimpan!</span>
        </div>
      )}

      {/* Title (desktop) */}
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>
        Kelola Materi
      </h2>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari materi..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <button
          onClick={() => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); }}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm flex-shrink-0"
          style={{ background: '#2563EB', color: '#fff' }}
        >
          <Plus size={15} /> Tambah Materi
        </button>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((m) => (
          <div key={m.id} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex justify-between items-start mb-1.5">
              <h4 style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{m.title}</h4>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: m.status === 'Aktif' ? '#DCFCE7' : '#F1F5F9', color: m.status === 'Aktif' ? '#16A34A' : '#64748B' }}>
                {m.status}
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: 12 }}>{m.mapel} · {m.tgl}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl text-sm font-medium" style={{ background: '#EFF6FF', color: '#2563EB' }}>Edit</button>
              <button className="flex-1 py-2 rounded-xl text-sm font-medium" style={{ background: '#FEE2E2', color: '#EF4444' }}>Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Judul Materi', 'Mata Pelajaran', 'Status', 'Tanggal Dibuat', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5" style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{m.title}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{m.mapel}</td>
                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: m.status === 'Aktif' ? '#DCFCE7' : '#F1F5F9', color: m.status === 'Aktif' ? '#16A34A' : '#64748B' }}>
                    {m.status}
                  </span>
                </td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{m.tgl}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors"><Edit2 size={15} style={{ color: '#2563EB' }} /></button>
                    <button className="p-2 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={15} style={{ color: '#EF4444' }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Kelola Ujian ─────────────────────────────────────────────────
const UJIAN_LIST = [
  { id: 1, title: 'Ujian Biologi Bab 1', mapel: 'Biologi', durasi: 90, soal: 20, tgl: '21 Jun 2026', status: 'Aktif' },
  { id: 2, title: 'Ujian Biologi Bab 2', mapel: 'Biologi', durasi: 90, soal: 20, tgl: '5 Jul 2026', status: 'Draft' },
  { id: 3, title: 'Ujian Biologi Semester', mapel: 'Biologi', durasi: 120, soal: 40, tgl: '20 Jul 2026', status: 'Draft' },
];

export function KelolaUjian() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Kelola Ujian</h2>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input placeholder="Cari ujian..." className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm flex-shrink-0"
          style={{ background: '#2563EB', color: '#fff' }}>
          <Plus size={15} /> Tambah Ujian
        </button>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {UJIAN_LIST.map((u) => (
          <div key={u.id} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex justify-between mb-1.5">
              <h4 style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{u.title}</h4>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: u.status === 'Aktif' ? '#DCFCE7' : '#F1F5F9', color: u.status === 'Aktif' ? '#16A34A' : '#64748B' }}>
                {u.status}
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: 12 }}>{u.durasi} menit · {u.soal} soal · {u.tgl}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl text-xs font-medium" style={{ background: '#EFF6FF', color: '#2563EB' }}>Kelola Soal</button>
              <button className="flex-1 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1" style={{ background: '#F8FAFC', color: '#374151' }}>
                <Edit2 size={12} />Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Judul Ujian', 'Durasi', 'Soal', 'Jadwal', 'Status', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5" style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {UJIAN_LIST.map((u, i) => (
              <tr key={u.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{u.title}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{u.durasi} mnt</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{u.soal}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{u.tgl}</td>
                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: u.status === 'Aktif' ? '#DCFCE7' : '#F1F5F9', color: u.status === 'Aktif' ? '#16A34A' : '#64748B' }}>
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="px-2.5 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#EFF6FF', color: '#2563EB' }}>Soal</button>
                    <button className="p-2 rounded-lg hover:bg-gray-50"><Edit2 size={14} style={{ color: '#64748B' }} /></button>
                    <button className="p-2 rounded-lg hover:bg-red-50"><Trash2 size={14} style={{ color: '#EF4444' }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Hasil Ujian (Guru) ───────────────────────────────────────────
const HASIL_DATA = [
  { nama: 'Nabila Putri', kelas: 'XI IPA 1', nilai: 85, status: 'Lulus', tgl: '21 Jun 2026' },
  { nama: 'Andi Rahman', kelas: 'XI IPA 1', nilai: 72, status: 'Tidak Lulus', tgl: '21 Jun 2026' },
  { nama: 'Siti Maulida', kelas: 'XI IPA 2', nilai: 91, status: 'Lulus', tgl: '21 Jun 2026' },
  { nama: 'Budi Santoso', kelas: 'XI IPA 2', nilai: 78, status: 'Lulus', tgl: '21 Jun 2026' },
];

export function HasilUjianGuru() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Hasil Ujian</h2>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1" style={{ minWidth: 180 }}>
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input placeholder="Cari siswa..." className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <select className="px-4 py-3 rounded-2xl outline-none flex-shrink-0"
          style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14, color: '#374151' }}>
          <option>Semua Ujian</option>
          <option>Ujian Biologi Bab 1</option>
        </select>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {HASIL_DATA.map((r, i) => (
          <div key={i} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{r.nama}</p>
                <p style={{ color: '#64748B', fontSize: 12 }}>{r.kelas} · {r.tgl}</p>
              </div>
              <div className="text-right">
                <div style={{ color: r.nilai >= 75 ? '#16A34A' : '#EF4444', fontSize: 22, fontWeight: 800 }}>{r.nilai}</div>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: r.status === 'Lulus' ? '#DCFCE7' : '#FEE2E2', color: r.status === 'Lulus' ? '#16A34A' : '#EF4444' }}>
                  {r.status}
                </span>
              </div>
            </div>
            <button style={{ color: '#2563EB', fontSize: 12, fontWeight: 600 }}>Lihat Detail →</button>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Nama Siswa', 'Kelas', 'Nilai', 'Status', 'Tanggal', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5" style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HASIL_DATA.map((r, i) => (
              <tr key={i} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{r.nama}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{r.kelas}</td>
                <td className="px-5 py-4">
                  <span style={{ color: r.nilai >= 75 ? '#16A34A' : '#EF4444', fontWeight: 700, fontSize: 16 }}>{r.nilai}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: r.status === 'Lulus' ? '#DCFCE7' : '#FEE2E2', color: r.status === 'Lulus' ? '#16A34A' : '#EF4444' }}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{r.tgl}</td>
                <td className="px-5 py-4">
                  <button style={{ color: '#2563EB', fontSize: 13, fontWeight: 600 }}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Monitoring Ujian ─────────────────────────────────────────────
const MONITORING_DATA = [
  { nama: 'Nabila Putri', kelas: 'XI IPA 1', nilai: 85, warnings: 2, durasi: '15 dtk', status: 'Selesai' },
  { nama: 'Andi Rahman', kelas: 'XI IPA 1', nilai: 72, warnings: 5, durasi: '45 dtk', status: 'Selesai' },
  { nama: 'Siti Maulida', kelas: 'XI IPA 2', nilai: 91, warnings: 0, durasi: '0 dtk', status: 'Selesai' },
  { nama: 'Budi Santoso', kelas: 'XI IPA 2', nilai: null, warnings: 1, durasi: '8 dtk', status: 'Berlangsung' },
];

function warningStyle(w: number) {
  if (w === 0) return { bg: '#DCFCE7', color: '#16A34A', label: `${w}×` };
  if (w <= 2) return { bg: '#FFF7ED', color: '#F59E0B', label: `${w}×` };
  return { bg: '#FEE2E2', color: '#EF4444', label: `${w}×` };
}

export function MonitoringUjian() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Monitoring Ujian</h2>

      {/* Stats: 2-col mobile → 4-col desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Peserta', value: '32', color: '#EFF6FF', tc: '#2563EB' },
          { label: 'Rata-rata Nilai', value: '82.5', color: '#F0FDF4', tc: '#22C55E' },
          { label: 'Total Peringatan', value: '8', color: '#FEE2E2', tc: '#EF4444' },
          { label: 'Peserta Selesai', value: '28', color: '#FFF7ED', tc: '#F59E0B' },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl" style={{ background: s.color }}>
            <p style={{ color: '#64748B', fontSize: 11 }}>{s.label}</p>
            <p style={{ color: s.tc, fontSize: 24, fontWeight: 800 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1" style={{ minWidth: 180 }}>
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input placeholder="Cari siswa..." className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <select className="px-4 py-3 rounded-2xl outline-none flex-shrink-0"
          style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14, color: '#374151' }}>
          <option>Ujian Biologi Bab 1</option>
        </select>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {MONITORING_DATA.map((m, i) => {
          const ws = warningStyle(m.warnings);
          return (
            <div key={i} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
              <div className="flex justify-between mb-2">
                <div>
                  <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{m.nama}</p>
                  <p style={{ color: '#64748B', fontSize: 12 }}>{m.kelas}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 h-fit"
                  style={{ background: ws.bg, color: ws.color }}>
                  <AlertTriangle size={11} /> {ws.label} peringatan
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span style={{ color: '#64748B', fontSize: 12 }}>Tidak terlihat: {m.durasi}</span>
                {m.nilai !== null && <span style={{ color: '#0F172A', fontSize: 12, fontWeight: 600 }}>Nilai: {m.nilai}</span>}
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: m.status === 'Selesai' ? '#DCFCE7' : '#EFF6FF', color: m.status === 'Selesai' ? '#16A34A' : '#2563EB' }}>
                  {m.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Nama Siswa', 'Kelas', 'Nilai', 'Peringatan Wajah', 'Durasi Tidak Terlihat', 'Status', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-4 py-3.5" style={{ color: '#64748B', fontSize: 11, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONITORING_DATA.map((m, i) => {
              const ws = warningStyle(m.warnings);
              return (
                <tr key={i} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-4 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 13 }}>{m.nama}</td>
                  <td className="px-4 py-4" style={{ color: '#64748B', fontSize: 13 }}>{m.kelas}</td>
                  <td className="px-4 py-4">
                    {m.nilai !== null
                      ? <span style={{ color: m.nilai >= 75 ? '#16A34A' : '#EF4444', fontWeight: 700, fontSize: 15 }}>{m.nilai}</span>
                      : <span style={{ color: '#94A3B8', fontSize: 13 }}>-</span>}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: ws.bg, color: ws.color }}>
                      <AlertTriangle size={11} /> {ws.label}
                    </span>
                  </td>
                  <td className="px-4 py-4" style={{ color: '#64748B', fontSize: 13 }}>{m.durasi}</td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: m.status === 'Selesai' ? '#DCFCE7' : '#EFF6FF', color: m.status === 'Selesai' ? '#16A34A' : '#2563EB' }}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button style={{ color: '#2563EB', fontSize: 13, fontWeight: 600 }}>Detail</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Notifikasi Guru ──────────────────────────────────────────────
export function NotifikasiGuru() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-3">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Notifikasi</h2>
      {[
        { title: 'Ujian Biologi Bab 1 Selesai', desc: '32 dari 32 siswa telah menyelesaikan ujian.', time: '30 menit lalu', color: '#22C55E', bg: '#DCFCE7', icon: CheckCircle, read: false },
        { title: 'Peringatan Wajah Siswa', desc: 'Andi Rahman terdeteksi wajah tidak terlihat 5 kali selama ujian.', time: '2 jam lalu', color: '#EF4444', bg: '#FEE2E2', icon: AlertTriangle, read: false },
        { title: 'Materi Baru Diupload', desc: 'Sistem berhasil menyimpan materi "Fotosintesis" yang Anda upload.', time: 'Kemarin', color: '#2563EB', bg: '#EFF6FF', icon: BookOpen, read: true },
      ].map((n, i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-2xl"
          style={{ background: n.read ? '#fff' : n.bg, border: '1px solid', borderColor: n.read ? '#F1F5F9' : 'transparent' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: n.read ? '#F1F5F9' : '#fff' }}>
            <n.icon size={18} style={{ color: n.read ? '#94A3B8' : n.color }} />
          </div>
          <div className="flex-1">
            <p style={{ color: '#0F172A', fontWeight: n.read ? 400 : 600, fontSize: 14 }}>{n.title}</p>
            <p style={{ color: '#64748B', fontSize: 13, marginTop: 2 }}>{n.desc}</p>
            <p style={{ color: '#94A3B8', fontSize: 11, marginTop: 4 }}>{n.time}</p>
          </div>
          {!n.read && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#2563EB' }} />}
        </div>
      ))}
    </div>
  );
}

// ─── Profil Guru ──────────────────────────────────────────────────
export function ProfilGuru() {
  const { navigate, isDarkMode } = useApp();
  const pageBg = isDarkMode ? '#020617' : '#F8FAFC';
  const cardBg = isDarkMode ? '#111827' : '#fff';
  const cardBorder = isDarkMode ? '#1E293B' : '#F1F5F9';
  const text = isDarkMode ? '#F8FAFC' : '#0F172A';
  const muted = isDarkMode ? '#94A3B8' : '#64748B';
  const soft = isDarkMode ? '#0F172A' : '#F8FAFC';
  return (
    <div className="max-w-2xl mx-auto" style={{ background: pageBg }}>
      <div className="px-5 pt-8 pb-6 flex flex-col items-center gap-3" style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
          style={{ background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.5)', color: '#fff' }}>RP</div>
        <div className="text-center">
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>Pak Rian Pratama</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>rian.pratama@soramula.id</p>
        </div>
        <div className="px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Guru Biologi</span>
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-3">
        <div className="p-4 rounded-2xl space-y-2" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          {[
            { label: 'Nama', value: 'Rian Pratama, S.Pd.' },
            { label: 'Email', value: 'rian.pratama@soramula.id' },
            { label: 'Mata Pelajaran', value: 'Biologi' },
            { label: 'NIP', value: '198905152015041002' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${soft}` }}>
              <span style={{ color: muted, fontSize: 13 }}>{item.label}</span>
              <span style={{ color: text, fontSize: 13, fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          {[
            { icon: Edit2, label: 'Edit Profil', color: '#2563EB', bg: '#EFF6FF', action: () => navigate('profile_edit') },
            { icon: Bell, label: 'Notifikasi', color: '#F59E0B', bg: '#FFF7ED', action: () => navigate('teacher_notifikasi') },
            { icon: Settings, label: 'Pengaturan', color: '#64748B', bg: '#F1F5F9', action: () => navigate('profile_settings') },
          ].map((m, i, arr) => (
            <button key={m.label} onClick={m.action} className="w-full flex items-center gap-4 px-4 py-3.5"
              style={{ background: cardBg, borderBottom: i < arr.length - 1 ? `1px solid ${soft}` : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                <m.icon size={16} style={{ color: m.color }} />
              </div>
              <span style={{ color: text, fontWeight: 600, fontSize: 14 }}>{m.label}</span>
              <ChevronRight size={16} style={{ color: '#CBD5E1', marginLeft: 'auto' }} />
            </button>
          ))}
        </div>
        <button onClick={() => navigate('login')} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold"
          style={{ background: '#FEE2E2', color: '#EF4444' }}>
          <LogOut size={18} /> Keluar dari Akun
        </button>
      </div>
    </div>
  );
}
