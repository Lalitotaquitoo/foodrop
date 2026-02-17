'use client';

import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'success' | 'danger' | 'warning';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'success',
}) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const getColorClasses = () => {
        switch (type) {
            case 'success':
                return {
                    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
                    icon: <CheckCircle className="w-8 h-8 text-white" />,
                    confirmBtn: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
                };
            case 'danger':
                return {
                    iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
                    icon: <XCircle className="w-8 h-8 text-white" />,
                    confirmBtn: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
                };
            case 'warning':
                return {
                    iconBg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
                    icon: <AlertCircle className="w-8 h-8 text-white" />,
                    confirmBtn: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
                };
        }
    };

    const colors = getColorClasses();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-md w-full p-8 transform animate-slideUp border-2 border-gray-200">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${colors.iconBg}`}>
                        {colors.icon}
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-black text-gray-900 text-center mb-3">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-700 text-center mb-8 font-medium">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`flex-1 px-6 py-3.5 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${colors.confirmBtn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
