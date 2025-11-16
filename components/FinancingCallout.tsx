"use client";

import { motion } from "framer-motion";
import { CreditCard, Calculator, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const financingFeatures = [
  "Competitive rates starting at 5.9% APR",
  "Flexible terms from 24-84 months",
  "Fast approval in 24-48 hours",
  "No prepayment penalties",
];

export default function FinancingCallout() {
  return (
    <section
      id="financing"
      className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden"
      aria-labelledby="financing-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm font-semibold">Flexible Financing Available</span>
              </div>

              <h2
                id="financing-heading"
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                Make Your Dream Affordable
              </h2>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Don't let upfront costs hold you back. Our financing partners offer competitive rates and flexible terms to get you on the road faster.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {financingFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-blue-50">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="xl"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl group"
                  data-analytics="cta-learn-financing"
                >
                  Learn About Financing
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                  data-analytics="cta-calculate-payment"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Payment
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Calculator Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-2xl bg-white text-gray-900">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                      <Calculator className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      Quick Payment Estimate
                    </h3>
                    <p className="text-gray-600">
                      See what your monthly payment could be
                    </p>
                  </div>

                  {/* Sample Calculation */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">
                          Truck Price
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          $75,000
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">
                          Term
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          60 months
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm text-gray-600 mb-2">
                        Estimated Monthly Payment
                      </div>
                      <div className="text-4xl font-bold text-blue-600">
                        $1,416<span className="text-xl">/mo</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Based on 7% APR with 10% down payment
                      </div>
                    </div>
                  </div>

                  {/* Financing Partners */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-3">
                      Partnered with leading lenders
                    </div>
                    <div className="flex items-center justify-center gap-6">
                      <div className="text-2xl font-bold text-gray-400">BANK</div>
                      <div className="text-2xl font-bold text-gray-400">CREDIT</div>
                      <div className="text-2xl font-bold text-gray-400">FINANCE</div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-gray-500 text-center mt-6">
                    * Rates and terms subject to credit approval. Example for illustration purposes only.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
