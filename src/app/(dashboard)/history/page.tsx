'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineClock, HiOutlineDocumentText } from 'react-icons/hi';

interface PdfRecord {
  _id: string;
  customerName: string;
  templateName: string;
  fileName: string;
  fileSize: number;
  generatedAt: string;
}

export default function HistoryPage() {
  const [pdfs, setPdfs] = useState<PdfRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pdf/history').then(r => r.json()).then(d => {
      if (d.success) setPdfs(d.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: 'var(--foreground)' }}>PDF History</h1>
        <p style={{ fontSize: 14, color: 'var(--foreground-dim)', marginTop: 4 }}>All generated PDF documents</p>
      </div>

      <div className="glass-card-static" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 40 }}>
            {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 52, marginBottom: 8 }} />)}
          </div>
        ) : pdfs.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--foreground-dim)' }}>
            <HiOutlineClock size={40} style={{ margin: '0 auto 12px', display: 'block' }} />
            <p>No PDFs generated yet</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Template</th>
                <th>File</th>
                <th>Size</th>
                <th>Generated</th>
              </tr>
            </thead>
            <tbody>
              {pdfs.map((pdf, i) => (
                <motion.tr
                  key={pdf._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 600 }}>
                        {pdf.customerName.charAt(0)}
                      </div>
                      {pdf.customerName}
                    </div>
                  </td>
                  <td><span className="badge badge-info">{pdf.templateName}</span></td>
                  <td style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <HiOutlineDocumentText size={16} style={{ color: 'var(--brand-secondary)' }} />
                    <span style={{ fontSize: 13 }}>{pdf.fileName}</span>
                  </td>
                  <td>{(pdf.fileSize / 1024).toFixed(1)} KB</td>
                  <td style={{ fontSize: 13, color: 'var(--foreground-dim)' }}>
                    {new Date(pdf.generatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
