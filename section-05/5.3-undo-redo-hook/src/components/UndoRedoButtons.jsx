// Only shows two buttons. No logic of its own.
// onUndo / onRedo = functions to run on click
// canUndo / canRedo = true/false, used to disable the buttons
function UndoRedoButtons({ onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        className="border rounded px-3 py-1 disabled:opacity-40"
        onClick={onUndo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        className="border rounded px-3 py-1 disabled:opacity-40"
        onClick={onRedo}
        disabled={!canRedo}
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedoButtons;
