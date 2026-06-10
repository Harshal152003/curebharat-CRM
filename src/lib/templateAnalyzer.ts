import { ICustomer } from '@/types';

// The keys we check in the customer object, mapped to the template placeholders they replace.
// This matches compilePlaceholders in htmlBuilder.ts
export const PLACEHOLDER_FIELD_MAP = [
  { field: 'memberName', placeholder: '{{member_name}}' },
  { field: 'memberId', placeholder: '{{member_id}}' },
  { field: 'dob', placeholder: '{{dob}}', isDate: true },
  { field: 'gender', placeholder: '{{gender}}' },
  { field: 'phone', placeholder: '{{phone}}' },
  { field: 'email', placeholder: '{{email}}' },
  { field: 'masterSubscriptionHolder', placeholder: '{{mis_holder}}' },
  { field: 'address', placeholder: '{{address}}' },
  { field: 'nomineeName', placeholder: '{{nominee_name}}' },
  { field: 'nomineeDob', placeholder: '{{nominee_dob}}', isDate: true },
  { field: 'nomineeGender', placeholder: '{{nominee_gender}}' },
  { field: 'relationship', placeholder: '{{relationship}}' },
  { field: 'planName', placeholder: '{{plan_name}}' },
  { field: 'planStart', placeholder: '{{plan_start}}', isDate: true },
  { field: 'planEnd', placeholder: '{{plan_end}}', isDate: true },
  { field: 'coveragePrice', placeholder: '{{coverage_price}}' },
  { field: 'coveragePrice', placeholder: '{{plan_price}}' },
  { field: 'membersCovered', placeholder: '{{members_covered}}' },
  { field: 'coverageDetails', placeholder: '{{coverage_details}}' }
];

export const normalizePlanName = (str: string) => {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/^(cb|curebharat)\s*-?\s*/, '')
    .replace(/[^a-z0-9]/g, '');
};

export const getRequiredFieldsForTemplate = (template: any) => {
  if (!template) return [];
  
  const templateStr = JSON.stringify(template);
  const requiredFields = new Set<string>();

  for (const map of PLACEHOLDER_FIELD_MAP) {
    if (templateStr.includes(map.placeholder)) {
      requiredFields.add(map.field);
    }
  }

  return Array.from(requiredFields);
};

export const isFieldIncomplete = (value: any, isDate: boolean = false) => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'number' && value === 0) return true;
  const strVal = String(value).trim();
  if (['N/A', 'n/a', '', 'Pending', 'Pending KYC', 'Unknown'].includes(strVal)) return true;
  if (isDate && ['2000-01-01', '1900-01-01'].includes(strVal)) return true;
  return false;
};

// Given a customer and an array of templates, determine the missing fields
export const getIncompleteFields = (customer: ICustomer, templates: any[]) => {
  if (!templates || templates.length === 0) return []; // Can't validate without templates
  
  const normPlan = normalizePlanName(customer.planName);
  let matchedTemplate = templates.find(t => normalizePlanName(t.name) === normPlan) || templates[0];
  
  const requiredFields = getRequiredFieldsForTemplate(matchedTemplate);
  const missing: string[] = [];

  for (const field of requiredFields) {
    const isDate = PLACEHOLDER_FIELD_MAP.find(m => m.field === field)?.isDate || false;
    if (isFieldIncomplete((customer as any)[field], isDate)) {
      // Format the field name for display
      const displayName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      missing.push(displayName);
    }
  }

  return missing;
};
