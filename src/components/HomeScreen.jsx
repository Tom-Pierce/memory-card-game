export default function HomeScreen({
  setStartGame,
  numberOfCards,
  setNumberOfCards,
}) {
  return (
    <div className="home-screen bordered">
      <label htmlFor="number-of-cards-input">
        <p>How many pokemon can you memorise from Gen 1?</p>
        <input
          type="number"
          name="number-of-cards"
          id="number-of-cards-input"
          className="bordered"
          max={20}
          value={numberOfCards}
          onChange={(event) => {
            setNumberOfCards(event.target.value);
          }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          setStartGame(true);
        }}
        className="start-game-btn bordered"
      >
        Start Game
      </button>
    </div>
  );
}
