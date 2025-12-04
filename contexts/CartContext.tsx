"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Trailer } from "@/types/trailer";

interface CartItem {
  trailer: Trailer;
  quantity: number;
  selectedUpgrades: string[]; // Array of upgrade IDs
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (trailer: Trailer, upgrades?: string[]) => void;
  removeFromCart: (trailerId: string) => void;
  updateQuantity: (trailerId: string, quantity: number) => void;
  toggleUpgrade: (trailerId: string, upgradeId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (trailer: Trailer, upgrades: string[] = []) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.trailer.id === trailer.id);

      if (existingItem) {
        // If upgrades are provided, replace them without changing quantity
        // If no upgrades provided, just increase quantity
        if (upgrades.length > 0) {
          return prev.map((item) =>
            item.trailer.id === trailer.id
              ? { ...item, selectedUpgrades: upgrades }
              : item
          );
        } else {
          return prev.map((item) =>
            item.trailer.id === trailer.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      } else {
        // Add new item
        return [...prev, { trailer, quantity: 1, selectedUpgrades: upgrades }];
      }
    });
  };

  const removeFromCart = (trailerId: string) => {
    setCartItems((prev) => prev.filter((item) => item.trailer.id !== trailerId));
  };

  const updateQuantity = (trailerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(trailerId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.trailer.id === trailerId ? { ...item, quantity } : item
      )
    );
  };

  const toggleUpgrade = (trailerId: string, upgradeId: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.trailer.id !== trailerId) return item;

        const hasUpgrade = item.selectedUpgrades.includes(upgradeId);
        const newUpgrades = hasUpgrade
          ? item.selectedUpgrades.filter((id) => id !== upgradeId)
          : [...item.selectedUpgrades, upgradeId];

        return { ...item, selectedUpgrades: newUpgrades };
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const trailerPrice = item.trailer.price;
      const upgradesPrice = item.selectedUpgrades.reduce((sum, upgradeId) => {
        const upgrade = item.trailer.upgrades.find((u) => u.id === upgradeId);
        return sum + (upgrade?.price || 0);
      }, 0);
      return total + (trailerPrice + upgradesPrice) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleUpgrade,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
