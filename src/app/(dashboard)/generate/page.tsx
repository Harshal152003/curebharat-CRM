'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDocumentDownload, HiOutlineUsers, HiOutlineTemplate } from 'react-icons/hi';

interface SelectItem { _id: string; name: string; }

export default function GeneratePage() {
  const [customers, setCustomers] = useState<SelectItem[]>([]);
  const [templates, setTemplates] = useState<SelectItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [canSendEmail, setCanSendEmail] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetch('/api/customers?limit=1000').then(r => r.json()).then(d => {
      if (d.success) setCustomers(d.data.map((c: Record<string, string>) => ({ _id: c._id, name: c.memberName })));
    });
    fetch('/api/templates').then(r => r.json()).then(d => {
      if (d.success) setTemplates(d.data.map((t: Record<string, string>) => ({ _id: t._id, name: t.name })));
    });
  }, []);

  const handleGenerate = async () => {
    if (!selectedCustomer || !selectedTemplate) {
      setError('Please select both a customer and a template');
      return;
    }
    setGenerating(true);
    setError('');
    setSuccess('');
    setCanSendEmail(false);

    try {
      const res = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: selectedCustomer, templateId: selectedTemplate }),
      });

      if (res.ok && res.headers.get('Content-Type')?.includes('application/pdf')) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = res.headers.get('Content-Disposition')?.split('filename="')[1]?.replace('"', '') || 'document.pdf';
        a.click();
        URL.revokeObjectURL(url);
        setSuccess('PDF generated and downloaded successfully!');
        setCanSendEmail(true);
      } else {
        const data = await res.json();
        setError(data.error || 'PDF generation failed');
      }
    } catch (err) {
      setError('Failed to generate PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setGenerating(false);
  };

  const handleSendEmail = async () => {
    if (!selectedCustomer || !selectedTemplate) return;
    setSendingEmail(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/pdf/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: selectedCustomer, templateId: selectedTemplate })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('PDF successfully sent to customer\'s email!');
        setCanSendEmail(false); // Hide the button after successful sending
      } else {
        setError(data.error || 'Failed to send email');
      }
    } catch (err) {
      setError('Failed to send email: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: 'var(--foreground)' }}>Generate PDF</h1>
        <p style={{ fontSize: 14, color: 'var(--foreground-dim)', marginTop: 4 }}>
          Select a customer and template to generate a branded PDF document
        </p>
      </div>

      <div className="glass-card-static" style={{ padding: 32 }}>
        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#f87171', fontSize: 14, marginBottom: 20 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ padding: '12px 16px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, color: '#34d399', fontSize: 14, marginBottom: 20 }}>
            {success}
          </div>
        )}

        {/* Customer Selection */}
        <div style={{ marginBottom: 24 }}>
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <HiOutlineUsers size={14} /> Select Customer
          </label>
          <select className="input" value={selectedCustomer} onChange={(e) => { setSelectedCustomer(e.target.value); setCanSendEmail(false); }}>
            <option value="">— Choose a customer —</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Template Selection */}
        <div style={{ marginBottom: 32 }}>
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <HiOutlineTemplate size={14} /> Select Template
          </label>
          <select className="input" value={selectedTemplate} onChange={(e) => { setSelectedTemplate(e.target.value); setCanSendEmail(false); }}>
            <option value="">— Choose a template —</option>
            {templates.map((t) => (
              <option key={t._id} value={t._id}>{t.name}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleGenerate} disabled={generating}>
          {generating ? (
            <>
              <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
              Generating PDF...
            </>
          ) : (
            <>
              <HiOutlineDocumentDownload size={20} />
              Generate & Download PDF
            </>
          )}
        </button>

        {canSendEmail && (
          <button
            className="btn btn-secondary btn-lg"
            style={{
              width: '100%',
              marginTop: 16,
              background: 'linear-gradient(135deg, #0B5D2A, #2F6B3C)',
              borderColor: '#0B5D2A',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            onClick={handleSendEmail}
            disabled={sendingEmail}
          >
            {sendingEmail ? (
              <>
                <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
                Sending Email to Customer...
              </>
            ) : (
              <>
                <HiOutlineDocumentDownload size={20} style={{ transform: 'rotate(180deg)' }} />
                Send Generated PDF to Customer Email
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
