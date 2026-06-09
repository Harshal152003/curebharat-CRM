'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineMail,
  HiOutlineUpload,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import * as XLSX from 'xlsx';
import { ICustomer } from '@/types';

const getIncompleteFields = (customer: ICustomer) => {
  const missingStringValues = ['N/A', 'n/a', '', 'Pending', 'Pending KYC', 'Unknown'];
  const missingDateValues = ['2000-01-01', '1900-01-01', 'N/A', 'n/a', ''];
  const incomplete = [];

  if (!customer.memberName || missingStringValues.includes(customer.memberName)) incomplete.push('Member Name');
  if (!customer.phone || missingStringValues.includes(customer.phone)) incomplete.push('Phone');
  if (!customer.email || missingStringValues.includes(customer.email)) incomplete.push('Email');
  if (!customer.address || missingStringValues.includes(customer.address)) incomplete.push('Address');
  if (!customer.nomineeName || missingStringValues.includes(customer.nomineeName)) incomplete.push('Nominee Name');
  if (!customer.relationship || missingStringValues.includes(customer.relationship)) incomplete.push('Relationship');
  if (!customer.planName || missingStringValues.includes(customer.planName)) incomplete.push('Plan Name');
  if (!customer.dob || missingDateValues.includes(customer.dob)) incomplete.push('DOB');
  if (!customer.planStart || missingDateValues.includes(customer.planStart)) incomplete.push('Plan Start');
  if (!customer.planEnd || missingDateValues.includes(customer.planEnd)) incomplete.push('Plan End');
  if (!customer.nomineeDob || missingDateValues.includes(customer.nomineeDob)) incomplete.push('Nominee DOB');
  if (customer.coveragePrice === undefined || customer.coveragePrice === null || customer.coveragePrice === 0) incomplete.push('Coverage Price');

  return incomplete;
};

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterIncomplete, setFilterIncomplete] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
   const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [previewingPdf, setPreviewingPdf] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates');
        const data = await res.json();
        if (data.success) setTemplates(data.data);
      } catch (err) {
        console.error('Failed to fetch templates:', err);
      }
    };
    fetchTemplates();
  }, []);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(filterIncomplete && { incomplete: 'true' })
      });
      const res = await fetch(`/api/customers?${params}`);
      const data = await res.json();
      if (data.success) {
        setCustomers(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotal(data.pagination.total);
      }
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
      // Removed setSelectedCustomerIds([]) so selection persists across pages
    }
  }, [page, search, filterIncomplete]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchCustomers();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
    setDeleteId(null);
  };

  const getTemplateForCustomer = (customer: ICustomer) => {
    let templateIdToUse = selectedTemplateId;
    if (!templateIdToUse) {
      const normalize = (str: string) => str.toLowerCase()
        .replace(/^(cb|curebharat)\s*-?\s*/, '')
        .replace(/[^a-z0-9]/g, ''); // strip spaces and punctuation for robust matching

      const normPlan = normalize(customer.planName);

      const matchedTemplate = templates.find(t => {
        const normTemp = normalize(t.name);
        return normTemp === normPlan;
      }) || templates[0];
      templateIdToUse = matchedTemplate?._id;
    }
    return templateIdToUse;
  };

  const handlePreviewPDF = async (customer: ICustomer) => {
    if (!templates.length) {
      alert('No templates available to generate PDF');
      return;
    }

    const templateIdToUse = getTemplateForCustomer(customer);
    if (!templateIdToUse) {
      alert('Could not auto-match a template for this customer.');
      return;
    }

    setPreviewingPdf(customer._id!);

    // Open window immediately to bypass popup blocker
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write('<html><head><title>Generating PDF...</title></head><body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;"><h2>Generating PDF, please wait...</h2></body></html>');
    }

    try {
      const res = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: customer._id,
          templateId: templateIdToUse,
        }),
      });

      if (res.ok && res.headers.get('Content-Type')?.includes('application/pdf')) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (newWindow) {
          newWindow.location.href = url;
        } else {
          // Fallback if blocked
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.click();
        }
      } else {
        const data = await res.json();
        if (newWindow) newWindow.close();
        alert('PDF preview failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Preview error:', error);
      if (newWindow) newWindow.close();
      alert('An error occurred while generating PDF preview');
    } finally {
      setPreviewingPdf(null);
    }
  };

  const handleSendEmail = async (customer: ICustomer) => {
    if (!templates.length) {
      alert('No templates available to send');
      return;
    }

    setSendingEmail(customer._id!);
    try {
      const templateIdToUse = getTemplateForCustomer(customer);

      const res = await fetch('/api/pdf/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: customer._id,
          templateId: templateIdToUse,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Certificate sent successfully to ' + customer.email);
      } else {
        alert('Failed to send email: ' + data.error);
      }
    } catch (error) {
      console.error('Email send error:', error);
      alert('An error occurred while sending the email');
    } finally {
      setSendingEmail(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCustomers();
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentIds = customers.map(c => c._id!);
    if (e.target.checked) {
      setSelectedCustomerIds(prev => Array.from(new Set([...prev, ...currentIds])));
    } else {
      setSelectedCustomerIds(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedCustomerIds(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleBulkSendEmail = async () => {
    if (!templates.length) {
      alert('No templates available to send');
      return;
    }
    if (selectedCustomerIds.length === 0) return;

    if (!confirm(`Are you sure you want to send emails/PDFs to ${selectedCustomerIds.length} customers?`)) return;

    let successCount = 0;
    let failCount = 0;
    let lastError = '';

    for (const id of selectedCustomerIds) {
      setSendingEmail(id);
      try {
        // Find the customer's plan
        const customer = customers.find(c => c._id === id);
        if (!customer) throw new Error('Customer not found in state');

        let templateIdToUse = selectedTemplateId;

        if (!templateIdToUse) {
          const normalize = (str: string) => str.toLowerCase()
            .replace(/^(cb|curebharat)\s*-?\s*/, '')
            .replace(/[^a-z0-9]/g, ''); // strip spaces and punctuation for robust matching

          const normPlan = normalize(customer.planName);

          const matchedTemplate = templates.find(t => {
            const normTemp = normalize(t.name);
            return normTemp === normPlan;
          }) || templates[0];
          templateIdToUse = matchedTemplate._id;
        }

        const res = await fetch('/api/pdf/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerId: id,
            templateId: templateIdToUse, 
          }),
        });

        const data = await res.json();
        if (data.success) {
          successCount++;
        } else {
          failCount++;
          lastError = data.error || 'Unknown error';
        }
      } catch (error) {
        console.error('Email send error:', error);
        failCount++;
        lastError = error instanceof Error ? error.message : 'Network error';
      }
    }
    setSendingEmail(null);
    let msg = `Bulk send complete.\nSuccess: ${successCount}\nFailed: ${failCount}`;
    if (failCount > 0 && lastError) {
      msg += `\nLast error: ${lastError}`;
    }
    alert(msg);
    setSelectedCustomerIds([]);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: false });
        
        if (data.length === 0) return alert('Invalid or empty file');

        // Remove the strict header check
        let successCount = 0;
        let failCount = 0;
        let missingReport: string[] = [];

        const aliasMap: Record<string, string> = {
          customerid: 'memberId', id: 'memberId',
          name: 'memberName', customername: 'memberName', fullname: 'memberName', membername: 'memberName',
          contact: 'phone', contactnumber: 'phone', mobile: 'phone', phone: 'phone', phonenumber: 'phone', customercontactnumber: 'phone',
          emailaddress: 'email', email: 'email', mail: 'email', emailid: 'email', customeremailid: 'email',
          address: 'address', location: 'address', city: 'address',
          dateofbirth: 'dob', birthdate: 'dob', dob: 'dob',
          gender: 'gender', sex: 'gender',
          plan: 'planName', planname: 'planName', package: 'planName', policy: 'planName',
          startdate: 'planStart', planstart: 'planStart', start: 'planStart',
          enddate: 'planEnd', planend: 'planEnd', expiry: 'planEnd',
          price: 'coveragePrice', coverageprice: 'coveragePrice', amount: 'coveragePrice', fee: 'coveragePrice',
          nominee: 'nomineeName', nomineename: 'nomineeName', nominee1nomineesname: 'nomineeName',
          nomineerelation: 'relationship', relationship: 'relationship', relation: 'relationship', nominee1nomineesrelationshipwithcustomer: 'relationship',
          nomineedob: 'nomineeDob', nominee1nomineesdob: 'nomineeDob',
          nomineegender: 'nomineeGender', nominee1nomineesgender: 'nomineeGender',
          members: 'membersCovered', memberscovered: 'membersCovered',
          misholder: 'misHolder', mis: 'misHolder', misholders: 'misHolder'
        };

        let lastErrorMsg = '';

        for (let i = 0; i < data.length; i++) {
          const rawData: any = data[i];
          const customerData: any = {};
          let addressParts: string[] = [];
          let nomineeNameParts: string[] = [];
          
          // Smart Normalize keys
          Object.keys(rawData).forEach(key => {
            let normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
            let mappedKey = aliasMap[normalizedKey] || normalizedKey;
            customerData[mappedKey] = rawData[key];

            // Auto-concatenate multiple address columns
            if (normalizedKey.includes('address') || normalizedKey.includes('city') || normalizedKey.includes('state') || normalizedKey.includes('pincode')) {
              addressParts.push(String(rawData[key]).trim());
            }
            
            // Auto-concatenate nominee first name and last name
            if (normalizedKey.includes('nomineesfirstname') || normalizedKey.includes('nomineessurname')) {
              nomineeNameParts.push(String(rawData[key]).trim());
            }
          });

          if (addressParts.length > 0) {
            customerData.address = addressParts.filter(Boolean).join(', ');
          }
          if (nomineeNameParts.length > 0) {
            customerData.nomineeName = nomineeNameParts.filter(Boolean).join(' ');
          }

          // Check for missing required fields BEFORE applying defaults
          const requiredFields = ['memberName', 'phone', 'email', 'dob', 'address', 'planName', 'planStart', 'planEnd', 'coveragePrice', 'nomineeName', 'nomineeDob', 'relationship'];
          const missing = requiredFields.filter(f => !customerData[f]);
          if (missing.length > 0) {
            missingReport.push(`Row ${i + 2} (${customerData.memberName || 'Unknown'}): missing ${missing.join(', ')}`);
          }

          // Fix Enums for Gender
          if (customerData.gender) {
            const g = customerData.gender.toString().toLowerCase();
            customerData.gender = g.startsWith('f') ? 'Female' : g.startsWith('m') ? 'Male' : 'Other';
          } else {
            customerData.gender = 'Male';
          }
          if (customerData.nomineeGender) {
            const g = customerData.nomineeGender.toString().toLowerCase();
            customerData.nomineeGender = g.startsWith('f') ? 'Female' : g.startsWith('m') ? 'Male' : 'Other';
          } else {
            customerData.nomineeGender = 'Male';
          }

          // Format dates to YYYY-MM-DD for HTML inputs
          const formatDate = (dateStr: string) => {
            if (!dateStr || dateStr === 'N/A') return '2000-01-01'; // Safe default
            const str = String(dateStr).trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
            
            // Check for DD-MM-YYYY, MM-DD-YYYY, DD/MM/YY, etc
            const match = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})$/);
            if (match) {
              const part1 = parseInt(match[1], 10);
              const part2 = parseInt(match[2], 10);
              let year = match[3];
              if (year.length === 2) year = parseInt(year) > 50 ? `19${year}` : `20${year}`;
              
              if (part2 > 12) {
                return `${year}-${String(part1).padStart(2, '0')}-${String(part2).padStart(2, '0')}`;
              }
              if (part1 > 12) {
                return `${year}-${String(part2).padStart(2, '0')}-${String(part1).padStart(2, '0')}`;
              }
              return `${year}-${String(part2).padStart(2, '0')}-${String(part1).padStart(2, '0')}`;
            }

            // Fallback for custom formats like "30 May 1970"
            const d = new Date(str);
            if (!isNaN(d.getTime())) {
               return d.toISOString().split('T')[0];
            }
            
            return '2000-01-01'; // Ultimate fallback
          };

          // Apply Safe Defaults to bypass Mongoose validation errors
          customerData.status = customerData.status || 'active';
          customerData.memberId = customerData.memberId || `CB-IMP-${Date.now()}-${i}`;
          customerData.memberName = customerData.memberName || 'Unknown';
          customerData.phone = customerData.phone || 'N/A';
          customerData.email = customerData.email || 'N/A';
          customerData.dob = formatDate(customerData.dob);
          customerData.address = customerData.address || 'N/A';
          customerData.planName = customerData.planName || 'N/A';
          customerData.planStart = formatDate(customerData.planStart);
          customerData.planEnd = formatDate(customerData.planEnd);
          customerData.coveragePrice = customerData.coveragePrice || 0;
          customerData.nomineeName = customerData.nomineeName || 'N/A';
          customerData.nomineeDob = formatDate(customerData.nomineeDob);
          customerData.relationship = customerData.relationship || 'N/A';
          
          if (customerData.misHolder) {
            const val = String(customerData.misHolder).toLowerCase().trim();
            customerData.misHolder = (val === 'yes' || val === 'y' || val === 'true') ? 'Yes' : 'No';
          } else {
            customerData.misHolder = 'No';
          }

          // Clean up numeric fields
          if (customerData.coveragePrice) {
            customerData.coveragePrice = customerData.coveragePrice.toString().replace(/[^0-9.]/g, '');
            if (!customerData.coveragePrice) customerData.coveragePrice = 0;
          }
          if (customerData.membersCovered) {
            customerData.membersCovered = customerData.membersCovered.toString().replace(/[^0-9]/g, '');
          }

          try {
            const res = await fetch('/api/customers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(customerData)
            });
            if (res.ok) {
              successCount++;
            } else {
              failCount++;
              const errData = await res.json();
              if (!lastErrorMsg) lastErrorMsg = errData.error || errData.message || JSON.stringify(errData);
            }
          } catch(err: any) {
            failCount++;
            if (!lastErrorMsg) lastErrorMsg = err.message || 'Network error';
          }
        }
        
        let finalMsg = `Import complete. Success: ${successCount}, Failed: ${failCount}`;
        if (failCount > 0 && lastErrorMsg) {
          finalMsg += `\n\nDatabase Error on failed rows: ${lastErrorMsg}`;
        }
        if (missingReport.length > 0) {
          finalMsg += `\n\nNote: Some data was missing and auto-filled with 'N/A':\n` + missingReport.slice(0, 10).join('\n');
          if (missingReport.length > 10) finalMsg += `\n...and ${missingReport.length - 10} more rows.`;
        }
        alert(finalMsg);
        fetchCustomers();
      } catch (error) {
        console.error("Error reading file", error);
        alert('Failed to parse file. Ensure it is a valid CSV or Excel file.');
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = ''; // reset
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="customers-page"
    >
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">{total} total customers</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <HiOutlineUpload size={18} />
            Import Data
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden onChange={handleImport} />
          </label>
          <Link href="/customers/new" className="btn btn-primary">
            <HiOutlinePlus size={18} />
            Add Customer
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar glass-card-static">
        <form onSubmit={handleSearch} className="search-form">
          <HiOutlineSearch size={18} className="search-icon" />
          <input
            type="text"
            className="input search-input"
            placeholder="Search by name, ID, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />
          <select 
            className="input search-input" 
            style={{ maxWidth: '180px', cursor: 'pointer' }}
            value={filterIncomplete ? 'true' : 'false'}
            onChange={e => setFilterIncomplete(e.target.value === 'true')}
          >
            <option value="false">All Customers</option>
            <option value="true">Incomplete Data</option>
          </select>
          <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />
          <select 
            className="input search-input" 
            style={{ maxWidth: '250px', cursor: 'pointer' }}
            value={selectedTemplateId}
            onChange={e => setSelectedTemplateId(e.target.value)}
          >
            <option value="">Auto-match by Plan Name</option>
            {templates.map(t => (
              <option key={t._id} value={t._id}>{t.name}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </form>
        {selectedCustomerIds.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '14px', color: 'var(--foreground-dim)' }}>
              {selectedCustomerIds.length} selected
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleBulkSendEmail} disabled={sendingEmail !== null}>
              <HiOutlineMail size={16} />
              {sendingEmail ? 'Sending...' : 'Send Email & PDF'}
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-container glass-card-static">
        {loading ? (
          <div className="table-loading">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 52, marginBottom: 8 }} />
            ))}
          </div>
        ) : customers.length === 0 ? (
          <div className="table-empty">
            <p>No customers found</p>
            <Link href="/customers/new" className="btn btn-primary btn-sm">
              Add your first customer
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={customers.length > 0 && customers.every(c => selectedCustomerIds.includes(c._id!))}
                      onChange={handleSelectAll}
                      className="checkbox"
                    />
                  </th>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                 {customers.map((customer, index) => {
                  const incompleteFields = getIncompleteFields(customer);
                  const isIncomplete = incompleteFields.length > 0;
                  const isSelected = selectedCustomerIds.includes(customer._id!);

                  // Determine background highlight
                  let rowBg = 'transparent';
                  if (isSelected) {
                    rowBg = 'rgba(13, 124, 62, 0.06)'; // Primary brand green tint
                  } else if (isIncomplete) {
                    rowBg = 'rgba(232, 116, 42, 0.03)'; // Subtle orange warning tint
                  }

                  return (
                    <motion.tr
                      key={customer._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      style={{ 
                        background: rowBg,
                        borderLeft: isIncomplete ? '3px solid var(--brand-secondary)' : 'none'
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(customer._id!)}
                          className="checkbox"
                        />
                      </td>
                      <td>
                        <span className="member-id">{customer.memberId}</span>
                      </td>
                      <td>
                        <div className="customer-name-cell">
                          <div className="customer-avatar" style={
                            isIncomplete ? { background: 'linear-gradient(135deg, var(--neutral-400), var(--neutral-600))' } : {}
                          }>
                            {customer.memberName ? customer.memberName.charAt(0) : '?'}
                          </div>
                          <div>
                            <div className="customer-name" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              {customer.memberName || 'Unknown'}
                              {isIncomplete && (
                                <span className="warning-indicator" title={`Incomplete: ${incompleteFields.join(', ')}`}>
                                  Incomplete
                                </span>
                              )}
                            </div>
                            <div className="customer-email" style={
                              (!customer.email || ['N/A', 'n/a', '', 'Pending', 'Pending KYC', 'Unknown'].includes(customer.email))
                                ? { color: 'var(--error)', fontStyle: 'italic', fontWeight: 500 }
                                : {}
                            }>
                              {customer.email}
                            </div>
                            {isIncomplete && (
                              <div className="incomplete-fields-list">
                                Missing: {incompleteFields.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={
                        (!customer.phone || ['N/A', 'n/a', '', 'Pending', 'Pending KYC', 'Unknown'].includes(customer.phone))
                          ? { color: 'var(--error)', fontStyle: 'italic', fontWeight: 500 }
                          : {}
                      }>
                        {customer.phone}
                      </td>
                      <td>
                        <span className="plan-badge">{customer.planName}</span>
                        {((!customer.planStart || ['2000-01-01', '1900-01-01', 'N/A', 'n/a', ''].includes(customer.planStart)) || 
                          (!customer.planEnd || ['2000-01-01', '1900-01-01', 'N/A', 'n/a', ''].includes(customer.planEnd))) && (
                            <div style={{ fontSize: '11px', color: 'var(--error)', marginTop: '4px', fontStyle: 'italic', fontWeight: 500 }}>
                              Missing Dates
                            </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            customer.status === 'active'
                              ? 'badge-success'
                              : customer.status === 'expired'
                              ? 'badge-error'
                              : 'badge-warning'
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button
                            className="btn btn-icon btn-ghost"
                            title="Preview PDF"
                            onClick={() => handlePreviewPDF(customer)}
                            disabled={previewingPdf === customer._id}
                          >
                            {previewingPdf === customer._id ? (
                              <div className="spinner-small" />
                            ) : (
                              <HiOutlineDocumentText size={16} />
                            )}
                          </button>
                          <button
                            className="btn btn-icon btn-ghost"
                            title="Send Email & PDF"
                            onClick={() => handleSendEmail(customer)}
                            disabled={sendingEmail === customer._id}
                          >
                            {sendingEmail === customer._id ? (
                              <div className="spinner-small" />
                            ) : (
                              <HiOutlineMail size={16} />
                            )}
                          </button>
                          <button
                            className="btn btn-icon btn-ghost"
                            title="View"
                            onClick={() => router.push(`/customers/${customer._id}`)}
                          >
                            <HiOutlineEye size={16} />
                          </button>
                          <button
                            className="btn btn-icon btn-ghost"
                            title="Edit"
                            onClick={() => router.push(`/customers/${customer._id}?edit=true`)}
                          >
                            <HiOutlinePencil size={16} />
                          </button>
                          <button
                            className="btn btn-icon btn-ghost"
                            title="Delete"
                            onClick={() => handleDelete(customer._id!)}
                            style={{ color: 'var(--error)' }}
                          >
                            <HiOutlineTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <HiOutlineChevronLeft size={16} />
              Previous
            </button>
            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
              <HiOutlineChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .customers-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .page-title {
          font-family: 'Outfit', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--foreground);
        }

        .page-subtitle {
          font-size: 14px;
          color: var(--foreground-dim);
          margin-top: 4px;
        }

        .search-bar {
          margin-bottom: 20px;
          padding: 12px 16px;
        }

        .search-form {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-icon {
          color: var(--foreground-dim);
          min-width: 18px;
        }

        .search-input {
          background: transparent;
          border: none;
          flex: 1;
        }

        .search-input:focus {
          box-shadow: none;
        }

        .table-container {
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .table-loading, .table-empty {
          padding: 40px;
          text-align: center;
          color: var(--foreground-dim);
        }

        .table-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .member-id {
          font-family: monospace;
          font-size: 13px;
          color: var(--brand-primary-light);
          background: rgba(13, 124, 62, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .customer-name-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .customer-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-primary-light));
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .customer-name {
          font-weight: 500;
          color: var(--foreground);
          font-size: 14px;
        }

        .customer-email {
          font-size: 12px;
          color: var(--foreground-dim);
        }

        .warning-indicator {
          font-size: 10px;
          background: rgba(245, 158, 11, 0.12);
          color: var(--brand-secondary-light);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .incomplete-fields-list {
          font-size: 11px;
          color: var(--brand-secondary-light);
          margin-top: 4px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .plan-badge {
          font-size: 12px;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          background: rgba(245, 166, 35, 0.12);
          color: var(--brand-accent);
          font-weight: 500;
        }

        .action-btns {
          display: flex;
          gap: 4px;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 16px;
          border-top: 1px solid var(--border);
        }

        .pagination-info {
          font-size: 13px;
          color: var(--foreground-dim);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner-small {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-top-color: var(--brand-primary);
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}
