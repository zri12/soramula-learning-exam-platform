import { createContext, useContext } from 'react';

export type View =
  | 'splash' | 'onboarding' | 'login' | 'register'
  | 'student_dashboard' | 'student_materi' | 'student_materi_detail'
  | 'student_progress' | 'student_ujian' | 'student_ujian_detail'
  | 'student_verifikasi' | 'student_exam' | 'student_hasil'
  | 'student_riwayat' | 'student_notifikasi' | 'student_profil'
  | 'teacher_dashboard' | 'teacher_materi' | 'teacher_ujian'
  | 'teacher_hasil' | 'teacher_monitoring' | 'teacher_notifikasi' | 'teacher_profil'
  | 'admin_dashboard' | 'admin_siswa' | 'admin_guru'
  | 'admin_kelas' | 'admin_akun' | 'admin_notifikasi' | 'admin_profil'
  | 'profile_edit' | 'profile_settings' | 'profile_fingerprint';

export type Role = 'siswa' | 'guru' | 'admin';

export interface AppContextType {
  view: View;
  navigate: (view: View) => void;
  role: Role;
  setRole: (role: Role) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  isMobile: boolean;
  showFaceAlert: boolean;
  setShowFaceAlert: (show: boolean) => void;
  examQuestion: number;
  setExamQuestion: (q: number) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppContext.Provider');
  return ctx;
}
