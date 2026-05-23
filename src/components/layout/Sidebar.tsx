'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineTemplate,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCog,
  HiOutlineChevronLeft,
  HiOutlineShieldCheck,
} from 'react-icons/hi';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navItems = [
  { href: '/', label: 'Dashboard', icon: HiOutlineHome },
  { href: '/customers', label: 'Customers', icon: HiOutlineUsers },
  { href: '/templates', label: 'Templates', icon: HiOutlineTemplate },
  { href: '/generate', label: 'Generate PDF', icon: HiOutlineDocumentText },
  { href: '/history', label: 'PDF History', icon: HiOutlineClock },
  { href: '/settings', label: 'Settings', icon: HiOutlineCog },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}
      style={{ width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}
    >
      {/* Brand */}
      <div className="sidebar-brand">
        <img 
          src="/chatbot-icon.png" 
          alt="CureBharat" 
          style={{ 
            width: '36px', 
            height: '36px', 
            objectFit: 'contain', 
            flexShrink: 0,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }} 
        />
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="sidebar-brand-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="sidebar-brand-name">CureBharat</span>
              <span className="sidebar-brand-sub">CRM Platform</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              title={collapsed ? item.label : undefined}
              onClick={onMobileClose}
            >
              <span className="sidebar-link-icon">
                <Icon size={20} />
              </span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="sidebar-link-label"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  className="sidebar-link-indicator"
                  layoutId="sidebar-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={onToggle} title="Toggle sidebar">
        <HiOutlineChevronLeft
          size={18}
          style={{
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>
    </aside>
  );
}
