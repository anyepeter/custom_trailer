"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { truckFormSchema, buildRequestUpdateSchema } from "./schemas";
import type { TruckFormSchema, BuildRequestUpdateSchema } from "./schemas";
import { uploadToCloudinary } from "@/lib/cloudinary";

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
    const [truckCount, buildRequestCount, pendingRequests, completedRequests] = await Promise.all([
      prisma.truck.count(),
      prisma.buildRequest.count(),
      prisma.buildRequest.count({ where: { status: "pending" } }),
      prisma.buildRequest.count({ where: { status: "completed" } }),
    ]);

    return {
      success: true,
      data: {
        truckCount,
        buildRequestCount,
        pendingRequests,
        completedRequests,
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
      },
    };
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
