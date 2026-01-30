'use client';
import React, { useEffect, useState } from 'react';
import ParentPortal from '../../components/ParentPortal';
import ChildRegistration from '../../components/ChildRegistration';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Child } from '@/types';
import { Loader2 } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<Child | null>(null);

  const fetchStudentData = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('parent_email', user.email)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const child: Child = {
          id: data.id,
          firstName: data.first_nm,
          lastName: data.last_nm,
          dateOfBirth: data.dob,
          allergies: data.medication || 'None',
          medication: data.medication,
          group: data.grade_level,
          photoUrl: data.photo_url || `https://picsum.photos/seed/${data.id}/200`,
          email: data.parent_email,
          enrollmentType: data.enrollment_type,
          emergencyContact: data.emergency_contact
        };
        setStudentData(child);
      } else {
        setStudentData(null);
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchStudentData();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <p className="text-emerald-700 font-bold animate-pulse">Entering the village...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {!studentData ? (
        <ChildRegistration onCheckComplete={fetchStudentData} />
      ) : (
        <ParentPortal
          childrenData={[studentData]}
          onLogout={() => router.push('/')}
        />
      )}
    </ProtectedRoute>
  );
}