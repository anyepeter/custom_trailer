"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { mapTruckToTrailer } from "@/lib/truckMapper";
import TrailerCard from "@/components/shop/TrailerCard";
import TrucksLoader from "@/components/shop/TrucksLoader";
import Link from "next/link";

export default function ProductCarousel() {
  const { trucks, loading, error } = useAppSelector((state) => state.trucks);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map trucks to trailer format and get first 4
  const featuredTrailers = useMemo(() => {
    return trucks.slice(0, 4).map(mapTruckToTrailer);
  }, [trucks]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTrailers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTrailers.length) % featuredTrailers.length);
  };

  return (
    <section
      id="inventory"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="inventory-heading"
    >
      {/* Load trucks from database */}
      <TrucksLoader />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="inventory-heading"
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              Featured Inventory
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get on the road faster with our food trucks. Browse our featured inventory.
            </p>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading trucks...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading trucks. Please try again later.</p>
          </div>
        )}

        {/* Carousel */}
        {!loading && !error && featuredTrailers.length > 0 && (
          <>
            <div className="max-w-6xl mx-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="px-12"
                >
                  <div className="max-w-sm mx-auto">
                    <TrailerCard
                      trailer={featuredTrailers[currentIndex]}
                      index={0}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {featuredTrailers.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    aria-label="Previous product"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    aria-label="Next product"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {featuredTrailers.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {featuredTrailers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all ${
                      index === currentIndex
                        ? "w-8 h-2 bg-blue-600 rounded-full"
                        : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                    }`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* View All Link */}
            <div className="text-center mt-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <Link href="/shop">
                  View All Inventory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && featuredTrailers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No trucks available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
