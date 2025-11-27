export const API_BASE_URL = "http://localhost:8095/api";


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8095/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
