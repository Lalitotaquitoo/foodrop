'use client';

import React from 'react';
import { ClassSlot, formatTime } from '@/lib/scheduleData';

interface ScheduleTimelineProps {
    classes: ClassSlot[];
    currentTime: Date;
}

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({ classes, currentTime }) => {
    if (classes.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 text-lg">🎉 No tienes clases hoy</p>
                <p className="text-gray-400 text-sm mt-2">¡Puedes trabajar todo el día!</p>
            </div>
        );
    }

    const getCurrentTimeString = () => {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const currentTimeStr = getCurrentTimeString();

    // Sort classes by start time
    const sortedClasses = [...classes].sort((a, b) => a.startTime.localeCompare(b.startTime));

    const isCurrentClass = (classSlot: ClassSlot) => {
        const [startH, startM] = classSlot.startTime.split(':').map(Number);
        const [endH, endM] = classSlot.endTime.split(':').map(Number);
        const [currH, currM] = currentTimeStr.split(':').map(Number);

        const startMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;
        const currentMinutes = currH * 60 + currM;

        return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    };

    const isPastClass = (classSlot: ClassSlot) => {
        const [endH, endM] = classSlot.endTime.split(':').map(Number);
        const [currH, currM] = currentTimeStr.split(':').map(Number);

        const endMinutes = endH * 60 + endM;
        const currentMinutes = currH * 60 + currM;

        return currentMinutes >= endMinutes;
    };

    return (
        <div className="space-y-3">
            {sortedClasses.map((classSlot, index) => {
                const isCurrent = isCurrentClass(classSlot);
                const isPast = isPastClass(classSlot);
                const isFuture = !isCurrent && !isPast;

                return (
                    <div
                        key={index}
                        className={`relative rounded-lg p-4 border-2 transition-all ${isCurrent
                                ? 'bg-red-50 border-red-500 shadow-md'
                                : isPast
                                    ? 'bg-gray-50 border-gray-200 opacity-60'
                                    : 'bg-blue-50 border-blue-300'
                            }`}
                    >
                        {/* Status Badge */}
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-bold ${isCurrent
                                                ? 'bg-red-600 text-white'
                                                : isPast
                                                    ? 'bg-gray-400 text-white'
                                                    : 'bg-blue-600 text-white'
                                            }`}
                                    >
                                        {isCurrent ? '🔴 EN CLASE' : isPast ? '✓ Terminada' : '⏰ Próxima'}
                                    </span>
                                    <span className={`text-sm font-bold ${isCurrent ? 'text-red-900' : isPast ? 'text-gray-600' : 'text-blue-900'
                                        }`}>
                                        {formatTime(classSlot.startTime)} - {formatTime(classSlot.endTime)}
                                    </span>
                                </div>
                                <h4 className={`text-lg font-bold ${isCurrent ? 'text-red-900' : isPast ? 'text-gray-700' : 'text-blue-900'
                                    }`}>
                                    {classSlot.courseName}
                                </h4>
                                <p className={`text-sm ${isCurrent ? 'text-red-700' : isPast ? 'text-gray-500' : 'text-blue-700'
                                    }`}>
                                    {classSlot.courseCode}
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className={`text-sm space-y-1 ${isCurrent ? 'text-red-700' : isPast ? 'text-gray-500' : 'text-blue-700'
                            }`}>
                            <p>
                                <strong>Salón:</strong> {classSlot.classroom}
                            </p>
                            <p>
                                <strong>Profesor:</strong> {classSlot.professor}
                            </p>
                        </div>

                        {/* Current indicator line */}
                        {isCurrent && (
                            <div className="mt-3 pt-3 border-t border-red-300">
                                <p className="text-sm text-red-800 font-semibold">
                                    ⚠️ No puedes trabajar durante esta clase
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Current Time Indicator */}
            <div className="text-center py-2 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                    Hora actual: <strong className="text-gray-900">{formatTime(currentTimeStr)}</strong>
                </p>
            </div>
        </div>
    );
};
