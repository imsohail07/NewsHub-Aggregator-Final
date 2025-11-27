import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="w-full py-4 border-b border-white/6">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#7c3aed] to-[#f472b6] flex items-center justify-center text-black font-bold shadow">
            N
          </div>
          <span className="font-semibold text-lg">NewsHub</span>
        </Link>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to="/saved">Saved</Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="text-red-400"
              >
                Logout
              </button>
              <FaUserCircle className="text-2xl" />
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
