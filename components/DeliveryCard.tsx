'use client';

import React, { useState } from 'react';
import { MapPin, DollarSign, Clock, Package, TrendingUp } from 'lucide-react';
import { DeliveryOrder, formatDistance, getEstimatedDeliveryTime, calculateEarnings } from '@/lib/deliveryData';
import { useWorkerStore } from '@/lib/workerStore';
import { ConfirmDialog } from './ConfirmDialog';

interface DeliveryCardProps {
    order: DeliveryOrder;
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({ order }) => {
    const { acceptDelivery, declineDelivery } = useWorkerStore();
    const earnings = calculateEarnings(order);
    const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);

    const handleAccept = () => {
        acceptDelivery(order.id);
    };

    const handleDecline = () => {
        declineDelivery(order.id);
    };

    return (
        <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-emerald-100 hover:border-emerald-300 transform hover:-translate-y-1">
            {/* Header - Restaurant with Gradient */}
            <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-1">{order.restaurantName}</h3>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {order.restaurantLocation}
                    </p>
                </div>
                <div className="text-right bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl px-5 py-3 shadow-md">
                    <p className="text-xs text-emerald-100 font-semibold">Ganarás</p>
                    <p className="text-3xl font-black text-white">+${earnings}</p>
                    <p className="text-xs text-emerald-100">MXN</p>
                </div>
            </div>

            {/* Delivery Details with Icons */}
            <div className="space-y-3 mb-5">
                {/* Customer */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Cliente</p>
                        <p className="font-bold text-gray-900">{order.customerName}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-center gap-3 bg-emerald-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">Entregar en</p>
                        <p className="font-bold text-gray-900">{order.deliveryLocation.name}</p>
                        <p className="text-xs text-gray-600">{order.deliveryLocation.building}</p>
                    </div>
                </div>

                {/* Time & Distance */}
                <div className="flex gap-3">
                    <div className="flex-1 bg-purple-50 rounded-xl p-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Tiempo</p>
                            <p className="font-bold text-gray-900">{getEstimatedDeliveryTime(order)}</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-yellow-50 rounded-xl p-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-yellow-600" />
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Distancia</p>
                            <p className="font-bold text-gray-900">{formatDistance(order.distance)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-4 mb-5 shadow-sm">
                <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wide">Artículos del pedido:</p>
                <ul className="text-sm text-gray-800 space-y-2">
                    {order.orderItems.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                            <span className="text-emerald-500 font-bold mr-2">→</span>
                            <span className="font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-bold text-gray-900">
                        Total del pedido: <span className="text-emerald-600">${order.totalAmount} MXN</span>
                    </p>
                </div>
            </div>

            {/* Actions with Premium Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={() => setShowDeclineConfirm(true)}
                    className="flex-1 px-5 py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95"
                >
                    Rechazar
                </button>
                <button
                    onClick={handleAccept}
                    className="flex-1 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                    ✓ Aceptar
                </button>
            </div>

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeclineConfirm}
                onClose={() => setShowDeclineConfirm(false)}
                onConfirm={handleDecline}
                title="¿Rechazar pedido?"
                message="¿Estás seguro que quieres rechazar este pedido? Se ofrecerá a otro trabajador."
                confirmText="Sí, Rechazar"
                cancelText="Cancelar"
                type="danger"
            />
        </div>
    );
};

