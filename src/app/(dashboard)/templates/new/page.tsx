'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi';

export default function NewTemplatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'wellness',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          createdBy: 'admin',
          pages: [{
            pageIndex: 0, pageType: 'cover', title: 'Cover Page',
            background: { type: 'color', value: '#ffffff' },
            watermark: { enabled: false, type: 'text', value: '', opacity: 0.1 },
            header: { enabled: true, height: '80px', companyName: 'CureBharat', backgroundColor: '#ffffff', textColor: '#333' },
            footer: { enabled: true, height: '60px', showPageNumbers: true, backgroundColor: '#1a5c2e', textColor: '#fff' },
            sections: [], showGlobalHeader: true, showGlobalFooter: true, showGlobalWatermark: true,
          }],
          pageCount: 1,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/templates/${data.data._id}/designer`);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button className="btn btn-ghost btn-icon" onClick={() => router.back()}>
          <HiOutlineArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 700, color: 'var(--foreground)' }}>Create Template</h1>
          <p style={{ fontSize: 14, color: 'var(--foreground-dim)' }}>Set up a new PDF template</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="glass-card-static" style={{ padding: 32 }}>
        <div style={{ marginBottom: 20 }}>
          <label className="input-label">Template Name <span style={{ color: 'var(--error)' }}>*</span></label>
          <input className="input" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="CureBharat Wellness Gold" required />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="input-label">Description</label>
          <textarea className="input" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="Premium wellness membership certificate..." />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label className="input-label">Category</label>
          <select className="input" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
            <option value="wellness">Wellness</option>
            <option value="insurance">Insurance</option>
            <option value="certificate">Certificate</option>
            <option value="policy">Policy</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" className="btn btn-ghost" onClick={() => router.back()}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <HiOutlineCheck size={18} /> {loading ? 'Creating...' : 'Create & Design'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
