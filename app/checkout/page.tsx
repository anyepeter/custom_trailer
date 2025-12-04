"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  DollarSign,
  CheckCircle2,
  Loader2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { submitOrder } from "@/app/actions/submitOrder";

type PaymentMethod = "wire-tranfer" | "zelle" | "crypto" | null;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, getCartTotal, getCartCount, clearCart, toggleUpgrade } =
    useCart();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Billing Information
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Payment Details (for credit card)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Scroll to top when page loads or order completes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isComplete]);

  // Redirect if cart is empty
  if (cartItems.length === 0 && !isComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex w-full justify-center items-center h-screen">
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some trailers to your cart to proceed with checkout.
          </p>
          <Button asChild>
            <Link href="/shop">Browse Trailers</Link>
          </Button>
        </div>
        </div>
        <Footer />
      </main>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate billing info
    if (!billingInfo.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!billingInfo.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!billingInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingInfo.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!billingInfo.phone.trim()) newErrors.phone = "Phone is required";
    if (!billingInfo.address.trim()) newErrors.address = "Address is required";
    if (!billingInfo.city.trim()) newErrors.city = "City is required";
    if (!billingInfo.state.trim()) newErrors.state = "State is required";
    if (!billingInfo.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Validate payment method selection
    if (!selectedPayment) {
      newErrors.payment = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Get cart item (assuming single item for now)
      const item = cartItems[0];
      if (!item) {
        throw new Error("No items in cart");
      }

      const primaryImage = item.trailer.images.find((img) => img.isPrimary) || item.trailer.images[0];

      // Calculate totals
      const total = getCartTotal();

      // Map selected upgrades to include name and price
      const selectedUpgrades = item.selectedUpgrades.map(upgradeId => {
        const upgrade = item.trailer.upgrades.find(u => u.id === upgradeId);
        return {
          id: upgradeId,
          name: upgrade?.name || 'Unknown Upgrade',
          price: upgrade?.price || 0,
        };
      });

      // Submit order
      const result = await submitOrder({
        // User Information
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        email: billingInfo.email,
        phone: billingInfo.phone,
        address: billingInfo.address,
        city: billingInfo.city,
        state: billingInfo.state,
        zipCode: billingInfo.zipCode,

        // Truck Information
        truckName: item.trailer.name,
        truckSize: item.trailer.size || "Custom",
        truckType: item.trailer.type,
        truckImage: primaryImage.url,
        truckImages: item.trailer.images.map(img => img.url),
        upgrades: selectedUpgrades,

        // Pricing
        price: total,
        total: total,

        // Payment
        paymentMethod: selectedPayment!,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to submit order");
      }

      console.log("✅ Order submitted successfully:", result.orderNumber);
      setOrderNumber(result.orderNumber || "");
      setIsComplete(true);
      clearCart();
    } catch (error) {
      console.error("❌ Order submission error:", error);
      alert(error instanceof Error ? error.message : "Failed to submit order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Order Complete Screen
  if (isComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex w-full justify-center items-center min-h-screen">
        <div className="container mx-auto px-4 mt-20 py-12 sm:py-16 md:py-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-10 h-10 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle2 className="h-6 w-6 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Order Complete!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
              Thank you for your purchase. We'll be in touch within 24 hours to
              discuss your build timeline and customization options.
            </p>
            <Card className="p-4 sm:p-6 bg-white mb-6 sm:mb-8">
              {orderNumber && (
                <>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    Order Number:
                  </p>
                  <p className="text-lg sm:text-xl font-mono font-bold text-gray-900 mb-4">
                    #{orderNumber}
                  </p>
                </>
              )}
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Confirmation sent to:
              </p>
              <p className="text-base sm:text-lg font-medium text-gray-900 mb-4 break-words">
                {billingInfo.email}
              </p>
            </Card>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        </div>
        <Footer />
      </main>
    );
  }

  const total = getCartTotal();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Billing Information */}
                <Card className="p-6 bg-white">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Billing Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={billingInfo.firstName}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            firstName: e.target.value,
                          })
                        }
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={billingInfo.lastName}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            lastName: e.target.value,
                          })
                        }
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, email: e.target.value })
                        }
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, phone: e.target.value })
                        }
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={billingInfo.address}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            address: e.target.value,
                          })
                        }
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={billingInfo.city}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, city: e.target.value })
                        }
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={billingInfo.state}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, state: e.target.value })
                        }
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={billingInfo.zipCode}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            zipCode: e.target.value,
                          })
                        }
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Payment Method Selection */}
                <Card className="p-6 bg-white">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Payment Method <span className="text-red-500">*</span>
                  </h2>
                  {errors.payment && (
                    <p className="text-red-500 text-sm mb-4">{errors.payment}</p>
                  )}
                  <div className="space-y-3">
                    {/* Wire Transfer */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("wire-tranfer")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPayment === "wire-tranfer"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-gray-700" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Wire Transfer
                          </p>
                          <p className="text-sm text-gray-600">
                            Direct bank-to-bank wire transfer
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Zelle */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("zelle")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPayment === "zelle"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-6 w-6 text-gray-700" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Zelle
                          </p>
                          <p className="text-sm text-gray-600">
                            Fast and secure payment via Zelle
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Crypto */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("crypto")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPayment === "crypto"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-gray-700" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Cryptocurrency
                          </p>
                          <p className="text-sm text-gray-600">
                            Pay with Bitcoin, USDT, or other crypto
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </Card>

                {/* Wire Transfer Info */}
                {selectedPayment === "wire-tranfer" && (
                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Wire Transfer Instructions
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      After placing your order, you'll receive an email with our complete wire transfer details including:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>• Bank name and address</li>
                      <li>• Account number and routing number</li>
                      <li>• SWIFT/BIC code for international transfers</li>
                      <li>• Your unique order reference number</li>
                    </ul>
                    <p className="text-sm text-gray-700">
                      Wire transfers typically take 1-3 business days to process. Your build will begin once payment is confirmed.
                    </p>
                  </Card>
                )}

                {/* Zelle Info */}
                {selectedPayment === "zelle" && (
                  <Card className="p-6 bg-purple-50 border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Zelle Payment Instructions
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      After placing your order, you'll receive an email with our Zelle payment details:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>• Zelle email or phone number</li>
                      <li>• Your unique order reference number (include in notes)</li>
                      <li>• Payment amount</li>
                    </ul>
                    <p className="text-sm text-gray-700">
                      Zelle payments are instant and secure. Your build will begin once we confirm receipt.
                    </p>
                  </Card>
                )}

                {/* Crypto Info */}
                {selectedPayment === "crypto" && (
                  <Card className="p-6 bg-green-50 border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Cryptocurrency Payment Instructions
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      After placing your order, you'll receive an email with cryptocurrency payment options:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>• Bitcoin (BTC) wallet address</li>
                      <li>• USDT (TRC20/ERC20) wallet address</li>
                      <li>• Ethereum (ETH) wallet address</li>
                      <li>• Current exchange rate and payment amount</li>
                      <li>• Your unique order reference number</li>
                    </ul>
                    <p className="text-sm text-gray-700">
                      Crypto payments are confirmed after 3-6 network confirmations (typically 30-60 minutes). Your build will begin once payment is confirmed on the blockchain.
                    </p>
                  </Card>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="p-6 bg-white">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => {
                        const primaryImage =
                          item.trailer.images.find((img) => img.isPrimary) ||
                          item.trailer.images[0];

                        return (
                          <div
                            key={item.trailer.id}
                            className="flex gap-3 pb-4 border-b border-gray-200 last:border-b-0"
                          >
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={primaryImage.url}
                                alt={primaryImage.alt}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                {item.trailer.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity}
                              </p>
                              <p className="text-sm font-semibold text-gray-900 mt-1">
                                ${(
                                  item.trailer.price * item.quantity
                                ).toLocaleString()}
                              </p>

                              {/* Display selected upgrades */}
                              {item.selectedUpgrades.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-gray-100">
                                  <p className="text-xs font-medium text-gray-700 mb-1">
                                    Upgrades:
                                  </p>
                                  {item.selectedUpgrades.map((upgradeId) => {
                                    const upgrade = item.trailer.upgrades.find(
                                      (u) => u.id === upgradeId
                                    );
                                    if (!upgrade) return null;
                                    return (
                                      <div
                                        key={upgradeId}
                                        className="flex justify-between items-center text-xs text-gray-600 mb-1 group"
                                      >
                                        <span className="flex-1">• {upgrade.name}</span>
                                        <span className="text-blue-600 font-medium mr-2">
                                          +${upgrade.price.toLocaleString()}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => toggleUpgrade(item.trailer.id, upgradeId)}
                                          className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                          aria-label="Remove upgrade"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.trailer.id)}
                              className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-3 py-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-lg font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                          ${total.toLocaleString()}
                        </span>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isProcessing || !selectedPayment}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : !selectedPayment ? (
                          <>
                            Complete Order
                            <CheckCircle2 className="ml-2 h-5 w-5" />
                          </>
                        ) : (
                          <>
                            Complete Order
                            <CheckCircle2 className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      {!selectedPayment && (
                        <p className="text-xs text-red-500 text-center mt-2">
                          Please select a payment method to continue
                        </p>
                      )}

                      {/* <p className="text-xs text-gray-500 text-center mt-4">
                        By placing your order, you agree to our terms and
                        conditions
                      </p> */}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
