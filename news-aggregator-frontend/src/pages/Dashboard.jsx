import { useContext, useEffect, useState } from "react";
import { getTopNews, searchNews } from "../api/newsApi";
import { saveArticle } from "../api/savedApi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ArticleCard from "../components/ArticleCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadTopNews();
  }, []);

  const loadTopNews = async () => {
    setLoading(true);
    const data = await getTopNews();
    setArticles(data?.articles || []);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await searchNews(query);
    setArticles(data?.articles || []);
    setLoading(false);
  };

  const handleSave = async (article) => {
    await saveArticle({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source?.name || "",
      publishedAt: article.publishedAt,
      content: article.content,
    });
    // (you can add a toast/snackbar here later)
  };

  const { token } = useContext(AuthContext);
const navigate = useNavigate();

useEffect(() => {
  if (!token) {
    navigate("/login");
  }
}, [token]);


  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Header + search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold">News Dashboard</h1>
            <p className="text-sm text-slate-300/70">
              Live headlines from your Spring Boot backend (NewsAPI).
            </p>
          </div>

          <div className="flex gap-2">
            <input
              className="px-4 py-2 rounded-lg bg-black/40 border border-slate-700 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search news (e.g. cricket, AI)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-medium"
            >
              Search
            </button>
            <button
              onClick={loadTopNews}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs md:text-sm"
            >
              Top headlines
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center my-10">
            <Loader />
          </div>
        )}

        {/* Articles grid */}
        {!loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <ArticleCard
                key={i}
                article={article}
                onSave={() => handleSave(article)}
              />
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <p className="text-center text-slate-400 mt-10">
            No articles to show. Try a different search query.
          </p>
        )}
      </main>
    </div>
  );
}
