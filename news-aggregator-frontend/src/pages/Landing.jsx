import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [step, setStep] = useState("zoom"); // "zoom", "greet"
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // 1. Calculate time-of-day greeting
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // 2. Zoom phase (1.8s duration)
    const zoomTimer = setTimeout(() => {
      setStep("greet");
    }, 1800);

    // 3. Greeting phase (1.8s duration) then redirect to news
    const redirectTimer = setTimeout(() => {
      navigate("/dashboard");
    }, 3600);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white overflow-hidden relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_55%)] pointer-events-none" />

      {step === "zoom" && (
        <div className="text-center animate-fade-in-zoom">
          <h1 className="text-6xl md:text-8xl font-black tracking-widest bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent filter drop-shadow-2xl">
            NewsHub
          </h1>
          <p className="text-xs text-gray-500 tracking-[0.6em] uppercase mt-4 font-semibold">
            SYSTEMIZED NEWS
          </p>
        </div>
      )}

      {step === "greet" && (
        <div className="text-center animate-fade-in space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            {greeting}
          </h2>
          <p className="text-sm text-purple-400 tracking-wider font-semibold uppercase animate-pulse">
            Opening Dashboard...
          </p>
        </div>
      )}
    </div>
  );
}
