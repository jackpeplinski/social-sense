import React from "react";
import Card from "./card";

const CardContainer = () => {
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
    </div>
  );
};

export default CardContainer;
