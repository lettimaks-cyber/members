'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Upload, Camera, User, Hash, Phone, MapPin, Home, Calendar } from 'lucide-react';

export default function JoinPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    phoneNumber: '',
    wardNumber: '',
    votingDistrict: '',
    physicalAddress: '',
    municipality: '',
    province: '',
    membershipStart: '',
    membershipExpiry: '',
    profileImage: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      router.push('/join/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Users className="w-16 h-16 mx-auto mb-4" style={{ color: '#3f64af' }} />
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#1c3059' }}>
            Join Our Movement
          </h1>
          <p className="text-black text-lg">
            Fill in your details to become a registered member
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile preview" 
                    className="w-32 h-32 rounded-full object-cover border-4"
                    style={{ borderColor: '#3f64af' }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                    <Camera className="w-12 h-12 text-black" />
                  </div>
                )}
                <label 
                  className="absolute bottom-0 right-0 rounded-full p-2 cursor-pointer hover:opacity-90 transition"
                  style={{ backgroundColor: '#e80611' }}
                >
                  <Upload className="w-5 h-5 text-white" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">Upload your profile photo</p>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <User className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <User className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>

              {/* ID Number */}
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <Hash className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                  maxLength={13}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="13-digit ID number"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <Phone className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 0821234567"
                />
              </div>

              {/* Ward Number */}
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Ward Number
                </label>
                <input
                  type="text"
                  name="wardNumber"
                  value={formData.wardNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ward number"
                />
              </div>

              {/* Voting District */}
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Voting District Number
                </label>
                <input
                  type="text"
                  name="votingDistrict"
                  value={formData.votingDistrict}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter voting district"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center text-sm font-medium text-black mb-2">
                <Home className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                Physical Address
              </label>
              <textarea
                name="physicalAddress"
                value={formData.physicalAddress}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full physical address"
              />
            </div>

            {/* Municipality + Province */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Municipality
                </label>
                <input
                  type="text"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter municipality"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Province
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select province</option>
                  {provinces.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <Calendar className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Membership Start Date
                </label>
                <input
                  type="date"
                  name="membershipStart"
                  value={formData.membershipStart}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-black mb-2">
                  <Calendar className="w-4 h-4 mr-2" style={{ color: '#3f64af' }} />
                  Membership Expiry Date
                </label>
                <input
                  type="date"
                  name="membershipExpiry"
                  value={formData.membershipExpiry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-semibold text-white transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#e80611' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#1c3059' }}>
          <p className="text-white text-sm text-center">
            All information provided will be kept confidential and used solely for membership verification purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
