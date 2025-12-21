function JobFitScore({ score }) {
  if (typeof score !== "number") return null;

  const getColor = () => {
    if (score >= 80) return "text-green-400";
    if (score >= 70) return "text-violet-400";
    return "text-yellow-400";
  };

  const getBarColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 70) return "bg-violet-500";
    return "bg-yellow-500";
  };

  const getMessage = () => {
    if (score >= 80) return "Excellent match for this role";
    if (score >= 70) return "Strong profile with minor gaps";
    return "Decent match — improvements recommended";
  };

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">
        Job Fit Score
      </h3>

      {/* Score */}
      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <div className={`text-6xl font-black ${getColor()}`}>
            {score}
          </div>
          <p className="text-sm text-gray-400 mt-1">
            out of 100
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${getBarColor()} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Message */}
      <p className="text-center text-sm text-gray-300">
        {getMessage()}
      </p>
    </div>
  );
}

export default JobFitScore;
