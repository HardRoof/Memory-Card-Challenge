import React, { useState, useEffect } from "react";

const Card = ({ data, caught }) => {
  const amountOfCards = 9;
  const cards = Array.from({ length: amountOfCards }, (_, index) => (
    <div key={index} className="card">
      {/* <img src={`${data[index].url}sprites/front_default`} alt={data.name} /> */}
      {/* <p>{data[2].name}</p> */}
    </div>
  ));
  return <main>{cards}</main>;
};

export default Card;
