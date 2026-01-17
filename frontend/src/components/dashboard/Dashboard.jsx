// Dashboard Component - Premium AI-first Dashboard with glassmorphism design
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  Target, 
  Award,
  ArrowUpRight,
  Rocket,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import ProgressChart from "./ProgressChart";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Dashboard({ data }) {
  if (!data) return <DashboardSkeleton />;

  const {
    totalResumes,
    totalJDs,
    avgMatch,
    bestMatch,
    recentJDs,
    resumeVersions
  } = data;

  const improvement = Math.max(0, bestMatch - avgMatch);

  const stats = [
    { 
      label: 'Resumes analyzed', 
      value: totalResumes?.toLocaleString() || '0', 
      change: '+3%',
      trend: 'up',
      icon: FileText 
    },
    { 
      label: 'JDs analyzed', 
      value: totalJDs?.toLocaleString() || '0', 
      change: '+3%',
      trend: 'up',
      icon: Target 
    },
    { 
      label: 'Average match %', 
      value: `${avgMatch || 0}%`, 
      change: '+3%',
      trend: 'up',
      icon: TrendingUp 
    },
    { 
      label: 'Best match %', 
      value: `${bestMatch || 0}%`, 
      change: '',
      trend: null,
      icon: Award 
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Insight Banner */}
      <motion.div variants={fadeInUp} className="insight-banner">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center flex-shrink-0">
            <Rocket className="w-6 h-6 text-accent-purple" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Your best match improved by{' '}
              <span className="text-green-400">+{improvement}%</span>{' '}
              this week
            </h2>
            <p className="text-gray-400 mt-1">
              Keep optimizing ATS keywords to convert more roles into{' '}
              <span className="text-green-400 font-semibold">Strong Match</span>.
            </p>
          </div>
          <Link to="/insights" className="hidden md:flex items-center gap-2 btn-primary text-sm">
            <span>View Details</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={fadeInUp}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} delay={idx * 0.1} />
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Match Progress Chart */}
        <motion.div 
          variants={fadeInUp}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Match Progress</h3>
              <p className="text-sm text-gray-500">Match Score Trends</p>
            </div>
            <select className="glass-input text-sm py-2 px-3 rounded-lg">
              <option>Last 4 weeks</option>
              <option>Last 3 months</option>
              <option>All time</option>
            </select>
          </div>
          
          <ProgressChart recentJDMatches={recentJDs} />
        </motion.div>

        {/* Recent Matches */}
        <motion.div 
          variants={fadeInUp}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Matches</h3>
            <button className="text-accent-purple text-sm hover:underline">View all</button>
          </div>
          
          <div className="space-y-4">
            {recentJDs && recentJDs.length > 0 ? (
              recentJDs.slice(0, 4).map((jd, idx) => (
                <RecentMatchCard key={jd._id || idx} jd={jd} />
              ))
            ) : (
              <div className="text-center py-8">
                <Sparkles className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent matches yet</p>
                <p className="text-gray-600 text-xs mt-1">Start analyzing to see results</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Resume Versions */}
      <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Resume Versions</h3>
            <p className="text-sm text-gray-500">Track your resume improvements</p>
          </div>
        </div>

        {resumeVersions && resumeVersions.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumeVersions.map((resume, idx) => (
              <ResumeVersionCard key={resume.version || idx} resume={resume} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No resume versions yet</p>
            <p className="text-gray-500 text-sm mt-1">Upload your first resume to get started</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* Stat Card Component */
function StatCard({ label, value, change, trend, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="stat-card group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5 text-accent-purple" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            <ArrowUpRight className={`w-3 h-3 ${trend === 'down' ? 'rotate-90' : ''}`} />
            {change}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {trend && (
        <p className="text-xs text-green-400 mt-2">↑ {change} this week</p>
      )}
    </motion.div>
  );
}

/* Recent Match Card */
function RecentMatchCard({ jd }) {
  const score = jd.matchScore || jd.score || 0;
  const scoreColor = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400';
  const bgColor = score >= 80 ? 'from-green-500/20' : score >= 60 ? 'from-yellow-500/20' : 'from-red-500/20';

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {jd.role || jd.title || 'Job Analysis'}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {jd.company || 'Unknown Company'}
        </p>
      </div>
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${bgColor} to-transparent`}>
        <span className={`text-lg font-bold ${scoreColor}`}>{score}%</span>
        <span className="text-xs text-gray-400">Match</span>
      </div>
    </div>
  );
}

/* Resume Version Card */
function ResumeVersionCard({ resume }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/30 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-white">
          Version {resume.version}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(resume.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex gap-4">
        <div>
          <p className="text-xs text-gray-500">ATS Score</p>
          <p className="text-lg font-bold text-accent-purple">
            {resume.scoresSnapshot?.atsScore || '-'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Match Score</p>
          <p className="text-lg font-bold text-accent-cyan">
            {resume.scoresSnapshot?.matchScore || '-'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* Dashboard Skeleton Loader */
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Insight Banner Skeleton */}
      <div className="glass-card rounded-2xl p-6 h-28">
        <div className="skeleton h-6 w-3/4 mb-3" />
        <div className="skeleton h-4 w-1/2" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <div className="skeleton h-10 w-10 rounded-xl mb-4" />
            <div className="skeleton h-8 w-20 mb-2" />
            <div className="skeleton h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Chart Section Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="skeleton h-6 w-40 mb-6" />
          <div className="skeleton h-48 w-full rounded-lg" />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="skeleton h-6 w-32 mb-6" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
