import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import "./index.css";

function App() {
  return;
  <>
    <header>
      <div>Pokémon Memory Card Challenge</div>{" "}
      <p>
        Catch points by clicking on each Pokémon, but beware: you can only catch
        each one once!
      </p>
      <Scoreboard />
    </header>
    <Card />
    <footer>
      Pokémon Memory Card Challenge
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/900px-Octicons-mark-github.svg.png?20180806170715"
        alt="Github"
        id="github"
        onClick={() => window.open("https://github.com/HardRoof", "_blank")}
      />
    </footer>
  </>;
}

export default App;
