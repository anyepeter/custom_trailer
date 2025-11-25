"use server";

import { prisma } from "@/lib/prisma";

export async function getAllTrucks() {
  try {
    const trucks = await prisma.truck.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert Decimal fields to numbers for client-side use
    const trucksWithNumbers = trucks.map((truck) => ({
      ...truck,
      actualPrice: truck.actualPrice ? Number(truck.actualPrice) : null,
      regularPrice: truck.regularPrice ? Number(truck.regularPrice) : null,
    }));

    return {
      success: true,
      data: trucksWithNumbers,
    };
  } catch (error) {
    console.error("Error fetching trucks:", error);
    return {
      success: false,
      error: "Failed to fetch trucks",
      data: [],
    };
  }
}
