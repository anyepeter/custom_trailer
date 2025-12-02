"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trailer } from "@/types/trailer";

interface TrailerCardProps {
  trailer: Trailer;
  index?: number;
  layout?: "vertical" | "horizontal";
}

export default function TrailerCard({
  trailer,
  index = 0,
  layout = "vertical",
}: TrailerCardProps) {
  const primaryImage = trailer.images.find((img) => img.isPrimary) || trailer.images[0];
 console.log(primaryImage)
  // Count key features
  const keyFeatures = [
    trailer.features.refrigeration && "Refrigeration",
    trailer.features.griddle24 && "24\" Griddle",
    trailer.features.deepFryer && "Deep Fryer",
    trailer.features.range && "Range",
    trailer.features.ansulSystem && "Ansul System",
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group h-full"
    >
      <Card className={`h-full overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white flex flex-col ${layout === "horizontal" ? "md:flex-row" : ""}`}>
        {/* Image Section */}
        <Link href={`/shop/${trailer.slug}`} className={`relative flex-1 block ${layout === "horizontal" ? "md:flex-shrink-0" : ""}`}>
          <div className={`relative bg-gray-100 overflow-hidden ${layout === "horizontal" ? "w-full h-64  md:h-full md:min-h-[400px]" : "w-full h-64"}`}>
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              quality={95}
              priority={index < 4}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />


            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
                asChild
              >
                <Link href={`/shop/${trailer.slug}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-6 flex flex-1 justify-between flex-col">
          {/* Type & Size */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              {trailer.type}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-medium text-gray-500">
              {trailer.size}
            </span>
          </div>

          {/* Title */}
          <Link href={`/shop/${trailer.slug}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {trailer.name}
            </h3>
          </Link>

          <div className="flex items-start gap-3">
            <div>
              <div className="font-semibold text-gray-900">Specifications</div>
              <div className="text-gray-600 grid grid-cols-1 gap-2">
                {
                  trailer.equipmentList.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-sm">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {keyFeatures.slice(0, 5).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 text-xs text-gray-600"
                >
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
              {keyFeatures.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{keyFeatures.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Starting at</p>
              <p className="text-2xl font-bold text-gray-900">
                ${trailer.price.toLocaleString()}
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 hover:border-blue-600 hover:text-blue-600"
                asChild
              >
                <Link href={`/shop/${trailer.slug}`}>
                  Learn More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
