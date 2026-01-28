'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithOtp: (email: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
  isMocking: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Derived user profile data
  const email = user?.email ?? null;
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || '';
  const [firstName, lastName] = fullName ? fullName.split(' ') : [null, null];

  // Admin check
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = !!email && !!adminEmail && email.toLowerCase() === adminEmail.toLowerCase();

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      const mockUser = localStorage.getItem('mock_user');
      if (mockUser) setUser(JSON.parse(mockUser));
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
      if (error) throw error;
    } else {
      const mockUser: any = {
        id: 'mock-user-123',
        email: 'parent@example.com',
        user_metadata: { full_name: 'Thompson Family', avatar_url: 'https://picsum.photos/200' }
      };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const signInWithOtp = async (email: string, metadata?: any) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: metadata
        },
      });
      if (error) throw error;
    } else {
      // Mocking magic link
      console.log(`[Mock] Magic link sent to ${email}`, metadata);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('mock_user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      email,
      firstName,
      lastName,
      isAdmin,
      signInWithGoogle,
      signInWithOtp,
      signOut,
      isMocking: !isSupabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
};