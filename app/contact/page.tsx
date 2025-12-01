import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import ContactForm from './components/ContactForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us | Custom Trailer Pro',
  description: 'Get in touch with Custom Trailer Pro. We\'re here to help you design your perfect custom food truck or trailer.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Compact */}
        <section className="pt-24 pb-8 px-6 text-center bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              We're here to help you design your perfect custom food truck or trailer.
            </p>
          </div>
        </section>

        {/* Main Content - Side by Side */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side: Contact Information */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>

                {/* Phone */}
                <a
                  href="tel:800-859-5405"
                  className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Phone
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        800-859-5405
                      </p>
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:sales@customtrailerpros.com"
                  className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Email
                      </h3>
                      <p className="text-sm font-semibold text-gray-900 break-words">
                        sales@customtrailerpros.com
                      </p>
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="block p-4 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Location
                      </h3>
                      <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                        10101 W 87th St, Suite 200<br />
                        Overland Park, KS 66212
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
