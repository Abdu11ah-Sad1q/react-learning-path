import { useDispatch } from "react-redux";
import { showToast } from "../slices/toastSlice";

export function useToast() {
  const dispatch = useDispatch();

  return {
    success: (msg) => dispatch(showToast("success", msg)),
    error: (msg) => dispatch(showToast("error", msg)),
    warning: (msg) => dispatch(showToast("warning", msg)),
    info: (msg) => dispatch(showToast("info", msg)),
  };
}
