// lib/qr.ts
import jwt from "jsonwebtoken]";

const SECRET = process.env.QR_SECRET!;

export function generateMemberQR(memberId: string) {
  const token = jwt.sign({ memberId }, SECRET, { expiresIn: "1y" });
  return `${process.env.NEXT_PUBLIC_BASE_URL}/membership/validate?token=${token}`;
}

export function verifyMemberQR(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch {
    return null;
  }
}
