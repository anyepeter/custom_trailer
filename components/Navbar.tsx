"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import path from "path";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Design Your Own", href: "/configure" },
  { label: "Financing", href: "#financing" },
  { label: "How-to", href: "/how-to" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  // Track scroll position for home page
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Hide contact bar on shop, configure pages, OR when scrolled on home page
  const hideContactBar =
    pathname?.startsWith("/shop") ||
    pathname?.startsWith("/configure") ||
    pathname?.startsWith("/financing") ||
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/about") ||
    pathname?.startsWith("/how-to") ||
    (isHomePage && isScrolled);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHomePage && !isScrolled
          ? "bg-transparent"
          : "bg-blue-600 shadow-lg"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Top bar with contact info - hidden on shop and configure pages */}
      {!hideContactBar && (
        <div className="border-b border-white/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-end gap-6 py-2 text-sm">
              <a
                href="tel:+15012162500"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                aria-label="Call us at +1 501 216-2500"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">+1 501 216-2500</span>
              </a>
              <a
                href="mailto:sales@customtrailerspro.com"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                aria-label="Email us at sales@customtrailerspro.com"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">sales@customtrailerspro.com</span>
              </a>
              <a
                href="https://www.facebook.com/share/1HPhbDUTaS/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/customfoodtrailerpros?igsh=Mm4weThuOGFieXNm&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Food Trucks Home"
          >
            <img
              src="/logo12.png"
              alt="Custom Trailer Pro"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-white/90 hover:text-white transition-colors"
                data-analytics="nav-link"
                data-nav-item={link.label.toLowerCase()}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
            <Button
              size="default"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              data-analytics="cta-nav-quote"
            >
              Contact Us
            </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open mobile menu"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left text-blue-600 font-bold">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-analytics="mobile-nav-link"
                    data-nav-item={link.label.toLowerCase()}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 mt-4"
                    data-analytics="cta-mobile-quote"
                  >
                  Contact Us
                  </Button>
                </Link>
                <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                  <a
                    href="tel:+15012162500"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="h-5 w-5" />
                    +1 501 216-2500
                  </a>
                  <a
                    href="mailto:sales@customtrailerspro.com"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Mail className="h-5 w-5" />
                    sales@customtrailerspro.com
                  </a>
                  <a
                    href="https://www.facebook.com/share/1HPhbDUTaS/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/customfoodtrailerpros?igsh=Mm4weThuOGFieXNm&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
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
