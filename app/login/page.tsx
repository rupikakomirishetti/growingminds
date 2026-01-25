'use client';
import React from 'react';
import LoginPage from '../../components/LoginPage';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <LoginPage 
      onLoginSuccess={() => router.push('/parent')}
      onBack={() => router.push('/')}
      onSwitchToSignUp={() => router.push('/signup')}
    />
  );
}