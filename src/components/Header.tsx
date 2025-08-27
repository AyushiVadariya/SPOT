import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Store, User, Heart, LogOut, Menu } from 'lucide-react';

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SpotMyShop</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link 
                  to={user.userType === 'customer' ? '/customer-dashboard' : '/shopkeeper-dashboard'}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive(user.userType === 'customer' ? '/customer-dashboard' : '/shopkeeper-dashboard') 
                      ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                
                {user.userType === 'customer' && (
                  <>
                    <Link 
                      to="/favorites"
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-600 ${
                        isActive('/favorites') ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Favorites</span>
                    </Link>
                    <Link 
                      to="/subscription"
                      className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                        isActive('/subscription') ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      Subscription
                    </Link>
                  </>
                )}

                <Link 
                  to="/profile"
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/profile') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/signin"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <button className="md:hidden p-2">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}