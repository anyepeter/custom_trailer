"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating "Get Quote" Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 shadow-2xl hover:shadow-blue-500/50 transition-all px-8"
              data-analytics="cta-sticky-quote"
            >
              Get Free Quote
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Contact Buttons (Right Side) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Contact Menu */}
        <AnimatePresence>
          {showContactMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="flex flex-col gap-3 mb-2"
            >
              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/18005551234"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                data-analytics="cta-whatsapp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-semibold pr-2">WhatsApp</span>
                </div>
              </motion.a>

              {/* Phone Call */}
              <motion.a
                href="tel:+18005551234"
                className="group relative"
                data-analytics="cta-phone"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold pr-2">Call Now</span>
                </div>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Contact Button */}
        <motion.button
          onClick={() => setShowContactMenu(!showContactMenu)}
          className={cn(
            "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all",
            showContactMenu
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={showContactMenu ? "Close contact menu" : "Open contact menu"}
          data-analytics="cta-contact-toggle"
        >
          <AnimatePresence mode="wait">
            {showContactMenu ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse Animation when closed */}
        {!showContactMenu && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-600"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Live Chat Badge (Optional - for showing online status) */}
      <AnimatePresence>
        {isVisible && !showContactMenu && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-24 right-6 z-30"
          >
            <div className="bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold text-gray-900">We're online</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
