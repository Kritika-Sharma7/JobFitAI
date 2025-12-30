import { create } from "zustand";

const useDashboardStore = create((set) => ({
  loading: true,
  error: null,

  stats: null,
  recentJDs: [],
  resumes: [],

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setDashboardData: (data) =>
    set({
      stats: data.stats || null,
      resumes: data.recentResumes || [],
      recentJDs: data.recentJDMatches || []
    })
}));

export default useDashboardStore;
