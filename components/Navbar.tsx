"use client";

import { useState, useEffect } from "react";
import { Menu, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Design Builder", href: "#builder" },
  { label: "Financing", href: "#financing" },
  { label: "How-to", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar becomes solid after scrolling 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Top bar with contact info */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          isScrolled
            ? "border-gray-200 opacity-0 h-0 overflow-hidden"
            : "border-white/20 opacity-100 h-auto"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end gap-6 py-2 text-sm">
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              aria-label="Call us at 1-800-555-1234"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">1-800-555-1234</span>
            </a>
            <a
              href="mailto:sales@foodtrucks.com"
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              aria-label="Email us at sales@foodtrucks.com"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">sales@foodtrucks.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className={cn(
              "text-2xl font-bold transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}
            aria-label="Food Trucks Home"
          >
            FoodTrucks<span className="text-blue-600">Pro</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-blue-600",
                  isScrolled ? "text-gray-700" : "text-white"
                )}
                data-analytics="nav-link"
                data-nav-item={link.label.toLowerCase()}
              >
                {link.label}
              </a>
            ))}
            <Button
              size="default"
              className="bg-blue-600 hover:bg-blue-700"
              data-analytics="cta-nav-quote"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open mobile menu"
                className={cn(isScrolled ? "text-gray-900" : "text-white")}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-analytics="mobile-nav-link"
                    data-nav-item={link.label.toLowerCase()}
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                  data-analytics="cta-mobile-quote"
                >
                  Get Quote
                </Button>
                <div className="flex flex-col gap-3 pt-6 border-t">
                  <a
                    href="tel:+18005551234"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="h-5 w-5" />
                    1-800-555-1234
                  </a>
                  <a
                    href="mailto:sales@foodtrucks.com"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Mail className="h-5 w-5" />
                    sales@foodtrucks.com
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
