import { Link } from "react-router-dom";
export default function NotFound(){
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="text-gray-400 mt-4">Page not found</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-[#7c3aed] rounded-lg">Go Home</Link>
    </div>
  );
}
