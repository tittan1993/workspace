import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { PopupsProvider } from '@workspace/project-generic';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PopupsProvider>
      <App />
    </PopupsProvider>
  </React.StrictMode>
);
