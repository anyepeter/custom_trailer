"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Gauge, Ruler, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample inventory data - replace with real data from API/CMS
const inventory = [
  {
    id: 1,
    name: "Gourmet Street Kitchen",
    image: "/truck-1.jpg", // Replace with actual image paths
    price: 89900,
    size: "22 ft",
    specs: "Full commercial kitchen, fryer, flat-top grill, 3-compartment sink",
    tag: "Ready Now",
  },
  {
    id: 2,
    name: "Coffee & Pastry Trailer",
    image: "/truck-2.jpg",
    price: 54900,
    size: "14 ft",
    specs: "Espresso machine, display case, point-of-sale counter",
    tag: "Best Seller",
  },
  {
    id: 3,
    name: "Premium BBQ Smoker",
    image: "/truck-3.jpg",
    price: 124900,
    size: "26 ft",
    specs: "Built-in smoker, warming drawers, commercial refrigeration",
    tag: "Featured",
  },
  {
    id: 4,
    name: "Taco & Mexican Cuisine",
    image: "/truck-4.jpg",
    price: 74900,
    size: "18 ft",
    specs: "Griddle, steam table, taco prep station, hood system",
    tag: "New Arrival",
  },
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % inventory.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + inventory.length) % inventory.length);
  };

  const currentProduct = inventory[currentIndex];

  return (
    <section
      id="inventory"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="inventory-heading"
    >
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
              Ready-Built Inventory
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get on the road faster with our pre-built food trucks. Ready for immediate delivery.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden border-0 shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto bg-gradient-to-br from-gray-800 to-gray-600">
                      {/* Replace with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Truck className="h-24 w-24 opacity-30" />
                      </div>
                      {/* Tag */}
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 text-sm">
                        {currentProduct.tag}
                      </Badge>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {currentProduct.name}
                        </h3>

                        {/* Specs */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-start gap-3">
                            <Ruler className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900">Size</div>
                              <div className="text-gray-600">{currentProduct.size}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Gauge className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-gray-900">Specifications</div>
                              <div className="text-gray-600">{currentProduct.specs}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div>
                        <div className="mb-6">
                          <div className="text-sm text-gray-500 mb-1">Starting at</div>
                          <div className="text-4xl font-bold text-gray-900">
                            ${currentProduct.price.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            size="lg"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            data-analytics="cta-view-details"
                            data-product-id={currentProduct.id}
                          >
                            View Details
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="flex-1"
                            data-analytics="cta-schedule-viewing"
                            data-product-id={currentProduct.id}
                          >
                            Schedule Viewing
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous product"
              data-analytics="carousel-prev"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              aria-label="Next product"
              data-analytics="carousel-next"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {inventory.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? "w-8 h-2 bg-blue-600 rounded-full"
                    : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                }`}
                aria-label={`Go to product ${index + 1}`}
                data-analytics="carousel-dot"
                data-index={index}
              />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700"
              data-analytics="cta-view-all-inventory"
            >
              View All Inventory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
