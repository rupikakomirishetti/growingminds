'use client';
import React from 'react';
import { Sparkles, Cloud, Sun, Heart, Shield, Zap, Stethoscope, Award } from 'lucide-react';
import Navbar from './Navbar';
import HeroCarousel from './HeroCarousel';
import BentoGrid from './BentoGrid';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onSelect: (view: 'admin' | 'parent' | 'login') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center relative overflow-hidden font-quicksand">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-sky-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-emerald-100/30 blur-[100px] rounded-full pointer-events-none" />

      <Navbar onSelect={onSelect} />

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto pt-40 md:pt-56 pb-20 px-6 text-center">
        <div className="animate-fade-in space-y-16">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold font-patrick text-emerald-900 tracking-tight">
              Growing <span className="text-purple-500 italic drop-shadow-sm">Minds</span>
            </h1>
            <p className="text-xl md:text-3xl text-stone-600 font-medium max-w-4xl mx-auto leading-relaxed">
              A gentle bridge between busy parents and their little adventurers. Captured moments, growth, and peaceful community.
            </p>
          </div>

          {/* Interactive Slideshow */}
          <div className="px-4">
            <HeroCarousel />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button
              variant="default"
              size="lg"
              className="bg-purple-500 px-12 py-8 text-xl shadow-2xl shadow-purple-200/50 hover:shadow-purple-300/60 transition-all hover:-translate-y-1 rounded-2xl"
              onClick={() => {
                const bentoGrid = document.getElementById('bento-grid');
                if (bentoGrid) {
                  window.scrollTo({ top: bentoGrid.offsetTop - 100, behavior: 'smooth' });
                }
              }}
            >
              Explore Our World
            </Button>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <div id="bento-grid" className="w-full">
        <BentoGrid />
      </div>

      {/* Features Grid */}
      <section className="w-full max-w-6xl px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-400" />}
            title="Safe & Secure"
            description="A secure, monitored environment where children can explore and grow with confidence."
          />

          <FeatureCard
            icon={<Stethoscope className="w-8 h-8 text-emerald-400" />}
            title="CPR & First Aid Certified"
            description="Our staff is fully trained and certified to handle emergencies with expert care."
          />
          <FeatureCard
            icon={<Award className="w-8 h-8 text-purple-400" />}
            title="Fully Accredited"
            description="State Licensed and fully accredited, ensuring the highest standards of safety and education."
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-rose-400" />}
            title="Nurturing Care"
            description="Personalized attention for every child's unique developmental journey."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-amber-400" />}
            title="Interactive Learning"
            description="Engaging activities that spark curiosity and foster creativity."
          />
        </div>
      </section>

      {/* Ground Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-emerald-100/40 to-transparent pointer-events-none"></div>
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