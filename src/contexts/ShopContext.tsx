import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  stock: number;
  category: string;
  shopId: string;
}

interface Shop {
  id: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  ownerName: string;
  contactInfo: string;
  isOpen: boolean;
  rating: number;
  category: string;
  products: Product[];
}

interface ShopContextType {
  shops: Shop[];
  products: Product[];
  favorites: Product[];
  categories: string[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  updateShopStatus: (shopId: string, isOpen: boolean) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  getShopById: (shopId: string) => Shop | undefined;
  getProductById: (productId: string) => Product | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const mockCategories = [
  'Clothing', 'Vegetables', 'Stationary', 'Beauty Shop', 
  'Food Shop', 'Electronics', 'Footwear', 'Jewelry'
];

const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Fashion Hub',
    address: '123 Market Street, Delhi',
    location: { lat: 28.6139, lng: 77.2090 },
    ownerName: 'Rajesh Kumar',
    contactInfo: '+91 9876543210',
    isOpen: true,
    rating: 4.5,
    category: 'Clothing',
    products: [
      {
        id: '1',
        name: 'Designer Lehenga',
        price: 15000,
        image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        colors: ['Red', 'Blue', 'Green'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 5,
        category: 'Clothing',
        shopId: '1'
      }
    ]
  }
];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const products = shops.flatMap(shop => shop.products);

  const addToFavorites = (product: Product) => {
    setFavorites(prev => [...prev.filter(p => p.id !== product.id), product]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };

  const updateShopStatus = (shopId: string, isOpen: boolean) => {
    setShops(prev => prev.map(shop => 
      shop.id === shopId ? { ...shop, isOpen } : shop
    ));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };

    setShops(prev => prev.map(shop => 
      shop.id === productData.shopId 
        ? { ...shop, products: [...shop.products, newProduct] }
        : shop
    ));
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setShops(prev => prev.map(shop => ({
      ...shop,
      products: shop.products.map(product => 
        product.id === productId ? { ...product, ...updates } : product
      )
    })));
  };

  const deleteProduct = (productId: string) => {
    setShops(prev => prev.map(shop => ({
      ...shop,
      products: shop.products.filter(product => product.id !== productId)
    })));

    // Remove from favorites if it exists
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };

  const getShopById = (shopId: string) => {
    return shops.find(shop => shop.id === shopId);
  };

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  return (
    <ShopContext.Provider value={{
      shops,
      products,
      favorites,
      categories: mockCategories,
      addToFavorites,
      removeFromFavorites,
      updateShopStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      getShopById,
      getProductById
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}