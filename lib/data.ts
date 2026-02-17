export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    deliveryTime: string;
    deliveryCost: number;
    imageUrl: string;
    tags: string[];
    priceRange: string;
    cuisine: string;
}

export const categories: Category[] = [
    {
        id: '1',
        name: 'Restaurantes',
        icon: '🍔',
        color: '#FF441F',
    },
    {
        id: '2',
        name: 'Super',
        icon: '🛒',
        color: '#00A650',
    },
    {
        id: '3',
        name: 'Farmacia',
        icon: '💊',
        color: '#00B5E2',
    },
    {
        id: '4',
        name: 'Licores',
        icon: '🍷',
        color: '#8B5CF6',
    },
    {
        id: '5',
        name: 'Mascotas',
        icon: '🐾',
        color: '#F59E0B',
    },
];

export const restaurants: Restaurant[] = [
    {
        id: '1',
        name: 'Casa Rosa',
        rating: 4.8,
        deliveryTime: '20-30',
        deliveryCost: 0,
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
        tags: ['Mexicana', 'Tacos'],
        priceRange: '$$',
        cuisine: 'Mexicana',
    },
    {
        id: '2',
        name: 'Sushi Sensei',
        rating: 4.9,
        deliveryTime: '30-40',
        deliveryCost: 0,
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
        tags: ['Japonesa', 'Sushi'],
        priceRange: '$$$',
        cuisine: 'Japonesa',
    },
    {
        id: '3',
        name: 'B de Bueno',
        rating: 4.7,
        deliveryTime: '15-25',
        deliveryCost: 0,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
        tags: ['Italiana', 'Pizza'],
        priceRange: '$$',
        cuisine: 'Italiana',
    },
    {
        id: '4',
        name: 'Cafeteria Cadis',
        rating: 4.6,
        deliveryTime: '25-35',
        deliveryCost: 15,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
        tags: ['Americana', 'Hamburguesas'],
        priceRange: '$$',
        cuisine: 'Americana',
    },
    {
        id: '5',
        name: 'Capital 64',
        rating: 4.5,
        deliveryTime: '20-30',
        deliveryCost: 0,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        tags: ['Saludable', 'Ensaladas'],
        priceRange: '$',
        cuisine: 'Saludable',
    },
    {
        id: '6',
        name: 'Subway',
        rating: 4.9,
        deliveryTime: '15-20',
        deliveryCost: 0,
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
        tags: ['Sándwich', 'Rápido'],
        priceRange: '$',
        cuisine: 'Americana',
    },
    {
        id: '7',
        name: 'Mid Market',
        rating: 4.8,
        deliveryTime: '10-15',
        deliveryCost: 0,
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
        tags: ['Café', 'Postres'],
        priceRange: '$$',
        cuisine: 'Café',
    },
    {
        id: '8',
        name: 'Starbucks',
        rating: 4.7,
        deliveryTime: '25-35',
        deliveryCost: 20,
        imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
        tags: ['Café', 'Bebidas'],
        priceRange: '$$$',
        cuisine: 'Café',
    },
];
