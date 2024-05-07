import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [occurrences, setOccurrences] = useState(0);

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

  const handleSearch = () => {
    if (!searchTerm) return;

    const regex = new RegExp(searchTerm, "gi");
    const matches = content.match(regex);

    if (matches) {
      setOccurrences(matches.length);
      const parts = content.split(regex);
      setContent(
        parts.map((part, index) =>
          index % 2 === 0 ? (
            part
          ) : (
            <span key={index} className="highlight">
              {part}
            </span>
          )
        )
      );
    } else {
      setOccurrences(0);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <label htmlFor="actual-btn">Upload File</label>
        <input
          type="file"
          name="input"
          id="actual-btn"
          onChange={handleFileChange}
          hidden
        />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {occurrences > 0 && (
          <p>
            Found {occurrences} occurrence{occurrences > 1 ? "s" : ""}
          </p>
        )}
      </div>
      <section className="content">{content}</section>
    </div>
  );
}

export default App;
