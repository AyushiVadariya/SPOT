import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Phone, Clock, Star, Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function ShopDetails() {
  const { id } = useParams<{ id: string }>();
  const { getShopById, addToFavorites, favorites } = useShop();
  const { user } = useAuth();
  
  const shop = id ? getShopById(id) : null;

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  if (!shop) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Shop not found</h1>
          <p className="text-gray-600 mt-2">The shop you're looking for doesn't exist.</p>
          <Link to="/customer-dashboard" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link 
        to="/customer-dashboard"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </Link>

      {/* Shop Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                shop.isOpen 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <Clock className="h-4 w-4 inline mr-1" />
                {shop.isOpen ? 'Open Now' : 'Closed'}
              </div>
            </div>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{shop.address}</span>
              </div>
              
              {shop.isOpen && user?.hasSubscription && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>{shop.contactInfo}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current" />
                <span>{shop.rating} rating</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Shop Information</h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p>Category: {shop.category}</p>
                <p>Owner: {shop.ownerName}</p>
                <p>Products: {shop.products.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2" />
            Products ({shop.products.length})
          </h2>
        </div>
        
        <div className="p-6">
          {shop.products.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
              <p className="text-gray-600">This shop hasn't added any products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shop.products.map(product => (
                <div key={product.id} className="group relative">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <button
                      onClick={() => addToFavorites(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                        isFavorite(product.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-white/80 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    
                    {user?.hasSubscription ? (
                      <p className="text-xl font-bold text-blue-600 mb-2">₹{product.price}</p>
                    ) : (
                      <div className="mb-2">
                        <p className="text-sm text-gray-500">Price available with subscription</p>
                        <Link 
                          to="/subscription"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Subscribe now →
                        </Link>
                      </div>
                    )}
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Stock:</span>
                        <span className={`font-medium ${
                          product.stock > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                        </span>
                      </div>
                      
                      {product.colors.length > 0 && (
                        <div>
                          <span className="font-medium">Colors:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.colors.map(color => (
                              <span 
                                key={color}
                                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {product.sizes.length > 0 && (
                        <div>
                          <span className="font-medium">Sizes:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.sizes.map(size => (
                              <span 
                                key={size}
                                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Information for Non-Subscribers */}
      {!user?.hasSubscription && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Want to contact this shop?</h3>
            <p className="text-blue-700 mb-4">
              Subscribe for just ₹10/month to view shop contact numbers and product prices!
            </p>
            <Link 
              to="/subscription"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}