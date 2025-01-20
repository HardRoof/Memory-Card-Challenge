import React from "react";

const Card = ({ handleCardClick, cardsDisplayed }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <main>
      {Array.from(cardsDisplayed).map((card) => (
        <div
          key={card.id}
          className="card"
          id={card.id}
          onClick={handleCardClick}
        >
          <img src={card.img} alt={card.name} />
          <p>{capitalizeFirstLetter(card.name)}</p>
        </div>
      ))}
    </main>
  );
};

export default Card;
