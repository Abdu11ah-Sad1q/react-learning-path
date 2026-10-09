import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleBought, renameItem } from "../slices/groceriesSlice";

export default function ItemRow({ item }) {
  const dispatch = useDispatch();

  // local state: only this row cares about these
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.name);

  function startEditing() {
    setDraft(item.name); // always start from the current name
    setEditing(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      dispatch(renameItem({ id: item.id, name: draft }));
      setEditing(false);
    } else if (e.key === "Escape") {
      setEditing(false); // nothing dispatched, old name stays
    }
  }

  return (
    <li
      className={`flex items-center gap-2 py-1 ${
        item.bought ? "text-gray-400 line-through" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={item.bought}
        onChange={() => dispatch(toggleBought(item.id))}
      />

      {editing ? (
        <input
          autoFocus
          className="border rounded px-1 flex-1 text-black no-underline"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <span className="flex-1 cursor-pointer" onDoubleClick={startEditing}>
          {item.name}
        </span>
      )}

      <span>{item.quantity}</span>
    </li>
  );
}
