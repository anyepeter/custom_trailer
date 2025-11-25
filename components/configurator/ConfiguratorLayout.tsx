"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import StepProgress from "./StepProgress";
import PriceCalculator from "./PriceCalculator";
import ConfigurationSummary from "./ConfigurationSummary";
import { TrailerConfiguration, PricingBreakdown, CONFIGURATOR_STEPS } from "@/types/configurator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfiguratorLayoutProps {
  children: ReactNode;
  currentStep: number;
  config: TrailerConfiguration;
  pricing: PricingBreakdown;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isStepValid: (step: number) => boolean;
  completionPercentage: number;
}

export default function ConfiguratorLayout({
  children,
  currentStep,
  config,
  pricing,
  onStepChange,
  onNext,
  onPrevious,
  isStepValid,
  completionPercentage,
}: ConfiguratorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const canGoNext = currentStep < CONFIGURATOR_STEPS.length && isStepValid(currentStep);
  const canGoPrevious = currentStep > 1;
  const isLastStep = currentStep === CONFIGURATOR_STEPS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header with Progress */}
      <header className="sticky top-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-4">

              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Design Your Trailer
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  Step {currentStep} of {CONFIGURATOR_STEPS.length}
                </p>
              </div>
            </div> */}

            {/* Mobile Price */}
            {/* <div className="md:hidden text-right">
              <p className="text-xs text-slate-500">Estimated Total</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                ${pricing.total.toLocaleString()}
              </p>
            </div> */}
          </div>

          <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-[100%] bg-slate-100 lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isSidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

          {/* Progress Bar */}
          <div className="py-4">
            <StepProgress
              currentStep={currentStep}
              completionPercentage={completionPercentage}
              isStepValid={isStepValid}
              onStepClick={onStepChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 z-50 overflow-y-auto lg:hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold">Configuration</h2>
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <ConfigurationSummary config={config} pricing={pricing} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-40">
              <ConfigurationSummary config={config} pricing={pricing} />
            </div>
          </aside>

          {/* Main Form Area */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!canGoPrevious}
                className={cn(
                  "gap-2 transition-all",
                  !canGoPrevious && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {/* <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="hidden sm:inline">Step {currentStep} of {CONFIGURATOR_STEPS.length}</span>
                <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / CONFIGURATOR_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div> */}

              <Button
                onClick={onNext}
                disabled={!canGoNext}
                className={cn(
                  "gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all",
                  !canGoNext && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLastStep ? "Submit Quote" : "Next"}
                {!isLastStep && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </main>

          {/* Desktop Price Calculator */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-40">
              <PriceCalculator pricing={pricing} />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Price Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4 z-30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500">Total Price</p>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ${pricing.total.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">${pricing.monthlyPayment.toLocaleString()}/mo</p>
          </div>
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
          >
            {isLastStep ? "Get Quote" : "Continue"}
          </Button>
        </div>
      </div>

      {/* Bottom Padding for Mobile */}
      <div className="h-24 lg:hidden" />
    </div>
  );
}
