"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, TrendingUp, Calculator, CreditCard, Info } from "lucide-react";
import { PricingBreakdown } from "@/types/configurator";
import { formatCurrency } from "@/lib/pricing/calculator";
import { cn } from "@/lib/utils";

interface PriceCalculatorProps {
  pricing: PricingBreakdown;
  className?: string;
  compact?: boolean;
}

export default function PriceCalculator({ pricing, className, compact = false }: PriceCalculatorProps) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-4 text-white shadow-xl",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-xs">Estimated Total</p>
            <motion.p
              key={pricing.total}
              initial={{ scale: 1.1, color: "#86EFAC" }}
              animate={{ scale: 1, color: "#FFFFFF" }}
              className="text-2xl font-bold"
            >
              {formatCurrency(pricing.total)}
            </motion.p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs">Monthly</p>
            <p className="text-lg font-semibold">{formatCurrency(pricing.monthlyPayment)}/mo</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Price Estimate</h3>
            <p className="text-blue-100 text-sm">Real-time pricing</p>
          </div>
        </div>

        {/* Total Price */}
        <div className="text-center">
          <motion.div
            key={pricing.total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-1"
          >
            {formatCurrency(pricing.total)}
          </motion.div>
          <p className="text-blue-100 text-sm">Estimated Total</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-4 sm:p-6 space-y-3">
        <AnimatePresence mode="popLayout">
          {pricing.basePrice > 0 && (
            <PriceRow
              key="base"
              label="Base Trailer"
              amount={pricing.basePrice}
              icon={<DollarSign className="h-4 w-4" />}
            />
          )}
          {pricing.porchPrice > 0 && (
            <PriceRow
              key="porch"
              label="Porch Addition"
              amount={pricing.porchPrice}
              isAddition
            />
          )}
          {pricing.equipmentPrice > 0 && (
            <PriceRow
              key="equipment"
              label="Equipment"
              amount={pricing.equipmentPrice}
              isAddition
            />
          )}
          {pricing.customizationPrice !== 0 && (
            <PriceRow
              key="custom"
              label="Customizations"
              amount={pricing.customizationPrice}
              isAddition={pricing.customizationPrice > 0}
            />
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

        {/* Monthly Payment */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Monthly Payment
              </span>
            </div>
            <div className="text-right">
              <motion.span
                key={pricing.monthlyPayment}
                initial={{ scale: 1.1, color: "#10B981" }}
                animate={{ scale: 1, color: "#059669" }}
                className="text-xl font-bold text-green-600"
              >
                {formatCurrency(pricing.monthlyPayment)}
              </motion.span>
              <span className="text-green-600">/mo</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Based on 60-month financing at 7% APR
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Final pricing provided upon quote request
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PriceRow({
  label,
  amount,
  icon,
  isAddition = false,
}: {
  label: string;
  amount: number;
  icon?: React.ReactNode;
  isAddition?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="flex items-center justify-between text-sm"
    >
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        {icon || <TrendingUp className="h-4 w-4" />}
        <span>{label}</span>
      </div>
      <motion.span
        key={amount}
        initial={{ scale: 1.1, color: isAddition ? "#10B981" : "#6B7280" }}
        animate={{ scale: 1, color: amount > 0 ? "#374151" : "#EF4444" }}
        className={cn(
          "font-semibold",
          amount < 0 ? "text-green-600" : "text-gray-700 dark:text-gray-300"
        )}
      >
        {isAddition && amount > 0 ? "+" : ""}
        {formatCurrency(Math.abs(amount))}
      </motion.span>
    </motion.div>
  );
}
