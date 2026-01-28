'use client';
import React, { useEffect } from 'react';
import LoginPage from '../../components/LoginPage';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

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

  return (
    <LoginPage
      onLoginSuccess={() => {
        // OAuth callback will trigger the useEffect above
      }}
      onBack={() => router.push('/')}
      onSwitchToSignUp={() => router.push('/signup')}
    />
  );
}