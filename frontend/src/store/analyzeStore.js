import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAnalyzeStore = create(
  persist(
    (set) => ({
      /* =====================
         INPUT STATE
      ===================== */
      jobDescription: "",
      resume: {
        file: null,
        text: ""
      },
      profile: {
        experience: "",
        role: "",
        techStack: ""
      },

      /* =====================
         PROCESS STATE
      ===================== */
      analyzing: false,
      error: null,

      /* =====================
         OUTPUT STATE
      ===================== */
      result: null,
      matchData: null,
      atsData: null,
      improveData: null,
      roadmapData: null,
      jdId: null,

      /* =====================
         SETTERS
      ===================== */
      setJobDescription: (jobDescription) => set({ jobDescription }),
      setResume: (resume) => set({ resume }),
      setProfile: (profile) => set({ profile }),

      setAnalyzing: (analyzing) => set({ analyzing }),
      setError: (error) => set({ error }),

      setResult: (result) => set({ result }),
      setMatchData: (matchData) => set({ matchData }),
      setATSData: (atsData) => set({ atsData }),
      setImproveData: (improveData) => set({ improveData }),
      setRoadmapData: (roadmapData) => set({ roadmapData }),
      setJdId: (jdId) => set({ jdId }),

      /* =====================
         RESET ACTIONS
      ===================== */
      resetJD: () =>
        set({ jobDescription: "" }),

      resetResume: () =>
        set({ resume: { file: null, text: "" } }),

      resetFullAnalysis: () =>
        set({
          jobDescription: "",
          resume: { file: null, text: "" },
          profile: { experience: "", role: "", techStack: "" },
          analyzing: false,
          error: null,
          result: null,
          matchData: null,
          atsData: null,
          improveData: null,
          roadmapData: null,
          jdId: null
        })
    }),
    {
      name: "analyze-store" // localStorage key
    }
  )
);

export default useAnalyzeStore;
