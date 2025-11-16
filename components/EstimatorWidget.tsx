"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateEstimate,
  formatCurrency,
  SIZE_LABELS,
  EQUIPMENT_LABELS,
  type TruckSize,
  type EquipmentLevel,
} from "@/utils/estimator";

export default function EstimatorWidget() {
  const [size, setSize] = useState<TruckSize>("medium");
  const [equipmentLevel, setEquipmentLevel] = useState<EquipmentLevel>("standard");
  const [showResults, setShowResults] = useState(false);

  const estimate = calculateEstimate({ size, equipmentLevel });

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <section
      id="estimator"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      aria-labelledby="estimator-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h2
                id="estimator-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
              >
                Instant Price Estimator
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get a ballpark estimate in seconds. Select your truck size and equipment level.
              </p>
            </motion.div>
          </div>

          {/* Estimator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-2xl border-0">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Configure Your Truck</CardTitle>
                <CardDescription>
                  Choose your specifications to see estimated pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Truck Size Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Truck Size
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(SIZE_LABELS) as TruckSize[]).map((sizeOption) => (
                      <button
                        key={sizeOption}
                        onClick={() => setSize(sizeOption)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          size === sizeOption
                            ? "border-blue-600 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                        data-analytics="estimator-size-select"
                        data-size={sizeOption}
                      >
                        <div className="flex items-start gap-3">
                          <Truck
                            className={`h-5 w-5 mt-0.5 ${
                              size === sizeOption ? "text-blue-600" : "text-gray-400"
                            }`}
                          />
                          <div>
                            <div
                              className={`font-semibold ${
                                size === sizeOption ? "text-blue-900" : "text-gray-900"
                              }`}
                            >
                              {SIZE_LABELS[sizeOption]}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Equipment Level Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Equipment Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(EQUIPMENT_LABELS) as EquipmentLevel[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => setEquipmentLevel(level)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          equipmentLevel === level
                            ? "border-blue-600 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                        data-analytics="estimator-equipment-select"
                        data-equipment={level}
                      >
                        <div className="flex items-start gap-3">
                          <TrendingUp
                            className={`h-5 w-5 mt-0.5 ${
                              equipmentLevel === level ? "text-blue-600" : "text-gray-400"
                            }`}
                          />
                          <div>
                            <div
                              className={`font-semibold ${
                                equipmentLevel === level ? "text-blue-900" : "text-gray-900"
                              }`}
                            >
                              {EQUIPMENT_LABELS[level]}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleCalculate}
                  data-analytics="cta-calculate-estimate"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Estimate
                </Button>

                {/* Results */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white"
                  >
                    <div className="text-center mb-6">
                      <div className="text-sm font-medium text-blue-100 mb-2">
                        Estimated Total Cost
                      </div>
                      <div className="text-5xl font-bold mb-2">
                        {formatCurrency(estimate.totalEstimate)}
                      </div>
                      <div className="text-sm text-blue-100">
                        Range: {formatCurrency(estimate.range.min)} -{" "}
                        {formatCurrency(estimate.range.max)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-blue-100 mb-1">Base Price</div>
                        <div className="text-2xl font-bold">
                          {formatCurrency(estimate.basePrice)}
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-blue-100 mb-1">Equipment</div>
                        <div className="text-2xl font-bold">
                          {formatCurrency(estimate.equipmentCost)}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4 text-center">
                      <div className="text-sm text-blue-100 mb-1">
                        Estimated Monthly Payment
                      </div>
                      <div className="text-3xl font-bold">
                        {formatCurrency(estimate.monthlyPayment)}/mo
                      </div>
                      <div className="text-xs text-blue-100 mt-1">
                        Based on 60-month term at 7% APR
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-6 bg-white text-blue-600 hover:bg-gray-100"
                      data-analytics="cta-request-quote"
                    >
                      Request Detailed Quote
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            * Estimates are approximate and may vary based on customization, features, and market conditions.
            Contact us for a detailed quote.
          </p>
        </div>
      </div>
    </section>
  );
}
