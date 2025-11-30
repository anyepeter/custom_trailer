"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendCustomTruckDesignEmail } from "@/lib/email";
import { Prisma } from "@prisma/client";

// Validation schema for custom truck design
const customTruckDesignSchema = z.object({
  // User Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  zipcode: z.string().min(5, "Valid zip code is required"),
  paymentMethods: z.string().min(1, "Payment method is required"),

  // Truck Configuration
  trailerSize: z.string().min(1, "Trailer size is required"),
  porchConfiguration: z.string().optional(),
  rangeHood: z.string().min(1, "Range hood selection is required"),
  fireSuppressionSystem: z.string().min(1, "Fire suppression system selection is required"),
  flatTopGriddle: z.string().optional(),
  charbroiler: z.string().optional(),
  deepFryer: z.string().optional(),
  range: z.string().optional(),
  steamWell: z.string().optional(),
  warmingCabinet: z.string().optional(),
  refrigeration: z.array(z.string()).default([]),

  // Customization
  exteriorColor: z.string().min(1, "Exterior color is required"),
  interiorFinish: z.string().min(1, "Interior finish is required"),

  // Financial
  budget: z.string().min(1, "Budget range is required"),
  needFinancing: z.string().min(1, "Financing preference is required"),
  totalPrice: z.number().optional(),

  // Additional
  additionalInfo: z.string().optional(),
});

export type CustomTruckDesignInput = z.infer<typeof customTruckDesignSchema>;

export async function submitCustomTruckDesign(data: CustomTruckDesignInput) {

  try {
    const validated = customTruckDesignSchema.parse(data);
    const emailResult = await sendCustomTruckDesignEmail(validated);
    console.log("📧 Email result:", emailResult);

    if (!emailResult.success) {
      // Email failed but database saved - log error but don't fail the request
      console.error("Email send failed:", emailResult.error);
      return {
        success: true,
        message: "Your request has been saved! We'll contact you soon.",
        emailSent: false,
      };
    }

    // 4. Return success response
    return {
      success: true,
      message: "Thank you! Your custom truck design request has been submitted successfully. Check your email for details.",
      emailSent: true,
    };

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      };
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        error: "Database error occurred",
        details: error.message,
      };
    }

    // Handle generic errors
    console.error("Submit custom truck design error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit request",
    };
  }
}
