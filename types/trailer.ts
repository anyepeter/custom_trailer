// TypeScript types for Food Trailer inventory

export type TrailerType =
  | "BBQ"
  | "Coffee"
  | "Cold Kitchen"
  | "Hot Kitchen"
  | "Pizza"
  | "Porch"
  | "Gooseneck";

export type TrailerSize =
  | "7x12"
  | "7x14"
  | "7x16"
  | "8.5x16"
  | "8.5x18"
  | "8.5x20"
  | "8.5x24"
  | "8.5x28";

export interface TrailerFeatures {
  refrigeration: boolean;
  rangeHood: boolean;
  griddle24: boolean;
  deepFryer: boolean;
  range: boolean;
  charbroiler24: boolean;
  gasLines: boolean;
  threeCompartmentSink: boolean;
  handwashSink: boolean;
  fireSuppressionSystem: boolean;
  ansulSystem: boolean;
}

// Enhanced detailed specifications
export interface DetailedSpecs {
  // Physical Dimensions
  physicalDimensions: {
    kitchenLength: string;
    porchDimensions?: string;
    interiorHeight: string;
    exteriorLength: string;
    exteriorWidth: string;
    exteriorHeight: string;
  };
  // Structural Components
  structural: {
    exteriorMaterial: string;
    exteriorThickness: string;
    frameSpecs: string;
    tongueSpecs: string;
    axleSpecs: string;
    axleWeightRating: string;
  };
  // Exterior Features
  exterior: {
    colorOptions: string[];
    trimPackage: string;
    fenderSpecs: string;
    wheelOptions: string;
    tireSpecs: string;
  };
  // Safety & Utility
  safetyUtility: {
    propaneCage: string;
    generatorBox?: string;
    jacks: string;
    jackQuantity: number;
    spareTire: boolean;
    ledFloodLights: number;
    interiorLighting: string;
    awning?: string;
  };
  // Interior Features
  interior: {
    wallFinish: string;
    ceilingFinish: string;
    flooringType: string;
    insulationDetails: string;
    interiorLighting: string;
  };
  // Kitchen Equipment
  kitchenEquipment: {
    rangeHoodSpecs?: string;
    workTableDimensions: string;
    cabinetDetails: string;
    doorSpecs: string;
    freshWaterCapacity: string;
    greyWaterCapacity: string;
    electricalOutlets: number;
    fireSuppressionSystem?: string;
  };
}

// Legacy specs interface for backward compatibility
export interface TrailerSpecs {
  exteriorLength: string;
  exteriorWidth: string;
  exteriorHeight: string;
  interiorHeight: string;
  weight: string;
  axles: string;
  jack: string;
  wallMaterial: string;
  floorMaterial: string;
  roofMaterial: string;
  insulation: string;
}

export interface TrailerImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface TrailerUpgrade {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Safety" | "Equipment" | "Aesthetic" | "Structural";
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Trailer {
  id: string;
  slug: string;
  modelNumber: string;
  name: string;
  type: TrailerType;
  size: TrailerSize;
  price: number;
  isFeatured: boolean;
  isAvailable: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  images: TrailerImage[];
  virtualTourUrl?: string;
  shortDescription: string;
  fullDescription: string;
  features: TrailerFeatures;
  specs: TrailerSpecs;
  detailedSpecs?: DetailedSpecs;
  equipmentList: string[];
  upgrades: TrailerUpgrade[];
  buildLeadTime: string;
  createdAt: string;
  relatedTrailerIds?: string[];
}

export interface FilterOptions {
  types: TrailerType[];
  sizes: TrailerSize[];
  priceRange: {
    min: number;
    max: number;
  };
  features: Partial<TrailerFeatures>;
}

export type SortOption =
  | "featured"
  | "price-low-high"
  | "price-high-low"
  | "size-asc"
  | "size-desc"
  | "type-az";

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  trailerId: string;
  message: string;
  requestedChanges?: string;
  estimatedStartDate?: string;
  selectedUpgrades?: string[];
}

// Financing types
export interface FinancingOption {
  id: string;
  type: "personal" | "commercial";
  title: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
}

// Compliance types
export interface ComplianceInfo {
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
}
