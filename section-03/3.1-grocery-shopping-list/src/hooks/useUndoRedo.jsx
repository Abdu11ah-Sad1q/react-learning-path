import { useState, useCallback, useEffect } from "react";
const MAX_HISTORY = 50;

export function useUndoRedo(initialValue) {
  const [history, setHistory] = useState({
    past: [],
    present: initialValue,
    future: [],
  });

  // Use this instead of the normal setState.
  const set = useCallback((newValue) => {
    setHistory((current) => {
      // newValue can be a normal value:   set([1, 2, 3])
      // or a function:                    set(old => [...old, 4])
      // This line handles both cases and gives us the final new data.
      const value =
        typeof newValue === "function" ? newValue(current.present) : newValue;

      return {
        past: [...current.past, current.present].slice(-MAX_HISTORY),
        present: value,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((current) => {
      // If past is empty, there is nothing to undo.
      if (current.past.length === 0) return current;

      const previous = current.past[current.past.length - 1];

      return {
        past: current.past.slice(0, -1),
        present: previous,
        //  Put the old present at the START of future,
        //    so we can redo it later.
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((current) => {
      // If future is empty, there is nothing to redo.
      if (current.future.length === 0) return current;

      // Take the FIRST item of future (the most recent undo).
      const next = current.future[0];

      return {
        // 1. Put the old present at the END of past.
        past: [...current.past, current.present],

        // 2. The item from future becomes the present.
        present: next,

        // 3. Remove that first item from future.
        future: current.future.slice(1),
      };
    });
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      const tag = event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const ctrl = event.ctrlKey || event.metaKey;
      if (!ctrl) return; // no Ctrl, so ignore this key

      // Make the key lowercase so "Z" and "z" both work.
      const key = event.key.toLowerCase();

      if (key === "z" && !event.shiftKey) {
        // Ctrl+Z -> undo
        event.preventDefault(); // stop the browser's own action
        undo();
      } else if (key === "y" || (key === "z" && event.shiftKey)) {
        // Ctrl+Y or Ctrl+Shift+Z -> redo
        event.preventDefault();
        redo();
      }
    }

    // Start listening to the keyboard.
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: stop listening when the component is removed.
    // This prevents duplicate listeners.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  //  undo aur redo useCallback mein khali dependency ke saath hain,
  //  isliye stable hain. Effect sirf ek baar chalta hai.
  //  Dependency array mein unhein React ke rules ke mutabiq likha hai.
  return {
    state: history.present,
    set,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
