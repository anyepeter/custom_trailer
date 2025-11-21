"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, PartyPopper, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConfiguratorLayout from "@/components/configurator/ConfiguratorLayout";
import Step1Trailer from "@/components/configurator/steps/Step1Trailer";
import Step2Equipment from "@/components/configurator/steps/Step2Equipment";
import Step3Customization from "@/components/configurator/steps/Step3Customization";
import Step4Financial from "@/components/configurator/steps/Step4Financial";
import Step5Contact from "@/components/configurator/steps/Step5Contact";
import { useConfigurator } from "@/lib/hooks/useConfigurator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from "canvas-confetti";

export default function ConfiguratorPage() {
  const router = useRouter();
  const {
    config,
    updateConfig,
    currentStep,
    setCurrentStep,
    pricing,
    isStepValid,
    getCompletionPercentage,
  } = useConfigurator();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateContactStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!config.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!config.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!config.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!config.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[\d\s\-\(\)\+]+$/.test(config.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!config.zipcode?.trim()) {
      newErrors.zipcode = "Zip code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(config.zipcode)) {
      newErrors.zipcode = "Please enter a valid zip code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === 5) {
      // Final step - submit
      if (!validateContactStep()) {
        return;
      }
      await handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (step: number) => {
    // Only allow going to completed steps or current step
    if (step <= currentStep || isStepValid(step - 1)) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/configure/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...config,
          totalPrice: pricing.total,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit configuration");
      }

      // Success - trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsSubmitted(true);

      // Clear localStorage
      localStorage.removeItem("trailer-configurator");
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError("There was an error submitting your configuration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
        <Navbar />

        <div className="container mx-auto px-4 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <PartyPopper className="h-12 w-12 text-white" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Quote Request Submitted!
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you, {config.firstName}! We&apos;ve received your custom trailer configuration.
              Our team will review your selections and send you a detailed quote within 24 hours.
            </p>

            <Card className="p-6 bg-white/80 backdrop-blur-lg border-slate-200 mb-8 text-left">
              <h2 className="font-bold text-slate-900 mb-4">Quote Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Trailer Size</span>
                  <span className="font-medium">{config.trailerSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Total</span>
                  <span className="font-bold text-blue-600">${pricing.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Payment</span>
                  <span className="font-medium">${pricing.monthlyPayment.toLocaleString()}/mo</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  Confirmation sent to: <strong>{config.email}</strong>
                </p>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Design Another Trailer
              </Button>
              <Button
                onClick={() => router.push("/shop")}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                Browse Pre-Built Trailers
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Trailer config={config} updateConfig={updateConfig} />;
      case 2:
        return <Step2Equipment config={config} updateConfig={updateConfig} />;
      case 3:
        return <Step3Customization config={config} updateConfig={updateConfig} />;
      case 4:
        return <Step4Financial config={config} updateConfig={updateConfig} pricing={pricing} />;
      case 5:
        return <Step5Contact config={config} updateConfig={updateConfig} pricing={pricing} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <main>
      <Navbar />

      {/* Submitting Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-xl"
            >
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Submitting Your Configuration
              </h3>
              <p className="text-slate-500">Please wait while we process your request...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {submitError}
            <button
              onClick={() => setSubmitError(null)}
              className="ml-4 font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfiguratorLayout
        currentStep={currentStep}
        config={config}
        pricing={pricing}
        onStepChange={handleStepChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isStepValid={isStepValid}
        completionPercentage={getCompletionPercentage()}
      >
        {renderStep()}
      </ConfiguratorLayout>
    </main>
  );
}
