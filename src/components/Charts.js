import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const mockBarData = [
  { name: 'Mon', onTime: 45, delayed: 12 },
  { name: 'Tue', onTime: 52, delayed: 8 },
  { name: 'Wed', onTime: 38, delayed: 15 },
  { name: 'Thu', onTime: 61, delayed: 5 },
  { name: 'Fri', onTime: 48, delayed: 10 },
  { name: 'Sat', onTime: 32, delayed: 20 },
  { name: 'Sun', onTime: 55, delayed: 7 },
];

const mockLineData = [
  { time: '08:00', load: 30 },
  { time: '10:00', load: 65 },
  { time: '12:00', load: 45 },
  { time: '14:00', load: 55 },
  { time: '16:00', load: 85 },
  { time: '18:00', load: 95 },
  { time: '20:00', load: 40 },
];

const Charts = () => {
  const e = React.createElement;

  return e('div', { 
    style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' } 
  },
    e('div', { className: "card" },
      e('h3', { style: { marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-secondary)' } }, 'Delivery Performance'),
      e('div', { style: { width: '100%', height: 300 } },
        e(ResponsiveContainer, null,
          e(BarChart, { data: mockBarData },
            e(CartesianGrid, { strokeDasharray: "3 3", stroke: "#334155", vertical: false }),
            e(XAxis, { dataKey: "name", stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: false }),
            e(YAxis, { stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: false }),
            e(Tooltip, { 
              contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' },
              itemStyle: { color: '#f8fafc' }
            }),
            e(Legend, { verticalAlign: "top", align: "right", iconType: "circle" }),
            e(Bar, { dataKey: "onTime", name: "On-Time", fill: "#10b981", radius: [4, 4, 0, 0] }),
            e(Bar, { dataKey: "delayed", name: "Delayed", fill: "#ef4444", radius: [4, 4, 0, 0] })
          )
        )
      )
    ),

    e('div', { className: "card" },
      e('h3', { style: { marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-secondary)' } }, 'System Load Trend'),
      e('div', { style: { width: '100%', height: 300 } },
        e(ResponsiveContainer, null,
          e(LineChart, { data: mockLineData },
            e(CartesianGrid, { strokeDasharray: "3 3", stroke: "#334155", vertical: false }),
            e(XAxis, { dataKey: "time", stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: false }),
            e(YAxis, { stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: false }),
            e(Tooltip, { 
              contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }
            }),
            e(Line, { 
              type: "monotone", 
              dataKey: "load", 
              stroke: "url(#lineGradient)", 
              strokeWidth: 3, 
              dot: { r: 4, fill: '#38bdf8' }, 
              activeDot: { r: 6 }
            }),
            e('defs', null,
              e('linearGradient', { id: "lineGradient", x1: "0", y1: "0", x2: "1", y2: "0" },
                e('stop', { offset: "0%", stopColor: "#38bdf8" }),
                e('stop', { offset: "100%", stopColor: "#818cf8" })
              )
            )
          )
        )
      )
    )
  );
};

export default Charts;
