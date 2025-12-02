import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import Footer from '@/components/Footer';
import TrailerInteriorImage from '@/components/TrailerInteriorImage';
import Link from 'next/link';

export const metadata = {
  title: 'Our Process | Custom Trailer Pro',
  description: 'Learn about our step-by-step process for building your custom food truck or trailer. From design to delivery, we guide you every step of the way.',
};

export default function ProcessPage() {
  const features = [
    'Free designs with industry experts',
    'Built-to-order trailers made for your exact needs',
    'Standard trailer features at no additional price',
    '.080 Exterior Thickness Aluminum (compared to .024)',
    'Upgraded rubber roof',
    'Large Capacity 3-Bay Sinks with Drainboards',
    '60° Triple Tube Tongue',
    'Complete Electrical Package with 25\' Power Cord and 50Amp Plug',
    'All LED lighting inside and out',
    'Insulated Walls and Ceiling',
    '7\'6" Interior Height',
  ];

  return (
    <>
      <TopBar />
      <Navbar />

      {/* Page Content */}
      <main className="min-h-screen bg-white pt-10">
        {/* Hero Video Section */}
        <HeroVideo
          videoId="dQw4w9WgXcQ" // Replace with your actual YouTube video ID
          title="Our Process - Custom Trailer Pro"
        />

        {/* Sub Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4" style={{ maxWidth: '980px' }}>
            <nav className="flex gap-8 py-4">
              <Link
                href="/about"
                className="px-6 py-2 text-sm font-semibold text-gray-700 hover:text-cyan-500 transition-colors"
              >
                Meet the Team
              </Link>
              <Link
                href="/about/process"
                className="px-6 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-sm"
                aria-current="page"
              >
                Our Process
              </Link>
            </nav>
          </div>
        </div>

        {/* Process Section */}
        <div className="w-full bg-white py-16">
          <div className="container mx-auto px-4" style={{ maxWidth: '980px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Process Content */}
              <div className="lg:col-span-2">
                {/* Section Label */}

                {/* Process Description */}
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    From the design process through the trailer completion, our desire is to partner with our customers before, during, and after the sale.
                  </p>
                  <p>
                    We understand that one of the most important keys to success in the mobile food industry is being able to serve a lot of food in a short amount of time. This is why our designs are created around workflow and efficiency. Our goal is to help our customers be as successful as possible as quickly as possible.
                  </p>

                  {/* Trailer Interior Image */}
                  <TrailerInteriorImage />

                  <p>
                    From there, we help our customers minimize costly downtime by providing them with the information needed to submit their plans to their local health and fire safety agencies for pre-approval. This way we can make any needed changes before construction begins.
                  </p>
                  <p>
                    During production, our project manager provides updates as well as helpful walk-through videos on how to best operate the trailer. Most importantly, we remain available to answer any questions our customers might have.
                  </p>
                  <p>
                    Once construction is completed on the trailer, it moves to our installation facility in Columbia, TN where we have dedicated professionals install the gas-lines, cooking equipment, and other custom work that needs to be done.
                  </p>
                  <p>
                    Even when the trailer is completed and in our customer's hands, the relationship does not end there! We remain available to help provide any support needed, and we also love promoting our customers on social media.
                  </p>
                  <p className="font-semibold text-gray-900">
                    Our process and our team were built with one goal - helping our customers to be as successful as possible.
                  </p>
                </div>
              </div>

              {/* Right Column - Why Choose Us */}
              <div className="lg:col-span-1">
                <div className="bg-cyan-500 text-white p-6 rounded-lg shadow-lg sticky top-24">
                  <h3 className="text-2xl font-bold mb-6">WHY CHOOSE US?</h3>
                  <p className="text-sm mb-6 opacity-90">
                    We include many standard features that others will charge you extra for.
                  </p>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="mt-16 bg-gray-800 text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-2 text-sm mb-6">
                <p><strong>Address:</strong> Design and Sales Office: 10101 W 87th Street, Overland Park, KS 66212</p>
                <p><strong>Phone:</strong> +1-501-216-2500</p>
                <p><strong>Email:</strong> sales@customtrailerspro.com</p>
                <p className="mt-4 text-gray-400">Trailer Build Location: Columbia, TN</p>
              </div>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
