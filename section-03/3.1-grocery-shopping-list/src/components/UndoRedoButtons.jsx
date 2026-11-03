// This component only shows two buttons. It has no logic of its own.
// The parent app gives it 4 props:
//   onUndo  -> the function to run when Undo is clicked
//   onRedo  -> the function to run when Redo is clicked
//   canUndo -> true/false: is there anything to undo?
//   canRedo -> true/false: is there anything to redo?
function UndoRedoButtons({ onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div>
      {/* disabled={!canUndo} means: if we CAN'T undo, disable the button */}
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>

      {/* Same idea for Redo */}
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
}

// export default lets other files import this component
export default UndoRedoButtons;
