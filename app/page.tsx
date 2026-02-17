'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PromoBanner } from '@/components/PromoBanner';
import { RestaurantCard } from '@/components/RestaurantCard';
import { CartSidebar } from '@/components/CartSidebar';
import { LoginModal } from '@/components/LoginModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { RestaurantMenuModal } from '@/components/RestaurantMenuModal';
import { MobileNav } from '@/components/MobileNav';
import { restaurants, categories, Restaurant } from '@/lib/data';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter restaurants based on search and category
  useEffect(() => {
    let filtered = restaurants;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      const categoryName = categories.find(c => c.id === selectedCategory)?.name.toLowerCase();
      if (categoryName) {
        // Simple category mapping
        if (categoryName.includes('restaurante')) {
          filtered = filtered; // Show all restaurants
        } else {
          // For demo purposes, just filter randomly
          filtered = filtered.filter((_, index) => index % 2 === 0);
        }
      }
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCategory]);

  // Listen for search input changes
  useEffect(() => {
    const handleSearch = (e: Event) => {
      const target = e.target as HTMLInputElement;
      setSearchQuery(target.value);
    };

    const desktopSearch = document.getElementById('search-input-desktop');
    const mobileSearch = document.getElementById('search-input-mobile');

    desktopSearch?.addEventListener('input', handleSearch);
    mobileSearch?.addEventListener('input', handleSearch);

    return () => {
      desktopSearch?.removeEventListener('input', handleSearch);
      mobileSearch?.removeEventListener('input', handleSearch);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Promotional Banner */}
        <PromoBanner />

        {/* Restaurants Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Restaurantes en campus'}
              </h2>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  const desktopSearch = document.getElementById('search-input-desktop') as HTMLInputElement;
                  const mobileSearch = document.getElementById('search-input-mobile') as HTMLInputElement;
                  if (desktopSearch) desktopSearch.value = '';
                  if (mobileSearch) mobileSearch.value = '';
                }}
                className="text-[var(--rappi-orange)] font-semibold hover:underline"
              >
                {searchQuery || selectedCategory ? 'Limpiar filtros' : 'Ver todos'}
              </button>
            </div>

            {/* Restaurant Grid */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                      setIsMenuOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 mb-2">No se encontraron restaurantes</p>
                <p className="text-base text-gray-700 font-medium">Intenta con otra búsqueda</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modals */}
      <CartSidebar />
      <LoginModal />
      <CheckoutModal />
      <RestaurantMenuModal
        restaurant={selectedRestaurant}
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
          setSelectedRestaurant(null);
        }}
      />

      {/* Footer */}
      <footer className="bg-[var(--rappi-dark)] text-white py-8 mt-12 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-[var(--rappi-orange)]">FooDrop</h3>
              <p className="text-sm text-gray-300">
                Delivery exclusivo para Anáhuac Mayab
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Conoce Más</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Síguenos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-300">
            © 2026 FooDrop - Universidad Anáhuac Mayab. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
