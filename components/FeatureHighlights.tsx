"use client";

import { motion } from "framer-motion";
import { Zap, Award, Layout } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Fast Build Process",
    description:
      "Get your custom food truck in 6-8 weeks. Our streamlined manufacturing process and dedicated team ensure quick turnaround without compromising quality.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    icon: Award,
    title: "High-Quality Materials",
    description:
      "Built with commercial-grade stainless steel, premium appliances, and durable finishes. Every truck comes with a 10-year structural warranty.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Layout,
    title: "100% Custom Layouts",
    description:
      "Design your perfect kitchen layout with our 3D builder. From compact coffee trailers to full-service kitchens, we bring your vision to life.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function FeatureHighlights() {
  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="features-heading"
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              Why Choose FoodTrucksPro
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading quality, speed, and customization for your mobile food business
            </p>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                data-analytics="feature-card"
                data-feature={feature.title.toLowerCase().replace(/\s+/g, "-")}
              >
                <CardHeader>
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${feature.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>

                  <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Trucks Built</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">10 Years</div>
              <div className="text-sm text-gray-600">Warranty</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">6-8 Weeks</div>
              <div className="text-sm text-gray-600">Build Time</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
