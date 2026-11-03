import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostPage from "./pages/PostPage";
import AuthorPage from "./pages/AuthorPage";
import Login from "./pages/Login";
import ReadingList from "./pages/ReadingList";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/authors/:id" element={<AuthorPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/reading-list"
          element={
            <ProtectedRoute>
              <ReadingList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
