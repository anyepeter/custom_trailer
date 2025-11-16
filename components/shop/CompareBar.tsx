"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trailer } from "@/types/trailer";

interface CompareBarProps {
  selectedTrailers: Trailer[];
  onRemove: (trailerId: string) => void;
  onClear: () => void;
}

export default function CompareBar({
  selectedTrailers,
  onRemove,
  onClear,
}: CompareBarProps) {
  if (selectedTrailers.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-600 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Section - Selected Trailers */}
            <div className="flex items-center gap-4 flex-1 overflow-x-auto">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Compare Trailers
                </h3>
                <span className="text-xs text-gray-500">
                  ({selectedTrailers.length}/3)
                </span>
              </div>

              {/* Selected Trailer Pills */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {selectedTrailers.map((trailer) => {
                  const primaryImage =
                    trailer.images.find((img) => img.isPrimary) ||
                    trailer.images[0];

                  return (
                    <motion.div
                      key={trailer.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 pr-3 border border-gray-200 min-w-[200px]"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {trailer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${trailer.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemove(trailer.id)}
                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={`Remove ${trailer.name} from comparison`}
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {selectedTrailers.length >= 2 && (
                <div className="hidden sm:block text-xs text-gray-600">
                  Select up to 3 trailers to compare
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                className="whitespace-nowrap"
              >
                Clear All
              </Button>

              {selectedTrailers.length >= 2 && (
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                  onClick={() => {
                    // Show comparison modal or inline comparison
                    showComparison(selectedTrailers);
                  }}
                >
                  Compare Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Comparison Inline View (when Compare Now is clicked) */}
          {/* This is a simple inline comparison - you could make this more sophisticated */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper function to show comparison (inline or modal)
function showComparison(trailers: Trailer[]) {
  // For now, we'll just scroll to a comparison section or show a modal
  // You could implement this as a modal dialog using shadcn/ui Dialog component

  // Simple alert for demonstration - replace with actual comparison UI
  const comparisonData = trailers
    .map(
      (t) =>
        `${t.name} - ${t.size} - $${t.price.toLocaleString()} - ${
          t.isAvailable ? "Available" : "Build-to-Order"
        }`
    )
    .join("\n");

  // In a real implementation, you'd show a modal or redirect to a comparison view
  // For now, we'll create a simple inline comparison table
  createComparisonTable(trailers);
}

function createComparisonTable(trailers: Trailer[]) {
  // This is a simplified version - in production you'd want to render this properly
  // You could create a modal dialog or a slide-up panel with a full comparison table

  const features = [
    "Price",
    "Size",
    "Type",
    "Availability",
    "Refrigeration",
    "Range Hood",
    "24\" Griddle",
    "Deep Fryer",
    "Range",
    "Fire Suppression",
    "Build Lead Time",
  ];

  console.log("=== TRAILER COMPARISON ===");
  trailers.forEach((trailer) => {
    console.log(`\n${trailer.name}:`);
    console.log(`- Price: $${trailer.price.toLocaleString()}`);
    console.log(`- Size: ${trailer.size}`);
    console.log(`- Type: ${trailer.type}`);
    console.log(`- Available: ${trailer.isAvailable ? "Yes" : "Build-to-Order"}`);
    console.log(`- Build Time: ${trailer.buildLeadTime}`);
  });

  // In a real app, you'd show this in a modal or dedicated section
  // For demonstration purposes, we're just logging to console
  // You should replace this with a proper UI component
}
