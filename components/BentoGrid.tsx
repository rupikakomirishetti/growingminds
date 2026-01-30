'use client';
import React from 'react';
import Image from 'next/image';
import { Palette, Rocket, Sparkles, Users, Heart } from 'lucide-react';

const BentoGrid = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-20 relative z-10">
            <div className="text-center mb-16 space-y-4 animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold text-emerald-900 font-patrick">
                    Where Little Minds <span className="text-primary italic">Flourish</span>
                </h2>
                <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                    Every moment is a chance to learn, grow, and discover the world through play
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
                {/* Creative Play - Large Feature */}
                <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-pink-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                        src="/images/creative-play.jpg"
                        alt="Children engaged in creative building activities"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 via-black/50 to-transparent z-20">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-purple-500/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <Palette className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white font-patrick">Creative Expression</h3>
                        </div>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Hands-on activities that spark imagination and develop fine motor skills through colorful, engaging play
                        </p>
                    </div>
                </div>

                {/* Indoor Play */}
                <div className="md:col-span-2 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-cyan-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                        src="/images/indoor-play.jpg"
                        alt="Children playing in safe indoor play area"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 via-black/50 to-transparent z-20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-500/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white font-patrick">Active Adventures</h3>
                        </div>
                        <p className="text-white/90 leading-relaxed">
                            Safe, supervised play spaces where energy meets exploration
                        </p>
                    </div>
                </div>

                {/* Focused Learning */}
                <div className="md:col-span-1 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                        src="/images/focused-learning.jpg"
                        alt="Child focused on learning activity"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 via-black/50 to-transparent z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-amber-500/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white font-patrick">Deep Focus</h3>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Nurturing concentration and creativity
                        </p>
                    </div>
                </div>

                {/* Outdoor Adventure */}
                <div className="md:col-span-1 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-linear-to-br from-green-500/20 to-emerald-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                        src="/images/outdoor-adventure.jpg"
                        alt="Children playing on outdoor equipment"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 via-black/50 to-transparent z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-green-500/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white font-patrick">Outdoor Fun</h3>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Fresh air and physical development
                        </p>
                    </div>
                </div>

                {/* Joyful Play - Wide Feature */}
                <div className="md:col-span-2 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-linear-to-br from-rose-500/20 to-pink-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                        src="/images/joyful-play.jpg"
                        alt="Group of children running and playing joyfully"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 via-black/50 to-transparent z-20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-rose-500/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white font-patrick">Pure Joy</h3>
                        </div>
                        <p className="text-white/90 leading-relaxed">
                            Building friendships, confidence, and unforgettable memories together
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="inline-flex items-center gap-3 bg-linear-to-r from-primary/10 to-purple-500/10 backdrop-blur-xl px-8 py-4 rounded-full border border-primary/20 shadow-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="font-bold text-emerald-900 text-lg">
                        Every child's journey is unique and celebrated
                    </span>
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
