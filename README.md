# 🍔 FooDrop - Delivery Exclusivo Anáhuac Mayab

Plataforma de delivery de comida diseñada exclusivamente para estudiantes de la Universidad Anáhuac Mayab.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## 🎓 Acerca de FooDrop

FooDrop es una aplicación de delivery creada específicamente para la comunidad estudiantil de la Universidad Anáhuac Mayab. Ordena comida de tus restaurantes favoritos y recíbela directo en tu salón de clases o área favorita del campus.

## 🚀 Características

- ✅ **Diseño Responsive** - Funciona perfecto en móvil, tablet y desktop
- ✅ **Carrito de Compras** - Agrega items, maneja cantidades y procede al pago
- ✅ **Navegación por Categorías** - Carrusel horizontal de categorías
- ✅ **Grid de Restaurantes** - Diseño de cards con ratings e info de entrega
- ✅ **Gestión de Estado** - Zustand para funcionalidad del carrito
- ✅ **Optimización de Imágenes** - Next.js Image component
- ✅ **Animaciones Modernas** - Efectos suaves y transiciones

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Estado**: [Zustand](https://zustand-demo.pmnd.rs/)

## 📦 Instalación

```bash
# Navegar al directorio
cd rappi-clone

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
rappi-clone/
├── app/
│   ├── globals.css       # Estilos globales con colores de marca
│   ├── layout.tsx        # Layout raíz
│   └── page.tsx          # Página principal
├── components/
│   ├── ui/               # Componentes atómicos
│   │   ├── Button.tsx
│   │   └── Badge.tsx
│   ├── Header.tsx        # Header sticky
│   ├── CategoryCarousel.tsx
│   ├── PromoBanner.tsx
│   ├── RestaurantCard.tsx
│   └── CartSidebar.tsx
└── lib/
    ├── data.ts           # Datos mock
    └── store.ts          # Store de Zustand
```

## 🎨 Sistema de Diseño

### Colores de Marca
- **Naranja Principal**: `#FF441F`
- **Verde Secundario**: `#00A650`
- **Durazno**: `#FF8C6B`

### Tokens de Diseño
- Border Radius: `rounded-2xl` para cards, `rounded-full` para botones
- Shadows: `shadow-sm`, `shadow-md`, `shadow-xl`
- Breakpoints responsive mobile-first

## 🧩 Componentes

### Header
Header sticky con barra de búsqueda, ubicación del campus, botón de login y carrito.

### Carrusel de Categorías
Scroll horizontal de categorías: Restaurantes, Super, Farmacia, Licores, Mascotas.

### Cards de Restaurantes
Layout en grid mostrando info de restaurantes, ratings, tiempo de entrega y botón de agregar al carrito.

### Carrito de Compras
Sidebar deslizante con items del carrito, controles de cantidad y checkout.

## 📱 Breakpoints Responsive

- **Móvil**: < 640px (1 columna)
- **Tablet**: 640px - 1024px (2 columnas)
- **Desktop**: > 1024px (3-4 columnas)

## 🚧 Próximos Pasos

- [ ] Integración con API backend
- [ ] Autenticación de estudiantes
- [ ] Funcionalidad de búsqueda
- [ ] Seguimiento de órdenes
- [ ] Integración de pagos
- [ ] Páginas de detalle de productos
- [ ] Sistema de reviews
- [ ] Programa de recompensas para estudiantes

## 📄 Licencia

MIT

## 👨‍💻 Desarrollado para

Universidad Anáhuac Mayab - Servicio exclusivo para estudiantes
