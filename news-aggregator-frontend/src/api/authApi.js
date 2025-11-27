import axios from "axios";

const BASE_URL = "http://localhost:8095/api/auth";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, {
    email,
    password
  });
  return res.data; // ✅ This is the JWT token
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/register`, userData);
  return res.data;
};
