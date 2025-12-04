"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TrailerConfiguration, PricingBreakdown } from "@/types/configurator";
import { calculatePrice } from "@/lib/pricing/calculator";

const STORAGE_KEY = "trailer-configurator";
const AUTO_SAVE_DELAY = 1000; // 1 second debounce

const initialConfig: TrailerConfiguration = {
  // Trailer Basics
  trailerSize: "",
  porchConfiguration: "none",

  // Equipment
  rangeHood: "none",
  fireSuppressionSystem: "no",
  flatTopGriddle: "none",
  charbroiler: "none",
  deepFryer: "none",
  range: "none",
  steamWell: "none",
  warmingCabinet: "none",
  refrigeration: [],
  additionalInfo: "",

  // Customization
  exteriorColor: "white",
  interiorFinish: "standard",

  // Financial
  budget: "",
  needFinancing: "",

  // Contact
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  zipcode: "",
  paymentMethods: "",
};

export function useConfigurator() {
  const [config, setConfig] = useState<TrailerConfiguration>(initialConfig);
  const [currentStep, setCurrentStep] = useState(1);
  const [pricing, setPricing] = useState<PricingBreakdown>({
    basePrice: 0,
    porchPrice: 0,
    equipmentPrice: 0,
    customizationPrice: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    monthlyPayment: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Load saved configuration from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setConfig(parsed.config || initialConfig);
          setCurrentStep(parsed.currentStep || 1);
        }
      } catch (error) {
        console.error("Error loading saved configuration:", error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Auto-save configuration to localStorage (debounced)
  useEffect(() => {
    if (!isLoaded) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            config,
            currentStep,
            savedAt: new Date().toISOString(),
          })
        );
      } catch (error) {
        console.error("Error saving configuration:", error);
      }
    }, AUTO_SAVE_DELAY);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [config, currentStep, isLoaded]);

  // Update pricing when configuration changes
  useEffect(() => {
    const newPricing = calculatePrice(config);
    setPricing(newPricing);
  }, [config]);

  // Update configuration
  const updateConfig = useCallback((updates: Partial<TrailerConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  // Reset configuration
  const resetConfig = useCallback(() => {
    setConfig(initialConfig);
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Step navigation
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  }, []);

  // Validation
  const isStepValid = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1:
          return !!config.trailerSize;
        case 2:
          return !!config.rangeHood && !!config.fireSuppressionSystem;
        case 3:
          return !!config.exteriorColor && !!config.interiorFinish;
        case 4:
          return !!config.budget && !!config.needFinancing;
        case 5:
          return (
            !!config.firstName?.trim() &&
            !!config.lastName?.trim() &&
            !!config.email?.trim() &&
            !!config.phoneNumber?.trim() &&
            !!config.address?.trim() &&
            !!config.zipcode?.trim() &&
            !!config.paymentMethods?.trim()
          );
        default:
          return false;
      }
    },
    [config]
  );

  // Get completion percentage
  const getCompletionPercentage = useCallback((): number => {
    let completed = 0;
    const fields = [
      config.trailerSize,
      config.porchConfiguration !== "none" ? config.porchConfiguration : null,
      config.rangeHood !== "none" ? config.rangeHood : null,
      config.fireSuppressionSystem !== "no" ? config.fireSuppressionSystem : null,
      config.exteriorColor,
      config.interiorFinish,
      config.budget,
      config.firstName,
      config.lastName,
      config.email,
      config.phoneNumber,
      config.zipcode,
    ];

    const requiredFields = [
      config.trailerSize,
      config.rangeHood,
      config.fireSuppressionSystem,
      config.budget,
      config.firstName,
      config.lastName,
      config.email,
      config.phoneNumber,
      config.address,
      config.zipcode,
      config.paymentMethods,
    ];

    requiredFields.forEach((field) => {
      if (field && field !== "none" && field !== "no") {
        completed++;
      }
    });

    return Math.round((completed / requiredFields.length) * 100);
  }, [config]);

  return {
    config,
    updateConfig,
    resetConfig,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    goToStep,
    pricing,
    isStepValid,
    getCompletionPercentage,
    isLoaded,
  };
}
