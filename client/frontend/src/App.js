import Pie from "./components/pie";
import CardContainer from "./components/cardContainer";

function App() {
  return (
    <div className="App">
      <h1>SOCIALSENSE</h1>
      <div className="overall-card">
        <h2>All groups</h2>
        <Pie />
      </div>
      <CardContainer/>
    </div>
  );
}

export default App;
