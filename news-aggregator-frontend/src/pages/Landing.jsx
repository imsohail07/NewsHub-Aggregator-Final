import { Link } from "react-router-dom";

export default function Landing(){
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        <img src="/favicon.svg" alt="logo" className="mx-auto w-20 mb-6" />
        <h1 className="text-5xl font-extrabold mb-4" style={{textShadow:"0 6px 30px rgba(124,58,237,0.18)"}}>NewsHub</h1>
        <p className="text-lg text-gray-300 mb-8">Real-time headlines, curated categories, save & read later — all in a beautiful interface.</p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] shadow-lg">Explore News</Link>
        </div>
      </div>
    </div>
  );
}
