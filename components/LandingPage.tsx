'use client';
import React from 'react';
import { Sparkles, Cloud, Sun, Heart, Shield, Zap } from 'lucide-react';
import Navbar from './Navbar';
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
      {/* Hero Background Container */}
      <div className="relative w-full min-h-screen flex flex-col items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/daycare-hero.png"
            alt="Warm and inviting daycare classroom"
            fill
            className="object-cover"
            priority
          />
          {/* Soft gradient overlay for readability and premium feel */}
          <div className="absolute inset-0 bg-linear-to-b from-white/40 via-white/10 to-sky-50/80 backdrop-blur-[1px]" />
        </div>

        <Navbar onSelect={onSelect} />

        {/* Hero Section */}
        <section className="max-w-6xl w-full relative z-10 text-center flex flex-col items-center justify-center pt-32 md:pt-48 pb-20 px-6">
          <div className="animate-fade-in space-y-8">
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
                A gentle bridge between busy parents and their little adventurers. Captured moments, growth, and peaceful community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto px-12 py-7 text-xl shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1"
                onClick={() => onSelect('login')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>

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