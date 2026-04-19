import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import TrafficIndicator from '../components/TrafficIndicator';
import Charts from '../components/Charts';
import MapView from '../components/MapView';
import { predictDelivery } from '../services/api';
import QuickStats from '../components/QuickStats';
import AlertsPanel from '../components/AlertsPanel';
import { LayoutDashboard, Car, Clock } from 'lucide-react';

const Dashboard = () => {
  const e = React.createElement;
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (formData) => {
    setLoading(true);
    try {
      const result = await predictDelivery(formData);
      setPrediction(result);
    } catch (err) {
      console.warn('Backend not available, using mock fallback');
      setTimeout(() => {
        const mockResult = {
          delay_prediction: Math.random() > 0.5 ? 1 : 0,
          probability: 0.65 + Math.random() * 0.3,
          suggested_route: formData.traffic_level === 'High' ? 'Reroute via Route 101-North Bypass' : null
        };
        setPrediction(mockResult);
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(false);
  };

  return e(motion.div, { 
    initial: { opacity: 0 }, 
    animate: { opacity: 1 }, 
    className: "dashboard-container" 
  },
    e('header', { 
      className: "header-section", 
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' } 
    },
      e('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
        e('div', { style: { background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.5rem', borderRadius: '0.75rem' } },
          e(LayoutDashboard, { color: "white", size: 24 })
        ),
        e('div', null,
          e('h1', { style: { fontSize: '1.5rem', fontWeight: 700 } }, 
            'Urban Mobility ', 
            e('span', { className: "gradient-text" }, 'Pro')
          ),
          e('p', { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, 'AI-Powered Smart Traffic & Delivery Hub')
        )
      ),
      e('div', { style: { display: 'flex', gap: '1rem' } },
        e('div', { className: "card", style: { padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.75rem' } },
          e(Clock, { size: 16, color: "var(--primary)" }),
          e('span', { style: { fontSize: '0.875rem' } }, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        )
      )
    ),

    e('div', { style: { gridColumn: 'span 2' } }, e(QuickStats)),

    e(motion.aside, { 
      initial: { x: -20, opacity: 0 }, 
      animate: { x: 0, opacity: 1 }, 
      transition: { delay: 0.2 },
      className: "left-panel"
    },
      e(TrafficIndicator, { level: prediction ? (prediction.delay_prediction ? 'High' : 'Low') : 'Medium' }),
      e('div', { style: { marginTop: '1.5rem' } },
        e(InputForm, { onSubmit: handlePredict, loading: loading })
      ),
      e('div', { style: { marginTop: '1.5rem' } },
        e(AlertsPanel)
      )
    ),

    e(motion.main, { 
      initial: { y: 20, opacity: 0 }, 
      animate: { y: 0, opacity: 1 }, 
      transition: { delay: 0.3 },
      className: "right-panel"
    },
      e(ResultCard, { result: prediction }),
      !prediction && !loading && e('div', { 
        className: "card", 
        style: { textAlign: 'center', padding: '3rem', borderStyle: 'dotted' } 
      },
        e(Car, { size: 48, color: "var(--bg-accent)", style: { margin: '0 auto 1rem' } }),
        e('h3', { style: { color: 'var(--text-secondary)' } }, 'Awaiting Parameters...'),
        e('p', { style: { color: 'var(--text-secondary)', fontSize: '0.875rem' } }, 'Enter delivery details on the left to start AI prediction.')
      ),
      loading && e('div', { className: "card", style: { textAlign: 'center', padding: '3rem' } },
        e('div', { 
          className: "spinner", 
          style: { 
            width: '40px', height: '40px', border: '4px solid var(--bg-accent)', 
            borderTop: '4px solid var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem',
            animation: 'spin 1s linear infinite'
          } 
        }),
        e('h3', null, 'Analyzing Traffic Patterns...')
      ),
      e(Charts)
    ),

    e(motion.div, {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.4 },
      className: "map-section"
    },
      e(MapView)
    )
  );
};

export default Dashboard;
