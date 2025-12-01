"use client";

import { motion } from "framer-motion";
import { User, Check, Mail, Phone, MapPin, MessageSquare, Shield, Clock, Sparkles, CreditCard } from "lucide-react";
import { TrailerConfiguration, PricingBreakdown, PAYMENT_METHOD_OPTIONS } from "@/types/configurator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Step5ContactProps {
  config: TrailerConfiguration;
  updateConfig: (updates: Partial<TrailerConfiguration>) => void;
  pricing: PricingBreakdown;
  errors: Record<string, string>;
}

export default function Step5Contact({ config, updateConfig, pricing, errors }: Step5ContactProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4"
        >
          <User className="h-4 w-4" />
          Step 5 of 5 - Final Step!
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3"
        >
          Get Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Custom Quote
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          You&apos;re almost there! Fill in your contact details and we&apos;ll send you a
          detailed quote within 24 hours.
        </motion.p>
      </div>

      {/* Quote Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Your Custom Configuration
              </h3>
              <p className="text-blue-100 text-sm">Ready for your personalized quote</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">${pricing.total.toLocaleString()}</div>
              <p className="text-blue-100 text-sm">
                Est. ${pricing.monthlyPayment.toLocaleString()}/mo
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Contact Information
          </h3>

          <div className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    value={config.firstName}
                    onChange={(e) => updateConfig({ firstName: e.target.value })}
                    placeholder="John"
                    className={cn(
                      "pl-10",
                      errors.firstName && "border-red-500 focus:ring-red-500"
                    )}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    value={config.lastName}
                    onChange={(e) => updateConfig({ lastName: e.target.value })}
                    placeholder="Smith"
                    className={cn(
                      "pl-10",
                      errors.lastName && "border-red-500 focus:ring-red-500"
                    )}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  value={config.email}
                  onChange={(e) => updateConfig({ email: e.target.value })}
                  placeholder="john@example.com"
                  className={cn(
                    "pl-10",
                    errors.email && "border-red-500 focus:ring-red-500"
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="tel"
                  value={config.phoneNumber}
                  onChange={(e) => updateConfig({ phoneNumber: e.target.value })}
                  placeholder="(555) 123-4567"
                  className={cn(
                    "pl-10",
                    errors.phoneNumber && "border-red-500 focus:ring-red-500"
                  )}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  value={config.address}
                  onChange={(e) => updateConfig({ address: e.target.value })}
                  placeholder="123 Main Street"
                  className={cn(
                    "pl-10",
                    errors.address && "border-red-500 focus:ring-red-500"
                  )}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  value={config.zipcode}
                  onChange={(e) => updateConfig({ zipcode: e.target.value })}
                  placeholder="12345"
                  className={cn(
                    "pl-10",
                    errors.zipcode && "border-red-500 focus:ring-red-500"
                  )}
                />
              </div>
              {errors.zipcode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>
              )}
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Preferred Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                <select
                  value={config.paymentMethods}
                  onChange={(e) => updateConfig({ paymentMethods: e.target.value })}
                  className={cn(
                    "w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer",
                    errors.paymentMethods && "border-red-500 focus:ring-red-500"
                  )}
                >
                  <option value="">Select payment method...</option>
                  {PAYMENT_METHOD_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.paymentMethods && (
                <p className="text-red-500 text-xs mt-1">{errors.paymentMethods}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Additional Notes <span className="text-slate-400">(Optional)</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  value={config.additionalInfo}
                  onChange={(e) => updateConfig({ additionalInfo: e.target.value })}
                  placeholder="Any specific requirements, questions, or timeline preferences..."
                  rows={4}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Card className="p-4 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-center">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-white">Quick Response</h4>
          <p className="text-sm text-slate-500">Quote within 24 hours</p>
        </Card>

        <Card className="p-4 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-center">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-white">No Obligation</h4>
          <p className="text-sm text-slate-500">Free consultation included</p>
        </Card>

        <Card className="p-4 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-center">
          <Check className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-white">Expert Advice</h4>
          <p className="text-sm text-slate-500">Personalized recommendations</p>
        </Card>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          By submitting this form, you agree to our{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a>.
          We&apos;ll never share your information with third parties.
        </p>
      </motion.div>

      {/* What Happens Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            What Happens Next?
          </h3>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "We Review Your Configuration",
                description: "Our team will review your selections and prepare a detailed quote",
                time: "Within 24 hours",
              },
              {
                step: 2,
                title: "Personalized Quote Delivered",
                description: "Receive your custom quote via email with pricing breakdown",
                time: "1-2 business days",
              },
              {
                step: 3,
                title: "Free Consultation Call",
                description: "Schedule a call to discuss your needs and answer questions",
                time: "At your convenience",
              },
              {
                step: 4,
                title: "Start Your Build",
                description: "Approve the quote and we begin building your dream trailer",
                time: "When you're ready",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
