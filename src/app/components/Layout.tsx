import { ReactNode } from 'react';
import {
  Home, BookOpen, ClipboardList, User, Monitor, Users, Building2,
  Award, TrendingUp, UserCheck, Shield, GraduationCap, LogOut, Bell
} from 'lucide-react';
import { useApp, Role, View } from '../contexts';

// ─── Mobile bottom nav (compact, 4-5 items) ───────────────────────
const MOBILE_STUDENT = [
  { view: 'student_dashboard' as View, label: 'Beranda', icon: Home },
  { view: 'student_materi' as View, label: 'Materi', icon: BookOpen },
  { view: 'student_ujian' as View, label: 'Ujian', icon: ClipboardList },
  { view: 'student_profil' as View, label: 'Profil', icon: User },
];
const MOBILE_TEACHER = [
  { view: 'teacher_dashboard' as View, label: 'Beranda', icon: Home },
  { view: 'teacher_materi' as View, label: 'Materi', icon: BookOpen },
  { view: 'teacher_ujian' as View, label: 'Ujian', icon: ClipboardList },
  { view: 'teacher_monitoring' as View, label: 'Monitor', icon: Monitor },
  { view: 'teacher_profil' as View, label: 'Profil', icon: User },
];
const MOBILE_ADMIN = [
  { view: 'admin_dashboard' as View, label: 'Beranda', icon: Home },
  { view: 'admin_siswa' as View, label: 'Pengguna', icon: Users },
  { view: 'admin_kelas' as View, label: 'Kelas', icon: Building2 },
  { view: 'admin_profil' as View, label: 'Profil', icon: User },
];
const MOBILE_NAV: Record<Role, typeof MOBILE_STUDENT> = {
  siswa: MOBILE_STUDENT,
  guru: MOBILE_TEACHER,
  admin: MOBILE_ADMIN,
};

// ─── Desktop sidebar nav (full) ───────────────────────────────────
const SIDEBAR_STUDENT = [
  { view: 'student_dashboard' as View, label: 'Beranda', icon: Home },
  { view: 'student_materi' as View, label: 'Materi', icon: BookOpen },
  { view: 'student_ujian' as View, label: 'Ujian', icon: ClipboardList },
  { view: 'student_progress' as View, label: 'Progress Belajar', icon: TrendingUp },
  { view: 'student_riwayat' as View, label: 'Riwayat Nilai', icon: Award },
  { view: 'student_notifikasi' as View, label: 'Notifikasi', icon: Bell },
  { view: 'student_profil' as View, label: 'Profil', icon: User },
];
const SIDEBAR_TEACHER = [
  { view: 'teacher_dashboard' as View, label: 'Beranda', icon: Home },
  { view: 'teacher_materi' as View, label: 'Kelola Materi', icon: BookOpen },
  { view: 'teacher_ujian' as View, label: 'Kelola Ujian', icon: ClipboardList },
  { view: 'teacher_hasil' as View, label: 'Hasil Ujian', icon: Award },
  { view: 'teacher_monitoring' as View, label: 'Monitoring', icon: Monitor },
  { view: 'teacher_notifikasi' as View, label: 'Notifikasi', icon: Bell },
  { view: 'teacher_profil' as View, label: 'Profil', icon: User },
];
const SIDEBAR_ADMIN = [
  { view: 'admin_dashboard' as View, label: 'Beranda', icon: Home },
  { view: 'admin_siswa' as View, label: 'Data Siswa', icon: Users },
  { view: 'admin_guru' as View, label: 'Data Guru', icon: UserCheck },
  { view: 'admin_kelas' as View, label: 'Data Kelas', icon: Building2 },
  { view: 'admin_akun' as View, label: 'Kelola Akun', icon: Shield },
  { view: 'admin_notifikasi' as View, label: 'Notifikasi', icon: Bell },
  { view: 'admin_profil' as View, label: 'Profil', icon: User },
];
const SIDEBAR_NAV: Record<Role, typeof SIDEBAR_STUDENT> = {
  siswa: SIDEBAR_STUDENT,
  guru: SIDEBAR_TEACHER,
  admin: SIDEBAR_ADMIN,
};

// ─── Role accent styles ───────────────────────────────────────────
const ROLE_STYLE: Record<Role, { primary: string; activeBg: string }> = {
  siswa: { primary: '#2563EB', activeBg: '#EFF6FF' },
  guru:  { primary: '#2563EB', activeBg: '#EFF6FF' },
  admin: { primary: '#7C3AED', activeBg: '#EDE9FE' },
};

const ROLE_USER: Record<Role, { name: string; sub: string; initials: string }> = {
  siswa: { name: 'Nabila Putri',     sub: 'Siswa · XI IPA 1', initials: 'NP' },
  guru:  { name: 'Pak Rian Pratama', sub: 'Guru Biologi',      initials: 'RP' },
  admin: { name: 'Ibu Sari Dewi',    sub: 'Petugas TU',        initials: 'SD' },
};

const FULLSCREEN_VIEWS: View[] = ['student_verifikasi', 'student_exam'];

// ─── AppLayout ────────────────────────────────────────────────────
export function AppLayout({ children }: { children: ReactNode }) {
  const { role, navigate, view, isDarkMode } = useApp();

  if (FULLSCREEN_VIEWS.includes(view)) {
    return <div className="h-full">{children}</div>;
  }

  const mobileNav = MOBILE_NAV[role];
  const sidebarNav = SIDEBAR_NAV[role];
  const accent = ROLE_STYLE[role];
  const user = ROLE_USER[role];

  const isActive = (itemView: string) =>
    view === itemView || view.startsWith(itemView + '_');

  return (
    <div className="flex h-full">
      {/* ── Sidebar: md and larger ─────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0 border-r"
        style={{
          width: 240,
          background: isDarkMode ? '#0F172A' : '#fff',
          borderColor: isDarkMode ? '#1E293B' : '#E2E8F0',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: isDarkMode ? '#1E293B' : '#F1F5F9' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: accent.primary }}
          >
            <GraduationCap size={18} color="#fff" />
          </div>
          <div>
            <p style={{ color: '#0F172A', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
              Soramula
            </p>
            <p style={{ color: '#94A3B8', fontSize: 11 }}>Smart Learning</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarNav.map((item) => {
            const active = isActive(item.view);
            return (
              <button
                key={item.view}
                onClick={() => navigate(item.view)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: active ? accent.activeBg : 'transparent',
                  color: active ? accent.primary : '#64748B',
                  fontWeight: active ? 600 : 400,
                  fontSize: 14,
                }}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User card + logout */}
        <div className="p-3 border-t border-slate-100">
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: isDarkMode ? '#111827' : '#F8FAFC' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: accent.primary }}
            >
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p
                style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A', fontWeight: 600, fontSize: 13 }}
                className="truncate"
              >
                {user.name}
              </p>
              <p style={{ color: isDarkMode ? '#94A3B8' : '#94A3B8', fontSize: 11 }} className="truncate">
                {user.sub}
              </p>
            </div>
            <button
              onClick={() => navigate('login')}
              className="p-1.5 rounded-lg flex-shrink-0 transition-colors hover:bg-red-50"
              title="Keluar"
            >
              <LogOut size={14} color="#EF4444" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Content + mobile nav ───────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 overflow-y-auto" style={{ background: isDarkMode ? '#020617' : '#F8FAFC' }}>
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="md:hidden flex-shrink-0 flex items-center border-t"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            background: isDarkMode ? '#0F172A' : '#fff',
            borderColor: isDarkMode ? '#1E293B' : '#E2E8F0',
          }}
        >
          {mobileNav.map((item) => {
            const active = isActive(item.view);
            return (
              <button
                key={item.view}
                onClick={() => navigate(item.view)}
                className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
                style={{ color: active ? accent.primary : '#94A3B8' }}
              >
                <item.icon size={20} />
                <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
