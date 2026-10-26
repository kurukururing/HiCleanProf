import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollManager } from './components/layout/ScrollManager';
import { Hero } from './components/sections/Hero';
import { Problem } from './components/sections/Problem';
import { HowItWorks } from './components/sections/HowItWorks';
import { Features } from './components/sections/Features';
import { Technology } from './components/sections/Technology';
import { Partners } from './components/sections/Partners';
import { Contact } from './components/sections/Contact';
import { LoginPage } from './pages/auth/LoginPage';
import { RolePage } from './pages/auth/RolePage';
import { RegisterAccountPage } from './pages/auth/RegisterAccountPage';
import { RegisterBusinessPage } from './pages/auth/RegisterBusinessPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OtpPage } from './pages/auth/OtpPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';
import { ActivePickupPage } from './pages/dashboard/ActivePickupPage';
import { TipsPageImpl as TipsPage } from './pages/dashboard/TipsPage';
import { HistoryPage } from './pages/dashboard/HistoryPage';
import { HistoryDetailPage } from './pages/dashboard/HistoryDetailPage';
import { PickupResortPage } from './pages/dashboard/PickupResortPage';
import { PickupSuccessPage } from './pages/dashboard/PickupSuccessPage';
import { RedemptionPage } from './pages/dashboard/RedemptionPage';
import { WalletRedemptionPage } from './pages/dashboard/WalletRedemptionPage';
import { TicketRedemptionPage } from './pages/dashboard/TicketRedemptionPage';
import { RedemptionSuccessPage } from './pages/dashboard/RedemptionSuccessPage';
import { RedemptionHistoryPage } from './pages/dashboard/RedemptionHistoryPage';
import { PointsHistoryPage } from './pages/dashboard/PointsHistoryPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';
import { DataDiriPage } from './pages/dashboard/DataDiriPage';
import { AddressListPage } from './pages/dashboard/AddressListPage';
import { AddAddressPage } from './pages/dashboard/AddAddressPage';
import { LanguageSettingsPage } from './pages/dashboard/LanguageSettingsPage';
import { SecuritySettingsPage } from './pages/dashboard/SecuritySettingsPage';
import { GeneralSettingsPage } from './pages/dashboard/GeneralSettingsPage';
import { SetoranMainPage } from './pages/dashboard/SetoranMainPage';
import { SetoranStep1Page } from './pages/dashboard/SetoranStep1Page';
import { SetoranStep2Page } from './pages/dashboard/SetoranStep2Page';
import { SetoranStep3Page } from './pages/dashboard/SetoranStep3Page';
import { SetoranStep4Page } from './pages/dashboard/SetoranStep4Page';
import { SetoranSuccessPage } from './pages/dashboard/SetoranSuccessPage';
import { SetoranActiveListPage } from './pages/dashboard/SetoranActiveListPage';
import { SetoranCameraPage } from './pages/dashboard/SetoranCameraPage';

// Pengepul Pages
import { PengepulDashboardPage } from './pages/pengepul/PengepulDashboardPage';
import { PengepulProfilePage } from './pages/pengepul/PengepulProfilePage';
import { PengepulDataDiriPage } from './pages/pengepul/PengepulDataDiriPage';
import { PengepulAreaLayananPage } from './pages/pengepul/PengepulAreaLayananPage';
import { PengepulAturPenerimaanPage } from './pages/pengepul/PengepulAturPenerimaanPage';
import { PengepulBahasaPage } from './pages/pengepul/PengepulBahasaPage';
import { PengepulJamOperasionalPage } from './pages/pengepul/PengepulJamOperasionalPage';
import { PengepulPengaturanPage } from './pages/pengepul/PengepulPengaturanPage';
import { PengepulRutePage } from './pages/pengepul/PengepulRutePage';
import { PengepulAturRutePage } from './pages/pengepul/PengepulAturRutePage';
import { PengepulPilihRutePage } from './pages/pengepul/PengepulPilihRutePage';
import { PengepulRuteBerhasilPage } from './pages/pengepul/PengepulRuteBerhasilPage';
import { PengepulRuteNavigasiPage } from './pages/pengepul/PengepulRuteNavigasiPage';
import { PengepulDetailPickupPage } from './pages/pengepul/PengepulDetailPickupPage';
import { PengepulVerifikasiPage } from './pages/pengepul/PengepulVerifikasiPage';
import { PengepulMaterialPage } from './pages/pengepul/PengepulMaterialPage';
import { PengepulMaterialDetailPage } from './pages/pengepul/PengepulMaterialDetailPage';
import { PengepulDistribusiMaterialPage } from './pages/pengepul/PengepulDistribusiMaterialPage';
import { PengepulDetailDistribusiPage } from './pages/pengepul/PengepulDetailDistribusiPage';
import { PengepulPengajuanDistribusiPage } from './pages/pengepul/PengepulPengajuanDistribusiPage';
import { PengepulPermintaanMitraPage } from './pages/pengepul/PengepulPermintaanMitraPage';
import { PengepulTerimaPermintaanPage } from './pages/pengepul/PengepulTerimaPermintaanPage';
import { PengepulFotoMaterialPage } from './pages/pengepul/PengepulFotoMaterialPage';
import { PengepulMaterialSuksesPage } from './pages/pengepul/PengepulMaterialSuksesPage';
import { PengepulNotifikasiPage } from './pages/pengepul/PengepulNotifikasiPage';

import { ROUTES } from './routes';

// Navbar + Footer company profile dipakai di semua halaman.
function SiteLayout() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <main className="flex-grow">
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Technology />
      <Partners />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />

          <Route path={ROUTES.login} element={<LoginPage />} />

          <Route path={ROUTES.role} element={<RolePage />} />
          <Route path={ROUTES.registerWarga} element={<RegisterAccountPage role="warga" />} />
          <Route path={ROUTES.registerPengepul} element={<RegisterAccountPage role="pengepul" />} />
          <Route path={ROUTES.registerPengepulUsaha} element={<RegisterBusinessPage />} />

          <Route path={ROUTES.forgot} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.forgotOtp} element={<OtpPage />} />
          <Route path={ROUTES.forgotReset} element={<ResetPasswordPage />} />

          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Route>

        {/* Warga Routes */}
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.notifications} element={<NotificationsPage />} />
        <Route path={ROUTES.activePickup} element={<ActivePickupPage />} />
        <Route path={ROUTES.tips} element={<TipsPage />} />
        <Route path={ROUTES.history} element={<HistoryPage />} />
        <Route path={ROUTES.historyDetail} element={<HistoryDetailPage />} />
        <Route path={ROUTES.pickupResort} element={<PickupResortPage />} />
        <Route path={ROUTES.pickupSuccess} element={<PickupSuccessPage />} />
        <Route path={ROUTES.redemption} element={<RedemptionPage />} />
        <Route path={ROUTES.redemptionWallet} element={<WalletRedemptionPage />} />
        <Route path={ROUTES.redemptionTicket} element={<TicketRedemptionPage />} />
        <Route path={ROUTES.redemptionSuccess} element={<RedemptionSuccessPage isTicket={false} />} />
        <Route path={ROUTES.redemptionSuccessTicket} element={<RedemptionSuccessPage isTicket={true} />} />
        <Route path={ROUTES.redemptionHistory} element={<RedemptionHistoryPage />} />
        <Route path={ROUTES.pointsHistory} element={<PointsHistoryPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={ROUTES.profileData} element={<DataDiriPage />} />
        <Route path={ROUTES.profileAddress} element={<AddressListPage />} />
        <Route path={ROUTES.profileAddressAdd} element={<AddAddressPage />} />
        <Route path={ROUTES.profileLanguage} element={<LanguageSettingsPage />} />
        <Route path={ROUTES.profileSecurity} element={<SecuritySettingsPage />} />
        <Route path={ROUTES.generalSettings} element={<GeneralSettingsPage />} />
        <Route path={ROUTES.setoranMain} element={<SetoranMainPage />} />
        <Route path={ROUTES.setoranStep1} element={<SetoranStep1Page />} />
        <Route path={ROUTES.setoranStep2} element={<SetoranStep2Page />} />
        <Route path={ROUTES.setoranStep3} element={<SetoranStep3Page />} />
        <Route path={ROUTES.setoranStep4} element={<SetoranStep4Page />} />
        <Route path={ROUTES.setoranSuccess} element={<SetoranSuccessPage />} />
        <Route path={ROUTES.setoranActiveList} element={<SetoranActiveListPage />} />
        <Route path={ROUTES.setoranCamera} element={<SetoranCameraPage />} />

        {/* Pengepul Routes */}
        <Route path={ROUTES.pengepulDashboard} element={<PengepulDashboardPage />} />
        <Route path={ROUTES.pengepulProfile} element={<PengepulProfilePage />} />
        <Route path={ROUTES.pengepulDataDiri} element={<PengepulDataDiriPage />} />
        <Route path={ROUTES.pengepulAreaLayanan} element={<PengepulAreaLayananPage />} />
        <Route path={ROUTES.pengepulAturPenerimaan} element={<PengepulAturPenerimaanPage />} />
        <Route path={ROUTES.pengepulBahasa} element={<PengepulBahasaPage />} />
        <Route path={ROUTES.pengepulJamOperasional} element={<PengepulJamOperasionalPage />} />
        <Route path={ROUTES.pengepulPengaturan} element={<PengepulPengaturanPage />} />
        <Route path={ROUTES.pengepulRoute} element={<PengepulRutePage />} />
        <Route path={ROUTES.pengepulRouteAtur} element={<PengepulAturRutePage />} />
        <Route path={ROUTES.pengepulRoutePilih} element={<PengepulPilihRutePage />} />
        <Route path={ROUTES.pengepulRouteBerhasil} element={<PengepulRuteBerhasilPage />} />
        <Route path={ROUTES.pengepulRouteNavigasi} element={<PengepulRuteNavigasiPage />} />
        <Route path={ROUTES.pengepulRouteDetail} element={<PengepulDetailPickupPage />} />
        <Route path={ROUTES.pengepulVerifikasi} element={<PengepulVerifikasiPage />} />
        <Route path={ROUTES.pengepulMaterial} element={<PengepulMaterialPage />} />
        <Route path={ROUTES.pengepulMaterialDetail} element={<PengepulMaterialDetailPage />} />
        <Route path={ROUTES.pengepulMaterialDistribusi} element={<PengepulDistribusiMaterialPage />} />
        <Route path={ROUTES.pengepulMaterialDistribusiLacak} element={<PengepulDetailDistribusiPage />} />
        <Route path={ROUTES.pengepulMaterialDistribusiPengajuan} element={<PengepulPengajuanDistribusiPage />} />
        <Route path={ROUTES.pengepulMaterialPermintaan} element={<PengepulPermintaanMitraPage />} />
        <Route path={ROUTES.pengepulMaterialPermintaanTerima} element={<PengepulTerimaPermintaanPage />} />
        <Route path={ROUTES.pengepulMaterialFoto} element={<PengepulFotoMaterialPage />} />
        <Route path={ROUTES.pengepulMaterialSukses} element={<PengepulMaterialSuksesPage />} />
        <Route path={ROUTES.pengepulNotifikasi} element={<PengepulNotifikasiPage />} />
      </Routes>
    </>
  );
}

export default App;
