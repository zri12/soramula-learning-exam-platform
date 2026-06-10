<div align="center">
  <img src="./src/assets/logo.png" alt="Logo Soramula" width="96" />

  # Soramula

  **Smart Learning and Exam Platform**

  Platform pembelajaran dan ujian digital responsif untuk siswa, guru, dan
  petugas tata usaha.

  ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
</div>

## Tentang Project

Soramula merupakan prototype antarmuka sistem pembelajaran sekolah yang
menyatukan kegiatan belajar, pelaksanaan ujian, pemantauan hasil, dan
pengelolaan data akademik dalam satu aplikasi. Tampilan dibuat responsif agar
nyaman digunakan pada perangkat desktop maupun mobile.

> Project ini masih berupa frontend prototype. Data, autentikasi, verifikasi
> wajah, dan fingerprint yang ditampilkan merupakan simulasi untuk kebutuhan
> demonstrasi antarmuka.

## Fitur Utama

- Autentikasi dan pemilihan peran pengguna.
- Dashboard khusus untuk siswa, guru, dan petugas tata usaha.
- Materi pembelajaran dan pemantauan progress siswa.
- Ujian online, riwayat nilai, dan simulasi verifikasi wajah.
- Pengelolaan materi, ujian, hasil, serta monitoring peserta oleh guru.
- Pengelolaan data siswa, guru, kelas, dan akun oleh petugas tata usaha.
- Notifikasi, profil pengguna, pengaturan akun, dan dark mode.
- Layout responsif dengan sidebar desktop dan navigasi bawah pada mobile.

## Teknologi

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4
- Material UI
- Radix UI dan shadcn/ui
- Motion
- Recharts
- Lucide React

## Menjalankan Project

### Prasyarat

Pastikan [Node.js](https://nodejs.org/) dan npm sudah terpasang. Node.js versi
18 atau yang lebih baru direkomendasikan.

### Instalasi

```bash
git clone <URL_REPOSITORY>
cd PROJECT
npm install
```

### Development

```bash
npm run dev
```

Buka alamat yang ditampilkan oleh Vite, biasanya `http://localhost:5173`.

### Build Production

```bash
npm run build
```

Hasil build akan tersedia di folder `dist/`.

### Preview Build

```bash
npm run preview
```

## Akun Demo

| Peran | Email | Password |
| --- | --- | --- |
| Siswa | `siswa@soramula.id` | `siswa123` |
| Guru | `guru@soramula.id` | `guru123` |
| Petugas TU | `tu@soramula.id` | `tu123` |

Pilih peran pada halaman login. Kolom email dan password akan terisi otomatis
sesuai akun demo yang dipilih.

## Struktur Project

```text
.
|-- src/
|   |-- app/
|   |   |-- components/
|   |   |   |-- admin/
|   |   |   |-- auth/
|   |   |   |-- profile/
|   |   |   |-- student/
|   |   |   |-- teacher/
|   |   |   `-- ui/
|   |   |-- App.tsx
|   |   `-- contexts.tsx
|   |-- assets/
|   |-- styles/
|   `-- main.tsx
|-- index.html
|-- package.json
`-- vite.config.ts
```

## Script Tersedia

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat build production |
| `npm run preview` | Menjalankan preview hasil build |

## Lisensi dan Atribusi

Informasi komponen pihak ketiga tersedia di
[ATTRIBUTIONS.md](./ATTRIBUTIONS.md).
