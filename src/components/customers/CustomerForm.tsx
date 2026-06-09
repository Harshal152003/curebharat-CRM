'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi';
import { ICustomer } from '@/types';

interface CustomerFormProps {
  customer?: ICustomer;
  isEdit?: boolean;
}

const initialForm: Omit<ICustomer, '_id' | 'createdAt' | 'updatedAt'> = {
  memberId: '',
  memberName: '',
  dob: '',
  gender: 'Male',
  phone: '',
  email: '',
  misHolder: 'No',
  address: '',
  nomineeName: '',
  nomineeDob: '',
  nomineeGender: 'Male',
  relationship: '',
  planName: '',
  planStart: '',
  planEnd: '',
  coverageDetails: '',
  coveragePrice: 0,
  membersCovered: 1,
  status: 'active',
};

export default function CustomerForm({ customer, isEdit }: CustomerFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(customer || initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/customers/${customer?._id}` : '/api/customers';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to save customer');
        setLoading(false);
        return;
      }

      router.push('/customers');
      router.refresh();
    } catch {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const formSections = [
    {
      title: 'Member Information',
      fields: [
        { name: 'memberId', label: 'Member ID', type: 'text', required: true, placeholder: 'CB-2024-001' },
        { name: 'memberName', label: 'Full Name', type: 'text', required: true, placeholder: 'Rajesh Kumar' },
        { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 9876543210' },
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'rajesh@example.com' },
        { name: 'misHolder', label: 'MIS Holder', type: 'select', options: ['No', 'Yes'] },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
      ],
    },
    {
      title: 'Nominee Details',
      fields: [
        { name: 'nomineeName', label: 'Nominee Name', type: 'text', required: true },
        { name: 'nomineeDob', label: 'Nominee DOB', type: 'date', required: true },
        { name: 'nomineeGender', label: 'Nominee Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { name: 'relationship', label: 'Relationship', type: 'text', required: true, placeholder: 'Spouse' },
      ],
    },
    {
      title: 'Plan Information',
      fields: [
        { name: 'planName', label: 'Plan Name', type: 'text', required: true, placeholder: 'CureBharat Gold Plus' },
        { name: 'planStart', label: 'Plan Start Date', type: 'date', required: true },
        { name: 'planEnd', label: 'Plan End Date', type: 'date', required: true },
        { name: 'coveragePrice', label: 'Coverage Price (₹)', type: 'number', required: true },
        { name: 'membersCovered', label: 'Members Covered', type: 'number', required: true },
        { name: 'coverageDetails', label: 'Coverage Details', type: 'textarea' },
        { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'expired'] },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="customer-form-page"
    >
      <div className="page-header-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn btn-ghost btn-icon" onClick={() => router.back()}>
            <HiOutlineArrowLeft size={18} />
          </button>
          <div>
            <h1 className="page-title">
              {isEdit ? 'Edit Customer' : 'Add New Customer'}
            </h1>
            <p className="page-subtitle">
              {isEdit ? 'Update customer information' : 'Create a new customer record'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {formSections.map((section) => (
          <div key={section.title} className="form-section glass-card-static">
            <h3 className="form-section-title">{section.title}</h3>
            <div className="form-grid">
              {section.fields.map((field) => (
                <div
                  key={field.name}
                  className={`form-field ${
                    field.type === 'textarea' ? 'form-field-full' : ''
                  }`}
                >
                  <label htmlFor={field.name} className="input-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={(form as Record<string, unknown>)[field.name] as string}
                      onChange={handleChange}
                      className="input"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={(form as Record<string, unknown>)[field.name] as string}
                      onChange={handleChange}
                      className="input"
                      rows={3}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={(form as Record<string, unknown>)[field.name] as string}
                      onChange={handleChange}
                      className="input"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <>
                <HiOutlineCheck size={18} />
                {isEdit ? 'Update Customer' : 'Create Customer'}
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .customer-form-page {
          max-width: 900px;
          margin: 0 auto;
        }

        .page-header-row {
          margin-bottom: 24px;
        }

        .page-title {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--foreground);
        }

        .page-subtitle {
          font-size: 14px;
          color: var(--foreground-dim);
          margin-top: 2px;
        }

        .form-error {
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #f87171;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .form-section {
          padding: 24px;
          margin-bottom: 20px;
        }

        .form-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-field-full {
          grid-column: 1 / -1;
        }

        .required {
          color: var(--error);
          margin-left: 4px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 8px;
          padding-bottom: 40px;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
