import { useToast } from "./hooks/useToast";

function DeepButton() {
  // Nothing was passed down to this component, yet it can show a toast
  const toast = useToast();
  return (
    <button
      onClick={() => toast.success("Saved!")}
      className="px-3 py-2 bg-gray-800 text-white rounded"
    >
      Success from a nested component
    </button>
  );
}

export default function App() {
  const toast = useToast();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Feedback Kit</h1>

      <section className="space-x-2">
        <h2 className="font-semibold mb-2">Toasts</h2>
        <button
          onClick={() => toast.success("Success!")}
          className="px-3 py-2 bg-green-600 text-white rounded"
        >
          Success
        </button>
        <button
          onClick={() => toast.error("Something failed")}
          className="px-3 py-2 bg-red-600 text-white rounded"
        >
          Error
        </button>
        <button
          onClick={() => toast.warning("Careful!")}
          className="px-3 py-2 bg-yellow-500 text-white rounded"
        >
          Warning
        </button>
        <button
          onClick={() => toast.info("FYI")}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Info
        </button>
      </section>

      <DeepButton />
    </div>
  );
}
