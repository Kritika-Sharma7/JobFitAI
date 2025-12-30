// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuthStore();

  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  /* =====================
     SCROLL EFFECT
  ===================== */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =====================
     LOGOUT HANDLERS
  ===================== */
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
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "glass-heavy shadow-2xl"
            : "backdrop-blur-xl bg-black/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/" className="group flex items-center gap-3 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur-md opacity-75 pointer-events-none" />
                <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl p-2.5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <div className="font-black text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  JobFit AI
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Career Intelligence
                </div>
              </div>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 glass-light rounded-lg border border-white/10 pointer-events-none" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* AUTH ACTIONS */}
            <div className="flex items-center gap-3">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-5 py-2.5 rounded-xl font-bold text-sm
                               bg-gradient-to-r from-violet-600 to-fuchsia-600
                               text-white shadow-lg shadow-violet-500/25"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <button
                  onClick={handleLogoutClick}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm
                             bg-red-600 hover:bg-red-500
                             text-white shadow-lg shadow-red-500/30"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      </nav>

      {/* ================= LOGOUT CONFIRM MODAL ================= */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
          <div className="bg-slate-900 rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl">
            <h3 className="text-white text-lg font-bold mb-2">
              Confirm logout
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
