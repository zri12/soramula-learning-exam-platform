import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Calendar, Clock, CheckCircle, AlertCircle, Camera,
  ChevronLeft, ChevronRight, AlertTriangle, X
} from 'lucide-react';
import { useApp } from '../../contexts';
import { createCameraStream, detectFace, stopCameraStream } from '../../lib/faceDetection';

const UJIAN_DATA = [
  { id: 1, title: 'Ujian Biologi Bab 1', mapel: 'Biologi', tanggal: '21 Juni 2026', durasi: 90, soal: 20, status: 'tersedia' },
  { id: 2, title: 'Ujian Matematika Mid Semester', mapel: 'Matematika', tanggal: '25 Juni 2026', durasi: 120, soal: 30, status: 'tersedia' },
  { id: 3, title: 'Ujian Fisika Gelombang', mapel: 'Fisika', tanggal: '15 Juni 2026', durasi: 60, soal: 15, status: 'selesai' },
  { id: 4, title: 'Ujian Kimia Bab 2', mapel: 'Kimia', tanggal: '5 Juli 2026', durasi: 90, soal: 25, status: 'belum_dibuka' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  tersedia: { bg: '#EFF6FF', color: '#2563EB', label: 'Tersedia' },
  selesai: { bg: '#DCFCE7', color: '#16A34A', label: 'Selesai' },
  belum_dibuka: { bg: '#F1F5F9', color: '#64748B', label: 'Belum Dibuka' },
};

// ─── Daftar Ujian ─────────────────────────────────────────────────
export function UjianList() {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');

  const filtered = UJIAN_DATA.filter((u) =>
    u.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari ujian..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
          style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((u) => {
          const st = STATUS_STYLE[u.status];
          return (
            <div
              key={u.id}
              className="p-4 rounded-2xl"
              style={{ background: '#fff', border: '1px solid #F1F5F9' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: '#EFF6FF', color: '#2563EB' }}>{u.mapel}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: st.bg, color: st.color }}>{st.label}</span>
              </div>
              <h4 style={{ color: '#0F172A', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{u.title}</h4>
              <div className="flex flex-wrap gap-3 mb-3" style={{ color: '#64748B', fontSize: 12 }}>
                <span className="flex items-center gap-1"><Calendar size={12} />{u.tanggal}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{u.durasi} menit</span>
                <span>📝 {u.soal} soal</span>
              </div>
              <button
                onClick={() => navigate('student_ujian_detail')}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: u.status === 'tersedia' ? '#2563EB' : '#F1F5F9',
                  color: u.status === 'tersedia' ? '#fff' : '#64748B',
                }}
              >
                {u.status === 'selesai' ? 'Lihat Hasil' : 'Lihat Detail'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Detail Ujian ─────────────────────────────────────────────────
export function UjianDetail() {
  const { navigate } = useApp();

  return (
    <div className="p-4 space-y-4 pb-6">
      <button onClick={() => navigate('student_ujian')} style={{ color: '#2563EB', fontSize: 14, fontWeight: 600 }}>
        ← Kembali
      </button>

      <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: '#EFF6FF', color: '#2563EB' }}>Biologi</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: '#EFF6FF', color: '#2563EB' }}>Tersedia</span>
        </div>
        <h2 style={{ color: '#0F172A', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Ujian Biologi Bab 1</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Tanggal', value: '21 Juni 2026' },
            { label: 'Waktu', value: '09.00 - 10.30 WIB' },
            { label: 'Durasi', value: '90 menit' },
            { label: 'Jumlah Soal', value: '20 soal' },
          ].map((i) => (
            <div key={i.label} className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
              <p style={{ color: '#94A3B8', fontSize: 10 }}>{i.label}</p>
              <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 13 }}>{i.value}</p>
            </div>
          ))}
        </div>
        <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.7 }}>
          Ujian ini mencakup materi Bab 1 tentang Sel dan Organelnya.
        </p>
      </div>

      {/* Rules */}
      <div className="p-4 rounded-2xl" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={16} style={{ color: '#F59E0B' }} />
          <h4 style={{ color: '#92400E', fontWeight: 700, fontSize: 14 }}>Informasi Penting</h4>
        </div>
        <p style={{ color: '#92400E', fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>
          Sebelum ujian dimulai, sistem akan melakukan verifikasi wajah.
        </p>
        {['Pastikan kamera perangkat Anda aktif', 'Pastikan wajah Anda terlihat jelas di kamera', 'Jangan keluar dari halaman ujian'].map((rule, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <CheckCircle size={13} style={{ color: '#F59E0B', marginTop: 2, flexShrink: 0 }} />
            <span style={{ color: '#92400E', fontSize: 12 }}>{rule}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('student_verifikasi')}
        className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
        style={{ background: '#2563EB', color: '#fff', fontSize: 15 }}
      >
        <Camera size={18} /> Mulai Verifikasi Wajah
      </button>
    </div>
  );
}

// ─── Verifikasi Wajah ─────────────────────────────────────────────
export function VerifikasiWajah() {
  const { navigate } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<'detecting' | 'detected' | 'failed'>('detecting');
  const [message, setMessage] = useState('Mengaktifkan kamera...');
  const [scanY, setScanY] = useState(0);

  useEffect(() => {
    let active = true;
    let interval: number | undefined;
    let detectedStreak = 0;
    let missedStreak = 0;

    const startCamera = async () => {
      try {
        const stream = await createCameraStream();
        if (!active) {
          stopCameraStream(stream);
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setMessage('Kamera aktif. Pastikan wajah berada di tengah frame.');
        interval = window.setInterval(async () => {
          if (!active || !videoRef.current) return;
          try {
            const result = await detectFace(videoRef.current);
            if (result.hasFace) {
              detectedStreak += 1;
              missedStreak = 0;
              setStatus('detecting');
              setMessage('Wajah ditemukan, tahan posisi sebentar...');
              if (detectedStreak >= 3) {
                setStatus('detected');
                setMessage('Verifikasi wajah berhasil.');
                if (interval) window.clearInterval(interval);
              }
            } else {
              detectedStreak = 0;
              missedStreak += 1;
              setStatus(missedStreak >= 3 ? 'failed' : 'detecting');
              setMessage('Wajah belum terdeteksi. Arahkan wajah ke kamera.');
            }
          } catch {
            setStatus('failed');
            setMessage('Model deteksi wajah belum siap. Coba beberapa detik lagi.');
          }
        }, 700);
      } catch (error) {
        setStatus('failed');
        setMessage(error instanceof Error ? error.message : 'Kamera tidak dapat diakses.');
      }
    };

    startCamera();

    return () => {
      active = false;
      if (interval) window.clearInterval(interval);
      stopCameraStream(streamRef.current);
    };
  }, []);

  useEffect(() => {
    if (status !== 'detecting') return;
    const interval = setInterval(() => {
      setScanY((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 30);
    return () => clearInterval(interval);
  }, [status]);

  const statusInfo = {
    detecting: { color: '#2563EB', bg: '#EFF6FF', text: 'Mendeteksi wajah...', subtext: message },
    detected: { color: '#22C55E', bg: '#DCFCE7', text: 'Wajah terdeteksi', subtext: message },
    failed: { color: '#EF4444', bg: '#FEE2E2', text: 'Wajah tidak terdeteksi', subtext: message },
  }[status];

  return (
    <div className="flex flex-col min-h-full px-5 py-8 items-center gap-6">
      <div className="text-center">
        <h2 style={{ color: '#0F172A', fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Verifikasi Wajah</h2>
        <p style={{ color: '#64748B', fontSize: 13 }}>Pastikan wajah Anda berada di tengah frame dan terlihat jelas</p>
      </div>

      {/* Face Frame */}
      <div className="relative" style={{ width: 260, height: 300 }}>
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ background: '#1E293B' }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>

        {/* Face oval */}
        <div
          className="absolute"
          style={{
            left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: 170, height: 210,
            border: `3px solid ${statusInfo.color}`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transition: 'border-color 0.4s',
          }}
        />

        {/* Scan line */}
        {status === 'detecting' && (
          <div
            className="absolute rounded-full"
            style={{
              left: 'calc(50% - 68px)', width: 136, height: 2,
              top: `${48 + scanY * 0.8}%`,
              background: 'linear-gradient(90deg, transparent, #2563EB, transparent)',
              boxShadow: '0 0 8px #2563EB',
            }}
          />
        )}

        {/* Corner marks */}
        {[
          { top: 8, left: 8, bt: 0, br: 0, bl: 3, bb: 0 },
          { top: 8, right: 8, bt: 0, br: 3, bl: 0, bb: 0 },
          { bottom: 8, left: 8, bt: 0, br: 0, bl: 3, bb: 3 },
          { bottom: 8, right: 8, bt: 0, br: 3, bl: 0, bb: 3 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-5 h-5"
            style={{
              ...pos,
              borderColor: statusInfo.color,
              borderStyle: 'solid',
              borderWidth: '0',
              borderTopWidth: pos.bt || (i < 2 ? 3 : 0),
              borderBottomWidth: i >= 2 ? 3 : 0,
              borderLeftWidth: [0, 2].includes(i) ? 3 : 0,
              borderRightWidth: [1, 3].includes(i) ? 3 : 0,
              borderRadius: 3,
            }}
          />
        ))}

        {/* Status badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: statusInfo.bg }}
          >
            {status === 'detecting' && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#2563EB' }}
              />
            )}
            {status === 'detected' && <CheckCircle size={13} style={{ color: '#22C55E' }} />}
            {status === 'failed' && <AlertCircle size={13} style={{ color: '#EF4444' }} />}
            <span style={{ color: statusInfo.color, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {statusInfo.text}
            </span>
          </div>
        </div>
      </div>

      <p style={{ color: '#64748B', fontSize: 13, textAlign: 'center' }}>{statusInfo.subtext}</p>

      <div className="w-full space-y-3">
        <button
          onClick={() => status === 'detected' && navigate('student_exam')}
          disabled={status !== 'detected'}
          className="w-full py-4 rounded-2xl font-semibold text-sm transition-all"
          style={{
            background: status === 'detected' ? '#22C55E' : '#E2E8F0',
            color: status === 'detected' ? '#fff' : '#94A3B8',
            fontSize: 15,
          }}
        >
          {status === 'detected' ? 'Lanjutkan Ujian →' : 'Menunggu verifikasi...'}
        </button>
        {status !== 'detected' && (
          <button
            onClick={() => {
              setStatus('detected');
              setMessage('Verifikasi wajah dikonfirmasi.');
              navigate('student_exam');
            }}
            className="w-full py-4 rounded-2xl font-semibold text-sm transition-all"
            style={{
              background: '#EFF6FF',
              color: '#2563EB',
              border: '1.5px solid #BFDBFE',
              fontSize: 15,
            }}
          >
            Saya sudah terverifikasi
          </button>
        )}
        <button
          onClick={() => navigate('student_ujian_detail')}
          style={{ color: '#64748B', fontSize: 14, width: '100%', padding: '10px', textAlign: 'center' }}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

// ─── Halaman Ujian ────────────────────────────────────────────────
const SOAL_DATA = [
  {
    q: 'Organel sel yang berfungsi sebagai pusat pengendali aktivitas sel adalah...',
    opts: ['Mitokondria', 'Inti sel (Nukleus)', 'Ribosom', 'Retikulum Endoplasma'],
  },
  {
    q: 'Proses fotosintesis terjadi di dalam organel...',
    opts: ['Mitokondria', 'Nukleus', 'Kloroplas', 'Vakuola'],
  },
  {
    q: 'Membran sel tersusun dari...',
    opts: ['Protein saja', 'Lipid bilayer dan protein', 'Karbohidrat saja', 'DNA dan RNA'],
  },
];

export function HalamanUjian() {
  const { navigate, showFaceAlert, setShowFaceAlert } = useApp();
  const examVideoRef = useRef<HTMLVideoElement | null>(null);
  const examStreamRef = useRef<MediaStream | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(5400);
  const [faceVisible, setFaceVisible] = useState(false);
  const [cameraMessage, setCameraMessage] = useState('Mengaktifkan kamera');
  const totalQ = 20;

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let active = true;
    let interval: number | undefined;
    let missedStreak = 0;
    const startedAt = Date.now();
    let lastFaceSeenAt = Date.now();

    const startMonitoring = async () => {
      try {
        const stream = await createCameraStream();
        if (!active) {
          stopCameraStream(stream);
          return;
        }

        examStreamRef.current = stream;
        if (examVideoRef.current) {
          examVideoRef.current.srcObject = stream;
          await examVideoRef.current.play();
        }

        setCameraMessage('Kamera aktif');
        interval = window.setInterval(async () => {
          if (!active || !examVideoRef.current) return;
          const now = Date.now();
          const isWarmingUp = now - startedAt < 10000;

          if (!examVideoRef.current.videoWidth || !examVideoRef.current.videoHeight) {
            missedStreak += 1;
            setFaceVisible(false);
            setCameraMessage('Kamera sedang menyiapkan frame');
            return;
          }

          try {
            const result = await detectFace(examVideoRef.current);
            setFaceVisible(result.hasFace);
            if (result.hasFace) {
              missedStreak = 0;
              lastFaceSeenAt = now;
              setCameraMessage('Wajah terdeteksi');
            } else {
              missedStreak += 1;
              setCameraMessage(isWarmingUp ? 'Menstabilkan deteksi wajah' : 'Wajah belum terbaca stabil');
              if (!isWarmingUp && missedStreak >= 8 && now - lastFaceSeenAt > 7000) {
                setShowFaceAlert(true);
              }
            }
          } catch {
            setFaceVisible(false);
            setCameraMessage('Deteksi wajah sedang disiapkan');
          }
        }, 800);
      } catch (error) {
        setFaceVisible(false);
        setCameraMessage(error instanceof Error ? error.message : 'Kamera tidak dapat diakses');
        setShowFaceAlert(true);
      }
    };

    startMonitoring();

    return () => {
      active = false;
      if (interval) window.clearInterval(interval);
      stopCameraStream(examStreamRef.current);
      setShowFaceAlert(false);
    };
  }, [setShowFaceAlert]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const soal = SOAL_DATA[currentQ % SOAL_DATA.length];

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}
      >
        <div>
          <p style={{ color: '#64748B', fontSize: 11 }}>Ujian Biologi Bab 1</p>
          <p style={{ color: '#0F172A', fontWeight: 700, fontSize: 15 }}>
            Soal {currentQ + 1} dari {totalQ}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{ background: timeLeft < 600 ? '#FEE2E2' : '#EFF6FF' }}
          >
            <Clock size={13} style={{ color: timeLeft < 600 ? '#EF4444' : '#2563EB' }} />
            <span style={{ color: timeLeft < 600 ? '#EF4444' : '#2563EB', fontWeight: 700, fontSize: 15 }}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl"
            title={cameraMessage}
            style={{ background: faceVisible ? '#DCFCE7' : '#FEE2E2' }}
          >
            <div className="relative w-9 h-7 rounded-lg overflow-hidden" style={{ background: '#0F172A' }}>
              <video
                ref={examVideoRef}
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              <span
                className="absolute right-1 top-1 w-2 h-2 rounded-full"
                style={{ background: faceVisible ? '#22C55E' : '#EF4444' }}
              />
            </div>
            <Camera size={13} style={{ color: faceVisible ? '#16A34A' : '#EF4444' }} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1" style={{ background: '#E2E8F0' }}>
        <div
          className="h-full"
          style={{
            width: `${((currentQ + 1) / totalQ) * 100}%`,
            background: '#2563EB',
            transition: 'width 0.3s',
          }}
        />
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Question */}
        <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
          <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 8 }}>Soal {currentQ + 1}</p>
          <p style={{ color: '#0F172A', fontSize: 14, fontWeight: 600, lineHeight: 1.7 }}>{soal.q}</p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {['A', 'B', 'C', 'D'].map((opt, i) => {
            const isSelected = answers[currentQ] === i;
            return (
              <button
                key={opt}
                onClick={() => setAnswers({ ...answers, [currentQ]: i })}
                className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                style={{
                  background: isSelected ? '#EFF6FF' : '#fff',
                  border: `2px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                  style={{
                    background: isSelected ? '#2563EB' : '#F8FAFC',
                    color: isSelected ? '#fff' : '#64748B',
                  }}
                >
                  {opt}
                </div>
                <span style={{ color: isSelected ? '#2563EB' : '#374151', fontSize: 13, fontWeight: isSelected ? 600 : 400 }}>
                  {soal.opts[i]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav */}
      <div className="p-4 flex gap-3" style={{ background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="flex-1 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-1"
          style={{
            background: '#F1F5F9',
            color: currentQ === 0 ? '#CBD5E1' : '#374151',
          }}
        >
          <ChevronLeft size={16} /> Sebelumnya
        </button>
        {currentQ < totalQ - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="flex-1 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-1"
            style={{ background: '#2563EB', color: '#fff' }}
          >
            Berikutnya <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => navigate('student_hasil')}
            className="flex-1 py-3 rounded-2xl font-semibold text-sm"
            style={{ background: '#22C55E', color: '#fff' }}
          >
            Kirim Jawaban ✓
          </button>
        )}
      </div>

      <FaceAlertModal />
    </div>
  );
}

function FaceAlertModal() {
  const { showFaceAlert, setShowFaceAlert } = useApp();

  return (
    <AnimatePresence>
      {showFaceAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{ background: 'rgba(15,23,42,0.55)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-full max-w-sm p-6 rounded-3xl"
            style={{ background: '#fff' }}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#FEE2E2' }}>
                <AlertTriangle size={30} style={{ color: '#EF4444' }} />
              </div>
              <div>
                <h3 style={{ color: '#0F172A', fontWeight: 800, fontSize: 17, marginBottom: 8 }}>Wajah Tidak Terdeteksi</h3>
                <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.7 }}>
                  Wajah Anda tidak terlihat oleh kamera. Mohon posisikan wajah kembali agar ujian dapat dilanjutkan.
                </p>
              </div>
              <div className="w-full p-3 rounded-xl" style={{ background: '#FFF7ED' }}>
                <p style={{ color: '#92400E', fontSize: 12, fontWeight: 600 }}>
                  ⚠️ Ujian dihentikan sementara, waktu tetap berjalan.
                </p>
              </div>
              <button
                onClick={() => setShowFaceAlert(false)}
                className="w-full py-3.5 rounded-2xl font-semibold"
                style={{ background: '#2563EB', color: '#fff', fontSize: 15 }}
              >
                Mengerti
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Hasil Ujian ──────────────────────────────────────────────────
export function HasilUjian() {
  const { navigate } = useApp();
  const nilai = 85;
  const lulus = nilai >= 75;

  return (
    <div className="p-4 flex flex-col items-center gap-5 pb-8">
      <h2 style={{ color: '#0F172A', fontWeight: 800, fontSize: 20 }}>Hasil Ujian</h2>

      {/* Score Hero */}
      <div
        className="w-full p-8 rounded-3xl flex flex-col items-center gap-3 text-center"
        style={{ background: lulus ? 'linear-gradient(135deg, #22C55E, #16A34A)' : 'linear-gradient(135deg, #EF4444, #DC2626)' }}
      >
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Nilai Akhir</div>
        <div style={{ color: '#fff', fontSize: 72, fontWeight: 800, lineHeight: 1 }}>{nilai}</div>
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.25)' }}
        >
          {lulus ? <CheckCircle size={14} style={{ color: '#fff' }} /> : <X size={14} style={{ color: '#fff' }} />}
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{lulus ? 'LULUS' : 'TIDAK LULUS'}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full grid grid-cols-3 gap-3">
        {[
          { label: 'Benar', value: 17, color: '#22C55E', bg: '#DCFCE7' },
          { label: 'Salah', value: 3, color: '#EF4444', bg: '#FEE2E2' },
          { label: 'Total Soal', value: 20, color: '#2563EB', bg: '#EFF6FF' },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-2xl text-center" style={{ background: s.bg }}>
            <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="w-full p-4 rounded-2xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
        {[
          { label: 'Nama Ujian', value: 'Ujian Biologi Bab 1' },
          { label: 'Tanggal', value: '21 Juni 2026' },
          { label: 'Durasi Ujian', value: '87 menit' },
        ].map((i) => (
          <div key={i.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ color: '#64748B', fontSize: 13 }}>{i.label}</span>
            <span style={{ color: '#0F172A', fontSize: 13, fontWeight: 600 }}>{i.value}</span>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => navigate('student_riwayat')}
          className="w-full py-3.5 rounded-2xl font-semibold border"
          style={{ borderColor: '#E2E8F0', color: '#374151', background: '#fff' }}
        >
          Review Jawaban
        </button>
        <button
          onClick={() => navigate('student_dashboard')}
          className="w-full py-3.5 rounded-2xl font-semibold"
          style={{ background: '#2563EB', color: '#fff' }}
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}

// ─── Riwayat Nilai ────────────────────────────────────────────────
const RIWAYAT_DATA = [
  { id: 1, ujian: 'Ujian Biologi Bab 1', tanggal: '21 Jun 2026', nilai: 85, status: 'Lulus' },
  { id: 2, ujian: 'Ujian Fisika Gelombang', tanggal: '15 Jun 2026', nilai: 78, status: 'Lulus' },
  { id: 3, ujian: 'Ujian Kimia Bab 2', tanggal: '10 Jun 2026', nilai: 92, status: 'Lulus' },
  { id: 4, ujian: 'Ujian Matematika Mid', tanggal: '5 Jun 2026', nilai: 65, status: 'Tidak Lulus' },
  { id: 5, ujian: 'Ujian Biologi Bab 0', tanggal: '1 Jun 2026', nilai: 88, status: 'Lulus' },
];

export function RiwayatNilai() {
  const { navigate } = useApp();

  return (
    <div className="p-4 space-y-3">
      <div className="relative mb-1">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
        <input
          placeholder="Cari riwayat..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none"
          style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 14 }}
        />
      </div>

      {RIWAYAT_DATA.map((r) => (
        <div
          key={r.id}
          className="flex items-center gap-3 p-4 rounded-2xl"
          style={{ background: '#fff', border: '1px solid #F1F5F9' }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-lg"
            style={{
              background: r.nilai >= 75 ? '#DCFCE7' : '#FEE2E2',
              color: r.nilai >= 75 ? '#16A34A' : '#EF4444',
            }}
          >
            {r.nilai}
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 13 }} className="truncate">{r.ujian}</p>
            <p style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>{r.tanggal}</p>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
            style={{
              background: r.status === 'Lulus' ? '#DCFCE7' : '#FEE2E2',
              color: r.status === 'Lulus' ? '#16A34A' : '#EF4444',
            }}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}
