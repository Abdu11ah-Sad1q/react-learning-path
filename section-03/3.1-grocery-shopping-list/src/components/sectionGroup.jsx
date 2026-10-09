import ItemRow from "./ItemRow";

export default function SectionGroup({ title, items }) {
  // bought items go to the bottom of the section
  const notBought = items.filter((item) => !item.bought);
  const bought = items.filter((item) => item.bought);
  const sortedItems = [...notBought, ...bought];

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">{title}</h2>
      <ul className="space-y-1">
        {sortedItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
