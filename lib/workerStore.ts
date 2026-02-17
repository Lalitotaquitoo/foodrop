import { create } from 'zustand';
import { DeliveryOrder, mockDeliveryOrders, calculateEarnings } from './deliveryData';
import { StudentSchedule, sampleSchedule, eveningTestSchedule, isAvailableNow } from './scheduleData';

export interface WorkerState {
    // Worker mode
    isWorkerMode: boolean;
    isOnline: boolean;

    // Delivery state
    currentDelivery: DeliveryOrder | null;
    availableOrders: DeliveryOrder[];
    completedDeliveries: DeliveryOrder[];

    // Schedule
    schedule: StudentSchedule;

    // Earnings
    todayEarnings: number;
    totalDeliveries: number;
}

export interface WorkerActions {
    // Mode management
    toggleWorkerMode: () => void;
    toggleOnlineStatus: () => void;

    // Delivery actions
    acceptDelivery: (orderId: string) => void;
    markAsPickedUp: () => void;
    markAsDelivered: () => void;
    declineDelivery: (orderId: string) => void;

    // Availability check
    isAvailableNow: () => boolean;

    // Reset
    resetWorkerState: () => void;
}

export type WorkerStore = WorkerState & WorkerActions;

export const useWorkerStore = create<WorkerStore>((set, get) => ({
    // Initial state
    isWorkerMode: false,
    isOnline: false,
    currentDelivery: null,
    availableOrders: mockDeliveryOrders,
    completedDeliveries: [],
    schedule: eveningTestSchedule, // Using evening schedule for testing (has classes 19:00-21:00 and 21:00-23:00)
    todayEarnings: 0,
    totalDeliveries: 0,

    // Toggle worker mode
    toggleWorkerMode: () => set((state) => ({
        isWorkerMode: !state.isWorkerMode,
        // Auto turn off online if switching off worker mode
        isOnline: !state.isWorkerMode ? false : state.isOnline,
    })),

    // Toggle online/offline status
    toggleOnlineStatus: () => set((state) => {
        const newOnlineStatus = !state.isOnline;

        // Check if student is available before going online
        if (newOnlineStatus && !isAvailableNow(state.schedule)) {
            // Cannot go online during class - return same state
            console.warn('Cannot go online during class hours');
            return state;
        }

        return { isOnline: newOnlineStatus };
    }),

    // Accept a delivery
    acceptDelivery: (orderId: string) => set((state) => {
        // Check availability
        if (!isAvailableNow(state.schedule)) {
            console.warn('Cannot accept delivery during class hours');
            return state;
        }

        const order = state.availableOrders.find(o => o.id === orderId);
        if (!order) return state;

        // Update order status
        const updatedOrder = { ...order, status: 'accepted' as const };

        return {
            currentDelivery: updatedOrder,
            availableOrders: state.availableOrders.filter(o => o.id !== orderId),
            isOnline: false, // Go offline when accepting delivery
        };
    }),

    // Mark current delivery as picked up
    markAsPickedUp: () => set((state) => {
        if (!state.currentDelivery) return state;

        return {
            currentDelivery: {
                ...state.currentDelivery,
                status: 'picked_up',
            },
        };
    }),

    // Mark current delivery as delivered and complete it
    markAsDelivered: () => set((state) => {
        if (!state.currentDelivery) return state;

        const completedOrder = {
            ...state.currentDelivery,
            status: 'delivered' as const,
        };

        const earnings = calculateEarnings(completedOrder);

        return {
            currentDelivery: null,
            completedDeliveries: [...state.completedDeliveries, completedOrder],
            todayEarnings: state.todayEarnings + earnings,
            totalDeliveries: state.totalDeliveries + 1,
            // Worker stays online to receive more orders
        };
    }),

    // Decline a delivery
    declineDelivery: (orderId: string) => set((state) => ({
        availableOrders: state.availableOrders.filter(o => o.id !== orderId),
    })),

    // Check if available now
    isAvailableNow: () => {
        const state = get();
        return isAvailableNow(state.schedule);
    },

    // Reset worker state (for testing)
    resetWorkerState: () => set({
        isWorkerMode: false,
        isOnline: false,
        currentDelivery: null,
        availableOrders: mockDeliveryOrders,
        completedDeliveries: [],
        todayEarnings: 0,
        totalDeliveries: 0,
    }),
}));
