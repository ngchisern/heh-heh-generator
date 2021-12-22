import ideaGif from "./resources/media/Idea.gif";
import "./App.css";

import MainBox from "./components/MainBox";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className="container">
          <img src={ideaGif} alt="ideaGif" width="40%" height="auto" />
        </div>
        <MainBox />
      </div>
    </div>
  );
}

export default App;
