import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [content, setContent] = useState("");

  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      setContent(reader.result);
    },
    false
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) reader.readAsText(selectedFile);
  };

  return (
    <div className="main">
      <div className="header">
        <label for="actual-btn">Upload File</label>
        <input
          type="file"
          name="input"
          id="actual-btn"
          onChange={handleFileChange}
          hidden
        />
      </div>
      <section className="content">{content}</section>
    </div>
  );
}

export default App;
