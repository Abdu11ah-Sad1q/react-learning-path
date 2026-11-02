import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Page not found</h1>
      <p>This page does not exist.</p>
      <Link to="/" className="text-blue-600">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
