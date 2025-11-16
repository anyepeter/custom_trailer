"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    business: "Maria's Tacos",
    location: "Austin, TX",
    rating: 5,
    quote:
      "FoodTrucksPro delivered exactly what I envisioned. The build quality is outstanding and the process was incredibly smooth. I was serving customers within 8 weeks!",
    image: "/avatar-1.jpg",
  },
  {
    id: 2,
    name: "James Chen",
    business: "Chen's Noodle House",
    location: "Portland, OR",
    rating: 5,
    quote:
      "Best investment I've made for my business. The custom layout they designed maximizes every inch of space. Their financing options made it affordable too.",
    image: "/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    business: "Sweet Treats Bakery",
    location: "Denver, CO",
    rating: 5,
    quote:
      "The team was professional and responsive throughout. They helped me navigate permits, design, and financing. Couldn't be happier with my mobile bakery!",
    image: "/avatar-3.jpg",
  },
];

const clientLogos = [
  { name: "FDA Approved", icon: "🏛️" },
  { name: "NSF Certified", icon: "✓" },
  { name: "UL Listed", icon: "⚡" },
  { name: "BBB A+ Rating", icon: "⭐" },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1" aria-label={`${rating} star rating`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-blue-50 to-white"
      aria-labelledby="testimonials-heading"
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
              id="testimonials-heading"
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join hundreds of successful food entrepreneurs who trusted us with their dreams
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-10 w-10 text-blue-600/20" />
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.business}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges / Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-200 pt-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Certified & Trusted
            </h3>
            <p className="text-gray-600">
              Meeting the highest industry standards
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-4xl">{logo.icon}</div>
                <div className="text-sm font-semibold text-gray-700">
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Overall Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-8">
                <div>
                  <div className="text-5xl font-bold mb-2">4.9</div>
                  <StarRating rating={5} />
                </div>
                <div className="h-16 w-px bg-white/30" />
                <div className="text-left">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-100">
                    Happy Customers
                  </div>
                </div>
                <div className="h-16 w-px bg-white/30" />
                <div className="text-left">
                  <div className="text-2xl font-bold">250+</div>
                  <div className="text-sm text-blue-100">
                    5-Star Reviews
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
