export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface RestaurantMenu {
    restaurantId: string;
    items: MenuItem[];
}

export const restaurantMenus: RestaurantMenu[] = [
    {
        restaurantId: '1', // Tacos Don Pepe
        items: [
            {
                id: '1-1',
                name: 'Tacos de Pastor',
                description: 'Tres tacos con carne de pastor, piña, cilantro y cebolla',
                price: 65,
                imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80',
                category: 'Tacos',
            },
            {
                id: '1-2',
                name: 'Tacos de Asada',
                description: 'Tres tacos de carne asada con guacamole',
                price: 70,
                imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
                category: 'Tacos',
            },
            {
                id: '1-3',
                name: 'Quesadilla Grande',
                description: 'Quesadilla de queso Oaxaca con carne a elegir',
                price: 80,
                imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
                category: 'Antojitos',
            },
            {
                id: '1-4',
                name: 'Gringas',
                description: 'Dos gringas con queso y carne de pastor',
                price: 75,
                imageUrl: 'https://images.unsplash.com/photo-1599974508194-c7f5f7f29e6b?w=400&q=80',
                category: 'Antojitos',
            },
        ],
    },
    {
        restaurantId: '2', // Sushi Paradise
        items: [
            {
                id: '2-1',
                name: 'Rollo California',
                description: '8 piezas de rollo California con cangrejo y aguacate',
                price: 120,
                imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80',
                category: 'Rollos',
            },
            {
                id: '2-2',
                name: 'Rollo Philadelphia',
                description: '8 piezas con salmón, queso crema y pepino',
                price: 140,
                imageUrl: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400&q=80',
                category: 'Rollos',
            },
            {
                id: '2-3',
                name: 'Nigiri Salmón',
                description: '4 piezas de nigiri de salmón fresco',
                price: 100,
                imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80',
                category: 'Nigiri',
            },
            {
                id: '2-4',
                name: 'Combo Sushi',
                description: '16 piezas variadas (rollos y nigiri)',
                price: 220,
                imageUrl: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=400&q=80',
                category: 'Combos',
            },
        ],
    },
    {
        restaurantId: '3', // Pizza Napoli
        items: [
            {
                id: '3-1',
                name: 'Pizza Margarita',
                description: 'Pizza clásica con tomate, mozzarella y albahaca',
                price: 140,
                imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
                category: 'Pizzas',
            },
            {
                id: '3-2',
                name: 'Pizza Pepperoni',
                description: 'Pizza con extra pepperoni y queso mozzarella',
                price: 160,
                imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
                category: 'Pizzas',
            },
            {
                id: '3-3',
                name: 'Pizza Hawaiana',
                description: 'Jamón, piña y queso mozzarella',
                price: 150,
                imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
                category: 'Pizzas',
            },
            {
                id: '3-4',
                name: 'Calzone',
                description: 'Pizza doblada rellena de jamón, queso y champiñones',
                price: 130,
                imageUrl: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=400&q=80',
                category: 'Especialidades',
            },
        ],
    },
    {
        restaurantId: '4', // Burger House
        items: [
            {
                id: '4-1',
                name: 'Classic Burger',
                description: 'Hamburguesa con carne, lechuga, tomate y queso',
                price: 95,
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
                category: 'Hamburguesas',
            },
            {
                id: '4-2',
                name: 'Bacon Cheese Burger',
                description: 'Doble carne, tocino, queso cheddar y salsa especial',
                price: 125,
                imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80',
                category: 'Hamburguesas',
            },
            {
                id: '4-3',
                name: 'Papas Francesas',
                description: 'Porción grande de papas crujientes',
                price: 45,
                imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
                category: 'Complementos',
            },
            {
                id: '4-4',
                name: 'Alitas BBQ',
                description: '8 piezas de alitas bañadas en salsa BBQ',
                price: 110,
                imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80',
                category: 'Complementos',
            },
        ],
    },
    {
        restaurantId: '5', // Ensaladas Express
        items: [
            {
                id: '5-1',
                name: 'Ensalada César',
                description: 'Lechuga romana, crutones, parmesano y pollo',
                price: 85,
                imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80',
                category: 'Ensaladas',
            },
            {
                id: '5-2',
                name: 'Ensalada Griega',
                description: 'Tomate, pepino, aceitunas, queso feta',
                price: 80,
                imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
                category: 'Ensaladas',
            },
            {
                id: '5-3',
                name: 'Bowl Protein',
                description: 'Quinoa, pollo, aguacate y vegetales',
                price: 110,
                imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
                category: 'Bowls',
            },
            {
                id: '5-4',
                name: 'Smoothie Verde',
                description: 'Espinaca, manzana, plátano y miel',
                price: 60,
                imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&q=80',
                category: 'Bebidas',
            },
        ],
    },
    {
        restaurantId: '6', // Chilaquiles
        items: [
            {
                id: '6-1',
                name: 'Chilaquiles Verdes',
                description: 'Chilaquiles con salsa verde, pollo, crema y queso',
                price: 75,
                imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&q=80',
                category: 'Chilaquiles',
            },
            {
                id: '6-2',
                name: 'Chilaquiles Rojos',
                description: 'Chilaquiles con salsa roja, huevo y frijoles',
                price: 70,
                imageUrl: 'https://images.unsplash.com/photo-1599038944680-39ac7e8d8980?w=400&q=80',
                category: 'Chilaquiles',
            },
            {
                id: '6-3',
                name: 'Huevos Rancheros',
                description: 'Huevos estrellados con salsa ranchera y frijoles',
                price: 65,
                imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80',
                category: 'Desayunos',
            },
            {
                id: '6-4',
                name: 'Molletes',
                description: 'Dos molletes con frijoles, queso y pico de gallo',
                price: 55,
                imageUrl: 'https://images.unsplash.com/photo-1619158401579-511e33e9a569?w=400&q=80',
                category: 'Desayunos',
            },
        ],
    },
    {
        restaurantId: '7', // Café Aroma
        items: [
            {
                id: '7-1',
                name: 'Café Latte',
                description: 'Espresso con leche vaporizada',
                price: 50,
                imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
                category: 'Café',
            },
            {
                id: '7-2',
                name: 'Capuchino',
                description: 'Espresso con leche y espuma',
                price: 55,
                imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80',
                category: 'Café',
            },
            {
                id: '7-3',
                name: 'Cheesecake',
                description: 'Rebanada de cheesecake de frutos rojos',
                price: 70,
                imageUrl: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&q=80',
                category: 'Postres',
            },
            {
                id: '7-4',
                name: 'Brownie',
                description: 'Brownie de chocolate con helado de vainilla',
                price: 65,
                imageUrl: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&q=80',
                category: 'Postres',
            },
        ],
    },
    {
        restaurantId: '8', // Ramen Tokyo
        items: [
            {
                id: '8-1',
                name: 'Ramen Shoyu',
                description: 'Ramen con caldo de soya, cerdo, huevo y vegetales',
                price: 130,
                imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
                category: 'Ramen',
            },
            {
                id: '8-2',
                name: 'Ramen Miso',
                description: 'Ramen con caldo de miso, cerdo y brotes de soya',
                price: 135,
                imageUrl: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&q=80',
                category: 'Ramen',
            },
            {
                id: '8-3',
                name: 'Gyoza',
                description: '6 piezas de dumplings fritos de cerdo',
                price: 75,
                imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80',
                category: 'Entradas',
            },
            {
                id: '8-4',
                name: 'Edamame',
                description: 'Vainas de soya al vapor con sal',
                price: 50,
                imageUrl: 'https://images.unsplash.com/photo-1604329759261-b4eb7cfda836?w=400&q=80',
                category: 'Entradas',
            },
        ],
    },
];
