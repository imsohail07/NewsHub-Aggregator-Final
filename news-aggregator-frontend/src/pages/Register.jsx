import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("User already exists or server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleRegister} className="bg-gray-900 p-8 rounded-xl w-96 space-y-5">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 rounded text-black"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded text-black"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded text-black"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-purple-600 p-2 rounded hover:bg-purple-700">
          Register
        </button>
      </form>
    </div>
  );
}
