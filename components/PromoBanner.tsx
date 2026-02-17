'use client';

import React from 'react';
import Image from 'next/image';

export const PromoBanner: React.FC = () => {
    return (
        <section className="py-6 bg-gradient-to-r from-[var(--rappi-orange)] to-[var(--rappi-peach)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[var(--rappi-orange)] to-[var(--rappi-peach)] p-8 sm:p-12">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                            Come rico en tu campus
                        </h2>
                        <p className="text-lg sm:text-xl text-white/90 mb-6">
                            Ordena comida directo a tu salón o área favorita
                        </p>
                        <button
                            onClick={() => {
                                const restaurantSection = document.querySelector('section.py-8');
                                restaurantSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-white text-[var(--rappi-orange)] px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
                        >
                            Explorar ahora
                        </button>
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </div>
        </section>
    );
};
