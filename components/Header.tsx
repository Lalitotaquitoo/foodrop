import React from 'react';
import { Search, MapPin, User, ShoppingCart, LogOut, Bike } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { useCartStore } from '@/lib/store';
import { useAuthStore } from '@/lib/authStore';

export const Header: React.FC = () => {
    const { getTotalItems, toggleCart } = useCartStore();
    const { user, openLogin, logout } = useAuthStore();
    const totalItems = getTotalItems();

    return (
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[var(--rappi-orange)] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white font-black text-2xl sm:text-3xl italic">A</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold italic text-[var(--rappi-orange)]">
                            FooDrop
                        </h1>
                    </div>

                    {/* Search Bar - Hidden on mobile, visible on tablet+ */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                id="search-input-desktop"
                                placeholder="Buscar comida en campus..."
                                className="w-full pl-12 pr-4 py-3 bg-[var(--rappi-gray)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--rappi-orange)] transition-all text-base font-medium text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Address - Hidden on mobile */}
                        <button className="hidden lg:flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-full transition-colors">
                            <MapPin className="w-5 h-5 text-[var(--rappi-orange)]" />
                            <span className="text-sm font-medium text-gray-700">Anáhuac Mayab</span>
                        </button>

                        {/* Worker Mode Button */}
                        <Link
                            href="/worker"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full font-semibold transition-colors"
                        >
                            <Bike className="w-5 h-5" />
                            <span className="text-sm">Trabajar</span>
                        </Link>

                        {/* Login/User Button */}
                        {user ? (
                            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
                                <User className="w-5 h-5 text-[var(--rappi-orange)]" />
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-700 font-medium">{user.studentId}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                                    title="Cerrar sesión"
                                >
                                    <LogOut className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        ) : (
                            <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={openLogin}>
                                <User className="w-4 h-4 mr-2" />
                                Ingresar
                            </Button>
                        )}

                        {/* Cart Button */}
                        <button
                            onClick={toggleCart}
                            className="relative p-2 sm:p-3 bg-[var(--rappi-orange)] text-white rounded-full hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
                        >
                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[var(--rappi-green)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-3">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            id="search-input-mobile"
                            placeholder="Buscar comida en campus..."
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--rappi-gray)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--rappi-orange)] transition-all text-base font-medium text-gray-900"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
