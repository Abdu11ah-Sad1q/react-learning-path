import { useDispatch } from "react-redux";
import { toggleBought } from "./groceriesSlice";

export default function SectionGroup({ title, items }) {
  const dispatch = useDispatch();

  // bought items go to the bottom of the section
  const notBought = items.filter((item) => !item.bought);
  const bought = items.filter((item) => item.bought);
  const sortedItems = [...notBought, ...bought];

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">{title}</h2>
      <ul className="space-y-1">
        {sortedItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-2 py-1 ${
              item.bought ? "text-gray-400 line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={item.bought}
              onChange={() => dispatch(toggleBought(item.id))}
            />
            <span className="flex-1">{item.name}</span>
            <span>{item.quantity}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
