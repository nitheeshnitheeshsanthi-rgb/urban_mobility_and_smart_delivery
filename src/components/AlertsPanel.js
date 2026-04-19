import React from 'react';
import { AlertCircle, Zap, Shield } from 'lucide-react';

const AlertsPanel = () => {
  const e = React.createElement;

  const alerts = [
    { id: 1, type: 'Traffic', msg: 'Heavy congestion reported at Silk Board Junction, Bangalore.', time: '2 mins ago', color: 'var(--danger)' },
    { id: 2, type: 'Weather', msg: 'Heavy rain expected in Chennai areas within 30 mins.', time: '15 mins ago', color: 'var(--warning)' },
    { id: 3, type: 'System', msg: 'AI Routing Node #42 optimized successfully.', time: '1 hour ago', color: 'var(--success)' },
  ];

  return e('div', { className: 'card', style: { height: '100%' } },
    e('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' } },
      e(AlertCircle, { size: 20, color: 'var(--primary)' }),
      e('h3', { style: { fontSize: '1.125rem', fontWeight: 600 } }, 'Real-time Intelligence')
    ),
    e('div', { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } },
      alerts.map((alert) => 
        e('div', { key: alert.id, style: { padding: '1rem', borderRadius: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderLeft: `4px solid ${alert.color}` } },
          e('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' } },
            e('span', { style: { fontSize: '0.7rem', fontWeight: 700, color: alert.color, textTransform: 'uppercase' } }, alert.type),
            e('span', { style: { fontSize: '0.7rem', color: 'var(--text-secondary)' } }, alert.time)
          ),
          e('p', { style: { fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.4' } }, alert.msg)
        )
      )
    )
  );
};

export default AlertsPanel;
