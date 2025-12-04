"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail, sendOrderNotificationToSales } from "@/lib/orderEmails";

// Validation schema for order
const orderSchema = z.object({
  // User Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),

  // Truck Information
  truckName: z.string().min(1, "Truck name is required"),
  truckSize: z.string().min(1, "Truck size is required"),
  truckType: z.string().optional(),
  truckImage: z.string().min(1, "Truck image is required"),
  truckImages: z.array(z.string()).default([]),
  upgrades: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  })).default([]),

  // Pricing
  price: z.number().positive("Price must be positive"),
  total: z.number().positive("Total must be positive"),

  // Payment
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export type OrderInput = z.infer<typeof orderSchema>;

export async function submitOrder(data: OrderInput) {
  try {
    // Validate input
    const validated = orderSchema.parse(data);

    // Create order in database
    const order = await prisma.order.create({
      data: {
        // User Information
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phone: validated.phone,
        address: validated.address,
        city: validated.city,
        state: validated.state,
        zipCode: validated.zipCode,

        // Truck Information
        truckName: validated.truckName,
        truckSize: validated.truckSize,
        truckType: validated.truckType,
        truckImage: validated.truckImage,
        truckImages: validated.truckImages,
        upgrades: validated.upgrades,

        // Pricing
        price: validated.price,
        total: validated.total,

        // Payment
        paymentMethod: validated.paymentMethod,
        paymentStatus: "pending",
        status: "pending",
      },
    });

    console.log("✅ Order created:", order.orderNumber);

    // Send confirmation email to customer
    const customerEmailResult = await sendOrderConfirmationEmail({
      orderNumber: order.orderNumber,
      customerEmail: validated.email,
      customerName: `${validated.firstName} ${validated.lastName}`,
      truckName: validated.truckName,
      truckSize: validated.truckSize,
      truckImage: validated.truckImage,
      truckImages: validated.truckImages,
      upgrades: validated.upgrades,
      price: validated.price,
      total: validated.total,
      paymentMethod: validated.paymentMethod,
    });

    if (!customerEmailResult.success) {
      console.error("❌ Customer email failed:", customerEmailResult.error);
    } else {
      console.log("✅ Customer confirmation email sent");
    }

    // Send notification email to sales team
    const salesEmailResult = await sendOrderNotificationToSales({
      orderNumber: order.orderNumber,
      customerInfo: {
        name: `${validated.firstName} ${validated.lastName}`,
        email: validated.email,
        phone: validated.phone,
        address: `${validated.address}, ${validated.city}, ${validated.state} ${validated.zipCode}`,
      },
      truckName: validated.truckName,
      truckSize: validated.truckSize,
      truckImage: validated.truckImage,
      truckImages: validated.truckImages,
      upgrades: validated.upgrades,
      price: validated.price,
      total: validated.total,
      paymentMethod: validated.paymentMethod,
    });

    if (!salesEmailResult.success) {
      console.error("❌ Sales team email failed:", salesEmailResult.error);
    } else {
      console.log("✅ Sales team notification email sent");
    }

    return {
      success: true,
      orderNumber: order.orderNumber,
      message: "Order placed successfully!",
      emailsSent: {
        customer: customerEmailResult.success,
        sales: salesEmailResult.success,
      },
    };
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      };
    }

    // Handle generic errors
    console.error("❌ Submit order error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit order",
    };
  }
}
