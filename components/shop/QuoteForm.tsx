"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { QuoteRequest } from "@/types/trailer";

interface QuoteFormProps {
  trailerId: string;
  trailerName: string;
  trailerPrice: number;
}

export default function QuoteForm({
  trailerId,
  trailerName,
  trailerPrice,
}: QuoteFormProps) {
  const [formData, setFormData] = useState<Partial<QuoteRequest>>({
    trailerId,
    name: "",
    email: "",
    phone: "",
    message: "",
    requestedChanges: "",
    estimatedStartDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message?.trim()) {
      newErrors.message = "Please tell us about your project";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, send to your API:
      // const response = await fetch('/api/quotes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      console.log("Quote Request Submitted:", formData);

      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting quote:", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Quote Request Received!
          </h3>
          <p className="text-gray-700 mb-6">
            Thank you for your interest in the <strong>{trailerName}</strong>.
            Our team will review your request and get back to you within 24
            hours.
          </p>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-2">
              We've sent a confirmation to:
            </p>
            <p className="text-sm font-medium text-gray-900">
              {formData.email}
            </p>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                trailerId,
                name: "",
                email: "",
                phone: "",
                message: "",
                requestedChanges: "",
                estimatedStartDate: "",
              });
            }}
            variant="outline"
            className="mt-6"
          >
            Submit Another Request
          </Button>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-white border-blue-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Request a Custom Quote
        </h3>
        <p className="text-gray-600">
          Get personalized pricing for the <strong>{trailerName}</strong>.
          Starting at ${trailerPrice.toLocaleString()}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            className={errors.name ? "border-red-500" : ""}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={errors.email ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className={errors.phone ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tell us about your project <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="I'm interested in starting a BBQ catering business and need a custom trailer with..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* Optional Fields */}
        <div>
          <label
            htmlFor="requestedChanges"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Requested Customizations <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            id="requestedChanges"
            name="requestedChanges"
            value={formData.requestedChanges}
            onChange={handleChange}
            rows={3}
            placeholder="I'd like to add an extra smoker unit and upgrade to stainless steel countertops..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="estimatedStartDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estimated Start Date <span className="text-gray-400">(Optional)</span>
          </label>
          <Input
            id="estimatedStartDate"
            name="estimatedStartDate"
            type="date"
            value={formData.estimatedStartDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">
            When would you like to start your build?
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Request Quote
            </>
          )}
        </Button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to our privacy policy. We'll never
          share your information with third parties.
        </p>
      </form>
    </Card>
  );
}
