import React from 'react';
import Link from 'next/link';
import { CheckCircle, Target, Heart, Users, Lightbulb, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-16 px-4" style={{ backgroundColor: '#1c3059' }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            About Our Party
          </h1>
          <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
            Building a brighter future for all South Africans through unity, transparency, and action.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center mb-6">
              <Target className="w-12 h-12 mr-4" style={{ color: '#e80611' }} />
              <h2 className="text-3xl font-bold" style={{ color: '#1c3059' }}>
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We are dedicated to serving the people of South Africa through transparent governance, 
              inclusive policies, and a commitment to social justice. Our party believes in empowering 
              every citizen to participate in shaping our nation's future.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Through grassroots mobilization, innovative policy solutions, and unwavering dedication 
              to democratic principles, we strive to create a South Africa that works for everyone.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg border-l-4" style={{ borderLeftColor: '#ffb612' }}>
            <Heart className="w-16 h-16 mb-4" style={{ color: '#1a917f' }} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#1c3059' }}>
              Our Vision
            </h3>
            <p className="text-gray-700 text-lg">
              A united, prosperous South Africa where every voice is heard, every citizen has 
              opportunity, and our democratic values are protected for generations to come.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#1c3059' }}>
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start p-6 bg-white rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#3f64af' }}>
              <Shield className="w-8 h-8 mr-4 flex-shrink-0 mt-1" style={{ color: '#3f64af' }} />
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1c3059' }}>
                  Transparency
                </h3>
                <p className="text-gray-700">
                  We operate with full accountability to our members and the public, ensuring 
                  every decision is made in the open and with integrity.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#1a917f' }}>
              <Users className="w-8 h-8 mr-4 flex-shrink-0 mt-1" style={{ color: '#1a917f' }} />
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1c3059' }}>
                  Inclusivity
                </h3>
                <p className="text-gray-700">
                  Every voice matters, regardless of background, ethnicity, or circumstance. 
                  We celebrate diversity and ensure representation for all.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#ffb612' }}>
              <Lightbulb className="w-8 h-8 mr-4 flex-shrink-0 mt-1" style={{ color: '#ffb612' }} />
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1c3059' }}>
                  Innovation
                </h3>
                <p className="text-gray-700">
                  We champion innovative solutions to modern challenges, embracing new 
                  technologies and fresh approaches to governance.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#e80611' }}>
              <Heart className="w-8 h-8 mr-4 flex-shrink-0 mt-1" style={{ color: '#e80611' }} />
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1c3059' }}>
                  Service
                </h3>
                <p className="text-gray-700">
                  Our commitment is to serve the people, not special interests. We put 
                  citizens first in every decision we make.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Section */}
        <div className="rounded-xl p-8 md:p-12" style={{ backgroundColor: '#1c3059' }}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Why Join Us?
          </h2>
          <div className="text-gray-200 text-lg space-y-4 max-w-3xl mx-auto">
            <p>
              As a member, you'll have access to exclusive events, be able to participate in policy 
              discussions, vote on party matters, and receive your verified digital membership card.
            </p>
            <p>
              Your voice will directly influence the direction of our movement. Together, we can 
              build the South Africa we all deserve.
            </p>
            <div className="text-center mt-8">
              <Link 
                href="/join"
                className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: '#e80611' }}
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}