import { useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AppContext, View, Role } from './contexts';
import { AuthFlow } from './components/auth/AuthFlow';
import { AppLayout } from './components/Layout';
import { DashboardSiswa } from './components/student/DashboardSiswa';
import { MateriList, MateriDetail, ProgressBelajar } from './components/student/MateriPages';
import { UjianList, UjianDetail, VerifikasiWajah, HalamanUjian, HasilUjian, RiwayatNilai } from './components/student/UjianPages';
import { NotifikasiSiswa, ProfilSiswa } from './components/student/StudentOther';
import {
  DashboardGuru, KelolaMateri, KelolaUjian,
  HasilUjianGuru, MonitoringUjian, ProfilGuru, NotifikasiGuru
} from './components/teacher/TeacherPages';
import {
  DashboardTU, KelolaDataSiswa, KelolaDataGuru,
  KelolaDataKelas, KelolaAkun, ProfilTU, NotifikasiTU
} from './components/admin/AdminPages';
import { DataFingerprintPage, EditProfilPage, PengaturanPage } from './components/profile/AccountPages';

const AUTH_VIEWS: View[] = ['splash', 'onboarding', 'login', 'register'];

function useAppCtx() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('No context');
  return ctx;
}

function PageRouter() {
  const { view } = useAppCtx();
  switch (view) {
    case 'student_dashboard': return <DashboardSiswa />;
    case 'student_materi': return <MateriList />;
    case 'student_materi_detail': return <MateriDetail />;
    case 'student_progress': return <ProgressBelajar />;
    case 'student_ujian': return <UjianList />;
    case 'student_ujian_detail': return <UjianDetail />;
    case 'student_verifikasi': return <VerifikasiWajah />;
    case 'student_exam': return <HalamanUjian />;
    case 'student_hasil': return <HasilUjian />;
    case 'student_riwayat': return <RiwayatNilai />;
    case 'student_notifikasi': return <NotifikasiSiswa />;
    case 'student_profil': return <ProfilSiswa />;
    case 'teacher_dashboard': return <DashboardGuru />;
    case 'teacher_materi': return <KelolaMateri />;
    case 'teacher_ujian': return <KelolaUjian />;
    case 'teacher_hasil': return <HasilUjianGuru />;
    case 'teacher_monitoring': return <MonitoringUjian />;
    case 'teacher_notifikasi': return <NotifikasiGuru />;
    case 'teacher_profil': return <ProfilGuru />;
    case 'admin_dashboard': return <DashboardTU />;
    case 'admin_siswa': return <KelolaDataSiswa />;
    case 'admin_guru': return <KelolaDataGuru />;
    case 'admin_kelas': return <KelolaDataKelas />;
    case 'admin_akun': return <KelolaAkun />;
    case 'admin_notifikasi': return <NotifikasiTU />;
    case 'admin_profil': return <ProfilTU />;
    case 'profile_edit': return <EditProfilPage />;
    case 'profile_settings': return <PengaturanPage />;
    case 'profile_fingerprint': return <DataFingerprintPage />;
    default: return <DashboardSiswa />;
  }
}

export default function App() {
  const [view, setView] = useState<View>('splash');
  const [role, setRole] = useState<Role>('siswa');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('soramula-theme') === 'dark';
  });
  const [showFaceAlert, setShowFaceAlert] = useState(false);
  const [examQuestion, setExamQuestion] = useState(1);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('soramula-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const navigate = (v: View) => setView(v);
  const isAuth = !AUTH_VIEWS.includes(view);

  const ctxValue = {
    view,
    navigate,
    role,
    setRole,
    isDarkMode,
    setIsDarkMode,
    isMobile,
    showFaceAlert,
    setShowFaceAlert,
    examQuestion,
    setExamQuestion,
  };

  return (
    <AppContext.Provider value={ctxValue}>
      <div
        className="h-screen overflow-hidden"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: isDarkMode ? '#020617' : '#ffffff',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
        }}
      >
        {!isAuth ? (
          /* Auth screens: mobile-card style centered on desktop */
          <div className="h-full flex items-center justify-center" style={{ background: isDarkMode ? '#020617' : '#EFF6FF' }}>
            <div
              className="w-full h-full overflow-hidden"
              style={{
                maxWidth: 430,
                boxShadow: isMobile ? 'none' : '0 25px 60px rgba(15,23,42,0.2)',
                borderRadius: isMobile ? 0 : 28,
                height: isMobile ? '100%' : '92vh',
                maxHeight: 900,
              }}
            >
              <AuthFlow />
            </div>
          </div>
        ) : (
          <AppLayout>
            <PageRouter />
          </AppLayout>
        )}
      </div>
    </AppContext.Provider>
  );
}
