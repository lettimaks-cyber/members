import mongoose, { Document, Schema } from 'mongoose';

export interface IMember extends Document {
  _id: string;
  userId?: string; // Clerk user ID
  firstName: string;
  lastName: string;
  idNumber: string;
  phoneNumber: string;
  wardNumber: string;
  votingDistrict: string;
  physicalAddress: string;
  municipality: string;
  province: string;
  membershipStart: Date;
  membershipExpiry: Date;
  profileImageUrl?: string;
  qrCode?: string;
  qrToken?: string;
  isVerified: boolean;
  isActive: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    userId: {
      type: String,
      sparse: true,
      index: true,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    idNumber: {
      type: String,
      required: [true, 'ID number is required'],
      unique: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\d{13}$/.test(v);
        },
        message: 'ID number must be 13 digits',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    wardNumber: {
      type: String,
      required: [true, 'Ward number is required'],
      trim: true,
    },
    votingDistrict: {
      type: String,
      required: [true, 'Voting district is required'],
      trim: true,
    },
    physicalAddress: {
      type: String,
      required: [true, 'Physical address is required'],
      trim: true,
    },
    municipality: {
      type: String,
      required: [true, 'Municipality is required'],
      trim: true,
    },
    province: {
      type: String,
      required: [true, 'Province is required'],
      enum: [
        'Eastern Cape',
        'Free State',
        'Gauteng',
        'KwaZulu-Natal',
        'Limpopo',
        'Mpumalanga',
        'Northern Cape',
        'North West',
        'Western Cape',
      ],
    },
    membershipStart: {
      type: Date,
      required: [true, 'Membership start date is required'],
    },
    membershipExpiry: {
      type: Date,
      required: [true, 'Membership expiry date is required'],
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    qrCode: {
      type: String,
      default: null,
    },
    qrToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    verifiedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
MemberSchema.index({ firstName: 1, lastName: 1 });
MemberSchema.index({ province: 1, municipality: 1 });
MemberSchema.index({ wardNumber: 1, votingDistrict: 1 });

// Virtual for full name
MemberSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Method to check if membership is expired
MemberSchema.methods.isExpired = function () {
  return new Date() > this.membershipExpiry;
};

// Method to check if membership is valid
MemberSchema.methods.isValidMembership = function () {
  return this.isVerified && this.isActive && !this.isExpired();
};

// Ensure virtuals are included in JSON
MemberSchema.set('toJSON', { virtuals: true });
MemberSchema.set('toObject', { virtuals: true });

export default mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);