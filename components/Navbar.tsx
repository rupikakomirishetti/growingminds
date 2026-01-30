'use client';
import React from 'react';
import { Baby, LogIn, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onSelect: (view: 'admin' | 'parent' | 'login') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (isAdmin) {
      router.push('/admin');
    } else {
      router.push('/parent');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 px-4 md:px-6 py-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2rem px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 shrink-0 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <Baby className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-emerald-900 tracking-tight font-patrick whitespace-nowrap">GrowingMinds</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Button
              variant="default"
              size="sm"
              className="flex gap-2 px-6 shadow-lg shadow-primary/20"
              onClick={handleDashboardClick}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="flex gap-2 px-6 shadow-lg shadow-primary/20"
              onClick={() => onSelect('login')}
            >
              <LogIn className="w-4 h-4 md:hidden" />
              <span className="hidden md:inline">Sign In</span>
              <span className="md:hidden">Login</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;