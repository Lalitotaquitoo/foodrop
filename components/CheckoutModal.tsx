'use client';

import React, { useState } from 'react';
import { X, CreditCard, MapPin, Clock, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useAuthStore } from '@/lib/authStore';
import { Button } from './ui/Button';

export const CheckoutModal: React.FC = () => {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const totalPrice = getTotalPrice();
    const deliveryFee = 20;
    const finalTotal = totalPrice + deliveryFee;

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setStep('details');
        setDeliveryLocation('');
        setDeliveryTime('');
        setPaymentMethod('');
    };

    const handleContinueToPayment = () => {
        if (deliveryLocation && deliveryTime) {
            setStep('payment');
        }
    };

    const handlePlaceOrder = () => {
        if (paymentMethod) {
            setStep('success');
            setTimeout(() => {
                clearCart();
                handleClose();
            }, 3000);
        }
    };

    // This component is called from CartSidebar
    React.useEffect(() => {
        const handleCheckoutOpen = () => setIsOpen(true);
        window.addEventListener('open-checkout', handleCheckoutOpen);
        return () => window.removeEventListener('open-checkout', handleCheckoutOpen);
    }, []);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 z-50 transition-opacity"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
                {step === 'success' ? (
                    // Success State
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ¡Pedido Confirmado!
                        </h2>
                        <p className="text-lg text-gray-600 mb-2">
                            Tu pedido ha sido enviado a la cocina
                        </p>
                        <p className="text-sm text-gray-700 mb-8">
                            Tiempo estimado de entrega: {deliveryTime}
                        </p>
                        <div className="bg-[var(--rappi-gray)] rounded-lg p-4 inline-block">
                            <p className="text-sm text-gray-600 mb-1">Ubicación de entrega</p>
                            <p className="font-semibold text-gray-900">{deliveryLocation}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {step === 'details' ? 'Detalles de Entrega' : 'Método de Pago'}
                                </h2>
                                <p className="text-base text-gray-700 mt-1 font-medium">
                                    {user?.name} • {user?.studentId}
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-900" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {step === 'details' && (
                                <div className="space-y-6">
                                    {/* Delivery Location */}
                                    <div>
                                        <label className="flex items-center gap-2 text-base font-bold text-gray-900 mb-3">
                                            <MapPin className="w-5 h-5 text-[var(--rappi-orange)]" />
                                            Ubicación de entrega en campus
                                        </label>
                                        <select
                                            value={deliveryLocation}
                                            onChange={(e) => setDeliveryLocation(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rappi-orange)] text-base font-medium text-gray-900"
                                            style={{ color: deliveryLocation ? '#111827' : '#6B7280' }}
                                            required
                                        >
                                            <option value="" style={{ color: '#6B7280' }}>📍 Selecciona una ubicación</option>
                                            <option value="CETEC(INGENIERIAS)" style={{ color: '#111827' }}>CETEC</option>
                                            <option value="CTAI(TECNOLOGICO)" style={{ color: '#111827' }}>CTAI</option>
                                            <option value="EDIFICIO INGNACIO" style={{ color: '#111827' }}>NEGOCIOS</option>
                                            <option value="Biblioteca Central" style={{ color: '#111827' }}>Biblioteca Central</option>
                                            <option value="Central" style={{ color: '#111827' }}>Central</option>
                                            <option value="Cafetería Principal" style={{ color: '#111827' }}>Cafetería Principal</option>
                                        </select>
                                    </div>

                                    {/* Delivery Time */}
                                    <div>
                                        <label className="flex items-center gap-2 text-base font-bold text-gray-900 mb-3">
                                            <Clock className="w-5 h-5 text-[var(--rappi-orange)]" />
                                            Horario de entrega preferido
                                        </label>
                                        <select
                                            value={deliveryTime}
                                            onChange={(e) => setDeliveryTime(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rappi-orange)] text-base font-medium text-gray-900"
                                            style={{ color: deliveryTime ? '#111827' : '#6B7280' }}
                                            required
                                        >
                                            <option value="" style={{ color: '#6B7280' }}>⏰ Selecciona un horario</option>
                                            <option value="Lo antes posible (20-30 min)" style={{ color: '#111827' }}>Lo antes posible (20-30 min)</option>
                                            <option value="12:00 PM - 12:30 PM" style={{ color: '#111827' }}>12:00 PM - 12:30 PM</option>
                                            <option value="1:00 PM - 1:30 PM" style={{ color: '#111827' }}>1:00 PM - 1:30 PM</option>
                                            <option value="2:00 PM - 2:30 PM" style={{ color: '#111827' }}>2:00 PM - 2:30 PM</option>
                                            <option value="3:00 PM - 3:30 PM" style={{ color: '#111827' }}>3:00 PM - 3:30 PM</option>
                                        </select>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-bold text-lg text-gray-900 mb-3">Resumen del pedido</h3>
                                        <div className="space-y-2 text-base">
                                            <div className="flex justify-between">
                                                <span className="text-gray-900 font-semibold">Subtotal</span>
                                                <span className="font-bold text-gray-900">${totalPrice} MXN</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-900 font-semibold">Envío</span>
                                                <span className="font-bold text-gray-900">${deliveryFee} MXN</span>
                                            </div>
                                            <div className="border-t pt-2 flex justify-between text-xl">
                                                <span className="font-bold text-gray-900">Total</span>
                                                <span className="font-bold text-[var(--rappi-orange)]">${finalTotal} MXN</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'payment' && (
                                <div className="space-y-6">
                                    {/* Payment Methods */}
                                    <div>
                                        <label className="flex items-center gap-2 text-base font-bold text-gray-900 mb-3">
                                            <CreditCard className="w-5 h-5 text-[var(--rappi-orange)]" />
                                            Método de pago
                                        </label>
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => setPaymentMethod('tarjeta')}
                                                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${paymentMethod === 'tarjeta'
                                                    ? 'border-[var(--rappi-orange)] bg-emerald-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold text-lg text-gray-900">💳 Tarjeta de Crédito/Débito</p>
                                                        <p className="text-base text-gray-700 font-medium">Visa, Mastercard, AMEX</p>
                                                    </div>
                                                    {paymentMethod === 'tarjeta' && (
                                                        <Check className="w-5 h-5 text-[var(--rappi-orange)]" />
                                                    )}
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setPaymentMethod('efectivo')}
                                                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${paymentMethod === 'efectivo'
                                                    ? 'border-[var(--rappi-orange)] bg-emerald-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold text-lg text-gray-900">💵 Efectivo</p>
                                                        <p className="text-base text-gray-700 font-medium">Paga al recibir</p>
                                                    </div>
                                                    {paymentMethod === 'efectivo' && (
                                                        <Check className="w-5 h-5 text-[var(--rappi-orange)]" />
                                                    )}
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setPaymentMethod('saldo')}
                                                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${paymentMethod === 'saldo'
                                                    ? 'border-[var(--rappi-orange)] bg-emerald-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold text-lg text-gray-900">🎓 Saldo Universitario</p>
                                                        <p className="text-base text-gray-700 font-medium">Cuenta Anáhuac</p>
                                                    </div>
                                                    {paymentMethod === 'saldo' && (
                                                        <Check className="w-5 h-5 text-[var(--rappi-orange)]" />
                                                    )}
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-900">Total a pagar</span>
                                            <span className="text-2xl font-bold text-[var(--rappi-orange)]">${finalTotal} MXN</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t bg-gray-50">
                            {step === 'details' ? (
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    onClick={handleContinueToPayment}
                                    disabled={!deliveryLocation || !deliveryTime}
                                >
                                    Continuar al pago
                                </Button>
                            ) : (
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="flex-1"
                                        onClick={() => setStep('details')}
                                    >
                                        Volver
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="flex-1"
                                        onClick={handlePlaceOrder}
                                        disabled={!paymentMethod}
                                    >
                                        Confirmar Pedido
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

// Export function to open checkout
export const openCheckout = () => {
    window.dispatchEvent(new Event('open-checkout'));
};
