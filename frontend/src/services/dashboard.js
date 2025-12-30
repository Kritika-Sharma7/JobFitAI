import api from "./api";

export const fetchDashboardData = async () => {
  const res = await api.get("/dashboard/summary");
  return res.data;
};
