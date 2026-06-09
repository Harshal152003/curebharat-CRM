// ============================================================
// CureBharat CRM — TypeScript Interfaces
// ============================================================

// --- User / Auth ---
export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'superadmin';
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAuthToken {
  userId: string;
  email: string;
  name: string;
  role: string;
}

// --- Customer ---
export interface ICustomer {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

// --- Template ---
export interface ITemplate {
  _id?: string;
  name: string;
  description: string;
  thumbnail?: string;
  category: 'wellness' | 'insurance' | 'certificate' | 'policy' | 'custom';
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  pageCount: number;
  pages: ITemplatePage[];
  globalHeader?: IHeaderConfig;
  globalFooter?: IFooterConfig;
  globalWatermark?: IWatermarkConfig;
  createdBy: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// --- Template Page ---
export type PageType = 'cover' | 'welcome' | 'certificate' | 'benefits' | 'terms' | 'custom';

export interface ITemplatePage {
  _id?: string;
  templateId?: string;
  pageIndex: number;
  pageType: PageType;
  title: string;
  background?: IBackgroundConfig;
  watermark?: IWatermarkConfig;
  header?: IHeaderConfig;
  footer?: IFooterConfig;
  sections: ISection[];
  showGlobalHeader: boolean;
  showGlobalFooter: boolean;
  showGlobalWatermark: boolean;
  html?: string;
}

// --- Section & Components ---
export type SectionLayout = 'full' | 'two-column' | 'three-column' | 'sidebar-left' | 'sidebar-right';

export interface ISection {
  id: string;
  layout: SectionLayout;
  components: IComponent[];
  style: ISectionStyle;
}

export interface ISectionStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOverlay?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  minHeight?: string;
  maxWidth?: string;
  boxShadow?: string;
  [key: string]: any;
}

export type ComponentType =
  | 'text'
  | 'dynamic-field'
  | 'image'
  | 'logo'
  | 'divider'
  | 'table'
  | 'card'
  | 'qr-code'
  | 'signature'
  | 'background-layer'
  | 'watermark-layer'
  | 'icon-block'
  | 'spacer';

export interface IComponent {
  id: string;
  type: ComponentType;
  props: Record<string, unknown>;
  style: IComponentStyle;
  position: IPosition;
}

export interface IComponentStyle {
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  letterSpacing?: string;
  lineHeight?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  opacity?: number;
  zIndex?: number;
  [key: string]: any;
}

export interface IPosition {
  type: 'flow' | 'absolute';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  gridColumn?: string;
  gridRow?: string;
  order?: number;
}

// --- Background / Watermark / Header / Footer ---
export interface IBackgroundConfig {
  type: 'color' | 'image' | 'gradient';
  value: string;
  opacity?: number;
  overlay?: string;
}

export interface IWatermarkConfig {
  enabled: boolean;
  type: 'text' | 'image';
  value: string;
  opacity: number;
  rotation?: number;
  size?: string;
  repeat?: boolean;
}

export interface IHeaderConfig {
  enabled: boolean;
  height: string;
  logo?: string;
  companyName?: string;
  website?: string;
  address?: string;
  contactDetails?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: Record<string, string>;
}

export interface IFooterConfig {
  enabled: boolean;
  height: string;
  showPageNumbers: boolean;
  companyDetails?: string;
  legalText?: string;
  backgroundColor?: string;
  textColor?: string;
  footerGraphic?: string;
  style?: Record<string, string>;
}

// --- Table ---
export interface ITableConfig {
  headers: string[];
  rows: string[][];
  style: {
    headerBg: string;
    headerColor: string;
    zebraColor: string;
    borderColor: string;
  };
  isDynamic: boolean;
  dynamicSource?: string;
}

// --- Generated PDF ---
export interface IGeneratedPdf {
  _id?: string;
  customerId: string;
  templateId: string;
  customerName: string;
  templateName: string;
  pdfUrl: string;
  fileName: string;
  fileSize?: number;
  generatedBy: string;
  generatedAt?: Date;
}

// --- Dynamic Fields ---
export const DYNAMIC_FIELDS = [
  { key: '{{member_name}}', label: 'Member Name', field: 'memberName' },
  { key: '{{member_id}}', label: 'Member ID', field: 'memberId' },
  { key: '{{dob}}', label: 'Date of Birth', field: 'dob' },
  { key: '{{gender}}', label: 'Gender', field: 'gender' },
  { key: '{{phone}}', label: 'Phone', field: 'phone' },
  { key: '{{email}}', label: 'Email', field: 'email' },
  { key: '{{address}}', label: 'Address', field: 'address' },
  { key: '{{nominee_name}}', label: 'Nominee Name', field: 'nomineeName' },
  { key: '{{nominee_dob}}', label: 'Nominee DOB', field: 'nomineeDob' },
  { key: '{{nominee_gender}}', label: 'Nominee Gender', field: 'nomineeGender' },
  { key: '{{relationship}}', label: 'Relationship', field: 'relationship' },
  { key: '{{plan_name}}', label: 'Plan Name', field: 'planName' },
  { key: '{{plan_start}}', label: 'Plan Start Date', field: 'planStart' },
  { key: '{{plan_end}}', label: 'Plan End Date', field: 'planEnd' },
  { key: '{{coverage_price}}', label: 'Coverage Price', field: 'coveragePrice' },
  { key: '{{members_covered}}', label: 'Members Covered', field: 'membersCovered' },
  { key: '{{coverage_details}}', label: 'Coverage Details', field: 'coverageDetails' },
] as const;

// --- API Response ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
