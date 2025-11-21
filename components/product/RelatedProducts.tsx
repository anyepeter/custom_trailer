"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trailer } from "@/types/trailer";
import { useCart } from "@/contexts/CartContext";

interface RelatedProductsProps {
  currentTrailerId: string;
  trailers: Trailer[];
  relatedIds?: string[];
}

export default function RelatedProducts({
  currentTrailerId,
  trailers,
  relatedIds,
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Get related trailers (either specified or similar type)
  const currentTrailer = trailers.find((t) => t.id === currentTrailerId);
  const relatedTrailers = relatedIds
    ? trailers.filter((t) => relatedIds.includes(t.id) && t.id !== currentTrailerId)
    : trailers
        .filter(
          (t) =>
            t.id !== currentTrailerId &&
            (t.type === currentTrailer?.type ||
              Math.abs(t.price - (currentTrailer?.price || 0)) < 15000)
        )
        .slice(0, 6);

  if (relatedTrailers.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (trailer: Trailer) => {
    addToCart(trailer, []);
    setAddedId(trailer.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">You May Also Like</h2>
          <p className="text-sm sm:text-base text-gray-600">Similar trailers that might interest you</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("left")}
            className="w-10 h-10 p-0 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("right")}
            className="w-10 h-10 p-0 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {relatedTrailers.map((trailer, index) => {
          const primaryImage =
            trailer.images.find((img) => img.isPrimary) || trailer.images[0];
          const isAdded = addedId === trailer.id;

          return (
            <motion.div
              key={trailer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-64 sm:w-72"
              style={{ scrollSnapAlign: "start" }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <Link href={`/shop/${trailer.slug}`} className="relative block">
                  <div className="relative h-36 sm:h-44 bg-gray-100 overflow-hidden">
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="288px"
                    />
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {trailer.isBestSeller && (
                        <Badge className="bg-amber-500 text-white border-0 text-xs">
                          Best Seller
                        </Badge>
                      )}
                      {trailer.isNew && (
                        <Badge className="bg-green-500 text-white border-0 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                        <Eye className="h-4 w-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  {/* Type & Size Badges */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                      {trailer.type}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                      {trailer.size}
                    </Badge>
                  </div>

                  {/* Title */}
                  <Link href={`/shop/${trailer.slug}`}>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                      {trailer.name}
                    </h3>
                  </Link>

                  {/* Price & Build Time */}
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Starting at</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        ${trailer.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500">{trailer.buildLeadTime}</p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(trailer)}
                    className={`w-full mt-2 sm:mt-3 transition-all text-xs sm:text-sm ${
                      isAdded
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isAdded ? (
                      "Added!"
                    ) : (
                      <>
                        <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
