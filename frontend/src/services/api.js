import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const analyzeJD = (data) =>
  API.post("/api/analyze-jd", data);
