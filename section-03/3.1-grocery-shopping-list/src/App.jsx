import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import SectionGroup from "./sectionGroup";
import { SECTIONS } from "./sections";

export default function App() {
  const items = useSelector((state) => state.groceries.items);

  // calculated every render, never stored
  const boughtCount = items.filter((item) => item.bought).length;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1">Grocery List</h1>
      <p className="text-gray-500 mb-4">
        {boughtCount} of {items.length} items bought
      </p>
      <AddForm />

      {SECTIONS.map((section) => {
        const sectionItems = items.filter((item) => item.section === section);

        // empty sections are hidden
        if (sectionItems.length === 0) return null;

        return (
          <SectionGroup key={section} title={section} items={sectionItems} />
        );
      })}
    </div>
  );
}
