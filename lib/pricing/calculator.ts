import {
  TrailerConfiguration,
  PricingBreakdown,
  TRAILER_SIZES,
  PORCH_OPTIONS,
  RANGE_HOOD_OPTIONS,
  FIRE_SUPPRESSION_OPTIONS,
  FLAT_TOP_GRIDDLE_OPTIONS,
  CHARBROILER_OPTIONS,
  DEEP_FRYER_OPTIONS,
  RANGE_OPTIONS,
  STEAM_WELL_OPTIONS,
  WARMING_CABINET_OPTIONS,
  REFRIGERATION_OPTIONS,
  EXTERIOR_COLOR_OPTIONS,
  INTERIOR_FINISH_OPTIONS,
} from "@/types/configurator";

export function calculatePrice(config: Partial<TrailerConfiguration>): PricingBreakdown {
  // Base price from trailer size
  const sizeOption = TRAILER_SIZES.find((s) => s.value === config.trailerSize);
  const basePrice = sizeOption?.basePrice || 0;

  // Porch price
  const porchOption = PORCH_OPTIONS.find((p) => p.value === config.porchConfiguration);
  const porchPrice = porchOption?.price || 0;

  // Equipment prices
  let equipmentPrice = 0;

  // Range Hood
  const rangeHoodOption = RANGE_HOOD_OPTIONS.find((r) => r.value === config.rangeHood);
  equipmentPrice += rangeHoodOption?.price || 0;

  // Fire Suppression
  const fireSuppressionOption = FIRE_SUPPRESSION_OPTIONS.find((f) => f.value === config.fireSuppressionSystem);
  equipmentPrice += fireSuppressionOption?.price || 0;

  // Flat Top Griddle
  const griddleOption = FLAT_TOP_GRIDDLE_OPTIONS.find((g) => g.value === config.flatTopGriddle);
  equipmentPrice += griddleOption?.price || 0;

  // Charbroiler
  const charbroilerOption = CHARBROILER_OPTIONS.find((c) => c.value === config.charbroiler);
  equipmentPrice += charbroilerOption?.price || 0;

  // Deep Fryer
  const deepFryerOption = DEEP_FRYER_OPTIONS.find((d) => d.value === config.deepFryer);
  equipmentPrice += deepFryerOption?.price || 0;

  // Range
  const rangeOption = RANGE_OPTIONS.find((r) => r.value === config.range);
  equipmentPrice += rangeOption?.price || 0;

  // Steam Well
  const steamWellOption = STEAM_WELL_OPTIONS.find((s) => s.value === config.steamWell);
  equipmentPrice += steamWellOption?.price || 0;

  // Warming Cabinet
  const warmingOption = WARMING_CABINET_OPTIONS.find((w) => w.value === config.warmingCabinet);
  equipmentPrice += warmingOption?.price || 0;

  // Refrigeration (multiple selection)
  if (config.refrigeration && Array.isArray(config.refrigeration)) {
    config.refrigeration.forEach((refValue) => {
      const refOption = REFRIGERATION_OPTIONS.find((r) => r.value === refValue);
      if (refOption) {
        equipmentPrice += refOption.price;
      }
    });
  }

  // Customization prices
  let customizationPrice = 0;

  // Exterior Color
  const colorOption = EXTERIOR_COLOR_OPTIONS.find((c) => c.value === config.exteriorColor);
  customizationPrice += colorOption?.price || 0;

  // Interior Finish
  const interiorOption = INTERIOR_FINISH_OPTIONS.find((i) => i.value === config.interiorFinish);
  customizationPrice += interiorOption?.price || 0;

  // Calculate totals
  const subtotal = basePrice + porchPrice + equipmentPrice + customizationPrice;
  const tax = 0; // Tax calculated at final quote
  const total = subtotal + tax;

  // Monthly payment calculation (60 months, 7% APR)
  const interestRate = 0.07 / 12; // Monthly interest rate
  const numberOfPayments = 60;
  const monthlyPayment = total > 0
    ? Math.round((total * interestRate * Math.pow(1 + interestRate, numberOfPayments)) /
        (Math.pow(1 + interestRate, numberOfPayments) - 1))
    : 0;

  return {
    basePrice,
    porchPrice,
    equipmentPrice,
    customizationPrice,
    subtotal,
    tax,
    total,
    monthlyPayment,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
