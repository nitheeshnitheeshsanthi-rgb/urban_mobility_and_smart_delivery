import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Centered on South India (Bangalore region)
const center = [12.9716, 77.5946]; 
const routePath = [
  [12.9716, 77.5946], // Bangalore
  [12.8399, 77.6770], // Electronic City
  [12.7409, 77.8253], // Hosur
  [12.5186, 78.2137], // Krishnagiri
];

const trafficZones = [
  { center: [12.9176, 77.6233], radius: 1000, color: '#ef4444' }, // Silk Board (High traffic)
  { center: [12.8399, 77.6770], radius: 800, color: '#f59e0b' },  // Electronic City (Medium traffic)
];

const MapView = () => {
  const e = React.createElement;

  return e('div', { 
    className: "card map-section", 
    style: { padding: 0, overflow: 'hidden', height: '450px', position: 'relative' } 
  },
    e('div', { 
      style: { position: 'absolute', top: '1rem', left: '1rem', zIndex: 1000, background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)' } 
    },
      e('h3', { style: { fontSize: '0.875rem', fontWeight: 600 } }, 'South India Fleet Tracking')
    ),
    e(MapContainer, { center: center, zoom: 10, style: { height: '100%', width: '100%' } },
      e(TileLayer, {
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }),
      e(Polyline, { positions: routePath, color: "#38bdf8", weight: 4, dashArray: "10, 10" }),
      e(Marker, { position: center },
        e(Popup, null, 'Bangalore Central Hub')
      ),
      e(Marker, { position: routePath[routePath.length - 1] },
        e(Popup, null, 'Krishnagiri Logistics Point')
      ),
      trafficZones.map((zone, idx) => 
        e(Circle, { 
          key: idx,
          center: zone.center,
          radius: zone.radius,
          pathOptions: { fillColor: zone.color, color: zone.color, fillOpacity: 0.3 }
        },
          e(Popup, null, 'Active Congestion Zone')
        )
      )
    )
  );
};

export default MapView;
