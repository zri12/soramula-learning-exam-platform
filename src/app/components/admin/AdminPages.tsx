import { useState } from 'react';
import {
  Users, UserCheck, Building2, Shield, Search, Plus,
  Edit2, Trash2, ChevronRight, Bell, LogOut, Settings,
  CheckCircle, ToggleLeft, ToggleRight, Key
} from 'lucide-react';
import { useApp } from '../../contexts';

// ─── Dashboard Petugas TU ─────────────────────────────────────────
export function DashboardTU() {
  const { navigate } = useApp();

  const stats = [
    { label: 'Total Siswa', value: '324', color: '#EFF6FF', textColor: '#2563EB', icon: Users },
    { label: 'Total Guru', value: '18', color: '#F0FDF4', textColor: '#22C55E', icon: UserCheck },
    { label: 'Total Kelas', value: '12', color: '#FFF7ED', textColor: '#F59E0B', icon: Building2 },
    { label: 'Akun Aktif', value: '340', color: '#FDF4FF', textColor: '#A855F7', icon: Shield },
  ];

  const shortcuts = [
    { label: 'Kelola Siswa', view: 'admin_siswa', icon: Users, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Kelola Guru', view: 'admin_guru', icon: UserCheck, color: '#22C55E', bg: '#DCFCE7' },
    { label: 'Kelola Kelas', view: 'admin_kelas', icon: Building2, color: '#F59E0B', bg: '#FFF7ED' },
    { label: 'Kelola Akun', view: 'admin_akun', icon: Shield, color: '#A855F7', bg: '#FDF4FF' },
  ] as const;

  const recentActivity = [
    { text: 'Akun siswa "Reza Pratama" berhasil dibuat', time: '10 menit lalu', color: '#22C55E' },
    { text: 'Reset password akun "Pak Rian Pratama"', time: '1 jam lalu', color: '#F59E0B' },
    { text: 'Kelas XI IPA 3 berhasil ditambahkan', time: 'Kemarin', color: '#2563EB' },
    { text: 'Akun siswa "Budi Hartono" dinonaktifkan', time: '2 hari lalu', color: '#EF4444' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
        <div className="px-5 pt-8 pb-6 max-w-5xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Selamat bekerja,</p>
              <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Ibu Sari Dewi 👋</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>Petugas TU · Hari ini</p>
            </div>
            <button
              onClick={() => navigate('admin_notifikasi')}
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Bell size={20} style={{ color: '#fff' }} />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#EF4444', fontSize: 9, color: '#fff', fontWeight: 700 }}>5</span>
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
            <button key={s.view} onClick={() => navigate(s.view as any)}
              className="p-4 rounded-2xl flex flex-col items-center gap-2"
              style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <span style={{ color: '#374151', fontWeight: 600, fontSize: 13 }}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Activity Log */}
        <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
          <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Aktivitas Data Terbaru</h3>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                <div>
                  <p style={{ color: '#374151', fontSize: 13, lineHeight: 1.5 }}>{a.text}</p>
                  <p style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Kelola Data Siswa ────────────────────────────────────────────
const SISWA_DATA = [
  { id: 1, nama: 'Nabila Putri', nis: '20240001', kelas: 'XI IPA 1', jurusan: 'IPA', email: 'nabila@soramula.id', status: 'Aktif' },
  { id: 2, nama: 'Andi Rahman', nis: '20240002', kelas: 'XI IPA 1', jurusan: 'IPA', email: 'andi@soramula.id', status: 'Aktif' },
  { id: 3, nama: 'Siti Maulida', nis: '20240003', kelas: 'XI IPA 2', jurusan: 'IPA', email: 'siti@soramula.id', status: 'Aktif' },
  { id: 4, nama: 'Budi Hartono', nis: '20240004', kelas: 'XI IPS 1', jurusan: 'IPS', email: 'budi@soramula.id', status: 'Nonaktif' },
  { id: 5, nama: 'Reza Pratama', nis: '20240005', kelas: 'X IPA 1', jurusan: 'IPA', email: 'reza@soramula.id', status: 'Aktif' },
];

export function KelolaDataSiswa() {
  const [search, setSearch] = useState('');
  const filtered = SISWA_DATA.filter((s) => s.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Data Siswa</h2>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1" style={{ minWidth: 160 }}>
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari siswa..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <select className="px-4 py-3 rounded-2xl outline-none flex-shrink-0"
          style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14, color: '#374151' }}>
          <option>Semua Kelas</option><option>XI IPA 1</option><option>XI IPA 2</option>
        </select>
        <button className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm flex-shrink-0"
          style={{ background: '#2563EB', color: '#fff' }}>
          <Plus size={15} /> Tambah Siswa
        </button>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((s) => (
          <div key={s.id} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex justify-between mb-1">
              <div>
                <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{s.nama}</p>
                <p style={{ color: '#64748B', fontSize: 12 }}>NIS: {s.nis}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold h-fit"
                style={{ background: s.status === 'Aktif' ? '#DCFCE7' : '#FEE2E2', color: s.status === 'Aktif' ? '#16A34A' : '#EF4444' }}>
                {s.status}
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: 12 }}>{s.kelas} · {s.jurusan} · {s.email}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl text-xs font-medium" style={{ background: '#EFF6FF', color: '#2563EB' }}>Edit</button>
              <button className="flex-1 py-2 rounded-xl text-xs font-medium" style={{ background: '#FEE2E2', color: '#EF4444' }}>Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Nama', 'NIS', 'Kelas', 'Jurusan', 'Email', 'Status', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5" style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{s.nama}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{s.nis}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{s.kelas}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{s.jurusan}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{s.email}</td>
                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: s.status === 'Aktif' ? '#DCFCE7' : '#FEE2E2', color: s.status === 'Aktif' ? '#16A34A' : '#EF4444' }}>
                    {s.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-blue-50"><Edit2 size={14} style={{ color: '#2563EB' }} /></button>
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

// ─── Kelola Data Guru ─────────────────────────────────────────────
const GURU_DATA = [
  { id: 1, nama: 'Rian Pratama, S.Pd.', nip: '198905152015041002', mapel: 'Biologi', email: 'rian@soramula.id', status: 'Aktif' },
  { id: 2, nama: 'Dr. Sari Wulandari', nip: '198503102010012005', mapel: 'Matematika', email: 'sari.w@soramula.id', status: 'Aktif' },
  { id: 3, nama: 'Budi Santoso, M.Pd.', nip: '197812082008011003', mapel: 'Fisika', email: 'budi.s@soramula.id', status: 'Aktif' },
];

export function KelolaDataGuru() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Data Guru</h2>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input placeholder="Cari guru..." className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm flex-shrink-0"
          style={{ background: '#2563EB', color: '#fff' }}>
          <Plus size={15} /> Tambah Guru
        </button>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {GURU_DATA.map((g) => (
          <div key={g.id} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex justify-between mb-1.5">
              <div>
                <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{g.nama}</p>
                <p style={{ color: '#64748B', fontSize: 12 }}>NIP: {g.nip}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold h-fit" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                {g.mapel}
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: 12 }}>{g.email}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                <Edit2 size={12} /> Edit
              </button>
              <button className="flex-1 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1" style={{ background: '#FEE2E2', color: '#EF4444' }}>
                <Trash2 size={12} /> Hapus
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
              {['Nama Guru', 'NIP', 'Mata Pelajaran', 'Email', 'Status', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5" style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GURU_DATA.map((g, i) => (
              <tr key={g.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{g.nama}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 13 }}>{g.nip}</td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#EFF6FF', color: '#2563EB' }}>{g.mapel}</span>
                </td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{g.email}</td>
                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#DCFCE7', color: '#16A34A' }}>{g.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-blue-50"><Edit2 size={14} style={{ color: '#2563EB' }} /></button>
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

// ─── Kelola Data Kelas ────────────────────────────────────────────
const KELAS_DATA = [
  { id: 1, nama: 'XI IPA 1', tingkat: 'XI', jurusan: 'IPA', walikelas: 'Rian Pratama', jumlah: 32 },
  { id: 2, nama: 'XI IPA 2', tingkat: 'XI', jurusan: 'IPA', walikelas: 'Sari Wulandari', jumlah: 30 },
  { id: 3, nama: 'XI IPS 1', tingkat: 'XI', jurusan: 'IPS', walikelas: 'Budi Santoso', jumlah: 28 },
  { id: 4, nama: 'X IPA 1', tingkat: 'X', jurusan: 'IPA', walikelas: 'Ahmad Fauzi', jumlah: 35 },
];

export function KelolaDataKelas() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Data Kelas</h2>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input placeholder="Cari kelas..." className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm flex-shrink-0"
          style={{ background: '#2563EB', color: '#fff' }}>
          <Plus size={15} /> Tambah Kelas
        </button>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {KELAS_DATA.map((k) => (
          <div key={k.id} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex justify-between mb-1">
              <h4 style={{ color: '#0F172A', fontWeight: 700, fontSize: 15 }}>{k.nama}</h4>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: k.jurusan === 'IPA' ? '#EFF6FF' : '#FFF7ED', color: k.jurusan === 'IPA' ? '#2563EB' : '#F59E0B' }}>
                {k.jurusan}
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: 12 }}>Wali: {k.walikelas}</p>
            <div className="flex items-center justify-between mt-2">
              <span style={{ color: '#0F172A', fontWeight: 700, fontSize: 14 }}>{k.jumlah} siswa</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#EFF6FF', color: '#2563EB' }}>Edit</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#FEE2E2', color: '#EF4444' }}>Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Nama Kelas', 'Tingkat', 'Jurusan', 'Wali Kelas', 'Jumlah Siswa', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5" style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {KELAS_DATA.map((k, i) => (
              <tr key={k.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{k.nama}</td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{k.tingkat}</td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: k.jurusan === 'IPA' ? '#EFF6FF' : '#FFF7ED', color: k.jurusan === 'IPA' ? '#2563EB' : '#F59E0B' }}>
                    {k.jurusan}
                  </span>
                </td>
                <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{k.walikelas}</td>
                <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 700, fontSize: 15 }}>{k.jumlah}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-blue-50"><Edit2 size={14} style={{ color: '#2563EB' }} /></button>
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

// ─── Kelola Akun Pengguna ─────────────────────────────────────────
const AKUN_DATA = [
  { id: 1, nama: 'Nabila Putri', email: 'nabila@soramula.id', role: 'Siswa', aktif: true },
  { id: 2, nama: 'Rian Pratama', email: 'rian@soramula.id', role: 'Guru', aktif: true },
  { id: 3, nama: 'Budi Hartono', email: 'budi@soramula.id', role: 'Siswa', aktif: false },
  { id: 4, nama: 'Sari Dewi', email: 'sari@soramula.id', role: 'Petugas TU', aktif: true },
  { id: 5, nama: 'Andi Rahman', email: 'andi@soramula.id', role: 'Siswa', aktif: true },
];

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  Siswa: { bg: '#EFF6FF', color: '#2563EB' },
  Guru: { bg: '#F0FDF4', color: '#22C55E' },
  'Petugas TU': { bg: '#FDF4FF', color: '#A855F7' },
};

export function KelolaAkun() {
  const [statuses, setStatuses] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(AKUN_DATA.map((a) => [a.id, a.aktif]))
  );
  const [showToast, setShowToast] = useState('');

  const toggleStatus = (id: number) => {
    const newVal = !statuses[id];
    setStatuses((prev) => ({ ...prev, [id]: newVal }));
    const name = AKUN_DATA.find((a) => a.id === id)?.nama;
    setShowToast(`Akun ${name} berhasil ${newVal ? 'diaktifkan' : 'dinonaktifkan'}`);
    setTimeout(() => setShowToast(''), 3000);
  };

  const resetPassword = (nama: string) => {
    setShowToast(`Password ${nama} berhasil direset`);
    setTimeout(() => setShowToast(''), 3000);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg"
          style={{ background: '#DCFCE7', color: '#16A34A', border: '1px solid #BBF7D0', minWidth: 280 }}>
          <CheckCircle size={18} /> <span style={{ fontSize: 14, fontWeight: 600 }}>{showToast}</span>
        </div>
      )}

      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Kelola Akun</h2>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1" style={{ minWidth: 160 }}>
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input placeholder="Cari akun..." className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }} />
        </div>
        <select className="px-3 py-3 rounded-2xl outline-none flex-shrink-0"
          style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 13, color: '#374151' }}>
          <option>Semua Role</option><option>Siswa</option><option>Guru</option><option>Petugas TU</option>
        </select>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {AKUN_DATA.map((a) => {
          const rc = ROLE_COLORS[a.role];
          const isActive = statuses[a.id];
          return (
            <div key={a.id} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{a.nama}</p>
                  <p style={{ color: '#64748B', fontSize: 12 }}>{a.email}</p>
                </div>
                <button onClick={() => toggleStatus(a.id)}>
                  {isActive ? <ToggleRight size={28} style={{ color: '#22C55E' }} /> : <ToggleLeft size={28} style={{ color: '#CBD5E1' }} />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: rc.bg, color: rc.color }}>{a.role}</span>
                <button onClick={() => resetPassword(a.nama)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                  style={{ background: '#FFF7ED', color: '#F59E0B' }}>
                  <Key size={12} /> Reset Password
                </button>
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
              {['Nama', 'Email', 'Role', 'Status Akun', 'Toggle', 'Aksi'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5" style={{ color: '#64748B', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AKUN_DATA.map((a, i) => {
              const rc = ROLE_COLORS[a.role];
              const isActive = statuses[a.id];
              return (
                <tr key={a.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-5 py-4" style={{ color: '#0F172A', fontWeight: 600, fontSize: 14 }}>{a.nama}</td>
                  <td className="px-5 py-4" style={{ color: '#64748B', fontSize: 14 }}>{a.email}</td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: rc.bg, color: rc.color }}>{a.role}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: isActive ? '#DCFCE7' : '#FEE2E2', color: isActive ? '#16A34A' : '#EF4444' }}>
                      {isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleStatus(a.id)}>
                      {isActive ? <ToggleRight size={32} style={{ color: '#22C55E' }} /> : <ToggleLeft size={32} style={{ color: '#CBD5E1' }} />}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => resetPassword(a.nama)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: '#FFF7ED', color: '#F59E0B' }}>
                        <Key size={12} /> Reset
                      </button>
                      <button className="p-2 rounded-lg hover:bg-blue-50"><Edit2 size={14} style={{ color: '#2563EB' }} /></button>
                    </div>
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

// ─── Notifikasi TU ────────────────────────────────────────────────
export function NotifikasiTU() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-3">
      <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Notifikasi</h2>
      {[
        { title: 'Akun Baru Menunggu Verifikasi', desc: '5 akun siswa baru perlu diverifikasi.', time: '30 menit lalu', color: '#F59E0B', bg: '#FFF7ED', icon: Shield, read: false },
        { title: 'Reset Password Berhasil', desc: 'Password akun "Pak Rian Pratama" berhasil direset.', time: '2 jam lalu', color: '#22C55E', bg: '#DCFCE7', icon: CheckCircle, read: true },
        { title: 'Penambahan Kelas', desc: 'Kelas XII IPA 1 berhasil ditambahkan ke sistem.', time: 'Kemarin', color: '#2563EB', bg: '#EFF6FF', icon: Building2, read: true },
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

// ─── Profil TU ────────────────────────────────────────────────────
export function ProfilTU() {
  const { navigate, isDarkMode } = useApp();
  const pageBg = isDarkMode ? '#020617' : '#F8FAFC';
  const cardBg = isDarkMode ? '#111827' : '#fff';
  const cardBorder = isDarkMode ? '#1E293B' : '#F1F5F9';
  const text = isDarkMode ? '#F8FAFC' : '#0F172A';
  const muted = isDarkMode ? '#94A3B8' : '#64748B';
  const soft = isDarkMode ? '#0F172A' : '#F8FAFC';
  return (
    <div className="max-w-2xl mx-auto" style={{ background: pageBg }}>
      <div className="px-5 pt-8 pb-6 flex flex-col items-center gap-3" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
          style={{ background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.5)', color: '#fff' }}>SD</div>
        <div className="text-center">
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>Ibu Sari Dewi</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>sari.dewi@soramula.id</p>
        </div>
        <div className="px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Petugas Tata Usaha</span>
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-3">
        <div className="p-4 rounded-2xl space-y-2" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          {[
            { label: 'Nama', value: 'Sari Dewi, S.E.' },
            { label: 'Email', value: 'sari.dewi@soramula.id' },
            { label: 'Jabatan', value: 'Petugas Tata Usaha' },
            { label: 'NIP', value: '199205102015042001' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${soft}` }}>
              <span style={{ color: muted, fontSize: 13 }}>{item.label}</span>
              <span style={{ color: text, fontSize: 13, fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          {[
            { icon: Edit2, label: 'Edit Profil', color: '#4F46E5', bg: '#EEF2FF', action: () => navigate('profile_edit') },
            { icon: Bell, label: 'Notifikasi', color: '#F59E0B', bg: '#FFF7ED', action: () => navigate('admin_notifikasi') },
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
