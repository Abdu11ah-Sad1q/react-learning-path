import { useState } from "react";
import Column from "./components/Column";

const COLUMNS = ["To do", "Doing", "Done"];

export default function App() {
  // All board data lives here: one array of cards
  const [cards, setCards] = useState([]);

  function addCard(title, description) {
    const newCard = {
      id: Date.now(), // simple unique id
      title,
      description,
      column: "To do", // new cards always start in To do
    };
    setCards([...cards, newCard]);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((name) => (
          <Column
            key={name}
            name={name}
            cards={cards.filter((c) => c.column === name)}
            onAdd={addCard}
          />
        ))}
      </div>
    </div>
  );
}
