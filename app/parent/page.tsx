'use client';
import React from 'react';
import ParentPortal from '../../components/ParentPortal';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { MOCK_CHILDREN } from '../../constants';

export default function Page() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <ParentPortal
        childrenData={MOCK_CHILDREN}
        onLogout={() => router.push('/')}
      />
    </ProtectedRoute>
  );
}