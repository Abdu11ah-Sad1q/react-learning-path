import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJson } from "../api";
import { useLanguage } from "../LanguageContext";
import PostCard from "../components/PostCard";

function AuthorPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const userData = await getJson("/users/" + id);

      if (!userData) {
        setAuthor(null);
        setLoading(false);
        return;
      }

      const postData = await getJson("/posts/user/" + id);

      setAuthor(userData);
      setPosts(postData ? postData.posts : []);
      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  if (!author) {
    return <h1 className="text-2xl font-bold">{t("authorNotFound")}</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {author.firstName} {author.lastName}
      </h1>
      <p className="mb-6">
        @{author.username} - {author.email}
      </p>

      <h2 className="text-xl font-bold mb-2">{t("postsByAuthor")}</h2>
      {posts.length === 0 && <p>{t("noAuthorPosts")}</p>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default AuthorPage;
