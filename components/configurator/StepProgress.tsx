"use client";

import { motion } from "framer-motion";
import { Check, Truck, Utensils, Palette, DollarSign, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  completionPercentage: number;
  isStepValid: (step: number) => boolean;
  onStepClick: (step: number) => void;
}

const STEPS = [
  { id: 1, title: "Trailer", icon: Truck },
  { id: 2, title: "Equipment", icon: Utensils },
  { id: 3, title: "Customize", icon: Palette },
  { id: 4, title: "Budget", icon: DollarSign },
  { id: 5, title: "Contact", icon: User },
];

export default function StepProgress({
  currentStep,
  completionPercentage,
  isStepValid,
  onStepClick,
}: StepProgressProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      {/* <div className="mb-4">
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div> */}

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id || (currentStep === step.id && isStepValid(step.id));
          const isPastStep = currentStep > step.id;
          const canClick = isPastStep || (currentStep === step.id);

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => canClick && onStepClick(step.id)}
                disabled={!canClick}
                className={cn(
                  "relative flex flex-col items-center gap-1 transition-all",
                  canClick ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                )}
              >
                {/* Step Circle */}
                <motion.div
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                  )}
                  whileHover={canClick ? { scale: 1.05 } : {}}
                  whileTap={canClick ? { scale: 0.95 } : {}}
                >
                  {isCompleted && !isActive ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </motion.div>

                {/* Step Title */}
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-400"
                  )}
                >
                  {step.title}
                </span>
              </button>

              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full",
                        isPastStep
                          ? "bg-green-500"
                          : isActive
                          ? "bg-gradient-to-r from-blue-600 to-blue-300"
                          : "bg-slate-200 dark:bg-slate-700"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: isPastStep ? "100%" : isActive ? "50%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
