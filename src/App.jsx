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
    <div>
      <div>
        <input
          type="file"
          name="input"
          id="input"
          onChange={handleFileChange}
        />
      </div>
      <div>{content}</div>
    </div>
  );
}

export default App;
