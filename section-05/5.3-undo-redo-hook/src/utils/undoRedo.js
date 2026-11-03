// The rules of undo/redo, written ONCE.
// No React here. Just plain functions.
// A history object looks like: { past: [], present: ..., future: [] }

// We only remember the last 50 changes (the task needs at least 20).
const MAX_HISTORY = 50;

// Make a starting history.
// initialValue = the data the app starts with (e.g. [] for an empty list)
export function createHistory(initialValue) {
  return { past: [], present: initialValue, future: [] };
}

// NEW CHANGE:
// old present goes to the END of past, new data becomes present,
// future is cleared.
export function recordChange(history, newPresent) {
  return {
    past: [...history.past, history.present].slice(-MAX_HISTORY),
    present: newPresent,
    future: [],
  };
}

// UNDO:
// last item of past becomes present,
// old present goes to the START of future.
export function undoHistory(history) {
  if (history.past.length === 0) return history; // nothing to undo
  return {
    past: history.past.slice(0, -1),
    present: history.past[history.past.length - 1],
    future: [history.present, ...history.future],
  };
}

// REDO:
// first item of future becomes present,
// old present goes to the END of past.
export function redoHistory(history) {
  if (history.future.length === 0) return history; // nothing to redo
  return {
    past: [...history.past, history.present],
    present: history.future[0],
    future: history.future.slice(1),
  };
}
