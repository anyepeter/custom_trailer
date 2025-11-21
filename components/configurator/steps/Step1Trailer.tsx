"use client";

import { motion } from "framer-motion";
import { Truck, Check, Info, Maximize2 } from "lucide-react";
import { TrailerConfiguration, TRAILER_SIZES, PORCH_OPTIONS } from "@/types/configurator";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step1TrailerProps {
  config: TrailerConfiguration;
  updateConfig: (updates: Partial<TrailerConfiguration>) => void;
}

export default function Step1Trailer({ config, updateConfig }: Step1TrailerProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4"
        >
          <Truck className="h-4 w-4" />
          Step 1 of 5
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3"
        >
          Design Your Dream{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Food Trailer
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          Professional-grade trailers custom-built for your culinary vision.
          Start by selecting your trailer size and configuration.
        </motion.p>
      </div>

      {/* What's Included Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border-emerald-200 dark:border-emerald-800">
          <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
            <Check className="h-5 w-5" />
            What&apos;s Included in Every Trailer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-sm">
            {[
              "Complete water package (3-bay sinks, hand-washing sink, heater, pump, tanks)",
              "Serving window",
              "Complete electrical package",
              "7'6\" Interior Height (upgradeable)",
              "Stainless aluminum walls and ceiling (Insulated)",
              ".080 Exterior skin (all colors available)",
              "Rubber coin floor (seamless)",
              "Upgraded 8\" main frame",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300"
              >
                <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs">{feature}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Trailer Size Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Maximize2 className="h-5 w-5 text-blue-600" />
              Select Trailer Size
            </h3>
            <p className="text-sm text-slate-500 mt-1">Choose the size that fits your business needs</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {TRAILER_SIZES.map((size, index) => {
            const isSelected = config.trailerSize === size.value;
            return (
              <motion.button
                key={size.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateConfig({ trailerSize: size.value })}
                className={cn(
                  "relative p-4 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-600 shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md"
                )}
              >
                {/* Popular Badge */}
                {size.value === "8.5x20" && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                    Popular
                  </span>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                )}

                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {size.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {size.description}
                </div>
                <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ${size.basePrice.toLocaleString()}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Size Comparison Visual */}
        {config.trailerSize && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Size Comparison
            </p>
            <div className="relative h-16 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
              <motion.div
                className="absolute left-4 bottom-2 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded"
                initial={{ width: 0 }}
                animate={{
                  width: `${(parseInt(config.trailerSize.split("x")[1]) / 32) * 80}%`,
                }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute left-2 top-1 text-xs text-slate-500">Your trailer</div>
              <div className="absolute right-4 bottom-2 w-4 h-6 bg-slate-400 rounded" title="Person for scale" />
              <div className="absolute right-2 top-1 text-xs text-slate-500">Person</div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Porch Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              Porch Configuration
            </h3>
            <p className="text-sm text-slate-500 mt-1">Add outdoor serving space to your trailer</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PORCH_OPTIONS.map((porch, index) => {
            const isSelected = config.porchConfiguration === porch.value;
            return (
              <motion.button
                key={porch.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateConfig({ porchConfiguration: porch.value })}
                className={cn(
                  "relative p-3 sm:p-4 rounded-xl border-2 text-center transition-all",
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-600 shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md"
                )}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}

                <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1">
                  {porch.label}
                </div>
                {porch.price > 0 ? (
                  <div className="text-sm font-medium text-green-600">
                    +${porch.price.toLocaleString()}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400">Included</div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Porch Info */}
        {config.porchConfiguration !== "none" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Porch Benefits
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  A porch provides additional outdoor serving space, shade for customers,
                  and a professional appearance. Great for festivals, events, and high-traffic locations.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
