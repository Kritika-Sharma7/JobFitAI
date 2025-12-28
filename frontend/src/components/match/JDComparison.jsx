// import React from "react";
// import MatchScore from "./MatchScore";
// import SkillGapView from "./SkillGapView";

// export default function JDComparison({
//   matchScore = 0,
//   matchedSkills = [],
//   partialSkills = [],
//   missingSkills = []
// }) {
//   return (
//     <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-8">
//       {/* Header */}
//       <div>
//         <h2 className="text-2xl font-black text-white">
//           Resume vs Job Description
//         </h2>
//         <p className="text-slate-400 text-sm mt-1">
//           How well your resume aligns with this role
//         </p>
//       </div>

//       {/* Match Score */}
//       <MatchScore score={matchScore} />

//       {/* Skill Gap */}
//       <SkillGapView
//         matched={matchedSkills}
//         partial={partialSkills}
//         missing={missingSkills}
//       />
//     </div>
//   );
// }


//=====RS VERSION===
import React, { useEffect, useState } from "react";
import MatchScore from "./MatchScore";
import SkillGapView from "./SkillGapView";
import { getResumeJDMatch } from "../../services/api";

export default function JDComparison({ jdId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jdId) return;

    const fetchMatch = async () => {
      try {
        const res = await getResumeJDMatch(jdId);
        setData(res);
      } catch (err) {
        setError("Failed to load resume match");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [jdId]);

  if (loading) {
    return (
      <div className="text-slate-400 text-center py-10">
        Analyzing resume vs job description...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-10">
        {error}
      </div>
    );
  }
  // ---------- MATCH PERCENTAGE NORMALIZATION{RS ADDED} ----------
  const rawPercentage = Math.round((data.matchScore / 92) * 100);

  const finalPercentage =
    data.skillComparison.missing.length > 0
      ? Math.min(rawPercentage, 95)
      : 100;


  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white">
          Resume vs Job Description
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          How well your resume aligns with this role
        </p>
      </div>

      {/* Match Score */}
      {/* <MatchScore score={data.matchScore} />  RS COMMENTED THIS AND ADDED BELOW*/}
      {/* <MatchScore score={Math.round((data.matchScore / 92) * 100)} /> */}
      <MatchScore score={finalPercentage} />

      {/* Skill Gap */}
      <SkillGapView
        matched={data.skillComparison.matched}
        partial={data.skillComparison.partial}
        missing={data.skillComparison.missing}
      />
    </div>
  );
}
