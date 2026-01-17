// AppLayout Component - Main layout wrapper with sidebar and top navigation
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { ParticleField } from '../ui';

export default function AppLayout({ children }) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Pages that should show the full app layout with sidebar
  const appPages = ['/dashboard', '/analyze', '/analysis', '/insights', '/settings', '/history'];
  const showAppLayout = appPages.some(page => location.pathname.startsWith(page));

  // Public pages (landing, login, signup)
  if (!showAppLayout) {
    return (
      <div className="min-h-screen bg-dark-900">
        <TopNav showSidebar={false} />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 bg-mesh">
      {/* Background effects */}
      <div className="fixed inset-0 bg-dots pointer-events-none opacity-30" />
      <ParticleField count={30} color="violet" className="opacity-30" />

      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Top Navigation */}
      <TopNav showSidebar={true} sidebarCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <main
        className={`
          min-h-screen pt-[72px] transition-all duration-300
          ${sidebarCollapsed ? 'pl-[72px]' : 'pl-[260px]'}
        `}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
