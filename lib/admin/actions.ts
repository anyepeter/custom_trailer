"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  truckFormSchema,
  buildRequestUpdateSchema,
  siteSettingsSchema,
  orderUpdateSchema,
} from "./schemas";
import type {
  TruckFormSchema,
  BuildRequestUpdateSchema,
  SiteSettingsSchema,
  OrderUpdateSchema,
} from "./schemas";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { SITE_SETTINGS_ID, SITE_SETTINGS_TAG } from "@/lib/settings";
import { DEFAULT_CONTACT_RAW } from "@/lib/site-contact";
import type { AdminOrder } from "./order-types";

// ============================================================================
// TRUCK ACTIONS
// ============================================================================

export async function createTruckAction(formData: FormData) {
  try {
    // Extract files from FormData
    const files = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    // Upload images to Cloudinary
    for (const file of files) {
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadToCloudinary(buffer, file.name);
        imageUrls.push(url);
      }
    }

    // Extract and parse other form data
    const data = {
      name: formData.get("name") as string,
      modelCode: formData.get("modelCode") as string || undefined,
      type: formData.get("type") as string || undefined,
      size: formData.get("size") as string || undefined,
      actualPrice: formData.get("actualPrice") ? Number(formData.get("actualPrice")) : undefined,
      regularPrice: formData.get("regularPrice") ? Number(formData.get("regularPrice")) : undefined,
      description: formData.get("description") as string || undefined,
      images: imageUrls,
      videoUrl: formData.get("videoUrl") as string || undefined,
      concessionFeatures: formData.get("concessionFeatures")
        ? JSON.parse(formData.get("concessionFeatures") as string)
        : undefined,
      specialSpecifications: formData.get("specialSpecifications")
        ? JSON.parse(formData.get("specialSpecifications") as string)
        : undefined,
      additionalOptions: formData.get("additionalOptions")
        ? JSON.parse(formData.get("additionalOptions") as string)
        : undefined,
    };

    // Validate data
    const validated = truckFormSchema.parse(data);

    // Convert form data to Prisma format
    const truckData: Prisma.TruckCreateInput = {
      name: validated.name,
      modelCode: validated.modelCode || null,
      type: validated.type || null,
      size: validated.size || null,
      actualPrice: validated.actualPrice ? new Prisma.Decimal(validated.actualPrice) : null,
      regularPrice: validated.regularPrice ? new Prisma.Decimal(validated.regularPrice) : null,
      description: validated.description || null,
      images: validated.images || [],
      videoUrl: validated.videoUrl || null,
      concessionFeatures: validated.concessionFeatures || Prisma.JsonNull,
      specialSpecifications: validated.specialSpecifications || [],
      additionalOptions: validated.additionalOptions || Prisma.JsonNull,
    };

    // Create truck
    const truck = await prisma.truck.create({
      data: truckData,
    });

    revalidatePath("/admin/trucks");
    revalidatePath("/shop");

    return {
      success: true,
      data: truck,
      message: "Truck created successfully",
    };
  } catch (error) {
    console.error("Create truck error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Failed to create truck",
    };
  }
}

export async function updateTruckAction(id: string, formData: FormData) {
  try {
    // Extract files from FormData
    const files = formData.getAll("images") as File[];
    const existingImages = formData.get("existingImages")
      ? JSON.parse(formData.get("existingImages") as string)
      : [];
    const imageUrls: string[] = [...existingImages];

    // Upload new images to Cloudinary
    for (const file of files) {
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadToCloudinary(buffer, file.name);
        imageUrls.push(url);
      }
    }

    // Extract and parse other form data
    const data = {
      name: formData.get("name") as string,
      modelCode: formData.get("modelCode") as string || undefined,
      type: formData.get("type") as string || undefined,
      size: formData.get("size") as string || undefined,
      actualPrice: formData.get("actualPrice") ? Number(formData.get("actualPrice")) : undefined,
      regularPrice: formData.get("regularPrice") ? Number(formData.get("regularPrice")) : undefined,
      description: formData.get("description") as string || undefined,
      images: imageUrls,
      videoUrl: formData.get("videoUrl") as string || undefined,
      concessionFeatures: formData.get("concessionFeatures")
        ? JSON.parse(formData.get("concessionFeatures") as string)
        : undefined,
      specialSpecifications: formData.get("specialSpecifications")
        ? JSON.parse(formData.get("specialSpecifications") as string)
        : undefined,
      additionalOptions: formData.get("additionalOptions")
        ? JSON.parse(formData.get("additionalOptions") as string)
        : undefined,
    };

    // Validate data
    const validated = truckFormSchema.parse(data);

    // Convert form data to Prisma format
    const truckData: Prisma.TruckUpdateInput = {
      name: validated.name,
      modelCode: validated.modelCode || null,
      type: validated.type || null,
      size: validated.size || null,
      actualPrice: validated.actualPrice ? new Prisma.Decimal(validated.actualPrice) : null,
      regularPrice: validated.regularPrice ? new Prisma.Decimal(validated.regularPrice) : null,
      description: validated.description || null,
      images: validated.images || [],
      videoUrl: validated.videoUrl || null,
      concessionFeatures: validated.concessionFeatures || Prisma.JsonNull,
      specialSpecifications: validated.specialSpecifications || [],
      additionalOptions: validated.additionalOptions || Prisma.JsonNull,
    };

    // Update truck
    const truck = await prisma.truck.update({
      where: { id },
      data: truckData,
    });

    revalidatePath("/admin/trucks");
    revalidatePath(`/admin/trucks/${id}/edit`);
    revalidatePath("/shop");
    revalidatePath(`/shop/${truck.modelCode}`);

    return {
      success: true,
      data: truck,
      message: "Truck updated successfully",
    };
  } catch (error) {
    console.error("Update truck error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Failed to update truck",
    };
  }
}

export async function deleteTruckAction(id: string) {
  try {
    await prisma.truck.delete({
      where: { id },
    });

    revalidatePath("/admin/trucks");
    revalidatePath("/shop");

    return {
      success: true,
      message: "Truck deleted successfully",
    };
  } catch (error) {
    console.error("Delete truck error:", error);

    return {
      success: false,
      error: "Failed to delete truck",
    };
  }
}

export async function getTruckByIdAction(id: string) {
  try {
    const truck = await prisma.truck.findUnique({
      where: { id },
    });

    if (!truck) {
      return {
        success: false,
        error: "Truck not found",
      };
    }

    return {
      success: true,
      data: truck,
    };
  } catch (error) {
    console.error("Get truck error:", error);

    return {
      success: false,
      error: "Failed to fetch truck",
    };
  }
}

export async function getAllTrucksAction() {
  try {
    const trucks = await prisma.truck.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: trucks,
    };
  } catch (error) {
    console.error("Get all trucks error:", error);

    return {
      success: false,
      error: "Failed to fetch trucks",
      data: [],
    };
  }
}

// ============================================================================
// DASHBOARD ACTIONS
// ============================================================================

export async function getDashboardStatsAction() {
  try {
    const [
      truckCount,
      buildRequestCount,
      pendingRequests,
      completedRequests,
      orderCount,
      pendingOrders,
    ] = await Promise.all([
      prisma.truck.count(),
      prisma.buildRequest.count(),
      prisma.buildRequest.count({ where: { status: "pending" } }),
      prisma.buildRequest.count({ where: { status: "completed" } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "pending" } }),
    ]);

    return {
      success: true,
      data: {
        truckCount,
        buildRequestCount,
        pendingRequests,
        completedRequests,
        orderCount,
        pendingOrders,
      },
    };
  } catch (error) {
    console.error("Get dashboard stats error:", error);

    return {
      success: false,
      error: "Failed to fetch dashboard stats",
      data: {
        truckCount: 0,
        buildRequestCount: 0,
        pendingRequests: 0,
        completedRequests: 0,
        orderCount: 0,
        pendingOrders: 0,
      },
    };
  }
}

// ============================================================================
// SITE SETTINGS ACTIONS (admin-editable contact info)
// ============================================================================

export async function getSiteSettingsAction() {
  try {
    const row = await prisma.siteSetting.findUnique({
      where: { id: SITE_SETTINGS_ID },
    });

    return {
      success: true,
      data: row
        ? { phone: row.phone, email: row.email, whatsapp: row.whatsapp }
        : { ...DEFAULT_CONTACT_RAW },
    };
  } catch (error) {
    console.error("Get site settings error:", error);

    return {
      success: false,
      error: "Failed to load site settings",
      data: { ...DEFAULT_CONTACT_RAW },
    };
  }
}

export async function updateSiteSettingsAction(data: SiteSettingsSchema) {
  try {
    const validated = siteSettingsSchema.parse(data);

    const row = await prisma.siteSetting.upsert({
      where: { id: SITE_SETTINGS_ID },
      update: {
        phone: validated.phone,
        email: validated.email,
        whatsapp: validated.whatsapp,
      },
      create: { id: SITE_SETTINGS_ID, ...validated },
    });

    // Contact info is read (cached) across the whole site, so bust the tag and
    // the shared layout to reflect the change everywhere immediately.
    revalidateTag(SITE_SETTINGS_TAG);
    revalidatePath("/", "layout");

    return {
      success: true,
      data: { phone: row.phone, email: row.email, whatsapp: row.whatsapp },
      message: "Contact settings updated successfully",
    };
  } catch (error) {
    console.error("Update site settings error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Failed to update site settings",
    };
  }
}

// ============================================================================
// ORDER ACTIONS
// ============================================================================

function serializeOrder(
  order: Prisma.OrderGetPayload<{ include: { items: true } }>
): AdminOrder {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    firstName: order.firstName,
    lastName: order.lastName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    city: order.city,
    state: order.state,
    zipCode: order.zipCode,
    subtotal: Number(order.subtotal),
    tax: order.tax != null ? Number(order.tax) : null,
    total: Number(order.total),
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    status: order.status,
    financingPreference: order.financingPreference ?? null,
    financingTerm: order.financingTerm ?? null,
    financingMonthlyEstimate:
      order.financingMonthlyEstimate != null
        ? Number(order.financingMonthlyEstimate)
        : null,
    notes: order.notes ?? null,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      truckName: item.truckName,
      truckSize: item.truckSize,
      truckType: item.truckType ?? null,
      truckImage: item.truckImage,
      truckImages: item.truckImages,
      upgrades: Array.isArray(item.upgrades)
        ? (item.upgrades as unknown as AdminOrder["items"][number]["upgrades"])
        : [],
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      upgradesTotal: Number(item.upgradesTotal),
      itemTotal: Number(item.itemTotal),
    })),
  };
}

export async function getAllOrdersAction(filters?: {
  status?: string;
  search?: string;
}) {
  try {
    const where: Prisma.OrderWhereInput = {};

    if (filters?.status && filters.status !== "all") {
      where.status = filters.status;
    }

    if (filters?.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: "insensitive" } },
        { lastName: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
        { orderNumber: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return {
      success: true,
      data: orders.map(serializeOrder),
    };
  } catch (error) {
    console.error("Get orders error:", error);

    return {
      success: false,
      error: "Failed to fetch orders",
      data: [] as AdminOrder[],
    };
  }
}

export async function getOrderByIdAction(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    return { success: true, data: serializeOrder(order) };
  } catch (error) {
    console.error("Get order error:", error);

    return { success: false, error: "Failed to fetch order" };
  }
}

export async function updateOrderAction(id: string, data: OrderUpdateSchema) {
  try {
    const validated = orderUpdateSchema.parse(data);

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: validated.status,
        paymentStatus: validated.paymentStatus,
        notes: validated.notes,
      },
      include: { items: true },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    return {
      success: true,
      data: serializeOrder(order),
      message: "Order updated successfully",
    };
  } catch (error) {
    console.error("Update order error:", error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Failed to update order" };
  }
}

// ============================================================================
// BUILD REQUEST ACTIONS
// ============================================================================

export async function getAllBuildRequestsAction(filters?: { status?: string; search?: string }) {
  try {
    const where: Prisma.BuildRequestWhereInput = {};

    if (filters?.status && filters.status !== "all") {
      where.status = filters.status;
    }

    if (filters?.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: "insensitive" } },
        { lastName: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const requests = await prisma.buildRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error("Get build requests error:", error);

    return {
      success: false,
      error: "Failed to fetch build requests",
      data: [],
    };
  }
}

export async function getBuildRequestByIdAction(id: string) {
  try {
    const request = await prisma.buildRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return {
        success: false,
        error: "Build request not found",
      };
    }

    return {
      success: true,
      data: request,
    };
  } catch (error) {
    console.error("Get build request error:", error);

    return {
      success: false,
      error: "Failed to fetch build request",
    };
  }
}

export async function updateBuildRequestAction(id: string, data: BuildRequestUpdateSchema) {
  try {
    const validated = buildRequestUpdateSchema.parse(data);

    const request = await prisma.buildRequest.update({
      where: { id },
      data: {
        status: validated.status,
        notes: validated.notes,
      },
    });

    revalidatePath("/admin/build-requests");
    revalidatePath(`/admin/build-requests/${id}`);

    return {
      success: true,
      data: request,
      message: "Build request updated successfully",
    };
  } catch (error) {
    console.error("Update build request error:", error);

    return {
      success: false,
      error: "Failed to update build request",
    };
  }
}

export async function deleteBuildRequestAction(id: string) {
  try {
    await prisma.buildRequest.delete({
      where: { id },
    });

    revalidatePath("/admin/build-requests");

    return {
      success: true,
      message: "Build request deleted successfully",
    };
  } catch (error) {
    console.error("Delete build request error:", error);

    return {
      success: false,
      error: "Failed to delete build request",
    };
  }
}
