import { useState } from 'react';

function Dashboard() {
  const [timeRange, setTimeRange] = useState('week');

  const analyses = [
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      company: 'TechCorp Inc.',
      score: 87,
      date: '2 hours ago',
      status: 'strong'
    },
    {
      id: 2,
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      score: 72,
      date: '1 day ago',
      status: 'good'
    },
    {
      id: 3,
      jobTitle: 'Frontend Lead',
      company: 'MegaCorp',
      score: 91,
      date: '3 days ago',
      status: 'excellent'
    }
  ];

  const metrics = [
    {
      label: 'Average Match',
      value: '83%',
      change: '+5%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-violet-600 to-purple-600'
    },
    {
      label: 'Analyses',
      value: '24',
      change: '+12',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-fuchsia-600 to-pink-600'
    },
    {
      label: 'Skills Improved',
      value: '8',
      change: '+3',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-cyan-600 to-blue-600'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden pt-32 pb-20 px-6">
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 text-shadow-glow">
              Your Dashboard
            </h1>
            <p className="text-gray-400">Track your job search progress and skill development</p>
          </div>

          <div className="flex gap-2 mt-6 md:mt-0">
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30'
                    : 'glass-light text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="glass-heavy border border-white/5 rounded-3xl p-8">
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="group relative glass-light border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-800"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={`url(#gradient-${analysis.id})`}
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${analysis.score * 1.76} 176`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient
                          id={`gradient-${analysis.id}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-black text-white">
                        {analysis.score}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {analysis.jobTitle}
                    </h3>
                    <p className="text-gray-400 text-sm">{analysis.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
