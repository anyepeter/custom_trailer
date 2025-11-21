import { Trailer } from "@/types/trailer";

// Mock data for 8 sample trailers
export const trailers: Trailer[] = [
  {
    id: "1",
    slug: "premium-bbq-smoker-8x20",
    modelNumber: "BBQ-PRO-820",
    name: "Premium BBQ Smoker Trailer",
    type: "BBQ",
    size: "8.5x20",
    price: 45900,
    isFeatured: true,
    isAvailable: true,
    isBestSeller: true,
    images: [
      {
        url: "/trailers/bbq-1.jpg",
        alt: "Premium BBQ Smoker Trailer - Front View",
        isPrimary: true,
      },
      {
        url: "/trailers/bbq-2.jpg",
        alt: "Premium BBQ Smoker Trailer - Interior",
      },
      {
        url: "/trailers/bbq-3.jpg",
        alt: "Premium BBQ Smoker Trailer - Side View",
      },
    ],
    shortDescription: "Professional-grade BBQ trailer with dual smokers and full prep kitchen.",
    fullDescription:
      "Our Premium BBQ Smoker Trailer is built for serious pit masters. Features dual offset smokers, commercial-grade stainless steel prep surfaces, three-compartment sink, and dedicated storage for wood and charcoal. Perfect for catering operations and competition BBQ.",
    features: {
      refrigeration: true,
      rangeHood: true,
      griddle24: false,
      deepFryer: false,
      range: true,
      charbroiler24: true,
      gasLines: true,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: true,
      ansulSystem: true,
    },
    specs: {
      exteriorLength: "20 ft",
      exteriorWidth: "8.5 ft",
      exteriorHeight: "7 ft",
      interiorHeight: "6.5 ft",
      weight: "4,800 lbs",
      axles: "Dual 3500 lb",
      jack: "Electric tongue jack",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-7 spray foam",
    },
    equipmentList: [
      "Dual offset smokers (36\" each)",
      "24\" charbroiler",
      "6-burner range",
      "Commercial refrigerator (48\")",
      "Three-compartment sink",
      "Hand-wash sink",
      "Stainless steel prep tables (8 ft total)",
      "Wood/charcoal storage compartments",
      "Propane system with regulator",
      "LED interior lighting",
      "Exhaust hood with fire suppression",
    ],
    upgrades: [
      {
        id: "u1",
        name: "Additional Smoker Unit",
        description: "Add third 36\" offset smoker",
        price: 3500,
        category: "Equipment",
        isPopular: true,
      },
      {
        id: "u2",
        name: "Solar Panel System",
        description: "100W solar panel with battery backup",
        price: 1200,
        category: "Equipment",
        isNew: true,
      },
      {
        id: "u3",
        name: "Custom Vinyl Wrap",
        description: "Full custom design and installation",
        price: 2500,
        category: "Aesthetic",
        isPopular: true,
      },
    ],
    buildLeadTime: "6-8 weeks",
    createdAt: "2024-01-15",
    relatedTrailerIds: ["3", "8"],
  },
  {
    id: "2",
    slug: "gourmet-coffee-trailer-7x14",
    modelNumber: "CFE-GRM-714",
    name: "Gourmet Coffee Trailer",
    type: "Coffee",
    size: "7x14",
    price: 32500,
    isFeatured: true,
    isAvailable: true,
    isNew: true,
    images: [
      {
        url: "/trailers/coffee-1.jpg",
        alt: "Gourmet Coffee Trailer - Front View",
        isPrimary: true,
      },
      {
        url: "/trailers/coffee-2.jpg",
        alt: "Gourmet Coffee Trailer - Interior",
      },
    ],
    shortDescription: "Compact espresso bar with full coffee shop capabilities.",
    fullDescription:
      "Perfect for coffee entrepreneurs, this trailer features a professional espresso station, under-counter refrigeration, and elegant service window. Includes water filtration system and electrical setup for commercial coffee equipment.",
    features: {
      refrigeration: true,
      rangeHood: false,
      griddle24: false,
      deepFryer: false,
      range: false,
      charbroiler24: false,
      gasLines: false,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: false,
      ansulSystem: false,
    },
    specs: {
      exteriorLength: "14 ft",
      exteriorWidth: "7 ft",
      exteriorHeight: "7 ft",
      interiorHeight: "6.5 ft",
      weight: "2,800 lbs",
      axles: "Single 3500 lb",
      jack: "Manual tongue jack",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-7 spray foam",
    },
    equipmentList: [
      "Espresso machine station (36\")",
      "Under-counter refrigerator",
      "Water filtration system",
      "Three-compartment sink",
      "Hand-wash sink",
      "Display case for pastries",
      "Point-of-sale counter",
      "30A electrical hookup",
      "LED menu boards",
      "Tip jar holder",
    ],
    upgrades: [
      {
        id: "u4",
        name: "Commercial Espresso Machine",
        description: "La Marzocco 2-group espresso machine",
        price: 8500,
        category: "Equipment",
      },
      {
        id: "u5",
        name: "Awning System",
        description: "Retractable 8ft awning with LED lighting",
        price: 1800,
        category: "Structural",
      },
    ],
    buildLeadTime: "4-6 weeks",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    slug: "hot-kitchen-deluxe-8x24",
    modelNumber: "HK-DLX-824",
    name: "Hot Kitchen Deluxe",
    type: "Hot Kitchen",
    size: "8.5x24",
    price: 62900,
    isFeatured: true,
    isAvailable: true,
    images: [
      {
        url: "/trailers/hot-kitchen-1.jpg",
        alt: "Hot Kitchen Deluxe - Front View",
        isPrimary: true,
      },
      {
        url: "/trailers/hot-kitchen-2.jpg",
        alt: "Hot Kitchen Deluxe - Interior",
      },
      {
        url: "/trailers/hot-kitchen-3.jpg",
        alt: "Hot Kitchen Deluxe - Cooking Line",
      },
    ],
    shortDescription: "Full commercial kitchen with all major cooking equipment.",
    fullDescription:
      "Our flagship Hot Kitchen Deluxe is a complete restaurant on wheels. Equipped with griddle, fryer, range, charbroiler, and full refrigeration. NSF-certified with Ansul fire suppression system. Perfect for full-service catering and high-volume operations.",
    features: {
      refrigeration: true,
      rangeHood: true,
      griddle24: true,
      deepFryer: true,
      range: true,
      charbroiler24: true,
      gasLines: true,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: true,
      ansulSystem: true,
    },
    specs: {
      exteriorLength: "24 ft",
      exteriorWidth: "8.5 ft",
      exteriorHeight: "7 ft",
      interiorHeight: "6.5 ft",
      weight: "6,500 lbs",
      axles: "Dual 5200 lb",
      jack: "Electric tongue jack with LED",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-7 spray foam",
    },
    equipmentList: [
      "24\" flat-top griddle",
      "Double deep fryer",
      "6-burner range with oven",
      "24\" charbroiler",
      "Commercial refrigerator (60\")",
      "Freezer unit (36\")",
      "Three-compartment sink",
      "Hand-wash sink",
      "Prep sink",
      "Stainless steel prep tables (12 ft total)",
      "Overhead storage shelving",
      "Ansul fire suppression system",
      "Type 1 exhaust hood",
      "LED interior and exterior lighting",
      "POS counter area",
    ],
    upgrades: [
      {
        id: "u6",
        name: "Generator Package",
        description: "Onboard 8kW diesel generator with auto-start",
        price: 5500,
        category: "Equipment",
      },
      {
        id: "u7",
        name: "Premium Flooring",
        description: "Non-slip commercial rubber flooring",
        price: 1500,
        category: "Structural",
      },
      {
        id: "u8",
        name: "Surveillance System",
        description: "4-camera security system with DVR",
        price: 900,
        category: "Safety",
      },
    ],
    buildLeadTime: "8-10 weeks",
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    slug: "wood-fired-pizza-trailer-8x16",
    modelNumber: "PIZ-WDF-816",
    name: "Wood-Fired Pizza Trailer",
    type: "Pizza",
    size: "8.5x16",
    price: 38900,
    isFeatured: false,
    isAvailable: true,
    images: [
      {
        url: "/trailers/pizza-1.jpg",
        alt: "Wood-Fired Pizza Trailer - Front View",
        isPrimary: true,
      },
      {
        url: "/trailers/pizza-2.jpg",
        alt: "Wood-Fired Pizza Trailer - Oven",
      },
    ],
    shortDescription: "Authentic wood-fired pizza oven with prep station.",
    fullDescription:
      "Bring authentic Neapolitan pizza to any location. Features a professional wood-fired oven, dough prep station, refrigerated ingredient storage, and serving window. Perfect for pizzerias wanting mobile operations.",
    features: {
      refrigeration: true,
      rangeHood: true,
      griddle24: false,
      deepFryer: false,
      range: false,
      charbroiler24: false,
      gasLines: true,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: true,
      ansulSystem: false,
    },
    specs: {
      exteriorLength: "16 ft",
      exteriorWidth: "8.5 ft",
      exteriorHeight: "7.5 ft",
      interiorHeight: "6.5 ft",
      weight: "4,200 lbs",
      axles: "Dual 3500 lb",
      jack: "Electric tongue jack",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-7 spray foam",
    },
    equipmentList: [
      "Wood-fired pizza oven (36\" diameter)",
      "Dough prep station with flour storage",
      "Commercial refrigerator for toppings",
      "Three-compartment sink",
      "Hand-wash sink",
      "Stainless steel prep tables",
      "Wood storage compartment",
      "Ventilation hood",
      "Serving window with shelf",
      "LED lighting",
    ],
    upgrades: [
      {
        id: "u9",
        name: "Gas-Assist Pizza Oven",
        description: "Hybrid wood/gas fired oven for temperature control",
        price: 4200,
        category: "Equipment",
      },
      {
        id: "u10",
        name: "Dough Mixer",
        description: "20-quart commercial dough mixer",
        price: 1800,
        category: "Equipment",
      },
    ],
    buildLeadTime: "6-8 weeks",
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    slug: "cold-kitchen-salad-bar-7x16",
    modelNumber: "CK-SLD-716",
    name: "Cold Kitchen & Salad Bar",
    type: "Cold Kitchen",
    size: "7x16",
    price: 29900,
    isFeatured: false,
    isAvailable: true,
    images: [
      {
        url: "/trailers/cold-kitchen-1.jpg",
        alt: "Cold Kitchen & Salad Bar - Front View",
        isPrimary: true,
      },
    ],
    shortDescription: "Refrigerated prep station for salads, sandwiches, and cold foods.",
    fullDescription:
      "Specializing in fresh, cold foods? This trailer features extensive refrigeration, prep tables, and a sneeze guard display. Ideal for salad bars, sandwich shops, and fresh juice operations.",
    features: {
      refrigeration: true,
      rangeHood: false,
      griddle24: false,
      deepFryer: false,
      range: false,
      charbroiler24: false,
      gasLines: false,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: false,
      ansulSystem: false,
    },
    specs: {
      exteriorLength: "16 ft",
      exteriorWidth: "7 ft",
      exteriorHeight: "7 ft",
      interiorHeight: "6.5 ft",
      weight: "3,200 lbs",
      axles: "Dual 3500 lb",
      jack: "Manual tongue jack",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-7 spray foam",
    },
    equipmentList: [
      "Refrigerated prep table (60\")",
      "Commercial refrigerator (48\")",
      "Sneeze guard display case",
      "Three-compartment sink",
      "Hand-wash sink",
      "Cutting board stations",
      "Ingredient bins (refrigerated)",
      "Serving window",
      "LED lighting",
      "POS counter",
    ],
    upgrades: [
      {
        id: "u11",
        name: "Additional Refrigeration",
        description: "Second 48\" commercial refrigerator",
        price: 2200,
        category: "Equipment",
      },
      {
        id: "u12",
        name: "Juice Press Station",
        description: "Commercial cold-press juicer setup",
        price: 3500,
        category: "Equipment",
      },
    ],
    buildLeadTime: "4-6 weeks",
    createdAt: "2024-02-01",
  },
  {
    id: "6",
    slug: "mobile-porch-catering-8x18",
    modelNumber: "PRC-CTR-818",
    name: "Mobile Porch & Catering Trailer",
    type: "Porch",
    size: "8.5x18",
    price: 41900,
    isFeatured: false,
    isAvailable: true,
    images: [
      {
        url: "/trailers/porch-1.jpg",
        alt: "Mobile Porch & Catering Trailer - Front View",
        isPrimary: true,
      },
      {
        url: "/trailers/porch-2.jpg",
        alt: "Mobile Porch & Catering Trailer - Porch Extended",
      },
    ],
    shortDescription: "Unique trailer with fold-out serving porch and full kitchen.",
    fullDescription:
      "Stand out from the crowd with our Mobile Porch design. Features a fold-out covered serving area, full hot kitchen equipment, and elegant presentation. Perfect for upscale catering and events.",
    features: {
      refrigeration: true,
      rangeHood: true,
      griddle24: true,
      deepFryer: true,
      range: true,
      charbroiler24: false,
      gasLines: true,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: true,
      ansulSystem: true,
    },
    specs: {
      exteriorLength: "18 ft",
      exteriorWidth: "8.5 ft",
      exteriorHeight: "7 ft",
      interiorHeight: "6.5 ft",
      weight: "5,100 lbs",
      axles: "Dual 3500 lb",
      jack: "Electric tongue jack",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-7 spray foam",
    },
    equipmentList: [
      "Fold-out covered porch (6ft x 8ft)",
      "24\" griddle",
      "Double deep fryer",
      "4-burner range",
      "Commercial refrigerator",
      "Three-compartment sink",
      "Hand-wash sink",
      "Prep tables",
      "Ansul fire suppression",
      "Exhaust hood",
      "LED accent lighting",
      "Serving counter with display",
    ],
    upgrades: [
      {
        id: "u13",
        name: "Premium Porch Finish",
        description: "Wood-look vinyl flooring and decorative railings",
        price: 2800,
        category: "Aesthetic",
      },
      {
        id: "u14",
        name: "Sound System",
        description: "Outdoor Bluetooth speaker system",
        price: 650,
        category: "Equipment",
      },
    ],
    buildLeadTime: "8-10 weeks",
    createdAt: "2024-01-18",
  },
  {
    id: "7",
    slug: "gooseneck-kitchen-8x28",
    modelNumber: "GN-PRO-828",
    name: "Gooseneck Kitchen Trailer",
    type: "Gooseneck",
    size: "8.5x28",
    price: 72900,
    isFeatured: true,
    isAvailable: false,
    images: [
      {
        url: "/trailers/gooseneck-1.jpg",
        alt: "Gooseneck Kitchen Trailer - Front View",
        isPrimary: true,
      },
      {
        url: "/trailers/gooseneck-2.jpg",
        alt: "Gooseneck Kitchen Trailer - Interior",
      },
    ],
    shortDescription: "Maximum space gooseneck design with dual cooking lines.",
    fullDescription:
      "Our largest offering, the Gooseneck Kitchen provides restaurant-level capacity. Features dual cooking lines, extensive prep areas, walk-in refrigeration, and storage in the gooseneck. Built for high-volume catering operations and food festivals.",
    features: {
      refrigeration: true,
      rangeHood: true,
      griddle24: true,
      deepFryer: true,
      range: true,
      charbroiler24: true,
      gasLines: true,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: true,
      ansulSystem: true,
    },
    specs: {
      exteriorLength: "28 ft",
      exteriorWidth: "8.5 ft",
      exteriorHeight: "11 ft (gooseneck)",
      interiorHeight: "6.5 ft main, 6 ft gooseneck",
      weight: "8,200 lbs",
      axles: "Triple 5200 lb",
      jack: "Electric tongue jack with auto-level",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-7 spray foam",
    },
    equipmentList: [
      "Dual 24\" griddles",
      "Triple deep fryer",
      "8-burner range with double oven",
      "24\" charbroiler",
      "Walk-in refrigerator section",
      "Commercial freezer",
      "Three-compartment sink",
      "Hand-wash sink x2",
      "Prep sink",
      "Extensive prep tables (20 ft total)",
      "Gooseneck storage area",
      "Dual Ansul fire suppression systems",
      "Type 1 exhaust hood",
      "Generator hookup prep",
      "Multiple serving windows",
    ],
    upgrades: [
      {
        id: "u15",
        name: "Onboard Water System",
        description: "200-gallon freshwater and 150-gallon gray water tanks",
        price: 4500,
        category: "Structural",
      },
      {
        id: "u16",
        name: "Commercial Generator",
        description: "15kW diesel generator with sound enclosure",
        price: 9500,
        category: "Equipment",
      },
    ],
    buildLeadTime: "10-12 weeks",
    createdAt: "2024-01-05",
  },
  {
    id: "8",
    slug: "starter-bbq-trailer-7x12",
    modelNumber: "BBQ-STR-712",
    name: "Starter BBQ Trailer",
    type: "BBQ",
    size: "7x12",
    price: 24900,
    isFeatured: false,
    isAvailable: true,
    images: [
      {
        url: "/trailers/starter-bbq-1.jpg",
        alt: "Starter BBQ Trailer - Front View",
        isPrimary: true,
      },
    ],
    shortDescription: "Affordable entry-level BBQ trailer for weekend warriors.",
    fullDescription:
      "Start your BBQ business without breaking the bank. This compact trailer includes a smoker, basic prep area, and essential equipment. Perfect for weekend markets and small events. Upgrade-ready as your business grows.",
    features: {
      refrigeration: false,
      rangeHood: true,
      griddle24: false,
      deepFryer: false,
      range: false,
      charbroiler24: false,
      gasLines: true,
      threeCompartmentSink: true,
      handwashSink: true,
      fireSuppressionSystem: false,
      ansulSystem: false,
    },
    specs: {
      exteriorLength: "12 ft",
      exteriorWidth: "7 ft",
      exteriorHeight: "7 ft",
      interiorHeight: "6.5 ft",
      weight: "2,200 lbs",
      axles: "Single 3500 lb",
      jack: "Manual tongue jack",
      wallMaterial: ".040 aluminum",
      floorMaterial: "3/4\" marine-grade plywood",
      roofMaterial: ".030 aluminum with insulation",
      insulation: "R-5 spray foam",
    },
    equipmentList: [
      "24\" offset smoker",
      "Propane warmer",
      "Three-compartment sink",
      "Hand-wash sink",
      "Stainless steel prep table (4 ft)",
      "Wood storage area",
      "Basic exhaust hood",
      "Serving window",
      "LED interior lighting",
      "Propane system",
    ],
    upgrades: [
      {
        id: "u17",
        name: "Refrigerator Add-on",
        description: "Under-counter commercial refrigerator",
        price: 1500,
        category: "Equipment",
      },
      {
        id: "u18",
        name: "Charbroiler Station",
        description: "Add 18\" charbroiler with gas hookup",
        price: 2200,
        category: "Equipment",
      },
    ],
    buildLeadTime: "3-4 weeks",
    createdAt: "2024-02-05",
  },
];

// Helper functions for filtering and sorting
export function filterTrailers(
  trailers: Trailer[],
  filters: {
    types?: string[];
    sizes?: string[];
    priceRange?: { min: number; max: number };
    features?: string[];
    availability?: boolean;
  }
): Trailer[] {
  return trailers.filter((trailer) => {
    // Filter by type
    if (filters.types && filters.types.length > 0) {
      if (!filters.types.includes(trailer.type)) return false;
    }

    // Filter by size
    if (filters.sizes && filters.sizes.length > 0) {
      if (!filters.sizes.includes(trailer.size)) return false;
    }

    // Filter by price range
    if (filters.priceRange) {
      if (
        trailer.price < filters.priceRange.min ||
        trailer.price > filters.priceRange.max
      ) {
        return false;
      }
    }

    // Filter by features
    if (filters.features && filters.features.length > 0) {
      const hasAllFeatures = filters.features.every((feature) => {
        return trailer.features[feature as keyof typeof trailer.features] === true;
      });
      if (!hasAllFeatures) return false;
    }

    // Filter by availability
    if (filters.availability !== undefined) {
      if (trailer.isAvailable !== filters.availability) return false;
    }

    return true;
  });
}

export function sortTrailers(
  trailers: Trailer[],
  sortBy: "featured" | "price-low-high" | "price-high-low" | "size-asc" | "size-desc" | "type-az"
): Trailer[] {
  const sorted = [...trailers];

  switch (sortBy) {
    case "featured":
      return sorted.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
    case "price-low-high":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return sorted.sort((a, b) => b.price - a.price);
    case "size-asc":
      return sorted.sort((a, b) => {
        const aSize = parseFloat(a.size.split("x")[1]);
        const bSize = parseFloat(b.size.split("x")[1]);
        return aSize - bSize;
      });
    case "size-desc":
      return sorted.sort((a, b) => {
        const aSize = parseFloat(a.size.split("x")[1]);
        const bSize = parseFloat(b.size.split("x")[1]);
        return bSize - aSize;
      });
    case "type-az":
      return sorted.sort((a, b) => a.type.localeCompare(b.type));
    default:
      return sorted;
  }
}
