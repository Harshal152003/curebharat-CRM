'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <div 
        className={`sidebar-overlay ${mobileOpen ? 'mobile-open' : ''}`} 
        onClick={() => setMobileOpen(false)} 
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div
        className="dashboard-main"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        }}
      >
        <Topbar 
          sidebarCollapsed={sidebarCollapsed} 
          onMobileToggle={() => setMobileOpen(true)} 
        />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}
