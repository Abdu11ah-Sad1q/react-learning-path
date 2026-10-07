import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";

const API = "https://dummyjson.com";

// Only fetches data. It doesn't touch any state.
async function getQuotes(skip) {
  const res = await fetch(`${API}/quotes?limit=10&skip=${skip}`);
  return await res.json();
}

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true); // true: first load starts on mount
  const [error, setError] = useState("");

  // First 10 quotes, when the page opens
  useEffect(() => {
    async function loadFirst() {
      try {
        const data = await getQuotes(0);
        setTotal(data.total); // after await, so no cascade
        setQuotes(data.quotes);
      } catch (err) {
        setError("Could not load quotes.");
      }
      setLoading(false);
    }

    loadFirst();
  }, []);

  // Next 10 quotes, when the button is clicked
  async function handleLoadMore() {
    setLoading(true);
    setError("");
    try {
      const data = await getQuotes(quotes.length);
      setTotal(data.total);
      setQuotes((old) => {
        const newOnes = data.quotes.filter(
          (q) => !old.some((o) => o.id === q.id),
        );
        return [...old, ...newOnes];
      });
    } catch (err) {
      setError("Could not load quotes.");
    }
    setLoading(false);
  }

  const allLoaded = total !== null && quotes.length >= total;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quote Wall</h1>

      <h2 className="font-bold mb-2">All quotes ({quotes.length})</h2>
      {quotes.map((q) => (
        <QuoteCard key={q.id} quote={q.quote} author={q.author} />
      ))}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <div className="mt-4">
        {allLoaded ? (
          <p>No more quotes</p>
        ) : (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 border bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
