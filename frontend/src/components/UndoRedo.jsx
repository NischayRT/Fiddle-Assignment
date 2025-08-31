const UndoRedo = ({ onUndo, onRedo, canUndo, canRedo, isLoading }) => {
  return (
    <div className="undo-redo">
      <button
        onClick={onUndo}
        disabled={!canUndo || isLoading}
        className="undo-button"
      >
        Undo
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo || isLoading}
        className="redo-button"
      >
        Redo
      </button>
    </div>
  );
};

export default UndoRedo;
