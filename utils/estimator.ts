// Client-side cost estimator for food trucks

export type TruckSize = 'small' | 'medium' | 'large' | 'xl';
export type EquipmentLevel = 'basic' | 'standard' | 'premium' | 'deluxe';

export interface EstimateInput {
  size: TruckSize;
  equipmentLevel: EquipmentLevel;
}

export interface EstimateResult {
  basePrice: number;
  equipmentCost: number;
  totalEstimate: number;
  monthlyPayment: number; // Assumes 60-month term at 7% APR
  range: {
    min: number;
    max: number;
  };
}

// Base prices by truck size (in USD)
const BASE_PRICES: Record<TruckSize, number> = {
  small: 45000,   // 10-14 ft
  medium: 65000,  // 16-20 ft
  large: 85000,   // 22-26 ft
  xl: 110000,     // 28+ ft
};

// Equipment package costs
const EQUIPMENT_COSTS: Record<EquipmentLevel, number> = {
  basic: 5000,     // Essential cooking equipment
  standard: 15000, // Standard commercial kitchen
  premium: 30000,  // High-end appliances
  deluxe: 50000,   // Top-of-the-line everything
};

// Calculate monthly payment (simple approximation)
function calculateMonthlyPayment(principal: number, annualRate: number = 0.07, months: number = 60): number {
  const monthlyRate = annualRate / 12;
  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                  (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(payment);
}

/**
 * Calculate estimated cost for a food truck configuration
 * @param input - Size and equipment level selections
 * @returns Detailed cost estimate with range
 */
export function calculateEstimate(input: EstimateInput): EstimateResult {
  const basePrice = BASE_PRICES[input.size];
  const equipmentCost = EQUIPMENT_COSTS[input.equipmentLevel];
  const totalEstimate = basePrice + equipmentCost;

  // Add ±10% range for customization variations
  const range = {
    min: Math.round(totalEstimate * 0.9),
    max: Math.round(totalEstimate * 1.1),
  };

  const monthlyPayment = calculateMonthlyPayment(totalEstimate);

  return {
    basePrice,
    equipmentCost,
    totalEstimate,
    monthlyPayment,
    range,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get human-readable labels
 */
export const SIZE_LABELS: Record<TruckSize, string> = {
  small: '10-14 ft (Compact)',
  medium: '16-20 ft (Standard)',
  large: '22-26 ft (Large)',
  xl: '28+ ft (Extra Large)',
};

export const EQUIPMENT_LABELS: Record<EquipmentLevel, string> = {
  basic: 'Basic (Essential Equipment)',
  standard: 'Standard (Full Commercial Kitchen)',
  premium: 'Premium (High-End Appliances)',
  deluxe: 'Deluxe (Top-of-the-Line)',
};
