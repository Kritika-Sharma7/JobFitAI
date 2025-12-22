import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const analyzeJD = ({ jobDescription }) => {
  return axios.post(`${API_BASE}/analyze-jd`, {
    jobDescription,
  });
};
