import Pie from "./components/pie";
import CardContainer from "./components/cardContainer";
const axios = require("axios");

function App() {
  axios.get(`https://20bc-198-2-69-166.ngrok.io`);
  return (
    <div className="App">
      <h1>SOCIALSENSE</h1>
      <div className="overall-card">
        <h2>All groups</h2>
        <Pie />
      </div>
      <CardContainer />
    </div>
  );
}

export default App;
