// src/pages/Home.jsx - Premium Landing Page with Three.js
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Target, 
  TrendingUp, 
  ArrowRight,
  Play,
  Star,
  Sparkles,
  Zap,
  Brain,
  FileCheck,
  Users
} from 'lucide-react';
import { ThreeBackground } from '../components/ui';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

function Home() {
  const features = [
    {
      icon: Shield,
      title: 'ATS Score Analysis',
      description: 'Ensure your resume passes automated filters with our AI-powered ATS compatibility scoring.'
    },
    {
      icon: Target,
      title: 'Resume vs Job Description',
      description: 'See how well you align with any role. Get instant match scores and detailed breakdowns.'
    },
    {
      icon: TrendingUp,
      title: 'Skill Gap Insights',
      description: 'Discover which skills and experiences you need to become the perfect candidate.'
    }
  ];

  const stats = [
    { value: '98%', label: 'Accuracy Rate' },
    { value: '<3s', label: 'Analysis Time' },
    { value: '50K+', label: 'Resumes Analyzed' },
    { value: '4.9', label: 'User Rating', hasStar: true }
  ];

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground variant="landing" />
      
      {/* Additional gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900 pointer-events-none" />
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-accent-purple/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-medium text-gray-300">AI-Powered Career Intelligence</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
            >
              <span className="text-white">Optimize Your Resume</span>
              <br />
              <span className="text-white">for Every Job — </span>
              <span className="gradient-text">Instantly</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              AI-powered resume scoring, and skill gap insights tailored to any role. 
              Land more interviews with data-driven optimization.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                to="/signup"
                className="group btn-primary text-lg px-8 py-4 flex items-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>View Demo</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</span>
                    {stat.hasStar && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                  </div>
                  <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative mt-20 max-w-5xl mx-auto"
          >
            {/* Glow behind mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/30 to-accent-cyan/30 rounded-3xl blur-3xl transform scale-95" />
            
            {/* Mockup container */}
            <div className="relative glass-card rounded-2xl p-2 shadow-2xl">
              <div className="rounded-xl overflow-hidden bg-dark-800">
                {/* Browser-like header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-dark-900/50 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1.5 rounded-lg bg-dark-700/50 text-xs text-gray-400">
                      app.jobfitai.com/dashboard
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Preview */}
                <div className="p-6 space-y-4">
                  {/* Insight Banner */}
                  <div className="insight-banner flex items-center gap-4">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <p className="text-white font-semibold">Your best match improved by <span className="text-green-400">+12%</span> this week</p>
                      <p className="text-sm text-gray-400">Keep optimizing to reach 90%+</p>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { value: '1,245', label: 'Resumes analyzed', change: '+3%' },
                      { value: '890', label: 'JDs analyzed', change: '+3%' },
                      { value: '78%', label: 'Average match %', change: '+3%' },
                      { value: '92%', label: 'Best match %', change: '' }
                    ].map((stat, idx) => (
                      <div key={idx} className="stat-card text-center">
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                        {stat.change && (
                          <p className="text-xs text-green-400 mt-1">↑ {stat.change} this week</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white">Match Progress</h3>
                        <p className="text-xs text-gray-500">Match Score Trends</p>
                      </div>
                    </div>
                    {/* Simplified chart visualization */}
                    <div className="h-32 flex items-end gap-1">
                      {[40, 45, 50, 55, 65, 60, 70, 75, 72, 80, 78, 85].map((h, i) => (
                        <div 
                          key={i}
                          className="flex-1 bg-gradient-to-t from-accent-purple to-accent-cyan rounded-t opacity-60"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI analyzes your resume against real job requirements, giving you actionable insights to improve your chances.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="feature-card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-accent-purple" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-10 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl text-white font-medium mb-6 leading-relaxed">
              "JobfitAI helped me identify exactly what I was missing. I landed 3 interviews in two weeks!"
            </blockquote>
            <div>
              <p className="font-semibold text-white">Sarah Chen</p>
              <p className="text-sm text-gray-500">Software Engineer @ Google</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to land your dream job?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Join thousands of job seekers who've improved their match scores and landed more interviews.
              </p>
              <Link
                to="/signup"
                className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
              >
                <span>Sign Up Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">JobfitAI</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2026 JobfitAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;