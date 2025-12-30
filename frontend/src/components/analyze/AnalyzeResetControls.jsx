import { useState } from "react";
import useAnalyzeStore from "../../store/analyzeStore";
import ConfirmModal from "../ConfirmModal";

export default function AnalyzeResetControls() {
  const {
    resetJD,
    resetResume,
    resetFullAnalysis,
    jobDescription,
    resume,
    result
  } = useAnalyzeStore();

  const [showConfirm, setShowConfirm] = useState(false);

  const hasJD = jobDescription.trim().length > 0;
  const hasResume = resume.text?.length > 0;
  const hasResults = !!result;

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-end mb-6">
        <button
          disabled={!hasJD}
          onClick={resetJD}
          className="px-4 py-2 rounded-lg text-sm
                     border border-white/20 text-white/80
                     hover:bg-white/10 disabled:opacity-40"
        >
          Reset JD
        </button>

        <button
          disabled={!hasResume}
          onClick={resetResume}
          className="px-4 py-2 rounded-lg text-sm
                     border border-white/20 text-white/80
                     hover:bg-white/10 disabled:opacity-40"
        >
          Reset Resume
        </button>

        <button
          disabled={!hasResults}
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 rounded-lg text-sm
                     bg-red-600/90 hover:bg-red-600
                     text-white font-medium
                     disabled:opacity-40"
        >
          Reset All
        </button>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Reset full analysis?"
        description="This will permanently clear the job description, resume, profile details, and all generated results. This action cannot be undone."
        confirmText="Yes, reset everything"
        cancelText="Cancel"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          resetFullAnalysis();
          setShowConfirm(false);
        }}
      />
    </>
  );
}
