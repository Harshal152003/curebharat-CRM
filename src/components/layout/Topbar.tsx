'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineBell, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMobileToggle?: () => void;
}

export default function Topbar({ sidebarCollapsed, onMobileToggle }: TopbarProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

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
        <button className="topbar-icon-btn" title="Notifications">
          <HiOutlineBell size={20} />
          <span className="topbar-badge">3</span>
        </button>

        {/* User Menu */}
        <div className="topbar-user-menu">
          <button
            className="topbar-avatar-btn"
            onClick={() => setShowMenu(!showMenu)}
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
