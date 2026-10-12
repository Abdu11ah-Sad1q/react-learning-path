export default function Card({ card, columnName, onMove }) {
  return (
    <div className="bg-white rounded p-2 shadow">
      <p className="font-medium">{card.title}</p>
      {card.description && (
        <p className="text-sm text-gray-600">{card.description}</p>
      )}

      <div className="flex gap-2 mt-2">
        {/* No "left" in To do */}
        {columnName !== "To do" && (
          <button
            className="border rounded px-2"
            onClick={() => onMove(card.id, -1)}
          >
            ←
          </button>
        )}
        {/* No "right" in Done */}
        {columnName !== "Done" && (
          <button
            className="border rounded px-2"
            onClick={() => onMove(card.id, 1)}
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}
