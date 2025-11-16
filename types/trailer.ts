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
}

export interface Trailer {
  id: string;
  slug: string;
  name: string;
  type: TrailerType;
  size: TrailerSize;
  price: number;
  isFeatured: boolean;
  isAvailable: boolean;
  images: TrailerImage[];
  shortDescription: string;
  fullDescription: string;
  features: TrailerFeatures;
  specs: TrailerSpecs;
  equipmentList: string[];
  upgrades: TrailerUpgrade[];
  buildLeadTime: string;
  createdAt: string;
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
}
