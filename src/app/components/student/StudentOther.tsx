import { Bell, BookOpen, ClipboardList, Award, ChevronRight, Camera, Edit, LogOut, Settings, User } from 'lucide-react';
import { useApp } from '../../contexts';

const NOTIFIKASI_DATA = [
  { id: 1, type: 'materi', icon: BookOpen, color: '#2563EB', bg: '#EFF6FF', title: 'Materi Baru Ditambahkan', desc: 'Materi "Sistem Pencernaan" telah tersedia di Biologi.', time: '10 menit lalu', read: false },
  { id: 2, type: 'ujian', icon: ClipboardList, color: '#F59E0B', bg: '#FFF7ED', title: 'Ujian Akan Dimulai', desc: 'Ujian Biologi Bab 1 akan dimulai dalam 10 hari.', time: '2 jam lalu', read: false },
  { id: 3, type: 'nilai', icon: Award, color: '#22C55E', bg: '#DCFCE7', title: 'Hasil Ujian Tersedia', desc: 'Hasil Ujian Fisika Gelombang telah dirilis. Nilai Anda: 78', time: 'Kemarin', read: false },
  { id: 4, type: 'materi', icon: BookOpen, color: '#2563EB', bg: '#EFF6FF', title: 'Materi Diperbarui', desc: 'Guru memperbarui materi "Genetika Dasar".', time: '3 hari lalu', read: true },
  { id: 5, type: 'ujian', icon: ClipboardList, color: '#A855F7', bg: '#FDF4FF', title: 'Jadwal Ujian Baru', desc: 'Ujian Matematika Mid Semester dijadwalkan 25 Juni 2026.', time: '1 minggu lalu', read: true },
];

export function NotifikasiSiswa() {
  const unread = NOTIFIKASI_DATA.filter((n) => !n.read).length;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="hidden md:block" style={{ color: '#0F172A', fontWeight: 700, fontSize: 20 }}>Notifikasi</h2>
          <Bell size={18} className="md:hidden" style={{ color: '#0F172A' }} />
          {unread > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#EF4444' }}>
              {unread} baru
            </span>
          )}
        </div>
        <button style={{ color: '#2563EB', fontSize: 13, fontWeight: 600 }}>Tandai semua dibaca</button>
      </div>

      <div className="space-y-2">
        {NOTIFIKASI_DATA.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer hover:shadow-sm transition-all"
            style={{
              background: n.read ? '#fff' : n.bg,
              border: `1px solid ${n.read ? '#F1F5F9' : 'transparent'}`,
              opacity: n.read ? 0.8 : 1,
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: n.read ? '#F1F5F9' : '#fff' }}>
              <n.icon size={18} style={{ color: n.read ? '#94A3B8' : n.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p style={{ color: '#0F172A', fontWeight: n.read ? 400 : 600, fontSize: 14 }}>{n.title}</p>
                {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#2563EB' }} />}
              </div>
              <p style={{ color: '#64748B', fontSize: 13, marginTop: 2, lineHeight: 1.5 }}>{n.desc}</p>
              <p style={{ color: '#94A3B8', fontSize: 11, marginTop: 4 }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfilSiswa() {
  const { navigate, isDarkMode } = useApp();
  const pageBg = isDarkMode ? '#020617' : '#F8FAFC';
  const cardBg = isDarkMode ? '#111827' : '#fff';
  const cardBorder = isDarkMode ? '#1E293B' : '#F1F5F9';
  const text = isDarkMode ? '#F8FAFC' : '#0F172A';
  const muted = isDarkMode ? '#94A3B8' : '#94A3B8';
  const soft = isDarkMode ? '#0F172A' : '#F8FAFC';

  const MENU = [
    { icon: Edit, label: 'Edit Profil', desc: 'Ubah nama, foto, dan data diri', color: '#2563EB', bg: '#EFF6FF', action: () => navigate('profile_edit') },
    { icon: Award, label: 'Riwayat Nilai', desc: 'Lihat semua nilai ujian', color: '#F59E0B', bg: '#FFF7ED', action: () => navigate('student_riwayat') },
    { icon: Settings, label: 'Pengaturan', desc: 'Kelola preferensi akun', color: '#64748B', bg: '#F1F5F9', action: () => navigate('profile_settings') },
    { icon: Camera, label: 'Data Fingerprint', desc: 'Kelola biometrik login', color: '#A855F7', bg: '#FDF4FF', action: () => navigate('profile_fingerprint') },
  ];

  return (
    <div className="max-w-2xl mx-auto" style={{ background: pageBg }}>
      {/* Profile Header */}
      <div className="px-5 pt-8 pb-6 flex flex-col items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #2563EB, #3B82F6)' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
          style={{ background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.5)' }}>
          NP
        </div>
        <div className="text-center">
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>Nabila Putri</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>nabila.putri@soramula.id</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <User size={13} style={{ color: '#fff' }} />
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>XI IPA 1 · Siswa</span>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-3">
        {/* Info Card */}
        <div className="p-4 rounded-2xl space-y-2" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          {[
            { label: 'Nama Lengkap', value: 'Nabila Putri' },
            { label: 'Email', value: 'nabila.putri@soramula.id' },
            { label: 'Kelas', value: 'XI IPA 1' },
            { label: 'Jurusan', value: 'Ilmu Pengetahuan Alam (IPA)' },
            { label: 'Tahun Ajaran', value: '2025/2026' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${soft}` }}>
              <span style={{ color: muted, fontSize: 13 }}>{item.label}</span>
              <span style={{ color: text, fontSize: 13, fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          {MENU.map((m, i) => (
            <button
              key={m.label}
              onClick={m.action}
              className="w-full flex items-center gap-4 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
              style={{ borderBottom: i < MENU.length - 1 ? `1px solid ${soft}` : 'none', background: cardBg }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: m.bg }}>
                <m.icon size={17} style={{ color: m.color }} />
              </div>
              <div className="flex-1">
                <p style={{ color: text, fontWeight: 600, fontSize: 14 }}>{m.label}</p>
                <p style={{ color: muted, fontSize: 12 }}>{m.desc}</p>
              </div>
              <ChevronRight size={16} style={{ color: '#CBD5E1' }} />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('login')}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold transition-all hover:opacity-90"
          style={{ background: '#FEE2E2', color: '#EF4444', border: '1px solid #FECACA' }}
        >
          <LogOut size={18} />
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
}
