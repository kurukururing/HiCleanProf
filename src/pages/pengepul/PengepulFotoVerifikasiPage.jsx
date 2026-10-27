import { useNavigate, useLocation } from 'react-router-dom';
import { PengepulCameraView } from '../../components/pengepul/PengepulCameraView';
import { ROUTES } from '../../routes';

export function PengepulFotoVerifikasiPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // If user came from a specific page or wants to retain previous step data
  const returnTo = location.state?.from || ROUTES.pengepulVerifikasiLangkah3 || '/pengepul/verifikasi/langkah-3';
  const previousState = location.state || {};

  const handleCaptureSave = (photoUrl) => {
    navigate(returnTo, {
      state: {
        ...previousState,
        attachedPhoto: photoUrl
      }
    });
  };

  return (
    <PengepulCameraView
      title="Foto Sampel Material"
      instructions="Arahkan kamera ke sampel botol plastik / material yang disetor"
      defaultSampleImage="/verifikasi_pengepul/Foto.jpg"
      backTo={returnTo}
      onCaptureSave={handleCaptureSave}
    />
  );
}
