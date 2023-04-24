import {useState} from "react";
import "./App.css";
import BackgroundAnimate from "./backgroundAnimate";
import InputShortener from "./inputShortener";
import LinkResult from "./linkResult";
import UrlTable from "./urlTable";

function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className="container">
        <InputShortener setInputValue={setInputValue} />
        <BackgroundAnimate />
        <LinkResult inputValue={inputValue} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UrlTable />
      </div>
    </>
  );
}

export default App;
