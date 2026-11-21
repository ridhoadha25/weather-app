# Weatherly

Weatherly adalah aplikasi cuaca sederhana untuk melihat kondisi cuaca saat ini dan prakiraan cuaca lima hari. Cari berdasarkan nama kota atau gunakan lokasi perangkat.

## Fitur

- Mencari cuaca berdasarkan nama kota.
- Menggunakan lokasi perangkat untuk mencari cuaca di sekitar Anda.
- Menampilkan suhu, kondisi cuaca, suhu terasa, suhu tertinggi dan terendah.
- Menampilkan kelembapan, angin, jarak pandang, dan tutupan awan.
- Menampilkan waktu matahari terbit dan terbenam.
- Menampilkan prakiraan cuaca hingga lima hari.
- Tampilan responsif untuk perangkat desktop dan seluler.

## Teknologi

- React
- Vite
- Tailwind CSS
- OpenWeather API
- Lucide React

## Persiapan

Pastikan Node.js dan npm sudah terpasang, lalu siapkan API key dari [OpenWeather](https://openweathermap.org/api).

## Menjalankan secara lokal

1. Clone repository dan masuk ke folder proyek:

   ```bash
   git clone <URL-REPOSITORY-GITHUB>
   cd weatherly
   ```

2. Pasang dependensi:

   ```bash
   npm install
   ```

3. Buat file `.env` di folder utama proyek, sejajar dengan `package.json`, kemudian isi:

   ```env
   VITE_WEATHER_API_KEY=API_KEY_OPENWEATHER_ANDA
   ```

   Anda juga dapat menyalin `.env.example` sebagai contoh. Jangan masukkan API key asli ke `.env.example` atau commit file `.env` ke GitHub.

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

   Buka alamat lokal yang ditampilkan Vite di terminal.

## Perintah yang tersedia

```bash
npm run dev      # Menjalankan server pengembangan
npm run build    # Membuat build produksi di folder dist
npm run preview  # Meninjau build produksi secara lokal
npm run lint     # Menjalankan ESLint
```

## Deploy ke GitHub dan Vercel

1. Pastikan `.env` tidak ikut di-commit. File tersebut sudah tercantum di `.gitignore`.
2. Push kode proyek ke repository GitHub.
3. Di [Vercel](https://vercel.com/), impor repository GitHub tersebut sebagai proyek baru.
4. Untuk proyek Vite, gunakan pengaturan build berikut jika tidak terdeteksi otomatis:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Tambahkan environment variable di **Project Settings → Environment Variables**:
   - **Name:** `VITE_WEATHER_API_KEY`
   - **Value:** API key OpenWeather Anda
   - Pilih environment yang ingin digunakan, misalnya Production.
6. Deploy proyek. Jika environment variable diubah atau ditambahkan setelah deploy, lakukan redeploy agar perubahan diterapkan.

## Catatan keamanan API key

Saat ini aplikasi menggunakan API OpenWeather langsung dari browser. Variabel dengan awalan `VITE_` akan dimasukkan ke dalam bundle frontend saat build, sehingga API key dapat dilihat oleh pengguna aplikasi. Environment variable Vercel membantu mengelola konfigurasi deploy, tetapi tidak menyembunyikan nilai `VITE_` dari bundle browser.

Jangan gunakan konfigurasi ini untuk rahasia yang harus tetap privat. Untuk menyembunyikan API key, pindahkan permintaan OpenWeather ke fungsi backend/serverless dan simpan key sebagai environment variable server tanpa awalan `VITE_`.
