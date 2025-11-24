"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ShoppingCart, ArrowRight, Minus, Plus, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function CartBar() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  if (cartItems.length === 0) return null;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl"
      >
        {/* Mobile Compact View */}
        <div className="md:hidden">
          {/* Collapsed Header */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-3 flex-1"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {getCartCount()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 text-left">
                      {getCartCount()} {getCartCount() === 1 ? "Item" : "Items"}
                    </p>
                    <p className="text-xs text-slate-500 text-left">
                      ${getCartTotal().toLocaleString()}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                </motion.div>
              </button>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg ml-3"
                onClick={handleCheckout}
              >
                Checkout
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Expanded Cart Items */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-t border-slate-200 bg-slate-50/50"
              >
                <div className="px-4 py-3 max-h-64 overflow-y-auto">
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const primaryImage =
                        item.trailer.images.find((img) => img.isPrimary) ||
                        item.trailer.images[0];

                      return (
                        <motion.div
                          key={item.trailer.id}
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-slate-200"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={primaryImage.url}
                              alt={primaryImage.alt}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {item.trailer.name}
                            </p>
                            <p className="text-xs text-slate-500 mb-2">
                              ${item.trailer.price.toLocaleString()} each
                            </p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center bg-slate-100 rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.trailer.id, item.quantity - 1)
                                  }
                                  className="p-2 hover:bg-slate-200 transition-colors rounded-l-lg"
                                >
                                  <Minus className="h-3 w-3 text-slate-600" />
                                </button>
                                <span className="px-3 py-2 text-sm font-semibold text-slate-900 min-w-[40px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.trailer.id, item.quantity + 1)
                                  }
                                  className="p-2 hover:bg-slate-200 transition-colors rounded-r-lg"
                                >
                                  <Plus className="h-3 w-3 text-slate-600" />
                                </button>
                              </div>
                              
                              <p className="text-sm font-bold text-blue-600">
                                ${(item.trailer.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.trailer.id)}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left Section - Cart Items */}
              <div className="flex items-center gap-4 flex-1 overflow-x-auto">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                      {getCartCount()}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                    Cart
                  </h3>
                </div>

                {/* Cart Item Pills */}
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {cartItems.map((item) => {
                    const primaryImage =
                      item.trailer.images.find((img) => img.isPrimary) ||
                      item.trailer.images[0];

                    return (
                      <motion.div
                        key={item.trailer.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200 shadow-sm min-w-[300px]"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={primaryImage.url}
                            alt={primaryImage.alt}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {item.trailer.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            ${item.trailer.price.toLocaleString()} each
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.trailer.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-slate-200 transition-colors rounded-l-lg"
                          >
                            <Minus className="h-3 w-3 text-slate-600" />
                          </button>
                          <span className="px-2 text-sm font-semibold text-slate-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.trailer.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-slate-200 transition-colors rounded-r-lg"
                          >
                            <Plus className="h-3 w-3 text-slate-600" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.trailer.id)}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right Section - Total & Checkout */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Total */}
                <div className="text-right">
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="text-xl font-bold text-slate-900">
                    ${getCartTotal().toLocaleString()}
                  </p>
                </div>

                {/* Checkout Button */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
                  onClick={handleCheckout}
                >
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
