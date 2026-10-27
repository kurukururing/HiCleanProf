import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, Camera, RefreshCw, Zap, ZapOff, Grid3X3, 
  Image as ImageIcon, Check, RotateCcw, AlertCircle, Info, ShieldCheck, Sparkles, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Natural Camera Component for Pengepul Role
 * Features:
 * - Real camera stream (rear/environment preferred for waste scanning)
 * - Synthetic shutter audio via Web Audio API (no external file dependency)
 * - Shutter flash animation & haptic feedback
 * - Front / rear camera switcher
 * - Rule of thirds grid toggle
 * - Direct gallery upload shortcut
 * - Review & Retake workflow
 * - Graceful fallback to interactive simulator if camera is denied/unavailable
 */
export function PengepulCameraView({ 
  title = "Ambil Foto Sampah", 
  instructions = "Posisikan sampah di dalam bingkai agar terverifikasi jelas",
  defaultSampleImage = "/verifikasi_pengepul/Foto.jpg",
  onCaptureSave,
  backTo 
}) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Camera stream states
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Camera UX controls
  const [flashMode, setFlashMode] = useState(false); // simulated torch / flash effect
  const [gridVisible, setGridVisible] = useState(true);
  const [isShutterFlashing, setIsShutterFlashing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Synthesize realistic shutter click sound using Web Audio API
  const playShutterSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio autoplay policy ignored safely
    }
  }, []);

  // Check available devices
  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        if (videoInputs.length > 1) {
          setHasMultipleCameras(true);
        }
      }).catch(() => {});
    }
  }, []);

  // Start real camera stream
  const startCamera = useCallback(async () => {
    setCameraError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Perangkat Anda tidak mendukung akses kamera langsung.');
      return;
    }

    try {
      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(newStream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.warn('Camera access unavailable:', err);
      setCameraActive(false);
      setCameraError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Izin kamera belum diberikan. Anda dapat mengizinkan kamera atau memilih foto dari galeri.'
          : 'Kamera fisik tidak terdeteksi. Beralih ke mode pratinjau simulasi cerdas.'
      );
    }
  }, [facingMode]);

  // Initialize camera on mount and when facingMode changes
  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera, capturedImage]);

  // Toggle front/back camera
  const handleSwitchCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Capture photo from video feed or fallback
  const handleShutter = () => {
    if (isCapturing) return;
    setIsCapturing(true);

    // Audio & Haptic Feedback
    playShutterSound();
    if (navigator.vibrate) {
      navigator.vibrate([40, 20, 50]);
    }

    // White flash effect
    setIsShutterFlashing(true);
    setTimeout(() => setIsShutterFlashing(false), 200);

    setTimeout(() => {
      if (cameraActive && videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');

        // If front camera, mirror image for natural mirror effect
        if (facingMode === 'user') {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);

        // Stop stream while reviewing
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      } else {
        // Fallback capture from simulated sample
        setCapturedImage(defaultSampleImage);
      }
      setIsCapturing(false);
    }, 150);
  };

  // Upload photo from device gallery
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Save and proceed
  const handleConfirmSave = () => {
    const finalPhoto = capturedImage || defaultSampleImage;
    if (onCaptureSave) {
      onCaptureSave(finalPhoto);
    } else if (backTo) {
      navigate(backTo, {
        state: { attachedPhoto: finalPhoto }
      });
    } else {
      navigate(-1);
    }
  };

  const handleBack = () => {
    if (capturedImage) {
      handleRetake();
    } else if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Hidden canvas for snapshot rendering */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden file input for direct gallery picking */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top App Bar with Translucent Blur */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="size-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all text-white border border-white/10"
            aria-label="Kembali"
          >
            <ArrowLeft className="size-5" />
          </button>

          <div className="text-center">
            <h1 className="text-sm font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-[10px] text-neutral-400">
              {capturedImage ? 'Mode Tinjau Foto' : (cameraActive ? 'Kamera Aktif' : 'Mode Siap Foto')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className={`size-10 rounded-full flex items-center justify-center transition-all border ${
              showTips 
                ? 'bg-brand-green text-ink border-brand-green' 
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
            aria-label="Bantuan Panduan Foto"
          >
            <Info className="size-5" />
          </button>
        </div>
      </header>

      {/* Pop-up tips guidance overlay */}
      {showTips && (
        <div className="bg-neutral-900/95 border-b border-white/10 px-4 py-3 text-xs text-neutral-200 z-30 animate-in slide-in-from-top-2">
          <div className="mx-auto max-w-md space-y-1.5">
            <div className="flex items-center justify-between font-bold text-brand-green text-xs">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Panduan Foto Material Standar Pabrik:
              </span>
              <button 
                type="button" 
                onClick={() => setShowTips(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="text-[11px] text-neutral-300 space-y-1 list-disc list-inside">
              <li>Posisikan karung/bal material di tengah bingkai reticle.</li>
              <li>Pastikan pencahayaan cukup dan label kemasan dapat terbaca.</li>
              <li>Hindari gerakan tangan saat menekan tombol rana (shutter).</li>
            </ul>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-3 sm:px-4 py-3 flex flex-col justify-between">
        
        {/* Viewfinder Frame with Modern Aspect Ratio */}
        <div className="relative w-full aspect-[3/4] max-h-[580px] rounded-3xl overflow-hidden bg-neutral-900 border-2 border-white/15 shadow-2xl flex items-center justify-center my-auto">
          
          {/* Flash screen effect */}
          {isShutterFlashing && (
            <div className="absolute inset-0 bg-white z-50 transition-opacity duration-150 animate-out fade-out" />
          )}

          {/* Torch / Flashlight simulation highlight */}
          {flashMode && !capturedImage && (
            <div className="absolute inset-0 bg-yellow-100/10 pointer-events-none z-10 mix-blend-screen" />
          )}

          {/* VIEW: 1. Reviewed / Captured Photo */}
          {capturedImage ? (
            <div className="relative w-full h-full bg-black">
              <img
                src={capturedImage}
                alt="Hasil Tangkapan Kamera"
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-200"
              />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-brand-green text-[11px] font-bold border border-brand-green/30 flex items-center gap-1.5">
                  <Check className="size-3.5 stroke-[3]" /> Foto Berhasil Ditangkap
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                  1080p • JPEG
                </span>
              </div>
            </div>
          ) : cameraActive ? (
            /* VIEW: 2. Real Live Camera Stream */
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
            />
          ) : (
            /* VIEW: 3. Simulated Intelligent Viewfinder (Fallback) */
            <div className="relative w-full h-full bg-neutral-900 flex flex-col items-center justify-center">
              <img
                src={defaultSampleImage}
                alt="Simulasi Viewfinder"
                className="w-full h-full object-cover filter brightness-95"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80';
                }}
              />

              {/* Notice Overlay if Camera Permission Denied or In Desktop */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-center space-y-1 z-20">
                <p className="text-[11px] font-bold text-brand-green flex items-center justify-center gap-1.5">
                  <ShieldCheck className="size-3.5" /> Viewfinder Simulasi Aktif
                </p>
                <p className="text-[10px] text-neutral-300">
                  {cameraError || 'Tekan tombol rana untuk menjepret atau pilih foto dari galeri.'}
                </p>
              </div>
            </div>
          )}

          {/* Rule of Thirds 3x3 Grid Overlay */}
          {!capturedImage && gridVisible && (
            <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3 opacity-30">
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-white" />
              <div className="border-r border-white" />
              <div />
            </div>
          )}

          {/* Dynamic Corner Reticles / Brackets */}
          {!capturedImage && (
            <div className="absolute inset-5 pointer-events-none z-10">
              <div className="absolute top-0 left-0 size-8 border-t-4 border-l-4 border-brand-green rounded-tl-xl shadow-sm" />
              <div className="absolute top-0 right-0 size-8 border-t-4 border-r-4 border-brand-green rounded-tr-xl shadow-sm" />
              <div className="absolute bottom-0 left-0 size-8 border-b-4 border-l-4 border-brand-green rounded-bl-xl shadow-sm" />
              <div className="absolute bottom-0 right-0 size-8 border-b-4 border-r-4 border-brand-green rounded-br-xl shadow-sm" />

              {/* Center target crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full border border-white/30 flex items-center justify-center">
                <div className="size-1 rounded-full bg-brand-green shadow-xs" />
              </div>
            </div>
          )}

          {/* Top In-Frame Quick Controls (Flash, Grid, Switch Camera) */}
          {!capturedImage && (
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/10">
                <button
                  type="button"
                  onClick={() => setFlashMode(!flashMode)}
                  className={`size-8 rounded-full flex items-center justify-center transition-colors ${
                    flashMode ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-white hover:bg-white/20'
                  }`}
                  aria-label="Lampu Kilat"
                >
                  {flashMode ? <Zap className="size-4 fill-neutral-950" /> : <ZapOff className="size-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setGridVisible(!gridVisible)}
                  className={`size-8 rounded-full flex items-center justify-center transition-colors ${
                    gridVisible ? 'bg-brand-green text-ink font-bold' : 'text-white hover:bg-white/20'
                  }`}
                  aria-label="Garis Kisi"
                >
                  <Grid3X3 className="size-4" />
                </button>
              </div>

              {hasMultipleCameras && (
                <button
                  type="button"
                  onClick={handleSwitchCamera}
                  className="size-8 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/80 text-white border border-white/10 flex items-center justify-center transition-transform active:rotate-180"
                  aria-label="Putar Kamera"
                >
                  <RefreshCw className="size-4" />
                </button>
              )}
            </div>
          )}

          {/* Bottom Instructions Floating Pill */}
          {!capturedImage && (
            <div className="absolute bottom-3 inset-x-4 flex justify-center z-10 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium tracking-wide border border-white/10 text-center shadow-md">
                {instructions}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Camera Action Bar */}
        <div className="pt-3 pb-2">
          {capturedImage ? (
            /* REVIEW MODE CONTROLS: Retake vs Use Photo */
            <div className="space-y-2.5 animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="py-3.5 px-4 rounded-2xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm font-extrabold hover:bg-neutral-800 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="size-4 text-neutral-300" />
                  Foto Ulang
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSave}
                  className="py-3.5 px-4 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:bg-brand-green/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Check className="size-4 stroke-[3]" />
                  Gunakan Foto Ini
                </button>
              </div>

              <p className="text-[10px] text-neutral-400 text-center">
                Foto akan otomatis dilampirkan pada formulir verifikasi
              </p>
            </div>
          ) : (
            /* LIVE CAMERA SHUTTER & GALLERY PICKER */
            <div className="flex items-center justify-between px-6">
              {/* Shortcut: Pick from Device Gallery */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-1 text-neutral-300 hover:text-white transition-colors group"
                aria-label="Pilih dari Galeri"
              >
                <div className="size-12 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center border border-white/15 transition-transform group-active:scale-95">
                  <ImageIcon className="size-5 text-brand-green" />
                </div>
                <span className="text-[10px] font-semibold">Galeri</span>
              </button>

              {/* Shutter Button (Classic Big Ring Button) */}
              <div className="relative flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleShutter}
                  disabled={isCapturing}
                  className="size-20 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-2xl ring-4 ring-brand-green/40 border-4 border-black"
                  aria-label="Jepret Foto"
                >
                  <div className="size-14 rounded-full bg-brand-green flex items-center justify-center transition-transform">
                    <Camera className="size-7 text-ink" />
                  </div>
                </button>
              </div>

              {/* Switch camera / Refresh sensor */}
              <button
                type="button"
                onClick={() => {
                  if (hasMultipleCameras) {
                    handleSwitchCamera();
                  } else {
                    startCamera();
                  }
                }}
                className="flex flex-col items-center gap-1 text-neutral-300 hover:text-white transition-colors group"
                aria-label="Refresh Kamera"
              >
                <div className="size-12 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center border border-white/15 transition-transform group-active:scale-95">
                  <RefreshCw className="size-5 text-neutral-300 group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <span className="text-[10px] font-semibold">
                  {hasMultipleCameras ? 'Balik' : 'Muat'}
                </span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

