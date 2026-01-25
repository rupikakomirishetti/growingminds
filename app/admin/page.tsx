'use client';
import React, { useState } from 'react';
import AdminPortal from '../../components/AdminPortal';
import { useRouter } from 'next/navigation';
import { MOCK_CHILDREN } from '../../constants';
import { Child } from '../../types';

export default function Page() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>(MOCK_CHILDREN);

  const handleRegister = (newChild: Child) => {
    setChildren(prev => [...prev, newChild]);
  };

  return (
    <AdminPortal 
      childrenData={children}
      onRegister={handleRegister}
      onLogout={() => router.push('/')}
    />
  );
}