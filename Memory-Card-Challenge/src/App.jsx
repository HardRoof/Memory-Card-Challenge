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
    // Immediatily invokes function and keeps await/async approach (IIFE)
    (async () => {
      // Check if no cards are currently displayed and primaryData is available
      if (cardsDisplayed.size === 0 && primaryData) {
        // Fetch nine new Pokémon cards asynchronously
        const newCardsDisplayed = await fetchNinePokemons(primaryData);

        // Update the state with the new set of displayed cards
        setCardsDisplayed(newCardsDisplayed);

        // Shuffle the newly fetched cards.
        //PS: Used newCardsDisplayed rather than cardsDisplayed immediately after updating the state with setCardsDisplayed is due to the asynchronous nature of state updates in React.
        const shuffledCards = Array.from(newCardsDisplayed).sort(
          () => Math.random() - 0.5
        );

        // Update the state with the shuffled cards
        setCardsDisplayed(shuffledCards);
      }
    })();
  }, [cardsDisplayed]); // Effect runs when cardsDisplayed changes

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
    // Set to locally store the new Pokémon cards to be displayed
    const localNewCardsDisplayed = new Set();

    // Set to keep track of previously used Pokémon numbers
    const prevNumbers = new Set();
    let pokeNumber;

    // Encapsualted function to avoid repetion, it add each poke card
    const addPokemonCard = async (pokeNumber) => {
      const card = await fetchSinglePokemon(primaryData, pokeNumber);
      if (!prevNumbers.has(card.id) && !localNewCardsDisplayed.has(card)) {
        localNewCardsDisplayed.add(card);
        prevNumbers.add(card.id);
      }
    };

    // Loop through the caught Pokémon set to add up to 8 unique Pokémon cards
    let count = 0;
    for (let i = 0; i < caught.size; i++) {
      if (count >= 8) break;
      let pokeNumber;
      do {
        pokeNumber =
          Array.from(caught)[Math.floor(Math.random() * caught.size)];
      } while (prevNumbers.has(pokeNumber)); // Loops until pokeNumber isn't a previous number
      await addPokemonCard(pokeNumber);
      count++;
    }

    // Ensure the total number of Pokémon cards displayed is 9
    while (localNewCardsDisplayed.size < 9) {
      pokeNumber = generateUniquePokeId(prevNumbers);
      await addPokemonCard(pokeNumber);
    }

    return localNewCardsDisplayed;
  };

  const generateUniquePokeId = (prevNumbers) => {
    const totalPokemons = 1025;
    const allNumbersArr = Array.from({ length: totalPokemons }, (_, i) => i);
    const availableNumbers = allNumbersArr.filter(
      (num) => !prevNumbers.has(num) && !caught.has(num)
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

  return (
    <>
      <header>
        <div>
          <h1>Pokémon Memory Card Challenge</h1>{" "}
          <p>
            Catch points by clicking on each Pokémon, but beware: you can only
            catch each one once!
          </p>
        </div>
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
          style={{ height: "30px", filter: "invert(100%)" }}
          onClick={() => window.open("https://github.com/HardRoof", "_blank")}
        />
      </footer>
    </>
  );
}

export default App;
