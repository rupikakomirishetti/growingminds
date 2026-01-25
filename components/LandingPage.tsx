import React from 'react';
import { Sparkles, Cloud, Sun } from 'lucide-react';
import Navbar from './Navbar';
import Button from './ui/Button';

interface LandingPageProps {
  onSelect: (view: 'admin' | 'parent' | 'login') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-[#fdfcf0] flex flex-col items-center p-6 relative overflow-hidden font-[Quicksand]">
      <Navbar onSelect={onSelect} />
      
      {/* Scenic Elements */}
      <div className="absolute top-32 left-[10%] text-white/60 animate-float pointer-events-none" style={{animationDelay: '0s'}}>
        <Cloud className="w-32 h-32 fill-white" />
      </div>
      <div className="absolute top-48 right-[15%] text-white/50 animate-float pointer-events-none" style={{animationDelay: '2s'}}>
        <Cloud className="w-24 h-24 fill-white" />
      </div>
      <div className="absolute top-[-5%] right-[5%] text-amber-200/40 animate-spin-slow pointer-events-none">
        <Sun className="w-64 h-64 fill-amber-100" />
      </div>

      <div className="max-w-4xl w-full relative z-10 text-center flex-1 flex flex-col justify-center pt-24 md:pt-32">
        <div className="animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/80 rounded-[1.5rem] md:rounded-[2rem] mb-6 md:mb-10 shadow-xl border border-white transform hover:rotate-6 transition-transform">
            <span className="font-bold text-4xl md:text-5xl font-[Patrick_Hand] text-emerald-500">K</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-emerald-800 mb-6 md:mb-8 tracking-tight drop-shadow-sm font-[Patrick_Hand] leading-tight">
            The Village is<br className="hidden sm:block" /> Always Near.
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12">
            A gentle bridge between busy parents and their little adventurers. Captured moments, AI-powered growth, and peaceful community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button variant="primary" size="lg" className="w-full sm:w-auto px-12 py-5 text-lg" onClick={() => onSelect('login')}>
                Get Started
             </Button>
             <Button variant="ghost" size="lg" className="w-full sm:w-auto text-stone-500">
                Explore the Magic
             </Button>
          </div>
        </div>

        <div className="mt-12 md:mt-24 text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 md:px-8 py-3 rounded-full border border-white shadow-sm hover:shadow-md transition-shadow cursor-default">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
            <span className="font-bold text-stone-500 text-[10px] md:text-sm uppercase tracking-widest">Powered by Gemini AI Insights</span>
          </div>
        </div>
      </div>

      {/* Ground Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-100/30 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default LandingPage;