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
        console.log(data);
        const numberOfCards = Object.keys(data).length;
        const items = [];
        for (var i = 0; i < numberOfCards; i++) {
          items.push(<Card  />);
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
      <Card />
      {fields.map((field, key) => {
        return <div key={key}><Card header={field.group_name}/></div>;
      })}
    </div>
  );
};

export default CardContainer;
