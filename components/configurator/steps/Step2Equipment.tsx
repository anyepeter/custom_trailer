"use client";

import { motion } from "framer-motion";
import { Utensils, Check, Flame, Wind, Refrigerator, ChefHat, Info, Sparkles } from "lucide-react";
import { useState } from "react";
import { TrailerConfiguration, RANGE_HOOD_OPTIONS, FIRE_SUPPRESSION_OPTIONS, FLAT_TOP_GRIDDLE_OPTIONS, CHARBROILER_OPTIONS, DEEP_FRYER_OPTIONS, RANGE_OPTIONS, STEAM_WELL_OPTIONS, WARMING_CABINET_OPTIONS, REFRIGERATION_OPTIONS } from "@/types/configurator";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step2EquipmentProps {
  config: TrailerConfiguration;
  updateConfig: (updates: Partial<TrailerConfiguration>) => void;
}

interface EquipmentSelectorProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  options: readonly { value: string; label: string; price: number }[];
  selectedValue: string;
  onChange: (value: string) => void;
  badge?: string;
}

function EquipmentSelector({
  title,
  description,
  icon,
  options,
  selectedValue,
  onChange,
  badge,
}: EquipmentSelectorProps) {
  return (
    <Card className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
            {badge && (
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "p-2 sm:p-3 rounded-lg border text-left transition-all text-sm",
                isSelected
                  ? "bg-blue-50 dark:bg-blue-900/30 border-blue-600"
                  : "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:border-blue-400"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "font-medium",
                  isSelected ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-slate-300"
                )}>
                  {option.label}
                </span>
                {isSelected && <Check className="h-4 w-4 text-blue-600" />}
              </div>
              {option.price > 0 && (
                <span className="text-xs text-green-600 mt-1 block">
                  +${option.price.toLocaleString()}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

// Popular packages for quick selection
const POPULAR_PACKAGES = [
  {
    id: "bbq",
    name: "BBQ Master",
    description: "Perfect for BBQ & grilling operations",
    equipment: {
      flatTopGriddle: "36-inch",
      charbroiler: "36-inch",
      deepFryer: "double",
      rangeHood: "6ft",
      fireSuppressionSystem: "yes",
    },
    icon: Flame,
  },
  {
    id: "burger",
    name: "Burger Joint",
    description: "Ideal for burgers, fries & quick service",
    equipment: {
      flatTopGriddle: "48-inch",
      deepFryer: "double",
      warmingCabinet: "half-height",
      rangeHood: "6ft",
      fireSuppressionSystem: "yes",
    },
    icon: ChefHat,
  },
  {
    id: "asian",
    name: "Asian Fusion",
    description: "Woks, steamers & diverse cooking",
    equipment: {
      range: "6-burner",
      steamWell: "4-well",
      flatTopGriddle: "24-inch",
      rangeHood: "8ft",
      fireSuppressionSystem: "yes",
    },
    icon: Sparkles,
  },
];

export default function Step2Equipment({ config, updateConfig }: Step2EquipmentProps) {
  const [showPackages, setShowPackages] = useState(true);

  const applyPackage = (pkg: typeof POPULAR_PACKAGES[0]) => {
    updateConfig(pkg.equipment);
    setShowPackages(false);
  };

  const handleRefrigerationChange = (value: string) => {
    const currentRefrigeration = config.refrigeration || [];

    if (value === "none") {
      updateConfig({ refrigeration: ["none"] });
      return;
    }

    // Remove "none" if selecting other options
    let newRefrigeration = currentRefrigeration.filter(v => v !== "none");

    if (newRefrigeration.includes(value)) {
      newRefrigeration = newRefrigeration.filter(v => v !== value);
    } else {
      newRefrigeration.push(value);
    }

    if (newRefrigeration.length === 0) {
      newRefrigeration = ["none"];
    }

    updateConfig({ refrigeration: newRefrigeration });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4"
        >
          <Utensils className="h-4 w-4" />
          Step 2 of 5
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3"
        >
          Kitchen{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Equipment
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          Select the cooking equipment that matches your menu. Start with a popular package or customize your own setup.
        </motion.p>
      </div>

      {/* Quick Packages */}
      {showPackages && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Popular Packages
            </h3>
            <button
              onClick={() => setShowPackages(false)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Skip & customize
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {POPULAR_PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <motion.button
                  key={pkg.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => applyPackage(pkg)}
                  className="p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:shadow-lg transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{pkg.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{pkg.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Equipment Selectors */}
      <div className="space-y-4">
        {/* Essential Equipment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Essential Equipment
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EquipmentSelector
              title="Range Hood"
              description="Required for ventilation"
              icon={<Wind className="h-5 w-5" />}
              options={RANGE_HOOD_OPTIONS}
              selectedValue={config.rangeHood}
              onChange={(value) => updateConfig({ rangeHood: value })}
              badge="Required"
            />

            <EquipmentSelector
              title="Fire Suppression System"
              description="Safety requirement for commercial kitchens"
              icon={<Flame className="h-5 w-5" />}
              options={FIRE_SUPPRESSION_OPTIONS}
              selectedValue={config.fireSuppressionSystem}
              onChange={(value) => updateConfig({ fireSuppressionSystem: value })}
              badge="Required"
            />
          </div>
        </motion.div>

        {/* Cooking Equipment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-blue-500" />
            Cooking Equipment
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EquipmentSelector
              title="Flat Top Griddle"
              description="Perfect for burgers, pancakes & more"
              icon={<ChefHat className="h-5 w-5" />}
              options={FLAT_TOP_GRIDDLE_OPTIONS}
              selectedValue={config.flatTopGriddle}
              onChange={(value) => updateConfig({ flatTopGriddle: value })}
            />

            <EquipmentSelector
              title="Charbroiler"
              description="For grilled meats & vegetables"
              icon={<Flame className="h-5 w-5" />}
              options={CHARBROILER_OPTIONS}
              selectedValue={config.charbroiler}
              onChange={(value) => updateConfig({ charbroiler: value })}
            />

            <EquipmentSelector
              title="Deep Fryer"
              description="For crispy fried foods"
              icon={<Flame className="h-5 w-5" />}
              options={DEEP_FRYER_OPTIONS}
              selectedValue={config.deepFryer}
              onChange={(value) => updateConfig({ deepFryer: value })}
            />

            <EquipmentSelector
              title="Range / Burners"
              description="For stovetop cooking"
              icon={<Flame className="h-5 w-5" />}
              options={RANGE_OPTIONS}
              selectedValue={config.range}
              onChange={(value) => updateConfig({ range: value })}
            />

            <EquipmentSelector
              title="Steam Well"
              description="Keep food hot & ready to serve"
              icon={<Wind className="h-5 w-5" />}
              options={STEAM_WELL_OPTIONS}
              selectedValue={config.steamWell}
              onChange={(value) => updateConfig({ steamWell: value })}
            />

            <EquipmentSelector
              title="Warming Cabinet"
              description="Hold prepared food at serving temperature"
              icon={<ChefHat className="h-5 w-5" />}
              options={WARMING_CABINET_OPTIONS}
              selectedValue={config.warmingCabinet}
              onChange={(value) => updateConfig({ warmingCabinet: value })}
            />
          </div>
        </motion.div>

        {/* Refrigeration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Refrigerator className="h-5 w-5 text-cyan-500" />
            Refrigeration
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Select all that apply. Multiple units can be added.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REFRIGERATION_OPTIONS.map((option) => {
              const isSelected = config.refrigeration?.includes(option.value);
              const isNone = option.value === "none";

              return (
                <button
                  key={option.value}
                  onClick={() => handleRefrigerationChange(option.value)}
                  className={cn(
                    "p-3 sm:p-4 rounded-xl border-2 text-left transition-all",
                    isSelected
                      ? "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-600"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-400"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center",
                          isSelected
                            ? "bg-cyan-600 border-cyan-600"
                            : "border-slate-300 dark:border-slate-600"
                        )}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className={cn(
                          "font-medium text-sm",
                          isSelected ? "text-cyan-700 dark:text-cyan-300" : "text-slate-700 dark:text-slate-300"
                        )}>
                          {option.label}
                        </span>
                      </div>
                      {!isNone && option.price > 0 && (
                        <span className="text-xs text-green-600 mt-1 block ml-7">
                          +${option.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3 mb-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Additional Equipment Notes</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Any features or equipment not listed above? Let us know!
                </p>
              </div>
            </div>
            <textarea
              value={config.additionalInfo}
              onChange={(e) => updateConfig({ additionalInfo: e.target.value })}
              placeholder="e.g., I need a specific brand of griddle, custom placement requirements, etc."
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
