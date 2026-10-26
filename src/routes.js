// Satu sumber kebenaran untuk seluruh alur halaman. Ubah tujuan klik cukup di sini.
export const ROUTES = {
  home: '/',
  login: '/login',
  role: '/register',
  registerWarga: '/register/warga',
  registerPengepul: '/register/pengepul',
  registerPengepulUsaha: '/register/pengepul/usaha',
  forgot: '/forgot-password',
  forgotOtp: '/forgot-password/otp',
  forgotReset: '/forgot-password/reset',
  // Tujuan setelah berhasil masuk. Belum ada dashboard di website, jadi kembali ke beranda.
  afterLogin: '/',
};
