"use client";

import { useState } from "react";
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

type PaymentMethod = "credit-card" | "bank-transfer" | "financing" | null;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, getCartTotal, getCartCount, clearCart } =
    useCart();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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

  // Redirect if cart is empty
  if (cartItems.length === 0 && !isComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
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

    // Validate credit card details if credit card is selected
    if (selectedPayment === "credit-card") {
      if (!paymentDetails.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Invalid card number";
      }
      if (!paymentDetails.cardName.trim())
        newErrors.cardName = "Cardholder name is required";
      if (!paymentDetails.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
        newErrors.expiryDate = "Invalid format (MM/YY)";
      }
      if (!paymentDetails.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = "Invalid CVV";
      }
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

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // In production, send to your payment API:
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ billingInfo, paymentDetails, cartItems, paymentMethod: selectedPayment }),
      // });

      console.log("Order Submitted:", {
        billingInfo,
        paymentMethod: selectedPayment,
        cartItems,
        total: getCartTotal(),
      });

      setIsComplete(true);
      setIsProcessing(false);
      clearCart();
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
      alert("Payment failed. Please try again.");
    }
  };

  // Order Complete Screen
  if (isComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. We'll be in touch within 24 hours to
              discuss your build timeline and customization options.
            </p>
            <Card className="p-6 bg-white mb-8">
              <p className="text-sm text-gray-600 mb-2">
                Confirmation sent to:
              </p>
              <p className="text-lg font-medium text-gray-900 mb-4">
                {billingInfo.email}
              </p>
              <p className="text-sm text-gray-600 mb-2">Order Total:</p>
              <p className="text-3xl font-bold text-blue-600">
                ${getCartTotal().toLocaleString()}
              </p>
            </Card>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

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
                    Payment Method
                  </h2>
                  {errors.payment && (
                    <p className="text-red-500 text-sm mb-4">{errors.payment}</p>
                  )}
                  <div className="space-y-3">
                    {/* Credit Card */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("credit-card")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPayment === "credit-card"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-gray-700" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Credit / Debit Card
                          </p>
                          <p className="text-sm text-gray-600">
                            Pay securely with your card
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Bank Transfer */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("bank-transfer")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPayment === "bank-transfer"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-6 w-6 text-gray-700" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Bank Transfer
                          </p>
                          <p className="text-sm text-gray-600">
                            Direct bank transfer or wire
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Financing */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment("financing")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPayment === "financing"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-gray-700" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Financing Options
                          </p>
                          <p className="text-sm text-gray-600">
                            Apply for financing - Low monthly payments
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </Card>

                {/* Credit Card Details (if selected) */}
                {selectedPayment === "credit-card" && (
                  <Card className="p-6 bg-white">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Card Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cardNumber: e.target.value,
                            })
                          }
                          className={errors.cardNumber ? "border-red-500" : ""}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="John Smith"
                          value={paymentDetails.cardName}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cardName: e.target.value,
                            })
                          }
                          className={errors.cardName ? "border-red-500" : ""}
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                expiryDate: e.target.value,
                              })
                            }
                            className={errors.expiryDate ? "border-red-500" : ""}
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                cvv: e.target.value,
                              })
                            }
                            className={errors.cvv ? "border-red-500" : ""}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Bank Transfer Info */}
                {selectedPayment === "bank-transfer" && (
                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Bank Transfer Instructions
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      After placing your order, you'll receive an email with our
                      bank details and your unique order reference number.
                    </p>
                    <p className="text-sm text-gray-700">
                      Please allow 3-5 business days for the transfer to be
                      processed. Your build will begin once payment is confirmed.
                    </p>
                  </Card>
                )}

                {/* Financing Info */}
                {selectedPayment === "financing" && (
                  <Card className="p-6 bg-green-50 border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Financing Application
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Complete your order and our financing team will contact you
                      within 24 hours with available financing options.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Competitive rates starting at 4.99% APR</li>
                      <li>• Terms from 24 to 84 months</li>
                      <li>• Quick approval process</li>
                      <li>• No prepayment penalties</li>
                    </ul>
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
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tax (8%)</span>
                        <span className="font-medium text-gray-900">
                          ${tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-green-600">FREE</span>
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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Complete Order
                            <CheckCircle2 className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center mt-4">
                        By placing your order, you agree to our terms and
                        conditions
                      </p>
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
