function ScoreBreakdown({ breakdown }) {
  if (!breakdown) return null;

  const rows = [
    {
      key: "skills",
      label: "Skills Match",
      description: "How well your skills align with the job requirements"
    },
    {
      key: "experience",
      label: "Experience Level",
      description: "Fit based on required experience for this role"
    },
    {
      key: "keywords",
      label: "ATS Keywords",
      description: "Presence of important job-specific keywords"
    },
    {
      key: "bonus",
      label: "Bonus Signals",
      description: "Extra alignment factors like strong phrasing or relevance"
    }
  ];

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-2">
        Why your score looks like this
      </h3>

      <p className="text-sm text-gray-400 mb-6">
        Your overall job fit score is calculated using the factors below.
      </p>

      <div className="space-y-5">
        {rows.map(({ key, label, description }) => (
          <div
            key={key}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-white">
                {label}
              </p>
              <p className="text-xs text-gray-400">
                {description}
              </p>
            </div>

            <div className="text-lg font-bold text-violet-400">
              {breakdown[key] ?? 0} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBreakdown;
