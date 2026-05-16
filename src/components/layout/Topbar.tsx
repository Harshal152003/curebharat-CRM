'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineBell, HiOutlineLogout, HiOutlineUser, HiOutlineMail, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi';

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMobileToggle?: () => void;
}

export default function Topbar({ sidebarCollapsed, onMobileToggle }: TopbarProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const staticNotifications = [
    { id: 1, title: 'New Customer Added', message: 'Rajesh Kumar was added successfully.', time: '2 mins ago', icon: HiOutlineUser, color: 'text-brand' },
    { id: 2, title: 'PDF Generated', message: 'Certificate for Amit Patel is ready.', time: '1 hour ago', icon: HiOutlineCheckCircle, color: 'text-success' },
    { id: 3, title: 'System Update', message: 'v1.2 release is now live.', time: '3 hours ago', icon: HiOutlineClock, color: 'text-info' },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <header
      className="topbar"
      style={{
        left: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
      }}
    >
      <div className="topbar-left">
        <button className="topbar-mobile-toggle" onClick={onMobileToggle} title="Open Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="topbar-greeting">
          Welcome back, <span className="topbar-name">Admin</span>
        </h2>
      </div>

      <div className="topbar-right">
        {/* Notifications */}
        <div className="topbar-user-menu">
          <button 
            className="topbar-icon-btn" 
            title="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMenu(false);
            }}
          >
            <HiOutlineBell size={20} />
            <span className="topbar-badge">3</span>
          </button>

          {showNotifications && (
            <div 
              className="topbar-dropdown glass-card-static notifications-dropdown"
              style={{ position: 'absolute', top: 'calc(100% + 15px)', right: '-10px', width: '350px', zIndex: 9999, background: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', overflow: 'hidden', border: '1px solid #f1f5f9' }}
            >
              <div style={{ padding: '15px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '14px' }}>Notifications</span>
                <span style={{ fontSize: '10px', background: '#0d7c3e', color: 'white', padding: '2px 8px', borderRadius: '20px', fontWeight: '800' }}>3 NEW</span>
              </div>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {staticNotifications.map((n) => (
                  <div key={n.id} style={{ padding: '15px 20px', borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div className={n.color} style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <n.icon size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.2' }}>{n.title}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>{n.message}</p>
                        <p style={{ margin: '8px 0 0', fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                          <HiOutlineClock size={10} />
                          {n.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px', textAlign: 'center', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                <button style={{ background: 'none', border: 'none', color: '#0d7c3e', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>View All System Activity</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="topbar-user-menu">
          <button
            className="topbar-avatar-btn"
            onClick={() => {
              setShowMenu(!showMenu);
              setShowNotifications(false);
            }}
          >
            <div className="topbar-avatar">
              <HiOutlineUser size={18} />
            </div>
            <span className="topbar-user-name">Admin</span>
          </button>

          {showMenu && (
            <div className="topbar-dropdown glass-card-static">
              <button className="topbar-dropdown-item" onClick={handleLogout}>
                <HiOutlineLogout size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
