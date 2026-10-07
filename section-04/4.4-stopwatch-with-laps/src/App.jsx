import { useState } from "react";
import Stopwatch from "./components/Stopwatch";

export default function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <button
        className="mb-6 px-4 py-2 rounded bg-gray-800 text-white"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Hide" : "Show"} stopwatch
      </button>
      {visible && <Stopwatch />}
    </div>
  );
}
