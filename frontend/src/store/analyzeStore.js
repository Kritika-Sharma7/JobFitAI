import { create } from "zustand";
import { persist } from "zustand/middleware";

/*
  =====================================================
  ANALYZE STORE - Analysis State Management
  =====================================================
  This store persists analysis data to localStorage.
  
  🔥 IMPORTANT: The authStore clears this data on
  login/logout to prevent data leakage between users.
  =====================================================
*/

const useAnalyzeStore = create(
  persist(
    (set, get) => ({
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
        company: "",
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
         SESSION METADATA
      ===================== */
      lastAnalyzedAt: null,
      sessionId: null,

      /* =====================
         SETTERS
      ===================== */
      setJobDescription: (jobDescription) => set({ jobDescription }),
      setResume: (resume) => set({ resume }),
      setProfile: (profile) => set({ profile }),

      setAnalyzing: (analyzing) => set({ analyzing }),
      setError: (error) => set({ error }),

      setResult: (result) => set({ 
        result,
        lastAnalyzedAt: result ? new Date().toISOString() : null
      }),
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

      resetResults: () =>
        set({
          result: null,
          matchData: null,
          atsData: null,
          improveData: null,
          roadmapData: null,
          jdId: null,
          error: null
        }),

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
          jdId: null,
          lastAnalyzedAt: null
        }),

      /* =====================
         HYDRATION CHECK
         Returns true if store has stale data
      ===================== */
      hasStaleData: () => {
        const state = get();
        return !!(
          state.jobDescription ||
          state.resume?.text ||
          state.resume?.file ||
          state.result
        );
      }
    }),
    {
      name: "analyze-store", // localStorage key
      // Only persist specific fields (exclude file objects)
      partialize: (state) => ({
        jobDescription: state.jobDescription,
        resume: { text: state.resume?.text || "", file: null }, // Don't persist file objects
        profile: state.profile,
        result: state.result,
        matchData: state.matchData,
        atsData: state.atsData,
        roadmapData: state.roadmapData,
        jdId: state.jdId,
        lastAnalyzedAt: state.lastAnalyzedAt
      })
    }
  )
);

export default useAnalyzeStore;
