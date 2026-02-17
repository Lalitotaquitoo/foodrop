// Student class schedule system
export interface ClassSlot {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
    startTime: string; // Format: "HH:MM" (24-hour)
    endTime: string;   // Format: "HH:MM" (24-hour)
    courseName: string;
    courseCode: string;
    classroom: string;
    professor: string;
}

export interface StudentSchedule {
    studentId: string;
    studentName: string;
    semester: string;
    major: string;
    classes: ClassSlot[];
}

// Sample student schedule (typical Anáhuac student)
export const sampleSchedule: StudentSchedule = {
    studentId: '00123456',
    studentName: 'Juan Pérez',
    semester: 'Primavera 2026',
    major: 'Ingeniería en Sistemas',
    classes: [
        // Monday
        {
            day: 'Monday',
            startTime: '08:00',
            endTime: '10:00',
            courseName: 'Algoritmos y Estructuras de Datos',
            courseCode: 'ISI-301',
            classroom: 'Edificio C - 204',
            professor: 'Dr. García',
        },
        {
            day: 'Monday',
            startTime: '10:30',
            endTime: '12:30',
            courseName: 'Bases de Datos',
            courseCode: 'ISI-305',
            classroom: 'Edificio C - 301',
            professor: 'Dra. Martínez',
        },
        {
            day: 'Monday',
            startTime: '14:00',
            endTime: '16:00',
            courseName: 'Desarrollo Web',
            courseCode: 'ISI-310',
            classroom: 'Lab Sistemas 1',
            professor: 'Mtro. López',
        },

        // Tuesday
        {
            day: 'Tuesday',
            startTime: '09:00',
            endTime: '11:00',
            courseName: 'Matemáticas Discretas',
            courseCode: 'MAT-220',
            classroom: 'Edificio B - 105',
            professor: 'Dr. Hernández',
        },
        {
            day: 'Tuesday',
            startTime: '13:00',
            endTime: '15:00',
            courseName: 'Estadística',
            courseCode: 'MAT-225',
            classroom: 'Edificio B - 202',
            professor: 'Dra. Sánchez',
        },

        // Wednesday
        {
            day: 'Wednesday',
            startTime: '08:00',
            endTime: '10:00',
            courseName: 'Algoritmos y Estructuras de Datos',
            courseCode: 'ISI-301',
            classroom: 'Edificio C - 204',
            professor: 'Dr. García',
        },
        {
            day: 'Wednesday',
            startTime: '10:30',
            endTime: '12:30',
            courseName: 'Bases de Datos',
            courseCode: 'ISI-305',
            classroom: 'Edificio C - 301',
            professor: 'Dra. Martínez',
        },

        // Thursday
        {
            day: 'Thursday',
            startTime: '09:00',
            endTime: '11:00',
            courseName: 'Matemáticas Discretas',
            courseCode: 'MAT-220',
            classroom: 'Edificio B - 105',
            professor: 'Dr. Hernández',
        },
        {
            day: 'Thursday',
            startTime: '11:30',
            endTime: '13:30',
            courseName: 'Ética Profesional',
            courseCode: 'FIL-100',
            classroom: 'Edificio A - 301',
            professor: 'Mtro. Ramírez',
        },

        // Friday
        {
            day: 'Friday',
            startTime: '08:00',
            endTime: '10:00',
            courseName: 'Desarrollo Web',
            courseCode: 'ISI-310',
            classroom: 'Lab Sistemas 1',
            professor: 'Mtro. López',
        },
    ],
};

// Helper function to get day name from Date object
export function getDayName(date: Date): ClassSlot['day'] | null {
    const days: ClassSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

    if (dayIndex === 0 || dayIndex === 6) {
        // Weekend - no classes
        return null;
    }

    return days[dayIndex - 1];
}

// Get current time in HH:MM format
export function getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Compare two times in HH:MM format
export function isTimeBetween(time: string, start: string, end: string): boolean {
    const [timeH, timeM] = time.split(':').map(Number);
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const timeMinutes = timeH * 60 + timeM;
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return timeMinutes >= startMinutes && timeMinutes < endMinutes;
}

// Get classes for today
export function getTodayClasses(schedule: StudentSchedule): ClassSlot[] {
    const today = getDayName(new Date());
    if (!today) return [];

    return schedule.classes.filter(c => c.day === today);
}

// Get current class if student is in one
export function getCurrentClass(schedule: StudentSchedule): ClassSlot | null {
    const todayClasses = getTodayClasses(schedule);
    const currentTime = getCurrentTime();

    return todayClasses.find(c => isTimeBetween(currentTime, c.startTime, c.endTime)) || null;
}

// Check if student is available to work right now
export function isAvailableNow(schedule: StudentSchedule): boolean {
    return getCurrentClass(schedule) === null;
}

// Get next available time slot
export function getNextAvailableTime(schedule: StudentSchedule): { day: string; time: string } | null {
    const now = new Date();
    const today = getDayName(now);

    if (!today) {
        // Weekend - available all day
        return { day: 'Fin de semana', time: 'Todo el día' };
    }

    const currentClass = getCurrentClass(schedule);

    if (!currentClass) {
        // Not in class now, check when next class starts
        const todayClasses = getTodayClasses(schedule);
        const currentTime = getCurrentTime();

        const nextClass = todayClasses.find(c => c.startTime > currentTime);

        if (nextClass) {
            return { day: 'Hoy', time: `Hasta las ${nextClass.startTime}` };
        } else {
            return { day: 'Hoy', time: 'Resto del día' };
        }
    }

    // Currently in class
    return { day: 'Después de clase', time: currentClass.endTime };
}

// Format time for display (convert 24h to 12h with AM/PM)
export function formatTime(timeStr: string): string {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Test schedule with evening classes (for testing during evening hours)
export const eveningTestSchedule: StudentSchedule = {
    studentName: 'Test User',
    studentId: 'T00000000',
    semester: 'Otoño 2024', // Added missing semester
    major: 'Ingeniería en Sistemas', // Added missing major
    classes: [
        // Monday evening classes
        {
            day: 'Monday',
            startTime: '19:00',
            endTime: '21:00',
            courseName: 'Programación Avanzada',
            courseCode: 'ISI-401',
            classroom: 'C-201',
            professor: 'Dr. Carlos Méndez'
        },
        {
            day: 'Monday',
            startTime: '21:00',
            endTime: '23:00',
            courseName: 'Bases de Datos II',
            courseCode: 'ISI-405',
            classroom: 'C-203',
            professor: 'Dr. Ana Torres'
        },
        // Thursday evening classes
        {
            day: 'Thursday',
            startTime: '19:00',
            endTime: '21:00',
            courseName: 'Inteligencia Artificial',
            courseCode: 'ISI-410',
            classroom: 'C-202',
            professor: 'Dr. Luis García'
        },
        {
            day: 'Thursday',
            startTime: '21:00',
            endTime: '23:00',
            courseName: 'Desarrollo Web',
            courseCode: 'ISI-310',
            classroom: 'C-204',
            professor: 'Prof. María Hernández'
        },
    ]
};
