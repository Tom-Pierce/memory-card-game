import { useEffect, useState } from "react";
import uniqid from "uniqid";
import Cards from "./components/Cards";
import HomeScreen from "./components/HomeScreen";

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonObjlist, setPokemonObjlist] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOutcome, setGameOutcome] = useState();
  const [numberOfCards, setNumberOfCards] = useState(8);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          setPokemonList(json.results);
        }, 2000);
      })
      .catch((error) => console.error(error));
  }, [startGame]);

  useEffect(() => {
    if (pokemonList) {
      const randomIndexes = new Set();
      while (randomIndexes.size < numberOfCards) {
        randomIndexes.add(Math.floor(Math.random() * (pokemonList.length - 1)));
      }
      if (pokemonList) {
        const newPokemonObjlist = [];
        randomIndexes.forEach(async (randomIndex) => {
          const pokemonData = await fetch(pokemonList[randomIndex].url).then(
            (response) => response.json()
          );
          newPokemonObjlist.push({
            id: uniqid(),
            src: pokemonData.sprites.front_default,
            name: pokemonList[randomIndex].name,
            clicked: false,
          });

          setPokemonObjlist([...newPokemonObjlist]);
        });
      }
    }
  }, [pokemonList]);

  function shuffleArray(array) {
    const newArray = array;
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function shufflePokemonObjList() {
    setPokemonObjlist([...shuffleArray(pokemonObjlist)]);
  }

  function incrementScore() {
    setScore(score + 1);
  }

  function onCardClick(event, pokemon) {
    if (duplicateCardClick(pokemon)) {
      setGameOver(true);
      setGameOutcome("loss");
    }
    pokemon.clicked = true;
    if (allClicked()) {
      setGameOver(true);
      setGameOutcome("win");
    }
    incrementScore();
    shufflePokemonObjList();
  }

  function allClicked() {
    return pokemonObjlist.every((pokemon) => pokemon.clicked === true);
  }

  function duplicateCardClick(pokemon) {
    // checks if the clicked pokemon has already been clicked
    if (
      pokemonObjlist.find(
        (obj) => obj.id === pokemon.id && obj.clicked === true
      )
    ) {
      return true;
    }
    return false;
  }
  return (
    <div className="content">
      {gameOver ? (
        gameOutcome === "win" ? (
          <div className="game-outcome-message bordered">You Win!</div>
        ) : (
          <div className="game-outcome-message bordered">You Lose</div>
        )
      ) : startGame ? (
        pokemonObjlist.length > 0 ? (
          <>
            <Cards pokemonObjList={pokemonObjlist} handleClick={onCardClick} />
            <p>Score: {score}</p>
          </>
        ) : (
          "Loading pokemon..."
        )
      ) : (
        <HomeScreen
          setStartGame={setStartGame}
          numberOfCards={numberOfCards}
          setNumberOfCards={setNumberOfCards}
        />
      )}
    </div>
  );
}

export default App;
