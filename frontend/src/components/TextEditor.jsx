const TextEditor = ({ text, onTextChange, isLoading }) => {
  const handleChange = (e) => {
    onTextChange(e.target.value);
  };

  return (
    <div className="text-editor">
      <h2>Text Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here..."
        disabled={isLoading}
      />
    </div>
  );
};

export default TextEditor;
