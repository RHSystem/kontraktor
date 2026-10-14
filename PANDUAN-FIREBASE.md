# Panduan memasang Zui Kontraktor di Firebase

Lakukan dengan akun Google yang sama seperti project Zui lainnya. Semua langkah di Firebase Console bisa dari laptop atau HP (mode situs desktop).

## A. Cadangkan data lama dulu (wajib kalau ingin memindahkan data)

1. Buka Zui Kontraktor yang **masih memakai Supabase** (versi sekarang).
2. Masuk ke **Pengaturan → Data → Cadangkan data (.json)**.
3. Simpan file itu. Ulangi untuk setiap perusahaan kalau kamu punya lebih dari satu.

Jangan hapus atau timpa aplikasi lama sebelum langkah ini selesai.

## B. Buat project Firebase baru

1. Buka https://console.firebase.google.com dan masuk dengan akun Google yang biasa kamu pakai untuk Zui.
2. Tekan **Add project / Tambahkan project**, beri nama misalnya `zui-kontraktor`. Google Analytics boleh dimatikan.

## C. Aktifkan login

1. Menu **Build → Authentication → Get started**.
2. Tab **Sign-in method**:
   - Aktifkan **Email/Password**.
   - Aktifkan **Google** (pilih email dukungan, lalu Simpan).
3. Tab **Settings → Authorized domains**: tambahkan domain tempat aplikasi dipasang, misalnya `kontraktor.zuisystem.com` atau `namamu.github.io`.
4. (Opsional) Tab **Templates**: ganti bahasa email verifikasi dan reset kata sandi ke Bahasa Indonesia.

## D. Buat database Firestore

1. Menu **Build → Firestore Database → Create database**.
2. Lokasi: pilih **asia-southeast2 (Jakarta)**. Lokasi tidak bisa diganti setelah dibuat.
3. Pilih **production mode**.
4. Buka tab **Rules**, hapus isinya, tempel **seluruh isi file `firestore.rules`**, lalu tekan **Publish**.

Kalau ingin hanya akun tertentu yang boleh membuat perusahaan, ubah fungsi `canCreate()` di file rules (contohnya ada di dalam file) dan isi juga `allowedCreators` di `config.js`.

## E. Sambungkan aplikasi ke Firebase

1. Klik ikon roda gigi → **Project settings → General**.
2. Di bagian **Your apps**, tekan ikon **Web `</>`**, beri nama `Zui Kontraktor`, lalu **Register app**. Hosting tidak perlu dicentang.
3. Salin nilai `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, dan `appId`.
4. Buka file **`config.js`** dari paket ini dan ganti setiap `ISI_...` dengan nilai tadi.
5. Kalau config.js lama punya pengaturan `tagline`, `showLanding`, atau `pricing`, salin juga ke bagian bawah config.js baru.

## F. Uji dulu di folder terpisah (disarankan)

1. Unggah semua file paket ini (termasuk `config.js` yang sudah diisi) ke folder atau repo GitHub baru, misalnya `kontraktor-baru`.
2. Pastikan domainnya sudah ada di **Authorized domains** (langkah C.3).
3. Buka aplikasinya, lalu:
   - **Daftar** dengan email pemilik, buka email verifikasi, klik tautannya, lalu **Masuk**.
   - **Buat perusahaan**.
   - Masuk ke **Pengaturan → Data → Pulihkan dari cadangan**, pilih file .json dari langkah A.
   - Cek proyek, invoice, laporan harian, dan foto sudah muncul.

## G. Pindahkan sepenuhnya

1. Setelah uji coba lancar, unggah file yang sama ke repo aplikasi lama (timpa `index.html`, `sw.js`, dan **`config.js`**).
2. Undang ulang anggota tim lewat **Pengaturan → Tim**. Mereka perlu **daftar akun baru** dengan email yang diundang, karena akun Supabase tidak ikut pindah.
3. Biarkan project Supabase lama selama 1–2 minggu sebagai cadangan, baru setelah itu boleh dihapus.

## Catatan

- **Batas foto:** setiap laporan harian maksimal 6 foto. Foto otomatis dikecilkan supaya muat di batas penyimpanan Firestore per dokumen.
- **Kuota gratis:** paket gratis Firebase (Spark) punya batas baca/tulis harian. Untuk satu perusahaan kecil biasanya cukup. Kalau tim bertambah besar, pantau di menu **Usage** dan pertimbangkan paket Blaze (bayar sesuai pemakaian).
- **Lupa kata sandi:** tautan reset dari email membuka halaman Firebase untuk membuat kata sandi baru, lalu kembali masuk ke aplikasi.
- **Mode offline dan pengingat** tetap berjalan seperti sebelumnya.
