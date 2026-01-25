'use client';
import React from 'react';
import ParentPortal from '../../components/ParentPortal';
import { useRouter } from '../../App';
import { MOCK_CHILDREN } from '../../constants';

export default function Page() {
  const router = useRouter();
  
  return (
    <ParentPortal 
      childrenData={MOCK_CHILDREN}
      onLogout={() => router.push('/')}
    />
  );
}