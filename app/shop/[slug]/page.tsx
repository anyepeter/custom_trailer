"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Ruler,
  Package,
  Shield,
  Star,
  ShoppingCart,
  Home,
  ChevronRight,
  FileText,
  CreditCard,
  ClipboardCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/shop/ImageGallery";
import QuoteForm from "@/components/shop/QuoteForm";
import CartBar from "@/components/shop/CartBar";
import ProductActionBar from "@/components/product/ProductActionBar";
import SpecificationsTab from "@/components/product/SpecificationsTab";
import FinancingSection from "@/components/product/FinancingSection";
import ComplianceSection from "@/components/product/ComplianceSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { trailers } from "@/data/trailers";
import { useCart } from "@/contexts/CartContext";

export default function TrailerDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();

  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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

  // Calculate total price with upgrades
  const upgradesTotal = selectedUpgrades.reduce((total, id) => {
    const upgrade = trailer?.upgrades.find((u) => u.id === id);
    return total + (upgrade?.price || 0);
  }, 0);
  const totalPrice = (trailer?.price || 0) + upgradesTotal;

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

  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-gray-200 pt-20 pb-2 sm:pt-20 sm:pb-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
            <Link
              href="/"
              className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <Link
              href="/shop"
              className="text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
            >
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <Link
              href={`/shop?type=${trailer.type}`}
              className="text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
            >
              {trailer.type}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate max-w-[120px] sm:max-w-[200px]">
              {trailer.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 sm:py-8">
        <div className="container mx-auto px-4">
          {/* Product Header with Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <Badge className="bg-gray-200 text-gray-700 border-0 text-xs">
                  Model: {trailer.modelNumber || trailer.id.toUpperCase()}
                </Badge>
                {trailer.isBestSeller && (
                  <Badge className="bg-amber-500 text-white border-0 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Best Seller
                  </Badge>
                )}
                {trailer.isNew && (
                  <Badge className="bg-green-500 text-white border-0 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {trailer.name}
              </h1>
            </div>
            <ProductActionBar
              productName={trailer.name}
              productUrl={productUrl}
              virtualTourUrl={trailer.virtualTourUrl}
              onDesignYourOwn={() => {
                document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Left Column - Image Gallery */}
            <div>
              <ImageGallery images={trailer.images} productName={trailer.name} />
            </div>

            {/* Right Column - Product Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <Badge className="bg-blue-600 text-white border-0 text-xs">
                  {trailer.type}
                </Badge>
                <Badge
                  className={`text-xs ${
                    trailer.isAvailable
                      ? "bg-green-600 text-white border-0"
                      : "bg-orange-600 text-white border-0"
                  }`}
                >
                  {trailer.isAvailable ? "In Stock" : "Build-to-Order"}
                </Badge>
                {trailer.isFeatured && (
                  <Badge className="bg-purple-600 text-white border-0 text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Short Description */}
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                {trailer.shortDescription}
              </p>

              {/* Price Card */}
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200 mb-4 sm:mb-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Starting at</p>
                    <p className="text-2xl sm:text-4xl font-bold text-gray-900">
                      ${trailer.price.toLocaleString()}
                    </p>
                  </div>
                  {upgradesTotal > 0 && (
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">With upgrades</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">
                        ${totalPrice.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{trailer.buildLeadTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ruler className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{trailer.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{trailer.specs.weight}</span>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Card className="p-3 sm:p-4 bg-white border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">Equipment</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        {trailer.equipmentList.length} Items
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 sm:p-4 bg-white border-gray-200 hover:border-green-300 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">Warranty</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        10 Years
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Button
                  size="default"
                  className={`text-white flex-1 transition-all text-sm sm:text-base py-2.5 sm:py-3 ${
                    addedToCart
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Add to Cart - ${totalPrice.toLocaleString()}
                    </>
                  )}
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="border-gray-300 hover:border-blue-600 hover:text-blue-600 text-sm sm:text-base py-2.5 sm:py-3"
                  asChild
                >
                  <a href="#quote-form">Request Quote</a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-4 text-xs sm:text-sm text-gray-600 border-t border-gray-200 pt-4 sm:pt-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span>NSF Certified</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span>DOT Compliant</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span>Financing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Content Section */}
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="mb-0 overflow-x-auto flex-nowrap">
              <TabsTrigger value="overview" icon={<FileText className="h-4 w-4" />}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="specifications" icon={<Ruler className="h-4 w-4" />}>
                Specifications
              </TabsTrigger>
              <TabsTrigger value="upgrades" icon={<Sparkles className="h-4 w-4" />}>
                Options & Upgrades
              </TabsTrigger>
              <TabsTrigger value="financing" icon={<CreditCard className="h-4 w-4" />}>
                Financing
              </TabsTrigger>
              <TabsTrigger value="compliance" icon={<ClipboardCheck className="h-4 w-4" />}>
                Health & Safety
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                {/* Description */}
                <Card className="p-4 sm:p-6 bg-white">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Overview
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    {trailer.fullDescription}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(trailer.features).map(([key, value]) => (
                      <div
                        key={key}
                        className={`flex items-center gap-2 ${
                          value ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                            value ? "text-green-600" : "text-gray-300"
                          }`}
                        />
                        <span className="text-xs sm:text-sm">{formatFeatureName(key)}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Equipment List */}
                <Card className="p-4 sm:p-6 bg-white">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Included Equipment
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {trailer.equipmentList.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specifications">
              <SpecificationsTab trailer={trailer} />
            </TabsContent>

            {/* Upgrades Tab */}
            <TabsContent value="upgrades">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Available Options & Upgrades
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Customize your trailer with these premium upgrades. Selected
                  upgrades will be added to your cart.
                </p>
              </div>

              {trailer.upgrades.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {trailer.upgrades.map((upgrade) => {
                    const isSelected = selectedUpgrades.includes(upgrade.id);
                    return (
                      <motion.button
                        key={upgrade.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleUpgrade(upgrade.id)}
                        className={`p-3 sm:p-5 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                          isSelected
                            ? "bg-blue-50 border-blue-600 shadow-md"
                            : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md"
                        }`}
                      >
                        {/* Popular/New Badge */}
                        {(upgrade.isPopular || upgrade.isNew) && (
                          <div className="absolute top-0 right-0">
                            <Badge
                              className={`rounded-none rounded-bl-lg text-xs ${
                                upgrade.isNew
                                  ? "bg-green-500 text-white"
                                  : "bg-amber-500 text-white"
                              }`}
                            >
                              {upgrade.isNew ? "New" : "Popular"}
                            </Badge>
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                                {upgrade.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-[10px] sm:text-xs mt-1 bg-gray-50"
                              >
                                {upgrade.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 ml-6 sm:ml-8">
                          {upgrade.description}
                        </p>
                        <div className="ml-6 sm:ml-8 flex items-center justify-between">
                          <p className="text-lg sm:text-xl font-bold text-blue-600">
                            +${upgrade.price.toLocaleString()}
                          </p>
                          {isSelected && (
                            <Badge className="bg-blue-600 text-white text-xs">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-6 sm:p-8 text-center bg-gray-50">
                  <p className="text-sm sm:text-base text-gray-600">
                    No additional upgrades available for this trailer.
                  </p>
                </Card>
              )}

              {selectedUpgrades.length > 0 && (
                <Card className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border-blue-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {selectedUpgrades.length} upgrade(s) selected
                      </p>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        Total: ${totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <Button onClick={handleAddToCart} className="w-full sm:w-auto text-sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add All to Cart
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Financing Tab */}
            <TabsContent value="financing">
              <FinancingSection trailerPrice={totalPrice} />
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance">
              <ComplianceSection trailerName={trailer.name} />
            </TabsContent>
          </Tabs>

          {/* Quote Form */}
          <div id="quote-form" className="mt-8 sm:mt-12">
            <QuoteForm
              trailerId={trailer.id}
              trailerName={trailer.name}
              trailerPrice={totalPrice}
            />
          </div>

          {/* Related Products */}
          <RelatedProducts
            currentTrailerId={trailer.id}
            trailers={trailers}
            relatedIds={trailer.relatedTrailerIds}
          />
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
    griddle24: '24" Griddle',
    deepFryer: "Deep Fryer",
    range: "Range/Stove",
    charbroiler24: '24" Charbroiler',
    gasLines: "Gas Lines",
    threeCompartmentSink: "3-Compartment Sink",
    handwashSink: "Handwash Sink",
    fireSuppressionSystem: "Fire Suppression System",
    ansulSystem: "Ansul System",
  };
  return map[key] || key;
}
