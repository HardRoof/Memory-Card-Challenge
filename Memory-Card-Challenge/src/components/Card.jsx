import React from "react";

const Card = () => {
  const cards = Array.from({ length: 9 }, (_, index) => (
    <div key={index} className="card">
      {/* Card content goes here */}
    </div>
  ));
  return <main>{cards}</main>;
};

export default Card;
