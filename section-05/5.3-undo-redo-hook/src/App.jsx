import { useState } from "react";
import Column from "./components/Column";
import UndoRedoButtons from "./components/UndoRedoButtons";
import { useUndoRedoShortcuts } from "./hooks/useUndoRedoShortcuts";
import {
  createHistory,
  recordChange,
  undoHistory,
  redoHistory,
} from "./utils/undoRedo";

const COLUMNS = ["To do", "Doing", "Done"];
const MAX_DOING = 3;

export default function App() {
  // Before: const [cards, setCards] = useState([]);
  // Now we store the whole history: { past: [], present: [], future: [] }
  const [history, setHistory] = useState(createHistory([]));
  const [message, setMessage] = useState(""); // warning text

  // "present" is the list of cards shown on screen
  const cards = history.present;

  // Buttons are enabled only if past / future are not empty
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  // A small helper: save a new list of cards as a NEW change
  function changeCards(newCards) {
    setHistory((current) => recordChange(current, newCards));
  }

  function handleUndo() {
    setHistory((current) => undoHistory(current));
    setMessage(""); // an old warning no longer makes sense
  }

  function handleRedo() {
    setHistory((current) => redoHistory(current));
    setMessage("");
  }

  // Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z
  useUndoRedoShortcuts(handleUndo, handleRedo);

  function addCard(title, description) {
    const newCard = { id: Date.now(), title, description, column: "To do" };
    changeCards([...cards, newCard]);
  }

  // direction is -1 (left) or +1 (right)
  function moveCard(id, direction) {
    const card = cards.find((c) => c.id === id);
    const target = COLUMNS[COLUMNS.indexOf(card.column) + direction];

    const doingCount = cards.filter((c) => c.column === "Doing").length;
    if (target === "Doing" && doingCount >= MAX_DOING) {
      setMessage("Doing is full (max 3 cards). Finish one first.");
      return; // stop here, nothing is saved in history
    }

    setMessage("");
    changeCards(cards.map((c) => (c.id === id ? { ...c, column: target } : c)));
  }

  function deleteCard(id) {
    if (window.confirm("Delete this card?")) {
      changeCards(cards.filter((c) => c.id !== id));
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>

      <UndoRedoButtons
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      {message && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{message}</p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((name) => (
          <Column
            key={name}
            name={name}
            cards={cards.filter((c) => c.column === name)}
            onAdd={addCard}
            onMove={moveCard}
            onDelete={deleteCard}
          />
        ))}
      </div>
    </div>
  );
}
