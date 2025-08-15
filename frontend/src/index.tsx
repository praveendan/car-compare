import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/base.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/theme.scss';

import Dashboard from './components/Dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <Dashboard />
  // </React.StrictMode>
);

