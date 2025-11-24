import { Truck, BuildRequest } from "@prisma/client";

// Truck types
export type TruckWithDetails = Truck;

export interface ConcessionFeatures {
  range_hood_size?: string;
  griddle_size?: string;
  fryer_size?: string;
  range_type?: string;
  charbroiler_size?: string;
  warming?: string;
  other_equipment?: string;
  smoker?: string;
  reach_in_fridge?: string;
  reach_in_freezer?: string;
  refrigerated_prep_table?: string;
  gas_lines?: string;
  fire_suppression?: string;
  serving_window?: string;
  plumbing?: string;
  bathroom_option?: string;
  additional_sinks?: string;
  electrical?: string;
  air_conditioning?: string;
  [key: string]: string | undefined;
}

export interface AdditionalOption {
  name: string;
  price?: number;
}

export interface TruckFormData {
  name: string;
  modelCode?: string;
  actualPrice?: number;
  regularPrice?: number;
  description?: string;
  images: string[];
  videoUrl?: string;
  concessionFeatures?: ConcessionFeatures;
  specialSpecifications?: string[];
  additionalOptions?: AdditionalOption[];
}

// Build Request types
export type BuildRequestWithDetails = BuildRequest;

export interface BuildRequestFilters {
  status?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
