import React from 'react';
import { Activity, ShieldCheck, Zap, Truck } from 'lucide-react';

const QuickStats = () => {
  const e = React.createElement;

  const stats = [
    { label: 'Network Health', value: '98.4%', icon: Activity, color: 'var(--primary)' },
    { label: 'Active Fleet', value: '1,240', icon: Truck, color: 'var(--secondary)' },
    { label: 'Safety Index', value: 'A+', icon: ShieldCheck, color: 'var(--success)' },
    { label: 'AI Throughput', value: '250/s', icon: Zap, color: 'var(--warning)' },
  ];

  return e('div', { 
    style: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '1.5rem', 
      marginBottom: '1.5rem' 
    } 
  },
    stats.map((stat, idx) => 
      e('div', { key: idx, className: 'card', style: { padding: '1.25rem' } },
        e('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
          e('div', { 
            style: { 
              padding: '0.75rem', 
              borderRadius: '0.75rem', 
              background: 'rgba(255, 255, 255, 0.05)', 
              color: stat.color 
            } 
          },
            e(stat.icon, { size: 24 })
          ),
          e('div', null,
            e('p', { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, stat.label),
            e('h4', { style: { fontSize: '1.25rem', fontWeight: 700 } }, stat.value)
          )
        )
      )
    )
  );
};

export default QuickStats;
