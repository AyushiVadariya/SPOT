import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'customer' | 'shopkeeper';
  shopId?: string;
  hasSubscription?: boolean;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, userType: 'customer' | 'shopkeeper') => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string, userType: 'customer' | 'shopkeeper') => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with real API
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        userType,
        hasSubscription: userType === 'customer' ? false : undefined,
        shopId: userType === 'shopkeeper' ? '1' : undefined,
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: any) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with real API
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name || userData.shopName,
        userType: userData.userType,
        hasSubscription: userData.userType === 'customer' ? false : undefined,
        shopId: userData.userType === 'shopkeeper' ? Date.now().toString() : undefined,
      };
      setUser(newUser);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}