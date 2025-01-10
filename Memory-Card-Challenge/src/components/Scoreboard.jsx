import React, { useState, useEffect } from "react";

const Scoreboard = () => {
	const [score, setScore] = useState(0);
  const [bestScore, setbestScore] = useState(0);
	
  return (
    <div className="header_scoreboard">
      <p>Score: </p>
      <p>{}</p>
      <p>Best score: </p>
      <p>{}</p>
    </div>
  );
};

export default Scoreboard;
