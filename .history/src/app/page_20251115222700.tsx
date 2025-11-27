import React from 'react';
import Link from 'next/link';
import { Users, Shield, CheckCircle, QrCode } from 'lucide-react';

export default function HomePage() {
  return (
    
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Shield className="w-24 h-24 mx-auto mb-6" style={{ color: '#3f64af' }} />
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1c3059' }}>
            Welcome to Our Political Movement
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of citizens committed to building a better future for our nation. 
            Together, we can create lasting change and represent the voice of the people.
          </p>
          <Link 
            href="/join"
            className="inline-block px-8 py-4 rounded-lg text-lg font-semibold text-white transition transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#e80611' }}
          >
            Become a Member Today
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border-t-4" style={{ borderTopColor: '#1a917f' }}>
            <Users className="w-12 h-12 mb-4" style={{ color: '#3f64af' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1c3059' }}>
              Growing Community
            </h3>
            <p className="text-gray-600">
              Join a vibrant community of engaged citizens working towards common goals.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border-t-4" style={{ borderTopColor: '#ffb612' }}>
            <QrCode className="w-12 h-12 mb-4" style={{ color: '#3f64af' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1c3059' }}>
              Digital Membership
            </h3>
            <p className="text-gray-600">
              Get your verified digital membership card with QR code for easy identification.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border-t-4" style={{ borderTopColor: '#e80611' }}>
            <CheckCircle className="w-12 h-12 mb-4" style={{ color: '#3f64af' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1c3059' }}>
              Verified Identity
            </h3>
            <p className="text-gray-600">
              Secure membership verification system ensuring authenticity and trust.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 px-4" style={{ backgroundColor: '#1c3059' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-200 mb-8 text-lg">
            Your voice matters. Join us today and be part of the change you want to see.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/join"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: '#e80611' }}
            >
              Join Now
            </Link>
            <Link 
              href="/about"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition"
              style={{ backgroundColor: '#1a917f', color: '#ffffff' }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}