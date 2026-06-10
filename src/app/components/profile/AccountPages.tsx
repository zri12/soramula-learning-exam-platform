import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  Fingerprint,
  Lock,
  MoonStar,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  User,
  Globe,
  Mail,
  BadgeCheck,
} from 'lucide-react';
import { useApp, Role, View } from '../../contexts';

const PROFILE_BACK_VIEW: Record<Role, View> = {
  siswa: 'student_profil',
  guru: 'teacher_profil',
  admin: 'admin_profil',
};

const ROLE_META: Record<Role, { title: string; subtitle: string; accent: string; icon: typeof User; initials: string }> = {
  siswa: {
    title: 'Profil Siswa',
    subtitle: 'Kelola identitas dan preferensi akun siswa',
    accent: '#2563EB',
    icon: User,
    initials: 'NP',
  },
  guru: {
    title: 'Profil Guru',
    subtitle: 'Atur data pengajar dan preferensi akun',
    accent: '#22C55E',
    icon: User,
    initials: 'RP',
  },
  admin: {
    title: 'Profil Petugas TU',
    subtitle: 'Atur data administrator dan akses akun',
    accent: '#7C3AED',
    icon: User,
    initials: 'SD',
  },
};

const PROFILE_FORM: Record<Role, Array<{ label: string; value: string; placeholder: string; icon: typeof Mail }>> = {
  siswa: [
    { label: 'Nama Lengkap', value: 'Nabila Putri', placeholder: 'Nabila Putri', icon: User },
    { label: 'Email', value: 'nabila.putri@soramula.id', placeholder: 'nama@soramula.id', icon: Mail },
    { label: 'Kelas', value: 'XI IPA 1', placeholder: 'XI IPA 1', icon: BadgeCheck },
    { label: 'Jurusan', value: 'Ilmu Pengetahuan Alam (IPA)', placeholder: 'IPA / IPS', icon: Globe },
  ],
  guru: [
    { label: 'Nama Lengkap', value: 'Rian Pratama, S.Pd.', placeholder: 'Nama guru', icon: User },
    { label: 'Email', value: 'rian.pratama@soramula.id', placeholder: 'nama@guru.id', icon: Mail },
    { label: 'Mata Pelajaran', value: 'Biologi', placeholder: 'Mata pelajaran', icon: BadgeCheck },
    { label: 'NIP', value: '198905152015041002', placeholder: 'NIP', icon: ShieldCheck },
  ],
  admin: [
    { label: 'Nama Lengkap', value: 'Sari Dewi, S.E.', placeholder: 'Nama petugas', icon: User },
    { label: 'Email', value: 'sari.dewi@soramula.id', placeholder: 'nama@sekolah.id', icon: Mail },
    { label: 'Jabatan', value: 'Petugas Tata Usaha', placeholder: 'Jabatan', icon: BadgeCheck },
    { label: 'NIP', value: '199205102015042001', placeholder: 'NIP', icon: ShieldCheck },
  ],
};

const SETTINGS_ITEMS = [
  { icon: Bell, label: 'Notifikasi Aplikasi', desc: 'Terima notifikasi ujian, nilai, dan pengumuman', enabled: true, kind: 'toggle' as const },
  { icon: MoonStar, label: 'Mode Gelap', desc: 'Aktifkan tampilan gelap untuk malam hari', enabled: false, kind: 'theme' as const },
  { icon: Lock, label: 'Kunci Otomatis', desc: 'Kunci aplikasi setelah tidak aktif', enabled: true, kind: 'toggle' as const },
  { icon: Smartphone, label: 'Login Perangkat Baru', desc: 'Minta verifikasi saat login dari perangkat baru', enabled: true, kind: 'toggle' as const },
];

const LIGHT_THEME = {
  page: '#F8FAFC',
  surface: '#fff',
  surfaceSoft: '#F8FAFC',
  surfaceAlt: '#F1F5F9',
  border: '#F1F5F9',
  borderSoft: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  mutedAlt: '#94A3B8',
  noteBg: '#EFF6FF',
  noteBorder: '#DBEAFE',
  noteText: '#1D4ED8',
  noteSubtext: '#1E40AF',
  inputBg: '#F8FAFC',
};

const DARK_THEME = {
  page: '#020617',
  surface: '#111827',
  surfaceSoft: '#0F172A',
  surfaceAlt: '#1F2937',
  border: '#1E293B',
  borderSoft: '#334155',
  text: '#F8FAFC',
  muted: '#94A3B8',
  mutedAlt: '#CBD5E1',
  noteBg: '#0F172A',
  noteBorder: '#1E3A8A',
  noteText: '#BFDBFE',
  noteSubtext: '#DBEAFE',
  inputBg: '#0F172A',
};

function HeaderCard({ role }: { role: Role }) {
  const meta = ROLE_META[role];
  const Icon = meta.icon;

  return (
    <div
      className="px-5 pt-8 pb-6 flex flex-col items-center gap-3"
      style={{ background: `linear-gradient(135deg, ${meta.accent}, #3B82F6)` }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
        style={{ background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.5)', color: '#fff' }}
      >
        {meta.initials}
      </div>
      <div className="text-center">
        <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>{meta.title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13 }}>{meta.subtitle}</p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }}>
        <Icon size={13} style={{ color: '#fff' }} />
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{role === 'siswa' ? 'XI IPA 1 · Siswa' : role === 'guru' ? 'Guru Biologi' : 'Petugas Tata Usaha'}</span>
      </div>
    </div>
  );
}

function ScreenShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const { isDarkMode } = useApp();
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div>
        <h2 className="hidden md:block" style={{ color: theme.text, fontWeight: 700, fontSize: 20 }}>{title}</h2>
        <p className="hidden md:block" style={{ color: theme.muted, fontSize: 13, marginTop: 4 }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export function EditProfilPage() {
  const { role, navigate, isDarkMode } = useApp();
  const [saving, setSaving] = useState(false);
  const meta = ROLE_META[role];
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  const backView = PROFILE_BACK_VIEW[role];
  const fields = PROFILE_FORM[role];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => navigate(backView), 650);
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: theme.page }}>
      <HeaderCard role={role} />
      <ScreenShell title="Edit Profil" subtitle="Perbarui data pribadi dan identitas akun Anda">
        <div className="rounded-2xl p-4" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="grid gap-4">
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <label key={field.label} className="grid gap-2">
                  <span style={{ color: theme.text, fontSize: 13, fontWeight: 600 }}>{field.label}</span>
                  <div className="relative">
                    <Icon size={16} style={{ color: meta.accent, position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl outline-none"
                      style={{
                        border: `1.5px solid ${theme.borderSoft}`,
                        background: theme.inputBg,
                        padding: '13px 16px 13px 42px',
                        fontSize: 14,
                        color: theme.text,
                      }}
                    />
                  </div>
                </label>
              );
            })}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => navigate(backView)}
              className="flex-1 py-3.5 rounded-2xl font-semibold"
              style={{ background: theme.surfaceAlt, color: theme.text }}
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 min-w-0 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 px-3"
              style={{ background: saving ? '#93C5FD' : meta.accent, color: '#fff' }}
            >
              <Save size={16} className="shrink-0" />
              <span className="whitespace-nowrap text-sm leading-none">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </div>
      </ScreenShell>
    </div>
  );
}

export function PengaturanPage() {
  const { role, navigate, isDarkMode, setIsDarkMode } = useApp();
  const [enabled, setEnabled] = useState(() => SETTINGS_ITEMS.map((item) => item.enabled));
  const meta = ROLE_META[role];
  const backView = PROFILE_BACK_VIEW[role];
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  return (
    <div className="h-full overflow-y-auto" style={{ background: theme.page }}>
      <HeaderCard role={role} />
      <ScreenShell title="Pengaturan" subtitle="Kelola preferensi akun dan keamanan aplikasi">
        <div className="rounded-2xl overflow-hidden" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
          {SETTINGS_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const currentEnabled = item.kind === 'theme' ? isDarkMode : enabled[index];
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.kind === 'theme') {
                    setIsDarkMode(!isDarkMode);
                    return;
                  }
                  setEnabled((prev) => prev.map((value, currentIndex) => currentIndex === index ? !value : value));
                }}
                className="w-full flex items-center gap-4 px-4 py-4 text-left"
                style={{ borderBottom: index < SETTINGS_ITEMS.length - 1 ? `1px solid ${theme.border}` : 'none', background: theme.surface }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: theme.surfaceSoft }}>
                  <Icon size={18} style={{ color: index % 2 === 0 ? meta.accent : '#F59E0B' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: theme.text, fontWeight: 600, fontSize: 14 }}>{item.label}</p>
                  <p style={{ color: theme.mutedAlt, fontSize: 12, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span style={{ color: currentEnabled ? '#16A34A' : theme.mutedAlt, fontSize: 12, fontWeight: 600 }}>
                    {currentEnabled ? 'Aktif' : 'Mati'}
                  </span>
                  <ChevronRight size={16} style={{ color: '#CBD5E1' }} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl p-4" style={{ background: theme.noteBg, border: `1px solid ${theme.noteBorder}` }}>
          <p style={{ color: theme.noteText, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Catatan</p>
          <p style={{ color: theme.noteSubtext, fontSize: 13, lineHeight: 1.6 }}>
            Perubahan di halaman ini adalah simulasi UI. Untuk benar-benar tersimpan ke akun, perlu integrasi backend.
          </p>
        </div>

        <button
          onClick={() => navigate(backView)}
          className="w-full py-3.5 rounded-2xl font-semibold"
          style={{ background: meta.accent, color: '#fff' }}
        >
          Simpan dan Kembali
        </button>
      </ScreenShell>
    </div>
  );
}

export function DataFingerprintPage() {
  const { navigate, role, isDarkMode } = useApp();
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  useEffect(() => {
    if (status !== 'scanning') return;
    const timer = setTimeout(() => setStatus('verified'), 1800);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="h-full overflow-y-auto" style={{ background: theme.page }}>
      <HeaderCard role={role} />
      <ScreenShell title="Data Fingerprint" subtitle="Kelola biometrik login untuk masuk cepat dan aman">
        <div className="rounded-2xl p-5 space-y-4" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#FDF4FF' }}>
              <Fingerprint size={28} style={{ color: '#A855F7' }} />
            </div>
            <div className="flex-1">
              <p style={{ color: theme.text, fontWeight: 700, fontSize: 15 }}>Fingerprint Login</p>
              <p style={{ color: theme.muted, fontSize: 13, lineHeight: 1.5 }}>
                {status === 'verified'
                  ? 'Sidik jari berhasil diverifikasi dan siap digunakan.'
                  : status === 'scanning'
                  ? 'Sedang memindai sidik jari...'
                  : 'Belum ada sidik jari terdaftar untuk akun ini.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Terdaftar', value: '1 perangkat' },
              { label: 'Metode', value: 'Sensor biometrik' },
              { label: 'Status', value: status === 'verified' ? 'Aktif' : 'Siap' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-3" style={{ background: '#F8FAFC' }}>
                <p style={{ color: theme.mutedAlt, fontSize: 11 }}>{item.label}</p>
                <p style={{ color: theme.text, fontWeight: 700, fontSize: 13, marginTop: 4 }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4" style={{ background: status === 'verified' ? '#DCFCE7' : theme.noteBg }}>
            <p style={{ color: status === 'verified' ? '#16A34A' : theme.noteText, fontSize: 13, fontWeight: 600 }}>
              {status === 'verified' ? 'Fingerprint berhasil didaftarkan.' : 'Tekan tombol di bawah untuk memulai pendaftaran.'}
            </p>
          </div>

          <button
            onClick={() => setStatus('scanning')}
            className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
            style={{ background: '#A855F7', color: '#fff' }}
          >
            <Sparkles size={16} />
            {status === 'scanning' ? 'Memindai...' : status === 'verified' ? 'Pindai Ulang' : 'Daftarkan Fingerprint'}
          </button>
        </div>

        <button
          onClick={() => navigate('student_profil')}
          className="w-full py-3.5 rounded-2xl font-semibold"
          style={{ background: theme.surfaceAlt, color: theme.text }}
        >
          Kembali ke Profil
        </button>
      </ScreenShell>
    </div>
  );
}
