import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OptionalImage from '@/components/OptionalImage';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'How to Start a Food Truck | Custom Trailer Pro',
  description: 'A comprehensive guide to starting your food truck business. Learn the steps, requirements, and best practices for launching a successful mobile food business.',
};

export default function HowToPage() {
  const sidebarLinks = [
    'Why Choose Us?',
    'Choosing The Right Wrap For Your Food Truck',
    'Food Truck Menu Ideas',
    'Food Truck Catering Equipment',
    'How To Choose The Right Generator',
    'What To Look For When Purchasing A Used Food Truck',
    'Best Hood Type For Your Food Truck Or Trailer',
    'Benefits of Mobile Pizza Ovens',
    'How To Start A Food Truck',
    'How To Budget For A Food Truck',
  ];

  return (
    <>
      <TopBar />
      <Navbar />

      {/* Page Content */}
      <main className="min-h-screen bg-white pt-10">
        <div className="w-full bg-gray-50 py-16">
          <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-6">HOW TO START A FOOD TRUCK</h1>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 mb-8">
                  BY ADMIN - FOOD TRUCK
                </p>

                {/* Introduction */}
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Starting a food truck business can be an exciting and rewarding venture, offering the freedom to be your own boss, create delicious food, and connect with customers in unique locations. However, like any business, it requires careful planning, hard work, and dedication. Here's a step-by-step guide to help you get started on the right foot and turn your culinary dreams into a successful food truck business.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're a seasoned chef or a passionate home cook, the food truck industry offers incredible opportunities. This guide will walk you through everything from developing your concept to launching your business, ensuring you have the knowledge and tools needed to succeed in this competitive but rewarding industry.
                  </p>
                </div>

                {/* Featured Image */}
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                  <OptionalImage
                    src="/hero-1.jpg"
                    alt="How to Start a Food Truck"
                    className="w-full h-auto"
                  />
                </div>

                {/* Section 1 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">1. Develop Your Food Truck Concept</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your food truck concept is the foundation of your business. Start by deciding what type of cuisine you want to serve. Consider your passions, culinary skills, and what's popular in your area. Are you drawn to gourmet burgers, authentic tacos, fresh salads, or specialty desserts? Your concept should reflect your unique style while also appealing to your target market.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Research your local market to identify gaps and opportunities. Visit other food trucks and restaurants to see what's working and what's not. Consider factors like:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li>Local food trends and preferences</li>
                    <li>Competition in your chosen cuisine</li>
                    <li>Seasonal variations in demand</li>
                    <li>Price points customers are willing to pay</li>
                    <li>Dietary restrictions and preferences (vegan, gluten-free, etc.)</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Once you've settled on a concept, create a memorable brand identity. This includes your food truck's name, logo, color scheme, and overall aesthetic. Your brand should be consistent across all touchpoints, from your truck's exterior to your social media presence.
                  </p>
                </section>

                {/* Section 2 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">2. Create a Solid Business Plan</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A well-thought-out business plan is crucial for your food truck's success. It will serve as your roadmap and is essential if you're seeking financing. Your business plan should include:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li><strong>Executive Summary:</strong> Overview of your business concept and goals</li>
                    <li><strong>Market Analysis:</strong> Research on your target market and competition</li>
                    <li><strong>Menu and Pricing:</strong> Detailed description of your offerings and pricing strategy</li>
                    <li><strong>Marketing Plan:</strong> How you'll attract and retain customers</li>
                    <li><strong>Operations Plan:</strong> Daily operations, suppliers, and staffing needs</li>
                    <li><strong>Financial Projections:</strong> Startup costs, revenue forecasts, and break-even analysis</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Be realistic with your financial projections and include a buffer for unexpected expenses. Most food trucks require an initial investment of $50,000 to $200,000, depending on whether you buy new or used and the level of customization required.
                  </p>
                </section>

                {/* Section 3 with Image */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">3. Understand Legal Requirements</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Operating a food truck involves navigating various legal requirements and regulations. These can vary significantly by location, so it's essential to research the specific requirements in your area. Generally, you'll need:
                  </p>

                  <div className="bg-blue-50 border-l-4 border-cyan-500 p-6 mb-6">
                    <h3 className="font-bold text-lg mb-3">Required Licenses and Permits:</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Business License</li>
                      <li>Food Service License</li>
                      <li>Food Handler's Permit</li>
                      <li>Vehicle License</li>
                      <li>Parking Permits</li>
                      <li>Fire Safety Certificate</li>
                      <li>Health Department Permit</li>
                    </ul>
                  </div>

                  <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                    <OptionalImage
                      src="/interior2.jpg"
                      alt="Food Truck Permits and Licensing"
                      className="w-full h-auto"
                    />
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    Contact your local health department early in the process to understand specific requirements for your area. They'll inspect your food truck to ensure it meets health and safety standards before you can operate. This typically includes proper refrigeration, adequate handwashing stations, and appropriate food storage.
                  </p>
                </section>

                {/* Section 4 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">4. Choose the Right Food Truck</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your food truck is your kitchen, workspace, and brand ambassador all in one. You have several options when acquiring a food truck:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li><strong>Buy New:</strong> More expensive but comes with warranties and customization options</li>
                    <li><strong>Buy Used:</strong> More affordable but may require repairs and upgrades</li>
                    <li><strong>Lease:</strong> Lower upfront costs but ongoing lease payments</li>
                    <li><strong>Custom Build:</strong> Tailored to your exact specifications and needs</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When choosing a food truck, consider:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li>Size and layout that accommodates your menu and workflow</li>
                    <li>Kitchen equipment needed for your specific cuisine</li>
                    <li>Generator capacity and power requirements</li>
                    <li>Storage space for ingredients and supplies</li>
                    <li>Ventilation and exhaust systems</li>
                    <li>Exterior design and branding opportunities</li>
                  </ul>
                </section>

                {/* Section 5 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">5. Design Your Layout and Equipment</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    An efficient layout is crucial for a food truck's success. Every square inch matters, so plan your workspace carefully. Work with experienced food truck builders who understand workflow optimization and health code requirements.
                  </p>

                  <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white p-4">
                    <OptionalImage
                      src="/level.webp"
                      alt="Food Truck Floor Plan"
                      className="w-full h-auto"
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">Example floor plan showing efficient workflow</p>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Essential equipment typically includes:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li>Cooking equipment (griddles, fryers, ovens, etc.)</li>
                    <li>Refrigeration and freezer units</li>
                    <li>Food prep surfaces and cutting boards</li>
                    <li>Three-compartment sink for washing, rinsing, and sanitizing</li>
                    <li>Handwashing station</li>
                    <li>Point of sale (POS) system</li>
                    <li>Fire suppression system</li>
                    <li>Generator or power hookup</li>
                  </ul>
                </section>

                {/* Section 6 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">6. Create a Standout Menu</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your menu is your primary sales tool. Keep it focused and manageable—food trucks work best with a limited menu of items you can prepare quickly and consistently. Consider these menu development tips:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li>Start with 5-10 core items</li>
                    <li>Focus on quality over quantity</li>
                    <li>Include options for different dietary needs</li>
                    <li>Price items to ensure profitability (aim for 28-35% food cost)</li>
                    <li>Create signature dishes that set you apart</li>
                    <li>Plan for seasonal menu rotations</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Test your recipes extensively and calculate exact food costs. Factor in waste, spoilage, and portion sizes. Remember that speed is crucial in a food truck, so choose menu items that can be prepared efficiently during service.
                  </p>
                </section>

                {/* Section 7 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">7. Develop a Marketing Strategy</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Marketing is essential for attracting customers to your food truck. Develop a comprehensive strategy that includes:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li><strong>Social Media:</strong> Maintain active profiles on Instagram, Facebook, and Twitter</li>
                    <li><strong>Location Updates:</strong> Post daily locations and hours</li>
                    <li><strong>Email Marketing:</strong> Build a subscriber list for promotions and updates</li>
                    <li><strong>Local Partnerships:</strong> Collaborate with businesses, breweries, and event organizers</li>
                    <li><strong>Loyalty Programs:</strong> Reward repeat customers</li>
                    <li><strong>Professional Photos:</strong> Invest in quality food photography</li>
                  </ul>
                </section>

                {/* Section 8 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">8. Securing a Good Location</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Location can make or break your food truck business. Research high-traffic areas and understand the regulations for each location. Consider:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li>Business districts during lunch hours</li>
                    <li>Parks and recreational areas</li>
                    <li>Event venues and festivals</li>
                    <li>Breweries and entertainment venues</li>
                    <li>College campuses</li>
                    <li>Late-night spots near bars and clubs</li>
                  </ul>
                </section>

                {/* Section 9 */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-cyan-500 mb-4">9. Plan Your Grand Opening</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your grand opening is your chance to make a great first impression. Plan it carefully:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li>Choose a high-visibility location</li>
                    <li>Promote heavily on social media</li>
                    <li>Consider offering opening day specials</li>
                    <li>Invite local media and food bloggers</li>
                    <li>Have plenty of staff on hand</li>
                    <li>Prepare for higher-than-usual volume</li>
                  </ul>
                </section>

                {/* Conclusion */}
                <section className="mb-10 bg-gray-100 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Food Truck Journey?</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Starting a food truck requires hard work, dedication, and careful planning, but with the right approach, it can be an incredibly rewarding business. At Custom Trailer Pro, we specialize in building custom food trucks tailored to your exact specifications and needs.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our team of experts will guide you through every step of the design and build process, ensuring your truck is equipped with everything you need to succeed. From layout design to equipment selection, we're here to help turn your food truck dreams into reality.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors shadow-lg"
                  >
                    Contact Us Today
                  </Link>
                </section>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Why Choose Us */}
                  <div className="bg-cyan-500 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">WHY CHOOSE US?</h3>
                    <p className="text-sm opacity-90 mb-4">
                      We include many standard features that others will charge you extra for.
                    </p>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Free designs with industry experts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Built-to-order trailers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Premium materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✓</span>
                        <span>Lifetime support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
