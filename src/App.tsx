import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ShopProvider } from './contexts/ShopContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CustomerDashboard from './pages/CustomerDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import ShopDetails from './pages/ShopDetails';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/customer-dashboard" 
                element={
                  <ProtectedRoute userType="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/shopkeeper-dashboard" 
                element={
                  <ProtectedRoute userType="shopkeeper">
                    <ShopkeeperDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/shop/:id" element={<ShopDetails />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute userType="customer">
                    <Favorites />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;