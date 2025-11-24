import { z } from "zod";

// Concession Features Schema
export const concessionFeaturesSchema = z.object({
  range_hood_size: z.string().optional(),
  griddle_size: z.string().optional(),
  fryer_size: z.string().optional(),
  range_type: z.string().optional(),
  charbroiler_size: z.string().optional(),
  warming: z.string().optional(),
  other_equipment: z.string().optional(),
  smoker: z.string().optional(),
  reach_in_fridge: z.string().optional(),
  reach_in_freezer: z.string().optional(),
  refrigerated_prep_table: z.string().optional(),
  gas_lines: z.string().optional(),
  fire_suppression: z.string().optional(),
  serving_window: z.string().optional(),
  plumbing: z.string().optional(),
  bathroom_option: z.string().optional(),
  additional_sinks: z.string().optional(),
  electrical: z.string().optional(),
  air_conditioning: z.string().optional(),
}).catchall(z.string().optional());

// Additional Option Schema
export const additionalOptionSchema = z.object({
  name: z.string().min(1, "Option name is required"),
  price: z.number().optional(),
});

// Main Truck Form Schema
export const truckFormSchema = z.object({
  name: z.string().min(1, "Truck name is required").max(200),
  modelCode: z.string().optional(),
  actualPrice: z.number().min(0, "Price must be positive").optional(),
  regularPrice: z.number().min(0, "Price must be positive").optional(),
  description: z.string().optional(),
  images: z.array(z.string().url("Must be a valid URL")),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  concessionFeatures: concessionFeaturesSchema.optional(),
  specialSpecifications: z.array(z.string().min(1, "Specification cannot be empty")).optional(),
  additionalOptions: z.array(additionalOptionSchema).optional(),
});

export type TruckFormSchema = z.infer<typeof truckFormSchema>;

// Build Request Update Schema
export const buildRequestUpdateSchema = z.object({
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
  notes: z.string().optional(),
});

export type BuildRequestUpdateSchema = z.infer<typeof buildRequestUpdateSchema>;
