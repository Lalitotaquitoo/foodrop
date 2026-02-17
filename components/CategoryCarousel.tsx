'use client';

import React, { useRef } from 'react';
import { categories } from '@/lib/data';

export const CategoryCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-6 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="flex-shrink-0 flex flex-col items-center gap-2 group"
                        >
                            <div
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 shadow-md group-hover:shadow-lg"
                                style={{ backgroundColor: category.color + '20', border: `2px solid ${category.color}` }}
                            >
                                {category.icon}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
};
