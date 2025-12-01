"use client";

import { motion } from "framer-motion";
import { DollarSign, Check, Calculator, TrendingUp, PiggyBank, CreditCard, Info } from "lucide-react";
import { TrailerConfiguration, BUDGET_OPTIONS, FINANCING_OPTIONS, PricingBreakdown } from "@/types/configurator";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step4FinancialProps {
  config: TrailerConfiguration;
  updateConfig: (updates: Partial<TrailerConfiguration>) => void;
  pricing: PricingBreakdown;
}

export default function Step4Financial({ config, updateConfig, pricing }: Step4FinancialProps) {
  // Check if selected budget matches estimated price
  const getBudgetMatch = () => {
    const budgetRanges: Record<string, [number, number]> = {
      "under-30k": [0, 30000],
      "30k-40k": [30000, 40000],
      "40k-50k": [40000, 50000],
      "50k-60k": [50000, 60000],
      "60k-70k": [60000, 70000],
      "70k-80k": [70000, 80000],
      "80k-100k": [80000, 100000],
      "over-100k": [100000, Infinity],
      "flexible": [0, Infinity],
      "use-estimate": [0, Infinity], // Special case for using calculated estimate
    };

    const range = budgetRanges[config.budget];
    if (!range) return "unknown";

    if (config.budget === "flexible" || config.budget === "use-estimate") return "flexible";
    if (pricing.total >= range[0] && pricing.total <= range[1]) return "match";
    if (pricing.total < range[0]) return "under";
    return "over";
  };

  const budgetMatch = getBudgetMatch();

  // Format the calculated estimate for display
  const getEstimateLabel = () => {
    const total = pricing.total;
    if (total < 30000) return "Under $30k";
    if (total <= 40000) return "$30k - $40k";
    if (total <= 50000) return "$40k - $50k";
    if (total <= 60000) return "$50k - $60k";
    if (total <= 70000) return "$60k - $70k";
    if (total <= 80000) return "$70k - $80k";
    if (total <= 100000) return "$80k - $100k";
    return "Over $100k";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4"
        >
          <DollarSign className="h-4 w-4" />
          Step 4 of 5
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3"
        >
          Budget &{" "}
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Financing
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          Let us know your budget range so we can tailor your quote. We offer flexible
          financing options to help make your dream trailer a reality.
        </motion.p>
      </div>

      {/* Current Estimate Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-1">
                Your Current Estimate
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                Based on your selections so far
              </p>
            </div>
            <div className="text-right">
              <motion.div
                key={pricing.total}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-green-700 dark:text-green-300"
              >
                ${pricing.total.toLocaleString()}
              </motion.div>
              <p className="text-sm text-green-600 dark:text-green-400">
                Est. ${pricing.monthlyPayment.toLocaleString()}/mo with financing
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Budget Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-green-600" />
            What&apos;s Your Budget?
          </h3>
          <p className="text-sm text-slate-500 mt-1">Select the range that works best for you</p>
        </div>

        {/* Use Calculated Estimate Option */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => updateConfig({ budget: "use-estimate" })}
          className={cn(
            "relative p-5 rounded-xl border-2 transition-all mb-4",
            config.budget === "use-estimate"
              ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-600 shadow-lg shadow-green-500/20"
              : "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-300 dark:border-blue-700 hover:border-green-400 hover:shadow-md"
          )}
        >
          {config.budget === "use-estimate" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center"
            >
              <Check className="h-4 w-4 text-white" />
            </motion.div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="h-5 w-5 text-green-600" />
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  Use My Calculated Estimate
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Based on your current configuration: {getEstimateLabel()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                ${pricing.total.toLocaleString()}
              </div>
            </div>
          </div>
        </motion.button>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BUDGET_OPTIONS.map((budget, index) => {
            const isSelected = config.budget === budget.value;
            return (
              <motion.button
                key={budget.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateConfig({ budget: budget.value })}
                className={cn(
                  "relative p-4 rounded-xl border-2 text-center transition-all",
                  isSelected
                    ? "bg-green-50 dark:bg-green-900/30 border-green-600 shadow-lg shadow-green-500/20"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-green-400 hover:shadow-md"
                )}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
                <div className="font-bold text-slate-900 dark:text-white">
                  {budget.label}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Budget Match Indicator */}
        {config.budget && budgetMatch !== "unknown" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 p-4 rounded-xl border flex items-start gap-3",
              budgetMatch === "match" || budgetMatch === "flexible"
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : budgetMatch === "under"
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
            )}
          >
            <Info className={cn(
              "h-5 w-5 flex-shrink-0",
              budgetMatch === "match" || budgetMatch === "flexible"
                ? "text-green-600"
                : budgetMatch === "under"
                ? "text-blue-600"
                : "text-amber-600"
            )} />
            <div>
              {budgetMatch === "match" && (
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>Great news!</strong> Your current configuration fits within your selected budget.
                </p>
              )}
              {budgetMatch === "flexible" && (
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>No problem!</strong> We&apos;ll work with you to find the best configuration for your needs.
                </p>
              )}
              {budgetMatch === "under" && (
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Under budget!</strong> Your current configuration is below your budget. Consider adding more features or equipment.
                </p>
              )}
              {budgetMatch === "over" && (
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Over budget:</strong> Your current configuration exceeds your selected budget. Consider financing options or adjusting your selections.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Financing Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Need Financing?
          </h3>
          <p className="text-sm text-slate-500 mt-1">We offer flexible payment plans</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FINANCING_OPTIONS.map((option, index) => {
            const isSelected = config.needFinancing === option.value;
            return (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateConfig({ needFinancing: option.value })}
                className={cn(
                  "relative p-5 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "bg-green-50 dark:bg-green-900/30 border-green-600 shadow-lg shadow-green-500/20"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-green-400 hover:shadow-md"
                )}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                )}
                <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {option.label}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Financing Calculator */}
      {config.needFinancing === "yes" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-green-600" />
              Financing Calculator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 48 Month Term */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">48 Months @ 7% APR</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${Math.round(pricing.total * 0.024).toLocaleString()}/mo
                </div>
              </div>

              {/* 60 Month Term */}
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border-2 border-green-600">
                <div className="text-sm text-green-600 mb-1 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  60 Months @ 7% APR (Popular)
                </div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ${pricing.monthlyPayment.toLocaleString()}/mo
                </div>
              </div>

              {/* 72 Month Term */}
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">72 Months @ 7% APR</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${Math.round(pricing.total * 0.017).toLocaleString()}/mo
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              * Rates and terms subject to credit approval. These are estimates only.
            </p>
          </Card>
        </motion.div>
      )}

      {/* ROI Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Potential Return on Investment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$500-$2,000</div>
              <div className="text-sm text-slate-500">Daily Revenue Potential</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">6-18 mo</div>
              <div className="text-sm text-slate-500">Typical ROI Timeline</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">30-50%</div>
              <div className="text-sm text-slate-500">Industry Profit Margin</div>
            </div>
          </div>

          <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
            Food trailer businesses are among the most profitable ventures in the food service industry.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
