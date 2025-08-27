import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useShop } from '../contexts/ShopContext';
import { MapPin, Search, Filter, Star, Heart, Phone, Clock, ShoppingBag } from 'lucide-react';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { shops, products, categories, addToFavorites, favorites } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredShops = shops.filter(shop => {
    const matchesCategory = !selectedCategory || shop.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.products.some(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesLocation = !locationFilter || 
      shop.address.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Discover local shops and products in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search shops or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredShops.map(shop => (
          <div key={shop.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{shop.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{shop.category}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {shop.address}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    shop.isOpen 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <Clock className="h-3 w-3 inline mr-1" />
                    {shop.isOpen ? 'Open' : 'Closed'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{shop.rating}</span>
                </div>
                {shop.isOpen && user?.hasSubscription && (
                  <div className="flex items-center text-sm text-blue-600">
                    <Phone className="h-4 w-4 mr-1" />
                    {shop.contactInfo}
                  </div>
                )}
              </div>

              {/* Products Preview */}
              {shop.products.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Featured Products
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {shop.products.slice(0, 2).map(product => (
                      <div key={product.id} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          {user?.hasSubscription && (
                            <p className="text-sm text-blue-600 font-semibold">₹{product.price}</p>
                          )}
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                            <button
                              onClick={() => addToFavorites(product)}
                              className={`p-1 rounded-full transition-colors ${
                                isFavorite(product.id)
                                  ? 'text-red-500 bg-red-50'
                                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {shop.products.length > 2 && (
                    <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all {shop.products.length} products →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredShops.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or location filter.</p>
        </div>
      )}

      {!user?.hasSubscription && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Unlock Premium Features</h3>
              <p className="text-blue-700">Subscribe for just ₹10/month to view shop contact numbers and product prices!</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}