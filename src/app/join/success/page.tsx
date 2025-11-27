import React from 'react';
import Link from 'next/link';
import { CheckCircle, Mail, QrCode, Clock } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 text-center border-t-8" style={{ borderTopColor: '#1a917f' }}>
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#1a917f' }}>
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1c3059' }}>
            Registration Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for joining our movement. Your membership application has been submitted successfully.
          </p>

          {/* What Happens Next */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1c3059' }}>
              What Happens Next?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: '#3f64af' }}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#1c3059' }}>
                    Verification Process
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our team will verify your information within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: '#ffb612' }}>
                  <Mail className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#1c3059' }}>
                    Email Confirmation
                  </h3>
                  <p className="text-sm text-gray-600">
                    You'll receive a confirmation email once your membership is approved
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: '#e80611' }}>
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#1c3059' }}>
                    Digital Membership Card
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your digital card with QR code will be sent to your email and made available in your member portal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: '#3f64af' }}
            >
              Return to Home
            </Link>
            <Link 
              href="/about"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition border-2"
              style={{ 
                borderColor: '#1a917f',
                color: '#1a917f'
              }}
            >
              Learn More About Us
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 rounded-lg text-center" style={{ backgroundColor: '#1c3059' }}>
          <p className="text-white text-sm">
            Need help? Contact us at <span className="font-semibold">membership@ourparty.co.za</span> or call <span className="font-semibold">+27 12 345 6789</span>
          </p>
        </div>
      </div>
    </div>
  );
}