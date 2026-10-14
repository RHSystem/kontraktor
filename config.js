/* Pengaturan ZUI KONTRAKTOR (versi Firebase).
   Isi bagian "firebase" dengan data dari Firebase Console:
   Project settings (ikon roda gigi) → General → Your apps → aplikasi Web → SDK setup and configuration → Config.
   Lihat PANDUAN-FIREBASE.md untuk langkah lengkap. */
window.MANDOR_CONFIG = {
  firebase: {
    apiKey: "AIzaSyCmDBwFbquqMpdadgukA7Ti1Kq3E_loLgM",
    authDomain: "kontraktor-zui.firebaseapp.com",
    projectId: "kontraktor-zui",
    storageBucket: "kontraktor-zui.firebasestorage.app",
    messagingSenderId: "520179011046",
    appId: "1:520179011046:web:aa8a77761c008138e91a27"
  },

  // Tampilkan tombol "Masuk dengan Google" (aktifkan juga Google di Firebase Authentication).
  enableGoogle: true,

  // Siapa saja yang boleh membuat perusahaan baru. Kosongkan [] agar semua akun boleh.
  // Contoh: allowedCreators: ["info.zuisystem@gmail.com"],
  allowedCreators: [],

  // Bagian di bawah ini sama seperti sebelumnya. Salin dari config.js lama bila kamu sudah mengisinya.
  tagline: "Aplikasi Kontraktor",
  showLanding: true,
  pricing: { trialDays: 14, yearlyMonths: 10, whatsapp: "", email: "" }
};
