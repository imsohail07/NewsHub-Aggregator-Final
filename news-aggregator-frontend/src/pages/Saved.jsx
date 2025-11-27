import { useEffect, useState } from "react";
import { getSavedArticles, removeSavedArticle } from "../api/savedApi";

export default function Saved() {
  const [saved, setSaved] = useState([]);

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
    <div style={{ padding: "30px" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>Saved Articles</h1>

      {saved.length === 0 ? (
        <p style={{ color: "gray" }}>No saved articles yet.</p>
      ) : (
        saved.map((article) => (
          <div
            key={article.id}
            style={{
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
              background: "#0f172a",
            }}
          >
            <h3 style={{ color: "white" }}>{article.title}</h3>
            <p style={{ color: "#ccc" }}>{article.description}</p>

            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#60a5fa" }}
            >
              Read full article
            </a>

            <br />

            <button
              onClick={() => handleDelete(article.id)}
              style={{
                marginTop: "10px",
                background: "crimson",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
