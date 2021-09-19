import Card from "./card";
import { useState, useEffect } from "react";
const axios = require("axios");

const CardContainer = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    async function getGroupCards() {
      try {
        const data = await axios.get(
          `http://localhost:3000/api/users/group-counts`,
          { params: { userID: 1 } }
        );
        const numberOfCards = Object.keys(data.data).length;
        console.log(numberOfCards);
        const items = [];        
        console.log(data);
        const info = data.data;
        for (const group_id in info) {
          // console.log(data.data[i].group_name);
          var infoGroupId = info[group_id];
          var happyCount = infoGroupId.happy_count;
          var neutralCount = infoGroupId.neutral_count;
          var sadCount = infoGroupId.sad_count;
          var maxCount;
          var maxCategory;
          if(happyCount >= neutralCount && happyCount >= sadCount) {
            maxCount = happyCount;
            maxCategory = 'happy'
          } else if (neutralCount >= happyCount && neutralCount >= sadCount) {
            maxCount = neutralCount;
            maxCategory = 'happy';
          } else {
            maxCount = sadCount;
            maxCategory = 'sad'
          }

          items.push(<Card header={infoGroupId.group_name} number={maxCount} maxCategory={maxCategory}/>);
        }
        setFields(items);
      } catch (err) {}
    }
    getGroupCards();
  }, []);

  return (
    <div className="card-container">
      <div className="card-container-label-wrapper">
        <div className="card-container-label">
          <div className="card-container-header">
            <h2>Each groups</h2>
          </div>
        </div>
      </div>
      {fields}
    </div>
  );
};

export default CardContainer;
