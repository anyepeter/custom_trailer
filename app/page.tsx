import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureHighlights from "@/components/FeatureHighlights";
import ProductCarousel from "@/components/ProductCarousel";
import Gallery from "@/components/Gallery";
import CompaniesServed from "@/components/CompaniesServed";
import Testimonials from "@/components/Testimonials";
import ProcessSteps from "@/components/ProcessSteps";
import FinancingCallout from "@/components/FinancingCallout";
import LeadMagnet from "@/components/LeadMagnet";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Auto-Playing Carousel */}
      <Hero />

      {/* Feature Highlights - Value Props */}
      <FeatureHighlights />

      {/* Featured Inventory Carousel */}
      <ProductCarousel />

      {/* Gallery - Real Builds / Before & After */}
      <Gallery />

      {/* How It Works - 4 Step Process */}
      <ProcessSteps />

      {/* Companies We've Served */}
      <CompaniesServed />

      {/* Testimonials & Social Proof */}
      <Testimonials />

      {/* Financing Callout */}
      {/* <FinancingCallout /> */}

      {/* Lead Magnet - Downloadable Guide & Consultation */}
      <LeadMagnet />

      {/* Footer with Newsletter, Contact, Legal */}
      <Footer />

      {/* Sticky CTA Button & Floating Contact Buttons */}
      {/* <StickyCTA /> */}
    </main>
  );
}
