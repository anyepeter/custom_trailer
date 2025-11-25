"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Grid3x3, Grid2x2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterPanel, {
  FilterState,
} from "@/components/shop/FilterPanel";
import TrailerCard from "@/components/shop/TrailerCard";
import CartBar from "@/components/shop/CartBar";
import { Button } from "@/components/ui/button";
import { filterTrailers, sortTrailers } from "@/data/trailers";
import { Trailer, SortOption } from "@/types/trailer";
import TrucksLoader from "@/components/shop/TrucksLoader";
import { useAppSelector } from "@/store/hooks";
import { mapTruckToTrailer } from "@/lib/truckMapper";

export default function ShopPage() {
  // Load trucks from database into Redux
  const { trucks, loading, error } = useAppSelector((state) => state.trucks);

  const [filters, setFilters] = useState<FilterState>({
    types: [],
    sizes: [],
    priceRange: { min: 0, max: 999999 },
    features: [],
    availability: undefined,
  });

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [filteredTrailers, setFilteredTrailers] = useState<Trailer[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid-3" | "grid-2">("grid-3");

  // Map trucks to trailer format for UI compatibility
  const trailers = useMemo(() => {
    return trucks.map(mapTruckToTrailer);
  }, [trucks]);

  // Apply filters and sorting
  useEffect(() => {
    let result = filterTrailers(trailers, {
      types: filters.types.length > 0 ? filters.types : undefined,
      sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
      priceRange:
        filters.priceRange.min > 0 || filters.priceRange.max < 999999
          ? filters.priceRange
          : undefined,
      features: filters.features.length > 0 ? filters.features : undefined,
      availability: filters.availability,
    });

    result = sortTrailers(result, sortBy);
    setFilteredTrailers(result);
  }, [filters, sortBy, trailers]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Load trucks from database on mount */}
      <TrucksLoader />

      <Navbar />

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar - Desktop Filters */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  Showing <strong>{filteredTrailers.length}</strong> of{" "}
                  <strong>{trailers.length}</strong> trailers
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
                    <button
                      onClick={() => setViewMode("grid-3")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid-3"
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="3 column grid"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid-2")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid-2"
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="2 column grid"
                    >
                      <Grid2x2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="size-asc">Size: Smallest First</option>
                    <option value="size-desc">Size: Largest First</option>
                    <option value="type-az">Type: A-Z</option>
                  </select>

                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Mobile Filters (Sheet/Drawer) */}
              {isMobileFilterOpen && (
                <div className="lg:hidden mb-6">
                  <FilterPanel
                    onFilterChange={handleFilterChange}
                    onClose={() => setIsMobileFilterOpen(false)}
                  />
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-20">
                  <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading trucks...</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-red-500 mb-4">
                    <SlidersHorizontal className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Error Loading Trucks
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                </motion.div>
              )}

              {/* Trailer Grid */}
              {!loading && !error && filteredTrailers.length > 0 && (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid-3"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 lg:grid-cols-2"
                  }`}
                >
                  {filteredTrailers.map((trailer, index) => (
                    <TrailerCard
                      key={trailer.id}
                      trailer={trailer}
                      index={index}
                    />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!loading && !error && filteredTrailers.length === 0 && trailers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-gray-400 mb-4">
                    <SlidersHorizontal className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No trailers found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    onClick={() =>
                      setFilters({
                        types: [],
                        sizes: [],
                        priceRange: { min: 0, max: 999999 },
                        features: [],
                        availability: undefined,
                      })
                    }
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              )}

              {/* Empty State (no trucks in database) */}
              {!loading && !error && trailers.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-gray-400 mb-4">
                    <SlidersHorizontal className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No trucks available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Check back soon for new inventory
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cart Bar */}
      <CartBar />

      <Footer />
    </main>
  );
}
