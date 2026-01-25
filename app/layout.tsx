import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#fdfcf0] selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </div>
    </AuthProvider>
  );
}