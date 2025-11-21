"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Real gallery images from your public directory
const galleryImages = [
  {
    id: 1,
    src: "/exterior1.jpg",
    alt: "Custom food truck exterior - Professional build",
    category: "Exterior",
  },
  {
    id: 2,
    src: "/exterior2.jpg",
    alt: "Food trailer on location - Ready for service",
    category: "Exterior",
  },
  {
    id: 3,
    src: "/exterior3.jpg",
    alt: "Mobile food unit - Custom design",
    category: "Exterior",
  },
  {
    id: 4,
    src: "/interior1.jpg",
    alt: "Commercial kitchen interior - Stainless steel setup",
    category: "Interior",
  },
  {
    id: 5,
    src: "/interior2.jpg",
    alt: "Professional kitchen layout - Equipment installed",
    category: "Interior",
  },
  {
    id: 6,
    src: "/interior3.jpg",
    alt: "Food prep station - Ready for operation",
    category: "Interior",
  },
  {
    id: 7,
    src: "/hero-1.jpg",
    alt: "Featured food truck build - Premium quality",
    category: "Featured",
  },
  {
    id: 8,
    src: "/hero-2.avif",
    alt: "Modern food trailer design - Custom built",
    category: "Featured",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Exterior", "Interior", "Featured"];

  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = galleryImages.find((img) => img.id === selectedImage);

  return (
    <section
      id="gallery"
      className="py-20 bg-white"
      aria-labelledby="gallery-heading"
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
              id="gallery-heading"
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              Real Builds Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              See the quality and craftsmanship in our custom food trucks and trailers
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className={
                    filter === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  }
                  data-analytics="gallery-filter"
                  data-category={category.toLowerCase()}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(image.id)}
                data-analytics="gallery-image-click"
                data-image-id={image.id}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && selectedImageData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative max-w-[90vw] max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImageData.src}
                  alt={selectedImageData.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  sizes="90vw"
                />

                {/* Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-lg">{selectedImageData.alt}</p>
                  <p className="text-gray-300 text-sm mt-1">
                    {selectedImageData.category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
