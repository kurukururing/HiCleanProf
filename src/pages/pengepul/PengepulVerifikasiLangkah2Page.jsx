import { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Scale, Info, 
  RotateCcw, Sparkles, AlertCircle, Check, Activity, Radio, Cpu, CheckSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PengepulStepHeader } from '../../components/pengepul/PengepulStepHeader';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiLangkah2Page() {
  const navigate = useNavigate();

  // Sub-states:
  // 'idle'        -> Langkah2.jpg (SOP checklist & 0.00 kg)
  // 'measuring'   -> Langkah2-2.jpg (Interactive synthetic IoT verification process & vibration stabilization)
  // 'stabilized'  -> Langkah2-1.jpg (12.50 kg read, ready to lock)
  // 'locked'      -> Langkah2-3.jpg (Weight locked with material breakdown)
  const [stage, setStage] = useState('idle');

  // SOP Checklist state
  const [sopChecks, setSopChecks] = useState({
    posisiTengah: true,
    bebasSentuhan: true,
    janganSentuh: true
  });

  // Timbangan states
  const [liveWeight, setLiveWeight] = useState(0.00);
  const [stabilityProgress, setStabilityProgress] = useState(0);
  const [telemetryMessage, setTelemetryMessage] = useState('Menginisialisasi sensor...');
  const [hasError, setHasError] = useState(false);

  const allSopChecked = sopChecks.posisiTengah && sopChecks.bebasSentuhan && sopChecks.janganSentuh;

  const toggleSop = (key) => {
    setSopChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reset / Nolkan Ulang
  const handleResetZero = () => {
    setLiveWeight(0.00);
    setStage('idle');
    setStabilityProgress(0);
  };

  // Start reading weight (IoT Simulation)
  const handleStartMeasuring = () => {
    if (!allSopChecked) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setStage('measuring');
    setStabilityProgress(10);
    setLiveWeight(1.50);
    setTelemetryMessage('Mendeteksi penempatan beban pada plat sensor...');
  };

  // Simulation timer for measuring stage
  useEffect(() => {
    let timer;
    if (stage === 'measuring') {
      const milestones = [
        { progress: 25, weight: 4.80, msg: 'Sensor OIML aktif. Mengukur getaran awal...' },
        { progress: 50, weight: 9.35, msg: 'Menyeimbangkan 4 sensor strain gauge sudut...' },
        { progress: 75, weight: 12.48, msg: 'Meredam getaran beban & mengompensasi tara karung...' },
        { progress: 95, weight: 12.52, msg: 'Menstabilkan pembacaan akhir load cell...' },
        { progress: 100, weight: 12.50, msg: 'Bobot stabil terdeteksi pada 12.50 kg! Presisi OIML Class II.' }
      ];

      let step = 0;
      timer = setInterval(() => {
        if (step < milestones.length) {
          const current = milestones[step];
          setStabilityProgress(current.progress);
          setLiveWeight(current.weight);
          setTelemetryMessage(current.msg);
          step++;
        } else {
          clearInterval(timer);
          setStage('stabilized');
        }
      }, 600);
    }

    return () => clearInterval(timer);
  }, [stage]);

  // Lock Weight action
  const handleLockWeight = () => {
    setLiveWeight(12.50);
    setStage('locked');
  };

  // Next Step (Langkah 3)
  const handleNextStep = () => {
    navigate(ROUTES.pengepulVerifikasiLangkah3 || '/pengepul/verifikasi/langkah-3');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans pb-28">
      <PengepulStepHeader 
        title="Timbang Bobot IoT"
        backTo={ROUTES.pengepulVerifikasiLangkah1 || '/pengepul/verifikasi/langkah-1'} 
      />

      <main className="mx-auto w-full max-w-md px-4 py-2 space-y-4">
        {/* Progress Stepper Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#E5F8ED] text-emerald-800 text-xs font-semibold">
              Berat
            </span>
            <span className="text-xs font-bold text-neutral-800 font-heading">
              Langkah 2 dari 4
            </span>
          </div>

          {/* 4 Segment Progress Bar (2 segments green) */}
          <div className="grid grid-cols-4 gap-2">
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
          </div>
        </div>

        {/* =========================================================================
            STAGE 1 & 2: Status Timbangan IoT Card (Langkah2.jpg & Langkah2-1.jpg)
           ========================================================================= */}
        {stage !== 'locked' && (
          <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3.5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-bold text-neutral-900 font-heading">
                Status Timbangan IoT
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-brand-green font-medium mt-0.5">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                <span>Sensor OIML Class II terverifikasi presisi</span>
              </div>
            </div>

            {/* Weighing Screen Indicator */}
            <div className="rounded-2xl bg-[#E5F8ED] p-6 text-center space-y-1 relative overflow-hidden border border-brand-green/20">
              {stage === 'measuring' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green/30 overflow-hidden">
                  <div
                    className="h-full bg-brand-green transition-all duration-300"
                    style={{ width: `${stabilityProgress}%` }}
                  />
                </div>
              )}

              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-neutral-900 font-mono tracking-tight">
                  {stage === 'idle'
                    ? '0.00'
                    : liveWeight.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-neutral-700">kg</span>
              </div>

              <p className="text-[11px] text-neutral-500 font-medium">
                Toleransi kalibrasi ± 0.01 kg
              </p>
            </div>

            {/* Reset / Nolkan Button */}
            {stage === 'idle' && (
              <button
                type="button"
                onClick={handleResetZero}
                className="w-full py-2.5 rounded-2xl border border-brand-green text-brand-green hover:bg-brand-green/10 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset / Nolkan Ulang</span>
              </button>
            )}
          </div>
        )}

        {/* =========================================================================
            STAGE 1 (idle): SOP Checklist Card (Langkah2.jpg)
           ========================================================================= */}
        {stage === 'idle' && (
          <>
            {/* Checklist SOP Penimbangan */}
            <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-[#E5F8ED] text-brand-green flex items-center justify-center">
                  <Scale className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Botol Plastik PET
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Botol plastik, dan botol minyak bekas
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {/* SOP 1 */}
                <button
                  type="button"
                  onClick={() => toggleSop('posisiTengah')}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl border text-left transition-all ${
                    sopChecks.posisiTengah
                      ? 'bg-[#E5F8ED] border-brand-green/30 text-neutral-900'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div
                    className={`size-5 rounded-md flex items-center justify-center border transition-colors shrink-0 mt-0.5 ${
                      sopChecks.posisiTengah
                        ? 'bg-neutral-900 border-neutral-900 text-white'
                        : 'bg-white border-neutral-300'
                    }`}
                  >
                    {sopChecks.posisiTengah && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-medium leading-snug">
                    Letakan karung atau wadah tepat ditengah plat timbangan yang sudah disediakan
                  </span>
                </button>

                {/* SOP 2 */}
                <button
                  type="button"
                  onClick={() => toggleSop('bebasSentuhan')}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl border text-left transition-all ${
                    sopChecks.bebasSentuhan
                      ? 'bg-[#E5F8ED] border-brand-green/30 text-neutral-900'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div
                    className={`size-5 rounded-md flex items-center justify-center border transition-colors shrink-0 mt-0.5 ${
                      sopChecks.bebasSentuhan
                        ? 'bg-neutral-900 border-neutral-900 text-white'
                        : 'bg-white border-neutral-300'
                    }`}
                  >
                    {sopChecks.bebasSentuhan && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-medium leading-snug">
                    Pastikan karung tidak menyentuh lantai, dinding, tiang, atau displat
                  </span>
                </button>

                {/* SOP 3 */}
                <button
                  type="button"
                  onClick={() => toggleSop('janganSentuh')}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl border text-left transition-all ${
                    sopChecks.janganSentuh
                      ? 'bg-[#E5F8ED] border-brand-green/30 text-neutral-900'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                  }`}
                >
                  <div
                    className={`size-5 rounded-md flex items-center justify-center border transition-colors shrink-0 mt-0.5 ${
                      sopChecks.janganSentuh
                        ? 'bg-neutral-900 border-neutral-900 text-white'
                        : 'bg-white border-neutral-300'
                    }`}
                  >
                    {sopChecks.janganSentuh && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-medium leading-snug">
                    Pastikan anda tidak menyentuh karung selama proses verifikasi sedang berlangsung
                  </span>
                </button>
              </div>

              {/* Validation Alert */}
              {hasError && !allSopChecked && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>Harap centang semua SOP penimbangan sebelum membaca bobot.</span>
                </div>
              )}
            </div>

            {/* OIML Class II Info Box */}
            <div className="rounded-2xl bg-[#E5F8ED] p-4 flex items-start gap-3 border border-brand-green/20">
              <Info className="size-5 text-emerald-800 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-900 leading-relaxed">
                <strong className="font-bold">OML Class II:</strong> Sensor load cell akan merekam data real time secara instan dan akurat saat getaran beban sudah stabil.
              </p>
            </div>
          </>
        )}

        {/* =========================================================================
            STAGE 2 (measuring): IoT Live Sensor Simulation (Completes Langkah2-2.jpg!)
           ========================================================================= */}
        {stage === 'measuring' && (
          <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-4 animate-in fade-in duration-300">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-brand-green animate-ping" />
                <span className="text-xs font-bold text-neutral-900">
                  Pembacaan Sensor Telemetri IoT
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                BLE 5.2 • SCALE-X01
              </span>
            </div>

            {/* Live Waveform & Strain Balancing Visualization */}
            <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Activity className="size-3.5 text-brand-green animate-pulse" />
                  Kestabilan Getaran
                </span>
                <span className="font-mono font-bold text-brand-green">
                  {stabilityProgress}%
                </span>
              </div>

              {/* Progress visual */}
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-brand-green transition-all duration-300"
                  style={{ width: `${stabilityProgress}%` }}
                />
              </div>

              {/* 4 Sensor Load Cell Corner Layout */}
              <div className="pt-2">
                <p className="text-[10px] text-neutral-400 mb-2">4-Point Strain Gauge Matrix:</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="bg-white/5 p-2 rounded-xl flex justify-between">
                    <span className="text-neutral-400">Sensor TL:</span>
                    <span className="text-brand-green">{(liveWeight * 0.25).toFixed(2)} kg</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl flex justify-between">
                    <span className="text-neutral-400">Sensor TR:</span>
                    <span className="text-brand-green">{(liveWeight * 0.25).toFixed(2)} kg</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl flex justify-between">
                    <span className="text-neutral-400">Sensor BL:</span>
                    <span className="text-brand-green">{(liveWeight * 0.25).toFixed(2)} kg</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl flex justify-between">
                    <span className="text-neutral-400">Sensor BR:</span>
                    <span className="text-brand-green">{(liveWeight * 0.25).toFixed(2)} kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Status Message */}
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#E5F8ED] border border-brand-green/20 text-xs text-emerald-900">
              <Cpu className="size-4 text-brand-green shrink-0 animate-spin" />
              <span className="leading-tight font-medium">
                {telemetryMessage}
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 3 (stabilized): Ready to Lock (Langkah2-1.jpg)
           ========================================================================= */}
        {stage === 'stabilized' && (
          <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <CheckCircle2 className="size-4 text-brand-green shrink-0" />
              <span>
                Getaran beban telah stabil sepenuhnya. Bobot akhir siap dikunci untuk perhitungan poin.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 text-[10px] block">Estimasi Warga</span>
                <span className="text-sm font-bold text-neutral-800">15.00 kg</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#E5F8ED] border border-brand-green/30">
                <span className="text-emerald-800 text-[10px] block">Hasil Timbangan</span>
                <span className="text-sm font-extrabold text-neutral-900">12.50 kg</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 4 (locked): Bobot Terbaca & Rincian Material (Langkah2-3.jpg)
           ========================================================================= */}
        {stage === 'locked' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Bobot Terbaca Card */}
            <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-2">
              <h2 className="text-sm font-bold text-neutral-800 font-heading">
                Bobot Terbaca
              </h2>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-neutral-900 font-mono tracking-tight">
                  12.50
                </span>
                <span className="text-base font-bold text-neutral-600">kg</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-brand-green font-medium pt-0.5">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                <span>Sensor OIML Class II terverifikasi presisi</span>
              </div>
            </div>

            {/* Rincian Material Setoran Card */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-neutral-900 font-heading">
                Rincian Material Setoran
              </h3>

              <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-4">
                {/* Header Sub-item */}
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-[#E5F8ED] text-brand-green flex items-center justify-center shrink-0">
                    <Scale className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">
                      Botol Plastik PET
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      Kategori: Plastik
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-3 space-y-3">
                  {/* Line 1 */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-neutral-900">
                        Plastik PET (Bening)
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        15 Botol kemasan - Tutup terpisah
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-neutral-900 font-mono">
                      4,5kg
                    </span>
                  </div>

                  {/* Line 2 */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-neutral-900">
                        Botol Plastik
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        3 Bundel pipih - Kering & Rapi
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-neutral-900 font-mono">
                      8.0kg
                    </span>
                  </div>
                </div>

                {/* Comparison Summary Footer */}
                <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Estimasi</span>
                    <span className="font-extrabold text-neutral-800 font-mono text-sm">
                      15kg
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-neutral-400 block">Berat Aktual</span>
                    <span className="font-extrabold text-brand-green font-mono text-sm">
                      12.50kg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          Fixed Bottom Action Bar (Changes dynamically per sub-state)
         ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-md flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              if (stage === 'locked') {
                setStage('stabilized');
              } else if (stage === 'stabilized' || stage === 'measuring') {
                setStage('idle');
              } else {
                navigate(ROUTES.pengepulVerifikasiLangkah1 || '/pengepul/verifikasi/langkah-1');
              }
            }}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>

          {/* Action Button depends on stage:
              1. idle -> "Mulai Baca Bobot"
              2. measuring -> disabled with pulse
              3. stabilized -> "Kunci Bobot" (Langkah2-1.jpg)
              4. locked -> "Lanjut (Langkah 3 /4)" (Langkah2-3.jpg)
          */}
          {stage === 'idle' && (
            <button
              type="button"
              onClick={handleStartMeasuring}
              className={`flex-1 py-3 px-5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-[0.99] text-center ${
                allSopChecked
                  ? 'bg-brand-green text-ink hover:bg-brand-green/90'
                  : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'
              }`}
            >
              Mulai Baca Bobot
            </button>
          )}

          {stage === 'measuring' && (
            <button
              type="button"
              disabled
              className="flex-1 py-3 px-5 rounded-2xl bg-neutral-200 text-neutral-600 text-xs sm:text-sm font-extrabold text-center flex items-center justify-center gap-2 cursor-wait"
            >
              <Activity className="size-4 animate-spin text-brand-green" />
              <span>Membaca Bobot...</span>
            </button>
          )}

          {stage === 'stabilized' && (
            <button
              type="button"
              onClick={handleLockWeight}
              className="flex-1 py-3 px-5 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99] text-center animate-pulse"
            >
              Kunci Bobot
            </button>
          )}

          {stage === 'locked' && (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex-1 py-3 px-5 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99] text-center"
            >
              Lanjut (Langkah 3 /4)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

