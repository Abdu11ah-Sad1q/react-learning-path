import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-3xl mx-auto flex justify-between">
        <h1 className="font-bold text-xl">My Blog</h1>
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/posts">All Posts</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
