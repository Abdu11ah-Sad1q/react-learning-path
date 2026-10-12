import { useState } from "react";
import Card from "./Card";
export default function Column({ name, cards, onAdd, onMove }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") return; // title is required
    onAdd(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <div className="bg-gray-100 rounded p-3">
      {/* Count is just the length of the cards this column received */}
      <h2 className="font-semibold mb-3">
        {name} ({cards.length})
      </h2>

      {/* The add form only appears in To do */}
      {name === "To do" && (
        <form onSubmit={handleSubmit} className="mb-3 flex flex-col gap-2">
          <input
            className="border rounded p-1"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border rounded p-1"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="bg-blue-500 text-white rounded p-1">Add</button>
        </form>
      )}

      <div className="flex flex-col gap-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} columnName={name} onMove={onMove} />
        ))}
      </div>
    </div>
  );
}
