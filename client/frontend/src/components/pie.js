import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";
const axios = require("axios");

const Pie = () => {
  const [pieInfo, setPieInfo] = useState([]);

  useEffect(() => {
    async function getTotalPie() {
      try {
        const info = await axios.get(
          `http://localhost:3000/api/users/group-total-counts`,
          { params: { userID: 1 } }
        );
        const data = info.data;
        setPieInfo([
          {
            id: "Happy Posts",
            label: "Happy Posts",
            value: data.happy_count,
            color: "red",
          },
          {
            id: "Neutral Posts",
            label: "Neutral Posts",
            value: data.neutral_count,
            color: "blue",
          },
          {
            id: "Sad Posts",
            label: "Sad Posts",
            value: data.sad_count,
            color: "black",
          },
        ]);
      } catch (err) {}
    }
    getTotalPie();
  }, []);

  return (
    <div style={{ height: 600 }}>
      <ResponsivePie
        data={pieInfo}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.65}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "set1" }}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabel={function (e) {
          return e.id + " (" + e.value + ")";
        }}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", "3"]] }}
        legends={[]}
      />
    </div>
  );
};

export default Pie;

// const data = [
//   {
//     id: "java",
//     label: "java",
//     value: 195,
//     color: "hsl(90, 70%, 50%)",
//   },
//   {
//     id: "erlang",
//     label: "erlang",
//     value: 419,
//     color: "hsl(56, 70%, 50%)",
//   },
//   {
//     id: "ruby",
//     label: "ruby",
//     value: 407,
//     color: "hsl(103, 70%, 50%)",
//   },
//   {
//     id: "haskell",
//     label: "haskell",
//     value: 474,
//     color: "hsl(186, 70%, 50%)",
//   },
//   {
//     id: "go",
//     label: "go",
//     value: 71,
//     color: "hsl(104, 70%, 50%)",
//   },
// ];
