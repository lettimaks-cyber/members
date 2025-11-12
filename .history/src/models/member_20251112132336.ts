// models/Member.ts
import mongoose, { Schema, model, models } from "mongoose";

const MemberSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    wardNumber: { type: String, required: true },
    votingDistrict: { type: String },
    address: { type: String, required: true },
    municipality: { type: String, required: true },
    province: { type: String, required: true },
    membershipStart: { type: Date, default: Date.now },
    membershipEnd: { type: Date, required: true },
    profilePic: { type: String }, // Cloudinary URL
    qrCode: { type: String },     // Encrypted JWT or Cloudinary link
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Member || model("Member", MemberSchema);
