import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Member from '@/models';
import { generateMemberQRCode } from '@/lib/qr';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const member = await Member.findById(params.id);

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    // Generate QR code if not exists
    if (!member.qrCode || !member.qrToken) {
      const { qrCode, qrToken } = await generateMemberQRCode({
        _id: member._id,
        idNumber: member.idNumber,
        firstName: member.firstName,
        lastName: member.lastName,
        membershipExpiry: member.membershipExpiry,
      });

      member.qrCode = qrCode;
      member.qrToken = qrToken;
      await member.save();
    }

    return NextResponse.json({
      success: true,
      member: {
        id: member._id,
        firstName: member.firstName,
        lastName: member.lastName,
        idNumber: member.idNumber,
        phoneNumber: member.phoneNumber,
        wardNumber: member.wardNumber,
        votingDistrict: member.votingDistrict,
        physicalAddress: member.physicalAddress,
        municipality: member.municipality,
        province: member.province,
        membershipStart: member.membershipStart,
        membershipExpiry: member.membershipExpiry,
        profileImageUrl: member.profileImageUrl,
        qrCode: member.qrCode,
        isVerified: member.isVerified,
        isActive: member.isActive,
        createdAt: member.createdAt,
      },
    });
  } catch (error) {
    console.error('Get member error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}