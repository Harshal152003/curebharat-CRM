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
} from 'react-icons/hi';
import { ICustomer } from '@/types';

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
   const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
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
      setSelectedCustomerIds([]); // Clear selection on fetch
    }
  }, [page, search]);

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

  const handleSendEmail = async (customer: ICustomer) => {
    if (!templates.length) {
      alert('No templates available to send');
      return;
    }

    setSendingEmail(customer._id!);
    try {
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
    if (e.target.checked) {
      setSelectedCustomerIds(customers.map(c => c._id!));
    } else {
      setSelectedCustomerIds([]);
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
      const text = evt.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim() !== '');
      if (lines.length < 2) return alert('Invalid or empty CSV file');

      // simple CSV parser regex
      const parseCsvLine = (line: string) => {
        return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      };

      const headers = parseCsvLine(lines[0]);

      let successCount = 0;
      let failCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        if (values.length !== headers.length) continue;
        
        const customerData: any = {};
        headers.forEach((h, index) => {
          customerData[h] = values[index];
        });

        // Set default values if missing
        customerData.status = customerData.status || 'active';
        customerData.memberId = customerData.memberId || `CB-IMP-${Date.now()}-${i}`;
        customerData.gender = customerData.gender || 'Male';

        // Clean up numeric fields (like coveragePrice) if they contain formatting like $ or commas
        if (customerData.coveragePrice) {
          customerData.coveragePrice = customerData.coveragePrice.toString().replace(/[^0-9.]/g, '');
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
          if (res.ok) successCount++;
          else failCount++;
        } catch(e) {
          failCount++;
        }
      }
      alert(`Import complete. Success: ${successCount}, Failed: ${failCount}`);
      fetchCustomers();
    };
    reader.readAsText(file);
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
            Import CSV
            <input type="file" accept=".csv" hidden onChange={handleImport} />
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
                      checked={customers.length > 0 && selectedCustomerIds.length === customers.length}
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
                {customers.map((customer, index) => (
                  <motion.tr
                    key={customer._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ background: selectedCustomerIds.includes(customer._id!) ? 'rgba(var(--brand-primary-rgb), 0.05)' : 'transparent' }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCustomerIds.includes(customer._id!)}
                        onChange={() => handleSelectOne(customer._id!)}
                        className="checkbox"
                      />
                    </td>
                    <td>
                      <span className="member-id">{customer.memberId}</span>
                    </td>
                    <td>
                      <div className="customer-name-cell">
                        <div className="customer-avatar">
                          {customer.memberName.charAt(0)}
                        </div>
                        <div>
                          <div className="customer-name">{customer.memberName}</div>
                          <div className="customer-email">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{customer.phone}</td>
                    <td>
                      <span className="plan-badge">{customer.planName}</span>
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
                ))}
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
