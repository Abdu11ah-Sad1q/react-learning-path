import { useEffect } from "react";

// Listens for Ctrl+Z, Ctrl+Y and Ctrl+Shift+Z (Cmd on Mac).
// onUndo / onRedo = the functions to call.
export function useUndoRedoShortcuts(onUndo, onRedo) {
  useEffect(() => {
    function handleKeyDown(event) {
      // If the user is typing in a text box, do nothing:
      // the browser already undoes typing there.
      // Checkboxes are also <input>, but they are NOT text boxes,
      // so we allow the shortcut there.
      const tag = event.target.tagName;
      const isTextBox =
        tag === "TEXTAREA" ||
        (tag === "INPUT" && event.target.type !== "checkbox");
      if (isTextBox) return;

      // Was Ctrl pressed? (metaKey = Cmd on Mac)
      const ctrl = event.ctrlKey || event.metaKey;
      if (!ctrl) return;

      const key = event.key.toLowerCase();

      if (key === "z" && !event.shiftKey) {
        // Ctrl+Z -> undo
        event.preventDefault();
        onUndo();
      } else if (key === "y" || (key === "z" && event.shiftKey)) {
        // Ctrl+Y or Ctrl+Shift+Z -> redo
        event.preventDefault();
        onRedo();
      }
    }

    // Start listening to the keyboard.
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: stop listening when the component is removed.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUndo, onRedo]);
}
