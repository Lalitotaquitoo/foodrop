'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Package, CheckCircle, Sparkles } from 'lucide-react';
import { DeliveryOrder, calculateEarnings } from '@/lib/deliveryData';
import { useWorkerStore } from '@/lib/workerStore';
import { ConfirmDialog } from './ConfirmDialog';

interface ActiveDeliveryProps {
    delivery: DeliveryOrder;
}

export const ActiveDelivery: React.FC<ActiveDeliveryProps> = ({ delivery }) => {
    const { markAsPickedUp, markAsDelivered } = useWorkerStore();
    const earnings = calculateEarnings(delivery);
    const [showPickupConfirm, setShowPickupConfirm] = useState(false);
    const [showDeliveryConfirm, setShowDeliveryConfirm] = useState(false);

    const handleMarkPickedUp = () => {
        markAsPickedUp();
    };

    const handleMarkDelivered = () => {
        markAsDelivered();
    };

    const isPickedUp = delivery.status === 'picked_up';

    return (
        <div className="bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-3xl shadow-2xl border-3 border-emerald-400 p-8">
            {/* Progress Indicator - Enhanced */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${isPickedUp
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 animate-pulse'
                        : 'bg-gradient-to-br from-purple-400 to-purple-500'
                        }`}>
                        {isPickedUp ? (
                            <CheckCircle className="w-9 h-9 text-white" />
                        ) : (
                            <Package className="w-9 h-9 text-white" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Estado Actual</p>
                        <p className="font-black text-2xl text-gray-900">
                            {isPickedUp ? '🚴 En camino a entregar' : '📦 Listo para recoger'}
                        </p>
                    </div>
                </div>
                <div className="text-right bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl px-8 py-4 shadow-lg">
                    <p className="text-sm text-yellow-900 font-bold flex items-center gap-1 justify-end">
                        <Sparkles className="w-4 h-4" />
                        Ganancia
                    </p>
                    <p className="text-4xl font-black text-white">+${earnings}</p>
                    <p className="text-sm text-yellow-100 font-semibold">MXN</p>
                </div>
            </div>

            {/* Payment Method Warning - Cash Only */}
            {delivery.paymentMethod === 'cash' && (
                <div className="mb-5 bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-400 rounded-2xl p-5 shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="text-3xl">💵</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-xl text-orange-900 mb-2 flex items-center gap-2">
                                <span>⚠️ PAGO EN EFECTIVO</span>
                            </h3>
                            <p className="text-orange-800 font-bold text-sm mb-2">
                                Debes cobrar ${delivery.totalAmount} MXN al cliente
                            </p>
                            <ul className="text-orange-700 text-sm space-y-1 font-medium">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">→</span>
                                    Verifica que el cliente tenga el monto exacto
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">→</span>
                                    Entrégale el cambio si es necesario
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">→</span>
                                    Confirma que recibiste el pago completo antes de marcar como entregado
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Method Info - Card */}
            {delivery.paymentMethod === 'card' && (
                <div className="mb-5 bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-300 rounded-2xl p-4 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💳</span>
                        </div>
                        <div>
                            <p className="font-black text-blue-900 text-lg">Pago con Tarjeta</p>
                            <p className="text-blue-700 text-sm font-semibold">✓ Ya pagado - Solo entregar</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Pickup Location - Premium Card */}
            <div className={`rounded-2xl p-6 mb-5 shadow-lg border-2 ${!isPickedUp
                ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 border-emerald-300'
                : 'bg-gray-50 border-gray-200 opacity-70'
                }`}>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${!isPickedUp ? 'bg-emerald-600' : 'bg-gray-400'
                        }`}>
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">Paso 1:</p>
                        <h3 className="font-black text-lg text-gray-900">Recoger en:</h3>
                    </div>
                    {isPickedUp && (
                        <CheckCircle className="w-6 h-6 text-emerald-600 ml-auto" />
                    )}
                </div>
                <p className="text-xl font-black text-emerald-900">{delivery.restaurantName}</p>
                <p className="text-sm text-emerald-700 font-medium mt-1">📍 {delivery.restaurantLocation}</p>
                {!isPickedUp && (
                    <button
                        onClick={() => setShowPickupConfirm(true)}
                        className="mt-4 w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-black text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                        ✓ Marcar como Recogido
                    </button>
                )}
            </div>

            {/* Delivery Location - Premium Card */}
            <div className={`rounded-2xl p-6 mb-5 shadow-lg border-2 ${isPickedUp
                ? 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300'
                : 'bg-gray-50 border-gray-200'
                }`}>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPickedUp ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">Paso 2:</p>
                        <h3 className={`font-black text-lg ${isPickedUp ? 'text-gray-900' : 'text-gray-500'}`}>
                            Entregar en:
                        </h3>
                    </div>
                </div>
                <p className={`text-xl font-black ${isPickedUp ? 'text-blue-900' : 'text-gray-600'}`}>
                    {delivery.deliveryLocation.name}
                </p>
                <p className={`text-sm font-medium mt-1 ${isPickedUp ? 'text-blue-700' : 'text-gray-500'}`}>
                    🏢 {delivery.deliveryLocation.building}
                </p>
                <div className="flex items-center gap-2 mt-3 bg-white/50 rounded-xl p-3">
                    <Phone className={`w-5 h-5 ${isPickedUp ? 'text-blue-600' : 'text-gray-400'}`} />
                    <p className={`text-sm font-semibold ${isPickedUp ? 'text-blue-800' : 'text-gray-500'}`}>
                        Cliente: <span className="font-black">{delivery.customerName}</span>
                    </p>
                </div>
                {isPickedUp && (
                    <button
                        onClick={() => setShowDeliveryConfirm(true)}
                        className="mt-4 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-black text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                        ✓ Marcar como Entregado
                    </button>
                )}
            </div>

            {/* Order Details - Premium Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-md">
                <h4 className="font-black text-gray-900 mb-3 text-lg flex items-center gap-2">
                    📋 Detalles del Pedido
                </h4>
                <ul className="text-sm text-gray-800 space-y-2 mb-4">
                    {delivery.orderItems.map((item, idx) => (
                        <li key={idx} className="flex items-start bg-gray-50 rounded-lg p-2">
                            <span className="text-emerald-500 font-black mr-2 text-lg">→</span>
                            <span className="font-semibold">{item}</span>
                        </li>
                    ))}
                </ul>
                <div className="border-t-2 border-gray-200 pt-3 space-y-1">
                    <p className="text-sm text-gray-700 font-semibold">
                        Total del pedido: <span className="text-gray-900 font-black">${delivery.totalAmount} MXN</span>
                    </p>
                    <p className="text-sm text-emerald-700 font-semibold">
                        Tu comisión: <span className="text-emerald-600 font-black">${delivery.deliveryFee} MXN</span>
                    </p>
                </div>
            </div>

            {/* Premium Tip */}
            <div className="mt-5 bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 shadow-md">
                <p className="text-sm text-yellow-900 font-semibold flex items-start gap-2">
                    <span className="text-2xl">💡</span>
                    <span><strong className="font-black">Tip:</strong> Verifica el pedido completo antes de salir del restaurante y confirma con el cliente al momento de entregar.</span>
                </p>
            </div>

            {/* Confirmation Dialogs */}
            <ConfirmDialog
                isOpen={showPickupConfirm}
                onClose={() => setShowPickupConfirm(false)}
                onConfirm={handleMarkPickedUp}
                title="¿Pedido recogido?"
                message="¿Confirmas que ya recogiste el pedido del restaurante y estás listo para entregarlo?"
                confirmText="Sí, Recogido"
                cancelText="Cancelar"
                type="success"
            />

            <ConfirmDialog
                isOpen={showDeliveryConfirm}
                onClose={() => setShowDeliveryConfirm(false)}
                onConfirm={handleMarkDelivered}
                title="¿Pedido entregado?"
                message="¿Confirmas que entregaste el pedido al cliente exitosamente?"
                confirmText="Sí, Entregado"
                cancelText="Cancelar"
                type="success"
            />
        </div>
    );
};
