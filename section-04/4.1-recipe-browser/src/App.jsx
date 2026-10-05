import { useState, useEffect } from "react";

const RECIPES_URL = "https://dummyjson.com/recipes";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const res = await fetch(RECIPES_URL);

        if (!res.ok) {
          throw new Error("Server error " + res.status);
        }

        const data = await res.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError("Could not load recipes. " + err.message);
      }

      setLoading(false);
    }

    loadRecipes();
  }, [attempt]);

  function handleTryAgain() {
    setLoading(true);
    setError("");
    setAttempt(attempt + 1);
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recipe Browser</h1>

      {loading && <p>Loading recipes...</p>}

      {error && (
        <div className="border border-red-400 bg-red-100 p-4">
          <p className="text-red-700 mb-2">{error}</p>
          <button
            onClick={handleTryAgain}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && <p>Loaded {recipes.length} recipes</p>}
    </div>
  );
}

export default App;
