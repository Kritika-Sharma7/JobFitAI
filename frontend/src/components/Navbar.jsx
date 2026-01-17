// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, LogOut, Menu, X } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuthStore();

  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/analyze", label: "Analyze" },
    { path: "/dashboard", label: "Dashboard" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "glass-card !rounded-none border-t-0 border-x-0"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-xl blur-md opacity-75" />
                <div className="relative bg-gradient-to-br from-accent-purple to-accent-cyan rounded-xl p-2.5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <div className="font-black text-xl bg-gradient-to-r from-white to-dark-300 bg-clip-text text-transparent">
                  JobFit AI
                </div>
                <div className="text-xs text-dark-500 font-medium">
                  Career Intelligence
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-5 py-2 rounded-xl font-semibold text-sm transition-all ${
                      isActive
                        ? "text-white"
                        : "text-dark-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" 
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:block text-sm font-semibold text-dark-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                             bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-white/5"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-card !rounded-none border-x-0 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      location.pathname === link.path
                        ? "bg-white/5 text-white"
                        : "text-dark-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-semibold text-dark-400 hover:text-white hover:bg-white/5"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Logout Confirm Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-6 w-full max-w-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white text-lg font-bold text-center mb-2">
                Confirm Logout
              </h3>
              <p className="text-dark-400 text-sm text-center mb-6">
                Are you sure you want to log out of your account?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
