import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FoodTrucksPro - Custom Food Trucks & Trailers | Build Your Mobile Kitchen",
  description:
    "Premium custom food trucks and trailers designed your way. 6-8 week build time, 10-year warranty, nationwide delivery. Get your free quote today.",
  keywords: [
    "food truck",
    "custom food truck",
    "food trailer",
    "mobile kitchen",
    "food truck builder",
    "commercial kitchen",
    "food truck financing",
  ],
  authors: [{ name: "FoodTrucksPro" }],
  creator: "FoodTrucksPro",
  publisher: "FoodTrucksPro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foodtruckspro.com",
    title: "FoodTrucksPro - Custom Food Trucks & Trailers",
    description:
      "Premium custom food trucks and trailers. 6-8 week build time, 10-year warranty, nationwide delivery.",
    siteName: "FoodTrucksPro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FoodTrucksPro - Custom Food Trucks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodTrucksPro - Custom Food Trucks & Trailers",
    description:
      "Premium custom food trucks and trailers. 6-8 week build time, 10-year warranty.",
    images: ["/og-image.jpg"],
    creator: "@foodtruckspro",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* PWA tags (optional) */}
        <meta name="application-name" content="FoodTrucksPro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FoodTrucksPro" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
