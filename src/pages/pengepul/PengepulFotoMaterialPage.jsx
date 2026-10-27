import { useNavigate, useLocation } from 'react-router-dom';
import { PengepulCameraView } from '../../components/pengepul/PengepulCameraView';
import { ROUTES } from '../../routes';

export function PengepulFotoMaterialPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = location.state?.from || ROUTES.pengepulMaterialDistribusiPengajuan || '/pengepul/material/distribusi/pengajuan';
  const previousState = location.state || {};

  const handleCaptureSave = (photoUrl) => {
    navigate(returnTo, {
      state: {
        ...previousState,
        uploadedPhoto: photoUrl,
        step: 3 // return directly to the detail muatan step
      }
    });
  };

  return (
    <PengepulCameraView
      title="Foto Bukti Bal Sampah"
      instructions="Pastikan ikatan bal, label kemasan, dan tingkat kekeringan terlihat jelas"
      defaultSampleImage="/material/foto-material.jpg"
      backTo={returnTo}
      onCaptureSave={handleCaptureSave}
    />
  );
}
