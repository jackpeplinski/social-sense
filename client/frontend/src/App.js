import Pie from "./components/pie";
import Card from "./components/card";

function App() {
  return (
    <div className="App">
      <h1>SOCIALSENSE</h1>
      <div className="card">
        <h2>Your overall group rating</h2>
        <Pie />
      </div>
      <Card />
    </div>
  );
}

export default App;
