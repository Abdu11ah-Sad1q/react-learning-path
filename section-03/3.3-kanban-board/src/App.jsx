import { useState } from "react";
import Column from "./components/Column";

const COLUMNS = ["To do", "Doing", "Done"];
const MAX_DOING = 3;

export default function App() {
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState(""); // warning text

  function addCard(title, description) {
    const newCard = { id: Date.now(), title, description, column: "To do" };
    setCards([...cards, newCard]);
  }

  // direction is -1 (left) or +1 (right)
  function moveCard(id, direction) {
    const card = cards.find((c) => c.id === id);
    const target = COLUMNS[COLUMNS.indexOf(card.column) + direction];

    const doingCount = cards.filter((c) => c.column === "Doing").length;
    if (target === "Doing" && doingCount >= MAX_DOING) {
      setMessage("Doing is full (max 3 cards). Finish one first.");
      return; // stop here, card does not move
    }

    setMessage("");
    setCards(cards.map((c) => (c.id === id ? { ...c, column: target } : c)));
  }

  function deleteCard(id) {
    if (window.confirm("Delete this card?")) {
      setCards(cards.filter((c) => c.id !== id));
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>

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
