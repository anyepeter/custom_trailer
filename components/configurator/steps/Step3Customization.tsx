"use client";

import { motion } from "framer-motion";
import { Palette, Check, Sparkles, Shield, Brush } from "lucide-react";
import { TrailerConfiguration, EXTERIOR_COLOR_OPTIONS, INTERIOR_FINISH_OPTIONS } from "@/types/configurator";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step3CustomizationProps {
  config: TrailerConfiguration;
  updateConfig: (updates: Partial<TrailerConfiguration>) => void;
}

export default function Step3Customization({ config, updateConfig }: Step3CustomizationProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4"
        >
          <Palette className="h-4 w-4" />
          Step 3 of 5
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3"
        >
          Make It{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Yours
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          Personalize your trailer with custom colors and finishes. Stand out from the crowd
          with a unique look that matches your brand.
        </motion.p>
      </div>

      {/* Exterior Color Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brush className="h-5 w-5 text-purple-600" />
            Exterior Color
          </h3>
          <p className="text-sm text-slate-500 mt-1">Choose your trailer&apos;s exterior finish</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {EXTERIOR_COLOR_OPTIONS.map((color, index) => {
            const isSelected = config.exteriorColor === color.value;
            return (
              <motion.button
                key={color.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateConfig({ exteriorColor: color.value })}
                className={cn(
                  "relative p-4 rounded-xl border-2 text-left transition-all overflow-hidden",
                  isSelected
                    ? "border-purple-600 shadow-lg shadow-purple-500/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:shadow-md"
                )}
              >
                {/* Color Preview */}
                <div
                  className="w-full h-20 rounded-lg mb-3 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />

                {/* Premium Badge */}
                {color.price > 0 && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Premium
                  </span>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 left-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                )}

                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                  {color.label}
                </div>
                {color.price > 0 ? (
                  <div className="text-sm font-medium text-green-600">
                    +${color.price.toLocaleString()}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400">Included</div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Custom Color Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
        >
          <p className="text-sm text-purple-700 dark:text-purple-300">
            <strong>Custom Colors Available!</strong> Need a specific color to match your brand?
            Let us know in the notes section and we&apos;ll provide a custom quote.
          </p>
        </motion.div>
      </motion.div>

      {/* Interior Finish Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Interior Finish
          </h3>
          <p className="text-sm text-slate-500 mt-1">Select your interior wall and ceiling finish</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTERIOR_FINISH_OPTIONS.map((finish, index) => {
            const isSelected = config.interiorFinish === finish.value;
            return (
              <motion.button
                key={finish.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateConfig({ interiorFinish: finish.value })}
                className={cn(
                  "relative p-5 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "bg-purple-50 dark:bg-purple-900/30 border-purple-600 shadow-lg shadow-purple-500/20"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:shadow-md"
                )}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                )}

                <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {finish.label}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {finish.description}
                </p>
                {finish.price > 0 ? (
                  <div className="text-lg font-bold text-green-600">
                    +${finish.price.toLocaleString()}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400">Included</div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Additional Customization Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20 border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Additional Customizations
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Custom Graphics & Wrap",
                  description: "Full vehicle wrap or custom graphics",
                  price: "From $3,500",
                },
                {
                  title: "LED Lighting Package",
                  description: "Interior & exterior LED accent lighting",
                  price: "From $800",
                },
                {
                  title: "Sound System",
                  description: "Bluetooth speakers & entertainment",
                  price: "From $500",
                },
                {
                  title: "Awning Extension",
                  description: "Retractable awning for outdoor seating",
                  price: "From $1,200",
                },
              ].map((option, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600"
                >
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">
                    {option.title}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    {option.description}
                  </p>
                  <div className="text-sm font-medium text-purple-600">
                    {option.price}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
              These options can be discussed during your consultation. Mention any interest in the notes section.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
