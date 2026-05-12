'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineTemplate,
} from 'react-icons/hi';

interface TemplateItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  pageCount: number;
  createdAt: string;
}

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (data.success) setTemplates(data.data);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this template?')) return;
    await fetch(`/api/templates/${id}`, { method: 'DELETE' });
    fetchTemplates();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="templates-page">
      <div className="page-header-row">
        <div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: 'var(--foreground)' }}>
            Templates
          </h1>
          <p style={{ fontSize: 14, color: 'var(--foreground-dim)', marginTop: 4 }}>
            Manage your PDF templates
          </p>
        </div>
        <Link href="/templates/new" className="btn btn-primary">
          <HiOutlinePlus size={18} />
          New Template
        </Link>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: 200, borderRadius: 16 }} />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="glass-card-static" style={{ padding: 60, textAlign: 'center' }}>
          <HiOutlineTemplate size={48} style={{ color: 'var(--foreground-dim)', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--foreground-dim)', marginBottom: 16 }}>No templates yet</p>
          <Link href="/templates/new" className="btn btn-primary">Create Your First Template</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {templates.map((t, i) => (
            <motion.div
              key={t._id}
              className="glass-card"
              style={{ padding: 24, cursor: 'pointer' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => router.push(`/templates/${t._id}/designer`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}>
                  <HiOutlineTemplate size={24} />
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn btn-icon btn-ghost" onClick={(e) => { e.stopPropagation(); router.push(`/templates/${t._id}/designer`); }}>
                    <HiOutlinePencil size={16} />
                  </button>
                  <button className="btn btn-icon btn-ghost" style={{ color: 'var(--error)' }} onClick={(e) => { e.stopPropagation(); handleDelete(t._id); }}>
                    <HiOutlineTrash size={16} />
                  </button>
                </div>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', marginBottom: 4 }}>{t.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--foreground-dim)', marginBottom: 12 }} className="line-clamp-2">
                {t.description || 'No description'}
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-info">{t.category}</span>
                <span className="badge badge-success">{t.pageCount} pages</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style jsx>{`
        .templates-page { max-width: 1400px; margin: 0 auto; }
        .page-header-row {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
        }
      `}</style>
    </motion.div>
  );
}
