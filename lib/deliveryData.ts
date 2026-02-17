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
    { name: 'Residencias Lomas Femenina', building: 'Lomas F', type: 'dorm' },
    { name: 'Residencias Lomas Masculina', building: 'Lomas M', type: 'dorm' },
    { name: 'Residencias Campus', building: 'Campus', type: 'dorm' },

    // Academic buildings
    { name: 'CETEC (Ingenierías)', building: 'CETEC', type: 'building' },
    { name: 'CTAI (Tecnologías)', building: 'CTAI', type: 'building' },
    { name: 'Edificio Ignacio (Negocios)', building: 'Ignacio', type: 'building' },
    { name: 'Edificio de Humanidades', building: 'Humanidades', type: 'building' },
    { name: 'Edificio de Salud', building: 'Salud', type: 'building' },

    // Other
    { name: 'Biblioteca José Sánchez Villaseñor', building: 'Biblioteca', type: 'building' },
    { name: 'Gimnasio / Deportivo', building: 'Deportivo', type: 'sports' },
    { name: 'Cancha de Fútbol', building: 'Canchas', type: 'sports' },
    { name: 'Cafetería Madero', building: 'Cafetería', type: 'cafeteria' },
];

// Sample available delivery orders
export const mockDeliveryOrders: DeliveryOrder[] = [
    {
        id: 'ORD-001',
        restaurantName: 'Casa Rosa',
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
        restaurantName: 'Cafeteria Cadis',
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
        restaurantName: 'B de Bueno',
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
        restaurantName: 'Sushi Sensei',
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
        restaurantName: 'Subway',
        restaurantLocation: 'Cafetería - Food Court',
        customerName: 'Sofía Torres',
        deliveryLocation: { name: 'Centro Deportivo', building: 'Deportivo-Lobby', type: 'sports' },
        orderItems: ['Sub Italiano', 'Café Americano'],
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
