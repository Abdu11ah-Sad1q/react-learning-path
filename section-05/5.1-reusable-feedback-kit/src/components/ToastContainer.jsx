import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../slices/toastSlice";

const styles = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500",
  info: "bg-blue-600",
};

export default function ToastContainer() {
  const toasts = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${styles[t.type]} text-white px-4 py-3 rounded shadow flex items-center gap-4`}
        >
          <span>{t.message}</span>
          <button
            onClick={() => dispatch(removeToast(t.id))}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
