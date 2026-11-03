import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/groceriesSlice";
import { SECTIONS } from "../sections";

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
      // Output: "c9a646d3-9c61-4cd7-9f4a-9c768652d5b6"
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

/*
Tumhare rules ka check

New add:

past ← purana present (add)
present = new
future = clear

Undo: 

future ← purana present (aage add)
present = past ka aakhri item

Redo: 

past ← purana present (add)
present = future ka pehla item

(Redo mein future se woh ek item nikal jata hai, baaki rehte hain.)

Future clear kyun karte hain? Asaan alfaaz mein

Chrome wali example yaad karo.

Tum ye websites par gaye: Google → YouTube → Facebook

Tumne Back dabaya, ab tum YouTube par ho. Forward mein Facebook hai.

past: [Google]   present: YouTube   future: [Facebook]
Ab tum YouTube se Instagram khol dete ho. Ab tumhari kahani yeh ban gayi:

Google → YouTube → Instagram

Facebook is nayi kahani ka hissa hi nahi hai.
Agar Forward dabao to Facebook aaye, yeh ajeeb aur ghalat hoga,
kyunke tum Instagram par ho,
aur Instagram ke baad Facebook kabhi aaya hi nahi. */
