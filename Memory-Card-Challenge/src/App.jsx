import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import "./index.css";

function App() {
  const [primaryData, setPrimaryData] = useState(null);
  const [caught, setCaught] = useState(new Set());
  const [cardsDisplayed, setCardsDisplayed] = useState(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setbestScore] = useState(0);

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
      fetchNinePokemons(primaryDataTemp.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNinePokemons = async (primaryData) => {
    console.log(cardsDisplayed);
    let localCardsDisplayed = new Set(cardsDisplayed);
    while (localCardsDisplayed.size < 9) {
      let randomNumber = generateUniquePokeId();
      const card = await fetchSinglePokemon(primaryData, randomNumber);
      localCardsDisplayed.add(card);
    }
    setCardsDisplayed(localCardsDisplayed);
  };

  const fetchSinglePokemon = async (primaryData, randomNumber) => {
    try {
      const response = await fetch(primaryData[randomNumber].url);
      const data = await response.json();
      return {
        id: data.id,
        img: data.sprites.front_default,
        name: data.name,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const generateUniquePokeId = () => {
    // Generates an array with all possible poke IDs
    const totalPokemons = 1025;
    const allNumbersArr = Array.from({ length: totalPokemons }, (_, i) => i);
    const unavailableNumbers = new Set([...cardsDisplayed, ...caught]);

    // Filter out existing numbers
    const availableNumbers = allNumbersArr.filter(
      (num) => !unavailableNumbers.has(num)
    );

    // Randomly select a number from the remaining numbers
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  };

  const handleCardClick = async (e) => {
    const id = parseInt(e.currentTarget.id, 10); // string -> integer
    // Update Caught
    setCaught((prevCaught) => {
      if (!prevCaught.has(id)) {
        // If hasn't been caught yet, proceed
        const newCaught = new Set(prevCaught);
        newCaught.add(id);

        // Update the scores
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          setbestScore((prevBestScore) => Math.max(prevBestScore, newScore));
          return newScore;
        });
        return newCaught;
      } else {
        console.log(`ID ${id} is already caught`);
        return prevCaught;
      }
    });
    setCardsDisplayed(new Set());
    await fetchNinePokemons(primaryData);
  };

  const handleClick = () => {
    console.log(caught);
    console.log(cardsDisplayed);
  };

  return (
    <>
      <header>
        <div>Pokémon Memory Card Challenge</div>{" "}
        <p>
          Catch points by clicking on each Pokémon, but beware: you can only
          catch each one once!
        </p>
        <Scoreboard score={score} bestScore={bestScore} />
      </header>
      {primaryData && (
        <Card
          handleCardClick={handleCardClick}
          cardsDisplayed={cardsDisplayed}
        />
      )}
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
