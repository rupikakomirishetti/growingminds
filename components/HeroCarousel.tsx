'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    '/images/hero_carousel/IMG_5982.jpg',
    '/images/hero_carousel/IMG_5983.jpg',
    '/images/hero_carousel/IMG_5984.jpg',
    '/images/hero_carousel/IMG_5985.jpg',
    '/images/hero_carousel/IMG_5986.jpg',
    '/images/hero_carousel/IMG_5987.jpg',
    '/images/hero_carousel/IMG_5988.jpg',
    '/images/hero_carousel/IMG_5990.jpg',
    '/images/hero_carousel/IMG_5991.jpg',
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex, isPaused]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Hero image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-[5s] ease-linear"
                        style={{
                            transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)'
                        }}
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 active:scale-95 z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 active:scale-95 z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default HeroCarousel;
