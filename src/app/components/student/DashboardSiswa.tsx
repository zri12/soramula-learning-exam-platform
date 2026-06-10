import { BookOpen, ClipboardList, TrendingUp, Award, Bell, ChevronRight, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../../contexts';

const QUICK_LINKS = [
  { view: 'student_materi', label: 'Materi', icon: BookOpen, color: '#EFF6FF', icolor: '#2563EB' },
  { view: 'student_ujian', label: 'Ujian', icon: ClipboardList, color: '#F0FDF4', icolor: '#22C55E' },
  { view: 'student_progress', label: 'Progress', icon: TrendingUp, color: '#FFF7ED', icolor: '#F59E0B' },
  { view: 'student_riwayat', label: 'Nilai', icon: Award, color: '#FDF4FF', icolor: '#A855F7' },
] as const;

const RECENT_MATERI = [
  { id: 1, title: 'Sel dan Organelnya', mapel: 'Biologi', done: true, icon: '🔬' },
  { id: 2, title: 'Turunan Fungsi Aljabar', mapel: 'Matematika', done: false, icon: '📐' },
  { id: 3, title: 'Gelombang dan Bunyi', mapel: 'Fisika', done: false, icon: '🌊' },
];

export function DashboardSiswa() {
  const { navigate } = useApp();

  return (
    <div>
      {/* ── Header gradient ─────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)' }}>
        <div className="px-5 pt-8 pb-6 max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Selamat datang,</p>
              <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>Nabila Putri 👋</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
                XI IPA 1 · Lanjutkan belajar hari ini
              </p>
            </div>
            <button
              onClick={() => navigate('student_notifikasi')}
              className="relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Bell size={20} style={{ color: '#fff' }} />
              <span
                className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#EF4444', fontSize: 9, color: '#fff', fontWeight: 700 }}
              >
                3
              </span>
            </button>
          </div>

          {/* Progress card */}
          <div
            className="p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Progress Belajar</span>
              <span style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>65%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.25)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: '65%', background: '#fff', transition: 'width 1s ease' }}
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 6 }}>
              13 dari 20 materi selesai
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-2 space-y-4 pb-8">

        {/* Quick Links */}
        <div
          className="grid grid-cols-4 gap-2 p-4 rounded-2xl"
          style={{ background: '#fff', boxShadow: '0 4px 20px rgba(15,23,42,0.08)' }}
        >
          {QUICK_LINKS.map((ql) => (
            <button
              key={ql.view}
              onClick={() => navigate(ql.view as any)}
              className="flex flex-col items-center gap-1.5 py-1"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: ql.color }}
              >
                <ql.icon size={22} style={{ color: ql.icolor }} />
              </div>
              <span style={{ color: '#64748B', fontSize: 11, fontWeight: 600 }}>{ql.label}</span>
            </button>
          ))}
        </div>

        {/* Two-column on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ujian Terdekat */}
          <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 15 }}>Ujian Terdekat</h3>
              <button
                onClick={() => navigate('student_ujian')}
                style={{ color: '#2563EB', fontSize: 12, fontWeight: 600 }}
              >
                Lihat semua
              </button>
            </div>
            <div className="p-4 rounded-2xl" style={{ background: '#EFF6FF' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: '#2563EB', color: '#fff' }}
                >
                  Biologi
                </span>
              </div>
              <p style={{ color: '#0F172A', fontWeight: 700, fontSize: 15 }}>Ujian Biologi Bab 1</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1" style={{ color: '#64748B', fontSize: 12 }}>
                  <Calendar size={12} /> 21 Juni 2026
                </span>
                <span className="flex items-center gap-1" style={{ color: '#64748B', fontSize: 12 }}>
                  <Clock size={12} /> 90 menit
                </span>
              </div>
              <button
                onClick={() => navigate('student_ujian_detail')}
                className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#2563EB', color: '#fff' }}
              >
                Lihat Detail
              </button>
            </div>
          </div>

          {/* Materi Terbaru */}
          <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid #F1F5F9' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: 15 }}>Materi Terbaru</h3>
              <button
                onClick={() => navigate('student_materi')}
                style={{ color: '#2563EB', fontSize: 12, fontWeight: 600 }}
              >
                Lihat semua
              </button>
            </div>
            {RECENT_MATERI.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 cursor-pointer"
                style={{
                  padding: '10px 0',
                  borderBottom: i < RECENT_MATERI.length - 1 ? '1px solid #F8FAFC' : 'none',
                }}
                onClick={() => navigate('student_materi_detail' as any)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: '#F8FAFC' }}
                >
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: '#0F172A', fontWeight: 600, fontSize: 13 }} className="truncate">
                    {m.title}
                  </p>
                  <p style={{ color: '#64748B', fontSize: 11 }}>{m.mapel}</p>
                </div>
                {m.done ? (
                  <CheckCircle size={16} style={{ color: '#22C55E', flexShrink: 0 }} />
                ) : (
                  <ChevronRight size={16} style={{ color: '#CBD5E1', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats: 2-col mobile → 4-col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl" style={{ background: '#DCFCE7' }}>
            <p style={{ color: '#64748B', fontSize: 11 }}>Nilai Rata-rata</p>
            <p style={{ color: '#16A34A', fontSize: 24, fontWeight: 800 }}>82</p>
            <p style={{ color: '#94A3B8', fontSize: 11 }}>Dari 6 ujian</p>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: '#FFF7ED' }}>
            <p style={{ color: '#64748B', fontSize: 11 }}>Hari Belajar</p>
            <p style={{ color: '#F59E0B', fontSize: 24, fontWeight: 800 }}>14</p>
            <p style={{ color: '#94A3B8', fontSize: 11 }}>Bulan ini</p>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: '#EFF6FF' }}>
            <p style={{ color: '#64748B', fontSize: 11 }}>Materi Selesai</p>
            <p style={{ color: '#2563EB', fontSize: 24, fontWeight: 800 }}>13</p>
            <p style={{ color: '#94A3B8', fontSize: 11 }}>dari 20 total</p>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: '#FDF4FF' }}>
            <p style={{ color: '#64748B', fontSize: 11 }}>Ujian Diikuti</p>
            <p style={{ color: '#A855F7', fontSize: 24, fontWeight: 800 }}>6</p>
            <p style={{ color: '#94A3B8', fontSize: 11 }}>Semester ini</p>
          </div>
        </div>
      </div>
    </div>
  );
}
