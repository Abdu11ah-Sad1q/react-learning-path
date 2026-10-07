export default function SectionGroup({ title, items }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold border-b-2 pb-1 mb-2">{title}</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between py-1">
            <span>{item.name}</span>
            <span>{item.quantity}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
