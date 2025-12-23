'use client';

import { CheckCircle2, DollarSign, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FinancingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6">
              Financing Options
            </h1>
            <p className="text-sm md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Financing a food trailer is not like financing a normal vehicle. The available options have evolved over the years, which is why we have worked hard to develop good relationships with credible lenders. Your personal circumstances will determine what financing option is the best fit, so here are some things to consider.
            </p>
          </div>
        </div>
      </section>

      {/* Business Loan Section */}
      <section id="business-loan" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Loan</h2>
            </div>

            {/* Equinox Funding */}
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-1">
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">Equinox</div>
                      <div className="text-2xl font-bold text-gray-900">Funding</div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Equinox Funding offers over 20 years of industry experience and has built their business with integrity and expertise. Equinox offers a wide variety of loan options to ensure the best terms and products for your unique situation (Equipment Loans, Business Lines of Credit, Business Term Loans, SBA Loans, Working Capital Loans, and Personal Term Loans).
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Soft credit pull</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Same day loan options</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">$75 minimum FICO for established businesses</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">640 minimum FICO for start-up businesses</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Loan options from $5k-$25M</span>
                      </div>
                    </div>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open('https://www.equinoxnox.com/efapplication', '_blank')}
                    >
                      APPLY NOW
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lease to Own Section */}
      <section id="lease-to-own" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lease to Own</h2>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-1">
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-blue-600">clicklease</div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Funding up to $30,000</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Soft credit pull - no damage credit inquiry</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Highest Approval Rating</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Easy Application</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Financing options for low credit scores</span>
                      </div>
                    </div>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open('https://www.clickleese.com/apply', '_blank')}
                    >
                      APPLY NOW
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financing Tips Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financing Tips & Requirements</h2>
              <p className="text-xl text-gray-600">
                Prepare for success with these helpful guidelines
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* What You'll Need */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  What You'll Need
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Business registration documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Personal and business tax returns (2 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Bank statements (3-6 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Business plan or financial projections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Valid driver's license and SSN</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}