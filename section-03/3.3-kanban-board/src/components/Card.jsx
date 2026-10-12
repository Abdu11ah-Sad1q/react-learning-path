export default function Card({ card }) {
  return (
    <div className="bg-white rounded p-2 shadow">
      <p className="font-medium">{card.title}</p>
      {card.description && (
        <p className="text-sm text-gray-600">{card.description}</p>
      )}
    </div>
  );
}
