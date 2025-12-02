"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  products: [
    { label: "Shop Inventory", href: "/shop" },
    { label: "Custom Builds", href: "/configure" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
  ],
  resources: [
    { label: "Financing", href: "/financing" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Warranty Info", href: "/warranty" },
    { label: "Maintenance", href: "/maintenance" },
  ],
};

const locationsServed = [
  "Texas", "California", "Florida", "New York", "Illinois",
  "Arizona", "Colorado", "Oregon", "Washington", "Georgia",
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1HPhbDUTaS/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/customfoodtrailerpros?igsh=Mm4weThuOGFieXNm&utm_source=qr", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UC_0cLoRk5GcrqtBJQMNjWnQ", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info + Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
            <span className="text-blue-500">Custom</span> Trailers Pro
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Building premium custom food trucks and trailers for entrepreneurs nationwide. Turn your culinary dreams into reality.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Newsletter</h4>
              {!subscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    aria-label="Email for newsletter"
                  />
                  <Button
                    type="submit"
                    size="default"
                    className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                    data-analytics="cta-newsletter"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <div className="bg-green-600/20 border border-green-600 text-green-400 px-4 py-2 rounded-xl text-sm">
                  Thanks for subscribing!
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                  data-analytics="social-link"
                  data-platform={social.label.toLowerCase()}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    data-analytics="footer-link"
                    data-section="products"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    data-analytics="footer-link"
                    data-section="company"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    data-analytics="footer-link"
                    data-section="resources"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    data-analytics="footer-link"
                    data-section="support"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <div className="text-white font-semibold mb-1">Call Us</div>
                <a href="tel:+15012162500" className="hover:text-white transition-colors">
                  +1-501-216-2500
                </a>
                <div className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <div className="text-white font-semibold mb-1">Email Us</div>
                <a
                  href="mailto:sales@customtrailerspro.com"
                  className="hover:text-white transition-colors"
                >
                  sales@customtrailerspro.com
                </a>
                <div className="text-sm text-gray-500">24-hour response time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Served */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-white font-semibold mb-4">Locations Served</h4>
          <div className="flex flex-wrap gap-2">
            {locationsServed.map((location) => (
              <span
                key={location}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-default"
              >
                {location}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Nationwide delivery available. Contact us for shipping to your state.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} FoodTrucksPro. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
