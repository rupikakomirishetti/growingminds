'use client';
import React, { useEffect, useState } from 'react';
import AdminPortal from '../../components/AdminPortal';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { Child } from '../../types';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*');

      if (error) throw error;

      if (data) {
        const fetchedChildren: Child[] = data.map(dbChild => ({
          id: dbChild.id,
          firstName: dbChild.first_nm,
          lastName: dbChild.last_nm,
          dateOfBirth: dbChild.dob,
          allergies: dbChild.medication || 'None',
          medication: dbChild.medication,
          group: dbChild.grade_level,
          photoUrl: dbChild.photo_url || `https://picsum.photos/seed/${dbChild.id}/200`,
          enrollmentType: dbChild.enrollment_type,
          emergencyContact: dbChild.emergency_contact,
          email: dbChild.parent_email
        }));
        setChildren(fetchedChildren);
      }
    } catch (err) {
      console.error('Error fetching children:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleRegister = (newChild: Child) => {
    setChildren(prev => [...prev, newChild]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <p className="text-emerald-700 font-bold animate-pulse">Loading the village...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <AdminPortal
        childrenData={children}
        onRegister={handleRegister}
        onLogout={() => router.push('/')}
      />
    </ProtectedRoute>
  );
}