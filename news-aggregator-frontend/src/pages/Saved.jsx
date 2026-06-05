import { useEffect, useState } from "react";
import { getSavedArticles, removeSavedArticle } from "../api/savedApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Saved() {
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();

  // ✅ LOAD SAVED ARTICLES FROM BACKEND
  useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    const data = await getSavedArticles();
    setSaved(data);
  };

  // ✅ DELETE FROM BACKEND + UI
  const handleDelete = async (id) => {
    await removeSavedArticle(id);
    loadSaved(); // refresh list
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back navigation and header */}
        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-semibold transition w-fit"
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent w-fit">
              Saved Articles
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Browse through the articles you've saved for offline reading.
            </p>
          </div>
        </div>

        {saved.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/40 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-500">No saved articles yet.</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-sm font-semibold rounded-lg transition duration-200"
            >
              Browse Articles
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {saved.map((article) => (
              <div
                key={article.id}
                className="bg-gray-900/60 rounded-2xl p-5 border border-gray-800 flex flex-col justify-between hover:border-purple-600/45 transition duration-300 shadow-lg"
              >
                <div className="space-y-3">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-44 object-cover rounded-xl border border-gray-800"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                  <div className="text-xs text-purple-400 font-semibold tracking-wider uppercase">
                    {article.source || "News Source"}
                  </div>
                  <h3 className="font-bold text-lg leading-snug line-clamp-2 hover:text-purple-300 transition">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 font-semibold hover:underline"
                  >
                    Read Article
                  </a>

                  <button
                    onClick={() => handleDelete(article.id)}
                    className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/30 rounded-lg text-xs font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
