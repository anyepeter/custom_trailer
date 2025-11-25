"use server";

import { prisma } from "@/lib/prisma";

export async function getTruckById(id: string) {
  try {
    const truck = await prisma.truck.findUnique({
      where: {
        id,
      },
    });

    if (!truck) {
      return {
        success: false,
        error: "Truck not found",
        data: null,
      };
    }

    // Convert Decimal fields to numbers for client-side use
    const truckWithNumbers = {
      ...truck,
      actualPrice: truck.actualPrice ? Number(truck.actualPrice) : null,
      regularPrice: truck.regularPrice ? Number(truck.regularPrice) : null,
    };

    return {
      success: true,
      data: truckWithNumbers,
    };
  } catch (error) {
    console.error("Error fetching truck:", error);
    return {
      success: false,
      error: "Failed to fetch truck",
      data: null,
    };
  }
}
