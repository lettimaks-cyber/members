'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Download,
  Share2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import html2canvas from 'html2canvas';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  phoneNumber: string;
  wardNumber: string;
  votingDistrict: string;
  physicalAddress: string;
  municipality: string;
  province: string;
  membershipStart: string;
  membershipExpiry: string;
  profileImageUrl?: string;
  qrCode: string;
  isVerified: boolean;
  isActive: boolean;
}

export default function MembershipCardPage() {
  const params = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMember();
  }, [params.id]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/members/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Member not found');
      }

      const data = await response.json();
      setMember(data.member);

      // Check if membership is expired
      const expiryDate = new Date(data.member.membershipExpiry);
      setIsExpired(expiryDate < new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load member');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `membership-card-${member?.firstName}-${member?.lastName}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download card');
    }
  };

  const shareCard = async () => {
    if (!navigator.share) {
      alert('Sharing is not supported on this device');
      return;
    }

    try {
      await navigator.share({
        title: 'My Membership Card',
        text: `${member?.firstName} ${member?.lastName} - Party Member`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#3f64af' }} />
          <p className="text-gray-600">Loading membership card...</p>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#e80611' }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1c3059' }}>
            Card Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'Unable to load membership card'}
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: '#3f64af' }}
          >
            Return Home
          </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Status Banner */}
        {isExpired && (
          <div className="mb-6 p-4 rounded-lg border-l-4 bg-red-50" style={{ borderLeftColor: '#e80611' }}>
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" style={{ color: '#e80611' }} />
              <div>
                <p className="font-semibold" style={{ color: '#e80611' }}>
                  Membership Expired
                </p>
                <p className="text-sm text-gray-600">
                  This membership expired on {formatDate(member.membershipExpiry)}. Please renew to continue.
                </p>
              </div>
            </div>
          </div>
        )}

        {!member.isVerified && (
          <div className="mb-6 p-4 rounded-lg border-l-4 bg-yellow-50" style={{ borderLeftColor: '#ffb612' }}>
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" style={{ color: '#ffb612' }} />
              <div>
                <p className="font-semibold text-gray-900">Pending Verification</p>
                <p className="text-sm text-gray-600">
                  Your membership is awaiting admin verification. You'll be notified once approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={downloadCard}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: '#1a917f' }}
          >
            <Download className="w-5 h-5" />
            <span>Download Card</span>
          </button>
          <button
            onClick={shareCard}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: '#3f64af' }}
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Membership Card */}
        <div ref={cardRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="p-6" style={{ backgroundColor: '#1c3059' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-10 h-10 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Party Membership</h1>
                  <p className="text-gray-300 text-sm">Official Member Card</p>
                </div>
              </div>
              {member.isVerified && !isExpired && (
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <CheckCircle className="w-5 h-5" style={{ color: '#1a917f' }} />
                  <span className="text-white text-sm font-semibold">VERIFIED</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column - Photo and QR */}
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                  {member.profileImageUrl ? (
                    <img
                      src={member.profileImageUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-40 h-40 rounded-xl object-cover border-4 shadow-lg"
                      style={{ borderColor: '#3f64af' }}
                    />
                  ) : (
                    <div
                      className="w-40 h-40 rounded-xl flex items-center justify-center border-4 shadow-lg"
                      style={{ borderColor: '#3f64af', backgroundColor: '#f3f4f6' }}
                    >
                      <User className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-xl border-2 shadow-md" style={{ borderColor: '#3f64af' }}>
                    <img
                      src={member.qrCode}
                      alt="Membership QR Code"
                      className="w-32 h-32"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Scan to verify membership
                  </p>
                </div>
              </div>

              {/* Middle & Right Columns - Member Information */}
              <div className="md:col-span-2 space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#1c3059' }}>
                    {member.firstName} {member.lastName}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: '#3f64af' }}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">ID Number</p>
                        <p className="font-semibold" style={{ color: '#1c3059' }}>
                          {member.idNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: '#1a917f' }}>
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                        <p className="font-semibold" style={{ color: '#1c3059' }}>
                          {member.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: '#ffb612' }}>
                        <MapPin className="w-5 h-5 text-gray-900" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Ward Number</p>
                        <p className="font-semibold" style={{ color: '#1c3059' }}>
                          Ward {member.wardNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: '#e80611' }}>
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Voting District</p>
                        <p className="font-semibold" style={{ color: '#1c3059' }}>
                          {member.votingDistrict}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium mb-2">PHYSICAL ADDRESS</p>
                  <p className="text-sm" style={{ color: '#1c3059' }}>
                    {member.physicalAddress}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#1c3059' }}>
                    {member.municipality}, {member.province}
                  </p>
                </div>

                {/* Membership Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f9fafb', borderLeftColor: '#1a917f' }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5" style={{ color: '#1a917f' }} />
                      <p className="text-xs text-gray-500 font-medium">START DATE</p>
                    </div>
                    <p className="font-bold" style={{ color: '#1c3059' }}>
                      {formatDate(member.membershipStart)}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-l-4 ${isExpired ? 'bg-red-50' : 'bg-gray-50'}`} style={{ borderLeftColor: isExpired ? '#e80611' : '#3f64af' }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5" style={{ color: isExpired ? '#e80611' : '#3f64af' }} />
                      <p className="text-xs text-gray-500 font-medium">EXPIRY DATE</p>
                    </div>
                    <p className="font-bold" style={{ color: isExpired ? '#e80611' : '#1c3059' }}>
                      {formatDate(member.membershipExpiry)}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#1c3059' }}>
                  <span className="text-white font-semibold">Membership Status:</span>
                  {member.isVerified && member.isActive && !isExpired ? (
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#1a917f' }}>
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span className="text-white font-bold">ACTIVE</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-full" style={{ backgroundColor: isExpired ? '#e80611' : '#ffb612' }}>
                      <XCircle className="w-5 h-5 text-white" />
                      <span className="text-white font-bold">
                        {isExpired ? 'EXPIRED' : 'PENDING'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 border-t border-gray-200" style={{ backgroundColor: '#f9fafb' }}>
            <p className="text-xs text-gray-500 text-center">
              Member ID: {member.id} • This card is property of the cardholder and must be presented when requested
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 rounded-lg text-center" style={{ backgroundColor: '#1c3059' }}>
          <p className="text-white text-sm">
            For assistance or to report issues, contact us at <span className="font-semibold">membership@ourparty.co.za</span>
          </p>
        </div>
      </div>
    </div>
  );
}