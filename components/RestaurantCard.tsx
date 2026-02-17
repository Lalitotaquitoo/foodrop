'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Clock, DollarSign } from 'lucide-react';
import { Restaurant } from '@/lib/data';

interface RestaurantCardProps {
    restaurant: Restaurant;
    onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform"
        >
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
                <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {restaurant.deliveryCost === 0 && (
                    <div className="absolute top-3 right-3 bg-[var(--rappi-green)] text-white px-3 py-1 rounded-full text-xs font-bold">
                        🎉 Envío gratis
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{restaurant.name}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-700 mb-3 font-medium">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[var(--rappi-orange)] text-[var(--rappi-orange)]" />
                        <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.deliveryTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{restaurant.priceRange}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className="w-full mt-4 bg-[var(--rappi-orange)] text-white py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors"
                >
                    Ver menú
                </button>
            </div>
        </div>
    );
};
