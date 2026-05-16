'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUsers,
  HiOutlineTemplate,
  HiOutlineDocumentText,
  HiOutlineTrendingUp,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineX,
} from 'react-icons/hi';
import { AnimatePresence } from 'framer-motion';

interface DashboardStats {
  totalCustomers: number;
  totalTemplates: number;
  totalPdfs: number;
  activeCustomers: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalTemplates: 0,
    totalPdfs: 0,
    activeCustomers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Customers',
      value: stats.totalCustomers,
      icon: HiOutlineUsers,
      gradient: 'linear-gradient(135deg, #0d7c3e, #12a150)',
      shadow: '0 4px 20px rgba(13, 124, 62, 0.25)',
      change: '+12%',
    },
    {
      label: 'Templates',
      value: stats.totalTemplates,
      icon: HiOutlineTemplate,
      gradient: 'linear-gradient(135deg, #e8742a, #f09454)',
      shadow: '0 4px 20px rgba(232, 116, 42, 0.25)',
      change: '+3',
    },
    {
      label: 'Generated PDFs',
      value: stats.totalPdfs,
      icon: HiOutlineDocumentText,
      gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
      shadow: '0 4px 20px rgba(59, 130, 246, 0.25)',
      change: '+24',
    },
    {
      label: 'Active Members',
      value: stats.activeCustomers,
      icon: HiOutlineTrendingUp,
      gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      shadow: '0 4px 20px rgba(139, 92, 246, 0.25)',
      change: '+8%',
    },
  ];

  const recentActivities = [
    { text: 'PDF generated for Rajesh Kumar', time: '2 min ago', type: 'pdf' },
    { text: 'New customer added: Priya Sharma', time: '15 min ago', type: 'customer' },
    { text: 'Template "Wellness Gold" updated', time: '1 hour ago', type: 'template' },
    { text: 'PDF generated for Amit Patel', time: '2 hours ago', type: 'pdf' },
    { text: 'New template "Insurance Plus" created', time: '3 hours ago', type: 'template' },
  ];

  return (
    <>
    <motion.div
      className="dashboard-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div className="page-header" variants={itemVariants}>
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Overview of your CRM platform activity
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className="stats-grid" variants={itemVariants}>
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              className="glass-card stat-card cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => {
                setSelectedStat(card);
                setIsModalOpen(true);
              }}
            >
              <div className="stat-card-header">
                <div
                  className="stat-icon"
                  style={{ background: card.gradient, boxShadow: card.shadow }}
                >
                  <Icon size={22} />
                </div>
                <span className="stat-change text-success bg-success/10 px-2 py-1 rounded-full font-medium">{card.change}</span>
              </div>
              <div className="stat-value">
                {loading ? (
                  <div className="skeleton" style={{ width: '60px', height: '32px' }} />
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={card.value}
                  >
                    {card.value.toLocaleString()}
                  </motion.span>
                )}
              </div>
              <div className="stat-label">{card.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Recent Activity */}
        <motion.div className="glass-card-static flex flex-col" variants={itemVariants}>
          <div className="card-header">
            <HiOutlineClock size={20} />
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div
                  className="activity-dot"
                  style={{
                    background:
                      activity.type === 'pdf'
                        ? 'var(--info)'
                        : activity.type === 'customer'
                        ? 'var(--success)'
                        : 'var(--brand-secondary)',
                  }}
                />
                <div className="activity-content">
                  <p className="activity-text">{activity.text}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="glass-card-static flex flex-col" variants={itemVariants}>
          <div className="card-header">
            <HiOutlineChartBar size={20} />
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <a href="/customers/new" className="quick-action-btn">
              <HiOutlineUsers size={20} />
              <span>Add Customer</span>
            </a>
            <a href="/templates/new" className="quick-action-btn">
              <HiOutlineTemplate size={20} />
              <span>Create Template</span>
            </a>
            <a href="/generate" className="quick-action-btn">
              <HiOutlineDocumentText size={20} />
              <span>Generate PDF</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
    
    {/* Stat Detail Modal - MOVED OUTSIDE ANIMATED CONTAINER & FORCED WITH INLINE STYLES */}
    <AnimatePresence>
      {isModalOpen && selectedStat && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', pointerEvents: 'auto' }}
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-content"
            style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto', background: 'white', borderRadius: '24px', width: '100%', maxWidth: '600px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
          >
            <div 
              className="modal-header"
              style={{ padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: selectedStat.gradient, color: 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                  <selectedStat.icon size={28} />
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>{selectedStat.label}</h2>
                  <p style={{ opacity: 0.8, fontSize: '12px', margin: 0 }}>CureBharat Intelligence Overview</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: 'white' }}
              >
                <HiOutlineX size={24} />
              </button>
            </div>
            
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Count</span>
                  <div style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a' }}>{selectedStat.value}</div>
                </div>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Growth</span>
                  <div style={{ fontSize: '36px', fontWeight: '900', color: '#10b981' }}>{selectedStat.change}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HiOutlineChartBar size={16} />
                Activity Timeline
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'white', borderRadius: '15px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(13, 124, 62, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d7c3e', fontWeight: '800' }}>{i}</div>
                      <div>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>Automated Audit Check {i}</p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Sync ID: #9822{i} • Verified 10:30 AM</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>SUCCESS</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', padding: '12px 30px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                >
                  Close Overview
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
