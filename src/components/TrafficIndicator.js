import React from 'react';
import { Zap } from 'lucide-react';

const TrafficIndicator = ({ level = 'Low' }) => {
  const e = React.createElement;

  const getStatusClass = () => {
    switch (level.toLowerCase()) {
      case 'high': return 'status-high';
      case 'medium': return 'status-medium';
      case 'low':
      default: return 'status-low';
    }
  };

  return e('div', { 
    className: "card", 
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } 
  },
    e('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
      e('div', { style: { padding: '0.75rem', borderRadius: '0.75rem', background: 'var(--bg-accent)' } },
        e(Zap, { 
          size: 24, 
          className: "gradient-text", 
          style: { fill: 'none', stroke: 'url(#gradient)' } 
        })
      ),
      e('div', null,
        e('p', { 
          style: { color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' } 
        }, 'Current Traffic Load'),
        e('h3', { style: { fontSize: '1.5rem', fontWeight: 700 } }, level)
      )
    ),
    e('span', { className: `status-badge ${getStatusClass()}` }, 'Live Sync'),
    e('svg', { width: "0", height: "0" },
      e('linearGradient', { id: "gradient", x1: "100%", y1: "100%", x2: "0%", y2: "0%" },
        e('stop', { stopColor: "#38bdf8", offset: "0%" }),
        e('stop', { stopColor: "#818cf8", offset: "100%" })
      )
    )
  );
};

export default TrafficIndicator;
