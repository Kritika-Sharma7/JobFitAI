function SkillsBreakdown({ skills }) {
  if (!skills || !skills.length) return null;

  // Phase 3 rule: missing skills FIRST
  const priority = {
    missing: 0,
    must_have: 1,
    good_to_have: 2,
  };

  const sortedSkills = [...skills].sort(
    (a, b) => priority[a.category] - priority[b.category]
  );


  const getStyles = (category) => {
    if (category=="missing") {
      return {
        dot: "bg-red-400",
        chip: "bg-red-500/15 text-red-300 border-red-500/30",
        label: "Missing / High Priority"
      };
    }

    if (category === "must_have") {
      return {
        dot: "bg-green-400",
        chip: "bg-green-500/15 text-green-300 border-green-500/30",
        label: "Must Have"
      };
    }

    return {
      dot: "bg-violet-400",
      chip: "bg-violet-500/15 text-violet-300 border-violet-500/30",
      label: "Good to Have"
    };
  };

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">
        Skills Breakdown
      </h3>

      <div className="flex flex-wrap gap-3">
        {sortedSkills.map((skill, idx) => {
          const styles = getStyles(skill.category);

          return (
           <span
              key={idx}
              className={`px-4 py-2 rounded-xl text-sm font-medium border
                          ${styles.chip} flex items-center gap-2`}
            >
              <span className={`w-2 h-2 rounded-full ${styles.dot}`} />

              <span>{skill.name}</span>

              <span
                className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold
                          bg-black/20 border border-white/10 uppercase tracking-wide"
              >
                {styles.label}
              </span>
            </span>


          );
        })}
      </div>

      {/* Phase 3 explainability hint */}
      <p className="text-xs text-gray-400 mt-6">
        Missing skills have the highest impact on your job fit score.
      </p>
    </div>
  );
}

export default SkillsBreakdown;
