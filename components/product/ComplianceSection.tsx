"use client";

import { motion } from "framer-motion";
import {
  Shield,
  FileCheck,
  ClipboardCheck,
  BadgeCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Phone,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ComplianceSectionProps {
  trailerName: string;
}

export default function ComplianceSection({ trailerName }: ComplianceSectionProps) {
  const requirements = [
    "Health Department Approval",
    "Fire Marshal Inspection",
    "Local Zoning Permits",
    "Business License",
    "Food Handler Certification",
    "Vehicle Registration",
  ];

  const benefits = [
    "Avoid costly redesigns after purchase",
    "Ensure faster approval process",
    "Understand local requirements upfront",
    "Get customized spec sheets for your area",
    "Professional guidance through the process",
  ];

  const certifications = [
    { name: "NSF Certified", icon: <BadgeCheck className="h-5 w-5" /> },
    { name: "DOT Compliant", icon: <Shield className="h-5 w-5" /> },
    { name: "UL Listed", icon: <FileCheck className="h-5 w-5" /> },
    { name: "NFPA Compliant", icon: <ClipboardCheck className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Health Codes & Compliance
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
          Understanding health codes and safety requirements is crucial for a
          successful food trailer business. We're here to help.
        </p>
      </div>

      {/* Certifications Banner */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge
              variant="outline"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-green-50 text-green-700 border-green-200 flex items-center gap-1.5 sm:gap-2"
            >
              {cert.icon}
              {cert.name}
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Pre-Approval Process */}
        <Card className="p-4 sm:p-6 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Pre-Approval Process
            </h3>
          </div>

          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
            Before finalizing your trailer purchase, we strongly recommend getting
            pre-approval from your local health department. This ensures your trailer
            meets all requirements from day one.
          </p>

          <div className="bg-white rounded-lg p-3 sm:p-4 border border-blue-100 mb-3 sm:mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0" />
              Why Pre-Approval Matters
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
            <FileText className="h-4 w-4 mr-2" />
            Request Spec Sheets
          </Button>
        </Card>

        {/* Requirements Checklist */}
        <Card className="p-4 sm:p-6 border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Common Requirements
            </h3>
          </div>

          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
            Requirements vary by location. Here are typical permits and approvals
            you may need to operate a food trailer:
          </p>

          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs sm:text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700">{req}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mb-3 sm:mb-4">
            * Requirements vary by state, county, and city. Contact your local
            health department for specific requirements.
          </p>

          <Button variant="outline" className="w-full text-sm">
            <Download className="h-4 w-4 mr-2" />
            Download Compliance Guide
          </Button>
        </Card>
      </div>

      {/* Contact Box */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Need Help with Compliance?</h3>
            <p className="text-sm sm:text-base text-gray-300">
              Our team has helped hundreds of customers navigate health department
              requirements. Let us help you too.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 text-sm w-full sm:w-auto">
              <Phone className="h-4 w-4 mr-2" />
              Call Us
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-sm w-full sm:w-auto">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
