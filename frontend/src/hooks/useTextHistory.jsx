import { useState, useCallback } from "react";

const useTextHistory = (initialText = "") => {
  const [history, setHistory] = useState([initialText]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToHistory = useCallback(
    (newText) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push(newText);
        return newHistory;
      });
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex]
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      return history[currentIndex - 1];
    }
    return history[currentIndex];
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return history[currentIndex + 1];
    }
    return history[currentIndex];
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    currentText: history[currentIndex],
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    currentIndex,
  };
};

export default useTextHistory;
