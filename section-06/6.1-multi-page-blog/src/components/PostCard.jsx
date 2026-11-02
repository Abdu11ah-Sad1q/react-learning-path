import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="font-bold text-lg">
        <Link to={"/posts/" + post.id} className="text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p>{post.body.slice(0, 100)}...</p>
    </div>
  );
}

export default PostCard;
