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

// JD analysis (core)
export const analyzeJD = async (payload) => {
  const res = await api.post("/analyze-jd", payload);
  return res.data;
};

// ATS scoring
export const getATSScore = (payload) =>
  api.post("/ats/score", payload).then((res) => res.data);

// Resume analysis (resume vs JD)
// export const analyzeResume = (payload) =>
//   api.post("/resume/analyze", payload).then((res) => res.data);
//the above commented is initial and below is modified
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
export const saveJD = (payload) =>
  api.post("/save-jd", payload).then(res => res.data);

// Resume ↔ JD match (stored JD)
export const getResumeJDMatch = (jdId) => {
  const ROOT = API_BASE.replace("/api", "");
  return axios.get(`${ROOT}/resume/match/${jdId}`).then((res) => res.data);
};

// Roadmap
export const getRoadmap = (jdId) =>
  api.get(`/roadmap/${jdId}`).then((res) => res.data);

// Dashboard
export const getDashboardData = () =>
  api.get("/dashboard/data").then((res) => res.data);

export default api;
