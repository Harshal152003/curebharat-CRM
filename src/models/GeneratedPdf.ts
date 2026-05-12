import mongoose, { Schema, Document } from 'mongoose';

export interface IGeneratedPdfDoc extends Document {
  customerId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  customerName: string;
  templateName: string;
  pdfUrl: string;
  fileName: string;
  fileSize: number;
  generatedBy: string;
  generatedAt: Date;
}

const GeneratedPdfSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    templateName: {
      type: String,
      required: true,
    },
    pdfUrl: {
      type: String,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    generatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'generatedAt', updatedAt: false },
  }
);

GeneratedPdfSchema.index({ customerId: 1, generatedAt: -1 });
GeneratedPdfSchema.index({ templateId: 1 });

export default mongoose.models.GeneratedPdf ||
  mongoose.model<IGeneratedPdfDoc>('GeneratedPdf', GeneratedPdfSchema);
