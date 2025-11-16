"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ShoppingCart, ArrowRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function CartBar() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

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
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-600 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Section - Cart Items */}
            <div className="flex items-center gap-4 flex-1 overflow-x-auto">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Cart
                </h3>
                <span className="text-xs text-gray-500">
                  ({getCartCount()} {getCartCount() === 1 ? "item" : "items"})
                </span>
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
                      className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 border border-gray-200 min-w-[280px]"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
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
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.trailer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${item.trailer.price.toLocaleString()} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-white rounded-md border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.trailer.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-100 transition-colors rounded-l-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="px-2 text-sm font-medium text-gray-900 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.trailer.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 transition-colors rounded-r-md"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.trailer.id)}
                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={`Remove ${item.trailer.name} from cart`}
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Section - Total & Checkout */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Total */}
              <div className="hidden md:block text-right">
                <p className="text-xs text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">
                  ${getCartTotal().toLocaleString()}
                </p>
              </div>

              {/* Checkout Button */}
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                onClick={handleCheckout}
              >
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Total (shown below on mobile) */}
          <div className="md:hidden mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="text-xl font-bold text-gray-900">
              ${getCartTotal().toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
