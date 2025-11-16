"use client";

import { motion } from "framer-motion";
import { Pencil, FileText, Hammer, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Design",
    description:
      "Work with our design team to create your perfect layout. Use our 3D builder or schedule a consultation call.",
    icon: Pencil,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    duration: "1-2 weeks",
  },
  {
    number: 2,
    title: "Quote",
    description:
      "Receive a detailed quote with transparent pricing. Lock in your build slot with a deposit and finalize all specifications.",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
    duration: "1 week",
  },
  {
    number: 3,
    title: "Build",
    description:
      "Our skilled craftsmen bring your vision to life. Track progress with photo updates and video walkthroughs.",
    icon: Hammer,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    duration: "6-8 weeks",
  },
  {
    number: 4,
    title: "Deliver",
    description:
      "Final inspection, training, and handover. We deliver nationwide and provide full support to get you started.",
    icon: Truck,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    duration: "1 week",
  },
];

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="py-20 bg-white"
      aria-labelledby="process-heading"
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
              id="process-heading"
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial concept to hitting the road — our proven 4-step process makes it simple
            </p>
          </motion.div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto mb-16">
          {/* Connection Line */}
          <div className="relative">
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 via-orange-200 to-purple-200 -z-10" />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Icon Circle */}
                  <div className="flex flex-col items-center mb-6">
                    <div
                      className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className={`h-10 w-10 ${step.color}`} />
                    </div>
                    <div className="text-sm font-semibold text-gray-500">
                      {step.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="inline-block bg-gradient-to-br from-gray-900 to-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                      Step {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden max-w-2xl mx-auto space-y-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-gray-200 -z-10" />
              )}

              {/* Icon */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <step.icon className={`h-10 w-10 ${step.color}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="inline-block bg-gradient-to-br from-gray-900 to-gray-700 text-white text-sm font-bold px-3 py-1 rounded-full mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <div className="text-sm font-semibold text-gray-500 mb-2">
                  {step.duration}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-br from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl">
            <div className="text-sm font-semibold text-blue-100 mb-1">
              Total Timeline
            </div>
            <div className="text-4xl font-bold">8-12 Weeks</div>
            <div className="text-sm text-blue-100 mt-1">
              From design to delivery
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            size="xl"
            className="bg-blue-600 hover:bg-blue-700 shadow-2xl"
            data-analytics="cta-start-process"
          >
            Start Your Build Today
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Schedule a free consultation to discuss your project
          </p>
        </motion.div>
      </div>
    </section>
  );
}
