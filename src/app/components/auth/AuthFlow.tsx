import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye, EyeOff, Fingerprint, ChevronRight, AlertCircle,
  CheckCircle, X, BookOpen, ClipboardList, TrendingUp, ArrowRight,
  GraduationCap, BookUser, Briefcase
} from 'lucide-react';
import { useApp, Role } from '../../contexts';
import logo from '../../../assets/logo.png';
import { authenticatePasskey, hasRegisteredPasskey } from '../../lib/biometrics';

// ─── Splash Screen ──────────────────────────────────────────────
function SplashScreen() {
  const { navigate, isDarkMode } = useApp();
  useEffect(() => {
    const t = setTimeout(() => navigate('onboarding'), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-full flex flex-col items-center justify-center"
      style={{ background: isDarkMode ? 'linear-gradient(160deg, #020617 0%, #0F172A 55%, #111827 100%)' : 'linear-gradient(160deg, #1D4ED8 0%, #2563EB 55%, #3B82F6 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center"
          style={{
            background: '#fff',
            border: '2px solid rgba(255,255,255,0.85)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          }}
        >
          <img
            src={logo}
            alt="Soramula"
            className="w-16 h-16 object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-center"
        >
          <h1 style={{ color: '#fff', fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>Soramula</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 6, letterSpacing: 0.3 }}>
            Smart Learning and Exam Platform
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={i === 0 ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="h-2 rounded-full"
              style={{
                width: i === 0 ? 20 : 8,
                background: i === 0 ? '#fff' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Onboarding ──────────────────────────────────────────────────
function OnboardingPage() {
  const { navigate, isDarkMode } = useApp();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      emoji: '📚',
      bg: '#EFF6FF',
      title: 'Belajar Digital Lebih Mudah',
      desc: 'Akses materi pembelajaran kapan saja dan di mana saja langsung dari smartphone-mu.',
    },
    {
      emoji: '🔒',
      bg: '#F0FDF4',
      title: 'Ujian Online yang Aman',
      desc: 'Sistem verifikasi wajah memastikan ujian berlangsung jujur dan terpantau sepenuhnya.',
    },
    {
      emoji: '📈',
      bg: '#FFF7ED',
      title: 'Pantau Progress Belajarmu',
      desc: 'Lihat perkembangan belajar dan nilai ujianmu dalam satu aplikasi yang mudah digunakan.',
    },
  ];

  const current = slides[slide];

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: isDarkMode ? '#020617' : '#fff', maxWidth: 430, margin: '0 auto' }}
    >
      {/* Illustration area */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: current.bg, transition: 'background 0.4s' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-4"
          >
            <div
              className="w-40 h-40 rounded-3xl flex items-center justify-center"
              style={{ background: isDarkMode ? '#111827' : '#fff', boxShadow: isDarkMode ? '0 12px 40px rgba(0,0,0,0.35)' : '0 12px 40px rgba(15,23,42,0.08)' }}
            >
              <span style={{ fontSize: 72 }}>{current.emoji}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text + Controls */}
      <div className="p-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h2 style={{ color: '#0F172A', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{current.title}</h2>
            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7 }}>{current.desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setSlide(i)}
              className="rounded-full cursor-pointer transition-all duration-300"
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                background: i === slide ? '#2563EB' : '#DBEAFE',
              }}
            />
          ))}
        </div>

        {slide < slides.length - 1 ? (
          <div className="space-y-3">
            <button
              onClick={() => setSlide(slide + 1)}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 15 }}
            >
              Selanjutnya <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('login')}
              style={{ color: '#94A3B8', fontSize: 14, width: '100%', padding: '10px', textAlign: 'center' }}
            >
              Lewati
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => navigate('register')}
              className="w-full py-4 rounded-2xl transition-all hover:opacity-90"
              style={{ background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 15 }}
            >
              Mulai Sekarang
            </button>
            <button
              onClick={() => navigate('login')}
              style={{ color: '#2563EB', fontSize: 14, width: '100%', padding: '10px', fontWeight: 600, textAlign: 'center' }}
            >
              Saya sudah punya akun
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Fingerprint Modal ────────────────────────────────────────────
function FingerprintModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [status, setStatus] = useState<'waiting' | 'success' | 'failed'>('waiting');
  const [message, setMessage] = useState('Ikuti dialog keamanan perangkat Anda untuk memverifikasi identitas.');

  useEffect(() => {
    let active = true;

    const runAuth = async () => {
      try {
        if (!hasRegisteredPasskey()) {
          throw new Error('Fingerprint belum didaftarkan. Buka Profil > Data Fingerprint untuk mendaftarkan perangkat ini.');
        }
        await authenticatePasskey();
        if (!active) return;
        setStatus('success');
        setMessage('Identitas Anda berhasil diverifikasi oleh perangkat.');
      } catch (error) {
        if (!active) return;
        setStatus('failed');
        setMessage(error instanceof Error ? error.message : 'Verifikasi fingerprint gagal.');
      }
    };

    runAuth();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(onSuccess, 1200);
      return () => clearTimeout(t);
    }
  }, [status]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center px-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-t-3xl p-8 flex flex-col items-center gap-6 mb-0"
        style={{ background: '#fff', maxWidth: 430 }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full" style={{ background: '#E2E8F0' }} />

        {/* Icon */}
        <div className="relative mt-2">
          <motion.div
            animate={status === 'waiting' ? { scale: [1, 1.18, 1], opacity: [0.25, 0.55, 0.25] } : {}}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute inset-0 rounded-full"
            style={{ background: status === 'failed' ? '#FEE2E2' : '#DBEAFE', margin: -20 }}
          />
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center relative z-10"
            style={{
              background: status === 'success' ? '#DCFCE7' : status === 'failed' ? '#FEE2E2' : '#EFF6FF',
            }}
          >
            <Fingerprint
              size={48}
              style={{ color: status === 'success' ? '#22C55E' : status === 'failed' ? '#EF4444' : '#2563EB' }}
            />
          </div>
        </div>

        <div className="text-center">
          <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
            {status === 'success' ? 'Fingerprint Berhasil' : status === 'failed' ? 'Fingerprint Gagal' : 'Login dengan Fingerprint'}
          </h3>
          <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6 }}>
            {status === 'success'
              ? message
              : status === 'failed'
              ? message
              : message}
          </p>
        </div>

        <div
          className="px-5 py-2.5 rounded-full text-sm font-semibold"
          style={{
            background: status === 'success' ? '#DCFCE7' : status === 'failed' ? '#FEE2E2' : '#EFF6FF',
            color: status === 'success' ? '#16A34A' : status === 'failed' ? '#DC2626' : '#2563EB',
          }}
        >
          {status === 'success' ? '✓ Fingerprint berhasil' : status === 'failed' ? '✗ Fingerprint gagal' : '• Menunggu sidik jari...'}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl border text-sm font-semibold"
          style={{ borderColor: '#E2E8F0', color: '#64748B', background: '#F8FAFC' }}
        >
          Batal
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Role Selector ────────────────────────────────────────────────
const ROLE_OPTIONS: { value: Role; label: string; sub: string; icon: typeof GraduationCap; color: string; bg: string; activeBg: string }[] = [
  { value: 'siswa', label: 'Siswa', sub: 'Pelajar SMA', icon: GraduationCap, color: '#2563EB', bg: '#EFF6FF', activeBg: '#2563EB' },
  { value: 'guru', label: 'Guru', sub: 'Pengajar', icon: BookUser, color: '#22C55E', bg: '#DCFCE7', activeBg: '#16A34A' },
  { value: 'admin', label: 'Petugas TU', sub: 'Administrator', icon: Briefcase, color: '#A855F7', bg: '#FDF4FF', activeBg: '#9333EA' },
];

const ROLE_CREDENTIALS: Record<Role, { email: string; password: string }> = {
  siswa: {
    email: 'siswa@soramula.id',
    password: 'siswa123',
  },
  guru: {
    email: 'guru@soramula.id',
    password: 'guru123',
  },
  admin: {
    email: 'tu@soramula.id',
    password: 'tu123',
  },
};

// ─── Login Page ───────────────────────────────────────────────────
function LoginPage() {
  const { navigate, role, setRole, isDarkMode } = useApp();
  const [showPass, setShowPass] = useState(false);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState('');

  const ROLE_DEFAULTS_VIEW: Record<Role, string> = {
    siswa: 'student_dashboard',
    guru: 'teacher_dashboard',
    admin: 'admin_dashboard',
  };

  useEffect(() => {
    const defaults = ROLE_CREDENTIALS[role];
    setEmail(defaults.email);
    setPassword(defaults.password);
    setError('');
  }, [role]);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Email dan password tidak boleh kosong.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(ROLE_DEFAULTS_VIEW[role] as any);
    }, 1500);
  };

  const handleFingerprintSuccess = () => {
    setShowFingerprint(false);
    navigate(ROLE_DEFAULTS_VIEW[role] as any);
  };

  const selectedRole = ROLE_OPTIONS.find((r) => r.value === role)!;

  return (
    <div className="h-full overflow-y-auto" style={{ background: isDarkMode ? '#020617' : '#F8FAFC' }}>
      {/* Header gradient */}
      <div
        className="px-5 pt-10 pb-8 flex flex-col items-center gap-2"
        style={{ background: 'linear-gradient(160deg, #1D4ED8 0%, #3B82F6 100%)' }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1"
          style={{ background: '#fff', border: '1.5px solid rgba(255,255,255,0.85)' }}
        >
          <img
            src={logo}
            alt="Soramula"
            className="w-10 h-10 object-contain"
          />
        </div>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>Soramula</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Smart Learning and Exam Platform</p>
      </div>

      <div className="px-5 -mt-4 pb-8">
        <div className="rounded-3xl p-5" style={{ background: isDarkMode ? '#111827' : '#fff', boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.35)' : '0 8px 32px rgba(15,23,42,0.10)' }}>

          {/* Role Selector */}
          <div className="mb-5">
            <p style={{ color: '#64748B', fontSize: 12, fontWeight: 600, marginBottom: 10, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Masuk sebagai
            </p>
            <div className="grid grid-cols-3 gap-2">
              {ROLE_OPTIONS.map((opt) => {
                const isActive = role === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setRole(opt.value);
                      const defaults = ROLE_CREDENTIALS[opt.value];
                      setEmail(defaults.email);
                      setPassword(defaults.password);
                      setError('');
                    }}
                    className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl transition-all"
                    style={{
                      background: isActive ? opt.activeBg : opt.bg,
                      border: `2px solid ${isActive ? opt.activeBg : 'transparent'}`,
                      transform: isActive ? 'scale(1.03)' : 'scale(1)',
                    }}
                  >
                    <opt.icon
                      size={20}
                      style={{ color: isActive ? '#fff' : opt.color }}
                    />
                    <span
                      style={{
                        color: isActive ? '#fff' : opt.color,
                        fontSize: 12,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textAlign: 'center',
                      }}
                    >
                      {opt.label}
                    </span>
                    <span
                      style={{
                        color: isActive ? 'rgba(255,255,255,0.75)' : '#94A3B8',
                        fontSize: 10,
                        textAlign: 'center',
                      }}
                    >
                      {opt.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: '#F1F5F9' }} />
            <span style={{ fontSize: 12, color: '#CBD5E1' }}>———</span>
            <div className="flex-1 h-px" style={{ background: '#F1F5F9' }} />
          </div>

          <h2 style={{ color: '#0F172A', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Masuk ke Soramula</h2>
          <p style={{ color: '#64748B', fontSize: 13, marginBottom: 18 }}>
            Login sebagai{' '}
            <span style={{ color: selectedRole.color, fontWeight: 700 }}>{selectedRole.label}</span>
          </p>

          {error && (
            <div
              className="flex items-center gap-2 p-3 rounded-xl mb-4"
              style={{ background: '#FEE2E2', color: '#DC2626' }}
            >
              <AlertCircle size={15} />
              <span style={{ fontSize: 13 }}>{error}</span>
            </div>
          )}

          <div className="space-y-3">
            {/* Email */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                placeholder="nama@sekolah.id"
                className="w-full px-4 py-3.5 rounded-xl outline-none transition-all"
                style={{
                  border: `2px solid ${focused === 'email' ? '#2563EB' : '#E2E8F0'}`,
                  background: '#F8FAFC',
                  fontSize: 14,
                  color: '#0F172A',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Password</label>
                <button style={{ fontSize: 12, color: '#2563EB', fontWeight: 600 }}>Lupa password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('pass')}
                  onBlur={() => setFocused('')}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl outline-none transition-all pr-12"
                  style={{
                    border: `2px solid ${focused === 'pass' ? '#2563EB' : '#E2E8F0'}`,
                    background: '#F8FAFC',
                    fontSize: 14,
                    color: '#0F172A',
                  }}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#94A3B8' }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span style={{ fontSize: 13, color: '#64748B' }}>Ingat saya</span>
            </label>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              style={{
                background: loading ? '#93C5FD' : '#2563EB',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Memproses...</span></>
              ) : (
                <>Masuk <ChevronRight size={16} /></>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
              <span style={{ fontSize: 12, color: '#94A3B8' }}>atau</span>
              <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
            </div>

            {/* Fingerprint */}
            <button
              onClick={() => setShowFingerprint(true)}
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all border"
              style={{ borderColor: '#E2E8F0', color: '#2563EB', fontWeight: 600, fontSize: 14, background: '#F8FAFC' }}
            >
              <Fingerprint size={18} />
              Login dengan Fingerprint
            </button>
          </div>

          <p className="text-center mt-5" style={{ fontSize: 14, color: '#64748B' }}>
            Belum punya akun?{' '}
            <button onClick={() => navigate('register')} style={{ color: '#2563EB', fontWeight: 700 }}>
              Daftar
            </button>
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showFingerprint && (
          <FingerprintModal onClose={() => setShowFingerprint(false)} onSuccess={handleFingerprintSuccess} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Register Page ─────────────────────────────────────────────────
function RegisterPage() {
  const { navigate, isDarkMode } = useApp();
  const [focused, setFocused] = useState('');

  const inputStyle = (field: string): React.CSSProperties => ({
    border: `2px solid ${focused === field ? '#2563EB' : '#E2E8F0'}`,
    background: '#F8FAFC',
    fontSize: 14,
    color: '#0F172A',
    borderRadius: 14,
    padding: '13px 16px',
    width: '100%',
    outline: 'none',
  });

  return (
    <div className="h-full overflow-y-auto pb-8" style={{ background: isDarkMode ? '#020617' : '#F8FAFC' }}>
      {/* Header */}
      <div
        className="px-5 pt-10 pb-8 flex flex-col items-center gap-2"
        style={{ background: 'linear-gradient(160deg, #1D4ED8 0%, #3B82F6 100%)' }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#fff' }}>
          <img
            src={logo}
            alt="Soramula"
            className="w-9 h-9 object-contain"
          />
        </div>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>Buat Akun Baru</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Daftar untuk mulai belajar di Soramula</p>
      </div>

      <div className="px-5 -mt-4">
        <div className="rounded-3xl p-5" style={{ background: isDarkMode ? '#111827' : '#fff', boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.35)' : '0 8px 32px rgba(15,23,42,0.10)' }}>
          <div className="space-y-4">
            {[
              { label: 'Nama Lengkap', field: 'nama', placeholder: 'Nabila Putri', type: 'text' },
              { label: 'Email', field: 'email', placeholder: 'nama@email.com', type: 'email' },
              { label: 'Password', field: 'pass', placeholder: '••••••••', type: 'password' },
              { label: 'Konfirmasi Password', field: 'cpass', placeholder: '••••••••', type: 'password' },
              { label: 'Kelas', field: 'kelas', placeholder: 'Contoh: XI', type: 'text' },
              { label: 'Jurusan', field: 'jurusan', placeholder: 'IPA / IPS', type: 'text' },
            ].map((f) => (
              <div key={f.field}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  onFocus={() => setFocused(f.field)}
                  onBlur={() => setFocused('')}
                  style={inputStyle(f.field)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('login')}
            className="w-full py-4 rounded-2xl mt-5 transition-all hover:opacity-90"
            style={{ background: '#2563EB', color: '#fff', fontWeight: 700, fontSize: 15 }}
          >
            Daftar Sekarang
          </button>

          <p className="text-center mt-4" style={{ fontSize: 14, color: '#64748B' }}>
            Sudah punya akun?{' '}
            <button onClick={() => navigate('login')} style={{ color: '#2563EB', fontWeight: 700 }}>
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── AuthFlow Router ──────────────────────────────────────────────
export function AuthFlow() {
  const { view } = useApp();

  return (
    <div className="h-full" style={{ maxWidth: 430, margin: '0 auto' }}>
      {view === 'splash' && <SplashScreen />}
      {view === 'onboarding' && <OnboardingPage />}
      {view === 'login' && <LoginPage />}
      {view === 'register' && <RegisterPage />}
    </div>
  );
}
