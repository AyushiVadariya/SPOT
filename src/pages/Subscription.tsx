import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Check, Crown, Phone, Eye, Heart, Star, CreditCard } from 'lucide-react';

export default function Subscription() {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Subscription activated! You now have access to premium features.');
    }, 2000);
  };

  const features = [
    {
      icon: Phone,
      title: 'View Shop Contact Numbers',
      description: 'Get direct access to shop contact information when shops are open'
    },
    {
      icon: Eye,
      title: 'See Product Prices',
      description: 'View detailed pricing information for all products'
    },
    {
      icon: Heart,
      title: 'Unlimited Favorites',
      description: 'Save as many products as you want to your favorites list'
    },
    {
      icon: Star,
      title: 'Priority Support',
      description: 'Get faster response times for any issues or questions'
    }
  ];

  const freeFeatures = [
    'Browse all shops and products',
    'View shop locations and addresses',
    'See product images and descriptions',
    'Check shop open/closed status',
    'Read shop ratings and reviews'
  ];

  if (user?.userType !== 'customer') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Subscription Not Available</h1>
          <p className="text-gray-600 mt-2">Subscriptions are only available for customer accounts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Unlock Premium Features
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the most out of SpotMyShop with our affordable premium subscription
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Free Plan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
            <div className="text-4xl font-bold text-gray-900 mb-2">₹0</div>
            <p className="text-gray-600">Forever free</p>
          </div>
          
          <ul className="space-y-3 mb-6">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="text-center">
            <div className="bg-gray-100 text-gray-500 py-2 px-4 rounded-lg font-medium">
              Current Plan
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 p-6 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium</h2>
            <div className="text-4xl font-bold text-blue-600 mb-2">₹10</div>
            <p className="text-gray-600">per month</p>
          </div>
          
          <ul className="space-y-3 mb-6">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-900 font-medium">{feature.title}</span>
              </li>
            ))}
          </ul>
          
          <div className="text-center">
            {user?.hasSubscription ? (
              <div className="bg-green-100 text-green-800 py-2 px-4 rounded-lg font-medium">
                ✓ Active Subscription
              </div>
            ) : (
              <button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>{isProcessing ? 'Processing...' : 'Subscribe Now'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feature Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Premium Features in Detail
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I cancel my subscription anytime?
            </h3>
            <p className="text-gray-600">
              Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your current billing period.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Is my payment information secure?
            </h3>
            <p className="text-gray-600">
              Absolutely. We use industry-standard encryption and secure payment processing to protect your financial information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}