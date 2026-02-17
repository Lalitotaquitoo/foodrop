// Delivery order system for campus
export interface DeliveryLocation {
    name: string;
    building: string;
    type: 'dorm' | 'building' | 'cafeteria' | 'sports';
    coordinates?: { lat: number; lng: number };
}

// Payment method type
export type PaymentMethod = 'cash' | 'card';

export interface DeliveryOrder {
    id: string;
    restaurantName: string;
    restaurantLocation: string;
    customerName: string;
    deliveryLocation: DeliveryLocation;
    orderItems: string[];
    totalAmount: number;
    deliveryFee: number;
    estimatedTime: number; // minutes
    distance: number; // meters
    status: 'pending' | 'accepted' | 'picked_up' | 'delivered';
    paymentMethod: PaymentMethod;
    createdAt: Date;
}

// Campus locations
export const campusLocations: DeliveryLocation[] = [
    // Dorms
    { name: 'Residencia Femenina A', building: 'Res-F-A', type: 'dorm' },
    { name: 'Residencia Femenina B', building: 'Res-F-B', type: 'dorm' },
    { name: 'Residencia Masculina A', building: 'Res-M-A', type: 'dorm' },
    { name: 'Residencia Masculina B', building: 'Res-M-B', type: 'dorm' },

    // Academic buildings
    { name: 'Edificio A (Humanidades)', building: 'A', type: 'building' },
    { name: 'Edificio B (Ciencias)', building: 'B', type: 'building' },
    { name: 'Edificio C (Ingenierías)', building: 'C', type: 'building' },
    { name: 'Edificio D (Negocios)', building: 'D', type: 'building' },

    // Other
    { name: 'Biblioteca Central', building: 'Biblioteca', type: 'building' },
    { name: 'Centro Deportivo', building: 'Deportivo', type: 'sports' },
    { name: 'Cafetería Principal', building: 'Cafetería', type: 'cafeteria' },
];

// Sample available delivery orders
export const mockDeliveryOrders: DeliveryOrder[] = [
    {
        id: 'ORD-001',
        restaurantName: 'Tacos Don Pepe',
        restaurantLocation: 'Cafetería - Food Court',
        customerName: 'María González',
        deliveryLocation: { name: 'Residencia Femenina A', building: 'Res-F-A', type: 'dorm' },
        orderItems: ['3x Tacos al Pastor', 'Refresco'],
        totalAmount: 85,
        deliveryFee: 25,
        estimatedTime: 8,
        distance: 450,
        status: 'pending',
        paymentMethod: 'cash',
        createdAt: new Date(),
    },
    {
        id: 'ORD-002',
        restaurantName: 'Burger House',
        restaurantLocation: 'Cafetería - Food Court',
        customerName: 'Carlos Ramírez',
        deliveryLocation: { name: 'Edificio C (Ingenierías)', building: 'C-302', type: 'building' },
        orderItems: ['Hamburguesa Clásica', 'Papas Grandes', 'Malteada'],
        totalAmount: 145,
        deliveryFee: 20,
        estimatedTime: 6,
        distance: 320,
        status: 'pending',
        paymentMethod: 'card',
        createdAt: new Date(),
    },
    {
        id: 'ORD-003',
        restaurantName: 'Pizza Napoli',
        restaurantLocation: 'Cafetería - Food Court',
        customerName: 'Ana Martínez',
        deliveryLocation: { name: 'Biblioteca Central', building: 'Biblioteca-Sala 2', type: 'building' },
        orderItems: ['Pizza Margarita Personal', 'Agua'],
        totalAmount: 95,
        deliveryFee: 15,
        estimatedTime: 7,
        distance: 280,
        status: 'pending',
        paymentMethod: 'cash',
        createdAt: new Date(),
    },
    {
        id: 'ORD-004',
        restaurantName: 'Sushi Paradise',
        restaurantLocation: 'Cafetería - Food Court',
        customerName: 'Luis Hernández',
        deliveryLocation: { name: 'Residencia Masculina B', building: 'Res-M-B', type: 'dorm' },
        orderItems: ['Sushi Roll California', 'Sushi Roll Philadelphia', 'Té Verde'],
        totalAmount: 185,
        deliveryFee: 30,
        estimatedTime: 10,
        distance: 520,
        status: 'pending',
        paymentMethod: 'card',
        createdAt: new Date(),
    },
    {
        id: 'ORD-005',
        restaurantName: 'Chilaquiles',
        restaurantLocation: 'Cafetería - Food Court',
        customerName: 'Sofía Torres',
        deliveryLocation: { name: 'Centro Deportivo', building: 'Deportivo-Lobby', type: 'sports' },
        orderItems: ['Chilaquiles Verdes', 'Café Americano'],
        totalAmount: 75,
        deliveryFee: 20,
        estimatedTime: 8,
        distance: 400,
        status: 'pending',
        paymentMethod: 'cash',
        createdAt: new Date(),
    },
];

// Calculate earnings for a delivery
export function calculateEarnings(order: DeliveryOrder): number {
    return order.deliveryFee;
}

// Format distance for display
export function formatDistance(meters: number): string {
    if (meters < 1000) {
        return `${meters}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
}

// Get delivery time with buffer
export function getEstimatedDeliveryTime(order: DeliveryOrder): string {
    return `${order.estimatedTime} min`;
}
