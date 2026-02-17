import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    studentId: string;
}

interface AuthStore {
    user: User | null;
    isLoginOpen: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    openLogin: () => void;
    closeLogin: () => void;
}

// Mock users para demo
const mockUsers = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan.perez@anahuac.mx',
        password: '123456',
        studentId: 'A20001234',
    },
    {
        id: '2',
        name: 'María González',
        email: 'maria.gonzalez@anahuac.mx',
        password: '123456',
        studentId: 'A20001235',
    },
];

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoginOpen: false,

    login: (email: string, password: string) => {
        const user = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            set({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    studentId: user.studentId,
                },
                isLoginOpen: false,
            });
            return true;
        }
        return false;
    },

    logout: () => set({ user: null }),

    openLogin: () => set({ isLoginOpen: true }),

    closeLogin: () => set({ isLoginOpen: false }),
}));
