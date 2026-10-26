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
      </Routes>
    </>
  );
}

export default App;
