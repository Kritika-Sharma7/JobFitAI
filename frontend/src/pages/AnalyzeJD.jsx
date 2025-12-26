import { useState } from "react";
import {
  analyzeJD,
  getATSScore,
  analyzeResume,
  saveJD
} from "../services/api";

import { transformAnalysisData } from "../utils/analyzeTransform";
import ATSScore from "../components/ats/ATSScore";
import KeywordSuggestions from "../components/ats/KeywordSuggestions";
import ResumeBulletRewrite from "../components/ats/ResumeBulletRewrite";
import ResumeUpload from "../components/resume/ResumeUpload";
import ProfileSetup from "../components/resume/ProfileSetup";
import ResumePreview from "../components/resume/ResumePreview";
import MatchScore from "../components/match/MatchScore";
import JobFitScore from "../components/analyze/JobFitScore";
import SkillsBreakdown from "../components/analyze/SkillsBreakdown";
import ProjectSuggestions from "../components/analyze/ProjectSuggestions";
import ResumeBulletSuggestions from "../components/analyze/ResumeBulletSuggestions";
import LoadingSkeleton from "../components/analyze/LoadingSkeleton";
import SkillGapView from "../components/match/SkillGapView";
import JDComparison from "../components/match/JDComparison.jsx";
import RoadmapTimeline from "../components/roadmap/RoadmapTimeline";

function AnalyzeJD() {
  /* -------------------- STATE -------------------- */
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState({
    file: null,
    text: ""
  });

  const [profile, setProfile] = useState({
    experience: "",
    role: "",
    techStack: ""
  });
  const USE_MOCK_DATA = false; // change to false when backend is ready
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [atsData, setATSData] = useState(null);
  const [improveData, setImproveData] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [jdId, setJdId] = useState(null);

  // 🔹 TEMPORARY: Mock data for UI testing (remove later)
  const mockMatchData = {
    matchScore: 72,
    skillComparison: {
      matched: ["React", "JavaScript", "HTML", "CSS"],
      partial: ["Redux", "TypeScript"],
      missing: ["Next.js", "Jest", "GraphQL"]
    }
  };
  const mockATS = {
    atsScore: 81,
    breakdown: {
      keywords: 30,
      actionVerbs: 20,
      structure: 15,
      experience: 10
    },
    bulletAnalysis: [
      {
        text: "Built React components for scalable UI",
        grade: "strong",
        reason: "Uses action verb and JD keyword"
      },
      {
        text: "Worked on frontend features",
        grade: "weak",
        reason: "No strong action verb or JD skill"
      }
    ]
  };

  const mockImprove = {
    original: "Worked on frontend features",
    optimized:
      "Built scalable frontend features using React with performance optimizations and clean architecture"
  };
  const mockRoadmap = {
    jdId: "frontend_jd_1",
    targetRole: "Frontend Developer",
    totalMissingSkills: 2,
    roadmap: [
      {
        skill: "Docker",
        priority: "good_to_have",
        difficulty: "Intermediate",
        learningPlan: [
          "Understand Docker fundamentals",
          "Practice containerizing frontend apps",
          "Use Docker in a real project"
        ],
        project: {
          title: "Dockerized Frontend App",
          description: "Containerize a React application using Docker",
          outcome: "Demonstrates real-world Docker usage"
        }
      },
      {
        skill: "AWS",
        priority: "good_to_have",
        difficulty: "Intermediate",
        learningPlan: [
          "Learn AWS basics (EC2, S3)",
          "Deploy a frontend app on AWS",
          "Understand basic cloud architecture"
        ],
        project: {
          title: "AWS Deployed Frontend",
          description: "Deploy a frontend application using AWS services",
          outcome: "Demonstrates cloud deployment skills"
        }
      }
    ]
  };


  /* -------------------- LOGIC -------------------- */
  const isResumeProvided =
  resume.text && resume.text.trim().length > 50;


  const canAnalyze =
  jobDescription.trim().length > 50 &&
  isResumeProvided &&
  profile.experience &&
  profile.role &&
  !analyzing;




  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description first.");
      return;
    }

    setAnalyzing(true);
    setError(null);
    setJdId(null);
    // Clear old results
    setResult(null);
    setMatchData(null);
    setATSData(null);
    setImproveData(null);
    setRoadmapData(null);

    try {
      if (USE_MOCK_DATA) {
        // UI MODE (NO BACKEND)
        setMatchData(mockMatchData);
        setATSData(mockATS);
        setImproveData(mockImprove);
        setRoadmapData(mockRoadmap);

        const transformed = transformAnalysisData({
          fitScore: mockMatchData.matchScore,
          skills: mockMatchData.skillComparison,
          projects: [],
          resumeBullets: []
        });

        setResult(transformed);

      } else {
        // BACKEND MODE
      
        // 🔹 MULTI-API BACKEND MODE (NO BACKEND CHANGE)

      const jdPayload = {
          jobDescription,
          role: profile.role,
          experience: profile.experience
        };

        const atsPayload = {
          resumeText: resume.text,
          jobDescription,
          experience: profile.experience
        };

        const resumePayload = {
          resume: {
            text: resume.text || "",
            fileUrl: resume.file ? "uploaded_pdf_url_placeholder" : ""
          },
          profile: {
            experience: profile.experience,
            targetRole: profile.role,
            techStack: profile.techStack
          },
          jobDescription
        };

        const [jdRes, atsRes, resumeRes] = await Promise.allSettled([
          analyzeJD(jdPayload),
          getATSScore(atsPayload),
          analyzeResume(resumePayload)
        ]);

        if (jdRes.status === "fulfilled") {
          const transformed = transformAnalysisData(jdRes.value);
          setResult(transformed);
        }

        if (atsRes.status === "fulfilled") {
          setATSData(atsRes.value);
        }

        if (resumeRes.status === "fulfilled") {
          setMatchData(resumeRes.value);
        }

      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }finally {
      setAnalyzing(false);
    }
  };


      

  /* -------------------- UI -------------------- */
  return (
    <div className="relative min-h-screen pb-24">

      {/* ---------- PRIMARY ACTION ZONE ---------- */}
      <section className="max-w-7xl mx-auto mt-10 px-4">
        <div
          className="rounded-2xl border border-white/10
                     bg-gradient-to-br from-slate-900/70 to-slate-950/70
                     shadow-xl ring-1 ring-violet-500/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">

            {/* Resume (smaller) */}
            <div className="lg:col-span-2">
              <ResumeUpload
                onResumeChange={(data) => {
                  setResume({
                    file: data.file || null,
                    text: data.text || ""
                  });
                }}

              />

            </div>

            {/* Job Description (dominant) */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-semibold mb-2">
                Job Description
              </h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                className="w-full min-h-[320px] lg:min-h-[380px]
                           bg-slate-900/60 border border-white/10
                           rounded-xl p-4 text-white placeholder-white/40
                           focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <div className="text-right text-xs text-white/40 mt-1">
                {jobDescription.length} characters
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------- OPTIONAL PROFILE DETAILS ---------- */}
      <section className="max-w-7xl mx-auto mt-8 px-4">
        <details className="group rounded-xl border border-white/10 bg-slate-900/60">
          <summary
            className="cursor-pointer list-none px-6 py-4
                       flex items-center justify-between"
          >
            <span className="text-white font-semibold">
              Profile Details <span className="text-white/50">(Optional)</span>
            </span>
            <span className="transition group-open:rotate-180">⌄</span>
          </summary>

          <div className="px-6 pb-6 pt-2">
            <ProfileSetup
              onProfileChange={(data) => {
                setProfile(data);
              }}
            />

          </div>
        </details>
      </section>

      {/* ---------- ANALYZE BUTTON ---------- */}
      <section className="max-w-4xl mx-auto mt-10 px-4">
        <button
          disabled={!canAnalyze || analyzing}
          onClick={handleAnalyze}
          className={`w-full py-4 rounded-xl text-lg font-semibold
            transition-all
            ${
              canAnalyze && !analyzing
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.01] shadow-lg shadow-violet-500/30"
                : "bg-slate-700 cursor-not-allowed opacity-60"
            }`}
        >
          {analyzing ? "Analyzing..." : "Analyze Match"}
        </button>

        {!canAnalyze && (
          <p className="text-center text-sm text-white/40 mt-2">
            Upload a resume and paste a job description to continue
          </p>
        )}
      </section>

      {/* ---------- ERROR ---------- */}
      {error && (
        <p className="text-center text-red-400 mt-6">
          {error}
        </p>
      )}

      {/* ---------- RESULTS ---------- */}
      {analyzing && (
        <section className="max-w-7xl mx-auto mt-16 px-4">
          <LoadingSkeleton />
        </section>
      )}

      {result && (
        <section className="max-w-7xl mx-auto mt-16 px-4 space-y-10">
          <JobFitScore score={result.fitScore} />
          <SkillsBreakdown skills={result.skills} />
          <ProjectSuggestions projects={result.projects} />
          <ResumeBulletSuggestions bullets={result.resumePoints} />

          {/* 🔹 SAVE JD CTA */}
          {!jdId && (
            <div className="pt-6 text-center">
              <button
                onClick={async () => {
                  try {
                    const res = await saveJD({
                      jobDescription,
                      role: profile.role,
                      experience: profile.experience
                    });
                    setJdId(res.jdId);

                    // 🔥 FETCH STORED MATCH
                   
                  } catch (e) {
                    setError(e?.message || "Failed to save JD");
                  }
                }}
                className="px-6 py-3 rounded-xl font-semibold
                          bg-gradient-to-r from-indigo-600 to-violet-600
                          text-white shadow-lg hover:scale-[1.02]"
              >
                Save JD & Generate Roadmap
              </button>
            </div>
          )}
        </section>
      )}


      {/* ---------- CONTEXTUAL PREVIEW (DESKTOP ONLY) ---------- */}
     {matchData && matchData.skillComparison && (
        <section className="max-w-7xl mx-auto mt-16 px-4 space-y-10">
          <MatchScore score={matchData.matchScore} />
          <SkillGapView
            matched={matchData.skillComparison.matched || []}
            partial={matchData.skillComparison.partial || []}
            missing={matchData.skillComparison.missing || []}
          />
        </section>
      )}


      {atsData && (
        <section className="max-w-7xl mx-auto mt-16 px-4 space-y-10">
          <ATSScore data={atsData} />
          <KeywordSuggestions bullets={atsData.bulletAnalysis} />
        </section>
      )}

      {improveData && (
        <section className="max-w-7xl mx-auto mt-16 px-4">
          <ResumeBulletRewrite data={improveData} />
        </section>
      )}

      {/* ---------- JD-BASED FEATURES ---------- */}
      {jdId && (
        <section className="max-w-7xl mx-auto mt-20 px-4 space-y-12">
          
          {/* Resume vs JD (stored) */}
          <JDComparison jdId={jdId} />

          {/* Learning Roadmap */}
          <RoadmapTimeline jdId={jdId} />

        </section>
      )}


    </div>
  );
}

export default AnalyzeJD;
