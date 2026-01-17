import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Briefcase,
  User,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Upload,
  AlertCircle,
  Check,
  RotateCcw,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";

import {
  analyzeJD,
  getATSScore,
  analyzeResume,
  saveJD,
  getResumeJDMatch
} from "../services/api";

import useAnalyzeStore from "../store/analyzeStore";
import { transformAnalysisData } from "../utils/analyzeTransform";

/* ---------- ATS & ANALYSIS ---------- */
import ATSScore from "../components/ats/ATSScore";
import KeywordSuggestions from "../components/ats/KeywordSuggestions";
import ResumeBulletRewrite from "../components/ats/ResumeBulletRewrite";

/* ---------- INPUT COMPONENTS ---------- */
import ResumeUpload from "../components/resume/ResumeUpload";
import ProfileSetup from "../components/resume/ProfileSetup";

/* ---------- RESULTS ---------- */
import JobFitScore from "../components/analyze/JobFitScore";
import SkillsBreakdown from "../components/analyze/SkillsBreakdown";
import ProjectSuggestions from "../components/analyze/ProjectSuggestions";
import ResumeBulletSuggestions from "../components/analyze/ResumeBulletSuggestions";
import LoadingSkeleton from "../components/analyze/LoadingSkeleton";

/* ---------- MATCH & ROADMAP ---------- */
import JDComparison from "../components/match/JDComparison";
import RoadmapTimeline from "../components/roadmap/RoadmapTimeline";

/* ---------- STEP CONFIGURATION ---------- */
const STEPS = [
  {
    id: 1,
    title: "Upload Resume",
    description: "Upload your resume to get started",
    icon: Upload
  },
  {
    id: 2,
    title: "Job Description",
    description: "Paste the job you're applying for",
    icon: Briefcase
  },
  {
    id: 3,
    title: "Profile Context",
    description: "Tell us about your experience",
    icon: User
  }
];

/* ---------- STEP INDICATOR COMPONENT ---------- */
function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <motion.button
              onClick={() => onStepClick(step.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg shadow-accent-purple/30"
                  : isCompleted
                  ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                  : "bg-dark-700/50 text-dark-400 border border-white/10 hover:bg-dark-700"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive ? "bg-white/20" : isCompleted ? "bg-accent-purple/30" : "bg-dark-600"
              }`}>
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>
                  {step.title}
                </p>
                <p className={`text-xs ${isActive ? "text-white/70" : "text-dark-500"}`}>
                  Step {step.id} of {steps.length}
                </p>
              </div>
            </motion.button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`hidden md:block w-8 h-0.5 mx-2 ${
                currentStep > step.id ? "bg-accent-purple" : "bg-dark-600"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- MAIN COMPONENT ---------- */
function AnalyzeJD() {
  const [searchParams] = useSearchParams();
  const urlJdId = searchParams.get('jdId');
  
  const {
    jobDescription,
    resume,
    profile,
    analyzing,
    error,
    result,
    matchData,
    atsData,
    improveData,
    roadmapData,
    jdId,
    setJobDescription,
    setResume,
    setProfile,
    setAnalyzing,
    setError,
    setResult,
    setMatchData,
    setATSData,
    setImproveData,
    setRoadmapData,
    setJdId,
    resetJD,
    resetResume,
    resetFullAnalysis
  } = useAnalyzeStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const USE_MOCK_DATA = false;

  /* ---------- LOAD EXISTING ANALYSIS FROM URL ---------- */
  useEffect(() => {
    // Only load existing analysis if we have a valid jdId in URL
    if (urlJdId && urlJdId !== 'undefined' && urlJdId !== 'null') {
      setLoadingExisting(true);
      setJdId(urlJdId);
      
      // Fetch match data for this jdId
      getResumeJDMatch(urlJdId)
        .then(data => {
          if (data) {
            setMatchData(data);
          }
        })
        .catch(err => {
          console.error("Failed to load analysis:", err);
        })
        .finally(() => {
          setLoadingExisting(false);
        });
    }
  }, [urlJdId, setJdId, setMatchData]);

  /* ---------- VALIDATION ---------- */
  const isResumeProvided =
    (resume.text && resume.text.trim().length > 50) || resume.file !== null;

  const isJDProvided = jobDescription.trim().length > 50;

  const isProfileComplete = profile.experience && profile.role;

  const canAnalyze = isResumeProvided && isJDProvided && isProfileComplete && !analyzing;

  /* ---------- STEP NAVIGATION ---------- */
  const canProceedToStep2 = isResumeProvided;
  const canProceedToStep3 = canProceedToStep2 && isJDProvided;

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId) => {
    // Only allow going back or to completed steps
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    } else if (stepId === 2 && canProceedToStep2) {
      setCurrentStep(stepId);
    } else if (stepId === 3 && canProceedToStep3) {
      setCurrentStep(stepId);
    }
  };

  /* ---------- ANALYZE HANDLER ---------- */
  const handleAnalyze = async () => {
    if (!canAnalyze) return;

    setAnalyzing(true);
    setError(null);
    setJdId(null);
    setResult(null);
    setMatchData(null);
    setATSData(null);
    setImproveData(null);
    setRoadmapData(null);

    try {
      if (USE_MOCK_DATA) {
        // Mock data for testing
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

        setMatchData(mockMatchData);
        setATSData(mockATS);

        const transformed = transformAnalysisData({
          fitScore: mockMatchData.matchScore,
          skills: mockMatchData.skillComparison,
          projects: [],
          resumeBullets: []
        });

        setResult(transformed);
      } else {
        // Backend Mode
        const jdPayload = {
          jobDescription,
          role: profile.role,
          experience: profile.experience
        };

        // ATS Score (if text resume)
        if (resume.text?.trim()) {
          const atsResult = await getATSScore({
            resumeText: resume.text,
            jobDescription,
            experience: profile.experience
          });
          setATSData(atsResult);
        }

        // Prepare resume formData
        const formData = new FormData();
        if (resume.file) {
          formData.append("resumeFile", resume.file);
        }
        if (resume.text?.trim()) {
          formData.append("resume[text]", resume.text);
        }
        formData.append("jobDescription", jobDescription);
        formData.append("profile[experience]", profile.experience);
        formData.append("profile[targetRole]", profile.role);
        formData.append("profile[company]", profile.company || "");
        formData.append("profile[techStack]", profile.techStack || "");

        await analyzeResume(formData);

        // Analyze JD
        const jdResponse = await analyzeJD(jdPayload);
        console.log("JD Response:", jdResponse);
        const transformed = transformAnalysisData(jdResponse);
        console.log("Transformed result:", transformed);
        setResult(transformed);
        setJdId(jdResponse.jdId);

        // Fetch match data
        const matchRes = await getResumeJDMatch(jdResponse.jdId);
        console.log("Match Response:", matchRes);
        setMatchData(matchRes);
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  };

  /* ---------- RESET HANDLERS ---------- */
  const handleReset = () => {
    resetFullAnalysis();
    setCurrentStep(1);
  };

  /* ---------- ANIMATION VARIANTS ---------- */
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen pb-24">
      {/* Header Section */}
      <section className="pt-8 pb-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/20 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Match Your Resume to Any Job
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-dark-300 max-w-2xl mx-auto"
          >
            Get instant AI analysis, skill gap identification, and personalized recommendations to land your dream job.
          </motion.p>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <StepIndicator
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </section>

      {/* Step Content */}
      <section className="max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Resume Upload */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Upload Your Resume</h2>
                  <p className="text-dark-400 text-sm">Upload a PDF or paste your resume text</p>
                </div>
              </div>

              <ResumeUpload
                value={resume}
                onResumeChange={(data) => {
                  setResume({
                    file: data.file || null,
                    text: data.text || ""
                  });
                }}
              />

              {/* Step Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                <div />
                <motion.button
                  onClick={handleNextStep}
                  disabled={!canProceedToStep2}
                  whileHover={{ scale: canProceedToStep2 ? 1.02 : 1 }}
                  whileTap={{ scale: canProceedToStep2 ? 0.98 : 1 }}
                  className={`btn-primary ${!canProceedToStep2 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span>Next: Job Description</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Job Description */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Job Description</h2>
                  <p className="text-dark-400 text-sm">Paste the full job posting you're targeting</p>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                  className="w-full glass-input min-h-[300px] resize-y outline-none focus:outline-none"
                />
                <div className="flex justify-between items-center text-sm">
                  <span className={`${jobDescription.length > 50 ? "text-accent-cyan" : "text-dark-500"}`}>
                    {jobDescription.length > 50 ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Looks good!
                      </span>
                    ) : (
                      "Minimum 50 characters required"
                    )}
                  </span>
                  <span className="text-dark-500">{jobDescription.length} characters</span>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <motion.button
                  onClick={handleNextStep}
                  disabled={!canProceedToStep3}
                  whileHover={{ scale: canProceedToStep3 ? 1.02 : 1 }}
                  whileTap={{ scale: canProceedToStep3 ? 0.98 : 1 }}
                  className={`btn-primary ${!canProceedToStep3 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span>Next: Profile</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Profile Context */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Profile Context</h2>
                  <p className="text-dark-400 text-sm">Help us personalize your analysis</p>
                </div>
              </div>

              {/* Info Banner */}
              <div className="mb-6 p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
                <div className="flex gap-3">
                  <Target className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-dark-200">
                      We use this information to compare your resume against job requirements
                      at your experience level, generate realistic match scores, and build a
                      personalized learning roadmap.
                    </p>
                  </div>
                </div>
              </div>

              <ProfileSetup
                value={profile}
                onProfileChange={(data) => {
                  setProfile(data);
                }}
              />

              {/* Step Navigation & Analyze */}
              <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-white/10">
                <motion.button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  whileHover={{ scale: canAnalyze ? 1.02 : 1 }}
                  whileTap={{ scale: canAnalyze ? 0.98 : 1 }}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-3 ${
                    canAnalyze
                      ? "bg-gradient-to-r from-accent-purple to-accent-cyan shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/50"
                      : "bg-dark-700 cursor-not-allowed opacity-60"
                  }`}
                >
                  {analyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing your resume...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Analyze Match</span>
                    </>
                  )}
                </motion.button>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-dark-400 hover:text-red-400 transition-colors text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Error Display */}
      {error && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto px-4 mt-6"
        >
          <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        </motion.section>
      )}

      {/* Loading State */}
      {analyzing && (
        <section className="max-w-7xl mx-auto mt-16 px-4">
          <LoadingSkeleton />
        </section>
      )}

      {/* Results Section */}
      {result && !analyzing && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mt-16 px-4 space-y-10"
        >
          {/* Results Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Analysis Complete
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Your Results
            </h2>
            <p className="text-dark-400">
              Here's how your resume matches the job requirements
            </p>
          </div>

          {result.fitScore !== undefined && <JobFitScore score={result.fitScore} />}
          {result.skills && result.skills.length > 0 && <SkillsBreakdown skills={result.skills} />}
          {result.projects && result.projects.length > 0 && <ProjectSuggestions projects={result.projects} />}
          {result.resumePoints && result.resumePoints.length > 0 && <ResumeBulletSuggestions bullets={result.resumePoints} />}

          {/* Save JD CTA */}
          {!jdId && (
            <div className="pt-6 text-center">
              <motion.button
                onClick={async () => {
                  try {
                    const res = await saveJD({
                      jobDescription,
                      role: profile.role,
                      experience: profile.experience
                    });
                    setJdId(res.jdId);
                  } catch (e) {
                    setError(e?.message || "Failed to save JD");
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg shadow-accent-purple/30"
              >
                Save JD & Generate Roadmap
              </motion.button>
            </div>
          )}
        </motion.section>
      )}

      {/* ATS Score Section */}
      {atsData && !analyzing && (
        <section className="max-w-7xl mx-auto mt-16 px-4 space-y-10">
          <ATSScore data={atsData} />
          {atsData.bulletAnalysis && (
            <KeywordSuggestions 
              bullets={atsData.bulletAnalysis} 
              role={profile.role}
              jobDescription={jobDescription}
            />
          )}
        </section>
      )}

      {/* Improve Data Section */}
      {improveData && !analyzing && (
        <section className="max-w-7xl mx-auto mt-16 px-4">
          <ResumeBulletRewrite data={improveData} />
        </section>
      )}

      {/* JD-Based Features */}
      {jdId && !analyzing && (
        <section className="max-w-7xl mx-auto mt-20 px-4 space-y-12">
          <JDComparison jdId={jdId} />
          <RoadmapTimeline jdId={jdId} />
        </section>
      )}
    </div>
  );
}

export default AnalyzeJD;
