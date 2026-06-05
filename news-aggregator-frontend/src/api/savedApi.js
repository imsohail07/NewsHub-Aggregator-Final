import API from "./apiConfig";

// ✅ GET all saved articles
export async function getSavedArticles() {
  try {
    const res = await API.get("/saved-articles");
    return res.data;
  } catch (err) {
    console.error("Error loading saved articles:", err);
    return [];
  }
}

// ✅ SAVE an article (✅ WITH PROPER FIELD MAPPING & AUTHORIZED INSTANCE)
export async function saveArticle(article) {
  try {
    const payload = {
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source?.name || article.source || "Unknown",
      imageUrl: article.urlToImage || article.imageUrl,
      publishedAt: article.publishedAt,
    };

    const res = await API.post("/saved-articles", payload);
    return res.data;
  } catch (err) {
    console.error("❌ Error saving article:", err);
    throw err;
  }
}

// ✅ DELETE a saved article
export async function removeSavedArticle(id) {
  try {
    const res = await API.delete(`/saved-articles/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error removing saved article:", err);
    throw err;
  }
}
