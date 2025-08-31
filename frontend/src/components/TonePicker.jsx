const TonePicker = ({ onToneChange, isLoading, onReset }) => {
  const tones = [
    { id: "formal-casual", label: "Formal → Casual" },
    { id: "formal-friendly", label: "Formal → Friendly" },
    { id: "formal-professional", label: "Formal → Professional" },
    { id: "casual-formal", label: "Casual → Formal" },
    { id: "casual-friendly", label: "Casual → Friendly" },
    { id: "casual-professional", label: "Casual → Professional" },
    { id: "friendly-formal", label: "Friendly → Formal" },
    { id: "friendly-casual", label: "Friendly → Casual" },
    { id: "friendly-professional", label: "Friendly → Professional" },
  ];

  const handleToneClick = (toneId) => {
    if (!isLoading) {
      onToneChange(toneId);
    }
  };

  return (
    <div className="tone-picker">
      <h2>Tone Picker</h2>
      <div className="tone-grid">
        {tones.map((tone) => (
          <button
            key={tone.id}
            className="tone-button"
            onClick={() => handleToneClick(tone.id)}
            disabled={isLoading}
          >
            {tone.label}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={onReset} disabled={isLoading}>
        Reset Text
      </button>
    </div>
  );
};

export default TonePicker;
