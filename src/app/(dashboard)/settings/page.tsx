'use client';

import { motion } from 'framer-motion';
import { HiOutlineCog } from 'react-icons/hi';

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 700, color: 'var(--foreground)' }}>Settings</h1>
        <p style={{ fontSize: 14, color: 'var(--foreground-dim)', marginTop: 4 }}>Platform configuration</p>
      </div>
      <div className="glass-card-static" style={{ padding: 60, textAlign: 'center' }}>
        <HiOutlineCog size={48} style={{ color: 'var(--foreground-dim)', margin: '0 auto 16px', display: 'block' }} />
        <p style={{ color: 'var(--foreground-dim)' }}>Settings module coming soon</p>
      </div>
    </motion.div>
  );
}
