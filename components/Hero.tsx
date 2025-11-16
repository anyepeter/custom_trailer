"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Hero carousel slides - each with unique content and imagery
const heroSlides = [
  {
    id: 1,
    image: "/hero-1.jpg", // Replace with actual food truck image
    badge: "Trusted by 500+ food entrepreneurs nationwide",
    title: "Build Your Custom",
    titleAccent: "Food Truck",
    subtitle: "Premium mobile kitchens designed your way. From concept to completion in weeks, not months.",
    stats: [
      { icon: CheckCircle2, text: "6-8 week build time" },
      { icon: CheckCircle2, text: "10-year warranty" },
      { icon: CheckCircle2, text: "100% custom designs" },
    ],
  },
  {
    id: 2,
    image: "/hero-2.avif",
    badge: "Award-winning designs since 2015",
    title: "Premium Quality",
    titleAccent: "Meets Your Vision",
    subtitle: "Commercial-grade equipment, stainless steel construction, and attention to every detail.",
    stats: [
      { icon: CheckCircle2, text: "Commercial-grade equipment" },
      { icon: CheckCircle2, text: "Stainless steel build" },
      { icon: CheckCircle2, text: "Nationwide delivery" },
    ],
  },
  {
    id: 3,
    image: "/hero-3.avif",
    badge: "Fast turnaround guaranteed",
    title: "Start Serving",
    titleAccent: "In 8 Weeks",
    subtitle: "Get on the road faster with our streamlined design-to-delivery process and expert team.",
    stats: [
      { icon: CheckCircle2, text: "Fast approval process" },
      { icon: CheckCircle2, text: "Real-time build updates" },
      { icon: CheckCircle2, text: "Full training included" },
    ],
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality - change slide every 7 seconds (pauses on hover)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return; // Pause when hovering

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered]); // Re-run when hover state changes

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden group"
      id="hero"
      aria-label="Hero section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <Image
              src={currentSlideData.image}
              alt={`${currentSlideData.title} ${currentSlideData.titleAccent}`}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content with Fade-in Animations */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white backdrop-blur-sm border-white/20 px-4 py-2 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {currentSlideData.badge}
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {currentSlideData.title}
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {currentSlideData.titleAccent}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                {currentSlideData.subtitle}
              </motion.p>

              {/* Trust Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-6 mb-12 text-white/90"
              >
                {currentSlideData.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <stat.icon className="h-5 w-5 text-green-400" />
                    <span className="text-sm">{stat.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="xl"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 transition-all group w-full sm:w-auto"
                  data-analytics="cta-hero-primary"
                  data-cta="start-custom-build"
                >
                  Start Your Custom Build
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
                  data-analytics="cta-hero-secondary"
                  data-cta="shop-ready-built"
                >
                  Shop Ready-Built Trucks
                </Button>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80"
              >
                <a
                  href="#builder"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  data-analytics="hero-link-builder"
                >
                  <Play className="h-4 w-4" />
                  Try 3D Design Builder
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="#inventory"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  data-analytics="hero-link-inventory"
                >
                  View Available Inventory
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="#financing"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  data-analytics="hero-link-financing"
                >
                  View Financing Options
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Navigation - Previous/Next Arrows (Show on Hover) */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110"
              aria-label="Previous slide"
              data-analytics="hero-carousel-prev"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110"
              aria-label="Next slide"
              data-analytics="hero-carousel-next"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Carousel Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? "w-8 h-2 bg-white rounded-full"
                : "w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-analytics="hero-carousel-dot"
            data-slide={index}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <div className="text-xs text-white/60 flex items-center gap-2">
          {isAutoPlaying && !isHovered && (
            <>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>Auto-playing</span>
            </>
          )}
          {isHovered && (
            <>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
              <span>Paused</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
