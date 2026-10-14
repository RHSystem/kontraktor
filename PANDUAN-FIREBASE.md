# Panduan memasang ZUI KONTRAKTOR di Firebase

Lakukan dengan akun Google yang sama seperti project Zui lainnya. Semua langkah di Firebase Console bisa dari laptop atau HP (mode situs desktop).

## A. Cadangkan data lama dulu (wajib kalau ingin memindahkan data)

1. Buka ZUI KONTRAKTOR yang **masih memakai Supabase** (versi sekarang).
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
2. Di bagian **Your apps**, tekan ikon **Web `</>`**, beri nama `ZUI KONTRAKTOR`, lalu **Register app**. Hosting tidak perlu dicentang.
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

## H. Halaman klien + chat (fitur baru)

1. **Wajib:** buka Firestore Database → **Rules**, tempel ulang **seluruh isi `firestore.rules` yang baru**, lalu **Publish**. Tanpa ini, link klien dan chat tidak bisa dipakai.
2. Unggah juga file **`klien.html`** ke repo GitHub, di folder yang sama dengan `index.html`.
3. Di aplikasi, buka sebuah proyek → panel **Halaman klien** → **Buat link klien** (hanya pemilik/admin).
4. Tekan **Kirim link** untuk mengirimnya lewat WhatsApp, atau **Lihat sebagai klien** untuk melihat tampilannya.

Yang terlihat klien: progres + kurva S, laporan harian + foto, tagihan dan jadwal pembayaran, dokumen yang perlu disetujui (penawaran, pekerjaan tambah-kurang, berita acara), dan chat.
Yang **tidak** terlihat: RAB internal, biaya, upah, kasbon, vendor, PO, dan catatan internal tim.

Siapa bisa apa di chat:
- **Pemilik & admin**: membalas klien, kirim foto, mematikan/mengaktifkan link.
- **Staf**: membaca chat dan menulis catatan internal (tidak terlihat klien).
- **Hanya lihat**: tidak melihat chat.

Setiap proyek punya link dan ruang chat sendiri. Kalau link tersebar ke orang lain, tekan **Matikan link**; riwayat chat tetap tersimpan.
Data di halaman klien diperbarui otomatis beberapa detik setelah timmu menyimpan perubahan, selama ada anggota tim yang membuka aplikasi.

## I. Halaman pekerja + gaji bulanan (fitur baru)

1. **Wajib:** tempel ulang **seluruh isi `firestore.rules` yang baru** di Firestore → Rules, lalu **Publish**.
2. Unggah **`pekerja.html`** ke repo GitHub, di folder yang sama dengan `index.html`.
3. **Atur lokasi absen proyek:** saat berada di lokasi proyek, buka proyek → panel **Lokasi absen** → **Pakai lokasi saya sekarang**. Radius bawaan 200 m dan bisa diubah. Tanpa titik lokasi, absen tetap bisa tapi lokasinya hanya dicatat.
4. **Buat link pekerja:** Tugas → Pekerja → pilih pekerja → **Buat link**, tentukan PIN 4 angka, lalu **Kirim link** lewat WhatsApp. Sampaikan PIN langsung ke pekerja.
5. **Konfirmasi:** absen, laporan kerja, dan pengajuan kasbon/izin dari HP pekerja muncul di **Tugas → Absensi → Menunggu konfirmasi** (juga di Beranda). Mandor/staf bisa mengonfirmasi absen; kasbon hanya bisa disetujui pemilik/admin.

Yang dilihat pekerja: absen masuk/pulang (selfie + lokasi), tugasnya sendiri, lapor kerja + foto, upah belum dibayar, kasbon, slip upah/gaji, pengajuan kasbon/izin/sakit, dan chat dengan kantor.
Yang **tidak** dilihat: data pekerja lain, klien, invoice, biaya proyek, dan catatan internal.

**Gaji bulanan:** ubah pekerja → Sistem pembayaran **Gaji bulanan**, isi gaji pokok, tunjangan, dan potongan tetap. Lalu buka pekerja → **Bayar gaji** setiap bulan. Slip gaji (SG/…) bisa dicetak/PDF dan otomatis muncul di halaman pekerja.

**Catatan keamanan:** link pekerja adalah kunci utamanya, dan PIN melindungi kalau HP dipinjam orang lain. Kalau pekerja berhenti atau link tersebar, tekan **Matikan link**.
