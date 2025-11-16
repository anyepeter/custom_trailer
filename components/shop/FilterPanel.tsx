"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrailerType, TrailerSize } from "@/types/trailer";

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  className?: string;
}

export interface FilterState {
  types: TrailerType[];
  sizes: TrailerSize[];
  priceRange: { min: number; max: number };
  features: string[];
  availability: boolean | undefined;
}

const TRAILER_TYPES: TrailerType[] = [
  "BBQ",
  "Coffee",
  "Cold Kitchen",
  "Hot Kitchen",
  "Pizza",
  "Porch",
  "Gooseneck",
];

const TRAILER_SIZES: TrailerSize[] = [
  "7x12",
  "7x14",
  "7x16",
  "8.5x16",
  "8.5x18",
  "8.5x20",
  "8.5x24",
  "8.5x28",
];

const FEATURE_OPTIONS = [
  { id: "refrigeration", label: "Refrigeration" },
  { id: "rangeHood", label: "Range Hood" },
  { id: "griddle24", label: "24\" Griddle" },
  { id: "deepFryer", label: "Deep Fryer" },
  { id: "range", label: "Range/Stove" },
  { id: "charbroiler24", label: "24\" Charbroiler" },
  { id: "gasLines", label: "Gas Lines" },
  { id: "threeCompartmentSink", label: "3-Compartment Sink" },
  { id: "handwashSink", label: "Handwash Sink" },
  { id: "fireSuppressionSystem", label: "Fire Suppression" },
  { id: "ansulSystem", label: "Ansul System" },
];

const PRICE_RANGES = [
  { label: "Under $30k", min: 0, max: 30000 },
  { label: "$30k - $45k", min: 30000, max: 45000 },
  { label: "$45k - $60k", min: 45000, max: 60000 },
  { label: "$60k+", min: 60000, max: 999999 },
];

export default function FilterPanel({
  onFilterChange,
  onClose,
  className = "",
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    sizes: [],
    priceRange: { min: 0, max: 999999 },
    features: [],
    availability: undefined,
  });

  const [expandedSections, setExpandedSections] = useState({
    type: true,
    size: true,
    price: true,
    features: false,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleTypeChange = (type: TrailerType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];

    const newFilters = { ...filters, types: newTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeChange = (size: TrailerSize) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];

    const newFilters = { ...filters, sizes: newSizes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const newFilters = { ...filters, priceRange: { min, max } };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFeatureChange = (featureId: string) => {
    const newFeatures = filters.features.includes(featureId)
      ? filters.features.filter((f) => f !== featureId)
      : [...filters.features, featureId];

    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAvailabilityChange = (available: boolean | undefined) => {
    const newFilters = { ...filters, availability: available };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      types: [],
      sizes: [],
      priceRange: { min: 0, max: 999999 },
      features: [],
      availability: undefined,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount =
    filters.types.length +
    filters.sizes.length +
    filters.features.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 999999 ? 1 : 0) +
    (filters.availability !== undefined ? 1 : 0);

  return (
    <Card
      className={`bg-white border-gray-200 shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear all
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Trailer Type */}
        <FilterSection
          title="Trailer Type"
          isExpanded={expandedSections.type}
          onToggle={() => toggleSection("type")}
        >
          <div className="space-y-2">
            {TRAILER_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Trailer Size */}
        <FilterSection
          title="Trailer Size"
          isExpanded={expandedSections.size}
          onToggle={() => toggleSection("size")}
        >
          <div className="grid grid-cols-2 gap-2">
            {TRAILER_SIZES.map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="space-y-2">
            {PRICE_RANGES.map((range) => (
              <label
                key={range.label}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange.min === range.min &&
                    filters.priceRange.max === range.max
                  }
                  onChange={() =>
                    handlePriceRangeChange(range.min, range.max)
                  }
                  className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {range.label}
                </span>
              </label>
            ))}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                checked={
                  filters.priceRange.min === 0 &&
                  filters.priceRange.max === 999999
                }
                onChange={() => handlePriceRangeChange(0, 999999)}
                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                All Prices
              </span>
            </label>
          </div>
        </FilterSection>

        {/* Features & Equipment */}
        <FilterSection
          title="Features & Equipment"
          isExpanded={expandedSections.features}
          onToggle={() => toggleSection("features")}
        >
          <div className="space-y-2">
            {FEATURE_OPTIONS.map((feature) => (
              <label
                key={feature.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.features.includes(feature.id)}
                  onChange={() => handleFeatureChange(feature.id)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {feature.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Availability"
          isExpanded={expandedSections.availability}
          onToggle={() => toggleSection("availability")}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === undefined}
                onChange={() => handleAvailabilityChange(undefined)}
                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                All Trailers
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === true}
                onChange={() => handleAvailabilityChange(true)}
                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                Available Now
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === false}
                onChange={() => handleAvailabilityChange(false)}
                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                Build-to-Order
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              </span>
            </label>
          </div>
        </FilterSection>
      </div>
    </Card>
  );
}

// Filter Section Component
interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
}: FilterSectionProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
