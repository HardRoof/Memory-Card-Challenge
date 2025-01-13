import React, { useState, useEffect } from "react";

const Scoreboard = () => {	
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
