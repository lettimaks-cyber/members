import QRCode from 'qrcode';
import { createHash } from 'crypto';

interface QRPayload {
  memberId: string;
  idNumber: string;
  fullName: string;
  membershipExpiry: string;
}

/**
 * Generate a secure token for QR code
 */
export function generateQRToken(payload: QRPayload): string {
  const data = JSON.stringify(payload);
  const timestamp = Date.now();
  
  // Create a hash using secret + data + timestamp
  const secret = process.env.QR_SECRET || 'default-secret-change-in-production';
  const hash = createHash('sha256')
    .update(`${secret}${data}${timestamp}`)
    .digest('hex');

  // Encode the payload with hash
  const token = Buffer.from(
    JSON.stringify({
      ...payload,
      hash,
      timestamp,
    })
  ).toString('base64');

  return token;
}

/**
 * Verify QR token authenticity
 */
export function verifyQRToken(token: string): { valid: boolean; data?: QRPayload } {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const { hash, timestamp, ...payload } = decoded;

    // Check if token is not too old (e.g., 1 year)
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > oneYearMs) {
      return { valid: false };
    }

    // Verify hash
    const secret = process.env.QR_SECRET || 'default-secret-change-in-production';
    const expectedHash = createHash('sha256')
      .update(`${secret}${JSON.stringify(payload)}${timestamp}`)
      .digest('hex');

    if (hash !== expectedHash) {
      return { valid: false };
    }

    return { valid: true, data: payload };
  } catch (error) {
    return { valid: false };
  }
}

/**
 * Generate QR code image as data URL
 */
export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 400,
      margin: 2,
      color: {
        dark: '#1c3059', // Dark blue from color scheme
        light: '#ffffff',
      },
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error('QR Code generation failed:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate complete QR code with token for a member
 */
export async function generateMemberQRCode(member: {
  _id: string;
  idNumber: string;
  firstName: string;
  lastName: string;
  membershipExpiry: Date;
}): Promise<{ qrCode: string; qrToken: string }> {
  const payload: QRPayload = {
    memberId: member._id.toString(),
    idNumber: member.idNumber,
    fullName: `${member.firstName} ${member.lastName}`,
    membershipExpiry: member.membershipExpiry.toISOString(),
  };

  const token = generateQRToken(payload);
  const qrCode = await generateQRCode(token);

  return { qrCode, qrToken: token };
}