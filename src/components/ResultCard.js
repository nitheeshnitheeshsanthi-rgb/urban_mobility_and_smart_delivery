import React from 'react';
import { AlertTriangle, CheckCircle, Navigation } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const e = React.createElement;
  const isDelayed = result.delay_prediction === 1;
  const probabilityPerc = (result.probability * 100).toFixed(1);

  return e('div', { 
    className: `card animate-fade-in ${isDelayed ? 'border-danger' : 'border-success'}` 
  },
    e('div', { 
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' } 
    },
      e('h2', { style: { fontSize: '1.25rem' } }, 'Prediction Results'),
      isDelayed 
        ? e('div', { style: { display: 'flex', alignItems: 'center', color: 'var(--danger)', gap: '0.5rem' } },
            e(AlertTriangle, { size: 20 }),
            e('span', { style: { fontWeight: 600 } }, 'DELAYED')
          )
        : e('div', { style: { display: 'flex', alignItems: 'center', color: 'var(--success)', gap: '0.5rem' } },
            e(CheckCircle, { size: 20 }),
            e('span', { style: { fontWeight: 600 } }, 'ON TIME')
          )
    ),

    e('div', { style: { marginBottom: '1.5rem' } },
      e('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' } },
        e('span', { style: { color: 'var(--text-secondary)', fontSize: '0.875rem' } }, 'Confidence Probability'),
        e('span', { style: { fontWeight: 600 } }, `${probabilityPerc}%`)
      ),
      e('div', { style: { height: '8px', background: 'var(--bg-accent)', borderRadius: '4px', overflow: 'hidden' } },
        e('div', { 
          style: { 
            height: '100%', 
            width: `${probabilityPerc}%`, 
            background: isDelayed ? 'var(--danger)' : 'var(--success)',
            transition: 'width 1s ease-out'
          } 
        })
      )
    ),

    isDelayed && e('div', { 
      style: { background: 'rgba(56, 189, 248, 0.1)', padding: '1rem', borderRadius: '0.75rem', border: '1px dashed var(--primary)' } 
    },
      e('div', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' } },
        e(Navigation, { size: 18 }),
        e('span', { style: { fontWeight: 600, fontSize: '0.875rem' } }, 'AI Suggested Route')
      ),
      e('p', { style: { fontSize: '0.9rem', color: 'var(--text-primary)' } },
        result.suggested_route || 'Rerouting via Industrial Corridor B to avoid high-density traffic clusters.'
      )
    )
  );
};

export default ResultCard;
