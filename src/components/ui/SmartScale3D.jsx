import React, { useRef, useMemo, useState, useEffect, useContext, createContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, RoundedBox, Edges, Line, ContactShadows } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

/* ═════════════════════════════════════════════════════════════
   Hi-Clean Mobile SmartScale — 3D Tricycle
   Skala: 1 unit = 1 meter. Depan kendaraan = +Z, belakang = -Z.
   Dimensi mengikuti blueprint: P ±2.800 mm · L 780 mm · T 1.100 mm
   ═════════════════════════════════════════════════════════════ */

// ── Palet (mengacu pada render 3D blueprint) ──────────────────
const GREEN = '#2e9b3f';
const GREEN_D = '#1f7a30';
const WHITE = '#f5f7f6';
const GREY = '#cfd5d8';
const GREY_D = '#8b9296';
const DARK = '#2b2e30';
const BLACK = '#1a1a1a';

// Mode tampilan dibagikan lewat context (harus di-provide DI DALAM <Canvas>)
const ModeContext = createContext('color');

// ─────────────────────────────────────────────────────────────
// MATERIAL: mode 'color' (hijau/putih) atau 'blueprint' (putih + garis)
// ─────────────────────────────────────────────────────────────
function M({ c = WHITE, side = THREE.FrontSide, opacity = 1, th = 15, edges = true }) {
  const mode = useContext(ModeContext);
  const bp = mode === 'blueprint';
  return (
    <>
      {bp ? (
        <meshBasicMaterial color="#ffffff" side={side} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
      ) : (
        <meshLambertMaterial
          color={c}
          side={side}
          transparent={opacity < 1}
          opacity={opacity}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      )}
      {edges && <Edges threshold={th} color={bp ? '#222222' : '#151515'} />}
    </>
  );
}

// ── Primitif singkat ──────────────────────────────────────────
function B({ p = [0, 0, 0], s, r = [0, 0, 0], ...m }) {
  return (
    <mesh position={p} rotation={r}>
      <boxGeometry args={s} />
      <M {...m} />
    </mesh>
  );
}
function Cyl({ p = [0, 0, 0], r = [0, 0, 0], rad, h, seg = 16, ...m }) {
  return (
    <mesh position={p} rotation={r}>
      <cylinderGeometry args={[rad, rad, h, seg]} />
      <M {...m} />
    </mesh>
  );
}
function RB({ p = [0, 0, 0], s, r = [0, 0, 0], rad = 0.03, ...m }) {
  return (
    <RoundedBox args={s} radius={rad} smoothness={4} position={p} rotation={r}>
      <M {...m} />
    </RoundedBox>
  );
}

// ── Tombol label hotspot ──────────────────────────────────────
function Tag({ position, text, id, onClick }) {
  return (
    <Html position={position} center distanceFactor={4} zIndexRange={[30, 0]}>
      <button
        onClick={() => onClick && onClick(id)}
        className="bg-white text-black text-xs font-bold px-2 py-1 rounded shadow border border-black whitespace-nowrap"
      >
        {text}
      </button>
    </Html>
  );
}

// ── Texture dari <canvas> (layar driver & logo di bak) ────────
function useCanvasTexture(w, h, draw, deps = []) {
  const [tex] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  });
  useEffect(() => {
    draw(tex.image.getContext('2d'), w, h);
    tex.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return tex;
}

function drawLogo(ctx, w, h) {
  ctx.fillStyle = '#f7f9f8';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, w - 12, h - 12);
  // daun
  ctx.save();
  ctx.translate(150, 125);
  ctx.rotate(-0.7);
  ctx.fillStyle = GREEN;
  ctx.beginPath();
  ctx.ellipse(0, 0, 45, 95, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, -80);
  ctx.lineTo(0, 85);
  ctx.stroke();
  ctx.restore();
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = GREEN;
  ctx.font = 'bold 120px sans-serif';
  ctx.fillText('Hi-Clean', 230, 160);
  ctx.fillStyle = '#2b2b2b';
  ctx.font = 'bold 38px sans-serif';
  ctx.fillText('Pilah Hari Ini, Bersih Esok Nanti', 60, 265);
}

function drawScreen(ctx, w, h, weight) {
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = GREEN;
  ctx.fillRect(0, 0, w, 46);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 26px monospace';
  ctx.fillText('HI-CLEAN', 16, 24);
  ctx.textAlign = 'right';
  ctx.font = '16px monospace';
  ctx.fillText('QR: OK', w - 16, 24);
  ctx.textAlign = 'left';
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 64, w - 32, 104);
  ctx.fillStyle = '#444';
  ctx.font = '18px monospace';
  ctx.fillText('Actual Weight', 28, 88);
  ctx.fillStyle = '#111';
  ctx.font = 'bold 54px monospace';
  ctx.fillText(`${weight.toFixed(2)} kg`, 28, 136);
  const cats = ['PET', 'Paper', 'Metal', 'Other'];
  const cw = (w - 32) / 4;
  cats.forEach((n, i) => {
    ctx.strokeStyle = '#111';
    ctx.strokeRect(16 + i * cw + 3, 186, cw - 6, 40);
    ctx.fillStyle = '#111';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(n, 16 + i * cw + cw / 2, 207);
  });
  ctx.fillStyle = GREEN;
  ctx.fillRect(16, h - 52, w - 32, 38);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('VERIFIKASI BERAT', w / 2, h - 33);
  ctx.textAlign = 'left';
}

function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ─────────────────────────────────────────────────────────────
// RODA + SPAT BOR
// ─────────────────────────────────────────────────────────────
function Wheel({ position, radius = 0.25, width = 0.12, disc = false }) {
  const tube = 0.055;
  const rimR = radius - tube * 2;
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* ban */}
      <mesh scale={[1, 1, width / (tube * 2)]}>
        <torusGeometry args={[radius - tube, tube, 12, 40]} />
        <M c="#262829" th={25} />
      </mesh>
      {/* velg */}
      <mesh>
        <torusGeometry args={[rimR, 0.012, 8, 40]} />
        <M c={GREY} th={20} />
      </mesh>
      {/* jari-jari (3 batang diametral = 6 jari) */}
      {[0, 60, 120].map((a) => (
        <B key={a} s={[0.03, rimR * 2, 0.03]} r={[0, 0, (a * Math.PI) / 180]} c={GREY} />
      ))}
      {/* hub */}
      <Cyl rad={0.045} h={width * 0.9} r={[Math.PI / 2, 0, 0]} c={GREY_D} />
      {/* cakram rem */}
      {disc && <Cyl p={[0, 0, width * 0.35]} rad={0.1} h={0.006} r={[Math.PI / 2, 0, 0]} c="#9aa0a3" />}
    </group>
  );
}

function Fender({ position, radius, width, c = GREEN }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[radius, radius, width, 28, 1, true, Math.PI / 2 - 1.15, 2.3]} />
      <M c={c} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────
// LOAD CELL
// ─────────────────────────────────────────────────────────────
function LoadCell({ position, showLabel, onHotspotClick }) {
  return (
    <group position={position}>
      <B s={[0.06, 0.04, 0.14]} c={GREY_D} />
      <Cyl p={[0, 0.025, 0.045]} rad={0.012} h={0.012} seg={8} c={GREY} />
      <Cyl p={[0, 0.025, -0.045]} rad={0.012} h={0.012} seg={8} c={GREY} />
      <B p={[0, 0.021, 0]} s={[0.012, 0.004, 0.05]} c="#e8c547" />
      <Cyl p={[0.06, 0, 0]} r={[0, 0, Math.PI / 2]} rad={0.004} h={0.06} seg={6} c={BLACK} />
      {showLabel && <Tag position={[0.16, 0.08, 0]} text="01 Load Cell ×4" id="loadcell" onClick={onHotspotClick} />}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// PCB (HX711, ESP32, GPS/IMU)
// ─────────────────────────────────────────────────────────────
function Board({ position, size = [0.1, 0.008, 0.08], c, label, id, labelY = 0.08, showLabel, onClick }) {
  return (
    <group position={position}>
      <B s={size} c={c} />
      <B p={[0, size[1] / 2 + 0.005, 0]} s={[size[0] * 0.4, 0.01, size[2] * 0.4]} c={BLACK} />
      {showLabel && <Tag position={[0, labelY, 0]} text={label} id={id} onClick={onClick} />}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// DRIVER DISPLAY (di setang, menghadap pengemudi)
// ─────────────────────────────────────────────────────────────
function DriverDisplay({ position, showLabel, onHotspotClick, weighSimData }) {
  const weight = weighSimData?.actual ?? 10.42;
  const tex = useCanvasTexture(512, 320, (ctx, w, h) => drawScreen(ctx, w, h, weight), [weight]);
  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      <group rotation={[-0.3, 0, 0]}>
        <RB s={[0.22, 0.145, 0.014]} rad={0.006} c={BLACK} />
        <mesh position={[0, 0, 0.0075]}>
          <planeGeometry args={[0.2, 0.125]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        {/* QR scanner */}
        <RB p={[0, 0.092, 0.002]} s={[0.05, 0.026, 0.018]} rad={0.006} c={BLACK} />
        <mesh position={[0, 0.092, 0.0125]}>
          <circleGeometry args={[0.007, 16]} />
          <meshBasicMaterial color="#3a6ea5" />
        </mesh>
        {showLabel && <Tag position={[0.17, 0.12, 0]} text="07 Driver Display" id="display" onClick={onHotspotClick} />}
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// WEIGHING PLATFORM (stainless, di bawah bak)
// ─────────────────────────────────────────────────────────────
function WeighingPlatform({ position, showLabel, onHotspotClick }) {
  return (
    <group position={position}>
      <B s={[0.62, 0.03, 1.2]} c={GREY} />
      {[-0.29, 0.29].map((x) => (
        <B key={x} p={[x, -0.03, 0]} s={[0.03, 0.035, 1.2]} c={GREY_D} />
      ))}
      {[-0.585, 0.585].map((z) => (
        <B key={z} p={[0, -0.03, z]} s={[0.56, 0.035, 0.03]} c={GREY_D} />
      ))}
      {showLabel && <Tag position={[0.55, 0.06, 0]} text="06 Weighing Platform" id="platform" onClick={onHotspotClick} />}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// ELECTRONICS BOX (di belakang jok, lebar penuh seperti top view)
// ─────────────────────────────────────────────────────────────
function ElectronicsBox({ position, open, showLabel, onHotspotClick }) {
  const lid = useSpring({ y: open ? 0.42 : 0.21, config: { tension: 120, friction: 22 } });
  return (
    <group position={position}>
      <B s={[0.6, 0.4, 0.2]} c={DARK} />
      {/* kelenjar kabel + indikator */}
      <Cyl p={[0.31, -0.05, 0]} r={[0, 0, Math.PI / 2]} rad={0.014} h={0.03} seg={10} c={BLACK} />
      <B p={[-0.2, 0.05, -0.101]} s={[0.04, 0.012, 0.004]} c="#3ad06b" />
      <animated.group position-y={lid.y}>
        <B s={[0.6, 0.02, 0.2]} c="#3a3d3f" />
      </animated.group>
      {open && (
        <>
          <Board position={[-0.21, 0.206, 0]} c="#2f6fb5" label="02 HX711" id="hx711" labelY={0.09} showLabel={showLabel} onClick={onHotspotClick} />
          <Board position={[-0.07, 0.206, 0]} size={[0.12, 0.008, 0.09]} c="#1d1f20" label="03 ESP32" id="esp32" labelY={0.16} showLabel={showLabel} onClick={onHotspotClick} />
          <Board position={[0.08, 0.206, 0]} c="#7a4fb0" label="04 GPS / IMU" id="gps" labelY={0.09} showLabel={showLabel} onClick={onHotspotClick} />
          <Board position={[0.22, 0.206, 0]} size={[0.09, 0.008, 0.07]} c="#c9a227" label="Comm. Module" id="electronics" labelY={0.16} showLabel={showLabel} onClick={onHotspotClick} />
        </>
      )}
      {showLabel && <Tag position={[0.46, 0.12, 0]} text="05 Electronics Box" id="electronics" onClick={onHotspotClick} />}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// BATERAI 12V (di bawah rangka tengah)
// ─────────────────────────────────────────────────────────────
function Battery({ position, showLabel, onHotspotClick }) {
  return (
    <group position={position}>
      <B s={[0.16, 0.12, 0.3]} c="#34383a" />
      <B p={[0, 0.062, 0]} s={[0.12, 0.004, 0.2]} c={GREEN} />
      <Cyl p={[-0.04, 0.07, 0.1]} rad={0.008} h={0.02} seg={8} c="#d33" />
      <Cyl p={[0.04, 0.07, 0.1]} rad={0.008} h={0.02} seg={8} c={BLACK} />
      {showLabel && <Tag position={[0.2, -0.02, 0]} text="09 Battery 12V" id="battery" onClick={onHotspotClick} />}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// BAK KARGO — 4 kompartemen, divider, tailgate, logo, isi sampah
// ─────────────────────────────────────────────────────────────
const W = 0.62; // lebar bak
const L = 1.2; // panjang bak
const H = 0.5; // tinggi bak
const T = 0.025; // tebal dinding

function Fillers() {
  const items = useMemo(() => {
    const rnd = makeRng(11);
    const out = [];
    const spread = (cx, cz, n, make) => {
      for (let i = 0; i < n; i++) {
        out.push(make(cx + (rnd() - 0.5) * 0.12, cz + (rnd() - 0.5) * 0.4));
      }
    };
    // PET — botol rebah, transparan kebiruan
    spread(0.145, -0.29, 10, (x, z) => ({ t: 'cyl', x, z, y: 0.05 + rnd() * 0.1, rot: [0, rnd() * 3, Math.PI / 2], rad: 0.028, h: 0.14, c: '#bfe6f5', op: 0.8 }));
    // Paper — kardus
    spread(0.145, 0.29, 6, (x, z) => {
      const s = [0.1 + rnd() * 0.06, 0.07 + rnd() * 0.05, 0.1 + rnd() * 0.06];
      return { t: 'box', x, z, y: s[1] / 2 + 0.02 + rnd() * 0.05, rot: [0, rnd() * 3, 0], s, c: '#c9a171' };
    });
    // Metal — kaleng berdiri
    spread(-0.145, -0.29, 12, (x, z) => ({ t: 'cyl', x, z, y: 0.07 + rnd() * 0.04, rot: [0, 0, 0], rad: 0.03, h: 0.1, c: '#b9c0c4' }));
    // Other — campuran
    const cols = ['#d9534f', '#4a7fc1', '#f0f0f0', '#e8c547'];
    spread(-0.145, 0.29, 8, (x, z) => {
      const s = [0.06 + rnd() * 0.06, 0.05 + rnd() * 0.06, 0.06 + rnd() * 0.06];
      return { t: 'box', x, z, y: s[1] / 2 + 0.02 + rnd() * 0.04, rot: [0, rnd() * 3, 0], s, c: cols[Math.floor(rnd() * cols.length)] };
    });
    return out;
  }, []);

  return items.map((it, i) =>
    it.t === 'box' ? (
      <B key={i} p={[it.x, it.y, it.z]} r={it.rot} s={it.s} c={it.c} />
    ) : (
      <Cyl key={i} p={[it.x, it.y, it.z]} r={it.rot} rad={it.rad} h={it.h} seg={12} c={it.c} opacity={it.op ?? 1} />
    )
  );
}

function CargoContainer({ position, showLabel, showLoad, onHotspotClick }) {
  const mode = useContext(ModeContext);
  const logo = useCanvasTexture(1024, 400, drawLogo, []);
  const dv = H - 0.06;
  return (
    <group position={position}>
      {/* lantai */}
      <B p={[0, 0.01, 0]} s={[W, 0.02, L]} c="#4a504f" />
      {/* dinding samping */}
      {[-1, 1].map((k) => (
        <B key={k} p={[k * (W / 2 - T / 2), H / 2, 0]} s={[T, H, L]} c={GREEN} />
      ))}
      {/* dinding depan (arah jok) */}
      <B p={[0, H / 2, L / 2 - T / 2]} s={[W, H, T]} c={GREEN} />
      {/* list atas */}
      {[-1, 1].map((k) => (
        <B key={k} p={[k * (W / 2 - T / 2), H - 0.01, 0]} s={[T + 0.014, 0.02, L + 0.01]} c="#e6ebe9" />
      ))}
      <B p={[0, H - 0.01, L / 2 - T / 2]} s={[W + 0.01, 0.02, T + 0.014]} c="#e6ebe9" />
      {/* divider panel: 4 kompartemen */}
      <B p={[0, dv / 2 + 0.02, 0]} s={[0.012, dv, L - 2 * T]} c={GREY} />
      <B p={[0, dv / 2 + 0.02, 0]} s={[W - 2 * T, dv, 0.012]} c={GREY} />

      {/* tailgate (pintu belakang) */}
      <B p={[0, H / 2 - 0.01, -L / 2 - 0.015]} s={[W, H - 0.04, 0.03]} c={GREEN_D} />
      <Cyl p={[0, 0.02, -L / 2 - 0.03]} r={[0, 0, Math.PI / 2]} rad={0.012} h={W} seg={10} c={GREY_D} />
      {[-0.2, 0.2].map((x) => (
        <B key={x} p={[x, H - 0.08, -L / 2 - 0.035]} s={[0.04, 0.06, 0.015]} c={GREY_D} />
      ))}
      {[-0.26, 0.26].map((x) => (
        <B key={x} p={[x, 0.1, -L / 2 - 0.035]} s={[0.07, 0.05, 0.02]} c="#d63a3a" />
      ))}

      {/* panel logo di kedua sisi */}
      {[1, -1].map((k) => (
        <mesh key={k} position={[k * (W / 2 + 0.002), 0.27, 0]} rotation={[0, (k * Math.PI) / 2, 0]}>
          <planeGeometry args={[0.9, 0.35]} />
          <meshBasicMaterial map={logo} toneMapped={false} />
        </mesh>
      ))}

      {/* isi sampah (hanya mode warna) */}
      {showLoad && mode === 'color' && <Fillers />}

      {showLabel && (
        <>
          <Tag position={[0, H + 0.2, 0.2]} text="08 Modular Cargo" id="cargo" onClick={onHotspotClick} />
          {[
            ['PET', 0.145, -0.29],
            ['Paper', 0.145, 0.29],
            ['Metal', -0.145, -0.29],
            ['Other', -0.145, 0.29],
          ].map(([n, x, z]) => (
            <Html key={n} position={[x, H + 0.02, z]} center distanceFactor={4} style={{ pointerEvents: 'none' }}>
              <span className="bg-white/90 text-black text-[10px] font-bold px-1 border border-black">{n}</span>
            </Html>
          ))}
        </>
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// RANGKA BELAKANG + SUMBU + PEGAS
// ─────────────────────────────────────────────────────────────
function Chassis() {
  return (
    <group>
      {/* rel memanjang */}
      {[-0.22, 0.22].map((x) => (
        <B key={x} p={[x, 0.44, -0.55]} s={[0.05, 0.06, 1.55]} c={DARK} />
      ))}
      {/* cross member */}
      {[-1.3, -0.75, -0.2].map((z) => (
        <B key={z} p={[0, 0.44, z]} s={[0.44, 0.04, 0.04]} c={DARK} />
      ))}
      {/* tulang punggung ke depan */}
      <B p={[0, 0.43, 0.35]} s={[0.1, 0.07, 1.1]} c={DARK} />
      {/* sumbu belakang + differential */}
      <Cyl p={[0, 0.25, -0.95]} r={[0, 0, Math.PI / 2]} rad={0.022} h={0.66} seg={10} c={GREY_D} />
      <Cyl p={[0, 0.25, -0.95]} r={[0, 0, Math.PI / 2]} rad={0.055} h={0.12} seg={14} c={DARK} />
      {/* pegas */}
      {[-0.22, 0.22].map((x) => (
        <Cyl key={x} p={[x, 0.335, -0.95]} rad={0.03} h={0.15} seg={10} c="#d9a21b" />
      ))}
      {/* roda belakang */}
      <Wheel position={[-0.33, 0.25, -0.95]} radius={0.25} width={0.12} />
      <Wheel position={[0.33, 0.25, -0.95]} radius={0.25} width={0.12} />
      <Fender position={[-0.33, 0.25, -0.95]} radius={0.275} width={0.14} />
      <Fender position={[0.33, 0.25, -0.95]} radius={0.275} width={0.14} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// BAGIAN DEPAN — jok, tangki/fairing, fork, roda depan, setang
// ─────────────────────────────────────────────────────────────
function FrontSection({ showLabel, weighSimData, onHotspotClick }) {
  const forkTilt = -Math.atan(0.25 / 0.7);
  return (
    <group>
      {/* body hijau di bawah jok + pijakan kaki */}
      <RB p={[0, 0.52, 0.38]} s={[0.34, 0.28, 0.55]} rad={0.05} c={GREEN} />
      {[-0.22, 0.22].map((x) => (
        <B key={x} p={[x, 0.38, 0.45]} s={[0.1, 0.015, 0.32]} c={DARK} />
      ))}
      {/* jok collector */}
      <RB p={[0, 0.72, 0.36]} s={[0.34, 0.12, 0.5]} rad={0.05} c="#2a2a2a" />
      {/* tangki / fairing putih */}
      <RB p={[0, 0.78, 0.78]} s={[0.28, 0.2, 0.3]} rad={0.05} c={WHITE} />
      <RB p={[0, 0.82, 0.98]} s={[0.26, 0.22, 0.1]} rad={0.04} c={WHITE} />
      {/* lampu depan */}
      <B p={[0, 0.82, 1.04]} s={[0.14, 0.1, 0.04]} c="#fff7c2" />

      {/* head tube */}
      <Cyl p={[0, 0.65, 0.91]} r={[forkTilt, 0, 0]} rad={0.035} h={0.5} seg={12} c={GREY_D} />
      {/* fork */}
      {[-0.07, 0.07].map((x) => (
        <Cyl key={x} p={[x, 0.6, 1.025]} r={[forkTilt, 0, 0]} rad={0.015} h={0.743} seg={12} c={GREY} />
      ))}
      <Cyl p={[0, 0.25, 1.15]} r={[0, 0, Math.PI / 2]} rad={0.012} h={0.2} seg={8} c={GREY_D} />

      {/* roda depan + spatbor */}
      <Wheel position={[0, 0.25, 1.15]} radius={0.25} width={0.1} disc />
      <Fender position={[0, 0.25, 1.15]} radius={0.285} width={0.1} />

      {/* setang, grip, spion */}
      <Cyl p={[0, 0.93, 0.9]} rad={0.02} h={0.12} seg={10} c={GREY_D} />
      <Cyl p={[0, 0.98, 0.9]} r={[0, 0, Math.PI / 2]} rad={0.012} h={0.62} seg={10} c={GREY} />
      {[-0.26, 0.26].map((x) => (
        <Cyl key={x} p={[x, 0.98, 0.9]} r={[0, 0, Math.PI / 2]} rad={0.017} h={0.1} seg={10} c={BLACK} />
      ))}
      {[-0.22, 0.22].map((x) => (
        <group key={x}>
          <Cyl p={[x, 1.04, 0.88]} rad={0.006} h={0.12} seg={6} c={BLACK} />
          <B p={[x, 1.1, 0.88]} s={[0.07, 0.045, 0.012]} c={BLACK} />
        </group>
      ))}

      {/* layar driver */}
      <DriverDisplay position={[0, 1.0, 0.82]} weighSimData={weighSimData} showLabel={showLabel} onHotspotClick={onHotspotClick} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// GARIS DIMENSI (muncul di Inspect Mode, mengikuti blueprint)
// ─────────────────────────────────────────────────────────────
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);

function DimLine({ a, b, label, tick }) {
  const mid = a.map((v, i) => (v + b[i]) / 2);
  return (
    <group>
      <Line points={[a, b]} color="#111111" lineWidth={1.2} />
      <Line points={[sub(a, tick), add(a, tick)]} color="#111111" lineWidth={1.2} />
      <Line points={[sub(b, tick), add(b, tick)]} color="#111111" lineWidth={1.2} />
      <Html position={mid} center distanceFactor={4} style={{ pointerEvents: 'none' }}>
        <div className="bg-white text-black text-[10px] font-mono px-1 border border-black whitespace-nowrap">{label}</div>
      </Html>
    </group>
  );
}

function DimensionLines() {
  return (
    <group>
      <DimLine a={[-0.62, 0.004, -1.4]} b={[-0.62, 0.004, 1.4]} tick={[0.04, 0, 0]} label="2.800 mm" />
      <DimLine a={[-0.39, 0.004, -1.62]} b={[0.39, 0.004, -1.62]} tick={[0, 0, 0.04]} label="780 mm" />
      <DimLine a={[0.62, 0, 0.9]} b={[0.62, 1.1, 0.9]} tick={[0.04, 0, 0]} label="1.100 mm" />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// HOTSPOT INFO
// ─────────────────────────────────────────────────────────────
const HOTSPOT_INFO = {
  loadcell: { title: '01 Load Cell ×4', subtitle: '4 × 500 kg Load Cells', body: 'Measures actual material weight. Positioned at 4 corners under the weighing platform.' },
  hx711: { title: '02 HX711', subtitle: 'Load Cell Signal Amplifier', body: 'Amplifies the analog signals from load cells and converts them to 24-bit digital values.' },
  esp32: { title: '03 ESP32', subtitle: 'Main IoT Controller', body: 'Dual-core processor managing Wi-Fi/Bluetooth comms, GPS data, sensor polling, and cloud sync.' },
  gps: { title: '04 GPS / IMU', subtitle: 'U-blox GPS + MPU6050', body: 'Tracks pickup location in real time and detects vehicle motion to validate the weighing process.' },
  electronics: { title: '05 Electronics Box', subtitle: 'IP65 Weatherproof Enclosure', body: 'Houses ESP32, HX711, GPS/IMU, power supply, and communication module (Wi-Fi / 4G).' },
  platform: { title: '06 Weighing Platform', subtitle: 'Brushed Stainless Steel', body: 'Load-bearing surface supported by 4 precision load cells. ±1–2% accuracy.' },
  display: { title: '07 Driver Display', subtitle: '7" Rugged Touchscreen', body: 'Shows real-time pickup info, weight readings, QR scanner status, and verification.' },
  cargo: { title: '08 Modular Cargo', subtitle: 'HDPE / Stainless Steel', body: '4 separate compartments: PET, Paper, Metal, Other. Capacity ± 500 kg. Rear tailgate for unloading.' },
  battery: { title: '09 Battery', subtitle: '12V Vehicle Battery', body: 'Powers the SmartScale electronics, display, and communication module.' },
};

// ─────────────────────────────────────────────────────────────
// RAKITAN UTAMA
// ─────────────────────────────────────────────────────────────
function VehicleAssembly({ exploded, inspectMode, onHotspotClick, weighSimData, showLoad }) {
  const cfg = { tension: 120, friction: 22 };
  const cargo = useSpring({ y: exploded ? 1.0 : 0, config: cfg });
  const plat = useSpring({ y: exploded ? 0.55 : 0, config: cfg });
  const lc = useSpring({ y: exploded ? 0.28 : 0, config: cfg });
  const elec = useSpring({ y: exploded ? 0.35 : 0, config: cfg });
  const batt = useSpring({ y: exploded ? -0.15 : 0, config: cfg });

  // posisi load cell: 4 sudut platform (di atas rel rangka)
  const lcPos = [
    [-0.22, -1.25], [0.22, -1.25],
    [-0.22, -0.25], [0.22, -0.25],
  ];

  return (
    <group>
      <Chassis />
      <FrontSection showLabel={inspectMode} weighSimData={weighSimData} onHotspotClick={onHotspotClick} />

      <animated.group position-y={batt.y}>
        <Battery position={[0, 0.33, 0.35]} showLabel={inspectMode} onHotspotClick={onHotspotClick} />
      </animated.group>

      <animated.group position-y={elec.y}>
        <ElectronicsBox position={[0, 0.74, -0.02]} open={exploded} showLabel={inspectMode} onHotspotClick={onHotspotClick} />
      </animated.group>

      <animated.group position-y={lc.y}>
        {lcPos.map(([x, z], i) => (
          <LoadCell key={i} position={[x, 0.49, z]} showLabel={inspectMode && i === 1} onHotspotClick={onHotspotClick} />
        ))}
      </animated.group>

      <animated.group position-y={plat.y}>
        <WeighingPlatform position={[0, 0.525, -0.75]} showLabel={inspectMode} onHotspotClick={onHotspotClick} />
      </animated.group>

      <animated.group position-y={cargo.y}>
        <CargoContainer position={[0, 0.54, -0.75]} showLabel={inspectMode} showLoad={showLoad} onHotspotClick={onHotspotClick} />
      </animated.group>

      {inspectMode && <DimensionLines />}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// KAMERA: fokus halus ke komponen terpilih
// ─────────────────────────────────────────────────────────────
const HOME = { pos: [3.6, 2.2, 4.4], look: [0, 0.5, 0] };
const HOME_LOOK = HOME.look;
const FOCUS = {
  loadcell:    { pos: [1.8, 0.9, -2.3], look: [0.22, 0.5, -0.75] },
  hx711:       { pos: [1.5, 1.5, 1.4],  look: [-0.2, 0.8, 0] },
  esp32:       { pos: [1.5, 1.5, 1.4],  look: [-0.05, 0.8, 0] },
  gps:         { pos: [1.5, 1.5, 1.4],  look: [0.1, 0.8, 0] },
  electronics: { pos: [1.6, 1.3, 1.4],  look: [0, 0.75, 0] },
  platform:    { pos: [1.8, 1.3, -2.0], look: [0, 0.52, -0.75] },
  display:     { pos: [0.7, 1.5, -0.2], look: [0, 1.0, 0.86] },
  cargo:       { pos: [2.0, 2.0, -2.2], look: [0, 0.8, -0.75] },
  battery:     { pos: [1.6, 0.6, 1.4],  look: [0, 0.3, 0.35] },
};

function CameraController({ target }) {
  const { camera } = useThree();
  const controls = useThree((s) => s.controls);
  const goal = useRef(null);
  const prev = useRef(null);

  useEffect(() => {
    const g = target && FOCUS[target] ? FOCUS[target] : prev.current ? HOME : null;
    goal.current = g && { pos: new THREE.Vector3(...g.pos), look: new THREE.Vector3(...g.look) };
    prev.current = target;
  }, [target]);

  useFrame(() => {
    const g = goal.current;
    if (!g || !controls) return;
    camera.position.lerp(g.pos, 0.08);
    controls.target.lerp(g.look, 0.08);
    controls.update();
    if (camera.position.distanceTo(g.pos) < 0.02) goal.current = null;
  });
  return null;
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN UTAMA
//   variant: 'color' (default, mirip render blueprint) | 'blueprint' (garis putih)
// ─────────────────────────────────────────────────────────────
const LIGHT_K = parseInt(THREE.REVISION, 10) >= 155 ? Math.PI : 1;

const SmartScale3D = ({ exploded = false, inspectMode = false, focusTarget = null, weighSimData = null, variant = 'color' }) => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [mode, setMode] = useState(variant);
  useEffect(() => setMode(variant), [variant]);

  const handleHotspot = (id) => setActiveHotspot((cur) => (id === cur ? null : id));

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: '#ffffff' }}>
      <Canvas camera={{ position: HOME.pos, fov: 40 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={['#ffffff']} />
        <ModeContext.Provider value={mode}>
          <ambientLight intensity={0.55 * LIGHT_K} />
          <directionalLight position={[4, 6, 3]} intensity={0.65 * LIGHT_K} />
          <directionalLight position={[-4, 3, -4]} intensity={0.25 * LIGHT_K} />

          <gridHelper args={[20, 40, '#dddddd', '#f0f0f0']} position={[0, -0.015, 0]} />
          {mode === 'color' && <ContactShadows position={[0, 0.002, 0]} opacity={0.35} scale={8} blur={2.5} far={2} />}

          <CameraController target={focusTarget} />
          <VehicleAssembly
            exploded={exploded}
            inspectMode={inspectMode}
            onHotspotClick={handleHotspot}
            weighSimData={weighSimData}
            showLoad
          />

          <OrbitControls
            makeDefault
            target={HOME_LOOK}
            enablePan={false}
            minDistance={1.2}
            maxDistance={11}
            minPolarAngle={0.1}
            maxPolarAngle={Math.PI / 2 + 0.05}
            autoRotate={!exploded && !inspectMode}
            autoRotateSpeed={0.6}
            enableDamping
            dampingFactor={0.08}
          />
        </ModeContext.Provider>
      </Canvas>

      {/* Pilih gaya tampilan */}
    

      {activeHotspot && HOTSPOT_INFO[activeHotspot] && (
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs bg-white border-2 border-black p-5 z-20">
          <button onClick={() => setActiveHotspot(null)} className="absolute top-3 right-3 text-black font-bold text-lg">×</button>
          <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">{HOTSPOT_INFO[activeHotspot].title}</div>
          <div className="font-bold text-gray-800 text-base mb-2">{HOTSPOT_INFO[activeHotspot].subtitle}</div>
          <p className="text-gray-600 text-sm leading-relaxed">{HOTSPOT_INFO[activeHotspot].body}</p>
        </div>
      )}
    </div>
  );
};

export default SmartScale3D;