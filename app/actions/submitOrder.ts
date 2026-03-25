"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail, sendOrderNotificationToSales } from "@/lib/orderEmails";

// Validation schema for a single order item (one trailer + its upgrades)
const orderItemSchema = z.object({
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
  quantity: z.number().int().positive().default(1),
  unitPrice: z.number().positive("Unit price must be positive"),
  upgradesTotal: z.number().default(0),
  itemTotal: z.number().positive("Item total must be positive"),
});

// Validation schema for the full order
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

  // Order Items
  items: z.array(orderItemSchema).min(1, "At least one item is required"),

  // Pricing (aggregated)
  subtotal: z.number().positive("Subtotal must be positive"),
  total: z.number().positive("Total must be positive"),

  // Payment
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type OrderInput = z.infer<typeof orderSchema>;

export async function submitOrder(data: OrderInput) {
  try {
    // Validate input
    const validated = orderSchema.parse(data);

    // Create order with items in a single transaction
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

        // Pricing
        subtotal: validated.subtotal,
        total: validated.total,

        // Payment
        paymentMethod: validated.paymentMethod,
        paymentStatus: "pending",
        status: "pending",

        // Create all order items
        items: {
          create: validated.items.map((item) => ({
            truckName: item.truckName,
            truckSize: item.truckSize,
            truckType: item.truckType,
            truckImage: item.truckImage,
            truckImages: item.truckImages,
            upgrades: item.upgrades,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            upgradesTotal: item.upgradesTotal,
            itemTotal: item.itemTotal,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    console.log("✅ Order created:", order.orderNumber, `with ${order.items.length} item(s)`);

    // Build items data for emails
    const emailItems = validated.items.map((item) => ({
      truckName: item.truckName,
      truckSize: item.truckSize,
      truckImage: item.truckImage,
      truckImages: item.truckImages,
      upgrades: item.upgrades,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      upgradesTotal: item.upgradesTotal,
      itemTotal: item.itemTotal,
    }));

    // Send confirmation email to customer
    const customerEmailResult = await sendOrderConfirmationEmail({
      orderNumber: order.orderNumber,
      customerEmail: validated.email,
      customerName: `${validated.firstName} ${validated.lastName}`,
      items: emailItems,
      subtotal: validated.subtotal,
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
      items: emailItems,
      subtotal: validated.subtotal,
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
