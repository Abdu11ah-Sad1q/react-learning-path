import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJson } from "../api";
import { useLanguage } from "../LanguageContext";

function PostPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const postData = await getJson("/posts/" + id);

      if (!postData) {
        setPost(null);
        setLoading(false);
        return;
      }

      const userData = await getJson("/users/" + postData.userId);
      const commentData = await getJson("/comments/post/" + id);

      setPost(postData);
      setAuthor(userData);
      setComments(commentData ? commentData.comments : []);
      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  if (!post) {
    return <h1 className="text-2xl font-bold">{t("postNotFound")}</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

      {author && (
        <p className="mb-4">
          {t("by")}{" "}
          <Link to={"/authors/" + author.id} className="text-blue-600">
            {author.firstName} {author.lastName}
          </Link>
        </p>
      )}

      <p className="mb-6">{post.body}</p>

      <h2 className="text-xl font-bold mb-2">
        {t("comments")} ({comments.length})
      </h2>
      {comments.length === 0 && <p>{t("noComments")}</p>}
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded p-3 mb-2">
          <p className="font-bold">{comment.user.username}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostPage;
