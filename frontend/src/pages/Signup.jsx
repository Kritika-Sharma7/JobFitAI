import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Sparkles, ArrowRight, AlertCircle, Check } from "lucide-react";
import useAuthStore from "../store/authStore";
import { ThreeBackground } from "../components/ui";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loading, error, isAuthenticated, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/analyze");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-accent-cyan' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  const features = [
    "AI-powered resume analysis",
    "Smart job matching",
    "Personalized skill roadmaps",
    "Unlimited job tracking"
  ];

  const inputClasses = (field) => `w-full px-4 py-3.5 pl-12 rounded-xl bg-dark-800/50 border text-white placeholder-dark-400 focus:outline-none transition-all ${
    focused === field 
      ? 'border-accent-purple/50 ring-2 ring-accent-purple/20' 
      : 'border-white/10 hover:border-white/20'
  }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground variant="auth" />

      <div className="w-full max-w-5xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/20 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Start for free
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Land your dream job with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
              AI-powered insights
            </span>
          </h1>
          
          <p className="text-dark-300 text-lg mb-8">
            Join thousands of job seekers who've boosted their interview rates by 3x using JobFit AI.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent-cyan" />
                </div>
                <span className="text-dark-200">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 p-6 glass-card"
          >
            <p className="text-dark-200 italic mb-4">
              "JobFit AI helped me identify exactly what was missing from my resume. I landed 4 interviews in my first week!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold">
                S
              </div>
              <div>
                <p className="text-white font-medium text-sm">Sarah K.</p>
                <p className="text-dark-400 text-xs">Software Engineer at Google</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo/Brand for mobile */}
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-cyan mb-4 shadow-lg shadow-accent-purple/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Card */}
          <div className="glass-card p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
              <p className="text-dark-400 text-sm">Start your free trial today</p>
            </div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-200">
                  Full name
                </label>
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 ${
                    focused === 'name' ? 'text-accent-purple' : 'text-dark-400'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearError();
                    }}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                    className={inputClasses('name')}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-200">
                  Email address
                </label>
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 ${
                    focused === 'email' ? 'text-accent-purple' : 'text-dark-400'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    className={inputClasses('email')}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-200">
                  Password
                </label>
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 ${
                    focused === 'password' ? 'text-accent-purple' : 'text-dark-400'
                  }`}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError();
                    }}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    placeholder="Minimum 6 characters"
                    className={inputClasses('password')}
                  />
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            level <= passwordStrength.score
                              ? passwordStrength.color
                              : 'bg-dark-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${
                      passwordStrength.score <= 2 ? 'text-red-400' :
                      passwordStrength.score <= 3 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {passwordStrength.label} password
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-dark-400">
                By signing up, you agree to our{" "}
                <a href="#" className="text-accent-purple hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-accent-purple hover:underline">Privacy Policy</a>
              </p>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-cyan shadow-lg shadow-accent-purple/25 hover:shadow-accent-purple/40 transition-all ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Get started free</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-dark-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              onClick={clearError}
              className="text-accent-purple hover:text-accent-cyan transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
