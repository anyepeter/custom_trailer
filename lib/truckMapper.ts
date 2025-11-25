import type { Truck } from "@prisma/client";
import type { Trailer, TrailerFeatures, TrailerUpgrade } from "@/types/trailer";

// Type for truck with serialized Decimal fields
type TruckWithNumbers = Omit<Truck, "actualPrice" | "regularPrice"> & {
  actualPrice?: number | null;
  regularPrice?: number | null;
  type?: string | null;
  size?: string | null;
};

/**
 * Maps database Truck model to Trailer format for UI compatibility
 * Preserves only the fields actually used by TrailerCard component
 */
export function mapTruckToTrailer(truck: TruckWithNumbers): Trailer {
  // Use actualPrice or regularPrice for display
  const displayPrice = truck.actualPrice || truck.regularPrice || 0;

  // Parse concessionFeatures from JSON - keeping as raw object for flexible display
  let features: any = truck.concessionFeatures || {};

  // Parse additionalOptions from JSON to upgrades array
  let upgrades: TrailerUpgrade[] = [];
  if (truck.additionalOptions) {
    try {
      const parsedOptions = truck.additionalOptions as any;
      // If it's an array, map it to TrailerUpgrade format
      if (Array.isArray(parsedOptions)) {
        upgrades = parsedOptions.map((option: any, index: number) => ({
          id: option.id || `upgrade-${truck.id}-${index}`,
          name: option.name || "",
          description: option.description || option.name || "",
          price: Number(option.price) || 0,
          category: (option.category as "Safety" | "Equipment" | "Aesthetic" | "Structural") || "Equipment",
          isPopular: option.isPopular === true,
          isNew: option.isNew === true,
        }));
      }
    } catch (error) {
      console.error("Failed to parse additionalOptions:", error);
      upgrades = [];
    }
  }

  return {
    id: truck.id,
    slug: truck.id, // Use ID as slug for now
    modelNumber: truck.modelCode || "",
    name: truck.name,
    type: (truck.type || "Hot Kitchen") as any, // Use database type or default
    size: (truck.size || "8.5x16") as any, // Use database size or default
    price: displayPrice,
    isFeatured: false,
    isAvailable: true,
    images:
      truck.images.length > 0
        ? truck.images.map((url, index) => ({
            url,
            alt: truck.name,
            isPrimary: index === 0,
          }))
        : [
            {
              url: "/placeholder-truck.jpg",
              alt: truck.name,
              isPrimary: true,
            },
          ],
    shortDescription: truck.description || "",
    fullDescription: truck.description || "",
    features: features as TrailerFeatures, // Use parsed features from database
    specs: {
      exteriorLength: "",
      exteriorWidth: "",
      exteriorHeight: "",
      interiorHeight: "",
      weight: "",
      axles: "",
      jack: "",
      wallMaterial: "",
      floorMaterial: "",
      roofMaterial: "",
      insulation: "",
    },
    equipmentList: (truck.specialSpecifications as string[]) || [],
    upgrades, // Use parsed upgrades from database
    buildLeadTime: "6-8 weeks",
    createdAt: truck.createdAt.toISOString(),
  };
}
