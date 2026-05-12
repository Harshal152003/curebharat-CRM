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
} from 'react-icons/hi';

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
              className="glass-card stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
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
  );
}
