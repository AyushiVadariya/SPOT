import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Heart, MapPin, Phone, Star, Package } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { getProductById, getShopById, addToFavorites, favorites } = useShop();
  const { user } = useAuth();
  
  const product = id ? getProductById(id) : null;
  const shop = product ? getShopById(product.shopId) : null;

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  if (!product || !shop) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
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
        to={`/shop/${shop.id}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to {shop.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => addToFavorites(product)}
            className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
              isFavorite(product.id)
                ? 'bg-red-100 text-red-600'
                : 'bg-white/80 text-gray-600 hover:bg-red-100 hover:text-red-600'
            }`}
          >
            <Heart className={`h-6 w-6 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.category}</p>
          </div>

          {/* Price */}
          <div>
            {user?.hasSubscription ? (
              <p className="text-3xl font-bold text-blue-600">₹{product.price}</p>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-semibold mb-2">Price available with subscription</p>
                <Link 
                  to="/subscription"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Subscribe for just ₹10/month →
                </Link>
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">Stock:</span>
            <span className={`font-semibold ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <span 
                    key={color}
                    className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 font-medium"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <span 
                    key={size}
                    className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 font-medium"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Shop Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shop Name:</span>
                <Link 
                  to={`/shop/${shop.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {shop.name}
                </Link>
              </div>
              
              <div className="flex items-start justify-between">
                <span className="text-gray-600">Address:</span>
                <div className="text-right">
                  <div className="flex items-center text-gray-900">
                    <MapPin className="h-4 w-4 mr-1" />
                    {shop.address}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rating:</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-gray-900 font-medium">{shop.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  shop.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {shop.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>

              {shop.isOpen && user?.hasSubscription && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <div className="flex items-center text-blue-600">
                    <Phone className="h-4 w-4 mr-1" />
                    {shop.contactInfo}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => addToFavorites(product)}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                isFavorite(product.id)
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
              <span>{isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
            </button>

            <Link
              to={`/shop/${shop.id}`}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
            >
              View More from {shop.name}
            </Link>
          </div>

          {/* Contact Information for Non-Subscribers */}
          {!user?.hasSubscription && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Want to contact the shop?</h4>
              <p className="text-blue-700 text-sm mb-3">
                Subscribe to view contact numbers and get the best prices!
              </p>
              <Link 
                to="/subscription"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
              >
                Subscribe Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}