import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomerDoc extends Document {
  memberId: string;
  memberName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  misHolder: string;
  address: string;
  nomineeName: string;
  nomineeDob: string;
  nomineeGender: 'Male' | 'Female' | 'Other';
  relationship: string;
  planName: string;
  planStart: string;
  planEnd: string;
  coverageDetails: string;
  coveragePrice: number;
  membersCovered: number;
  status: 'active' | 'inactive' | 'expired';
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomerDoc>(
  {
    memberId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    memberName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    misHolder: {
      type: String,
      default: 'No',
    },
    address: {
      type: String,
      required: true,
    },
    nomineeName: {
      type: String,
      required: true,
      trim: true,
    },
    nomineeDob: {
      type: String,
      required: true,
    },
    nomineeGender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    relationship: {
      type: String,
      required: true,
      trim: true,
    },
    planName: {
      type: String,
      required: true,
      trim: true,
    },
    planStart: {
      type: String,
      required: true,
    },
    planEnd: {
      type: String,
      required: true,
    },
    coverageDetails: {
      type: String,
      default: '',
    },
    coveragePrice: {
      type: Number,
      required: true,
    },
    membersCovered: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'active',
    },
    profileImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

CustomerSchema.index({ memberName: 'text', memberId: 'text', email: 'text' });

const getCustomerModel = () => {
  // Use the CureBharatCRM database specifically for this model while keeping the default connection for templates
  const db = mongoose.connection.useDb('CureBharatCRM', { useCache: true });
  return db.models.Customer || db.model<ICustomerDoc>('Customer', CustomerSchema, '800customer data');
};

export default getCustomerModel();
