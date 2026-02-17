'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { restaurantMenus, MenuItem } from '@/lib/menuData';
import { Restaurant } from '@/lib/data';

interface RestaurantMenuModalProps {
    restaurant: Restaurant | null;
    isOpen: boolean;
    onClose: () => void;
}

export const RestaurantMenuModal: React.FC<RestaurantMenuModalProps> = ({
    restaurant,
    isOpen,
    onClose,
}) => {
    const { addItem } = useCartStore();
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    if (!isOpen || !restaurant) return null;

    const menu = restaurantMenus.find((m) => m.restaurantId === restaurant.id);
    const menuItems = menu?.items || [];

    // Group items by category
    const itemsByCategory = menuItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    const handleQuantityChange = (itemId: string, delta: number) => {
        const current = quantities[itemId] || 1;
        const newQuantity = Math.max(1, current + delta);
        setQuantities({ ...quantities, [itemId]: newQuantity });
    };

    const handleAddToCart = (item: MenuItem, quantity: number) => {
        if (quantity > 0) {
            addItem({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: quantity,
                restaurant: restaurant.name,
                imageUrl: item.imageUrl,
            });
            // Reset quantity after adding
            setQuantities({ ...quantities, [item.id]: 0 });
        }
    };

    return (
        <>
            {/* Simple overlay - no blur */}
            <div
                className="fixed inset-0 bg-black/60 z-50"
                onClick={onClose}
            />

            {/* Modal - simplified */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col my-8">
                    {/* Simple Header */}
                    <div className="relative h-48 bg-[var(--rappi-orange)]">
                        <Image
                            src={restaurant.imageUrl}
                            alt={restaurant.name}
                            fill
                            className="object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl z-10"
                        >
                            <X className="w-6 h-6 text-gray-900" />
                        </button>

                        {/* Restaurant Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h2 className="text-4xl font-bold mb-2">{restaurant.name}</h2>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <span className="bg-white/20 px-3 py-1.5 rounded-full">
                                    ⭐ {restaurant.rating}
                                </span>
                                <span className="bg-white/20 px-3 py-1.5 rounded-full">
                                    🕐 {restaurant.deliveryTime} min
                                </span>
                                <span className="bg-white/20 px-3 py-1.5 rounded-full">
                                    💵 {restaurant.priceRange}
                                </span>
                                <span className="bg-white/20 px-3 py-1.5 rounded-full">
                                    {restaurant.cuisine}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items - Clean & Simple */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        {Object.entries(itemsByCategory).map(([category, items]) => (
                            <div key={category} className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[var(--rappi-orange)]">
                                    {category}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {items.map((item) => {
                                        const quantity = quantities[item.id] || 1;
                                        return (
                                            <div
                                                key={item.id}
                                                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg"
                                            >
                                                <div className="flex gap-4">
                                                    {/* Image */}
                                                    <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-lg text-gray-900 mb-1">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                            {item.description}
                                                        </p>
                                                        <p className="text-xl font-bold text-[var(--rappi-orange)]">
                                                            ${item.price} MXN
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, -1)}
                                                            className="p-1 hover:bg-gray-200 rounded-full disabled:opacity-50"
                                                            disabled={quantity === 0}
                                                        >
                                                            <Minus className="w-4 h-4 text-gray-900" />
                                                        </button>
                                                        <span className="font-bold text-lg w-8 text-center text-gray-900">
                                                            {quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, 1)}
                                                            className="p-1 hover:bg-gray-200 rounded-full"
                                                        >
                                                            <Plus className="w-4 h-4 text-gray-900" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => handleAddToCart(item, quantity)}
                                                        disabled={quantity === 0}
                                                        className="flex items-center gap-2 px-5 py-2.5 bg-[var(--rappi-orange)] text-white rounded-full font-bold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
