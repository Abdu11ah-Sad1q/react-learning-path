import { useState, useEffect } from "react";
import { getJson } from "../api";
import { useAuth } from "../AuthContext";
import { useLanguage } from "../LanguageContext";
import { getReadingList } from "../readingList";
import PostCard from "../components/PostCard";

function ReadingList() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = getReadingList(user);

    // fetch every saved post, then keep the ones that were found
    Promise.all(ids.map((id) => getJson("/posts/" + id))).then((results) => {
      setPosts(results.filter((post) => post !== null));
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("readingList")}</h1>
      {posts.length === 0 && <p>{t("readingListEmpty")}</p>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default ReadingList;
