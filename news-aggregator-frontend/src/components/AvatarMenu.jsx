import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="text-3xl text-gray-700 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-3 w-40">
          <Link
            to="/profile"
            className="block py-2 px-3 hover:bg-gray-100 rounded-lg"
          >
            Profile
          </Link>

          <button className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
