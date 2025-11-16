"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Ruler,
  Weight,
  Package,
  Shield,
  Star,
  ShoppingCart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/shop/ImageGallery";
import QuoteForm from "@/components/shop/QuoteForm";
import CartBar from "@/components/shop/CartBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trailers } from "@/data/trailers";
import { Trailer } from "@/types/trailer";
import { useCart } from "@/contexts/CartContext";

export default function TrailerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { addToCart } = useCart();

  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);

  // Find the trailer by slug
  const trailer = trailers.find((t) => t.slug === slug);

  const handleAddToCart = () => {
    if (trailer) {
      addToCart(trailer, selectedUpgrades);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const toggleUpgrade = (upgradeId: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(upgradeId)
        ? prev.filter((id) => id !== upgradeId)
        : [...prev, upgradeId]
    );
  };

  // 404 if trailer not found
  if (!trailer) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trailer Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The trailer you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb & Back Button */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              href="/shop"
              className="hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
            <span>/</span>
            <span className="text-gray-900">{trailer.name}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Image Gallery */}
            <div>
              <ImageGallery
                images={trailer.images}
                productName={trailer.name}
              />
            </div>

            {/* Right Column - Product Info */}
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-blue-600 text-white border-0">
                  {trailer.type}
                </Badge>
                <Badge
                  className={
                    trailer.isAvailable
                      ? "bg-green-600 text-white border-0"
                      : "bg-orange-600 text-white border-0"
                  }
                >
                  {trailer.isAvailable ? "Available Now" : "Build-to-Order"}
                </Badge>
                {trailer.isFeatured && (
                  <Badge className="bg-purple-600 text-white border-0">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {trailer.name}
              </h1>

              {/* Short Description */}
              <p className="text-xl text-gray-600 mb-6">
                {trailer.shortDescription}
              </p>

              {/* Price */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200 mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-sm text-gray-600">Starting at</span>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${trailer.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{trailer.buildLeadTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    <span>{trailer.size}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4 bg-white border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Equipment</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {trailer.equipmentList.length} Items
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Warranty</p>
                      <p className="text-lg font-semibold text-gray-900">
                        10 Years
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className={`text-white flex-1 transition-all ${
                    addedToCart
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:border-blue-600 hover:text-blue-600"
                  asChild
                >
                  <a href="#quote-form">Request Custom Quote</a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>NSF Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>DOT Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Free Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-12">
            <Card className="p-8 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {trailer.fullDescription}
              </p>
            </Card>
          </div>

          {/* Features & Specs Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Features */}
            <Card className="p-8 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Features & Equipment
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(trailer.features).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 ${
                      value ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 flex-shrink-0 ${
                        value ? "text-green-600" : "text-gray-300"
                      }`}
                    />
                    <span className="text-sm">
                      {formatFeatureName(key)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Specifications */}
            <Card className="p-8 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>
              <div className="space-y-4">
                {Object.entries(trailer.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0"
                  >
                    <span className="text-sm text-gray-600">
                      {formatSpecName(key)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Equipment List */}
          <Card className="p-8 bg-white mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Included Equipment
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {trailer.equipmentList.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Available Upgrades */}
          {trailer.upgrades.length > 0 && (
            <Card className="p-8 bg-white mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available Upgrades
              </h2>
              <p className="text-gray-600 mb-6">
                Customize your trailer with these premium upgrades
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trailer.upgrades.map((upgrade) => {
                  const isSelected = selectedUpgrades.includes(upgrade.id);
                  return (
                    <button
                      key={upgrade.id}
                      onClick={() => toggleUpgrade(upgrade.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? "bg-blue-50 border-blue-600"
                          : "bg-gray-50 border-gray-200 hover:border-blue-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <h3 className="text-sm font-semibold text-gray-900">
                            {upgrade.name}
                          </h3>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs bg-white ml-2"
                        >
                          {upgrade.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 ml-6">
                        {upgrade.description}
                      </p>
                      <p className="text-lg font-bold text-blue-600 ml-6">
                        +${upgrade.price.toLocaleString()}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Quote Form */}
          <div id="quote-form">
            <QuoteForm
              trailerId={trailer.id}
              trailerName={trailer.name}
              trailerPrice={trailer.price}
            />
          </div>
        </div>
      </section>

      {/* Cart Bar */}
      <CartBar />

      <Footer />
    </main>
  );
}

// Helper function to format feature names
function formatFeatureName(key: string): string {
  const map: Record<string, string> = {
    refrigeration: "Refrigeration",
    rangeHood: "Range Hood",
    griddle24: "24\" Griddle",
    deepFryer: "Deep Fryer",
    range: "Range/Stove",
    charbroiler24: "24\" Charbroiler",
    gasLines: "Gas Lines",
    threeCompartmentSink: "3-Compartment Sink",
    handwashSink: "Handwash Sink",
    fireSuppressionSystem: "Fire Suppression System",
    ansulSystem: "Ansul System",
  };
  return map[key] || key;
}

// Helper function to format spec names
function formatSpecName(key: string): string {
  const map: Record<string, string> = {
    exteriorLength: "Exterior Length",
    exteriorWidth: "Exterior Width",
    exteriorHeight: "Exterior Height",
    interiorHeight: "Interior Height",
    weight: "Weight",
    axles: "Axles",
    jack: "Jack",
    wallMaterial: "Wall Material",
    floorMaterial: "Floor Material",
    roofMaterial: "Roof Material",
    insulation: "Insulation",
  };
  return map[key] || key;
}
