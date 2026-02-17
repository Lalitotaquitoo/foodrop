'use client';

import { useState, useEffect } from 'react';
import { Bike, Clock, DollarSign, Calendar, Book, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useWorkerStore } from '@/lib/workerStore';
import { useAuthStore } from '@/lib/authStore';
import { getCurrentClass, getTodayClasses, getNextAvailableTime, formatTime } from '@/lib/scheduleData';
import { DeliveryCard } from '@/components/DeliveryCard';
import { ActiveDelivery } from '@/components/ActiveDelivery';
import { ScheduleTimeline } from '@/components/ScheduleTimeline';
import { LoginModal } from '@/components/LoginModal';
import { ConfirmDialog } from '@/components/ConfirmDialog';

export default function WorkerPage() {
    const { user, openLogin } = useAuthStore();

    const {
        isOnline,
        currentDelivery,
        availableOrders,
        schedule,
        todayEarnings,
        totalDeliveries,
        toggleOnlineStatus,
        isAvailableNow: checkAvailability,
    } = useWorkerStore();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isAvailable, setIsAvailable] = useState(checkAvailability());

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            setIsAvailable(checkAvailability());
        }, 1000);

        return () => clearInterval(timer);
    }, [checkAvailability]);

    const currentClass = getCurrentClass(schedule);
    const todayClasses = getTodayClasses(schedule);
    const nextAvailable = getNextAvailableTime(schedule);
    const [showClassBlockDialog, setShowClassBlockDialog] = useState(false);

    const handleToggleOnline = () => {
        if (!isAvailable && !isOnline) {
            // Show custom dialog instead of alert
            setShowClassBlockDialog(true);
            return;
        }
        toggleOnlineStatus();
    };

    // Show login requirement if not authenticated
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    {/* Login Required Card */}
                    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl p-8 border-2 border-emerald-200">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Bike className="w-11 h-11 text-white" />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 mb-2">FooDrop Delivery</h1>
                            <p className="text-gray-600 font-medium">Modo Trabajador</p>
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-blue-900 text-lg mb-1">Inicio de Sesión Requerido</h3>
                                    <p className="text-blue-800 text-sm font-medium">
                                        Para acceder al modo trabajador necesitas iniciar sesión con tu cuenta de estudiante de Anáhuac Mayab.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={openLogin}
                            className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
                        >
                            Iniciar Sesión
                        </button>

                        <Link
                            href="/"
                            className="mt-4 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Volver a FooDrop
                        </Link>
                    </div>
                </div>

                {/* Login Modal - Uses global auth store */}
                <LoginModal />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            {/* Premium Header with Gradient - Mobile Optimized */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {/* Back to app */}
                        <Link href="/" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm sm:text-base">Volver a FooDrop</span>
                        </Link>

                        {/* Earnings - Mobile Optimized */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-3 border border-white/30 flex-1 sm:flex-none">
                                <p className="text-xs sm:text-sm text-white/80 font-medium">Hoy</p>
                                <p className="text-xl sm:text-3xl font-black text-white">${todayEarnings}</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-3 border border-white/30 flex-1 sm:flex-none">
                                <p className="text-xs sm:text-sm text-white/80 font-medium">Entregas</p>
                                <p className="text-xl sm:text-3xl font-black text-white">{totalDeliveries}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 sm:pb-8">
                {/* Premium Status Card - Mobile Optimized */}
                <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-emerald-100">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                                    <Bike className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-3xl font-black text-gray-900 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                                        FooDrop Delivery
                                    </h1>
                                    <p className="text-sm sm:text-base text-gray-600 font-medium">{user.name} • {user.studentId}</p>
                                </div>
                            </div>

                            {/* Availability Status - Mobile Enhanced */}
                            <div className="mt-4 sm:mt-6">
                                {isAvailable ? (
                                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                                            </div>
                                            <div>
                                                <span className="text-base sm:text-xl font-black text-white">Disponible para trabajar</span>
                                                <p className="text-emerald-100 text-xs sm:text-sm">¡Listo para recibir pedidos!</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg mb-2 sm:mb-3">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                    <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
                                                </div>
                                                <div>
                                                    <span className="text-base sm:text-xl font-black text-white">En clase ahora</span>
                                                    <p className="text-red-100 text-xs sm:text-sm">No puedes trabajar en este momento</p>
                                                </div>
                                            </div>
                                        </div>
                                        {currentClass && (
                                            <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                                                <p className="font-bold text-red-900 text-sm sm:text-lg">{currentClass.courseName}</p>
                                                <p className="text-xs sm:text-sm text-red-700 mt-1">
                                                    📍 {currentClass.classroom} • ⏰ Termina a las {formatTime(currentClass.endTime)}
                                                </p>
                                            </div>
                                        )}
                                        {nextAvailable && (
                                            <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3 bg-blue-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-blue-200">
                                                <strong className="text-blue-700">Próxima disponibilidad:</strong> {nextAvailable.day} a las {nextAvailable.time}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Premium Online/Offline Toggle - Mobile Optimized */}
                        <div className="text-center sm:ml-8">
                            <button
                                onClick={handleToggleOnline}
                                disabled={!isAvailable && !isOnline}
                                className={`w-full sm:w-auto relative px-8 py-4 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-2xl transition-all transform active:scale-95 sm:hover:scale-105 ${isOnline
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-300'
                                    : isAvailable
                                        ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                    }`}
                            >
                                {isOnline ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                                        En Línea
                                    </span>
                                ) : (
                                    'Fuera de Línea'
                                )}
                            </button>
                            <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 font-semibold">
                                {isOnline ? '🟢 Recibiendo pedidos' : '⚫ No estás recibiendo pedidos'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Schedule Timeline - Mobile Optimized */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Mi Horario de Hoy</h2>
                    </div>
                    <ScheduleTimeline classes={todayClasses} currentTime={currentTime} />
                </div>

                {/* Active Delivery */}
                {currentDelivery && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Bike className="w-6 h-6 text-emerald-600" />
                            Entrega Activa
                        </h2>
                        <ActiveDelivery delivery={currentDelivery} />
                    </div>
                )}

                {/* Available Orders */}
                {!currentDelivery && isOnline && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Pedidos Disponibles ({availableOrders.length})
                        </h2>
                        {availableOrders.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {availableOrders.map((order) => (
                                    <DeliveryCard key={order.id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No hay pedidos disponibles en este momento</p>
                                <p className="text-gray-400 text-sm mt-2">Te notificaremos cuando haya nuevas entregas</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Info when offline */}
                {!currentDelivery && !isOnline && isAvailable && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                        <Bike className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-blue-900 mb-2">¿Listo para trabajar?</h3>
                        <p className="text-blue-700 mb-4">Activa el modo "En Línea" para empezar a recibir pedidos</p>
                        <button
                            onClick={handleToggleOnline}
                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold"
                        >
                            Ponerme en Línea
                        </button>
                    </div>
                )}
            </main>

            {/* Class Block Dialog */}
            <ConfirmDialog
                isOpen={showClassBlockDialog}
                onClose={() => setShowClassBlockDialog(false)}
                onConfirm={() => setShowClassBlockDialog(false)}
                title="⛔ No Disponible - En Clase"
                message={currentClass
                    ? `Estás en clase de "${currentClass.courseName}" hasta las ${formatTime(currentClass.endTime)}. Podrás trabajar después de que termine tu clase.`
                    : "No puedes trabajar durante tu horario escolar. Consulta tu horario para ver cuándo estarás disponible."
                }
                confirmText="Entendido"
                cancelText=""
                type="warning"
            />
        </div>
    );
}
