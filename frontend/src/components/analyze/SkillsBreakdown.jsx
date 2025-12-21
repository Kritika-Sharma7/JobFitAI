function SkillsBreakdown({ skills }) {
  if (!skills) return null;

  const { required = [], goodToHave = [], missing = [] } = skills;

  const SkillGroup = ({ title, color, items }) => {
    if (!items.length) return null;

    return (
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${color}`} />
          {title}
          <span className="text-xs text-gray-500">({items.length})</span>
        </h4>

        <div className="flex flex-wrap gap-2">
          {items.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl text-sm font-medium bg-slate-800/60 text-white border border-white/10 hover:border-white/20 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">
        Skills Breakdown
      </h3>

      <div className="space-y-8">
        <SkillGroup
          title="Required Skills"
          color="bg-green-400"
          items={required}
        />

        <SkillGroup
          title="Good to Have"
          color="bg-violet-400"
          items={goodToHave}
        />

        <SkillGroup
          title="Skills to Develop"
          color="bg-yellow-400"
          items={missing}
        />
      </div>
    </div>
  );
}

export default SkillsBreakdown;
