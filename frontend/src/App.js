import "./App.css";
import Pie from "./pie";

function App() {
  return (
    <div className="App">
      <h1>SOCIALSENSE</h1>
      <div className="card">
        <h2>Your overall group rating</h2>
        <Pie />
      </div>
    </div>
  );
}

export default App;
