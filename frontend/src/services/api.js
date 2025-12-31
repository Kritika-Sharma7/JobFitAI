import axios from "axios";

/* -------------------- AXIOS INSTANCE -------------------- */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json"
  }
});

/* -------------------- REQUEST INTERCEPTOR (AUTH) -------------------- */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 🔑 Attach Bearer token if present
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------- RESPONSE INTERCEPTOR -------------------- */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    // Optional: auto logout on 401 (later phase)
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.href = "/login";
    // }

    return Promise.reject({ message });
  }
);

/* -------------------- API FUNCTIONS -------------------- */

// JD analysis (core)
export const analyzeJD = async (payload) => {
  const res = await api.post("/analyze-jd", payload);
  return res.data;
};

// ATS scoring
export const getATSScore = (payload) =>
  api.post("/ats/score", payload).then((res) => res.data);

// Resume analysis (resume vs JD)
export const analyzeResume = ({
  jobDescription,
  profile,
  resumeText
}) =>
  api
    .post("/resume/analyze", {
      jobDescription,
      profile: {
        experience: profile.experience,
        targetRole: profile.targetRole
      },
      resume: {
        text: resumeText
      }
    })
    .then((res) => res.data);

// Resume bullet improvement
export const improveResume = (payload) =>
  api.post("/resume/improve", payload).then((res) => res.data);

// Save JD
export const saveJD = (payload) =>
  api.post("/save-jd", payload).then((res) => res.data);

// Resume ↔ JD match (NON-AUTH route, different base)
// export const getResumeJDMatch = (jdId) => {
//   const ROOT = API_BASE.replace("/api", "");
//   return axios.get(`${ROOT}/resume/match/${jdId}`).then((res) => res.data);
// };

//RS changed to AUTH route 31Dec ... for resume match section 
// ✅ FIXED (AUTH-SAFE, FRONTEND-SAFE)
export const getResumeJDMatch = (jdId) => {
  return api
    .get(`/resume/match/${jdId}`)
    .then((res) => res.data);
};


// Roadmap
export const getRoadmap = (jdId) =>
  api.get(`/roadmap/${jdId}`).then((res) => res.data);

// Dashboard (PROTECTED)
export const getDashboardData = () =>
  api.get("/dashboard/summary").then((res) => res.data);

export default api;
