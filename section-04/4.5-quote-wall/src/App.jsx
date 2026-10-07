import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";

const API = "https://dummyjson.com";

// Only fetches data. It doesn't touch any state.
async function getQuotes(skip) {
  const res = await fetch(`${API}/quotes?limit=10&skip=${skip}`);
  return await res.json();
}

async function getRandomQuote() {
  const res = await fetch(`${API}/quotes/random`);
  return await res.json();
}

export default function App() {
  // ----- Part A: quote list -----
  const [quotes, setQuotes] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true); // true: first load starts on mount
  const [error, setError] = useState("");

  // ----- Part B: featured quote -----
  const [featured, setFeatured] = useState(null);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(document.hidden);

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
      // Only add quotes whose id we don't have yet (prevents duplicates)
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

  // Watch if the tab is hidden or visible
  useEffect(() => {
    function handleVisibility() {
      setTabHidden(document.hidden);
    }

    document.addEventListener("visibilitychange", handleVisibility);

    // cleanup: remove the listener when the component goes away
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Change the featured quote every 10 seconds
  // It does nothing when paused or when the tab is hidden
  useEffect(() => {
    if (paused || tabHidden) return;

    async function loadRandom() {
      try {
        const data = await getRandomQuote();
        setFeatured(data); // after await, so no cascade
      } catch (err) {
        console.log("Could not load random quote");
      }
    }

    loadRandom(); // show one right away
    const timer = setInterval(loadRandom, 10000);

    // cleanup: stop the timer when paused / hidden / page closed
    return () => clearInterval(timer);
  }, [paused, tabHidden]);

  const allLoaded = total !== null && quotes.length >= total;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quote Wall</h1>

      {/* Featured quote */}
      <div className="border p-4 mb-6">
        <h2 className="font-bold mb-2">Featured quote</h2>
        {featured ? (
          <QuoteCard quote={featured.quote} author={featured.author} />
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={() => setPaused(!paused)}
          className="mt-3 px-3 py-1 border bg-gray-200"
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Quote list */}
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
