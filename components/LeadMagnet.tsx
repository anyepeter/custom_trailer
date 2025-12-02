"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail, CheckCircle, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const resources = [
  {
    icon: BookOpen,
    title: "Free Buyer's Guide",
    description: "Complete 40-page guide to buying your first food truck",
  },
  {
    icon: Calendar,
    title: "Book Consultation",
    description: "Free 15-minute call with our design experts",
  },
];

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      // In production, integrate with email marketing service
    }, 1500);
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="resources-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                id="resources-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
              >
                Free Resources
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get expert guidance before you buy. Download our comprehensive guide and schedule a consultation.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lead Magnet Card - Buyer's Guide */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                    <Download className="h-8 w-8" />
                  </div>

                  <h3 className="text-3xl font-bold mb-4">
                    Food Truck Business Guide
                  </h3>

                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Everything you need to know before investing in a food truck. Includes checklists, budget templates, and industry insights.
                  </p>

                  {/* What's Included */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Cost breakdown and budgeting",
                      "Equipment selection guide",
                      "Permit and licensing requirements",
                      "Business planning templates",
                      "Industry best practices",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                        <span className="text-blue-50">{item}</span>
                      </div>
                    ))}
                  </div>
                <div className="w-full flex items-center justify-center">
                <Link
                    href="/how-to"
                    className="p-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors flex items-center"
                  >Learn How to start food truck business today</Link>
                </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Consultation Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-xl">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Book a Free Consultation
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    Talk to our experts about your project. Get answers to your questions and learn about the custom build process.
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Free 15-minute call",
                      "Discuss your vision and budget",
                      "Get expert recommendations",
                      "No obligation or pressure",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 h-14"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Your Call
                  </Button>
                  </Link>

                  {/* <p className="text-xs text-gray-500 text-center mt-4">
                    Available slots: Mon-Fri, 9am-6pm EST
                  </p> */}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Resources Links */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-6 text-sm text-gray-600">
              <a
                href="/blog"
                className="hover:text-blue-600 transition-colors"
                data-analytics="link-blog"
              >
                Read Our Blog
              </a>
              <span>•</span>
              <a
                href="/how-to-guides"
                className="hover:text-blue-600 transition-colors"
                data-analytics="link-how-to"
              >
                How-To Guides
              </a>
              <span>•</span>
              <a
                href="/case-studies"
                className="hover:text-blue-600 transition-colors"
                data-analytics="link-case-studies"
              >
                Success Stories
              </a>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
