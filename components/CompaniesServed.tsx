"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

// Company data with logo images
const companies = [
  {
    logo: "/logos/abbiocco.jpg",
    alt: "Abbiocco Pizzeria",
  },
  {
    logo: "/logos/big-boy.jpg",
    alt: "Big Boy",
  },
  {
    logo: "/logos/buona.webp",
    alt: "Buona - The Original Italian Beef",
  },
  {
    logo: "/logos/black-sheep.jpg",
    alt: "The Black Sheep Ice Cream",
  },
  {
    logo: "/logos/birddog.webp",
    alt: "BirdDog Bistro",
  },
  {
    logo: "/logos/gochew.jpg",
    alt: "GoChew Burger & Sandwich",
  },
  {
    logo: "/logos/papa.jpg",
    alt: "Papa John's",
  },
  {
    logo: "/logos/tea.jpg",
    alt: "Tea & Grounds Coffee Trailer",
  },
  {
    logo: "/logos/457-pizza.jpg",
    alt: "457 Pizza",
  },
  {
    logo: "/logos/dominos.jpg",
    alt: "Domino's",
  },
  {
    logo: "/logos/mother.jpg",
    alt: "Mother Clucker's Wings",
  },
  {
    logo: "/logos/jujus.jpg",
    alt: "Juju's Craft Cookery",
  },
  {
    logo: "/logos/meat.jpg",
    alt: "Meat Juice BBQ",
  },
  {
    logo: "/logos/boone.jpg",
    alt: "Boone Mountain BBQ",
  },
  {
    logo: "/logos/sweet.jpg",
    alt: "Sweet & Salty",
  },
  {
    logo: "/logos/boones.webp",
    alt: "Boone's Barbecue Barn",
  },
  {
    logo: "/logos/hudson.jpg",
    alt: "Hudson River Expeditions",
  },
  {
    logo: "/logos/paradise.jpg",
    alt: "Paradise Grill",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function CompaniesServed() {
  return (
    <section
      className="py-4 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="companies-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="companies-heading"
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              Companies We've Had the Pleasure of Serving
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by leading brands across the nation to build their mobile kitchen dreams
            </p>
          </motion.div>
        </div>

        {/* Companies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group"
            >
              <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl bg-white">
                <div className="relative w-full h-full min-h-[140px] flex items-center justify-center bg-gray-50">
                  {/* Company Logo - Full card size */}
                  <div className="relative w-full h-full">
                    <Image
                      src={company.logo}
                      alt={company.alt}
                      fill
                      className=" w-full object-contain grayscale-0 hover:grayscale transition-all duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
                    />  
                  </div>

                  {/* Hover indicator line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                18+
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              And hundreds more entrepreneurs nationwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
