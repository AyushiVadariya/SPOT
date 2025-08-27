import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { useAuth } from '../contexts/AuthContext';
import { Heart, ShoppingBag, MapPin, Star, Trash2 } from 'lucide-react';

export default function Favorites() {
  const { favorites, removeFromFavorites, getShopById } = useShop();
  const { user } = useAuth();

  const handleRemoveFromFavorites = (productId: string) => {
    removeFromFavorites(productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
          My Favorites
        </h1>
        <p className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'product' : 'products'} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start exploring shops and products to add them to your favorites list. 
            You'll be able to quickly access them here anytime.
          </p>
          <Link 
            to="/customer-dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Explore Products</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(product => {
            const shop = getShopById(product.shopId);
            
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveFromFavorites(product.id)}
                    className="absolute top-3 right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {user?.hasSubscription ? (
                    <p className="text-xl font-bold text-blue-600 mb-2">₹{product.price}</p>
                  ) : (
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">Price available with subscription</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className={`font-medium ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                    <span className="text-gray-500">{product.category}</span>
                  </div>
                  
                  {shop && (
                    <div className="border-t border-gray-100 pt-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{shop.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-gray-600">{shop.rating}</span>
                        </div>
                      </div>
                      <div className="mt-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          shop.isOpen 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {shop.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center block"
                    >
                      View Details
                    </Link>
                    
                    {shop && (
                      <Link
                        to={`/shop/${shop.id}`}
                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center block"
                      >
                        Visit Shop
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subscription Prompt for Non-Subscribers */}
      {!user?.hasSubscription && favorites.length > 0 && (
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Get More from Your Favorites
            </h3>
            <p className="text-blue-700 mb-4">
              Subscribe to see product prices and contact shop owners directly!
            </p>
            <Link 
              to="/subscription"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Subscribe for ₹10/month
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}