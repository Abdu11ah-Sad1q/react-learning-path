import { useSelector } from "react-redux";
import AddForm from "./AddForm";

export default function App() {
  const items = useSelector((state) => state.groceries.items);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Grocery List</h1>
      <AddForm />

      <ul className="mt-6 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between border-b py-1">
            <span>{item.name}</span>
            <span>
              {item.quantity} · {item.section}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
