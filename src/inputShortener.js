import React, {useState} from "react";
import "./App.css";

function InputShortener({setInputValue}) {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    setInputValue(value);
    setValue("");
  };

  return (
    <div className="inputContainer">
      <h1>
        URL <span>Shortener</span>
      </h1>
      <div>
        <input
          type="text"
          placeholder="Paste a link to shorten it"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button onClick={handleClick}>Shorten</button>
      </div>
    </div>
  );
}

export default InputShortener;
