'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement API call
    // await fetch('/api/contact', { 
    //   method: 'POST', 
    //   body: JSON.stringify(formData) 
    // });
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border-t-4" style={{ borderTopColor: '#1a917f' }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#1a917f' }}>
            <Send className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1c3059' }}>
            Message Sent!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. We'll get back to you within 24-48 hours.
          </p>
          <button 
            onClick={resetForm}
            className="px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: '#3f64af' }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1c3059' }}>
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about membership or want to get involved? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="rounded-xl p-8 h-full text-white" style={{ backgroundColor: '#1c3059' }}>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-300 mb-8">
                Reach out to us through any of the following channels. We're here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#3f64af' }}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+27 12 345 6789</p>
                    <p className="text-gray-300">+27 12 345 6790</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#1a917f' }}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">info@ourparty.co.za</p>
                    <p className="text-gray-300">membership@ourparty.co.za</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffb612' }}>
                    <MapPin className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-gray-300">
                      123 Democracy Street<br />
                      Pretoria, Gauteng<br />
                      South Africa, 0001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#e80611' }}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1c3059' }}>
                Send Us a Message
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#e80611' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#3f64af' }}>
                <h3 className="font-bold mb-2" style={{ color: '#1c3059' }}>
                  General Inquiries
                </h3>
                <p className="text-sm text-gray-600">
                  For general questions about our party and policies
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#1a917f' }}>
                <h3 className="font-bold mb-2" style={{ color: '#1c3059' }}>
                  Membership Support
                </h3>
                <p className="text-sm text-gray-600">
                  Help with registration and membership issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}