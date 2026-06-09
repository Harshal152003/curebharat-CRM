import mongoose, { Schema, Document } from 'mongoose';

// --- Sub-schemas ---
const BackgroundConfigSchema = new Schema(
  {
    type: { type: String, enum: ['color', 'image', 'gradient'], default: 'color' },
    value: { type: String, default: '#ffffff' },
    opacity: { type: Number, default: 1 },
    overlay: { type: String, default: '' },
  },
  { _id: false }
);

const WatermarkConfigSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    type: { type: String, enum: ['text', 'image'], default: 'text' },
    value: { type: String, default: '' },
    opacity: { type: Number, default: 0.1 },
    rotation: { type: Number, default: -30 },
    size: { type: String, default: '200px' },
    repeat: { type: Boolean, default: false },
  },
  { _id: false }
);

const HeaderConfigSchema = new Schema(
  {
    enabled: { type: Boolean, default: true },
    height: { type: String, default: '80px' },
    logo: { type: String, default: '' },
    companyName: { type: String, default: '' },
    website: { type: String, default: '' },
    address: { type: String, default: '' },
    contactDetails: { type: String, default: '' },
    backgroundColor: { type: String, default: '#ffffff' },
    textColor: { type: String, default: '#333333' },
    style: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const FooterConfigSchema = new Schema(
  {
    enabled: { type: Boolean, default: true },
    height: { type: String, default: '60px' },
    showPageNumbers: { type: Boolean, default: true },
    companyDetails: { type: String, default: '' },
    legalText: { type: String, default: '' },
    backgroundColor: { type: String, default: '#1a5c2e' },
    textColor: { type: String, default: '#ffffff' },
    footerGraphic: { type: String, default: '' },
    style: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false }
);

const ComponentStyleSchema = new Schema(
  {
    width: String,
    height: String,
    fontSize: String,
    fontWeight: String,
    fontFamily: String,
    color: String,
    backgroundColor: String,
    textAlign: { type: String, enum: ['left', 'center', 'right', 'justify'] },
    letterSpacing: String,
    lineHeight: String,
    padding: String,
    margin: String,
    borderRadius: String,
    border: String,
    borderCollapse: String,
    boxShadow: String,
    opacity: Number,
    zIndex: Number,
  },
  { _id: false }
);

const PositionSchema = new Schema(
  {
    type: { type: String, enum: ['flow', 'absolute'], default: 'flow' },
    top: String,
    left: String,
    right: String,
    bottom: String,
    gridColumn: String,
    gridRow: String,
    order: Number,
  },
  { _id: false }
);

const ComponentSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'text', 'dynamic-field', 'image', 'logo', 'divider', 'table',
        'card', 'qr-code', 'signature', 'background-layer', 'watermark-layer',
        'icon-block', 'spacer',
      ],
      required: true,
    },
    props: { type: Schema.Types.Mixed, default: {} },
    style: { type: ComponentStyleSchema, default: {} },
    position: { type: PositionSchema, default: { type: 'flow' } },
  },
  { _id: false }
);

const SectionStyleSchema = new Schema(
  {
    backgroundColor: String,
    backgroundImage: String,
    backgroundOverlay: String,
    padding: String,
    margin: String,
    borderRadius: String,
    border: String,
    minHeight: String,
    maxWidth: String,
    boxShadow: String,
    height: String,
    width: String,
    position: String,
    overflow: String,
    display: String,
    flexDirection: String,
    justifyContent: String,
    alignItems: String,
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    id: { type: String, required: true },
    layout: {
      type: String,
      enum: ['full', 'two-column', 'three-column', 'sidebar-left', 'sidebar-right'],
      default: 'full',
    },
    components: [ComponentSchema],
    style: { type: SectionStyleSchema, default: {} },
  },
  { _id: false }
);

const TemplatePageSchema = new Schema(
  {
    pageIndex: { type: Number, required: true },
    pageType: {
      type: String,
      enum: ['cover', 'welcome', 'certificate', 'benefits', 'terms', 'custom'],
      default: 'custom',
    },
    title: { type: String, default: 'Untitled Page' },
    background: { type: BackgroundConfigSchema, default: {} },
    watermark: { type: WatermarkConfigSchema, default: {} },
    header: { type: HeaderConfigSchema, default: {} },
    footer: { type: FooterConfigSchema, default: {} },
    sections: [SectionSchema],
    html: { type: String, default: '' },
    showGlobalHeader: { type: Boolean, default: true },
    showGlobalFooter: { type: Boolean, default: true },
    showGlobalWatermark: { type: Boolean, default: true },
  },
  { _id: false }
);

// --- Main Template Schema ---
export interface ITemplateDoc extends Document {
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  pageCount: number;
  pages: typeof TemplatePageSchema[];
  globalHeader: typeof HeaderConfigSchema;
  globalFooter: typeof FooterConfigSchema;
  globalWatermark: typeof WatermarkConfigSchema;
  createdBy: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['wellness', 'insurance', 'certificate', 'policy', 'custom'],
      default: 'custom',
    },
    brandColors: {
      primary: { type: String, default: '#1a5c2e' },
      secondary: { type: String, default: '#e8742a' },
      accent: { type: String, default: '#f5a623' },
      background: { type: String, default: '#ffffff' },
      text: { type: String, default: '#333333' },
    },
    pageCount: {
      type: Number,
      default: 1,
    },
    pages: [TemplatePageSchema],
    globalHeader: { type: HeaderConfigSchema, default: {} },
    globalFooter: { type: FooterConfigSchema, default: {} },
    globalWatermark: { type: WatermarkConfigSchema, default: {} },
    createdBy: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Template ||
  mongoose.model<ITemplateDoc>('Template', TemplateSchema);
