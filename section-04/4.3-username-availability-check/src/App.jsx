import { useState, useEffect } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  // the result remembers which text it was for
  const [result, setResult] = useState({ text: "", status: "idle" });

  const text = username.trim();
  const isTooShort = text.length < 3;

  // derived during render:
  // too short -> nothing, result is for different text -> "checking", else show the result
  let status;
  if (isTooShort) status = "idle";
  else if (result.text !== text) status = "checking";
  else status = result.status;

  useEffect(() => {
    if (isTooShort) return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/users/search?q=${text}`,
          {
            signal: controller.signal,
          },
        );
        const data = await res.json();
        const isTaken = data.users.some((user) => user.username === text);
        setResult({ text, status: isTaken ? "taken" : "available" });
      } catch (err) {
        if (err.name !== "AbortError") {
          setResult({ text, status: "error" });
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text, isTooShort]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <label className="block text-white mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Try emilys"
          className="w-full rounded-lg border border-gray-500 bg-transparent px-3 py-2 text-white outline-none focus:border-white"
        />

        <p className="mt-2 h-5 text-sm">
          {status === "checking" && (
            <span className="text-gray-400">Checking…</span>
          )}
          {status === "available" && (
            <span className="text-green-500">Available</span>
          )}
          {status === "taken" && <span className="text-red-500">Taken</span>}
          {status === "error" && (
            <span className="text-gray-400">Something went wrong</span>
          )}
        </p>
      </div>
    </div>
  );
}
