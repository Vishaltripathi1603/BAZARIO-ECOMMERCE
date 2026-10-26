"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, ToastMessage } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, selectedColor: string | undefined, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  promoCode: string;
  discountPercent: number;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  subtotal: number;
  discountAmount: number;
  shipping: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  total: number;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("bamboonest_cart");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore storage access issues
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("bamboonest_wishlist");
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore storage access issues
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("bamboonest_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("bamboonest_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToast = (title: string, description?: string, type: "success" | "info" | "warning" = "success") => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colorOptions[0] || "Default";
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    addToast(
      "Added to Bag",
      `${product.name} (${color}) added to your shopping bag.`,
      "success"
    );
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
    addToast("Item Removed", "Product removed from shopping bag.", "info");
  };

  const updateQuantity = (productId: string, selectedColor: string | undefined, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast("Removed from Wishlist", "Item removed from saved favorites.", "info");
        return prev.filter((id) => id !== productId);
      } else {
        addToast("Saved to Wishlist", "Item saved for your next mindful visit.", "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "BAMBOO10" || normalized === "ECO10") {
      setPromoCode(normalized);
      setDiscountPercent(10);
      setPromoError(null);
      addToast("Coupon Applied!", "10% sustainability discount applied to your order.", "success");
      return true;
    } else if (normalized === "BAMBOO20") {
      setPromoCode(normalized);
      setDiscountPercent(20);
      setPromoError(null);
      addToast("Coupon Applied!", "20% Earth Day discount applied to your order.", "success");
      return true;
    } else {
      setPromoError("Invalid discount code. Try 'BAMBOO10' for 10% off!");
      return false;
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 999;
  const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 99;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        promoCode,
        discountPercent,
        promoError,
        applyPromoCode,
        subtotal,
        discountAmount,
        shipping,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        total,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
