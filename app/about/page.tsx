import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import TeamGrid from '@/components/TeamGrid';
import Footer from '@/components/Footer';
import { teamMembers } from '@/data/team';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Meet Our Team | Custom Trailer Pro',
  description: 'Meet the expert team behind Custom Trailer Pro. We are dedicated to building premium custom food trucks and trailers for entrepreneurs nationwide.',
};

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Navbar />

      {/* Page Content */}
      <main className="min-h-screen bg-white pt-10">
        {/* Hero Video Section */}
        <HeroVideo
          videoId="dQw4w9WgXcQ" // Replace with your actual YouTube video ID
          title="About Custom Trailer Pro"
        />

        {/* Sub Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4" style={{ maxWidth: '980px' }}>
            <nav className="flex gap-8 py-4">
              <Link
                href="/about"
                className="px-6 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-sm"
                aria-current="page"
              >
                Meet the Team
              </Link>
              <Link
                href="/about/process"
                className="px-6 py-2 text-sm font-semibold text-gray-700 hover:text-cyan-500 transition-colors"
              >
                Our Process
              </Link>
            </nav>
          </div>
        </div>

        {/* Team Grid Section */}
        <TeamGrid members={teamMembers} />
      </main>

      <Footer />
    </>
  );
}
