"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Truck, Utensils, Palette, DollarSign, User, Check, Edit2 } from "lucide-react";
import { useState } from "react";
import { TrailerConfiguration, PricingBreakdown, TRAILER_SIZES, PORCH_OPTIONS, RANGE_HOOD_OPTIONS, REFRIGERATION_OPTIONS } from "@/types/configurator";
import { cn } from "@/lib/utils";

interface ConfigurationSummaryProps {
  config: TrailerConfiguration;
  pricing: PricingBreakdown;
  onEditStep?: (step: number) => void;
}

const SECTIONS = [
  {
    id: 1,
    title: "Trailer Basics",
    icon: Truck,
    fields: ["trailerSize", "porchConfiguration"],
  },
  {
    id: 2,
    title: "Equipment",
    icon: Utensils,
    fields: ["rangeHood", "fireSuppressionSystem", "flatTopGriddle", "charbroiler", "deepFryer", "range", "steamWell", "warmingCabinet", "refrigeration"],
  },
  {
    id: 3,
    title: "Customization",
    icon: Palette,
    fields: ["exteriorColor", "interiorFinish", "additionalInfo"],
  },
  {
    id: 4,
    title: "Budget",
    icon: DollarSign,
    fields: ["budget", "needFinancing"],
  },
  {
    id: 5,
    title: "Contact",
    icon: User,
    fields: ["firstName", "lastName", "email", "phoneNumber", "zipcode"],
  },
];

function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    trailerSize: "Trailer Size",
    porchConfiguration: "Porch",
    rangeHood: "Range Hood",
    fireSuppressionSystem: "Fire Suppression",
    flatTopGriddle: "Flat Top Griddle",
    charbroiler: "Charbroiler",
    deepFryer: "Deep Fryer",
    range: "Range",
    steamWell: "Steam Well",
    warmingCabinet: "Warming Cabinet",
    refrigeration: "Refrigeration",
    exteriorColor: "Exterior Color",
    interiorFinish: "Interior Finish",
    additionalInfo: "Additional Info",
    budget: "Budget",
    needFinancing: "Financing",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phoneNumber: "Phone",
    zipcode: "Zip Code",
  };
  return labels[field] || field;
}

function getFieldValue(config: TrailerConfiguration, field: string): string {
  const value = config[field as keyof TrailerConfiguration];

  if (!value || value === "none" || (Array.isArray(value) && value.length === 0)) {
    return "Not selected";
  }

  if (field === "trailerSize") {
    const option = TRAILER_SIZES.find(s => s.value === value);
    return option?.label || String(value);
  }

  if (field === "porchConfiguration") {
    const option = PORCH_OPTIONS.find(p => p.value === value);
    return option?.label || String(value);
  }

  if (field === "rangeHood") {
    const option = RANGE_HOOD_OPTIONS.find(r => r.value === value);
    return option?.label || String(value);
  }

  if (field === "refrigeration" && Array.isArray(value)) {
    if (value.length === 0 || (value.length === 1 && value[0] === "none")) {
      return "None";
    }
    return value.map(v => {
      const opt = REFRIGERATION_OPTIONS.find(r => r.value === v);
      return opt?.label || v;
    }).join(", ");
  }

  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
  }

  return String(value);
}

function isFieldCompleted(config: TrailerConfiguration, field: string): boolean {
  const value = config[field as keyof TrailerConfiguration];

  if (field === "refrigeration") {
    return Array.isArray(value) && value.length > 0 && value[0] !== "none";
  }

  if (field === "additionalInfo") {
    return true; // Optional field
  }

  return !!value && value !== "none" && value !== "";
}

export default function ConfigurationSummary({
  config,
  pricing,
  onEditStep,
}: ConfigurationSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);

  const toggleSection = (id: number) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const isSectionComplete = (fields: string[]): boolean => {
    return fields.some(field => isFieldCompleted(config, field));
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <h3 className="text-lg font-bold mb-1">Your Configuration</h3>
        <p className="text-slate-300 text-sm">Summary of your selections</p>
      </div>

      {/* Sections */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {SECTIONS.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const isComplete = isSectionComplete(section.fields);
          const Icon = section.icon;

          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    isComplete
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  )}>
                    {isComplete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="font-medium text-sm text-slate-900 dark:text-white">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {onEditStep && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditStep(section.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                  )}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2">
                      {section.fields.map((field) => {
                        const value = getFieldValue(config, field);
                        const isCompleted = isFieldCompleted(config, field);

                        return (
                          <div
                            key={field}
                            className="flex items-center justify-between text-sm py-1.5"
                          >
                            <span className="text-slate-500 dark:text-slate-400">
                              {getFieldLabel(field)}
                            </span>
                            <span className={cn(
                              "font-medium truncate max-w-[140px]",
                              isCompleted
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-400 dark:text-slate-500"
                            )}>
                              {value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Price Summary */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-blue-100">Base Trailer</span>
            <span>${pricing.basePrice.toLocaleString()}</span>
          </div>
          {pricing.porchPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Porch</span>
              <span>+${pricing.porchPrice.toLocaleString()}</span>
            </div>
          )}
          {pricing.equipmentPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Equipment</span>
              <span>+${pricing.equipmentPrice.toLocaleString()}</span>
            </div>
          )}
          {pricing.customizationPrice !== 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Customizations</span>
              <span>{pricing.customizationPrice > 0 ? "+" : ""}${Math.abs(pricing.customizationPrice).toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="border-t border-white/20 pt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-blue-100">Estimated Total</span>
            <span className="text-2xl font-bold">${pricing.total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-blue-100 mt-1">
            Or ${pricing.monthlyPayment.toLocaleString()}/mo with financing
          </p>
        </div>
      </div>
    </div>
  );
}
