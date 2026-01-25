import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import './globals.css';
import { Inter } from "next/font/google";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'GrowingMinds - Daycare Platform',
  description: 'A gentle bridge between busy parents and their little adventurers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-[#fdfcf0] selection:bg-emerald-100 selection:text-emerald-900">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}