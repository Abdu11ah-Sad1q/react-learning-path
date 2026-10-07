import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import SectionGroup from "./sectionGroup";
import { SECTIONS } from "./sections";

export default function App() {
  const items = useSelector((state) => state.groceries.items);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Grocery List</h1>
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
