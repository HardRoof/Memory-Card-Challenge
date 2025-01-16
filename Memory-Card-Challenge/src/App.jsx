import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import "./index.css";

function App() {
  const [primaryData, setPrimaryData] = useState(null);
  const [caught, setCaught] = useState(new Set());
  const [cardsDisplayed, setCardsDisplayed] = useState(new Set());
  const [pokemonData, setPokemonData] = useState([]);
  // const [score, setScore] = useState(0);
  // const [bestScore, setbestScore] = useState(0);

  useEffect(() => {
    fetchPrimaryData();
  }, []);

  const fetchPrimaryData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0"
      );
      const primaryDataTemp = await response.json();
      setPrimaryData(primaryDataTemp.results);
      while (cardsDisplayed <= 9) {
        fetchPokemon();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPokemon = async () => {
    let randomNumber = generateUniquePokeId();
    try {
      const response = await fetch(primaryData[randomNumber].url);
      const pokemonDataTemp = await response.json();
      // setPokemonData((prevArr) => [...prevArr, pokemonDataTemp]);
      setCardsDisplayed((prevArr) => [...prevArr, pokemonDataTemp.id]);
    } catch (error) {
      console.log(error);
    }
  };

  const generateUniquePokeId = () => {
    // Generates an array with all possible poke IDs
    const totalPokemons = 1025;
    const allNumbersArr = Array.from(
      { length: totalPokemons },
      (_, i) => i + 1
    );
    const unavailableNumbers = new Set([...cardsDisplayed, ...caught]);

    // Filter out existing numbers
    const availableNumbers = allNumbersArr.filter(
      (num) => !unavailableNumbers.has(num)
    );

    // Randomly select a number from the remaining numbers
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  };

  // const handleCardClick = () => {};
  const handleClick = () => {
    console.log(primaryData);
  };

  return (
    <>
      <header>
        <div>Pokémon Memory Card Challenge</div>{" "}
        <p>
          Catch points by clicking on each Pokémon, but beware: you can only
          catch each one once!
        </p>
        <Scoreboard />
      </header>
      {primaryData && <Card primaryData={primaryData} caught={caught} />}
      <footer>
        Pokémon Memory Card Challenge
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/900px-Octicons-mark-github.svg.png?20180806170715"
          alt="Github"
          id="github"
          style={{ height: "30px" }}
          onClick={() => window.open("https://github.com/HardRoof", "_blank")}
        />
      </footer>
      <button onClick={handleClick}>Click Me</button>
    </>
  );
}

export default App;
