'use client';
import React from 'react';
import { Sparkles, Cloud, Sun, Heart, Shield, Zap } from 'lucide-react';
import Navbar from './Navbar';
import BentoGrid from './BentoGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onSelect: (view: 'admin' | 'parent' | 'login') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-background flex flex-col items-center relative overflow-hidden font-quicksand">
      <Navbar onSelect={onSelect} />

      {/* Scenic Elements */}
      <div className="absolute top-32 left-[5%] text-white/60 animate-float pointer-events-none hidden lg:block" style={{ animationDelay: '0s' }}>
        <Cloud className="w-48 h-48 fill-white" />
      </div>
      <div className="absolute top-48 right-[10%] text-white/50 animate-float pointer-events-none hidden lg:block" style={{ animationDelay: '2s' }}>
        <Cloud className="w-32 h-32 fill-white" />
      </div>
      <div className="absolute top-[-10%] right-[-5%] text-amber-200/30 animate-spin-slow pointer-events-none">
        <Sun className="w-96 h-96 fill-amber-100" />
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl w-full relative z-10 text-center flex flex-col items-center justify-center pt-32 md:pt-48 pb-20 px-6">
        <div className="animate-fade-in space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/80 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white transform hover:rotate-12 transition-transform duration-500">
            <span className="font-bold text-5xl font-patrick text-primary">K</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl sm:text-8xl font-bold text-emerald-900 tracking-tight drop-shadow-sm font-patrick leading-[1.1]">
              The Village is<br /> <span className="text-primary italic">Always</span> Near.
            </h1>

            <p className="text-xl md:text-2xl text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
              A gentle bridge between busy parents and their little adventurers. Captured moments, AI-powered growth, and peaceful community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto px-12 py-7 text-xl shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1"
              onClick={() => onSelect('login')}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-12 py-7 text-xl border-2 hover:bg-white transition-all hover:-translate-y-1"
            >
              Explore the Magic
            </Button>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-xl px-8 py-4 rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all cursor-default group">
            <Sparkles className="w-6 h-6 text-amber-400 group-hover:scale-125 transition-transform" />
            <span className="font-bold text-stone-600 text-sm uppercase tracking-[0.2em]">Gemini AI Insights</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <BentoGrid />

      {/* Features Grid */}
      <section className="w-full max-w-6xl px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-rose-400" />}
            title="Nurturing Care"
            description="Personalized attention for every child's unique developmental journey."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-400" />}
            title="Safe & Secure"
            description="Direct, encrypted communication and real-time safe updates for peace of mind."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-amber-400" />}
            title="AI Powered"
            description="Smart insights into growth patterns and learning milestones using Gemini."
          />
        </div>
      </section>

      {/* Ground Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-emerald-100/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="bg-white/60 backdrop-blur-md border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
    <CardContent className="p-8 space-y-4">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-emerald-900 font-patrick">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

export default LandingPage;