import React from "react";
import Card from "./card";
import {/*useState,*/ useEffect} from "react";
const axios = require('axios')

const CardContainer = () => {
/**
   * data = {group_id: {group_name, happy_count, neutral_count, sad_count}, group_id: {...}}
   * number = data.length()
   */
  // eslint-disable-next-line
 const fields = [];
 useEffect(() => {
  async function getGroupCards() {
    try{
      const data = await axios.get(`http://localhost:3000/api/users/group-counts`, {params: {"userID": 1}})
      const numberOfCards = Object.keys(data).length
      
      
      for (var i = 0; i < numberOfCards; i++) {
        fields.push(<Card />);
      }

    }catch(err){

    }
  }
  getGroupCards()
}, [])

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
      {fields}
    </div>
  );
};

export default CardContainer;
