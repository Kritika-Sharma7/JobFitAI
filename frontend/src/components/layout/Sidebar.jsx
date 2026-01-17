// Sidebar Component - Premium floating glass sidebar with elegant navigation
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  PlusCircle,
  FileSearch,
  Lightbulb,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Target
} from 'lucide-react';

const navItems = [
  { 
    section: 'ACTIVE',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/analyze', label: 'New Analysis', icon: PlusCircle, badge: 'New' },
    ]
  },
  {
    section: null,
    items: [
      { path: '/history', label: 'History', icon: FileSearch },
      { path: '/insights', label: 'Insights', icon: Lightbulb },
      { path: '/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function Sidebar({ collapsed = false, onToggle }) {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`
        fixed left-0 top-0 h-screen z-40
        glass-sidebar
        flex flex-col
        transition-all duration-300 ease-out
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
    >
      {/* Logo Section */}
      <div className="p-6 pb-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            {/* Logo icon */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold text-white">JobfitAI</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto hide-scrollbar">
        {navItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {/* Section Label */}
            <AnimatePresence>
              {section.section && !collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 mb-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {section.section}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Nav Items */}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        sidebar-item relative group
                        ${isActive ? 'active' : ''}
                        ${collapsed ? 'justify-center px-0' : ''}
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-accent-purple to-accent-cyan"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Icon */}
                      <div className={`
                        relative z-10 flex items-center justify-center
                        ${collapsed ? 'w-10 h-10' : ''}
                      `}>
                        <Icon className={`
                          w-5 h-5 transition-colors duration-200
                          ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                        `} />
                      </div>

                      {/* Label */}
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`
                              relative z-10 font-medium text-sm
                              ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                            `}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Badge */}
                      {item.badge && !collapsed && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto sidebar-badge"
                        >
                          {item.badge}
                        </motion.span>
                      )}

                      {/* Hover background */}
                      <div className={`
                        absolute inset-0 rounded-xl
                        bg-white/0 group-hover:bg-white/5
                        transition-colors duration-200
                        ${isActive ? 'bg-white/10' : ''}
                      `} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/5">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass-light rounded-xl p-4 mb-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-accent-purple" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Free plan</p>
                  <p className="text-[10px] text-gray-500">3/5 analyses used</p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
