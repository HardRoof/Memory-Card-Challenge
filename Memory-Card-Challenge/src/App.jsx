import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import "./index.css";

function App() {
  const [primaryData, setPrimaryData] = useState(null);
  const [caught, setCaught] = useState(new Set());
  const [cardsDisplayed, setCardsDisplayed] = useState(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetchPrimaryData();
  }, []);

  useEffect(() => {
    (async () => {
      // Immediatily invokes function and keeps await/async approach (IIFE)
      if (cardsDisplayed.size === 0 && primaryData) {
        const newCardsDisplayed = await fetchNinePokemons(primaryData);
        setCardsDisplayed(newCardsDisplayed);
      }
    })();
  }, [cardsDisplayed]);

  const fetchPrimaryData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0"
      );
      const primaryDataTemp = await response.json();
      setPrimaryData(primaryDataTemp.results);
      const tempCardsDisplayed = await fetchNinePokemons(
        primaryDataTemp.results
      );
      setCardsDisplayed(tempCardsDisplayed);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNinePokemons = async (primaryData) => {
    const localNewCardsDisplayed = new Set();
    const prevNumbers = new Set();
    let pokeNumber;
    while (localNewCardsDisplayed.size < 9) {
      if (localNewCardsDisplayed.size < caught.size) {
        do {
          pokeNumber =
            Array.from(caught)[Math.floor(Math.random() * caught.size)];
        } while (prevNumbers.has(pokeNumber));
      } else {
        console.log("Should generate Unique");
        pokeNumber = generateUniquePokeId(prevNumbers);
      }
      const card = await fetchSinglePokemon(primaryData, pokeNumber);
      if (!prevNumbers.has(card.id) && !localNewCardsDisplayed.has(card)) {
        localNewCardsDisplayed.add(card);
        prevNumbers.add(card.id);
      }
    }
    return localNewCardsDisplayed;
  };

  const generateUniquePokeId = (prevNumbers) => {
    const totalPokemons = 1025;
    const allNumbersArr = Array.from({ length: totalPokemons }, (_, i) => i);
    const availableNumbers = allNumbersArr.filter(
      (num) => !prevNumbers.has(num) && !caughtNumbers.has(num)
    );
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  };

  const fetchSinglePokemon = async (primaryData, pokeNumber) => {
    try {
      const response = await fetch(primaryData[pokeNumber - 1].url);
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

  const handleCardClick = async (e) => {
    const id = parseInt(e.currentTarget.id, 10); // string -> integer

    // Check if the card has already been caught
    if (!caught.has(id)) {
      // Update Caught
      setCaught((prevCaught) => {
        const newCaught = new Set(prevCaught);
        newCaught.add(id);
        return newCaught;
      });

      // Update the scores
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        setBestScore((prevBestScore) => Math.max(prevBestScore, newScore));
        return newScore;
      });
    } else {
      setScore(0);
      setCaught(new Set());
    }

    // Reset cards displayed and fetch new ones
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
