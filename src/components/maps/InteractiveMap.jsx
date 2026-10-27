import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, ZoomIn, ZoomOut, Locate, Layers, MapPin } from 'lucide-react';

export function InteractiveMap({
  center = [-7.3197, 112.7842], // Default: Gunung Anyar, Surabaya
  zoom = 15,
  minZoom = 11,
  maxZoom = 19,
  markers = [],
  routePath = null, // Array of [lat, lng]
  interactive = true,
  allowPickLocation = false,
  onLocationSelect = null,
  coverageRadius = null, // in meters (for service area)
  height = '100%',
  className = '',
  showControls = true,
  mapStyle = 'voyager' // 'voyager' | 'osm' | 'satellite'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const circleLayerRef = useRef(null);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [currentCenter, setCurrentCenter] = useState(center);
  const [pickedPos, setPickedPos] = useState(center);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zoomControl: false, // We render modern custom buttons
      attributionControl: false,
      dragging: interactive,
      touchZoom: interactive,
      scrollWheelZoom: interactive ? 'center' : false,
      doubleClickZoom: interactive
    });

    // Basemap Tiles: CartoDB Voyager (clean, modern, green palette match)
    const tileUrl =
      mapStyle === 'osm'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Feature Layers
    markersLayerRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);
    circleLayerRef.current = L.layerGroup().addTo(map);

    // Click to pick location
    if (allowPickLocation) {
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setPickedPos([lat, lng]);
        if (onLocationSelect) {
          onLocationSelect({
            lat,
            lng,
            coordsText: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          });
        }
      });
    }

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    map.on('moveend', () => {
      const c = map.getCenter();
      setCurrentCenter([c.lat, c.lng]);
    });

    mapInstanceRef.current = map;

    // Fix map container dimensions after rendering
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync Center & Zoom updates
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center?.[0], center?.[1], zoom]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Render Picked Pin if allowPickLocation is on
    if (allowPickLocation && pickedPos) {
      const pickIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
            <div class="absolute -bottom-1 size-3 rounded-full bg-neutral-900/40 blur-xs"></div>
            <div class="size-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xl border-2 border-brand-green animate-bounce">
              <svg class="size-5 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      const pickMarker = L.marker(pickedPos, { icon: pickIcon, draggable: true }).addTo(markersLayerRef.current);
      pickMarker.on('dragend', (e) => {
        const { lat, lng } = e.target.getLatLng();
        setPickedPos([lat, lng]);
        if (onLocationSelect) {
          onLocationSelect({
            lat,
            lng,
            coordsText: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          });
        }
      });
    }

    // Render Custom Markers
    markers.forEach((m) => {
      let iconHtml = '';

      if (m.type === 'truck') {
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <div class="absolute size-12 rounded-full bg-brand-green/30 animate-ping"></div>
            <div class="size-10 rounded-2xl bg-brand-green text-ink flex items-center justify-center shadow-lg border-2 border-white font-bold">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 17h4V5H2v12h3m11 0h3v-4l-3-4h-3v8z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
              </svg>
            </div>
          </div>
        `;
      } else if (m.type === 'home' || m.type === 'destination') {
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
            <div class="size-9 rounded-2xl ${m.active ? 'bg-brand-green text-ink' : 'bg-neutral-900 text-white'} flex items-center justify-center shadow-xl border-2 border-white font-bold">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
            </div>
          </div>
        `;
      } else if (m.type === 'stop') {
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <div class="size-8 rounded-full ${
              m.active
                ? 'bg-brand-green text-ink ring-4 ring-brand-green/30 font-extrabold scale-110'
                : m.completed
                ? 'bg-neutral-300 text-neutral-600 font-bold'
                : 'bg-neutral-900 text-white font-bold'
            } flex items-center justify-center text-xs shadow-md transition-transform">
              ${m.number || '•'}
            </div>
          </div>
        `;
      } else if (m.type === 'factory') {
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
            <div class="size-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl border-2 border-white font-bold">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
              </svg>
            </div>
          </div>
        `;
      } else {
        // Default pin
        iconHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
            <div class="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center shadow-md border-2 border-white">
              <span class="size-2.5 rounded-full bg-neutral-900"></span>
            </div>
          </div>
        `;
      }

      const customIcon = L.divIcon({
        className: 'custom-interactive-marker',
        html: iconHtml,
        iconSize: [36, 36],
        iconAnchor: [18, m.type === 'truck' || m.type === 'stop' ? 18 : 36]
      });

      const marker = L.marker(m.position, { icon: customIcon }).addTo(markersLayerRef.current);

      if (m.title || m.desc) {
        marker.bindPopup(`
          <div class="p-1 font-sans">
            <p class="font-bold text-xs text-neutral-900">${m.title || ''}</p>
            ${m.desc ? `<p class="text-[11px] text-neutral-600 mt-0.5">${m.desc}</p>` : ''}
          </div>
        `, {
          closeButton: false,
          className: 'modern-map-popup'
        });
      }

      if (m.onClick) {
        marker.on('click', () => m.onClick(m));
      }
    });
  }, [markers, pickedPos, allowPickLocation]);

  // Update Route Polyline
  useEffect(() => {
    if (!mapInstanceRef.current || !routeLayerRef.current) return;

    routeLayerRef.current.clearLayers();

    if (routePath && routePath.length > 1) {
      // Glow border under line
      L.polyline(routePath, {
        color: '#20c85e',
        weight: 7,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(routeLayerRef.current);

      // Main line
      L.polyline(routePath, {
        color: '#16a34a',
        weight: 4,
        opacity: 0.9,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(routeLayerRef.current);
    }
  }, [routePath]);

  // Update Coverage Radius Circle
  useEffect(() => {
    if (!mapInstanceRef.current || !circleLayerRef.current) return;

    circleLayerRef.current.clearLayers();

    if (coverageRadius && center) {
      L.circle(center, {
        radius: coverageRadius,
        color: '#20c85e',
        weight: 2,
        fillColor: '#20c85e',
        fillOpacity: 0.18,
        dashArray: '6, 6'
      }).addTo(circleLayerRef.current);
    }
  }, [coverageRadius, center?.[0], center?.[1]]);

  // Map Controls Helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 outline-none" />

      {/* Floating Modern Map Controls */}
      {showControls && (
        <div className="absolute right-3 bottom-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleRecenter}
            aria-label="Pusatkan Lokasi"
            className="size-8.5 rounded-xl bg-white/95 backdrop-blur-md text-neutral-800 hover:bg-white shadow-md border border-neutral-200/80 flex items-center justify-center transition-transform active:scale-90"
            title="Pusatkan Peta"
          >
            <Locate className="size-4 text-brand-green" />
          </button>

          <div className="flex flex-col rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-neutral-200/80 overflow-hidden">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Perbesar"
              className="size-8.5 hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors border-b border-neutral-200/60 active:bg-neutral-200"
              title="Perbesar"
            >
              <ZoomIn className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Perkecil"
              className="size-8.5 hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors active:bg-neutral-200"
              title="Perkecil"
            >
              <ZoomOut className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

