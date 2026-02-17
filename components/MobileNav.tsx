'use client';

import { useState, useEffect } from 'react';
import { Home, Package, Search, User, Bike } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { useCartStore } from '@/lib/store';

type TabId = 'home' | 'orders' | 'search' | 'account' | 'worker';
type OpenModal = 'orders' | 'account' | null;

export function MobileNav() {
    const [currentTab, setCurrentTab] = useState<TabId>('home');
    const [openModal, setOpenModal] = useState<OpenModal>(null);
    const { user, openLogin } = useAuthStore();
    const { items, isOpen: isCartOpen } = useCartStore();

    // Close modals when cart opens
    useEffect(() => {
        if (isCartOpen) {
            setOpenModal(null);
        }
    }, [isCartOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (openModal !== null) {
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body scroll
            document.body.style.overflow = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [openModal]);

    const handleTabClick = (tab: TabId) => {
        setCurrentTab(tab);

        if (tab === 'home') {
            setOpenModal(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (tab === 'orders') {
            setOpenModal('orders');
        } else if (tab === 'search') {
            setOpenModal(null);
            // Focus on search input
            const searchInput = document.getElementById('search-input-mobile') as HTMLInputElement;
            searchInput?.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (tab === 'account') {
            if (!user) {
                setOpenModal(null);
                openLogin();
            } else {
                setOpenModal('account');
            }
        }
    };

    const closeModal = () => setOpenModal(null);

    const tabs = [
        { id: 'home' as TabId, icon: Home, label: 'Inicio', isLink: false },
        { id: 'orders' as TabId, icon: Package, label: 'Pedidos', isLink: false },
        { id: 'search' as TabId, icon: Search, label: 'Buscar', isLink: false },
        { id: 'worker' as TabId, icon: Bike, label: 'Trabajar', isLink: true, href: '/worker' },
        { id: 'account' as TabId, icon: User, label: 'Cuenta', isLink: false },
    ];

    return (
        <>
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-[100]">
                <div className="flex items-center justify-around h-16">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = currentTab === tab.id;

                        if (tab.isLink && tab.href) {
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-500'
                                        }`}
                                    onClick={() => {
                                        setCurrentTab(tab.id);
                                        setOpenModal(null);
                                    }}
                                >
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="mb-1" />
                                    <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                                        {tab.label}
                                    </span>
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-[var(--rappi-orange)]' : 'text-gray-500'
                                    }`}
                                aria-label={tab.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="mb-1" />
                                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                                    {tab.label}
                                </span>
                                {isActive && (
                                    <div className="absolute bottom-0 w-12 h-1 bg-[var(--rappi-orange)] rounded-t-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Orders Modal */}
            {openModal === 'orders' && (
                <div className="fixed inset-0 bg-black/60 z-[90] md:hidden" onClick={closeModal}>
                    <div className="fixed inset-x-0 bottom-16 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Mis Pedidos</h2>
                            <button onClick={closeModal} className="text-gray-500 text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">✕</button>
                        </div>

                        {items.length > 0 ? (
                            <div className="space-y-4">
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                    <p className="text-emerald-900 font-semibold">🛒 Carrito actual</p>
                                    <p className="text-sm text-emerald-700 mt-1">{items.length} items en tu carrito</p>
                                    <p className="text-xs text-emerald-600 mt-2">Haz click en el carrito para ver detalles</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6 text-center">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-500">No tienes pedidos anteriores</p>
                                    <p className="text-sm text-gray-400 mt-1">Tus pedidos aparecerán aquí</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-xl p-8 text-center">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-600 font-semibold">No tienes pedidos</p>
                                <p className="text-sm text-gray-400 mt-2">Comienza explorando los restaurantes</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Account Modal */}
            {openModal === 'account' && user && (
                <div className="fixed inset-0 bg-black/60 z-[90] md:hidden" onClick={closeModal}>
                    <div className="fixed inset-x-0 bottom-16 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Mi Cuenta</h2>
                            <button onClick={closeModal} className="text-gray-500 text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">✕</button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl p-5 text-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{user.name}</p>
                                        <p className="text-sm text-orange-100">{user.studentId}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-gray-900">📍 Direcciones guardadas</p>
                                    <p className="text-sm text-gray-500">Gestiona tus ubicaciones</p>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-gray-900">💳 Métodos de pago</p>
                                    <p className="text-sm text-gray-500">Tarjetas y opciones</p>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-gray-900">⚙️ Configuración</p>
                                    <p className="text-sm text-gray-500">Preferencias y privacidad</p>
                                </button>
                                <button
                                    onClick={() => {
                                        useAuthStore.getState().logout();
                                        closeModal();
                                    }}
                                    className="w-full text-left px-4 py-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                                >
                                    <p className="font-semibold text-red-600">🚪 Cerrar sesión</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
