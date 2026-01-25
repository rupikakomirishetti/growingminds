import React from 'react';
import { UserCircle, ShieldCheck, Baby, LogIn } from 'lucide-react';
import Button from './ui/Button';

interface NavbarProps {
  onSelect: (view: 'admin' | 'parent' | 'login') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl px-4 md:px-6 py-2 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
             <Baby className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-bold text-emerald-800 tracking-tight font-[Patrick_Hand] whitespace-nowrap">GrowingMinds</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="primary" 
            size="sm"
            className="flex gap-2"
            onClick={() => onSelect('login')}
          >
            <LogIn className="w-4 h-4 md:hidden" />
            <span className="hidden md:inline">Sign In</span>
            <span className="md:hidden">Login</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;