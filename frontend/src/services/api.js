import axios from "axios";

/* -------------------- AXIOS INSTANCE -------------------- */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000
});

/* -------------------- ERROR MESSAGES -------------------- */

// User-friendly error messages for common scenarios
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  TIMEOUT: 'The request took too long. Please try again.',
  UNAUTHORIZED: 'Your session has expired. Please login again.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
  SERVER_ERROR: 'Something went wrong on our end. We\'re working on it!',
  AI_ERROR: 'AI service is temporarily busy. Please try again in a moment.',
  PARSE_ERROR: 'Unable to process the uploaded file. Please ensure it\'s a valid PDF or DOCX.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DEFAULT: 'Something went wrong. Please try again.'
};

// Map error codes/status to user-friendly messages
function getErrorMessage(error) {
  // Network/connection errors
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return ERROR_MESSAGES.TIMEOUT;
    }
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  const status = error.response?.status;
  const serverError = error.response?.data?.error;
  
  // Use server-provided message if available and user-friendly
  if (serverError?.message && !serverError.message.includes('Error:')) {
    return serverError.message;
  }

  // Map status codes
  switch (status) {
    case 400:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 422:
      return ERROR_MESSAGES.PARSE_ERROR;
    case 429:
      return ERROR_MESSAGES.RATE_LIMITED;
    case 503:
      if (serverError?.code === 'AI_ERROR') {
        return ERROR_MESSAGES.AI_ERROR;
      }
      return ERROR_MESSAGES.SERVER_ERROR;
    case 500:
    default:
      return ERROR_MESSAGES.SERVER_ERROR;
  }
}

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
    const message = getErrorMessage(error);
    const code = error.response?.data?.error?.code || 'UNKNOWN_ERROR';
    const status = error.response?.status || 0;

    // Auto logout on 401 (token expired/invalid)
    if (status === 401) {
      localStorage.removeItem("token");
      // Optionally redirect - but let the calling code handle this
      // window.location.href = "/login";
    }

    // Create enriched error object
    const enrichedError = {
      message,
      code,
      status,
      isNetworkError: !error.response,
      isAuthError: status === 401 || status === 403,
      isServerError: status >= 500,
      original: error
    };

    return Promise.reject(enrichedError);
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

//RS CHANGED 11 JAN to support file upload
export const analyzeResume = (formData) =>
  api.post("/resume/analyze", formData).then((res) => res.data);

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

// Get AI-generated analysis summary
export const getAnalysisSummary = (jdId) => {
  return api
    .get(`/resume/match/${jdId}/summary`)
    .then((res) => res.data);
};


// Roadmap
export const getRoadmap = (jdId) =>
  api.get(`/roadmap/${jdId}`).then((res) => res.data);

// Dashboard (PROTECTED)
export const getDashboardData = () =>
  api.get("/dashboard/summary").then((res) => res.data);

// User Profile
export const getUserProfile = () =>
  api.get("/auth/profile").then((res) => res.data);

export const updateUserProfile = (data) =>
  api.put("/auth/profile", data).then((res) => res.data);

export const changePassword = (currentPassword, newPassword) =>
  api.post("/auth/change-password", { currentPassword, newPassword }).then((res) => res.data);

export const deleteAccount = (password) =>
  api.delete("/auth/account", { data: { password } }).then((res) => res.data);

export default api;
