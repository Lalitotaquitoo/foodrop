'use client';

import React, { useState } from 'react';
import { X, LogIn, GraduationCap } from 'lucide-react';
import { useAuthStore } from '@/lib/authStore';
import { Button } from './ui/Button';

export const LoginModal: React.FC = () => {
    const { isLoginOpen, closeLogin, login } = useAuthStore();
    const [email, setEmail] = useState('juan.perez@anahuac.mx');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');

    if (!isLoginOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const success = login(email, password);
        if (success) {
            setEmail('');
            setPassword('');
        } else {
            setError('Credenciales inválidas. Intenta con: juan.perez@anahuac.mx / 123456');
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 z-50 transition-opacity"
                onClick={closeLogin}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[var(--rappi-orange)] rounded-full flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
                            <p className="text-base text-gray-700 font-medium">FooDrop - Anáhuac Mayab</p>
                        </div>
                    </div>
                    <button
                        onClick={closeLogin}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-900" />
                    </button>
                </div>

                {/* Demo Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800 font-medium mb-2">👤 Cuenta Demo:</p>
                    <p className="text-xs text-blue-700">Email: <strong>juan.perez@anahuac.mx</strong></p>
                    <p className="text-xs text-blue-700">Password: <strong>123456</strong></p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-base font-bold text-gray-900 mb-2">
                            Correo Institucional
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu.nombre@anahuac.mx"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rappi-orange)] transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-base font-bold text-gray-900 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rappi-orange)] transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <Button type="submit" variant="primary" size="lg" className="w-full">
                        <LogIn className="w-5 h-5 mr-2" />
                        Iniciar Sesión
                    </Button>
                </form>
            </div>
        </>
    );
};
