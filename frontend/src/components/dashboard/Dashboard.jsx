import ProgressChart from "./ProgressChart";
import SavedJDList from "./SavedJDList";

export default function Dashboard({ data }) {
  if (!data) return null;

  // ✅ BACKEND-CONTRACT SHAPE
  const {
    totalResumes,
    totalJDs,
    avgMatch,
    bestMatch,
    recentJDs,
    resumeVersions
  } = data;

  return (
    <div className="space-y-12">
      {/* ---------- HERO INSIGHT ---------- */}
      <div
        className="rounded-3xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 
                   border border-violet-500/30 p-6"
      >
        <p className="text-slate-300 text-sm">Today’s Insight</p>

        <h2 className="text-2xl font-bold text-white mt-1">
          Your best match improved by{" "}
          <span className="text-violet-400">+{Math.max(0, bestMatch - avgMatch)}%</span>{" "}
          this week 🚀
        </h2>

        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Keep optimizing ATS keywords to convert more roles into{" "}
          <span className="text-emerald-400 font-semibold">Strong Match</span>.
        </p>
      </div>

      {/* ---------- STATS ---------- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Resumes" value={totalResumes} />
        <StatCard label="JDs Analyzed" value={totalJDs} />
        <StatCard label="Avg Match %" value={`${avgMatch}%`} trend="up" />
        <StatCard label="Best Match %" value={`${bestMatch}%`} trend="up" />
      </div>

      {/* ---------- CHART + JD LIST ---------- */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white">
              Match Score Progress
            </h3>
            <p className="text-slate-400 text-sm">
              Your recent job descriptions are trending toward stronger matches
            </p>
          </div>

          <ProgressChart recentJDMatches={recentJDs} />
        </div>

        <SavedJDList recentJDMatches={recentJDs} />
      </div>

      {/* ---------- RESUME VERSIONS ---------- */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">
          Resume Versions
        </h3>

        {resumeVersions.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No resume versions found yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumeVersions.map((resume) => (
              <div
                key={resume.version}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4 
                           hover:border-violet-500 transition cursor-pointer"
              >
                <p className="text-white font-semibold">
                  Version {resume.version}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  ATS: {resume.scoresSnapshot?.atsScore ?? "-"} | Match:{" "}
                  {resume.scoresSnapshot?.matchScore ?? "-"}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {new Date(resume.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------- STAT CARD -------------------- */
function StatCard({ label, value, trend }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-slate-400 text-sm">{label}</p>

      <div className="flex items-center gap-2 mt-2">
        <p className="text-3xl font-black text-white">{value}</p>

        {trend && (
          <span
            className={`text-sm font-semibold ${
              trend === "up" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </div>
  );
}
