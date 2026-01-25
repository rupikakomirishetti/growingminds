import React from 'react';
import ReactDOM from 'react-dom/client';
import RootLayout from './app/layout';
import PageRouter from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RootLayout>
      <PageRouter />
    </RootLayout>
  </React.StrictMode>
);