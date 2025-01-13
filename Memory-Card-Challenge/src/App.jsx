import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import "./index.css";

function App() {
  const [data, setData] = useState(null);
  const [cardsDisplayed, setCardsDisplayed] = useState([]);
  const [caught, setCaught] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setbestScore] = useState(0);

  const fetchCard = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"
      );
      const dataResult = await response.json();
      setData(dataResult);
      console.log(dataResult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const handleCardClick = () => {};

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
