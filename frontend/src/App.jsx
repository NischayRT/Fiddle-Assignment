import { useState, useCallback } from "react";
import axios from "axios";
import TextEditor from "./components/TextEditor";
import TonePicker from "./components/TonePicker";
import UndoRedo from "./components/UndoRedo";
import LoadingSpinner from "./components/LoadingSpinner";
import useTextHistory from "./hooks/useTextHistory.jsx";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentText, addToHistory, undo, redo, canUndo, canRedo } =
    useTextHistory("");

  const handleTextChange = useCallback(
    (newText) => {
      addToHistory(newText);
      setError(null);
    },
    [addToHistory]
  );

  const handleToneChange = useCallback(
    async (tone) => {
      if (!currentText.trim()) {
        setError("Please enter some text first");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post("/api/change-tone", {
          text: currentText,
          tone,
        });

        addToHistory(response.data.convertedText);
      } catch (err) {
        console.error("Error changing tone:", err);
        setError(
          err.response?.data?.error ||
            "Failed to change tone. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [currentText, addToHistory]
  );

  const handleReset = useCallback(() => {
    addToHistory("");
    setError(null);
  }, [addToHistory]);

  const handleUndo = useCallback(() => {
    const previousText = undo();
    setError(null);
  }, [undo]);

  const handleRedo = useCallback(() => {
    const nextText = redo();
    setError(null);
  }, [redo]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tone Picker Text Tool</h1>
        <p>Adjust the tone of your text with AI</p>
      </header>

      <div className="app-content">
        <div className="text-section">
          <TextEditor
            text={currentText}
            onTextChange={handleTextChange}
            isLoading={isLoading}
          />
          <UndoRedo
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
            isLoading={isLoading}
          />
        </div>

        <div className="tone-section">
          <TonePicker
            onToneChange={handleToneChange}
            isLoading={isLoading}
            onReset={handleReset}
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
