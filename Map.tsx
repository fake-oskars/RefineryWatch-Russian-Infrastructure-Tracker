import React, { useEffect, useRef } from 'react';
import { Refinery, RefineryStatus, Pipeline } from './types';

interface MapProps {
  refineries: Refinery[];
  pipelines: Pipeline[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function Map({ refineries, pipelines, selectedId, onSelect }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const pipelinesRef = useRef<any[]>([]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Initialize map with a view centered to show both Ukraine and Western Russia
    const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
    }).setView([50.0, 38.0], 5); // Centered between UA/RU
    
    // CartoDB Dark Matter Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // --- Load Borders ---
    
    // Load Ukraine
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/UKR.geo.json')
      .then(r => r.json())
      .then(data => {
        L.geoJSON(data, {
          style: {
            color: '#3b82f6', // Blue-500
            weight: 2,
            opacity: 0.8,
            fillColor: '#3b82f6',
            fillOpacity: 0.15
          }
        }).addTo(map);
      })
      .catch(e => console.error("Failed to load UA borders", e));

    // Load Russia (Simplified)
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/RUS.geo.json')
      .then(r => r.json())
      .then(data => {
        L.geoJSON(data, {
          style: {
            color: '#ef4444', // Red-500
            weight: 1,
            opacity: 0.6,
            fillColor: '#ef4444',
            fillOpacity: 0.05,
            dashArray: '5, 5' // Dashed border for RU
          }
        }).addTo(map);
      })
      .catch(e => console.error("Failed to load RU borders", e));

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Render Pipelines
  useEffect(() => {
    if (!mapInstanceRef.current || !pipelines) return;
    const L = (window as any).L;
    const map = mapInstanceRef.current;

    // Clear existing pipelines
    pipelinesRef.current.forEach(p => map.removeLayer(p));
    pipelinesRef.current = [];

    pipelines.forEach(pipeline => {
      const color = pipeline.type === 'oil' ? '#f59e0b' : '#0ea5e9'; // Amber-500 (Oil) vs Sky-500 (Gas)
      
      const polyline = L.polyline(pipeline.coordinates, {
        color: color,
        weight: 3,
        opacity: 0.6,
        dashArray: pipeline.status === 'destroyed' ? '4, 8' : undefined,
        lineCap: 'round'
      }).addTo(map);

      polyline.bindPopup(`
        <div class="font-sans">
          <h3 class="font-bold text-sm">${pipeline.name}</h3>
          <p class="text-xs uppercase tracking-wider text-slate-500">${pipeline.type} | ${pipeline.status}</p>
        </div>
      `);

      pipelinesRef.current.push(polyline);
    });

  }, [pipelines]);

  // Update Markers and FlyTo logic
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const L = (window as any).L;
    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    refineries.forEach(refinery => {
      const color = getStatusColor(refinery.status);
      const isSelected = refinery.id === selectedId;
      
      // Pulse for Damaged or Offline Statuses
      const shouldPulse = !isSelected && (refinery.status === RefineryStatus.OFFLINE || refinery.status === RefineryStatus.DAMAGED);
      const pulseHtml = shouldPulse ? `<div class="marker-pulse" style="box-shadow: 0 0 8px 2px ${color};"></div>` : '';

      // Create marker HTML
      const markerHtml = `
        <div class="relative w-full h-full flex items-center justify-center">
          ${pulseHtml}
          <div style="
            background-color: ${color};
            width: ${isSelected ? '16px' : '12px'};
            height: ${isSelected ? '16px' : '12px'};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 ${isSelected ? '20px' : '8px'} ${color};
            transition: all 0.3s ease;
            z-index: 10;
          "></div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-refinery-marker',
        html: markerHtml,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([refinery.lat, refinery.lng], { icon })
        .addTo(map)
        .bindTooltip(refinery.name, {
            direction: 'top',
            offset: [0, -10],
            opacity: 0.9,
            className: 'bg-slate-900 text-white border border-slate-700 px-2 py-1 rounded text-xs font-bold'
        })
        .on('click', () => {
            onSelect(refinery.id);
            
            // Adjust FlyTo based on screen size
            const isMobile = window.innerWidth < 768;
            const targetLat = isMobile ? refinery.lat - 1.5 : refinery.lat;
            
            map.flyTo([targetLat, refinery.lng], 7, { duration: 1.5 });
        });

      markersRef.current.push(marker);
    });

  }, [refineries, selectedId, onSelect]);

  function getStatusColor(status: RefineryStatus) {
    switch (status) {
      case RefineryStatus.OFFLINE: return '#ef4444'; // Red-500
      case RefineryStatus.DAMAGED: return '#f97316'; // Orange-500
      case RefineryStatus.OPERATIONAL: return '#22c55e'; // Green-500
      default: return '#94a3b8';
    }
  }

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
}