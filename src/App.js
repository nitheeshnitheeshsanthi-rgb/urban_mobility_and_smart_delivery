import React from 'react';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return React.createElement('div', { className: "App" },
    React.createElement(Dashboard)
  );
}

export default App;
