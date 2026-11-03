import { useState, useEffect } from "react";
import { getJson } from "../api";
import { useLanguage } from "../LanguageContext";
import PostCard from "../components/PostCard";

function Home() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJson("/posts?limit=5&sortBy=id&order=desc").then((data) => {
      if (data) {
        setPosts(data.posts);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("latestPosts")}</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;