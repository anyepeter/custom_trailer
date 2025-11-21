"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ruler,
  Building2,
  Palette,
  Shield,
  Home,
  ChefHat,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Trailer, DetailedSpecs, TrailerSpecs } from "@/types/trailer";

interface SpecificationsTabProps {
  trailer: Trailer;
}

interface SpecSectionProps {
  title: string;
  icon: React.ReactNode;
  items: { label: string; value: string | number | boolean }[];
  defaultOpen?: boolean;
}

function SpecSection({ title, icon, items, defaultOpen = false }: SpecSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 sm:p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors min-h-[56px] sm:min-h-0"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 sm:p-4 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col xs:flex-row xs:items-center xs:justify-between py-2 sm:py-2 border-b border-gray-100 last:border-0 gap-1 xs:gap-2"
                  >
                    <span className="text-xs sm:text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      {typeof item.value === "boolean" ? (
                        item.value ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Yes
                          </>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )
                      ) : (
                        <span className="break-words">{item.value}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function SpecificationsTab({ trailer }: SpecificationsTabProps) {
  // Use detailed specs if available, otherwise convert from basic specs
  const detailedSpecs = trailer.detailedSpecs;
  const basicSpecs = trailer.specs;

  // Physical Dimensions
  const physicalDimensions = detailedSpecs?.physicalDimensions
    ? [
        { label: "Kitchen Length", value: detailedSpecs.physicalDimensions.kitchenLength },
        { label: "Exterior Length", value: detailedSpecs.physicalDimensions.exteriorLength },
        { label: "Exterior Width", value: detailedSpecs.physicalDimensions.exteriorWidth },
        { label: "Exterior Height", value: detailedSpecs.physicalDimensions.exteriorHeight },
        { label: "Interior Height", value: detailedSpecs.physicalDimensions.interiorHeight },
        ...(detailedSpecs.physicalDimensions.porchDimensions
          ? [{ label: "Porch Dimensions", value: detailedSpecs.physicalDimensions.porchDimensions }]
          : []),
      ]
    : [
        { label: "Exterior Length", value: basicSpecs.exteriorLength },
        { label: "Exterior Width", value: basicSpecs.exteriorWidth },
        { label: "Exterior Height", value: basicSpecs.exteriorHeight },
        { label: "Interior Height", value: basicSpecs.interiorHeight },
      ];

  // Structural Components
  const structuralSpecs = detailedSpecs?.structural
    ? [
        { label: "Exterior Material", value: detailedSpecs.structural.exteriorMaterial },
        { label: "Material Thickness", value: detailedSpecs.structural.exteriorThickness },
        { label: "Frame Specs", value: detailedSpecs.structural.frameSpecs },
        { label: "Tongue Specs", value: detailedSpecs.structural.tongueSpecs },
        { label: "Axle Specs", value: detailedSpecs.structural.axleSpecs },
        { label: "Axle Weight Rating", value: detailedSpecs.structural.axleWeightRating },
      ]
    : [
        { label: "Axles", value: basicSpecs.axles },
        { label: "Jack", value: basicSpecs.jack },
        { label: "Weight", value: basicSpecs.weight },
        { label: "Wall Material", value: basicSpecs.wallMaterial },
      ];

  // Exterior Features
  const exteriorSpecs = detailedSpecs?.exterior
    ? [
        { label: "Available Colors", value: detailedSpecs.exterior.colorOptions.join(", ") },
        { label: "Trim Package", value: detailedSpecs.exterior.trimPackage },
        { label: "Fender Specs", value: detailedSpecs.exterior.fenderSpecs },
        { label: "Wheel Options", value: detailedSpecs.exterior.wheelOptions },
        { label: "Tire Specs", value: detailedSpecs.exterior.tireSpecs },
      ]
    : [
        { label: "Roof Material", value: basicSpecs.roofMaterial },
        { label: "Wall Material", value: basicSpecs.wallMaterial },
      ];

  // Safety & Utility
  const safetySpecs = detailedSpecs?.safetyUtility
    ? [
        { label: "Propane Cage", value: detailedSpecs.safetyUtility.propaneCage },
        ...(detailedSpecs.safetyUtility.generatorBox
          ? [{ label: "Generator Box", value: detailedSpecs.safetyUtility.generatorBox }]
          : []),
        { label: "Jacks", value: detailedSpecs.safetyUtility.jacks },
        { label: "Jack Quantity", value: detailedSpecs.safetyUtility.jackQuantity },
        { label: "Spare Tire", value: detailedSpecs.safetyUtility.spareTire },
        { label: "LED Flood Lights", value: detailedSpecs.safetyUtility.ledFloodLights },
        { label: "Interior Lighting", value: detailedSpecs.safetyUtility.interiorLighting },
        ...(detailedSpecs.safetyUtility.awning
          ? [{ label: "Awning", value: detailedSpecs.safetyUtility.awning }]
          : []),
      ]
    : [
        { label: "Jack", value: basicSpecs.jack },
        { label: "Fire Suppression", value: trailer.features.fireSuppressionSystem },
        { label: "Ansul System", value: trailer.features.ansulSystem },
      ];

  // Interior Features
  const interiorSpecs = detailedSpecs?.interior
    ? [
        { label: "Wall Finish", value: detailedSpecs.interior.wallFinish },
        { label: "Ceiling Finish", value: detailedSpecs.interior.ceilingFinish },
        { label: "Flooring Type", value: detailedSpecs.interior.flooringType },
        { label: "Insulation", value: detailedSpecs.interior.insulationDetails },
        { label: "Interior Lighting", value: detailedSpecs.interior.interiorLighting },
      ]
    : [
        { label: "Floor Material", value: basicSpecs.floorMaterial },
        { label: "Wall Material", value: basicSpecs.wallMaterial },
        { label: "Insulation", value: basicSpecs.insulation },
      ];

  // Kitchen Equipment
  const kitchenSpecs = detailedSpecs?.kitchenEquipment
    ? [
        ...(detailedSpecs.kitchenEquipment.rangeHoodSpecs
          ? [{ label: "Range Hood Specs", value: detailedSpecs.kitchenEquipment.rangeHoodSpecs }]
          : []),
        { label: "Work Table Dimensions", value: detailedSpecs.kitchenEquipment.workTableDimensions },
        { label: "Cabinet Details", value: detailedSpecs.kitchenEquipment.cabinetDetails },
        { label: "Door Specs", value: detailedSpecs.kitchenEquipment.doorSpecs },
        { label: "Fresh Water Capacity", value: detailedSpecs.kitchenEquipment.freshWaterCapacity },
        { label: "Grey Water Capacity", value: detailedSpecs.kitchenEquipment.greyWaterCapacity },
        { label: "Electrical Outlets", value: detailedSpecs.kitchenEquipment.electricalOutlets },
        ...(detailedSpecs.kitchenEquipment.fireSuppressionSystem
          ? [{ label: "Fire Suppression", value: detailedSpecs.kitchenEquipment.fireSuppressionSystem }]
          : []),
      ]
    : [
        { label: "Refrigeration", value: trailer.features.refrigeration },
        { label: "Range Hood", value: trailer.features.rangeHood },
        { label: "3-Compartment Sink", value: trailer.features.threeCompartmentSink },
        { label: "Handwash Sink", value: trailer.features.handwashSink },
      ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Detailed Specifications</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Complete technical specifications for the {trailer.name}
        </p>
      </div>

      <div className="space-y-3">
        <SpecSection
          title="Physical Dimensions"
          icon={<Ruler className="h-5 w-5" />}
          items={physicalDimensions}
          defaultOpen={true}
        />
        <SpecSection
          title="Structural Components"
          icon={<Building2 className="h-5 w-5" />}
          items={structuralSpecs}
        />
        <SpecSection
          title="Exterior Features"
          icon={<Palette className="h-5 w-5" />}
          items={exteriorSpecs}
        />
        <SpecSection
          title="Safety & Utility"
          icon={<Shield className="h-5 w-5" />}
          items={safetySpecs}
        />
        <SpecSection
          title="Interior Features"
          icon={<Home className="h-5 w-5" />}
          items={interiorSpecs}
        />
        <SpecSection
          title="Kitchen Equipment"
          icon={<ChefHat className="h-5 w-5" />}
          items={kitchenSpecs}
        />
      </div>
    </div>
  );
}
