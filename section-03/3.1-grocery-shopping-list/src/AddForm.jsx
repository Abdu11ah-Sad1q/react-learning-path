import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./groceriesSlice";
import { SECTIONS } from "./sections";

export default function AddForm() {
  const dispatch = useDispatch();

  // local state: only this form cares about these
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [section, setSection] = useState(SECTIONS[0]);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const qty = Number(quantity);

    if (name.trim() === "") {
      setError("Please enter an item name.");
      return;
    }
    if (!Number.isInteger(qty) || qty < 1) {
      setError("Quantity must be a whole number, 1 or more.");
      return;
    }

    dispatch(
      addItem({
        id: crypto.randomUUID(),
        name: name.trim(),
        quantity: qty,
        section,
      }),
    );

    setName("");
    setQuantity("1");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="border rounded px-2 py-1 w-16"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <select
          className="border rounded px-2 py-1 flex-1"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          {SECTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white rounded px-4 py-1">
          Add
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
