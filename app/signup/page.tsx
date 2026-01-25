'use client';
import React from 'react';
import SignUpPage from '../../components/SignUpPage';
import { useRouter } from '../../App';

export default function Page() {
  const router = useRouter();
  
  return (
    <SignUpPage 
      onSignUpSuccess={() => router.push('/parent')}
      onBack={() => router.push('/')}
      onSwitchToLogin={() => router.push('/login')}
    />
  );
}