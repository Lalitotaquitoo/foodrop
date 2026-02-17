'use client';

import React, { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useAuthStore } from '@/lib/authStore';
import { openCheckout } from './CheckoutModal';
import Image from 'next/image';
import { Button } from './ui/Button';

export const CartSidebar: React.FC = () => {
    const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
    const { user, openLogin } = useAuthStore();
    const totalPrice = getTotalPrice();

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleCheckout = () => {
        if (!user) {
            openLogin();
            return;
        }
        openCheckout();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-[var(--rappi-orange)]" />
                        <h2 className="text-2xl font-bold text-gray-900">Tu Pedido</h2>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-900" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
                            <p className="text-gray-800 text-xl font-bold mb-2">Tu carrito está vacío</p>
                            <p className="text-gray-600 text-base font-medium">Agrega productos para continuar</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-xl">
                                    {/* Image */}
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base mb-1 line-clamp-1 text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2 font-medium">{item.restaurant}</p>
                                        <p className="font-bold text-base text-[var(--rappi-orange)]">
                                            ${item.price * item.quantity} MXN
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex flex-col items-center justify-between">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="font-bold text-lg w-8 text-center text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Checkout */}
                {items.length > 0 && (
                    <div className="border-t p-4 bg-white pb-20 md:pb-4">
                        {!user && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                <p className="text-sm text-blue-900 font-medium">
                                    ⚠️ Inicia sesión para proceder con tu pedido
                                </p>
                            </div>
                        )}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-bold text-gray-900">Total</span>
                            <span className="text-3xl font-bold text-[var(--rappi-orange)]">
                                ${totalPrice} MXN
                            </span>
                        </div>
                        <Button variant="primary" size="lg" className="w-full" onClick={handleCheckout}>
                            {user ? '🛒 Proceder al pago' : '🔐 Iniciar sesión'}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
