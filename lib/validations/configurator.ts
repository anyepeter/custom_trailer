import { z } from "zod";

// Step 1 - Trailer Basics Schema
export const trailerBasicsSchema = z.object({
  trailerSize: z.string().min(1, "Trailer size is required"),
  porchConfiguration: z.string().default("none"),
});

// Step 2 - Equipment Schema
export const equipmentSchema = z.object({
  rangeHood: z.string().min(1, "Range hood selection is required"),
  fireSuppressionSystem: z.string().min(1, "Fire suppression selection is required"),
  flatTopGriddle: z.string().optional().default("none"),
  charbroiler: z.string().optional().default("none"),
  deepFryer: z.string().optional().default("none"),
  range: z.string().optional().default("none"),
  steamWell: z.string().optional().default("none"),
  warmingCabinet: z.string().optional().default("none"),
  refrigeration: z.array(z.string()).optional().default([]),
  additionalInfo: z.string().optional().default(""),
});

// Step 3 - Customization Schema
export const customizationSchema = z.object({
  exteriorColor: z.string().min(1, "Exterior color is required").default("white"),
  interiorFinish: z.string().min(1, "Interior finish is required").default("standard"),
});

// Step 4 - Financial Schema
export const financialSchema = z.object({
  budget: z.string().min(1, "Budget selection is required"),
  needFinancing: z.string().min(1, "Financing preference is required"),
});

// Step 5 - Contact Schema
export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required").max(200),
  zipcode: z
    .string()
    .min(1, "Zip code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"),
  paymentMethods: z.string().min(1, "Payment method is required"),
});

// Full Configuration Schema
export const configuratorFormSchema = z.object({
  // Trailer Basics
  trailerSize: z.string().min(1, "Trailer size is required"),
  porchConfiguration: z.string().default("none"),

  // Equipment
  rangeHood: z.string().min(1, "Range hood selection is required"),
  fireSuppressionSystem: z.string().min(1, "Fire suppression selection is required"),
  flatTopGriddle: z.string().optional().default("none"),
  charbroiler: z.string().optional().default("none"),
  deepFryer: z.string().optional().default("none"),
  range: z.string().optional().default("none"),
  steamWell: z.string().optional().default("none"),
  warmingCabinet: z.string().optional().default("none"),
  refrigeration: z.array(z.string()).optional().default([]),
  additionalInfo: z.string().optional().default(""),

  // Customization
  exteriorColor: z.string().default("white"),
  interiorFinish: z.string().default("standard"),

  // Financial
  budget: z.string().min(1, "Budget selection is required"),
  needFinancing: z.string().min(1, "Financing preference is required"),

  // Contact
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required").max(200),
  zipcode: z
    .string()
    .min(1, "Zip code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"),
  paymentMethods: z.string().min(1, "Payment method is required"),

  // Price
  totalPrice: z.number().optional(),
});

export type ConfiguratorFormData = z.infer<typeof configuratorFormSchema>;
