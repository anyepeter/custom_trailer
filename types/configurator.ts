// Trailer Configuration Types
export interface TrailerConfiguration {
  // Trailer Basics
  trailerSize: string;
  porchConfiguration: string;

  // Equipment
  rangeHood: string;
  fireSuppressionSystem: string;
  flatTopGriddle: string;
  charbroiler: string;
  deepFryer: string;
  range: string;
  steamWell: string;
  warmingCabinet: string;
  refrigeration: string[];
  additionalInfo: string;

  // Customization
  exteriorColor: string;
  interiorFinish: string;

  // Financial
  budget: string;
  needFinancing: string;

  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  zipcode: string;
  paymentMethods: string;
}

export interface PricingBreakdown {
  basePrice: number;
  porchPrice: number;
  equipmentPrice: number;
  customizationPrice: number;
  subtotal: number;
  tax: number;
  total: number;
  monthlyPayment: number;
}

// Step Configuration
export const CONFIGURATOR_STEPS = [
  { id: 1, title: "Trailer Basics", description: "Size & Configuration" },
  { id: 2, title: "Equipment", description: "Kitchen Setup" },
  { id: 3, title: "Customization", description: "Colors & Finishes" },
  { id: 4, title: "Budget", description: "Financing Options" },
  { id: 5, title: "Contact", description: "Get Your Quote" },
] as const;

// Trailer Size Options
export const TRAILER_SIZES = [
  { value: "8x12", label: "8' x 12'", basePrice: 35000, description: "Compact - Perfect for starting out" },
  { value: "8x14", label: "8' x 14'", basePrice: 38000, description: "Small - Great for events" },
  { value: "8.5x16", label: "8.5' x 16'", basePrice: 42000, description: "Medium - Most versatile" },
  { value: "8.5x18", label: "8.5' x 18'", basePrice: 45000, description: "Medium-Large - Room to grow" },
  { value: "8.5x20", label: "8.5' x 20'", basePrice: 48000, description: "Large - Full kitchen setup" },
  { value: "8.5x22", label: "8.5' x 22'", basePrice: 52000, description: "Large - High volume" },
  { value: "8.5x24", label: "8.5' x 24'", basePrice: 54000, description: "Extra Large - Full service" },
  { value: "8.5x26", label: "8.5' x 26'", basePrice: 58000, description: "Extra Large - Premium" },
  { value: "8.5x28", label: "8.5' x 28'", basePrice: 62000, description: "Commercial - Max capacity" },
  { value: "8.5x30", label: "8.5' x 30'", basePrice: 66000, description: "Commercial Plus" },
  { value: "8.5x32", label: "8.5' x 32'", basePrice: 70000, description: "Enterprise - Ultimate" },
] as const;

// Porch Options
export const PORCH_OPTIONS = [
  { value: "none", label: "No Porch", price: 0 },
  { value: "4ft", label: "4ft Porch", price: 3200 },
  { value: "6ft", label: "6ft Porch", price: 4800 },
  { value: "8ft", label: "8ft Porch", price: 6400 },
  { value: "10ft", label: "10ft Porch", price: 8000 },
  { value: "12ft", label: "12ft Porch", price: 9600 },
] as const;

// Range Hood Options
export const RANGE_HOOD_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "4ft", label: "4ft", price: 1200 },
  { value: "5ft", label: "5ft", price: 1500 },
  { value: "6ft", label: "6ft", price: 1800 },
  { value: "7ft", label: "7ft", price: 2100 },
  { value: "8ft", label: "8ft", price: 2400 },
  { value: "custom", label: "Custom", price: 0 },
] as const;

// Fire Suppression Options
export const FIRE_SUPPRESSION_OPTIONS = [
  { value: "yes", label: "Yes - Include", price: 3500 },
  { value: "no", label: "No - Don't Include", price: 0 },
  { value: "info", label: "Need More Info", price: 0 },
] as const;

// Flat Top Griddle Options
export const FLAT_TOP_GRIDDLE_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "24-inch", label: '24"', price: 1800 },
  { value: "36-inch", label: '36"', price: 2800 },
  { value: "48-inch", label: '48"', price: 3600 },
  { value: "60-inch", label: '60"', price: 4500 },
  { value: "72-inch", label: '72"', price: 5400 },
] as const;

// Charbroiler Options
export const CHARBROILER_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "24-inch", label: '24"', price: 2200 },
  { value: "36-inch", label: '36"', price: 3200 },
  { value: "48-inch", label: '48"', price: 4200 },
  { value: "60-inch", label: '60"', price: 5200 },
] as const;

// Deep Fryer Options
export const DEEP_FRYER_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "single", label: "Single Basket", price: 1800 },
  { value: "double", label: "Double Basket", price: 3200 },
  { value: "triple", label: "Triple Basket", price: 4500 },
] as const;

// Range Options
export const RANGE_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "2-burner", label: "2-Burner", price: 1200 },
  { value: "4-burner", label: "4-Burner", price: 2200 },
  { value: "6-burner", label: "6-Burner", price: 3200 },
  { value: "8-burner", label: "8-Burner", price: 4200 },
] as const;

// Steam Well Options
export const STEAM_WELL_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "2-well", label: "2-Well", price: 1400 },
  { value: "3-well", label: "3-Well", price: 1800 },
  { value: "4-well", label: "4-Well", price: 2200 },
  { value: "5-well", label: "5-Well", price: 2600 },
] as const;

// Warming Cabinet Options
export const WARMING_CABINET_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "half-height", label: "Half-Height", price: 1600 },
  { value: "full-height", label: "Full-Height", price: 2400 },
  { value: "insulated", label: "Insulated Holding", price: 3200 },
] as const;

// Refrigeration Options
export const REFRIGERATION_OPTIONS = [
  { value: "none", label: "None", price: 0 },
  { value: "reach-in-fridge", label: "Reach-In Refrigerator", price: 2500 },
  { value: "reach-in-freezer", label: "Reach-In Freezer", price: 3000 },
  { value: "under-counter-prep", label: "Under-Counter Prep Table", price: 2200 },
  { value: "under-counter-fridge", label: "Under-Counter Refrigerator", price: 1800 },
  { value: "under-counter-freezer", label: "Under-Counter Freezer", price: 2200 },
  { value: "worktop-fridge", label: "Worktop Refrigerator", price: 2800 },
  { value: "worktop-freezer", label: "Worktop Freezer", price: 3200 },
  { value: "chef-base", label: "Chef Base Refrigerator", price: 2600 },
  { value: "chest-freezer", label: "Chest Freezer", price: 1500 },
  { value: "merchandiser", label: "Glass Front Merchandiser", price: 3500 },
] as const;

// Exterior Color Options
export const EXTERIOR_COLOR_OPTIONS = [
  { value: "white", label: "Classic White", hex: "#FFFFFF", price: 0 },
  { value: "black", label: "Midnight Black", hex: "#1a1a1a", price: 0 },
  { value: "silver", label: "Silver Metallic", hex: "#C0C0C0", price: 0 },
  { value: "red", label: "Fire Engine Red", hex: "#DC2626", price: 500 },
  { value: "blue", label: "Ocean Blue", hex: "#2563EB", price: 500 },
  { value: "green", label: "Forest Green", hex: "#16A34A", price: 500 },
  { value: "orange", label: "Sunset Orange", hex: "#EA580C", price: 500 },
  { value: "custom", label: "Custom Color", hex: "#9333EA", price: 800 },
] as const;

// Interior Finish Options
export const INTERIOR_FINISH_OPTIONS = [
  { value: "standard", label: "Standard Aluminum", description: "Durable stainless aluminum walls", price: 0 },
  { value: "premium", label: "Premium Stainless", description: "Full stainless steel interior", price: 2500 },
  { value: "diamond", label: "Diamond Plate", description: "Textured diamond plate finish", price: 1500 },
] as const;

// Budget Options
export const BUDGET_OPTIONS = [
  { value: "under-30k", label: "Under $30k" },
  { value: "30k-40k", label: "$30k - $40k" },
  { value: "40k-50k", label: "$40k - $50k" },
  { value: "50k-60k", label: "$50k - $60k" },
  { value: "60k-70k", label: "$60k - $70k" },
  { value: "70k-80k", label: "$70k - $80k" },
  { value: "80k-100k", label: "$80k - $100k" },
  { value: "over-100k", label: "Over $100k" },
  { value: "flexible", label: "Flexible" },
] as const;

// Financing Options
export const FINANCING_OPTIONS = [
  { value: "yes", label: "Yes - I need financing" },
  { value: "no", label: "No - I don't need financing" },
  { value: "maybe", label: "Maybe - Tell me more" },
] as const;

// Payment Method Options
export const PAYMENT_METHOD_OPTIONS = [
  { value: "cash", label: "Cash" },
  { value: "financing", label: "Financing" },
  { value: "bank-loan", label: "Bank Loan" },
  { value: "credit-card", label: "Credit Card" },
  { value: "check", label: "Check" },
  { value: "wire-transfer", label: "Wire Transfer" },
  { value: "other", label: "Other" },
] as const;
