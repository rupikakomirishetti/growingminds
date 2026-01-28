'use client';
import React, { useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Page() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  // Redirect authenticated users to appropriate dashboard
  useEffect(() => {
    if (!loading && user) {
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/parent');
      }
    }
  }, [user, isAdmin, loading, router]);

  return <LandingPage onSelect={(route) => {
    if (route === 'login') router.push('/login');
    if (route === 'admin') router.push('/admin');
  }} />;
}
