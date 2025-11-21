"use client";

import { motion } from "framer-motion";
import {
  Building,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Percent,
  Calendar,
  Shield,
  FileText,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FinancingSectionProps {
  trailerPrice: number;
}

export default function FinancingSection({ trailerPrice }: FinancingSectionProps) {
  // Calculate estimated monthly payments
  const monthlyPayment60 = Math.round(trailerPrice / 60);
  const monthlyPayment84 = Math.round(trailerPrice / 84);

  const personalBenefits = [
    { icon: <Building className="h-5 w-5" />, text: "Personal relationships with lenders" },
    { icon: <Percent className="h-5 w-5" />, text: "Competitive interest rates" },
    { icon: <TrendingUp className="h-5 w-5" />, text: "Borrow against existing assets" },
    { icon: <DollarSign className="h-5 w-5" />, text: "Lower cost loans available" },
    { icon: <FileText className="h-5 w-5" />, text: "Multiple loan structures" },
  ];

  const commercialBenefits = [
    { icon: <Landmark className="h-5 w-5" />, text: "Commercial lease options" },
    { icon: <Shield className="h-5 w-5" />, text: "Potential tax benefits (Section 179)" },
    { icon: <Calendar className="h-5 w-5" />, text: "Lease-to-own programs" },
    { icon: <CheckCircle2 className="h-5 w-5" />, text: "Quick & easy application" },
    { icon: <TrendingUp className="h-5 w-5" />, text: "No set maximum limits" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Financing Options
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
          We partner with trusted lenders to offer flexible financing solutions.
          Get your dream trailer today with affordable monthly payments.
        </p>
      </div>

      {/* Payment Calculator Preview */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              Estimated Monthly Payments
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Based on ${trailerPrice.toLocaleString()} total price
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                ${monthlyPayment60.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">60 months</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                ${monthlyPayment84.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">84 months</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center md:text-left">
          * Estimated payments. Actual rates depend on credit approval and terms.
        </p>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Personal Bank Financing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full p-4 sm:p-6 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  Personal Bank Financing
                </h3>
                <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs">
                  Recommended
                </Badge>
              </div>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {personalBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <span className="text-blue-600 mt-0.5 flex-shrink-0">{benefit.icon}</span>
                  <span className="text-xs sm:text-sm text-gray-700">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 sm:pt-4 border-t border-gray-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Work with your local bank or credit union for personalized service
                and potentially lower rates.
              </p>
              <Button variant="outline" className="w-full text-sm">
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Commercial Leasing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full p-4 sm:p-6 border-gray-200 hover:border-green-300 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <Landmark className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  Commercial Leasing
                </h3>
                <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                  Tax Benefits
                </Badge>
              </div>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {commercialBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <span className="text-green-600 mt-0.5 flex-shrink-0">{benefit.icon}</span>
                  <span className="text-xs sm:text-sm text-gray-700">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 sm:pt-4 border-t border-gray-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Perfect for businesses looking to maximize tax deductions and
                preserve capital.
              </p>
              <Button variant="outline" className="w-full text-sm">
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Apply Now CTA */}
      <Card className="p-5 sm:p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Ready to Get Started?</h3>
        <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6 max-w-lg mx-auto">
          Apply for financing in minutes. Our team will help you find the best
          option for your business needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="default" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
            Apply Now
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
          </Button>
          <Button
            size="default"
            variant="outline"
            className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
          >
            Call (555) 123-4567
          </Button>
        </div>
      </Card>
    </div>
  );
}
