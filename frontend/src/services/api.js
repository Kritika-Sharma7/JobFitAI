import axios from "axios";

/* -------------------- AXIOS INSTANCE -------------------- */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------- RESPONSE INTERCEPTOR -------------------- */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject({ message });
  }
);

/* -------------------- API FUNCTIONS -------------------- */

// Phase 3 / 4
export const analyzeJD = (payload) =>
  api.post("/analyze-jd", payload);

// Later additions (already planned)
export const getResumeMatch = (jdId) =>
  api.get(`/resume/match/${jdId}`);

export const getATSScore = (payload) =>
  api.post("/ats/score", payload);

export const improveResume = (payload) =>
  api.post("/resume/improve", payload);

export const getRoadmap = (jdId) =>
  api.get(`/roadmap/${jdId}`);

export const getDashboardData = () =>
  api.get("/dashboard/data");

export default api;
